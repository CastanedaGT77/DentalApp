import { Component, ViewChild, OnInit, AfterViewInit, TemplateRef } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { NestedTreeControl } from '@angular/cdk/tree';
import { MatTreeNestedDataSource } from '@angular/material/tree';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { RoleService } from '../role.service';
import { DeleteRole } from '../delete/delete-role.component';
import { EPermissions } from 'src/app/utils/permissionEnum';

interface Role {
  id: number;
  name: string;
  permissions: Permission[];
}

interface Permission {
  id: number;
  name: string;
  parentId?: number;
}

interface TreeNode {
  id: number;
  name: string;
  parentId?: number;
  children?: TreeNode[];
}

@Component({
  selector: 'app-role-user',
  templateUrl: './role-list.component.html',
})
export class RoleListComponent implements OnInit, AfterViewInit {
  roles: Role[] = [];
  selectedRole: Role | null = null;
  dataSource = new MatTableDataSource<Role>(this.roles);

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild('permissionsDialogTemplate') permissionsDialogTemplate!: TemplateRef<any>;

  treeControl = new NestedTreeControl<TreeNode>(node => node.children);
  treeDataSource = new MatTreeNestedDataSource<TreeNode>();

  crearRolPermiso: Array<EPermissions>;
  actualizarRolPermiso: Array<EPermissions>;
  eliminarRolPermiso: Array<EPermissions>;

  displayedColumns: string[] = ['id', 'name', 'permissions', 'actions'];

  constructor(
    private readonly _router: Router,
    public dialog: MatDialog,
    private _roleService: RoleService,
    private spinnerService: NgxSpinnerService
  ) {
    this.crearRolPermiso = [EPermissions.CREAR_ROLES] || [];
    this.actualizarRolPermiso = [EPermissions.ACTUALIZAR_ROLES] || [];
    this.eliminarRolPermiso = [EPermissions.ELIMINAR_ROLES] || [];
  }

  async ngOnInit() {
    this.spinnerService.show();
    await this.getRoles();
    this.spinnerService.hide();
  }

  async getRoles() {
    try {
      const response: Role[] = await this._roleService.getRoles();
      this.roles = response;
      this.dataSource.data = this.roles;
    } catch (error) {
      console.error('Error al obtener datos:', error);
    }
  }

  buildTree(permissions: Permission[]): TreeNode[] {
    const map = new Map<number, TreeNode>();
    const roots: TreeNode[] = [];

    // Crear nodos
    permissions.forEach(permission => {
      map.set(permission.id, { id: permission.id, name: permission.name, parentId: permission.parentId, children: [] });
    });

    // Establecer relaciones padre-hijo
    permissions.forEach(permission => {
      const node = map.get(permission.id);
      if (permission.parentId) {
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

  openPermissionsDialog(role: Role): void {
    this.selectedRole = role;

    // Construir el árbol de permisos
    const treeData = this.buildTree(role.permissions);
    this.treeDataSource.data = treeData;

    // Abrir el modal
    this.dialog.open(this.permissionsDialogTemplate, {
      width: '500px',
    });
  }

  hasChild = (_: number, node: TreeNode) => !!node.children && node.children.length > 0;

  editRole(role: Role) {
    this._router.navigate(['/role/edit'], { state: { role } });
  }

  deleteRole(role: Role): void {
    this.dialog.open(DeleteRole, {
      width: '300px',
      data: { role },
    }).afterClosed().subscribe(data => {
      if (data) {
        this.getRoles();
      }
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value.trim().toLowerCase();
    this.dataSource.filter = filterValue;
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  redirectCreate() {
    this._router.navigateByUrl('/role/create');
  }
}
