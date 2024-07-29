import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { MatSnackBar } from "@angular/material/snack-bar";
import { ActivatedRoute, Router } from "@angular/router";
import { NestedTreeControl } from "@angular/cdk/tree";
import { MatTreeNestedDataSource } from "@angular/material/tree";
import { RoleService } from "../role.service";
import { CreateRoleDto } from "src/app/data/dtos/role/CreateRoleDTO";

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

  constructor(
    private readonly _formBuilder: FormBuilder,
    private readonly _snackBarService: MatSnackBar,
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

  onSubmit() {
    if (this.form.invalid) {
      this._snackBarService.open('Complete todos los campos.', '', { duration: 3000 });
      return;
    }

    const selectedPermissions = this.getSelectedPermissions(this.dataSource.data);
    const newRole: CreateRoleDto = {
      name: this.form.controls['name'].value,
      permissions: selectedPermissions
    };

    // console.log('rol guardar',newRole)

    this._roleService.createRole(newRole).then(response => {
      if (response) {
        this._snackBarService.open('Rol creado exitosamente.', '', { duration: 3000 });
        this.returnPage();
      } else {
        this._snackBarService.open('Error al crear el rol.', '', { duration: 3000 });
      }
    });
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
