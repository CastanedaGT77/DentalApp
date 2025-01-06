import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { CreatePatientDto } from "src/app/data/dtos/patient/CreatePatientDto";
import { PatientService } from '../patient.service';
import Swal from 'sweetalert2';
import { NgxSpinnerService } from 'ngx-spinner';
import { MatSnackBar } from "@angular/material/snack-bar";
import { ActivatedRoute, Router } from "@angular/router";
import { MatDialog } from "@angular/material/dialog";
import { AddImage } from "../image/add-image.component";
import { IllnessDetailService } from "../../illnessDetail/illnessDetail.service";
import { DomSanitizer, SafeResourceUrl } from "@angular/platform-browser";

class DetalleEnfermedad {
    id: number;
    name: string;
    selected: boolean;
}

@Component({
    selector: "app-create-patient",
    templateUrl: "./create-patient.component.html",
})
export class CreatePatientComponent implements OnInit {
    isLinear = false;
    form: FormGroup;
    form2: FormGroup;
    public previsualizacion!: string;
    detallesEnfermedad: DetalleEnfermedad[];
    type: "create" | "edit";
    patientId: number;
    public archivos!: any;
    paciente: any;
    illnessDetails: any;
    sanitizedImage: SafeResourceUrl | null;

    constructor(
        private readonly _patientService: PatientService,
        private readonly _formBuilder: FormBuilder,
        private readonly _spinnerService: NgxSpinnerService,
        private readonly _snackBarService: MatSnackBar,
        private readonly _router: Router,
        private readonly _route: ActivatedRoute,
        private readonly _dialog: MatDialog,
        private readonly _illnessDetailService: IllnessDetailService,
        private readonly _sanitizer: DomSanitizer
    ) {
        this.detallesEnfermedad = [];
        this.type = this._route.snapshot.data["type"] ?? "create";
        this.createForm();
    }

    async ngOnInit() {
        if (this.type === "create") {
            this.getDetalles();
        } else if (this.type === "edit") {
            this.paciente = history.state.paciente;
            console.log(this.paciente)
            this.sanitizedImage = this._getImage(this.paciente.id);
            this.initializeDetalles();
            await this.initializeForm();
        }
    }

    private async _getImage(patientId: number) {
        if (patientId) {
          const response = await this._patientService.getProfileImage(patientId);
          if (response) {
            this.sanitizedImage = this._sanitizer.bypassSecurityTrustResourceUrl(response.data);
          }
        } return this.sanitizedImage;
      }

    private async getDetalles() {
        const details = await this._illnessDetailService.getIllnessDetails();
        if (details) {
            details.forEach((d: any) => {
                this.detallesEnfermedad.push({ ...d, selected: false });
            });
        }
    }

    private async initializeDetalles() {
        const details = await this._illnessDetailService.getIllnessDetails();
        const patientDetails = this.paciente.illnessDetails;
        if (details && patientDetails) {
            details.forEach((d: any) => {
                const assignedDetail = patientDetails.find((detail: any) => detail.id === d.id);
                if (assignedDetail) {
                    this.detallesEnfermedad.push({ ...d, selected: true });
                } else {
                    this.detallesEnfermedad.push({ ...d, selected: false });
                }
            });
        }
    }

    private createForm() {
        this.form = this._formBuilder.group({
            firstName: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(255)]],
            lastName: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(255)]],
            phoneNumber: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(8)]],
            cellPhoneNumber: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(8)]],
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
            firstName: ['', [Validators.required, Validators.pattern('[a-zA-ZñÑáéíóúÁÉÍÓÚ ]*'), Validators.minLength(1), Validators.maxLength(2)]],
            lastName: ['', Validators.required],
        })
    }

    private async initializeForm() {
        if (this.paciente) {
            this.patientId = this.paciente.id;
            this.form.controls["firstName"].setValue(this.paciente.firstName);
            this.form.controls["lastName"].setValue(this.paciente.lastName);
            this.form.controls["phoneNumber"].setValue(this.paciente.phoneNumber);
            this.form.controls["cellPhoneNumber"].setValue(this.paciente.cellPhoneNumber);
            this.form.controls["city"].setValue(this.paciente.city);
            const date = new Date(this.paciente.birthDate);
            const year = date.getFullYear();
            const month = String(date.getMonth() + 1).padStart(2, '0');
            const day = String(date.getDate()).padStart(2, '0');
            const formattedDate = `${year}-${month}-${day}`;
            this.form.controls["birthDate"].setValue(formattedDate);
            this.form.controls["address"].setValue(this.paciente.address);
            this.form.controls["email"].setValue(this.paciente.email);
            this.form.controls["recommendedBy"].setValue(this.paciente.recommendedBy);
            this.form.controls["personInCharge"].setValue(this.paciente.personInCharge);
            this.form.controls["maritalStatus"].setValue(this.paciente.maritalStatus);
            this.form.controls["occupation"].setValue(this.paciente.occupation);
            this.form.controls["previousDentist"].setValue(this.paciente.previousDentist);
            this.form.controls["personalDoctor"].setValue(this.paciente.personalDoctor);
        } else {
            console.error("No se encontró el paciente en el estado.");
        }
    }

    async returnPage() {
        this._router.navigateByUrl("/patient/list");
    }

    openDialog(enterAnimationDuration: string, exitAnimationDuration: string): void {
        this._dialog.open(AddImage, {
            width: '500px',
            enterAnimationDuration,
            exitAnimationDuration,
        });
    }

    mostrarDetalles() {
        console.log("DETALLES:::::::", this.detallesEnfermedad);
    }

    async onSubmit() {
        if (this.form.invalid) {
            const errorMessage = "Verifique todos los campos del formulario.";
            this._snackBarService.open(errorMessage, '', { horizontalPosition: "center", verticalPosition: "top", duration: 5000 });
            return;
        }

        if (this.form.valid) {
            const data: Partial<CreatePatientDto> = this.form.value;
            const illnessDetailsIds = this.detallesEnfermedad.filter(x => x.selected).map(x => x.id);
            console.log('enfermedades para guardar', illnessDetailsIds);

            if (this.type === "create") {
                Swal.fire({
                    title: "",
                    text: "¿Desea finalizar la creación de Paciente?",
                    icon: "warning",
                    showCancelButton: true,
                    confirmButtonColor: "#3085d6",
                    cancelButtonColor: "#d33",
                    confirmButtonText: "Finalizar",
                    cancelButtonText: "Cancelar"
                }).then(async (result) => {
                    if (result.isConfirmed) {
                        this._spinnerService.show();

                        try {
                            const response = await this._patientService.createPatient({ ...data, illnessDetails: illnessDetailsIds });
                            if (response && response.code === 201) {
                                const profileImage = this._patientService.capturedImage;
                                if (profileImage) {
                                    await this._patientService.setProfileImage({ id: response.data, image: profileImage });
                                }
                                const message = "Paciente creado correctamente";
                                this._snackBarService.open(message, '', { horizontalPosition: "center", verticalPosition: "top", duration: 5000 });
                                this.form.reset();
                                this.returnPage();
                            } else {
                                const errorMessage = "Error al crear el Paciente";
                                this._snackBarService.open(errorMessage, '', { horizontalPosition: "center", verticalPosition: "top", duration: 5000 });
                            }
                        } catch (error) {
                            console.error("Error al crear el Paciente:", error);
                            const errorMessage = "Error al crear el Paciente";
                            this._snackBarService.open(errorMessage, '', { horizontalPosition: "center", verticalPosition: "top", duration: 5000 });
                        } finally {
                            this._spinnerService.hide();
                        }
                    }
                });
            } else if (this.type === "edit") {
                Swal.fire({
                    title: "",
                    text: "¿Desea finalizar la edición de Paciente?",
                    icon: "warning",
                    showCancelButton: true,
                    confirmButtonColor: "#3085d6",
                    cancelButtonColor: "#d33",
                    confirmButtonText: "Finalizar",
                    cancelButtonText: "Cancelar"
                }).then(async (result) => {
                    if (result.isConfirmed) {
                        this._spinnerService.show();

                        try {
                            const response = await this._patientService.updatePatient({ id: this.patientId, ...data, illnessDetails: illnessDetailsIds });
                            if (response && response.code === 201) {
                                const profileImage = this._patientService.capturedImage;
                                if (profileImage) {
                                    await this._patientService.setProfileImage({ id: this.patientId, image: profileImage });
                                }
                                const message = "Paciente editado correctamente";
                                this._snackBarService.open(message, '', { horizontalPosition: "center", verticalPosition: "top", duration: 5000 });
                                this.form.reset();
                                this.returnPage();
                            } else {
                                const errorMessage = "Error al editar el Paciente";
                                this._snackBarService.open(errorMessage, '', { horizontalPosition: "center", verticalPosition: "top", duration: 5000 });
                            }
                        } catch (error) {
                            console.error("Error al editar el Paciente:", error);
                            const errorMessage = "Error al editar el Paciente";
                            this._snackBarService.open(errorMessage, '', { horizontalPosition: "center", verticalPosition: "top", duration: 5000 });
                        } finally {
                            this._spinnerService.hide();
                        }
                    }
                });
            }
        }
    }
}
