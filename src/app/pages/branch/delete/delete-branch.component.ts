import {Component, Inject} from '@angular/core';
import {
  MAT_DIALOG_DATA, MatDialogRef,
} from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { BranchService } from '../branch.service';

@Component({
    selector: 'delete-branch',
    templateUrl: 'delete-branch.component.html',
    
})

export class DeleteBranch {

  constructor(
    private readonly _branchService: BranchService,@Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<DeleteBranch>,
    private readonly _snackBarService: MatSnackBar,
  ) {}

  closeDialog(){
    this.dialogRef.close(false);
  }

  async eliminarBranch(id: number) {
    console.log('id borrar', id)
      const deleted = await this._branchService.deleteBranch(id);
      if(deleted){
        const message = "branch eliminado correctamente.";
        this._snackBarService.open(message, '', { horizontalPosition: "center", verticalPosition: "top", duration: 5000 });
        this.dialogRef.close(true);
      } else {
        const message = "Error. No se ha podido eliminar el branch.";
        this._snackBarService.open(message, '', { horizontalPosition: "center", verticalPosition: "top", duration: 5000 });
      }
  }
}