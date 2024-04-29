import {Component, Inject} from '@angular/core';
import {
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';

@Component({
    selector: 'delete-patient',
    templateUrl: 'delete-patient.component.html',
    
})

export class DeletePatient {

  constructor(@Inject(MAT_DIALOG_DATA) public data: any) { }
  
  ngAfterViewInit() {
    console.log('prueba',this.data)
  }

  eliminarPaciente(){
    //codigo para eliminar
    console.log(this.data.paciente.position);
  }
}