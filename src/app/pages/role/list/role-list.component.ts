import { Component, ViewChild, OnInit, AfterViewInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { RoleService } from '../role.service';

@Component({
    selector: "app-role-user",
    templateUrl: "./role-list.component.html"
})
export class RoleListComponent implements OnInit, AfterViewInit {

    roles = [];
    dataSource = new MatTableDataSource<any>(this.roles);
    @ViewChild(MatPaginator) paginator: MatPaginator;

    displayedColumns: string[] = ['id', 'name','actions'];
    
    constructor(
        private readonly _router: Router,
        public dialog: MatDialog,
        private _roleService: RoleService,
        private spinnerService: NgxSpinnerService,
        private readonly _sanitizer: DomSanitizer
    ) {}

    async ngOnInit(){
        this.spinnerService.show();
        await this.getRoles(); 
        this.spinnerService.hide();
    }

    async getRoles() {
        try {
            const response = await this._roleService.getRoles();
            this.roles = response;
            this.dataSource.data = this.roles;
        } catch (error) {
            console.error('Error al obtener datos:', error);
        }
    }

    // Métodos de acción llamada a editar paciente
    editRole(illnessDetail: any) {
        //console.log('funciona paciente editar', paciente);
        this._router.navigate(['/illnessDetail/edit'], { state: { illnessDetail: illnessDetail } });
    
    }
    
    deleteRole(illnessDetail: any): void {
        console.log('funciona illnessDetail delete', illnessDetail);
    }

    applyFilter(event: Event) {
        const filterValue = (event.target as HTMLInputElement).value.trim().toLowerCase();
        this.dataSource.filter = filterValue;
    }
  
    ngAfterViewInit() {
        this.dataSource.paginator = this.paginator;
    }

    redirectCreate(){
        this._router.navigateByUrl("/user/create");
    }
}
