import { Routes } from '@angular/router';
import { BranchListComponent } from './list/branch-list.component';
import { CreateBranchComponent } from './create/create-branch.component';

export const BranchRouting: Routes = [
    {
      path: '',
      children: [
        {
          path: 'list',
          component: BranchListComponent
        },
        {
          path: 'create',
          component: CreateBranchComponent,
          data: {
            type: 'create'
          }
        },
        {
          path: 'edit',
          component: CreateBranchComponent,
          data: {
            type: 'edit'
          }
        },
      ],
      
    },
  ];