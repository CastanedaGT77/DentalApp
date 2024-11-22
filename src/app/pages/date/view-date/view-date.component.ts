import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { CitaModel } from '../models/CitaExample';
import { Router } from '@angular/router';
import { DeleteAppointment } from '../delete/delete-appointment.component';
import { EPermissions } from 'src/app/utils/permissionEnum';
import { DateService } from '../date.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'appointment-details-dialog',
  templateUrl: 'view-date.component.html'
})
export class AppointmentDetailsDialog  {

  actualizarCitas: Array<EPermissions>;
  eliminarCitas: Array<EPermissions>;
  startAppointments!: any;

  constructor(
    private readonly _router: Router,
    public dialog: MatDialog,
    private datePipe: DatePipe,
    private readonly _dateService: DateService,
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
    this.dialog.open(DeleteAppointment, {
      width: '300px',
      data: { appointment: appointment },
    }).afterClosed().subscribe(data => {
      if (data) {
        this.dialogRef.close();
      }
    });
  }

  getFormattedDate(date: string): string {
    // Ajustar la fecha para corregir la zona horaria
    const adjustedDate = new Date(date);
    adjustedDate.setMinutes(adjustedDate.getMinutes() + adjustedDate.getTimezoneOffset());
    return this.datePipe.transform(adjustedDate, 'dd/MM/yyyy') || '';
  }

  editarAppointment(appointment: any) {
    this._router.navigate(['/date/edit'], { state: { appointment: appointment } });
    this.dialogRef.close();
  }

  async finalizarAppointment(appointment: any) {
    this._router.navigate(['/date/finish'], { state: { appointment: appointment } });
    this.dialogRef.close();
  }

  getStatusText(status: number): string {
    switch (status) {
      case 0:
        return 'Pendiente';
      case 1:
        return 'Finalizada';
      case 2:
        return 'Cancelada';
      case 3:
        return 'No asistió';
      default:
        return 'Desconocido';
    }
  }
}
