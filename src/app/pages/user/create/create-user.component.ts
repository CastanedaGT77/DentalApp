import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import Swal from 'sweetalert2';
import { NgxSpinnerService } from 'ngx-spinner';
import { MatSnackBar } from "@angular/material/snack-bar";
import { ActivatedRoute, Router } from "@angular/router";
import { MatDialog } from "@angular/material/dialog";
import { UserService } from "../user.service";
import { RoleService } from "../../role/role.service";
import { CreateUserDto } from "src/app/data/dtos/user/CreateUserDTO";

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
    form: FormGroup;
    roles: Role[] = [];
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
        private readonly _roleService: RoleService
    ) {
        this.type = this._route.snapshot.data["type"] ?? "create";
        this.createForm();
    }

    private createForm() {
        this.form = this._formBuilder.group({
            firstName: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(255)]],
            lastName: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(255)]],
            email: ['', [Validators.required, Validators.email]],
            password: ['', Validators.required],
            role: [null, Validators.required],
            allowBranchView: [true, Validators.required]
        });
    }

    async ngOnInit() {
        this.roles = await this._roleService.getRoles();
    }

    selectRole(roleId: number) {
        this.selectedRoleId = roleId;
        this.form.controls['role'].setValue(roleId);
    }

    async returnPage() {
        this._router.navigateByUrl("/user/list");
    }

    async onSubmit() {
        if (this.form.invalid) {
            const errorMessage = "Verifique todos los campos del formulario.";
            this._snackBarService.open(errorMessage, '', { horizontalPosition: "center", verticalPosition: "top", duration: 5000 });
            return;
        }

        if (this.form.valid) {
            Swal.fire({
                title: "",
                text: `¿Desea finalizar la ${this.type === 'create' ? 'creación' : 'edición'} de Usuario?`,
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Finalizar",
                cancelButtonText: "Cancelar"
            }).then(async (result) => {
                if (result.isConfirmed) {
                    this._spinnerService.show();
                    const userData: Partial<CreateUserDto> = {
                        ...this.form.value
                    };
                    try {
                        const response = this.type === 'create' ?
                            await this._userService.createUser(userData) :
                            await this._userService.updateUser(userData);
                        
                        if (response && response.code === 201) {
                            const message = `Usuario ${this.type === 'create' ? 'creado' : 'actualizado'} correctamente`;
                            this._snackBarService.open(message, '', { horizontalPosition: "center", verticalPosition: "top", duration: 5000 });
                            this.form.reset();
                            this.returnPage();
                        } else {
                            throw new Error("Error en la operación");
                        }
                    } catch (error) {
                        const errorMessage = `Error al ${this.type === 'create' ? 'crear' : 'editar'} el Usuario`;
                        this._snackBarService.open(errorMessage, '', { horizontalPosition: "center", verticalPosition: "top", duration: 5000 });
                    } finally {
                        this._spinnerService.hide();
                    }
                }
            });
        }
    }
}
