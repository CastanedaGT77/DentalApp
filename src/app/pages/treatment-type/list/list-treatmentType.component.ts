import { Component, ViewChild, OnInit, AfterViewInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { TreatmentTypeService } from '../treatment-type.service';
import { DeleteTreatmentType } from '../delete/delete-treatmentType.component';


@Component({
    selector: "app-list-treatmentType",
    templateUrl: "./list-treatmentType.component.html"
})
export class ListTreatmentTypeComponent implements OnInit, AfterViewInit {

    treatmentType = [];
    dataSource = new MatTableDataSource<any>(this.treatmentType);
    @ViewChild(MatPaginator) paginator: MatPaginator;

    displayedColumns: string[] = ['id', 'name', 'description', 'suggestedPrice', 'estimatedTime', 'actions'];
    
    constructor(
        private readonly _router: Router,
        public dialog: MatDialog,
        private _treatmentType: TreatmentTypeService,
        private spinnerService: NgxSpinnerService,
        private readonly _sanitizer: DomSanitizer
    ) {}

    async ngOnInit(){
        this.spinnerService.show();
        await this.getTreatmentType(); 
        this.spinnerService.hide();
    }

    async getTreatmentType() {
        try {
            const response = await this._treatmentType.getTreatmentTypes();
            if (response) {
                // Asigna los datos obtenidos al arreglo illnessDetail
                this.treatmentType = response;
    
                // Imprime los datos obtenidos para verificar
                console.log('Datos obtenidos:', this.treatmentType);
    
                // Actualiza la fuente de datos de la tabla
                this.dataSource.data = this.treatmentType;
    
                // Imprime el dataSource.data para verificar
                console.log('Datos del dataSource:', this.dataSource.data);
            } else {
                console.error('Error: No se encontraron datos en la respuesta.');
            }
        } catch (error) {
            console.error('Error al obtener datos:', error);
        }
    }

    // Métodos de acción llamada a editar paciente
    editarTreatmentType(treatmentType: any) {
        //console.log('funciona paciente editar', paciente);
        this._router.navigate(['/treatmentType/edit'], { state: { treatmentType: treatmentType } });
    
    }

    eliminarTreatmentType(treatmentType: any): void {
        console.log('funciona treatmentTYPE delete', treatmentType);
        this.dialog.open(DeleteTreatmentType, {
            width: '300px',
            data: { treatmentType: treatmentType }
        }).afterClosed().subscribe(data => {
            if(data){
                this.getTreatmentType();
            }
        });
    }

    applyFilter(event: Event) {
        const filterValue = (event.target as HTMLInputElement).value.trim().toLowerCase();
        this.dataSource.filter = filterValue;
    }
  
    ngAfterViewInit() {
        this.dataSource.paginator = this.paginator;
    }

    redirectCreate(){
        this._router.navigateByUrl("/treatmentType/create");
    }
}
