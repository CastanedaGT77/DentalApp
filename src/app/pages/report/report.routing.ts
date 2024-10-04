import { Routes } from '@angular/router';
import { GeneralComponent } from './general/general.component';
import { AuthGuard } from 'src/app/guards/auth.guard';
import { EPermissions } from 'src/app/utils/permissionEnum';

export const ReportRouting: Routes = [
  {
    path: '',
    children: [
      {
        path: 'general',
        component: GeneralComponent,
        canActivate: [AuthGuard],
        data: {
          permissions: [EPermissions.ADMIN_REPORTES]
        }
      }
    ]
  }
];
