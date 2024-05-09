import { Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { DeletePatient } from '../delete/delete-patient.component';
import { PatientService } from '../patient.service';

@Component({
    selector: "app-list-patient",
    templateUrl: "./list-patient.component.html"
})
export class ListPatientComponent {
    patients = [];
    
    displayedColumns: string[] = ['id', 'firstName', 'lastName', 'phoneNumber', 'email', 'actions'];


    dataSource = new MatTableDataSource<any>(this.patients);
  
    @ViewChild(MatPaginator) paginator: MatPaginator;

    constructor(
        private readonly _router: Router,
        public dialog: MatDialog,
        private _patientService: PatientService
    ){
    }

    // Métodos de acción llamada a editar paciente
    editarPaciente(paciente: any) {
        console.log('funciona paciente editar', paciente);
        this._router.navigate(['/patient/edit'], { state: { paciente: paciente } });
    }

    eliminarPaciente(paciente: any): void {
        console.log('funciona paciente delete', paciente);
        this.dialog.open(DeletePatient, {
            width: '250px',
            data: { paciente: paciente }
        });
    }

    getPatients() {
        this._patientService.getPatient().then(response => {
            if (response && response.patients) {
                // Asigna los pacientes obtenidos al arreglo patients
                this.patients = response.patients;
    
                // Imprime los pacientes obtenidos para verificar
                console.log('Pacientes obtenidos:', this.patients);
    
                // Actualiza la fuente de datos de la tabla
                this.dataSource.data = this.patients;
    
                // Imprime el dataSource.data para verificar
                console.log('Datos del dataSource:', this.dataSource.data);
            } else {
                console.error('Error: No se encontraron pacientes en la respuesta.');
            }
        }).catch(error => {
            console.error('Error al obtener pacientes:', error);
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

    ngOnInit(): void {
        this.getPatients(); 
    }

    redirectCreate(){
        this._router.navigateByUrl("/patient/create");
    }
}