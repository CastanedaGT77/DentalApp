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
import { SharedModule } from 'src/app/shared.module';
import { DocumentService } from './document.service';
import { DocumentRouting } from './document.routing';
import { DocumentListAll } from './list-all/document-list-all.component';
import { CreateDocumentComponent } from './create/create-document.component';
import { PatientService } from '../patient/patient.service';

@NgModule({
    imports: [
      CommonModule,
      RouterModule.forChild(DocumentRouting),
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
      DocumentListAll,
      CreateDocumentComponent
    ],
    providers: [
      NgxSpinnerService,
      DocumentService,
      PatientService
    ]
  })
  export class DocumentModule {}
  