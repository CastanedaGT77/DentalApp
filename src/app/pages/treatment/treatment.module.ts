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
import { TreatmentRouting } from './treatment.routing';
import { TreatmentService } from './treatment.service';
import { ListTreatmentComponent } from './list/list-treatment.component';
import { PatientTreatmentComponent } from './patient-treatments/patient-treatments.component';
import { SpecificTreatmentComponent } from './specific/specific-treatment.component';

@NgModule({
    imports: [
      CommonModule,
      RouterModule.forChild(TreatmentRouting),
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
      ListTreatmentComponent,
      PatientTreatmentComponent,
      SpecificTreatmentComponent
    //   CreateTreatmentType,
    //   DeleteTreatmentType
    ],
    providers: [
      TreatmentService,
      NgxSpinnerService
    ]
  })
  export class TreatmentModule {}
  