import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { CreatePatientDto } from "src/app/data/dtos/patient/CreatePatientDto";
import { PatientService } from '../patient.service';
import Swal from 'sweetalert2';
import { NgxSpinnerService } from 'ngx-spinner';
import { MatSnackBar } from "@angular/material/snack-bar";
import { ActivatedRoute, Router } from "@angular/router";
import {  MatDialog } from "@angular/material/dialog";
import { AddImage } from "../image/add-image.component";
import { DomSanitizer } from "@angular/platform-browser";

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
    public archivos!: any;
    paciente: any;
    
    constructor(
        private readonly _patientService: PatientService,
        private readonly _formBuilder: FormBuilder,
        private readonly _spinnerService: NgxSpinnerService,
        private readonly _snackBarService: MatSnackBar,
        private readonly _router: Router,
        private readonly _route: ActivatedRoute,
        public dialog: MatDialog,
        private sanitizer: DomSanitizer
    ){
        this.detallesEnfermedad = [];
        this.type = this._route.snapshot.data["type"] ?? "create";
        this.patientId = 1;
        this.createForm();
    }

    async ngOnInit() {
        this.getDetalles();

        if(this.type === "edit")
            this.paciente = history.state.paciente;
            console.log('Paciente seleccionado:', this.paciente);
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

    private createForm(){
        this.form = this._formBuilder.group({
            firstName: ['', Validators.required, Validators.minLength(1), Validators.maxLength(2)],
            lastName: ['', Validators.required],
            phoneNumber: ['', Validators.required],
            cellPhoneNumber: ['', Validators.required],
            email: ['', Validators.required],
            city: ['', Validators.required],
            address: ['', Validators.required],
            recommendedBy: ['', Validators.required],
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
        // Llenar formulario con los datos del paciente obtenidos
        console.log('paciente para iniciar edit',this.paciente.lastName)
        this.form.controls["firstName"].setValue(this.paciente.firstName);
        this.form.controls["lastName"].setValue(this.paciente.lastName);
        this.form.controls["phoneNumber"].setValue(this.paciente.phoneNumber);
        this.form.controls["cellPhoneNumber"].setValue(this.paciente.cellPhoneNumber);
        this.form.controls["email"].setValue(this.paciente.email);
        this.form.controls["city"].setValue(this.paciente.city);
        this.form.controls["address"].setValue(this.paciente.address);
        this.form.controls["recommendedBy"].setValue(this.paciente.recommendedBy);
        this.form.controls["personInCharge"].setValue(this.paciente.personInCharge);
        this.form.controls["maritalStatus"].setValue(this.paciente.maritalStatus);
        this.form.controls["occupation"].setValue(this.paciente.occupation);
        this.form.controls["personalDoctor"].setValue(this.paciente.personalDoctor);
        this.form.controls["previousDentist"].setValue(this.paciente.previousDentist);
        this.form.controls["birthDate"].setValue(this.paciente.birthDate);
        this.form.controls["profileImage"].setValue(this.paciente.profileImage);
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
            // Verifica si el formulario es válido
            console.log("Formulario válido");
            // Muestra el diálogo de confirmación
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
                    // Muestra un mensaje para indicar que se está creando el paciente
                    this._spinnerService.show();
                    // Obtén la imagen capturada del servicio ImageService
                    const profileImage = this._patientService.capturedImage;
                    // Asigna los detalles de la enfermedad al objeto de datos
                    const data: Partial<CreatePatientDto> = this.form.value;
                    data.profileImage = profileImage;
                    data.illnessDetails = [1,2,3]; // Asegúrate de que esto esté correctamente configurado
                    try {
                        //Crear el paciente
                        const response = await this._patientService.createPatient(data);
                        if (response) {
                            // Si la creación es exitosa, muestra un mensaje de éxito y realiza acciones adicionales si es necesario
                            const message = "Paciente creado correctamente";
                            this._snackBarService.open(message, '', { horizontalPosition: "center", verticalPosition: "top", duration: 5000 });
                            this.form.reset();
                            this.returnPage();
                        } else {
                            // Si la creación falla, muestra un mensaje de error
                            const errorMessage = "Error al crear el paciente";
                            this._snackBarService.open(errorMessage, '', { horizontalPosition: "center", verticalPosition: "top", duration: 5000 });
                        }
                    } catch (error) {
                        // Maneja cualquier error que ocurra durante la creación del paciente
                        console.error("Error al crear el paciente:", error);
                        const errorMessage = "Error al crear el paciente";
                        this._snackBarService.open(errorMessage, '', { horizontalPosition: "center", verticalPosition: "top", duration: 5000 });
                    } finally {
                        // Oculta el spinner después de realizar la operación
                        this._spinnerService.hide();
                    }
                }
            });
        
    }
    
    
    
}

  