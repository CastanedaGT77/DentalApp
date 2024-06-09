import { Routes } from '@angular/router';
import { ListUserComponent } from './list/list-user.component';

export const UserRouting : Routes = [
    {
      path: '',
      children: [
        {
          path: 'list',
          component: ListUserComponent
        }
      ],
      
    },
  ];