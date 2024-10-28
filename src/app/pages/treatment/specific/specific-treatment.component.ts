import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { map } from 'rxjs';
import { TreatmentService } from '../treatment.service';

@Component({
  selector: 'specifici-treatment',
  templateUrl: './specific-treatment.component.html',
})
export class SpecificTreatmentComponent implements OnInit {

  treatment: any;

  constructor(
    private readonly _router: Router,
    private readonly _route: ActivatedRoute,
    private readonly _treatmentService: TreatmentService,
    private readonly _sanitizer: DomSanitizer
  ) {
  }
  
  async ngOnInit() {
    console.log('historia recibida', history)
    this.treatment = history.state.treatmentD;
    console.log('treatment', this.treatment)
   
  }

  async returnPage(){
    //aca ver como retornar a patientTreatment con el id
    //this._router.navigateByUrl("/treatment/patientTreatment");
    this._router.navigateByUrl("/patient/list");
  }
  
}
