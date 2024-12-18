import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { MatSnackBar } from "@angular/material/snack-bar";
import { ActivatedRoute, Router } from "@angular/router";
import { NgxSpinnerService } from "ngx-spinner";
import { DomSanitizer } from "@angular/platform-browser";
import { DatePipe } from "@angular/common";
import { PatientService } from "../../patient/patient.service";
import { BranchService } from "../../branch/branch.service";
import { UserService } from "../../user/user.service";
import { createAppointmentDTO } from "src/app/data/dtos/appointment/createAppointmentDTO";
import { DateService } from "../date.service";
import Swal from "sweetalert2";

@Component({
  selector: "app-create-date",
  templateUrl: "./create-date.component.html"
})
export class CreateDateComponent implements OnInit {
  type: "create" | "edit";
  form: FormGroup;
  patients!: any;
  branches!: any;
  users!: any;
  appointmentId: number;
  appointment: any;

  constructor(
    private readonly _formBuilder: FormBuilder,
    private readonly _spinnerService: NgxSpinnerService,
    private readonly _snackBarService: MatSnackBar,
    private readonly _router: Router,
    private readonly _route: ActivatedRoute,
    private readonly _dateService: DateService,
    private readonly _patientService: PatientService,
    private readonly _branchService: BranchService,
    private readonly _userService: UserService,
    private readonly _sanitizer: DomSanitizer,
    private readonly datePipe: DatePipe
  ) {
    this.type = this._route.snapshot.data["type"] ?? "create";
    this.createForm();
  }

  private createForm() {
    this.form = this._formBuilder.group({
      patientId: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(255)]],
      branchId: ['', Validators.required],
      assignedUser: ['', Validators.required],
      appointmentDate: ['', Validators.required],
      reason: ['', Validators.required],
      startHour: ['', Validators.required],
      endHour: ['', Validators.required],
    });
  }

  async ngOnInit() {
    console.log('ngOnInit ejecutado'); // Verifica que ngOnInit se ejecuta
    this.getBranches();
    this.getUsers();
    this.getPatients();
  
    if (this.type === "create") {
      // this.getDetalles();
    } else if (this.type === "edit") {
      console.log('state', history.state.appointment); // Verifica el contenido de history.state
      if (history.state && history.state.appointment) {
        this.appointment = history.state.appointment;
        await this.initializeForm();
      } else {
        console.error('No hay datos de citas');
      }
    }
  }
  
  getPatients() {
    this._patientService.getPatient().then(response => {
      if (response && response.patients) {
        this.patients = response.patients;
        console.log('pacientes', this.patients);
      } else {
        console.error('Error: No se encontraron pacientes en la respuesta.');
      }
    }).catch(error => {
      console.error('Error al obtener pacientes:', error);
    });
  }

  async getBranches() {
    const response = await this._branchService.getBranches();
    if (response) {
      this.branches = response;
    } else {
      console.error('Error: No se encontraron datos se sucursales en la respuesta.');
    }
  }

  async getUsers() {
    try {
      const response = await this._userService.getUsers();
      this.users = response;
      console.log("USERS:", this.users);
    } catch (error) {
      console.error('Error al obtener datos:', error);
    }
  }

  async onSubmit() {
    if (this.form.invalid) {
      const errorMessage = "Verifique todos los campos del formulario.";
      this._snackBarService.open(errorMessage, '', { horizontalPosition: "center", verticalPosition: "top", duration: 5000 });
      return;
    }
  
    if (this.form.valid) {
      console.log('Fecha seleccionada antes de transformación:', this.form.get('appointmentDate')?.value);
      const rawDate = this.form.get('appointmentDate')?.value;
      const formattedDate = rawDate instanceof Date 
        ? this.datePipe.transform(rawDate, 'dd/MM/yyyy') 
        : this.datePipe.transform(new Date(rawDate), 'dd/MM/yyyy');
  
      const data = {
        appointmentId: this.appointment ? this.appointment.id : undefined,
        patientId: this.form.get('patientId')?.value,
        branchId: this.form.get('branchId')?.value,
        assignedUser: this.form.get('assignedUser')?.value,
        appointmentDate: formattedDate,
        reason: this.form.get('reason')?.value,
        startHour: this.form.get('startHour')?.value,
        endHour: this.form.get('endHour')?.value
      };
  
      const confirmationText = this.type === "create" ? "¿Desea finalizar la creación de la cita?" : "¿Desea finalizar la edición de la cita?";
      Swal.fire({
        title: "",
        text: confirmationText,
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Finalizar",
        cancelButtonText: "Cancelar"
      }).then(async (result) => {
        if (result.isConfirmed) {
          this._spinnerService.show();
          try {
            let response;
            if (this.type === "create") {
              response = await this._dateService.createAppointment(data);
            } else {
              response = await this._dateService.updateAppointment(data);
            }
  
            if (response && response.code === 201) {
              const message = this.type === "create" ? "Cita creada correctamente" : "Cita actualizada correctamente";
              this._snackBarService.open(message, '', { horizontalPosition: "center", verticalPosition: "top", duration: 5000 });
              this.form.reset();
              this.returnPage();
            } else if (response && response.code === 400) {
              const message = "La cita no puede ser asignada en la fecha y hora seleccionada porque ya existe una, por favor seleccione un nuevo horario!";
              this._snackBarService.open(message, '', { horizontalPosition: "center", verticalPosition: "top", duration: 5000 });
            } else {
              const errorMessage = this.type === "create" ? "Error al crear la cita" : "Error al actualizar la cita";
              this._snackBarService.open(errorMessage, '', { horizontalPosition: "center", verticalPosition: "top", duration: 5000 });
            }
          } catch (error) {
            console.error(`Error al ${this.type === 'create' ? 'crear' : 'actualizar'} la cita:`, error);
            const errorMessage = this.type === "create" ? "Error al crear la cita" : "Error al actualizar la cita";
            this._snackBarService.open(errorMessage, '', { horizontalPosition: "center", verticalPosition: "top", duration: 5000 });
          } finally {
            this._spinnerService.hide();
          }
        }
      });
    }
  }

  async returnPage() {
    this._router.navigateByUrl("/date/calendar");
  }

  private async initializeForm() {
    this.form.controls["patientId"].setValue(this.appointment.patientId.id);
    this.form.controls["branchId"].setValue(this.appointment.branchId.id);
    this.form.controls["assignedUser"].setValue(this.appointment.assignedUser);
    
    // Crear fecha solo con año, mes y día, sin afectar la zona horaria
    const appointmentDate = new Date(this.appointment.appointmentDate);
    const dateWithoutTime = new Date(appointmentDate.getFullYear(), appointmentDate.getMonth(), appointmentDate.getDate()+1);
    
    this.form.controls["appointmentDate"].setValue(dateWithoutTime);
    this.form.controls["reason"].setValue(this.appointment.reason);
    this.form.controls["startHour"].setValue(this.appointment.startHour);
    this.form.controls["endHour"].setValue(this.appointment.endHour);
  }
  
}
