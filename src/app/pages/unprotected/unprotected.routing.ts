import { Routes } from '@angular/router';
import { InitialComponent } from './initial/initial.component';


export const UnprotectedRoutes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'initial',
        component: InitialComponent,
      }
    ],
  },
];
