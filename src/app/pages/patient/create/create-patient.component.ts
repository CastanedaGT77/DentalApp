import { Component, Inject, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, FormsModule, Validators } from "@angular/forms";
import { CreatePatientDto } from "src/app/data/dtos/patient/CreatePatientDto";
import { PatientService } from "../patient.service";
import Swal from 'sweetalert2';
import { NgxSpinnerService } from 'ngx-spinner';
import { MatSnackBar } from "@angular/material/snack-bar";
import { ActivatedRoute, Router } from "@angular/router";
import { MAT_DIALOG_DATA, MatDialog, MatDialogActions, MatDialogClose, MatDialogContent, MatDialogRef, MatDialogTitle } from "@angular/material/dialog";
import { MatButtonModule } from "@angular/material/button";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { AddImage } from "../image/add-image.component";

class DetalleEnfermedad {
    id: number;
    name: string;
    selected: boolean;
}

@Component({
    selector: "app-create-patient",
    templateUrl: "./create-patient.component.html",
})
export class CreatePatientComponent implements OnInit{
    // linea para definir sí el stepper te permite pasar o no
    isLinear = false;
    form: FormGroup;
    form2: FormGroup;
    formDetailles: FormGroup;
    public previsualizacion!: string;
    detallesEnfermedad: DetalleEnfermedad[];
    type: "create" | "edit";
    patient: any;
    patientId: number;
    
    constructor(
        private readonly _patientService: PatientService,
        private readonly _formBuilder: FormBuilder,
        private readonly _spinnerService: NgxSpinnerService,
        private readonly _snackBarService: MatSnackBar,
        private readonly _router: Router,
        private readonly _route: ActivatedRoute,
        public dialog: MatDialog
    ){
        this.detallesEnfermedad = [];
        this.type = this._route.snapshot.data["type"] ?? "create";
        this.patientId = 1;
        this.createForm();
    }

    async ngOnInit() {
        this.getDetalles();
        if(this.type === "edit")
            await this.initializeForm();
    }


    private getDetalles(){
        // Llamar al servicio
        this.detallesEnfermedad.push({id: 1, name: "A", selected: false});
        this.detallesEnfermedad.push({id: 2, name: "B", selected: false});
        this.detallesEnfermedad.push({id: 3, name: "C", selected: false});
        this.detallesEnfermedad.push({id: 4, name: "D", selected: false});
        this.detallesEnfermedad.push({id: 5, name: "E", selected: false});
        this.detallesEnfermedad.push({id: 6, name: "F", selected: false});
    }

    private createDetallesForm(){

    }

    private createForm(){
        this.form = this._formBuilder.group({
            firstName: ['', Validators.required, Validators.minLength(1), Validators.maxLength(2)],
            lastName: ['', Validators.required],
            phoneNumber: ['', Validators.required],
            cellPhoneNumber: ['', Validators.required],
            email: ['', Validators.required],
            city: ['', Validators.required],
            address: ['', Validators.required],
            recomendedBy: ['', Validators.required],
            personInCharge: ['', Validators.required],
            birthDate: ['', Validators.required],
            maritalStatus: ['', Validators.required],
            occupation: ['', Validators.required],
            personalDoctor: ['', Validators.required],
            previousDentist: ['', Validators.required],
            });
        this.form2 = this._formBuilder.group({
            firstName: ['', Validators.required, Validators.pattern('[a-zA-ZñÑáéíóúÁÉÍÓÚ ]*'), Validators.minLength(1), Validators.maxLength(2)],
            lastName: ['', Validators.required],
        })
    }

    private async initializeForm(){
        // Llamar a servicio para obtener paciente
        // Llenar formulario
        this.form.controls["firstName"].setValue("Edvin");
    }

    async returnPage(){
        this._router.navigateByUrl("/patient/list");
    }

    openDialog(enterAnimationDuration: string, exitAnimationDuration: string): void {
      this.dialog.open(AddImage, {
        width: '500px',
        enterAnimationDuration,
        exitAnimationDuration,
      });
    }

    mostrarDetalles(){
        console.log("DETALLES:::::::", this.detallesEnfermedad);
    }

    async onSubmit() {
        if (this.form.valid) {
            Swal.fire({
                title: "",
                text: "¿Desea finalizar la creación de usuario?",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Finalizar",
                cancelButtonText: "Cancelar"
              }).then(async (result) => {
                if (result.isConfirmed) {
                    this._spinnerService.show();
                    const data : Partial<CreatePatientDto> = this.form.value;
                    const response = await this._patientService.createPatient(data);
                    const message = response ? "Paciente creado correctamente" : "Error. No se ha podido crear";
                    this._snackBarService.open(message, '', {horizontalPosition: "center", verticalPosition: "top", duration: 5000});
                    this._spinnerService.hide();
                    if(this.type === "create"){
                        // Llamar a servicio para crear
                    }
                    else if(this.type === "edit"){
                        // Llamar a servicio editar
                    }
                }
              });
        }
    }
}

  