import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { MatSnackBar } from "@angular/material/snack-bar";
import { ActivatedRoute, Router } from "@angular/router";
import { NestedTreeControl } from "@angular/cdk/tree";
import { MatTreeNestedDataSource } from "@angular/material/tree";
import { RoleService } from "../role.service";
import { CreateRoleDto } from "src/app/data/dtos/role/CreateRoleDTO";
import { UpdateRoleDto } from "src/app/data/dtos/role/UpdateRoleDTO";
import { NgxSpinnerService } from "ngx-spinner";
import Swal from "sweetalert2";

interface Permission {
  id: number;
  name: string;
  parentId: number;
}

interface TreeNode {
  id: number;
  name: string;
  parentId: number | null;
  children?: TreeNode[];
  checked?: boolean;
}

@Component({
  selector: "app-create-role",
  templateUrl: "./create-role.component.html"
})
export class CreateRoleComponent implements OnInit {
  form: FormGroup;
  type: "create" | "edit";
  treeControl: NestedTreeControl<TreeNode>;
  dataSource: MatTreeNestedDataSource<TreeNode>;
  roleToEdit: any;

  constructor(
    private readonly _formBuilder: FormBuilder,
    private readonly _snackBarService: MatSnackBar,
    private readonly _spinnerService: NgxSpinnerService,
    private readonly _router: Router,
    private readonly _route: ActivatedRoute,
    private readonly _roleService: RoleService
  ) {
    this.type = this._route.snapshot.data["type"] ?? "create";
    this.treeControl = new NestedTreeControl<TreeNode>(node => node.children);
    this.dataSource = new MatTreeNestedDataSource<TreeNode>();
    this.createForm();
  }

  private createForm() {
    this.form = this._formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(255)]]
    });
  }

  async ngOnInit() {
    const perms = await this._roleService.getPermissions();
    this.dataSource.data = this.buildTree(perms);
    this.treeControl.collapseAll();

    if (history.state && history.state.role) {
      this.roleToEdit = history.state.role;
      this.type = 'edit';
      this.initializeForm();
    }
  }

  buildTree(permissions: Permission[]): TreeNode[] {
    const map = new Map<number, TreeNode>();
    const roots: TreeNode[] = [];

    permissions.forEach(permission => {
      map.set(permission.id, { ...permission, children: [] });
    });

    permissions.forEach(permission => {
      const node = map.get(permission.id);
      if (permission.parentId !== null && permission.parentId !== 0) {
        const parent = map.get(permission.parentId);
        if (parent) {
          parent.children!.push(node!);
        }
      } else {
        roots.push(node!);
      }
    });

    return roots;
  }

  hasChild = (_: number, node: TreeNode) => !!node.children && node.children.length > 0;

  toggleNodeExpansion(node: TreeNode, event: Event) {
    event.stopPropagation();
    if (this.treeControl.isExpanded(node)) {
      this.treeControl.collapse(node);
    } else {
      this.treeControl.expand(node);
    }
  }

  onCheckChange(node: TreeNode, checked: boolean) {
    this.updateChildNode(node, checked);
    this.updateParentNode(node);
  }

  updateChildNode(node: TreeNode, checked: boolean) {
    node.checked = checked;
    if (node.children) {
      node.children.forEach(child => this.updateChildNode(child, checked));
    }
  }

  updateParentNode(node: TreeNode) {
    const parentId = node.parentId;
    if (parentId !== null) {
      const parentNode = this.findParentNode(this.dataSource.data, parentId);
      if (parentNode) {
        parentNode.checked = parentNode.children!.some(child => child.checked);
        this.updateParentNode(parentNode);
      }
    }
  }

  findParentNode(nodes: TreeNode[], parentId: number): TreeNode | null {
    for (const node of nodes) {
      if (node.id === parentId) {
        return node;
      }
      if (node.children) {
        const found = this.findParentNode(node.children, parentId);
        if (found) {
          return found;
        }
      }
    }
    return null;
  }

  initializeForm() {
    this.form.controls['name'].setValue(this.roleToEdit.name);
    this.checkPermissions(this.dataSource.data, this.roleToEdit.permissions);
  }

  checkPermissions(nodes: TreeNode[], permissions: Permission[]) {
    for (const node of nodes) {
      if (permissions.some(p => p.id === node.id)) {
        node.checked = true;
      }
      if (node.children) {
        this.checkPermissions(node.children, permissions);
      }
    }
  }

  async onSubmit() {
    if (this.form.invalid) {
      const errorMessage = "Verifique todos los campos del formulario.";
      this._snackBarService.open(errorMessage, '', { horizontalPosition: "center", verticalPosition: "top", duration: 5000 });
      return;
    }
  
    // Verifica si el formulario es válido
    if (this.form.valid) {
      const confirmText = this.type === "create" ? "¿Desea finalizar la creación del Rol?" : "¿Desea finalizar la edición del Rol?";
      const successMessage = this.type === "create" ? "Rol creado correctamente" : "Rol actualizado correctamente";
      const errorMessage = this.type === "create" ? "Error al crear el rol" : "Error al actualizar el rol";
  
      // Muestra el diálogo de confirmación
      Swal.fire({
        title: "",
        text: confirmText,
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Finalizar",
        cancelButtonText: "Cancelar"
      }).then(async (result) => {
        if (result.isConfirmed) {
          // Muestra un mensaje para indicar que se está procesando la solicitud
          this._spinnerService.show();
  
          const selectedPermissions = this.getSelectedPermissions(this.dataSource.data);
          const roleData = {
            name: this.form.controls['name'].value,
            permissions: selectedPermissions
          };
  
          try {
            let response;
            if (this.type === 'create') {
              response = await this._roleService.createRole(roleData as CreateRoleDto);
            } else if (this.type === 'edit') {
              const updatedRole: UpdateRoleDto = {
                id: this.roleToEdit.id,
                ...roleData
              };
              response = await this._roleService.updateRole(updatedRole);
            }
  
            if (response && ((this.type === 'create' && response.code === 201) || (this.type === 'edit' && response.code === 200))) {
              this._snackBarService.open(successMessage, '', { horizontalPosition: "center", verticalPosition: "top", duration: 5000 });
              this.form.reset();
              this.returnPage();
            } else {
              this._snackBarService.open(errorMessage, '', { horizontalPosition: "center", verticalPosition: "top", duration: 5000 });
            }
          } catch (error) {
            console.error(errorMessage, error);
            this._snackBarService.open(errorMessage, '', { horizontalPosition: "center", verticalPosition: "top", duration: 5000 });
          } finally {
            this._spinnerService.hide();
          }
        }
      });
    }
  }

  getSelectedPermissions(nodes: TreeNode[]): number[] {
    let selected: number[] = [];
    for (const node of nodes) {
      if (node.checked) {
        selected.push(node.id);
      }
      if (node.children) {
        selected = selected.concat(this.getSelectedPermissions(node.children));
      }
    }
    return selected;
  }

  async returnPage() {
    this._router.navigateByUrl("/role/list");
  }
}
