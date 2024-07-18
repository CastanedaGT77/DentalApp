import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { map } from 'rxjs';
import { PatientService } from '../patient.service';

@Component({
  selector: 'patient-profile',
  templateUrl: './patient-profile.component.html',
})
export class PatientProfileComponent implements OnInit {

  paciente: any;
  patientImage: string;
  sanitizedImage: SafeResourceUrl | null;

  constructor(
    private readonly _router: Router,
    private readonly _route: ActivatedRoute,
    private readonly _patientService: PatientService,
    private readonly _sanitizer: DomSanitizer
  ) {
    this.sanitizedImage = null;
  }
  
  async ngOnInit() {
    // Obtener el parámetro 'paciente' de la URL
    this.paciente = history.state.paciente;
    console.log('paciente profile', this.paciente)
    this._getImage(this.paciente?.id);
  }

  private async _getImage(patientId: number){
    if(patientId){
      const response = await this._patientService.getProfileImage(patientId);
      if(response){
        this.sanitizedImage = this._sanitizer.bypassSecurityTrustResourceUrl(response);
      }
    }
  }

  async returnPage(){
    this._router.navigateByUrl("/patient/list");
  }
  
}
