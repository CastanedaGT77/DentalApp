import { Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { DeletePatient } from '../delete/delete-patient.component';
@Component({
    selector: "app-list-patient",
    templateUrl: "./list-patient.component.html"
})
export class ListPatientComponent {
    patients = [
        {position: 1, name: 'Ana Daniela Chavéz Camey', weight: 1.0079, symbol: 'H'},
        {position: 2, name: 'Marco Antonio Ríos Garcia', weight: 4.0026, symbol: 'He'},
        {position: 3, name: 'Sergio Arturo Ríos Garcia', weight: 6.941, symbol: 'Li'},
        {position: 4, name: 'Palido', weight: 9.0122, symbol: 'Be'},
        {position: 5, name: 'Luis Cotoc', weight: 10.811, symbol: 'B'},
        {position: 1, name: 'Ana Daniela Chavéz Camey', weight: 1.0079, symbol: 'H'},
        {position: 2, name: 'Marco Antonio Ríos Garcia', weight: 4.0026, symbol: 'He'},
        {position: 3, name: 'Sergio Arturo Ríos Garcia', weight: 6.941, symbol: 'Li'},
        {position: 4, name: 'Palido', weight: 9.0122, symbol: 'Be'},
        {position: 5, name: 'Luis Cotoc', weight: 10.811, symbol: 'B'},
        {position: 1, name: 'Ana Daniela Chavéz Camey', weight: 1.0079, symbol: 'H'},
        {position: 2, name: 'Marco Antonio Ríos Garcia', weight: 4.0026, symbol: 'He'},
        {position: 3, name: 'Sergio Arturo Ríos Garcia', weight: 6.941, symbol: 'Li'},
        {position: 4, name: 'Palido', weight: 9.0122, symbol: 'Be'},
        {position: 5, name: 'Luis Cotoc', weight: 10.811, symbol: 'B'},
        {position: 1, name: 'Ana Daniela Chavéz Camey', weight: 1.0079, symbol: 'H'},
        {position: 2, name: 'Marco Antonio Ríos Garcia', weight: 4.0026, symbol: 'He'},
        {position: 3, name: 'Sergio Arturo Ríos Garcia', weight: 6.941, symbol: 'Li'},
        {position: 4, name: 'Palido', weight: 9.0122, symbol: 'Be'},
        {position: 5, name: 'Luis Cotoc', weight: 10.811, symbol: 'B'},
        {position: 1, name: 'Ana Daniela Chavéz Camey', weight: 1.0079, symbol: 'H'},
        {position: 2, name: 'Marco Antonio Ríos Garcia', weight: 4.0026, symbol: 'He'},
        {position: 3, name: 'Sergio Arturo Ríos Garcia', weight: 6.941, symbol: 'Li'},
        {position: 4, name: 'Palido', weight: 9.0122, symbol: 'Be'},
        {position: 5, name: 'Luis Cotoc', weight: 10.811, symbol: 'B'},
        {position: 1, name: 'Ana Daniela Chavéz Camey', weight: 1.0079, symbol: 'H'},
        {position: 2, name: 'Marco Antonio Ríos Garcia', weight: 4.0026, symbol: 'He'},
        {position: 3, name: 'Sergio Arturo Ríos Garcia', weight: 6.941, symbol: 'Li'},
        {position: 4, name: 'Palido', weight: 9.0122, symbol: 'Be'},
        {position: 5, name: 'Luis Cotoc', weight: 10.811, symbol: 'B'},
        {position: 1, name: 'Ana Daniela Chavéz Camey', weight: 1.0079, symbol: 'H'},
        {position: 2, name: 'Marco Antonio Ríos Garcia', weight: 4.0026, symbol: 'He'},
        {position: 3, name: 'Sergio Arturo Ríos Garcia', weight: 6.941, symbol: 'Li'},
        {position: 4, name: 'Palido', weight: 9.0122, symbol: 'Be'},
        {position: 5, name: 'Luis Cotoc', weight: 10.811, symbol: 'B'},
        {position: 1, name: 'Ana Daniela Chavéz Camey', weight: 1.0079, symbol: 'H'},
        {position: 2, name: 'Marco Antonio Ríos Garcia', weight: 4.0026, symbol: 'He'},
        {position: 3, name: 'Sergio Arturo Ríos Garcia', weight: 6.941, symbol: 'Li'},
        {position: 4, name: 'Palido', weight: 9.0122, symbol: 'Be'},
        {position: 5, name: 'Luis Cotoc', weight: 10.811, symbol: 'B'},
    ];
    
    displayedColumns: string[] = ['position', 'name', 'weight', 'symbol', 'actions'];
    dataSource = new MatTableDataSource<any>(this.patients);
  
    @ViewChild(MatPaginator) paginator: MatPaginator;

    constructor(
        private readonly _router: Router,
        public dialog: MatDialog
    ){
        // this.getPatients();
    }

    // Métodos de acción llamada a editar paciente
    editarPaciente(paciente: any) {
        console.log('funciona paciente editar', paciente);
        this._router.navigateByUrl("/patient/edit")
    }

    eliminarPaciente(element: any): void {
        console.log('funciona paciente delete', element);
        this.dialog.open(DeletePatient, {
            width: '250px',
            data: { paciente: element }
        });
        
    }

    verDetalle(paciente: any) {
        console.log('funciona paciente ver', paciente);
        this._router.navigate(['/patient/patientProfile', { paciente: JSON.stringify(paciente) }]);
    }

    applyFilter(event: Event) {
        const filterValue = (event.target as HTMLInputElement).value.trim().toLowerCase();
        this.dataSource.filter = filterValue;
    }
  
    ngAfterViewInit() {
      this.dataSource.paginator = this.paginator;
    }

    redirectCreate(){
        this._router.navigateByUrl("/patient/create");
    }
}