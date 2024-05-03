import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'patient-profile',
  templateUrl: './patient-profile.component.html',
})
export class PatientProfileComponent implements OnInit {

  paciente: any;

  constructor(
    private readonly _router: Router,
    private readonly _route: ActivatedRoute
  ) { }
  
  ngOnInit() {
    // Obtener el parámetro 'paciente' de la URL
    this._route.paramMap.subscribe(params => {
      const pacienteString = params.get('paciente');
      if (pacienteString) {
        this.paciente = JSON.parse(pacienteString);
      }
    });
  }

  async returnPage(){
    this._router.navigateByUrl("/patient/list");
  }
  
}
