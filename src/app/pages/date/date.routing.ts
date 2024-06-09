import { Routes } from '@angular/router';
import { CalendarComponent } from './calendar/calendar.component';



export const DateRouting: Routes = [
  {
    path: '',
    children: [
      {
        path: 'calendar',
        component: CalendarComponent
      },
      // {
      //   path: 'create',
      //   component: CreateTreatmentType,
      //   data: {
      //     type: 'create'
      //   }
      // },
      // {
      //   path: 'edit',
      //   component: CreateTreatmentType,
      //   data: {
      //     type: 'edit'
      //   }
      // },
    ],
    
  },
];