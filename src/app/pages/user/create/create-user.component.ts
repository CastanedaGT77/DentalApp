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
import { UserService } from "../user.service";
import { RoleService } from "../../role/role.service";

interface Role {
    id: number;
    name: string;
}


@Component({
    selector: "app-create-user",
    templateUrl: "./create-user.component.html",
})

export class CreateUserComponent implements OnInit {
    
    type: "create" | "edit";
    illnessDetail: any;
    form: FormGroup;
    illnessDetailId: number;
    roles: Role[]
    hide = true;
    selectedRoleId: number | null = null;


    constructor(
        private readonly _formBuilder: FormBuilder,
        private readonly _spinnerService: NgxSpinnerService,
        private readonly _snackBarService: MatSnackBar,
        private readonly _router: Router,
        private readonly _route: ActivatedRoute,
        private readonly _dialog: MatDialog,
        private readonly _userService: UserService,
        private readonly _sanitizer: DomSanitizer,
        private readonly _roleService: RoleService
    ){
        this.type = this._route.snapshot.data["type"] ?? "create";
        this.createForm();
    }

    private createForm(){
        this.form = this._formBuilder.group({
            firstName: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(255)]],
            lastName: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(255)]],
            email: ['', Validators.required],
            password: ['', Validators.required]
        });
    }

    async ngOnInit() {
        this.roles = await this._roleService.getRoles();
        if(this.type === "create"){
            //this.getDetalles();
        }
        else if(this.type === "edit"){
            //console.log('statee',history.state)
            this.illnessDetail = history.state.illnessDetail;
            await this.initializeForm();
        }
    }

    selectRole(roleId: number) {
      if (this.selectedRoleId === roleId) {
        this.selectedRoleId = null;
      } else {
        this.selectedRoleId = roleId;
      }
    }


    async returnPage(){
        this._router.navigateByUrl("/user/list");
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
                    text: "¿Desea finalizar la creación de Usuario?",
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
                // Muestra el diálogo de confirmación
                Swal.fire({
                    title: "",
                    text: "¿Desea finalizar la edición de Usuario?",
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