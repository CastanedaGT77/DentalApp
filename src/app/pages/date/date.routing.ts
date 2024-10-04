import { Routes } from '@angular/router';
import { CalendarComponent } from './calendar/calendar.component';
import { CreateDateComponent } from './create/create-date.component';
import { AuthGuard } from 'src/app/guards/auth.guard';
import { EPermissions } from 'src/app/utils/permissionEnum';

export const DateRouting: Routes = [
  {
    path: '',
    children: [
      {
        path: 'calendar',
        component: CalendarComponent,
        canActivate: [AuthGuard],
        data: {
          permissions: [EPermissions.LISTAR_CITAS]
        }
      },
      {
        path: 'create',
        component: CreateDateComponent,
        canActivate: [AuthGuard],
        data: {
          type: 'create',
          permissions: [EPermissions.CREAR_CITAS]
        }
      },
      {
        path: 'edit',
        component: CreateDateComponent,
        canActivate: [AuthGuard],
        data: {
          type: 'edit',
          permissions: [EPermissions.ACTUALIZAR_CITAS]
        }
      }
    ],
  },
];
