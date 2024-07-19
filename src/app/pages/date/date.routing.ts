import { Routes } from '@angular/router';
import { CalendarComponent } from './calendar/calendar.component';
import { CreateDateComponent } from './create/create-date.component';



export const DateRouting: Routes = [
  {
    path: '',
    children: [
      {
        path: 'calendar',
        component: CalendarComponent
      },
      {
        path: 'create',
        component: CreateDateComponent,
        data: {
          type: 'create'
        },
      },
      {
        path: 'edit',
        component: CreateDateComponent,
        data: {
          type: 'edit'
        }
      }
      
    ],
    
  },
];