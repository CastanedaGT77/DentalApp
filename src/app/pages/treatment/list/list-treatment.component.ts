import { Component, ViewChild, OnInit, AfterViewInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { DomSanitizer } from '@angular/platform-browser';
import { TreatmentService } from '../treatment.service';
import { EPermissions } from 'src/app/utils/permissionEnum';

@Component({
  selector: "app-list-treatment",
  templateUrl: "./list-treatment.component.html"
})
export class ListTreatmentComponent implements OnInit, AfterViewInit {
  treatment = [];
  dataSource = new MatTableDataSource<any>(this.treatment);
  @ViewChild(MatPaginator) paginator: MatPaginator;

  displayedColumns: string[] = ['id', 'name', 'description', 'firstName', 'phoneNumber', 'email', 'status', 'paymentStatus', 'quotation', 'actions'];

  listarTratamiento: Array<EPermissions>;
  visualizarTratamiento: Array<EPermissions>;
  crearTratamiento: Array<EPermissions>;
  actualizarTratamiento: Array<EPermissions>;
  eliminarTratamiento: Array<EPermissions>;
  
  constructor(
    private readonly _router: Router,
    public dialog: MatDialog,
    private _treatment: TreatmentService,
    private spinnerService: NgxSpinnerService,
    private readonly _sanitizer: DomSanitizer
  ) {
    this.listarTratamiento = [EPermissions.LISTAR_TRATAMIENTOS] || [];
    this.visualizarTratamiento = [EPermissions.VISUALIZAR_TRATAMIENTOS] || [];
    this.crearTratamiento = [EPermissions.CREAR_TRATAMIENTOS] || [];
    this.actualizarTratamiento = [EPermissions.ACTUALIZAR_TRATAMIENTOS] || [];
    this.eliminarTratamiento = [EPermissions.ELIMINAR_TRATAMIENTOS] || [];
  }

  async ngOnInit(){
    this.spinnerService.show();
    await this.getTreatment(); 
    this.spinnerService.hide();
    this.dataSource.filterPredicate = this.customFilterPredicate();
  }

  async getTreatment() {
    try {
      const response = await this._treatment.getTreatment();
      if (response && response.data) {
        this.treatment = response.data;
        console.log('Datos obtenidos:', this.treatment);
        this.dataSource.data = this.treatment;
        this.dataSource.paginator = this.paginator; // Set paginator here
        console.log('Datos del dataSource:', this.dataSource.data);
      } else {
        console.error('Error: No se encontraron datos en la respuesta.');
      }
    } catch (error) {
      console.error('Error al obtener datos:', error);
    }
  }

  async getTreatmentDetail(treatmentId: number) {
    try {
      const response = await this._treatment.getTreatmentDetail(treatmentId);
      return response && response.data ? response : null;
    } catch (error) {
      console.error('Error al obtener datos:', error);
      return null;
    }
  }

  // Métodos de acción llamada a editar tratamiento
  async editarTreatment(treatment: number) {
    this._router.navigate(['/treatment/edit'], { state: { treatmentId: treatment} });
  }

  async verTratamiento(treatment: number) {
    const details = await this.getTreatmentDetail(treatment);
    if(details){
      this._router.navigate(['/treatment/specificTreatment'], { state: { treatmentD: details } });
    }
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value.trim().toLowerCase();
    this.dataSource.filter = filterValue;

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  customFilterPredicate() {
    return (data: any, filter: string): boolean => {
      const searchString = filter.trim().toLowerCase();
      return (
        data.name.toLowerCase().includes(searchString) ||
        data.description.toLowerCase().includes(searchString) ||
        data.patient.firstName.toLowerCase().includes(searchString) ||
        data.patient.lastName.toLowerCase().includes(searchString) ||
        data.patient.phoneNumber.toLowerCase().includes(searchString) ||
        data.patient.email.toLowerCase().includes(searchString)
      );
    };
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  redirectCreate(){
    this._router.navigateByUrl("/treatment/create");
  }
}
