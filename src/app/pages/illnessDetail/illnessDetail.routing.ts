import { Routes } from '@angular/router';
import { ListIllnessDetailComponent } from './list/list-illnessDetail.component';

export const IllnessDetailRouting: Routes = [
    {
      path: '',
      children: [
        {
          path: 'list',
          component: ListIllnessDetailComponent
        },
      ],
    },
  ];