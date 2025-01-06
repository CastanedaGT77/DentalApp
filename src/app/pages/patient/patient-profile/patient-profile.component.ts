import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { PatientService } from '../patient.service';
import { TreatmentService } from '../../treatment/treatment.service';
import { DateService } from '../../date/date.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { DocumentService } from '../../document/document.service';

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
  pendingAmount: number;
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
  documents: any[] = [];
  
  treatmentDataSource: MatTableDataSource<Treatment>;
  appointmentDataSource: MatTableDataSource<Appointment>;
  documentDataSource: MatTableDataSource<any>;

  illnessDataSource: MatTableDataSource<any>;
  displayedIllnessColumns: string[] = ['id', 'name', 'description', 'active', 'created_at'];


  displayedTreatmentColumns: string[] = ['treatment', 'description', 'date', 'details'];
  displayedAppointmentColumns: string[] = ['appointmentDate', 'startHour', 'endHour', 'status'];
  displayedDocumentColumns: string[] = ['id', 'icon', 'fileName', 'uploadedBy', 'created_at', 'actions'];

  @ViewChild('treatmentPaginator') treatmentPaginator: MatPaginator;
  @ViewChild('appointmentPaginator') appointmentPaginator: MatPaginator;
  @ViewChild('documentPaginator') documentPaginator: MatPaginator;
  @ViewChild('treatmentPaginator') illnessPaginator: MatPaginator;

  constructor(
    private readonly _router: Router,
    private readonly _route: ActivatedRoute,
    private readonly _patientService: PatientService,
    private readonly _treatmentService: TreatmentService,
    private readonly _appointmentService: DateService,
    private readonly _documentService: DocumentService,
    private readonly _sanitizer: DomSanitizer
  ) {
    this.sanitizedImage = null;
    this.treatmentDataSource = new MatTableDataSource<Treatment>([]);
    this.appointmentDataSource = new MatTableDataSource<Appointment>([]);
    this.documentDataSource = new MatTableDataSource<any>([]);
  }
  
  async ngOnInit() {
    this.paciente = history.state.paciente;
    console.log('paciente', this.paciente)
    await this._getImage(this.paciente?.id);
    await this._getTreatments(this.paciente?.id);
    this.appointments = await this._appointmentService.getAppointmentPacient(this.paciente?.id);
    this.appointmentDataSource.data = this.appointments;
    console.log('citas', this.appointments)
    await this._getPatientDocuments(this.paciente?.id);// Inicializa el DataSource con illnessDetails
    this.illnessDataSource = new MatTableDataSource(this.paciente?.illnessDetails || []);
  
    // Configura el filtro personalizado (opcional)
    this.illnessDataSource.filterPredicate = (data: any, filter: string) => {
      return (
        data.name.toLowerCase().includes(filter) ||
        data.description.toLowerCase().includes(filter)
      );
    };
  }

  applyIllnessFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value.trim().toLowerCase();
    this.illnessDataSource.filter = filterValue;
  
    if (this.illnessDataSource.paginator) {
      this.illnessDataSource.paginator.firstPage();
    }
  }

  ngAfterViewInit() {
    this.treatmentDataSource.paginator = this.treatmentPaginator;
    this.appointmentDataSource.paginator = this.appointmentPaginator;
    this.documentDataSource.paginator = this.documentPaginator;
    this.illnessDataSource.paginator = this.illnessPaginator;
  }

  getAge(birthDate: string): number {
    const today = new Date();
    const birth = new Date(birthDate);
    let age = today.getFullYear() - birth.getFullYear();
    const monthDiff = today.getMonth() - birth.getMonth();
    
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
      age--;
    }
    
    return age;
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

  private async _getPatientDocuments(patientId: number) {
    if (patientId) {
      const response = await this._documentService.getPatientDocuments(patientId);
      if (response) {
        this.documents = response;
        console.log(this.documents)
        this.documentDataSource.data = this.documents;
      }
    }
  }

  downloadDocument(fileCode: string) {
    this._documentService.getDocument(fileCode).then(fileBlob => {
        if (fileBlob) {
            const blobUrl = window.URL.createObjectURL(fileBlob);
            const a = document.createElement('a');
            a.href = blobUrl;
            a.download = decodeURIComponent(escape(fileCode)); // Decodificar el nombre correctamente
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            window.URL.revokeObjectURL(blobUrl);
        } else {
            console.error('Error: No se pudo obtener el archivo.');
        }
    }).catch(error => {
        console.error('Error al descargar el archivo:', error);
    });
  }

  getDecodedFileName(fileName: string): string {
    try {
        return decodeURIComponent(escape(fileName));
    } catch (e) {
        return fileName; // Si ocurre un error, devuelve el nombre original
    }
  }

  getFileIcon(fileName: string) {
    const extension = fileName.split('.').pop()?.toLowerCase();
    switch (extension) {
      case 'doc':
      case 'docx':
        return { name: 'description', color: '#2a72b5' };
      case 'xls':
      case 'csv':
      case 'xlsx':
        return { name: 'table_chart', color: '#1c8b24' };
      case 'pdf':
        return { name: 'picture_as_pdf', color: '#e23e57' };
      case 'jpg':
      case 'jpeg':
      case 'png':
      case 'gif':
        return { name: 'image', color: '#fbbd08' };
      default:
        return { name: 'insert_drive_file', color: '#6c757d' };
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

  applyDocumentFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value.trim().toLowerCase();
    this.documentDataSource.filter = filterValue;
  }

  async returnPage() {
    this._router.navigateByUrl("/patient/list");
  }

  toggleTreatmentDetails(treatment: Treatment) {
    treatment.expanded = !treatment.expanded;
  }

  isExpandedRow = (index: number, treatment: Treatment) => treatment.expanded;
}
