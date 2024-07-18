import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../../material.module';

// icons
import { TablerIconsModule } from 'angular-tabler-icons';
import * as TablerIcons from 'angular-tabler-icons/icons';
import { MatNativeDateModule } from '@angular/material/core';
import { NgxSpinnerModule, NgxSpinnerService } from 'ngx-spinner';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogActions, MatDialogClose, MatDialogContent, MatDialogTitle } from '@angular/material/dialog';
import { IllnessDetailService } from '../illnessDetail/illnessDetail.service';
import { MatTooltipModule } from '@angular/material/tooltip';
import { BranchRouting } from './branch.routing';
import { BranchListComponent } from './list/branch-list.component';
import { CreateBranchComponent } from './create/create-branch.component';
import { BranchService } from './branch.service';
import { DeleteBranch } from './delete/delete-branch.component';

@NgModule({
    imports: [
      CommonModule,
      RouterModule.forChild(BranchRouting),
      MaterialModule,
      FormsModule,
      ReactiveFormsModule,
      TablerIconsModule.pick(TablerIcons),
      MatNativeDateModule,
      NgxSpinnerModule,
      MatFormFieldModule,
      MatInputModule,
      FormsModule,
      MatButtonModule,
      MatTooltipModule
    ],
    declarations: [
        BranchListComponent,
        CreateBranchComponent,
        DeleteBranch
    ],
    providers: [
      NgxSpinnerService,
      BranchService
    ]
  })
  export class BranchModule {}
  