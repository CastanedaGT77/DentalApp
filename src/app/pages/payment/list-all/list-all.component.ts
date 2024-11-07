import { Component, ViewChild, OnInit, AfterViewInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { PaymentService } from '../payment.service';

@Component({
  selector: 'app-list-all',
  templateUrl: './list-all.component.html',
})
export class ListAllComponent implements OnInit, AfterViewInit {
  
  payments: any[] = [];
  displayedColumns: string[] = ['name', 'address', 'phoneNumber', 'patient', 'details', 'actions'];
  dataSource = new MatTableDataSource<any>(this.payments);

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private readonly _router: Router,
    public dialog: MatDialog,
    private spinnerService: NgxSpinnerService,
    private _paymentService: PaymentService
  ) {}

  async ngOnInit() {
    this.spinnerService.show();
    await this.getAllPayments();
  }

  async getAllPayments() {
    try {
      const response = await this._paymentService.getAllPayments();
      if (response && response.data && response.data.payments) {
        this.payments = response.data.payments;
        this.dataSource.data = this.payments;
      } else {
        console.error('Error: No se encontraron datos en la respuesta.');
      }
    } catch (error) {
      console.error('Error al obtener todos los pagos:', error);
    } finally {
      this.spinnerService.hide();
    }
  }

  async viewDocument(fileCode: any) {
    try {
        const fileBlob = await this._paymentService.getDocument(fileCode);
        if (fileBlob) {
            const url = window.URL.createObjectURL(new Blob([fileBlob], { type: 'application/pdf' }));
            const a = document.createElement('a');
            a.href = url;
            a.download = `${fileCode}.pdf`; // Asegura que el archivo tenga la extensión .pdf
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            window.URL.revokeObjectURL(url);
        } else {
            console.error('Error: No se pudo obtener el archivo.');
        }
    } catch (error) {
        console.error('Error al descargar el archivo:', error);
    }
    }


  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  redirectCreate() {
    this._router.navigateByUrl("/payment/makePayment");
  }
}
