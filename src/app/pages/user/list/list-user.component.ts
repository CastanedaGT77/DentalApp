import { Component, ViewChild, OnInit, AfterViewInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { UserService } from '../user.service';

@Component({
    selector: "app-list-user",
    templateUrl: "./list-user.component.html"
})
export class ListUserComponent implements OnInit, AfterViewInit {

    users = [];
    dataSource = new MatTableDataSource<any>(this.users);
    @ViewChild(MatPaginator) paginator: MatPaginator;

    displayedColumns: string[] = ['id', 'firstName','lastName','email','userName','isActive','actions'];
    
    constructor(
        private readonly _router: Router,
        public dialog: MatDialog,
        private _userService: UserService,
        private spinnerService: NgxSpinnerService,
        private readonly _sanitizer: DomSanitizer
    ) {}

    async ngOnInit(){
        this.spinnerService.show();
        await this.getUsers(); 
        this.spinnerService.hide();
    }

    async getUsers() {
        try {
            const response = await this._userService.getUsers();
            this.users = response;
            console.log("USERS:", this.users);
            this.dataSource.data = this.users;
        } catch (error) {
            console.error('Error al obtener datos:', error);
        }
    }

    // Métodos de acción llamada a editar paciente
    editUser(illnessDetail: any) {
        //console.log('funciona paciente editar', paciente);
        this._router.navigate(['/illnessDetail/edit'], { state: { illnessDetail: illnessDetail } });
    
    }
    
    deleteUser(illnessDetail: any): void {
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
