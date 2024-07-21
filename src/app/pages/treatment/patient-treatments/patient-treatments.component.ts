import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';
import { MatTableDataSource } from '@angular/material/table';
import { TreatmentService } from '../treatment.service';

@Component({
  selector: 'patient-treatments',
  templateUrl: './patient-treatments.component.html',
})
export class PatientTreatmentComponent implements OnInit {

  paciente: any;
  treatment = [];
  dataSource = new MatTableDataSource<any>(this.treatment);
  displayedColumns: string[] = ['id', 'name', 'description', 'status', 'paymentStatus', 'quotation', 'actions'];

  constructor(
    private readonly _router: Router,
    private readonly _route: ActivatedRoute,
    private readonly _treatment: TreatmentService,
    private readonly _sanitizer: DomSanitizer
  ) {}

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value.trim().toLowerCase();
    this.dataSource.filter = filterValue;
  }

  async ngOnInit() {
    this.paciente = history.state.paciente;
    console.log('paciente profile', this.paciente);
    this.getPatientTreatment(this.paciente?.id);
  }

  async getPatientTreatment(patientId: number) {
    try {
        const response = await this._treatment.getPatientTreatment(patientId);
        if (response && response.data) {
            this.treatment = response.data;
            console.log('Datos obtenidos:', this.treatment);
            this.dataSource.data = this.treatment;
            console.log('Datos del dataSource:', this.dataSource.data);
        } else {
            console.error('Error: No se encontraron datos en la respuesta.');
        }
    } catch (error) {
        console.error('Error al obtener datos:', error);
    }
  }

  async returnPage(){
    this._router.navigateByUrl("/patient/list");
  }

  verTratamiento(treatment: any){
    this._router.navigate(['/treatment/specificTreatment'], { state: { treatment: treatment } });

  }

  editarTreatment(treatment: any) {
    this._router.navigate(['/treatment/edit'], { state: { treatment: treatment } });
  }

  eliminarTreatment(treatment: any): void {
    // Implement the deletion logic here
  }
}
