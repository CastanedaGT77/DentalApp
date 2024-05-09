import {Component, Inject} from '@angular/core';
import {
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { PatientService } from '../patient.service';

@Component({
    selector: 'delete-patient',
    templateUrl: 'delete-patient.component.html',
    
})

export class DeletePatient {

  constructor(private readonly _patientService: PatientService,@Inject(MAT_DIALOG_DATA) public data: any) { }
  
  ngAfterViewInit() {
    console.log('prueba',this.data)
  }

  async eliminarPaciente(id: number) {
   
      const deleted = await this._patientService.deletePatient(id);
      
      
  }
  
  
  
}