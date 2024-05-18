import {Component, Inject} from '@angular/core';
import {
  MAT_DIALOG_DATA, MatDialogRef,
} from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { IllnessDetailService } from '../illnessDetail.service';

@Component({
    selector: 'delete-illnessDetail',
    templateUrl: 'delete-illnessDetail.component.html',
    
})

export class DeleteIllnessDetail {

  constructor(
    private readonly _illnessDetailService: IllnessDetailService,@Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<DeleteIllnessDetail>,
    private readonly _snackBarService: MatSnackBar,
  ) {}

  closeDialog(){
    this.dialogRef.close(false);
  }

  async eliminarIllnessDetail(id: number) {
      const deleted = await this._illnessDetailService.deleteIllnessDetail(id);
      if(deleted){
        const message = "illnessDetail eliminado correctamente.";
        this._snackBarService.open(message, '', { horizontalPosition: "center", verticalPosition: "top", duration: 5000 });
        this.dialogRef.close(true);
      } else {
        const message = "Error. No se ha podido eliminar el illnessDetail.";
        this._snackBarService.open(message, '', { horizontalPosition: "center", verticalPosition: "top", duration: 5000 });
      }
  }
}