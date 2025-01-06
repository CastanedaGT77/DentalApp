import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-schedule-appointment-modal',
  templateUrl: './schedule-appointment-modal.component.html',
})
export class ScheduleAppointmentModalComponent {
  appointmentForm: FormGroup;
  checkingAvailability = false;

  // Dummy data for branches and in-charges
  branches = ['Sucursal 1', 'Sucursal 2', 'Sucursal 3'];
  inCharges = ['Encargado 1', 'Encargado 2', 'Encargado 3'];

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<ScheduleAppointmentModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { userCode: string }
  ) {
    this.appointmentForm = this.fb.group({
      userCode: [data.userCode, Validators.required],
      branch: ['', Validators.required],
      inCharge: ['', Validators.required],
      date: ['', Validators.required],
      startTime: ['', Validators.required],
      endTime: ['', Validators.required],
    });
  }

  closeModal(): void {
    this.dialogRef.close();
  }

  async checkAvailability(): Promise<void> {
    if (this.appointmentForm.invalid) return;

    this.checkingAvailability = true;

    // Simulate backend check
    setTimeout(() => {
      const randomOutcome = Math.random() > 0.5; // Random availability outcome

      if (randomOutcome) {
        Swal.fire({
          title: 'Cita disponible',
          text: 'La cita ha sido programada correctamente.',
          icon: 'success',
          confirmButtonText: 'Aceptar',
        }).then(() => {
          this.dialogRef.close(true); // Close modal with success response
        });
      } else {
        Swal.fire({
          title: 'Sin disponibilidad',
          text: 'No hay disponibilidad para la fecha y hora seleccionadas. Intente con otro horario.',
          icon: 'error',
          confirmButtonText: 'Aceptar',
        });
        this.checkingAvailability = false; // Keep modal open for retry
      }
    }, 2000);
  }
}
