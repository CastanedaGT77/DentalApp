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
import { IllnessDetailRouting } from './illnessDetail.routing';
import { ListIllnessDetailComponent } from './list/list-illnessDetail.component';
import { CreateIllnessDetailComponent } from './create/create-illnessDetail.component';
import { DeleteIllnessDetail } from './delete/delete-IllnessDetail.component';
import { SharedModule } from 'src/app/shared.module';

@NgModule({
    imports: [
      CommonModule,
      RouterModule.forChild(IllnessDetailRouting),
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
      MatTooltipModule,
      SharedModule
    ],
    declarations: [
      ListIllnessDetailComponent,
      CreateIllnessDetailComponent,
      DeleteIllnessDetail
    ],
    providers: [
      IllnessDetailService,
      NgxSpinnerService
    ]
  })
  export class IllnessDetailModule {}
  