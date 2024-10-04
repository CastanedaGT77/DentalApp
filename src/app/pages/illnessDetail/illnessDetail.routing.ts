import { Routes } from '@angular/router';
import { ListIllnessDetailComponent } from './list/list-illnessDetail.component';
import { CreateIllnessDetailComponent } from './create/create-illnessDetail.component';
import { AuthGuard } from 'src/app/guards/auth.guard';
import { EPermissions } from 'src/app/utils/permissionEnum';

export const IllnessDetailRouting: Routes = [
  {
    path: '',
    children: [
      {
        path: 'list',
        component: ListIllnessDetailComponent,
        canActivate: [AuthGuard],
        data: {
          permissions: [EPermissions.LISTAR_DETALLES_DE_ENFERMEDAD]
        }
      },
      {
        path: 'create',
        component: CreateIllnessDetailComponent,
        canActivate: [AuthGuard],
        data: {
          type: 'create',
          permissions: [EPermissions.CREAR_DETALLES_DE_ENFERMEDAD]
        }
      },
      {
        path: 'edit',
        component: CreateIllnessDetailComponent,
        canActivate: [AuthGuard],
        data: {
          type: 'edit',
          permissions: [EPermissions.ACTUALIZAR_DETALLES_DE_ENFERMEDAD]
        }
      }
    ]
  }
];
