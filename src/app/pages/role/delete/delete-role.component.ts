import {Component, Inject} from '@angular/core';
import {
  MAT_DIALOG_DATA, MatDialogRef,
} from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { RoleService } from '../role.service';

@Component({
    selector: 'delete-role',
    templateUrl: 'delete-role.component.html',
    
})

export class DeleteRole {

  constructor(
    private readonly _roleService: RoleService,@Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<DeleteRole>,
    private readonly _snackBarService: MatSnackBar,
  ) {}

  closeDialog(){
    this.dialogRef.close(false);
  }

  async eliminarRole(id: number) {
      const deleted = await this._roleService.deleteRole(id);
      if(deleted){
        const message = "Rol eliminado correctamente.";
        this._snackBarService.open(message, '', { horizontalPosition: "center", verticalPosition: "top", duration: 5000 });
        this.dialogRef.close(true);
      } else {
        const message = "Error. No se ha podido eliminar el Rol.";
        this._snackBarService.open(message, '', { horizontalPosition: "center", verticalPosition: "top", duration: 5000 });
      }
  }
}