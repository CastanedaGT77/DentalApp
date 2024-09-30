import { Routes } from '@angular/router';
import { RoleListComponent } from './list/role-list.component';
import { CreateRoleComponent } from './create/create-role.component';
import { AuthGuard } from 'src/app/guards/auth.guard';
import { EPermissions } from 'src/app/utils/permissionEnum';

export const RoleRouting: Routes = [
  {
    path: '',
    children: [
      {
        path: 'list',
        component: RoleListComponent,
        canActivate: [AuthGuard],
        data: {
          permissions: [EPermissions.LISTAR_ROLES] // Define el permiso necesario para acceder a esta ruta
        }
      },
      {
        path: 'create',
        component: CreateRoleComponent,
        data: {
          type: 'create',
          permissions: [EPermissions.CREAR_ROLES]
        }, 
        canActivate: [AuthGuard],
      },
      {
        path: 'edit',
        component: CreateRoleComponent,
        data: {
          type: 'edit',
          permissions: [EPermissions.ACTUALIZAR_ROLES]
        },
        canActivate: [AuthGuard],
      },
    ],
  },
];