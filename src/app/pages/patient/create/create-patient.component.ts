import { Component, Inject } from "@angular/core";
import { FormBuilder, FormGroup, FormsModule, Validators } from "@angular/forms";
import { CreatePatientDto } from "src/app/data/dtos/patient/CreatePatientDto";
import { PatientService } from "../patient.service";
import Swal from 'sweetalert2';
import { NgxSpinnerService } from 'ngx-spinner';
import { MatSnackBar } from "@angular/material/snack-bar";
import { Router } from "@angular/router";
import { MAT_DIALOG_DATA, MatDialog, MatDialogActions, MatDialogClose, MatDialogContent, MatDialogRef, MatDialogTitle } from "@angular/material/dialog";
import { MatButtonModule } from "@angular/material/button";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { AddImage } from "../image/add-image.component";

@Component({
    selector: "app-create-patient",
    templateUrl: "./create-patient.component.html",
})

export class CreatePatientComponent {
    form: FormGroup;
    public previsualizacion!: string;
    constructor(
        private readonly _patientService: PatientService,
        private readonly _formBuilder: FormBuilder,
        private readonly _spinnerService: NgxSpinnerService,
        private readonly _snackBarService: MatSnackBar,
        private readonly _router: Router,
        public dialog: MatDialog
    ){
        this.createForm();
    }

    private createForm(){
        this.form = this._formBuilder.group({
            firstName: ['', Validators.required],
            lastName: ['', Validators.required],
            phoneNumber: ['', Validators.required],
            address: ['', Validators.required]
            });
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
                }
              });
        }
    }
}

  