import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CitaModel } from '../models/CitaExample';
import { Router } from '@angular/router';

@Component({
  selector: 'appointment-details-dialog',
  templateUrl: 'view-date.component.html'
})
export class AppointmentDetailsDialog {
  constructor(
    private readonly _router: Router,
    public dialogRef: MatDialogRef<AppointmentDetailsDialog>,
    @Inject(MAT_DIALOG_DATA) public data: CitaModel
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

  editarAppointment(appointment: any) {
    this._router.navigate(['/date/edit'], { state: { appointment: appointment } });
    this.dialogRef.close();
  }
}
