import { Routes } from '@angular/router';
import { RoleListComponent } from './list/role-list.component';
import { CreateRoleComponent } from './create/create-role.component';
import { AuthGuard } from 'src/app/guards/auth.guard';

export const RoleRouting: Routes = [
  {
    path: '',
    children: [
      {
        path: 'list',
        component: RoleListComponent,
        canActivate: [AuthGuard],
      },
      {
        path: 'create',
        component: CreateRoleComponent,
        data: {
          type: 'create'
        }, 
        canActivate: [AuthGuard],
      },
      {
        path: 'edit',
        component: CreateRoleComponent,
        data: {
          type: 'edit'
        },
        canActivate: [AuthGuard],
      },
    ],
  },
];