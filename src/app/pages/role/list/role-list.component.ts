import { Component, ViewChild, OnInit, AfterViewInit, TemplateRef } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { DomSanitizer } from '@angular/platform-browser';
import { RoleService } from '../role.service';
import { DeleteRole } from '../delete/delete-role.component';
import { EPermissions } from 'src/app/utils/permissionEnum';

interface Role {
  id: number;
  name: string;
  permissions: Permission[];
  expanded: boolean;
}

interface Permission {
  id: number;
  name: string;
  parentId: number;
  created_at: string;
  updated_at: string;
}

@Component({
  selector: "app-role-user",
  templateUrl: "./role-list.component.html",
})
export class RoleListComponent implements OnInit, AfterViewInit {

  roles: Role[] = [];
  selectedRole: Role | null = null;
  dataSource = new MatTableDataSource<Role>(this.roles);
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild('permissionsDialogTemplate') permissionsDialogTemplate: TemplateRef<any>; // Añadido
  crearRolPermiso: Array<EPermissions>;
  actualizarRolPermiso: Array<EPermissions>;
  eliminarRolPermiso: Array<EPermissions>;

  displayedColumns: string[] = ['id', 'name', 'permissions', 'actions'];

  constructor(
    private readonly _router: Router,
    public dialog: MatDialog,
    private _roleService: RoleService,
    private spinnerService: NgxSpinnerService,
    private readonly _sanitizer: DomSanitizer
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
      this.roles = response.map(role => ({ ...role, expanded: false }));
      this.dataSource.data = this.roles;
    } catch (error) {
      console.error('Error al obtener datos:', error);
    }
  }

  openPermissionsDialog(role: Role): void {
    this.selectedRole = role;
    const dialogRef = this.dialog.open(this.permissionsDialogTemplate, {
      width: '400px'
    });

    dialogRef.afterClosed().subscribe(() => {
      this.selectedRole = null;
    });
  }

  editRole(role: Role) {
    this._router.navigate(['/role/edit'], { state: { role } });
  }

  deleteRole(role: Role): void {
    this.dialog.open(DeleteRole, {
      width: '300px',
      data: { role }
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
    this._router.navigateByUrl("/role/create");
  }
}
