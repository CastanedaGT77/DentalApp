import { Routes } from '@angular/router';
import { ListTreatmentComponent } from './list/list-treatment.component';
import { PatientTreatmentComponent } from './patient-treatments/patient-treatments.component';
import { SpecificTreatmentComponent } from './specific/specific-treatment.component';
import { CreateTreatmentComponent } from './create/create-treatment.component';
import { AuthGuard } from 'src/app/guards/auth.guard';
import { EPermissions } from 'src/app/utils/permissionEnum';

export const TreatmentRouting: Routes = [
  {
    path: '',
    children: [
      {
        path: 'list',
        component: ListTreatmentComponent,
        canActivate: [AuthGuard],
        data: {
          permissions: [EPermissions.LISTAR_TRATAMIENTOS]
        }
      },
      {
        path: 'patientTreatment',
        component: PatientTreatmentComponent,
        canActivate: [AuthGuard],
        data: {
          permissions: [EPermissions.VISUALIZAR_TRATAMIENTOS]
        }
      },
      {
        path: 'specificTreatment',
        component: SpecificTreatmentComponent,
        canActivate: [AuthGuard],
        data: {
          permissions: [EPermissions.VISUALIZAR_TRATAMIENTOS]
        }
      },
      {
        path: 'create',
        component: CreateTreatmentComponent,
        canActivate: [AuthGuard],
        data: {
          type: 'create',
          permissions: [EPermissions.CREAR_TRATAMIENTOS]
        }
      },
      {
        path: 'edit',
        component: CreateTreatmentComponent,
        canActivate: [AuthGuard],
        data: {
          type: 'edit',
          permissions: [EPermissions.ACTUALIZAR_TRATAMIENTOS]
        }
      }
    ]
  }
];
