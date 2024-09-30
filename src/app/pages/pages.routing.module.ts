import { Routes } from '@angular/router';
import { AppDashboardComponent } from './dashboard/dashboard.component';

export const PagesRoutes: Routes = [
  {
    //aca va el componente que se abrira primero
    path: '',
    component: AppDashboardComponent,
    data: {
      title: 'Starter Page',
    },
  },
];