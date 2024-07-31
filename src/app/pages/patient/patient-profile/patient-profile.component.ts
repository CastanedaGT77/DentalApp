import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { PatientService } from '../patient.service';
import { TreatmentService } from '../../treatment/treatment.service';
import { DateService } from '../../date/date.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';

interface Treatment {
  id: number;
  name: string;
  description: string;
  status: boolean;
  paymentStatus: boolean;
  quotation: boolean;
  created_at: string;
  updated_at: string;
  treatmentDetails: TreatmentDetail[];
  expanded?: boolean;
}

interface TreatmentDetail {
  id: number;
  suggestedPrice: number;
  realPrice: number;
  paymentStatus: boolean;
  piece: string;
  status: boolean;
  created_at: string;
  updated_at: string;
  treatmentType: TreatmentType;
}

interface TreatmentType {
  id: number;
  name: string;
  description: string;
  suggestedPrice: number;
  estimatedTime: number;
  active: boolean;
  created_at: string;
  updated_at: string;
}

interface Appointment {
  id: number;
  branchId: number;
  assignedUser: number;
  appointmentDate: string;
  observations: string;
  startHour: string;
  endHour: string;
  status: number;
}

@Component({
  selector: 'patient-profile',
  templateUrl: './patient-profile.component.html',
})
export class PatientProfileComponent implements OnInit, AfterViewInit {

  paciente: any;
  patientImage: string;
  sanitizedImage: SafeResourceUrl | null;
  treatments: Treatment[] = [];
  appointments: Appointment[] = [];
  treatmentDataSource: MatTableDataSource<Treatment>;
  appointmentDataSource: MatTableDataSource<Appointment>;

  displayedTreatmentColumns: string[] = ['name', 'description', 'actions'];
  displayedAppointmentColumns: string[] = ['appointmentDate', 'startHour', 'endHour', 'status'];

  @ViewChild('treatmentPaginator') treatmentPaginator: MatPaginator;
  @ViewChild('appointmentPaginator') appointmentPaginator: MatPaginator;

  constructor(
    private readonly _router: Router,
    private readonly _route: ActivatedRoute,
    private readonly _patientService: PatientService,
    private readonly _treatmentService: TreatmentService,
    private readonly _appointmentService: DateService,
    private readonly _sanitizer: DomSanitizer
  ) {
    this.sanitizedImage = null;
    this.treatmentDataSource = new MatTableDataSource<Treatment>([]);
    this.appointmentDataSource = new MatTableDataSource<Appointment>([]);
  }
  
  async ngOnInit() {
    this.paciente = history.state.paciente;
    await this._getImage(this.paciente?.id);
    await this._getTreatments(this.paciente?.id);
    this.appointments = await this._appointmentService.getAppointmentPacient(this.paciente?.id);
    this.appointmentDataSource.data = this.appointments;
  }

  ngAfterViewInit() {
    this.treatmentDataSource.paginator = this.treatmentPaginator;
    this.appointmentDataSource.paginator = this.appointmentPaginator;
  }

  private async _getImage(patientId: number) {
    if (patientId) {
      const response = await this._patientService.getProfileImage(patientId);
      if (response) {
        this.sanitizedImage = this._sanitizer.bypassSecurityTrustResourceUrl(response.data);
      }
    }
  }

  private async _getTreatments(patientId: number) {
    if (patientId) {
      const response = await this._treatmentService.getPatientTreatment(patientId);
      if (response && response.code === 200) {
        this.treatments = response.data;
        this.treatmentDataSource.data = this.treatments;
      }
    }
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value.trim().toLowerCase();
    this.treatmentDataSource.filter = filterValue;
  }

  applyFilter2(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value.trim().toLowerCase();
    this.appointmentDataSource.filter = filterValue;
  }

  async returnPage() {
    this._router.navigateByUrl("/patient/list");
  }

  toggleTreatmentDetails(treatment: Treatment) {
    treatment.expanded = !treatment.expanded;
  }

  isExpandedRow = (index: number, treatment: Treatment) => treatment.expanded;
}
