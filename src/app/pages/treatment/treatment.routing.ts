import { Routes } from '@angular/router';
import { ListTreatmentComponent } from './list/list-treatment.component';
import { PatientTreatmentComponent } from './patient-treatments/patient-treatments.component';
// import { CreateTreatmentType } from './create/create-treatment.component';
import { SpecificTreatmentComponent } from './specific/specific-treatment.component';
import { CreateTreatmentComponent } from './create/create-treatment.component';


export const TreatmentRouting: Routes = [
  {
    path: '',
    children: [
      {
        path: 'list',
        component: ListTreatmentComponent
      },
      {
        path:'patientTreatment',
        component: PatientTreatmentComponent
      },
      {
        path:'specificTreatment',
        component: SpecificTreatmentComponent
      },
      {
        path: 'create',
        component: CreateTreatmentComponent,
        data: {
          type: 'create'
        }
      },
      {
        path: 'edit',
        component: CreateTreatmentComponent,
        data: {
          type: 'edit'
        }
      },
    ],
    
  },
];