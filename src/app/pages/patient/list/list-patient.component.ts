import { Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { DeletePatient } from '../delete/delete-patient.component';
import { PatientService } from '../patient.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { EPermissions } from 'src/app/utils/permissionEnum';

@Component({
    selector: "app-list-patient",
    templateUrl: "./list-patient.component.html"
})
export class ListPatientComponent {
    patientsApproved = [];
    patientsUnapproved = [];
    patientsActive = [];
    patientsInactive = [];
    patientsAll = [];

    patientImage: string;
    sanitizedImage: SafeResourceUrl | null;
    
    displayedColumns: string[] = ['id', 'firstName', 'lastName', 'phoneNumber', 'email', 'active', 'actions'];

    dataSourceApproved = new MatTableDataSource<any>(this.patientsApproved);
    dataSourceUnapproved = new MatTableDataSource<any>(this.patientsUnapproved);
    dataSourceActive = new MatTableDataSource<any>(this.patientsActive);
    dataSourceInactive = new MatTableDataSource<any>(this.patientsInactive);
    dataSourceAll = new MatTableDataSource<any>(this.patientsAll);
  
    @ViewChild(MatPaginator) paginator: MatPaginator;
    // Define un paginator para cada tabla
    @ViewChild('paginatorApproved') paginatorApproved: MatPaginator;
    @ViewChild('paginatorUnapproved') paginatorUnapproved: MatPaginator;
    @ViewChild('paginatorActive') paginatorActive: MatPaginator;
    @ViewChild('paginatorInactive') paginatorInactive: MatPaginator;
    @ViewChild('paginatorAll') paginatorAll: MatPaginator;

    visualizarPaciente: Array<EPermissions>;
    crearPaciente: Array<EPermissions>;
    actualizarPaciente: Array<EPermissions>;
    eliminarPacientes: Array<EPermissions>;

    verTratamiento: Array<EPermissions>;
    verPago: Array<EPermissions>;

    constructor(
        private readonly _router: Router,
        public dialog: MatDialog,
        private _patientService: PatientService,
        private spinnerService: NgxSpinnerService,
        private readonly _sanitizer: DomSanitizer
    ){
        this.visualizarPaciente = [EPermissions.VISUALIZAR_PACIENTES] || [];
        this.crearPaciente = [EPermissions.CREAR_PACIENTES] || [];
        this.actualizarPaciente = [EPermissions.ACTUALIZAR_PACIENTES] || [];
        this.eliminarPacientes = [EPermissions.ELIMINAR_PACIENTES] || [];
        this.verTratamiento = [EPermissions.LISTAR_TRATAMIENTOS] || [];
        this.verPago = [EPermissions.LISTAR_PAGOS] || [];
    }

    async ngOnInit(){
        this.spinnerService.show();
        this.getPatients();
        this.getPatientsUnapproved();
        this.getPatientsActive();
        this.getPatientsInactive();
        this.getAllPatients();
        this.spinnerService.hide();
    }

    private async _getImage(patientId: number){
        if(patientId){
          const response = await this._patientService.getProfileImage(patientId);
          if(response){
            this.sanitizedImage = this._sanitizer.bypassSecurityTrustResourceUrl(response);
          }
        }
    }

    editarPaciente(paciente: any) {
        this._getImage(paciente.id).then(() => {
            this._router.navigate(['/patient/edit'], { state: { paciente: paciente, image: this.sanitizedImage } });
        }).catch(error => {
            console.error('Error al obtener la imagen del paciente:', error);
        });
    }

    eliminarPaciente(paciente: any): void {
        this.dialog.open(DeletePatient, {
            width: '300px',
            data: { paciente: paciente }
        }).afterClosed().subscribe(data => {
            if(data){
                this.getPatients();
            }
        });
    }

    getPatients() {
        this._patientService.getPatient().then(response => {
            if (response && response.patients) {
                this.patientsApproved = response.patients;
                this.dataSourceApproved.data = this.patientsApproved;
            } else {
                console.error('Error: No se encontraron pacientes aprobados en la respuesta.');
            }
        }).catch(error => {
            console.error('Error al obtener pacientes aprobados:', error);
        });
    }

    getPatientsUnapproved() {
        this._patientService.getPatientUnApproved().then(response => {
            if (response && response.patients) {
                this.patientsUnapproved = response.patients;
                this.dataSourceUnapproved.data = this.patientsUnapproved;
            } else {
                console.error('Error: No se encontraron pacientes no aprobados en la respuesta.');
            }
        }).catch(error => {
            console.error('Error al obtener pacientes no aprobados:', error);
        });
    }

    getPatientsActive() {
        this._patientService.getPatientActive().then(response => {
            if (response && response.data) {
                this.patientsActive = response.data;
                this.dataSourceActive.data = this.patientsActive;
            } else {
                console.error('Error: No se encontraron pacientes activos en la respuesta.');
            }
        }).catch(error => {
            console.error('Error al obtener pacientes activos:', error);
        });
    }

    getPatientsInactive() {
        this._patientService.getPatientInactive().then(response => {
            if (response && response.data) {
                this.patientsInactive = response.data;
                this.dataSourceInactive.data = this.patientsInactive;
            } else {
                console.error('Error: No se encontraron pacientes inactivos en la respuesta.');
            }
        }).catch(error => {
            console.error('Error al obtener pacientes inactivos:', error);
        });
    }

    getAllPatients() {
        this._patientService.getAllPatient().then(response => {
            if (response && response.data) {
                this.patientsAll = response.data;
                this.dataSourceAll.data = this.patientsAll;
            } else {
                console.error('Error: No se encontraron todos los pacientes en la respuesta.');
            }
        }).catch(error => {
            console.error('Error al obtener todos los pacientes:', error);
        });
    }

    // Método para aplicar el filtro en el dataSource correspondiente
    applyFilter(event: Event, dataSource: MatTableDataSource<any>) {
        const filterValue = (event.target as HTMLInputElement).value.trim().toLowerCase();
        dataSource.filter = filterValue;
    }

    ngAfterViewInit() {
        // Asigna cada paginator a su dataSource correspondiente
        this.dataSourceApproved.paginator = this.paginatorApproved;
        this.dataSourceUnapproved.paginator = this.paginatorUnapproved;
        this.dataSourceActive.paginator = this.paginatorActive;
        this.dataSourceInactive.paginator = this.paginatorInactive;
        this.dataSourceAll.paginator = this.paginatorAll;
    }

    redirectCreate(){
        this._router.navigateByUrl("/patient/create");
    }

    verDetalle(paciente: any) {
        this._router.navigate(['/patient/patientProfile'], { state: { paciente: paciente } });
    }

    verTratamientos(paciente: any) {
        const patientId = paciente.id ?? null;
        if(patientId){
            this._router.navigate(['/treatment/patientTreatment'], { state: { paciente: paciente } });
        }
    }

    redirectPendingPayment(paciente: any){
        this._router.navigate(['/payment/list'], { state: { paciente: paciente } });
    }
}
