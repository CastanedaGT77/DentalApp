import { Component } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { MatDialog } from "@angular/material/dialog";
import { MatSnackBar } from "@angular/material/snack-bar";
import { ActivatedRoute, Router } from "@angular/router";
import { NgxSpinnerService } from "ngx-spinner";
import { BranchService } from "../branch.service";
import { DomSanitizer } from "@angular/platform-browser";
import Swal from "sweetalert2";
import { MatTableDataSource } from "@angular/material/table";
import { CreateBranchDTO } from "src/app/data/dtos/branch/CreateBranchDTO";
import { UpdateBranchDTO } from "src/app/data/dtos/branch/UpdateBranchDTO";

@Component({
    selector: "app-create-branch",
    templateUrl: "./create-branch.component.html"
})
export class CreateBranchComponent {
 
    type: "create" | "edit";
    branch: any;
    form: FormGroup;
    branchId: number;

    constructor(
        private readonly _formBuilder: FormBuilder,
        private readonly _spinnerService: NgxSpinnerService,
        private readonly _snackBarService: MatSnackBar,
        private readonly _router: Router,
        private readonly _route: ActivatedRoute,
        private readonly _dialog: MatDialog,
        private readonly _branchService: BranchService,
        private readonly _sanitizer: DomSanitizer
    ){
        this.type = this._route.snapshot.data["type"] ?? "create";
        this.createForm();
    }

    private createForm(){
        this.form = this._formBuilder.group({
            name: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(255)]]
        });
    }

    private async initializeForm(){
        this.branchId = this.branch.id;
        console.log('illness para iniciar edit',this.branch.name)
        this.form.controls["name"].setValue(this.branch.name);
    }

    async ngOnInit() {
        if(this.type === "create"){
            //this.getDetalles();
        }
        else if(this.type === "edit"){
            //console.log('statee',history.state)
            this.branch = history.state.branch;
            await this.initializeForm();
        }
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
                    text: "¿Desea finalizar la creación de treatmentType?",
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
                        const data: Partial<CreateBranchDTO> = this.form.value;
                        try {
                            //Crear el paciente
                            const response = await this._branchService.createBranch(data);
                            if (response) {
                                
                                // Si la creación es exitosa, muestra un mensaje de éxito y realiza acciones adicionales si es necesario
                                const message = "branch creada correctamente";
                                this._snackBarService.open(message, '', { horizontalPosition: "center", verticalPosition: "top", duration: 5000 });
                                this.form.reset();
                                this.returnPage();
                            } else {
                                // Si la creación falla, muestra un mensaje de error
                                const errorMessage = "Error al crear el branch";
                                this._snackBarService.open(errorMessage, '', { horizontalPosition: "center", verticalPosition: "top", duration: 5000 });
                            }
                        } catch (error) {
                            // Maneja cualquier error que ocurra durante la creación del paciente
                            console.error("Error al crear el branch:", error);
                            const errorMessage = "Error al crear el branch";
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
                    text: "¿Desea finalizar la edición de treatmentType?",
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
                        const data: Partial<UpdateBranchDTO> = this.form.value;
                        try {
                            //Crear el paciente
                            const response = await this._branchService.updateBranch({id: this.branchId, ...data});
                            if (response) {
                               
                                // Si la creación es exitosa, muestra un mensaje de éxito y realiza acciones adicionales si es necesario
                                const message = "branch editado correctamente";
                                this._snackBarService.open(message, '', { horizontalPosition: "center", verticalPosition: "top", duration: 5000 });
                                this.form.reset();
                                this.returnPage();
                            } else {
                                // Si la creación falla, muestra un mensaje de error
                                const errorMessage = "Error al editar el branch";
                                this._snackBarService.open(errorMessage, '', { horizontalPosition: "center", verticalPosition: "top", duration: 5000 });
                            }
                        } catch (error) {
                            // Maneja cualquier error que ocurra durante la creación del paciente
                            console.error("Error al editar el branch:", error);
                            const errorMessage = "Error al editar el branch";
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
    
    async returnPage(){
        this._router.navigateByUrl("/branch/list");
    }
   
}