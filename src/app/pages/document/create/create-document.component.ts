import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { MatSnackBar } from "@angular/material/snack-bar";
import { Router, ActivatedRoute } from "@angular/router";
import { NgxSpinnerService } from "ngx-spinner";
import { MatDialog } from "@angular/material/dialog";
import { DomSanitizer } from "@angular/platform-browser";
import Swal from "sweetalert2";
import { DocumentService } from "../document.service";
import { PatientService } from "../../patient/patient.service";

@Component({
    selector: "app-create-document",
    templateUrl: "./create-document.component.html"
})
export class CreateDocumentComponent implements OnInit {

    type: "create";
    form: FormGroup;
    fileToUpload: File | null = null;

    patients: any[] = [];
    fileCategories: any[] = [];

    constructor(
        private readonly _formBuilder: FormBuilder,
        private readonly _spinnerService: NgxSpinnerService,
        private readonly _snackBarService: MatSnackBar,
        private readonly _router: Router,
        private readonly _route: ActivatedRoute,
        private readonly _dialog: MatDialog,
        private readonly _documentService: DocumentService,
        private readonly _patientService: PatientService,
        private readonly _sanitizer: DomSanitizer
    ) {
        this.type = "create";
        this.createForm();
    }

    private createForm() {
        this.form = this._formBuilder.group({
            patientId: ['', [Validators.required]],
            fileCategoryId: ['', [Validators.required]],
            file: [null, [Validators.required]]
        });
    }

    async ngOnInit() {
        this.getPatients();
        this.getFileCategories();
    }

    async getPatients() {
        try {
            const response = await this._patientService.getPatient();
            this.patients = response.patients; 
        } catch (error) {
            console.error("Error al obtener pacientes", error);
        }
    }
    
    async getFileCategories() {
        try {
            const response = await this._documentService.getFileCategories();
            this.fileCategories = response.categories; 
        } catch (error) {
            console.error("Error al obtener categorías de archivo", error);
        }
    }

    handleFileInput(event: Event) {
        const input = event.target as HTMLInputElement;
        if (input.files && input.files.length > 0) {
            this.fileToUpload = input.files[0]; 
        }
    }

    async onSubmit() {
        if (this.form.invalid || !this.fileToUpload) {
            this._snackBarService.open("Verifique todos los campos del formulario", '', {
                duration: 5000,
                horizontalPosition: "center",
                verticalPosition: "top"
            });
            return;
        }

        Swal.fire({
            title: "",
            text: `¿Desea finalizar la creación del documento?`,
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Finalizar",
            cancelButtonText: "Cancelar"
        }).then(async (result) => {
            if (result.isConfirmed) {
                this._spinnerService.show();

                const formData = new FormData();
                formData.append('file', this.fileToUpload as File);
                formData.append('patientId', this.form.get('patientId')?.value);
                formData.append('fileCategoryId', this.form.get('fileCategoryId')?.value);

                try {
                    const response = await this._documentService.cargarDocumento(formData);
                    if (response) {
                        this._snackBarService.open("Documento cargado exitosamente", '', {
                            duration: 5000,
                            horizontalPosition: "center",
                            verticalPosition: "top"
                        });
                        this.form.reset();
                        this.returnPage();
                    } else {
                        throw new Error();
                    }
                } catch (error) {
                    this._snackBarService.open("Error al cargar el documento", '', {
                        duration: 5000,
                        horizontalPosition: "center",
                        verticalPosition: "top"
                    });
                } finally {
                    this._spinnerService.hide();
                }
            }
        });
    }

    async returnPage() {
        this._router.navigateByUrl("/document/list-all");
    }
}
