import {Component, Inject} from '@angular/core';
import {
  MAT_DIALOG_DATA, MatDialogRef,
} from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TreatmentService } from '../treatment.service';

@Component({
    selector: 'delete-treatment',
    templateUrl: 'delete-treatment.component.html',
    
})

export class DeleteTreatment {

  constructor(
    private readonly _treatmentService: TreatmentService,@Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<DeleteTreatment>,
    private readonly _snackBarService: MatSnackBar,
  ) {}

  closeDialog(){
    this.dialogRef.close(false);
  }

  async eliminarTreatment(id: number) {
      const deleted = await this._treatmentService.deleteTreatment(id);
      if(deleted){
        const message = "Plan de Tratamiento eliminado correctamente.";
        this._snackBarService.open(message, '', { horizontalPosition: "center", verticalPosition: "top", duration: 5000 });
        this.dialogRef.close(true);
      } else {
        const message = "Error. No se ha podido eliminar el Plan de Tratamiento.";
        this._snackBarService.open(message, '', { horizontalPosition: "center", verticalPosition: "top", duration: 5000 });
      }
  }
}