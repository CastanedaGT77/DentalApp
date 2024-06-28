import { Routes } from '@angular/router';
import { ListUserComponent } from './list/list-user.component';
import { CreateUserComponent } from './create/create-user.component';

export const UserRouting : Routes = [
    {
      path: '',
      children: [
        {
          path: 'list',
          component: ListUserComponent
        },
        {
          path: 'create',
          component: CreateUserComponent
        }
      ],
      
    },
  ];