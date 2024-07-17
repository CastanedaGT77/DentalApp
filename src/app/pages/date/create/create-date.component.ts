import { Component } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { MatDialog } from "@angular/material/dialog";
import { MatSnackBar } from "@angular/material/snack-bar";
import { ActivatedRoute, Router } from "@angular/router";
import { NgxSpinnerService } from "ngx-spinner";
import { DomSanitizer } from "@angular/platform-browser";
import Swal from "sweetalert2";
import { DatePipe } from "@angular/common";
import { PatientService } from "../../patient/patient.service";
import { BranchService } from "../../branch/branch.service";
import { UserService } from "../../user/user.service";

@Component({
    selector: "app-create-date",
    templateUrl: "./create-date.component.html"
})
export class CreateDateComponent {
    type: "create" | "edit";
    form: FormGroup;
    patients!: any;
    branches!: any;
    users!: any;
    dataSource!: any;
    dataSourceBranch!: any;
    dataSourceUser!: any;


    constructor(
        private readonly _formBuilder: FormBuilder,
        private readonly _spinnerService: NgxSpinnerService,
        private readonly _snackBarService: MatSnackBar,
        private readonly _router: Router,
        private readonly _route: ActivatedRoute,
        private readonly _dialog: MatDialog,
        private readonly _patientService: PatientService,
        private readonly _branchService: BranchService,
        private readonly _userService: UserService,
        private readonly _sanitizer: DomSanitizer,
        private readonly datePipe: DatePipe
    ){
        this.type = this._route.snapshot.data["type"] ?? "create";
        this.createForm();
    }

    private createForm(){
        this.form = this._formBuilder.group({
            patientId: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(255)]],
            branchId: ['', Validators.required],
            assignedUser: ['', Validators.required],
            appointmentDate: ['', Validators.required],
            observations: ['', Validators.required],
            startHour: ['', Validators.required],
            endHour: ['', Validators.required],
        });
    }

    async ngOnInit() {
        if(this.type === "create"){
            //this.getDetalles();
        }
        else if(this.type === "edit"){
            //console.log('statee',history.state)
            // this.illnessDetail = history.state.illnessDetail;
            await this.initializeForm();
        }
        this.getBranches();
        this.getUsers();
        this.getPatients();
    }

    getPatients() {
        this._patientService.getPatient().then(response => {
            if (response && response.patients) {
                this.patients = response.patients;
                console.log('pacientes',this.patients)
            } else {
                console.error('Error: No se encontraron pacientes en la respuesta.');
            }
        }).catch(error => {
            console.error('Error al obtener pacientes:', error);
        });
    }

    async getBranches() {
        const response = await this._branchService.getBranches();
        if (response) {
            this.branches = response;
            this.dataSourceBranch.data = this.branches;
        } else {
            console.error('Error: No se encontraron datos en la respuesta.');
        }
    }

    async getUsers() {
        try {
            const response = await this._userService.getUsers();
            this.users = response;
            console.log("USERS:", this.users);
            this.dataSourceUser.data = this.users;
        } catch (error) {
            console.error('Error al obtener datos:', error);
        }
    }
    
    pruebaFecha(){
        const formattedDate = this.datePipe.transform(this.datetime, 'dd/MM/yyyy');
        console.log('fecha', this.datetime)
        console.log('fecha formateada', formattedDate)
        console.log('hora', this.time)
        console.log('datos para guardar cita', this.form)
    }

    get datetime() {
        return this.form.get('datetime')?.value;
    }
    
    get time() {
        return this.form.get('time')?.value;
    }

    async returnPage(){
        this._router.navigateByUrl("/date/calendar");
    }

    private async initializeForm(){
       
        
    }

}