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

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(PatientRouting),
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    TablerIconsModule.pick(TablerIcons),
    MatNativeDateModule,
    NgxSpinnerModule
  ],
  declarations: [
    ListPatientComponent,
    CreatePatientComponent
  ],
  providers: [
    PatientService,
    NgxSpinnerService
  ]
})
export class PatientModule {}
