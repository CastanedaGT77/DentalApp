import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CitaModel } from '../models/CitaExample';

@Component({
  selector: 'appointment-details-dialog',
  templateUrl: 'view-date.component.html'
})
export class AppointmentDetailsDialog {
  constructor(
    public dialogRef: MatDialogRef<AppointmentDetailsDialog>,
    @Inject(MAT_DIALOG_DATA) public data: CitaModel
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }
}
