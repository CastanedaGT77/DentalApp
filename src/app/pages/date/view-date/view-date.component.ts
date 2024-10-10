import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { CitaModel } from '../models/CitaExample';
import { Router } from '@angular/router';
import { DeleteAppointment } from '../delete/delete-appointment.component';
import { EPermissions } from 'src/app/utils/permissionEnum';

@Component({
  selector: 'appointment-details-dialog',
  templateUrl: 'view-date.component.html'
})
export class AppointmentDetailsDialog  {

  actualizarCitas: Array<EPermissions>;
  eliminarCitas: Array<EPermissions>;
  
  constructor(
    private readonly _router: Router,
    public dialog: MatDialog,

    public dialogRef: MatDialogRef<AppointmentDetailsDialog>,
    @Inject(MAT_DIALOG_DATA) public data: CitaModel
  ) {
    this.actualizarCitas = [EPermissions.ACTUALIZAR_CITAS] || [];
    this.eliminarCitas = [EPermissions.ELIMINAR_CITAS] || [];
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  eliminarAppointment(appointment: any): void {
    console.log('funciona date delete', appointment);
    this.dialog.open(DeleteAppointment, {
        width: '300px',
        data: { appointment: appointment },
        
    }).afterClosed().subscribe(data => {
        if(data){
          this.dialogRef.close();
        }
    });
}

  editarAppointment(appointment: any) {
    this._router.navigate(['/date/edit'], { state: { appointment: appointment } });
    this.dialogRef.close();
  }
}
