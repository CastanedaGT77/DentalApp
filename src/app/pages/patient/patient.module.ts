import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../../material.module';

// icons
import { TablerIconsModule } from 'angular-tabler-icons';
import * as TablerIcons from 'angular-tabler-icons/icons';

import { MatNativeDateModule } from '@angular/material/core';
import { ListPatientComponent } from './list/list-patient.component';
import { PatientRouting } from './patient.routing';
import { NgxSpinnerModule, NgxSpinnerService } from 'ngx-spinner';
import { CreatePatientComponent } from './create/create-patient.component';
import { PatientService } from './patient.service';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { AddImage } from './image/add-image.component';
import { MatDialogActions, MatDialogClose, MatDialogContent, MatDialogTitle } from '@angular/material/dialog';
import { DeletePatient } from './delete/delete-patient.component';
import {  PatientProfileComponent } from './patient-profile/patient-profile.component';
import { IllnessDetailService } from '../illnessDetail/illnessDetail.service';
import { MatTooltipModule } from '@angular/material/tooltip';
import { PatientTreatmentComponent } from '../treatment/patient-treatments/patient-treatments.component';
import { TreatmentService } from '../treatment/treatment.service';
import { DateService } from '../date/date.service';
import { SharedModule } from 'src/app/shared.module';
import { DocumentService } from '../document/document.service';
import { MatTabsModule } from '@angular/material/tabs';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(PatientRouting),
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
    SharedModule,
    MatTabsModule
  ],
  declarations: [
    ListPatientComponent,
    CreatePatientComponent,
    AddImage,
    DeletePatient,
    PatientProfileComponent,
  ],
  providers: [
    PatientService,
    IllnessDetailService,
    TreatmentService,
    DateService,
    NgxSpinnerService,
    DocumentService
  ]
})
export class PatientModule {}
