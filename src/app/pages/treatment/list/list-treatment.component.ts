import { Component, ViewChild, OnInit, AfterViewInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { TreatmentService } from '../treatment.service';
import { DeleteTreatment } from '../delete/delete-treatment.component';
// import { DeleteTreatmentType } from '../delete/delete-treatment.component';


@Component({
    selector: "app-list-treatment",
    templateUrl: "./list-treatment.component.html"
})
export class ListTreatmentComponent implements OnInit, AfterViewInit {

    treatmentD = [];
    dataSource2 = new MatTableDataSource<any>(this.treatmentD);
    treatment = [];
    dataSource = new MatTableDataSource<any>(this.treatment);
    @ViewChild(MatPaginator) paginator: MatPaginator;

    displayedColumns: string[] = ['id', 'name', 'description', 'firstName', 'phoneNumber', 'email', 'status', 'paymentStatus', 'quotation', 'actions'];
    
    constructor(
        private readonly _router: Router,
        public dialog: MatDialog,
        private _treatment: TreatmentService,
        private spinnerService: NgxSpinnerService,
        private readonly _sanitizer: DomSanitizer
    ) {}

    async ngOnInit(){
        this.spinnerService.show();
        await this.getTreatment(); 
        this.spinnerService.hide();
    }

    async getTreatment() {
        try {
            const response = await this._treatment.getTreatment();
            if (response && response.data) {
                this.treatment = response.data;
                console.log('Datos obtenidos:', this.treatment);
                this.dataSource.data = this.treatment;
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
          console.log('entra aca')
            const response = await this._treatment.getTreatmentDetail(treatmentId);
            if (response && response.data) {
                this.treatmentD = response.data;
                console.log('Datos obtenidos all fin:', this.treatmentD);
                this.dataSource2.data = this.treatmentD;
                console.log('Datos del dataSource:', this.dataSource2.data);
            } else {
                console.error('Error: No se encontraron datos en la respuesta.');
            }
        } catch (error) {
            console.error('Error al obtener datos:', error);
        }
    }

    // Métodos de acción llamada a editar tratamiento
    async editarTreatment(treatment: number) {
        await this.getTreatmentDetail(treatment);
        console.log('funciona tratamiento editar', treatment);
        this._router.navigate(['/treatment/edit'], { state: { treatmentD: this.treatmentD } });
    }

    async verTratamiento(treatment: number) {
        await this.getTreatmentDetail(treatment);
        console.log('datos que mande', this.treatmentD);
        this._router.navigate(['/treatment/specificTreatment'], { state: { treatmentD: this.treatmentD } });
    }

   

    applyFilter(event: Event) {
        const filterValue = (event.target as HTMLInputElement).value.trim().toLowerCase();
        this.dataSource.filter = filterValue;
    }
  
    ngAfterViewInit() {
        this.dataSource.paginator = this.paginator;
    }

    redirectCreate(){
        this._router.navigateByUrl("/treatment/create");
    }
}
