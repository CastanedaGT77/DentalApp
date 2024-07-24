import {Component, Inject} from '@angular/core';
import {
  MAT_DIALOG_DATA, MatDialogRef,
} from '@angular/material/dialog';
import { PatientService } from '../patient.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
    selector: 'delete-patient',
    templateUrl: 'delete-patient.component.html',
    
})

export class DeletePatient {

  constructor(
    private readonly _patientService: PatientService,@Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<DeletePatient>,
    private readonly _snackBarService: MatSnackBar,
  ) {}

  closeDialog(){
    this.dialogRef.close(false);
  }

  async eliminarPaciente(id: number) {
      const deleted = await this._patientService.deletePatient(id);
      if(deleted){
        const message = "Paciente eliminado correctamente.";
        this._snackBarService.open(message, '', { horizontalPosition: "center", verticalPosition: "top", duration: 5000 });
        this.dialogRef.close(true);
      } else {
        const message = "Error. No se ha podido eliminar el Paciente.";
        this._snackBarService.open(message, '', { horizontalPosition: "center", verticalPosition: "top", duration: 5000 });
      }
  }
}