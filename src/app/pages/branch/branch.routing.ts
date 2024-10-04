import { Routes } from '@angular/router';
import { BranchListComponent } from './list/branch-list.component';
import { CreateBranchComponent } from './create/create-branch.component';
import { AuthGuard } from 'src/app/guards/auth.guard';
import { EPermissions } from 'src/app/utils/permissionEnum';

export const BranchRouting: Routes = [
    {
      path: '',
      children: [
        {
          path: 'list',
          component: BranchListComponent,
          canActivate: [AuthGuard],
          data: {
            permissions: [EPermissions.LISTAR_SUCURSALES]
          }
        },
        {
          path: 'create',
          component: CreateBranchComponent,
          canActivate: [AuthGuard],
          data: {
            type: 'create',
            permissions: [EPermissions.CREAR_SUCURSALES]
          }
        },
        {
          path: 'edit',
          component: CreateBranchComponent,
          canActivate: [AuthGuard],
          data: {
            type: 'edit',
            permissions: [EPermissions.ACTUALIZAR_SUCURSALES]
          }
        },
      ],
      
    },
];
