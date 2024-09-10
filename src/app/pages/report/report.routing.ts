import { Routes } from '@angular/router';
import { GeneralComponent } from './general/general.component';


export const ReportRouting: Routes = [
    {
      path: '',
      children: [
        {
          path: 'general',
          component: GeneralComponent
        },
      ],
      
    },
  ];