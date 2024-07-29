import { Routes } from '@angular/router';
import { RoleListComponent } from './list/role-list.component';
import { CreateRoleComponent } from './create/create-role.component';

export const RoleRouting: Routes = [
  {
    path: '',
    children: [
      {
        path: 'list',
        component: RoleListComponent
      },
      {
        path: 'create',
        component: CreateRoleComponent,
        data: {
          type: 'create'
        }
      },
      {
        path: 'edit',
        component: CreateRoleComponent,
        data: {
          type: 'edit'
        }
      },
    ],
  },
];