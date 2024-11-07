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
import { PaymentRouting } from './payment.routing';
import { PaymentService } from './payment.service';
import { ListPendingPaymentComponent } from './list-pending/list-pending-payment.component';
import { MakePaymentComponent } from './make-payment/make-payment.component';
import { PatientService } from '../patient/patient.service';
import { TreatmentService } from '../treatment/treatment.service';
import { SharedModule } from 'src/app/shared.module';
import { ListAllComponent } from './list-all/list-all.component';

@NgModule({
    imports: [
      CommonModule,
      RouterModule.forChild(PaymentRouting),
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
      ListPendingPaymentComponent,
      MakePaymentComponent,
      ListAllComponent
    ],
    providers: [
      PaymentService,
      PatientService,
      TreatmentService,
      NgxSpinnerService
    ]
  })
  export class PaymentModule {}
  