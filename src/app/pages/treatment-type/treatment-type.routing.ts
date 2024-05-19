import { Routes } from '@angular/router';
import { ListTreatmentTypeComponent } from './list/list-treatmentType.component';
import { CreateTreatmentType } from './create/create-treatmentType.component';


export const TreatmentTypeRouting: Routes = [
  {
    path: '',
    children: [
      {
        path: 'list',
        component: ListTreatmentTypeComponent
      },
      {
        path: 'create',
        component: CreateTreatmentType,
        data: {
          type: 'create'
        }
      },
      {
        path: 'edit',
        component: CreateTreatmentType,
        data: {
          type: 'edit'
        }
      },
    ],
    
  },
];