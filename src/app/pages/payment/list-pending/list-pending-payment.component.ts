import { Component, ViewChild, OnInit, AfterViewInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { PaymentService } from '../payment.service';
import { EPermissions } from 'src/app/utils/permissionEnum';

@Component({
  selector: "app-list-payment",
  templateUrl: "./list-pending-payment.component.html",
})
export class ListPendingPaymentComponent implements OnInit, AfterViewInit {
  
  paciente!: any;
  payment = [];
  displayedColumns: string[] = ['treatment', 'description', 'date', 'details'];
  dataSource = new MatTableDataSource<any>(this.payment);
  sanitizedImage: SafeResourceUrl | null;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  listarPago: Array<EPermissions>;
  crearPago: Array<EPermissions>;
  actualizarPago: Array<EPermissions>;
  eliminarPago: Array<EPermissions>;

  constructor(
    private readonly _router: Router,
    public dialog: MatDialog,
    private spinnerService: NgxSpinnerService,
    private _paymentService: PaymentService,
    private readonly _sanitizer: DomSanitizer
  ) {
    this.sanitizedImage = null;
    this.listarPago = [EPermissions.LISTAR_PAGOS] || [];
    this.crearPago = [EPermissions.CREAR_PAGOS] || [];
    this.actualizarPago = [EPermissions.ACTUALIZAR_PAGOS] || [];
    this.eliminarPago = [EPermissions.ELIMINAR_PAGOS] || [];
  }

  async ngOnInit() {
    this.paciente = history.state.paciente;
    // Asegúrate de que el objeto paciente tenga la propiedad photoUrl
    this.paciente.profileImage = this.paciente.profileImage || 'default-photo-url.jpg'; // URL por defecto si no hay foto
    this.getPendingPayment(this.paciente?.id);
    this.spinnerService.show();
  }

  async getPendingPayment(patientId: number) {
    try {
        const response = await this._paymentService.getPatientPendingPayment(patientId);
        if (response && response.data) {
            this.payment = response.data.pendingTreatments;
            console.log('payment',this.payment)
            this.dataSource.data = this.payment;
            console.log('datasource',this.dataSource.data)
            this.sanitizedImage = this._sanitizer.bypassSecurityTrustResourceUrl(response.data.patient.profileImage);

        } else {
            console.error('Error: No se encontraron datos en la respuesta.');
        }
    } catch (error) {
        console.error('Error al obtener datos:', error);
    } finally {
        this.spinnerService.hide();
    }
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  returnPage() {
    this._router.navigateByUrl("/patient/list");
  }

  redirectCreate() {
    this._router.navigateByUrl("/patient/create");
  }
}
