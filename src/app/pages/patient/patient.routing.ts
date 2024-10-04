import { Routes } from '@angular/router';
import { ListPatientComponent } from './list/list-patient.component';
import { CreatePatientComponent } from './create/create-patient.component';
import { PatientProfileComponent } from './patient-profile/patient-profile.component';
import { AuthGuard } from 'src/app/guards/auth.guard';
import { EPermissions } from 'src/app/utils/permissionEnum';

export const PatientRouting: Routes = [
  {
    path: '',
    children: [
      {
        path: 'list',
        component: ListPatientComponent,
        canActivate: [AuthGuard],
        data: {
          permissions: [EPermissions.LISTAR_PACIENTES]
        }
      },
      {
        path: 'create',
        component: CreatePatientComponent,
        canActivate: [AuthGuard],
        data: {
          type: 'create',
          permissions: [EPermissions.CREAR_PACIENTES]
        }
      },
      {
        path: 'edit',
        component: CreatePatientComponent,
        canActivate: [AuthGuard],
        data: {
          type: 'edit',
          permissions: [EPermissions.ACTUALIZAR_PACIENTES]
        }
      },
      {
        path: 'patientProfile',
        component: PatientProfileComponent,
        canActivate: [AuthGuard],
        data: {
          permissions: [EPermissions.VISUALIZAR_PACIENTES]
        }
      }
    ]
  }
];
