import {Component, Inject} from '@angular/core';
import {
  MAT_DIALOG_DATA, MatDialogRef,
} from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TreatmentTypeService } from '../treatment-type.service';

@Component({
    selector: 'delete-treatmentType',
    templateUrl: 'delete-treatmentType.component.html',
    
})

export class DeleteTreatmentType {

  constructor(
    private readonly _treatmentTypeService: TreatmentTypeService,@Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<DeleteTreatmentType>,
    private readonly _snackBarService: MatSnackBar,
  ) {}

  closeDialog(){
    this.dialogRef.close(false);
  }

  async eliminarTreatmentType(id: number) {
      const deleted = await this._treatmentTypeService.deleteTreatmentType(id);
      if(deleted){
        const message = "treatmentType eliminado correctamente.";
        this._snackBarService.open(message, '', { horizontalPosition: "center", verticalPosition: "top", duration: 5000 });
        this.dialogRef.close(true);
      } else {
        const message = "Error. No se ha podido eliminar el treatmentType.";
        this._snackBarService.open(message, '', { horizontalPosition: "center", verticalPosition: "top", duration: 5000 });
      }
  }
}