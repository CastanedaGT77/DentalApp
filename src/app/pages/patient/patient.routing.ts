import { Routes } from '@angular/router';
import { ListPatientComponent } from './list/list-patient.component';
import { CreatePatientComponent } from './create/create-patient.component';
import { PatientProfileComponent } from './patient-profile/patient-profile.component';

export const PatientRouting: Routes = [
  {
    path: '',
    children: [
      {
        path: 'list',
        component: ListPatientComponent
      },
      {
        path: 'create',
        component: CreatePatientComponent,
        data: {
          type: 'create'
        }
      },
      {
        path: 'edit',
        component: CreatePatientComponent,
        data: {
          type: 'edit'
        }
      },
      {
        path: 'patientProfile',
        component: PatientProfileComponent
      }
    ],
  },
];