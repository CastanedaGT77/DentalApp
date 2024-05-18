import { Component, ViewChild, OnInit, AfterViewInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { IllnessDetailService } from '../illnessDetail.service';
import { DeleteIllnessDetail } from '../delete/delete-IllnessDetail.component';

@Component({
    selector: "app-list-illnessDetail",
    templateUrl: "./list-illnessDetail.component.html"
})
export class ListIllnessDetailComponent implements OnInit, AfterViewInit {

    illnessDetail = [];
    dataSource = new MatTableDataSource<any>(this.illnessDetail);
    @ViewChild(MatPaginator) paginator: MatPaginator;

    displayedColumns: string[] = ['id', 'name', 'description', 'active','actions'];
    
    constructor(
        private readonly _router: Router,
        public dialog: MatDialog,
        private _illnessDetail: IllnessDetailService,
        private spinnerService: NgxSpinnerService,
        private readonly _sanitizer: DomSanitizer
    ) {}

    async ngOnInit(){
        this.spinnerService.show();
        await this.getIllnessDetail(); 
        this.spinnerService.hide();
    }

    async getIllnessDetail() {
        try {
            const response = await this._illnessDetail.getIllnessDetails();
            if (response) {
                // Asigna los datos obtenidos al arreglo illnessDetail
                this.illnessDetail = response;
    
                // Imprime los datos obtenidos para verificar
                console.log('Datos obtenidos:', this.illnessDetail);
    
                // Actualiza la fuente de datos de la tabla
                this.dataSource.data = this.illnessDetail;
    
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
    editarIllnessDetail(illnessDetail: any) {
        //console.log('funciona paciente editar', paciente);
        this._router.navigate(['/illnessDetail/edit'], { state: { illnessDetail: illnessDetail } });
    
    }
    
    eliminarIllnessDetail(illnessDetail: any): void {
        console.log('funciona illnessDetail delete', illnessDetail);
        this.dialog.open(DeleteIllnessDetail, {
            width: '300px',
            data: { illnessDetail: illnessDetail }
        }).afterClosed().subscribe(data => {
            if(data){
                this.getIllnessDetail();
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
        this._router.navigateByUrl("/illnessDetail/create");
    }
}
