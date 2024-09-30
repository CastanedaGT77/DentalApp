import { Routes } from '@angular/router';
import { ListUserComponent } from './list/list-user.component';
import { CreateUserComponent } from './create/create-user.component';
import { AuthGuard } from 'src/app/guards/auth.guard';
import { EPermissions } from 'src/app/utils/permissionEnum';

export const UserRouting : Routes = [
    {
      path: '',
      children: [
        {
          path: 'list',
          component: ListUserComponent,
          canActivate: [AuthGuard],
          data: {
            permissions: [EPermissions.LISTAR_USUARIOS]
          }
        },
        {
          path: 'create',
          component: CreateUserComponent,
          canActivate: [AuthGuard],
          data: {
            type: 'create',
            permissions: [EPermissions.CREAR_USUARIOS]
          }
        },
        {
          path: 'edit',
          component: CreateUserComponent,
          canActivate: [AuthGuard],
          data: {
            type: 'edit',
            permissions: [EPermissions.ACTUALIZAR_USUARIOS]
          }
        },
      ],
      
    },
  ];