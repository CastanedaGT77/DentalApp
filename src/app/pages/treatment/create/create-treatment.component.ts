import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators, FormArray } from "@angular/forms";
import { MatSnackBar } from "@angular/material/snack-bar";
import { ActivatedRoute, Router } from "@angular/router";
import { NgxSpinnerService } from "ngx-spinner";
import { DomSanitizer } from "@angular/platform-browser";
import Swal from "sweetalert2";
import { TreatmentService } from "../treatment.service";
import { TreatmentTypeService } from "../../treatment-type/treatment-type.service";
import { PatientService } from "../../patient/patient.service";

@Component({
  selector: "app-create-treatment",
  templateUrl: "./create-treatment.component.html"
})
export class CreateTreatmentComponent implements OnInit {
  type: "create" | "edit";
  form: FormGroup;
  patients: any[] = [];
  treatmentTypesList: any[] = [];
  treatment: any;

  constructor(
    private readonly _formBuilder: FormBuilder,
    private readonly _spinnerService: NgxSpinnerService,
    private readonly _snackBarService: MatSnackBar,
    private readonly _router: Router,
    private readonly _route: ActivatedRoute,
    private readonly _treatmentService: TreatmentService,
    private readonly _treatmentTypeService: TreatmentTypeService,
    private readonly _patientService: PatientService,
    private readonly _sanitizer: DomSanitizer
  ) {
    this.type = this._route.snapshot.data["type"] ?? "create";
    this.createForm();
  }

  private createForm() {
    this.form = this._formBuilder.group({
      patientId: ['', [Validators.required]],
      name: ['', Validators.required],
      quotation: [false, Validators.required],
      description: ['', Validators.required],
      treatmentTypes: this._formBuilder.array([])
    });
  }

  get treatmentTypes() {
    return this.form.get('treatmentTypes') as FormArray;
  }

  addTreatmentType() {
    const treatmentTypeGroup = this._formBuilder.group({
      treatmentTypeId: ['', Validators.required],
      price: ['', Validators.required],
      piece: ['', Validators.required]
    });
    this.treatmentTypes.push(treatmentTypeGroup);
  }

  removeTreatmentType(index: number) {
    this.treatmentTypes.removeAt(index);
  }

  async ngOnInit() {
    this.getPatients();
    this.getTreatmentTypes();
    if (this.type === "edit" && history.state && history.state.treatment) {
      this.treatment = history.state.treatment;
      await this.initializeForm();
    }
  }

  getPatients() {
    this._patientService.getPatient().then(response => {
      if (response && response.patients) {
        this.patients = response.patients;
      } else {
        console.error('Error: No se encontraron pacientes en la respuesta.');
      }
    }).catch(error => {
      console.error('Error al obtener pacientes:', error);
    });
  }

  async getTreatmentTypes() {
    try {
      const response = await this._treatmentTypeService.getTreatmentTypes();
      if (response) {
        this.treatmentTypesList = response;
      } else {
        console.error('Error: No se encontraron datos en la respuesta.');
      }
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
      const data = {
        treatmentId: this.treatment ? this.treatment.id : undefined,
        patientId: this.form.get('patientId')?.value,
        name: this.form.get('name')?.value,
        quotation: this.form.get('quotation')?.value,
        treatmentTypes: this.form.get('treatmentTypes')?.value,
        description: this.form.get('description')?.value
      };

      if (this.type === "create") {
        Swal.fire({
          title: "",
          text: "¿Desea finalizar la creación del plan?",
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
              const response = await this._treatmentService.createTreatment(data);
              if (response && response.code === 200) {
                const message = "Plan de tratamiento creado correctamente";
                this._snackBarService.open(message, '', { horizontalPosition: "center", verticalPosition: "top", duration: 5000 });
                this.form.reset();
                this.returnPage();
              } else {
                const errorMessage = "Error al crear el plan de tratamiento";
                this._snackBarService.open(errorMessage, '', { horizontalPosition: "center", verticalPosition: "top", duration: 5000 });
              }
            } catch (error) {
              console.error("Error al crear el plan de tratamiento:", error);
              const errorMessage = "Error al crear el plan de tratamiento";
              this._snackBarService.open(errorMessage, '', { horizontalPosition: "center", verticalPosition: "top", duration: 5000 });
            } finally {
              this._spinnerService.hide();
            }
          }
        });
      } else if (this.type === "edit") {
        Swal.fire({
          title: "",
          text: "¿Desea finalizar la edición del plan?",
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
              const response = await this._treatmentService.updateTreatment(data);
              if (response && response.code === 200) {
                const message = "Plan de tratamiento actualizado correctamente";
                this._snackBarService.open(message, '', { horizontalPosition: "center", verticalPosition: "top", duration: 5000 });
                this.form.reset();
                this.returnPage();
              } else {
                const errorMessage = "Error al actualizar el plan de tratamiento";
                this._snackBarService.open(errorMessage, '', { horizontalPosition: "center", verticalPosition: "top", duration: 5000 });
              }
            } catch (error) {
              console.error("Error al actualizar el plan de tratamiento:", error);
              const errorMessage = "Error al actualizar el plan de tratamiento";
              this._snackBarService.open(errorMessage, '', { horizontalPosition: "center", verticalPosition: "top", duration: 5000 });
            } finally {
              this._spinnerService.hide();
            }
          }
        });
      }
    }
  }

  async returnPage() {
    this._router.navigateByUrl("/treatment/list");
  }

  private async initializeForm() {
    this.form.controls["patientId"].setValue(this.treatment.patientId);
    this.form.controls["name"].setValue(this.treatment.name);
    this.form.controls["quotation"].setValue(this.treatment.quotation);
    this.form.controls["description"].setValue(this.treatment.description);

    this.treatment.treatmentTypes.forEach((type: any) => {
      this.treatmentTypes.push(this._formBuilder.group({
        treatmentTypeId: [type.treatmentTypeId, Validators.required],
        price: [type.price, Validators.required],
        piece: [type.piece, Validators.required]
      }));
    });
  }
}