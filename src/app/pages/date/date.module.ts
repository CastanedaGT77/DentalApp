import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule, DatePipe } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../../material.module';

import { TablerIconsModule } from 'angular-tabler-icons';
import * as TablerIcons from 'angular-tabler-icons/icons';
import { MatNativeDateModule } from '@angular/material/core';
import { NgxSpinnerModule, NgxSpinnerService } from 'ngx-spinner';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip';
import { DateRouting } from './date.routing';
import { DateService } from './date.service';
import { CalendarComponent } from './calendar/calendar.component';
import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { FlatpickrModule } from 'angularx-flatpickr';

import { registerLocaleData } from '@angular/common';
import localeEs from '@angular/common/locales/es';
import { CreateDateComponent } from './create/create-date.component';
import { AppointmentDetailsDialog } from './view-date/view-date.component';
import { MatDialogModule } from '@angular/material/dialog';
import { PatientService } from '../patient/patient.service';
import { BranchService } from '../branch/branch.service';
import { UserService } from '../user/user.service';
import { DeleteAppointment } from './delete/delete-appointment.component';
import { SharedModule } from 'src/app/shared.module';
import { FinishComponent } from './finish/finish.component';
import { TreatmentService } from '../treatment/treatment.service';

// Registrar los datos de localización en español
registerLocaleData(localeEs);

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(DateRouting),
    MaterialModule,
    FormsModule,
    SharedModule,
    ReactiveFormsModule,
    TablerIconsModule.pick(TablerIcons),
    MatNativeDateModule,
    NgxSpinnerModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatTooltipModule,
    CalendarModule.forRoot({
      provide: DateAdapter,
      useFactory: adapterFactory,
    }),
    FlatpickrModule.forRoot()
  ],
  declarations: [
    CalendarComponent,
    CreateDateComponent,
    AppointmentDetailsDialog,
    DeleteAppointment,
    FinishComponent
  ],
  providers: [
    PatientService,
    TreatmentService,
    DateService,
    BranchService,
    UserService,
    NgxSpinnerService,
    DatePipe,
    MatDialogModule
  ]
})
export class DateModule {}
