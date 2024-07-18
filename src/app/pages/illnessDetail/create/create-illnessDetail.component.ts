import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { CreatePatientDto } from "src/app/data/dtos/patient/CreatePatientDto";
import Swal from 'sweetalert2';
import { NgxSpinnerService } from 'ngx-spinner';
import { MatSnackBar } from "@angular/material/snack-bar";
import { ActivatedRoute, Router } from "@angular/router";
import {  MatDialog } from "@angular/material/dialog";
import { IllnessDetailService } from "../../illnessDetail/illnessDetail.service";
import { DomSanitizer, SafeResourceUrl } from "@angular/platform-browser";
import { CreateIllnessDetailDto } from '../../../data/dtos/IllnessDetail/CreateIllnessDetailDTO';
import { UpdateIllnessDetailDto } from 'src/app/data/dtos/IllnessDetail/UpdateIllnessDetailDTO';


@Component({
    selector: "app-create-illnessDetail",
    templateUrl: "./create-illnessDetail.component.html",
})

export class CreateIllnessDetailComponent implements OnInit {
    
    type: "create" | "edit";
    illnessDetail: any;
    form: FormGroup;
    illnessDetailId: number;


    constructor(
        private readonly _formBuilder: FormBuilder,
        private readonly _spinnerService: NgxSpinnerService,
        private readonly _snackBarService: MatSnackBar,
        private readonly _router: Router,
        private readonly _route: ActivatedRoute,
        private readonly _dialog: MatDialog,
        private readonly _illnessDetailService: IllnessDetailService,
        private readonly _sanitizer: DomSanitizer
    ){
        this.type = this._route.snapshot.data["type"] ?? "create";
        this.createForm();
    }

    private createForm(){
        this.form = this._formBuilder.group({
            name: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(255)]],
            description: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(255)]],    
        });
    }

    async ngOnInit() {
        if(this.type === "create"){
            //this.getDetalles();
        }
        else if(this.type === "edit"){
            //console.log('statee',history.state)
            this.illnessDetail = history.state.illnessDetail;
            await this.initializeForm();
        }
    }



    async returnPage(){
        this._router.navigateByUrl("/illnessDetail/list");
    }

    async onSubmit() {
        if(this.form.invalid){
            const errorMessage = "Verifique todos los campos del formulario.";
            this._snackBarService.open(errorMessage, '', { horizontalPosition: "center", verticalPosition: "top", duration: 5000 });
            return;
        }
        // Verifica si el formulario es válido
        if(this.form.valid){
            if(this.type === "create"){
                // Muestra el diálogo de confirmación
                Swal.fire({
                    title: "",
                    text: "¿Desea finalizar la creación de illnessdetail?",
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
                        // Asigna los detalles de la enfermedad al objeto de datos
                        const data: Partial<CreateIllnessDetailDto> = this.form.value;
                        try {
                            //Crear el paciente
                            const response = await this._illnessDetailService.createIllnessDetail(data);
                            if (response && response.code === 201) {
                                
                                // Si la creación es exitosa, muestra un mensaje de éxito y realiza acciones adicionales si es necesario
                                const message = "Illness creada correctamente";
                                this._snackBarService.open(message, '', { horizontalPosition: "center", verticalPosition: "top", duration: 5000 });
                                this.form.reset();
                                this.returnPage();
                            } else {
                                // Si la creación falla, muestra un mensaje de error
                                const errorMessage = "Error al crear el Illness";
                                this._snackBarService.open(errorMessage, '', { horizontalPosition: "center", verticalPosition: "top", duration: 5000 });
                            }
                        } catch (error) {
                            // Maneja cualquier error que ocurra durante la creación del paciente
                            console.error("Error al crear el Illness:", error);
                            const errorMessage = "Error al crear el Illness";
                            this._snackBarService.open(errorMessage, '', { horizontalPosition: "center", verticalPosition: "top", duration: 5000 });
                        } finally {
                            // Oculta el spinner después de realizar la operación
                            this._spinnerService.hide();
                        }
                    }
                });
            } else if(this.type === "edit"){
                // Muestra el diálogo de confirmación
                Swal.fire({
                    title: "",
                    text: "¿Desea finalizar la edición de illnessdetail?",
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
                        // Asigna los detalles de la enfermedad al objeto de datos
                        const data: Partial<UpdateIllnessDetailDto> = this.form.value;
                        try {
                            //Crear el paciente
                            const response = await this._illnessDetailService.updateIllnessDetail({id: this.illnessDetailId, ...data});
                            if (response && response.code === 201) {
                               
                                // Si la creación es exitosa, muestra un mensaje de éxito y realiza acciones adicionales si es necesario
                                const message = "illnessdetail editado correctamente";
                                this._snackBarService.open(message, '', { horizontalPosition: "center", verticalPosition: "top", duration: 5000 });
                                this.form.reset();
                                this.returnPage();
                            } else {
                                // Si la creación falla, muestra un mensaje de error
                                const errorMessage = "Error al editar el illnessdetail";
                                this._snackBarService.open(errorMessage, '', { horizontalPosition: "center", verticalPosition: "top", duration: 5000 });
                            }
                        } catch (error) {
                            // Maneja cualquier error que ocurra durante la creación del paciente
                            console.error("Error al editar el illnessdetail:", error);
                            const errorMessage = "Error al editar el illnessdetail";
                            this._snackBarService.open(errorMessage, '', { horizontalPosition: "center", verticalPosition: "top", duration: 5000 });
                        } finally {
                            // Oculta el spinner después de realizar la operación
                            this._spinnerService.hide();
                        }
                    }
                });
            }
        }
    }


    private async initializeForm(){
        this.illnessDetailId = this.illnessDetail.id;
        console.log('illness para iniciar edit',this.illnessDetail.name)
        this.form.controls["name"].setValue(this.illnessDetail.name);
        this.form.controls["description"].setValue(this.illnessDetail.description);
        
    }

}