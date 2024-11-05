import { Routes } from '@angular/router';
import { AuthGuard } from 'src/app/guards/auth.guard';
import { EPermissions } from 'src/app/utils/permissionEnum';
import { CompanyListComponent } from './list/company-list.component';

export const CompanyRouting: Routes = [
    {
      path: '',
      children: [
        {
          path: 'list',
          component: CompanyListComponent,
          canActivate: [AuthGuard],
          data: {
            permissions: [EPermissions.LISTAR_SUCURSALES]
          }
        },
        // {
        //   path: 'create',
        //   component: CreateBranchComponent,
        //   canActivate: [AuthGuard],
        //   data: {
        //     type: 'create',
        //     permissions: [EPermissions.CREAR_SUCURSALES]
        //   }
        // }
      ],
    },
];
