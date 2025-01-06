import { Component, OnInit } from "@angular/core";
import { DomSanitizer } from "@angular/platform-browser";
import { ReportService } from "../report.service";
import { NgxSpinnerService } from "ngx-spinner";

@Component({
  selector: "app-report-general",
  templateUrl: "./general.component.html"
})
export class GeneralComponent implements OnInit {
  reportTypes = [
    { value: 'financial', viewValue: 'Reporte Financiero' },
    { value: 'patient', viewValue: 'Reporte de Pacientes' },
    { value: 'summary', viewValue: 'Resumen General' }
  ];

  patients = [
    { id: 1, name: 'Paciente 1' },
    { id: 2, name: 'Paciente 2' }
  ];

  selectedReport: string = '';
  startDate: Date | null = null;  // Permitir que sea Date o null
  endDate: Date | null = null;    // Permitir que sea Date o null
  selectedPatient: number ;

  showDateFields: boolean = false;
  showPatientField: boolean = false;
  pdfUrl: any = null;

  constructor(
    private sanitizer: DomSanitizer,
    private reportService: ReportService,
    private spinnerService: NgxSpinnerService
  ) {}

  ngOnInit(): void {
    this.spinnerService.show();
    this.spinnerService.hide();
  }

  // Método que se ejecuta cuando cambia el tipo de reporte seleccionado
  onReportChange(reportType: string) {
    // Limpiar el PDF anterior
    this.pdfUrl = null;
    // Limpiar las fechas seleccionadas
    this.startDate = null;
    this.endDate = null;
    //limpiar el patient
    this.selectedPatient = 0;
    this.showDateFields = (reportType === 'financial' || reportType === 'summary');
    this.showPatientField = (reportType === 'patient');
  }

  // Valida si el formulario está listo para habilitar el botón "Generar"
  isFormValid(): boolean {
    if (this.selectedReport === 'financial' || this.selectedReport === 'summary') {
      return !!this.startDate && !!this.endDate;
    } else if (this.selectedReport === 'patient') {
      return !!this.selectedPatient;
    }
    return false;
  }

  // Genera el reporte según el tipo seleccionado y parámetros
  async generateReport() {
    this.spinnerService.show();
    try {
      let pdfBlob;

      if (this.selectedReport === 'financial') {
        pdfBlob = await this.reportService.getReport();
      } else if (this.selectedReport === 'patient') {
        pdfBlob = await this.reportService.getReportPatient(1);
      } else if (this.selectedReport === 'summary') {
        pdfBlob = await this.reportService.getReport2(this.startDate, this.endDate);
      }

      if (pdfBlob) {
        const url = URL.createObjectURL(pdfBlob);
        this.pdfUrl = this.sanitizer.bypassSecurityTrustResourceUrl(url);
      } else {
        console.error("No se pudo obtener el PDF.");
      }
    } catch (error) {
      console.error("Error al generar el reporte:", error);
    } finally {
      this.spinnerService.hide();
    }
  }
}
