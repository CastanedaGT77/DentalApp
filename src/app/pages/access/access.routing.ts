import { Routes } from '@angular/router';
import { AccessDeniedComponent } from './access.component';

export const AccessRouting: Routes = [
    {
      path: '',
      children: [
        {
          path: 'denied/denied',
          component: AccessDeniedComponent
        },
      ],
      
    },
  ];