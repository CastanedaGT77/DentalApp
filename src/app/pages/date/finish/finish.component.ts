import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { MatSnackBar } from "@angular/material/snack-bar";
import { Router } from "@angular/router";
import { NgxSpinnerService } from "ngx-spinner";
import { DateService } from "../date.service";
import Swal from "sweetalert2";
import { finishAppointmentDTO } from "src/app/data/dtos/appointment/finishAppointmentDTO";
import { TreatmentService } from "../../treatment/treatment.service";

@Component({
  selector: "app-finish-date",
  templateUrl: "./finish.component.html",
})
export class FinishComponent implements OnInit {
  form: FormGroup;
  appointment: any;
  treatment: any;
  startAppointments: any;

  constructor(
    private readonly _formBuilder: FormBuilder,
    private readonly _spinnerService: NgxSpinnerService,
    private readonly _snackBarService: MatSnackBar,
    private readonly _router: Router,
    private readonly _dateService: DateService,
    private readonly _treatmentService: TreatmentService
  ) {
    this.form = this._formBuilder.group({
      symptoms: ["", Validators.required],
      description: ["", Validators.required],
      appliedMethods: ["", Validators.required],
    });
  }

  async ngOnInit() {
    this.appointment = history.state.appointment;
    console.log(this.appointment);
    console.log('id paciente', this.appointment.patientId.id);
    if (this.appointment?.id) {
      console.log("Iniciando cita con ID:", this.appointment.id);
      await this.startAppointmentFinish(this.appointment.id);
      await this.getPatientTreatment(this.appointment.patientId.id);
    } else {
      console.error("No se encontró el ID de la cita.");
    }
  }

  async startAppointmentFinish(appointmentId: number) {
    try {
      const response = await this._dateService.startAppointment(appointmentId);
      if (response?.code === 200) {
        this.startAppointments = response;
        console.log("Cita iniciada:", response);
      } else {
        console.error("Error al iniciar la cita:", response);
      }
    } catch (error) {
      console.error("Error al consumir startAppointment:", error);
    }
  }

  async getPatientTreatment(patientId: number) {
    try {
      const response = await this._treatmentService.getPatientTreatmentPending(patientId);
      if (response && response.data) {
        this.treatment = response.data; // Tratamientos obtenidos
        console.log('Datos obtenidos:', this.treatment);
      } else {
        console.error('Error: No se encontraron datos en la respuesta.');
      }
    } catch (error) {
      console.error('Error al obtener datos:', error);
    }
  }

  selectedTreatmentDetails: number[] = []; // Almacena los IDs seleccionados

  toggleTreatmentDetail(detailId: number) {
    const index = this.selectedTreatmentDetails.indexOf(detailId);
    if (index > -1) {
      this.selectedTreatmentDetails.splice(index, 1); // Deseleccionar
    } else {
      this.selectedTreatmentDetails.push(detailId); // Seleccionar
    }
    console.log('Selected treatment details:', this.selectedTreatmentDetails);
  }
  
  async finishAppointment() {
    if (this.form.invalid || this.selectedTreatmentDetails.length === 0) {
      this._snackBarService.open(
        "Por favor, complete todos los campos y seleccione al menos un tratamiento.",
        "",
        { duration: 3000, horizontalPosition: "center", verticalPosition: "top" }
      );
      return;
    }
  
    const finishData: finishAppointmentDTO = {
      appointmentId: this.appointment.id,
      symptoms: this.form.value.symptoms,
      description: this.form.value.description,
      applied: this.form.value.appliedMethods,
      treatmentDetails: this.selectedTreatmentDetails, // IDs seleccionados
    };
  
    Swal.fire({
      title: "¿Está seguro?",
      text: "Esta acción finalizará la cita.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Finalizar",
      cancelButtonText: "Cancelar",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          this._spinnerService.show();
          const response = await this._dateService.finishAppointment(finishData);
          if (response?.code === 200) {
            this._snackBarService.open("Cita finalizada correctamente.", "", {
              duration: 3000,
              horizontalPosition: "center",
              verticalPosition: "top",
            });
            this.returnPage();
          } else {
            this._snackBarService.open(
              "Error al finalizar la cita. Inténtelo nuevamente.",
              "",
              { duration: 3000, horizontalPosition: "center", verticalPosition: "top" }
            );
          }
        } catch (error) {
          console.error("Error al finalizar la cita:", error);
        } finally {
          this._spinnerService.hide();
        }
      }
    });
  }

  returnPage() {
    this._router.navigateByUrl("/date/calendar");
  }
}
