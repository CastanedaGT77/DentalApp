import { Component } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { MatDialog } from "@angular/material/dialog";
import { MatSnackBar } from "@angular/material/snack-bar";
import { ActivatedRoute, Router } from "@angular/router";
import { NgxSpinnerService } from "ngx-spinner";
import { BranchService } from "../branch.service";
import { DomSanitizer } from "@angular/platform-browser";
import Swal from "sweetalert2";

@Component({
    selector: "app-create-branch",
    templateUrl: "./create-branch.component.html"
})
export class CreateBranchComponent {
 
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
        this._router.navigateByUrl("/branch/list");
    }

    async onSubmit() {
        if(this.form.invalid){
            const errorMessage = "Verifique todos los campos del formulario.";
            this._snackBarService.open(errorMessage, '', { horizontalPosition: "center", verticalPosition: "top", duration: 5000 });
            return;
        }
        if(this.form.valid){
            if(this.type === "create"){
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
                        this._spinnerService.show();
                        this._spinnerService.hide();
                    }
                });
            } else if(this.type === "edit"){
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
                        this._spinnerService.show();
                        this._spinnerService.hide();
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