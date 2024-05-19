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
import { TreatmentTypeService } from './treatment-type.service';
import { TreatmentTypeRouting } from './treatment-type.routing';
import { ListTreatmentTypeComponent } from './list/list-treatmentType.component';
import { CreateTreatmentType } from './create/create-treatmentType.component';
import { DeleteTreatmentType } from './delete/delete-treatmentType.component';

@NgModule({
    imports: [
      CommonModule,
      RouterModule.forChild(TreatmentTypeRouting),
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
      ListTreatmentTypeComponent,
      CreateTreatmentType,
      DeleteTreatmentType
    ],
    providers: [
      TreatmentTypeService,
      NgxSpinnerService
    ]
  })
  export class TreatmentTypeModule {}
  