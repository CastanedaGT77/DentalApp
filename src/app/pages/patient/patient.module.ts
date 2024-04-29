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


@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(PatientRouting),
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    TablerIconsModule.pick(TablerIcons),
    MatNativeDateModule,
    NgxSpinnerModule, MatFormFieldModule, MatInputModule, FormsModule, MatButtonModule,
  ],
  declarations: [
    ListPatientComponent,
    CreatePatientComponent,
    AddImage,
    DeletePatient
  ],
  providers: [
    PatientService,
    NgxSpinnerService
  ]
})
export class PatientModule {}
