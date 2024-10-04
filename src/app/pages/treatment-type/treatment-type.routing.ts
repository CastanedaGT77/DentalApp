import { Routes } from '@angular/router';
import { ListTreatmentTypeComponent } from './list/list-treatmentType.component';
import { CreateTreatmentType } from './create/create-treatmentType.component';
import { AuthGuard } from 'src/app/guards/auth.guard';
import { EPermissions } from 'src/app/utils/permissionEnum';

export const TreatmentTypeRouting: Routes = [
  {
    path: '',
    children: [
      {
        path: 'list',
        component: ListTreatmentTypeComponent,
        canActivate: [AuthGuard],
        data: {
          permissions: [EPermissions.LISTAR_TIPOS_TRATAMIENTO]
        }
      },
      {
        path: 'create',
        component: CreateTreatmentType,
        canActivate: [AuthGuard],
        data: {
          type: 'create',
          permissions: [EPermissions.CREAR_TIPOS_TRATAMIENTO]
        }
      },
      {
        path: 'edit',
        component: CreateTreatmentType,
        canActivate: [AuthGuard],
        data: {
          type: 'edit',
          permissions: [EPermissions.ACTUALIZAR_TIPOS_TRATAMIENTO]
        }
      }
    ]
  }
];
