import { Routes } from '@angular/router';
import { ListIllnessDetailComponent } from './list/list-illnessDetail.component';
import { CreateIllnessDetailComponent } from './create/create-illnessDetail.component';

export const IllnessDetailRouting: Routes = [
    {
      path: '',
      children: [
        {
          path: 'list',
          component: ListIllnessDetailComponent
        },
        {
          path: 'create',
          component: CreateIllnessDetailComponent,
          data: {
            type: 'create'
          }
        },
        {
          path: 'edit',
          component: CreateIllnessDetailComponent,
          data: {
            type: 'edit'
          }
        },
      ],
      
    },
  ];