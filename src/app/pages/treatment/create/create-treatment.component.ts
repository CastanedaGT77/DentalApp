import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators, FormArray } from "@angular/forms";
import { MatSnackBar } from "@angular/material/snack-bar";
import { ActivatedRoute, Router } from "@angular/router";
import { NgxSpinnerService } from "ngx-spinner";
import Swal from "sweetalert2";
import { TreatmentService } from "../treatment.service";
import { TreatmentTypeService } from "../../treatment-type/treatment-type.service";
import { PatientService } from "../../patient/patient.service";
import { UpdateTreatmentDto } from "src/app/data/dtos/treatment/UpdateTreatmentDTO";
import { MatDialog } from "@angular/material/dialog";
import { CreateTreatmentDetailDTO } from "src/app/data/dtos/treatment/CreateTreatmentDetailDTO";

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
    public dialog: MatDialog,
    private readonly _treatmentService: TreatmentService,
    private readonly _treatmentTypeService: TreatmentTypeService,
    private readonly _patientService: PatientService
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

  addTreatmentType(id = null, treatmentTypeId = '', price = '', piece = '') {
    const treatmentTypeGroup = this._formBuilder.group({
      id: [id],
      treatmentTypeId: [treatmentTypeId, Validators.required],
      price: [price, Validators.required],
      piece: [piece, Validators.required]
    });
    this.treatmentTypes.push(treatmentTypeGroup);
  }

  removeTreatmentType(index: number) {
    const treatmentTypeId = this.treatmentTypes.at(index).get('id')?.value;
    if (treatmentTypeId) {
      this.deleteTreatmentType(treatmentTypeId).then(() => {
        this.treatmentTypes.removeAt(index);
      });
    } else {
      this.treatmentTypes.removeAt(index);
    }
  }

  async ngOnInit() {
    this.getPatients();
    this.getTreatmentTypes();
    if (this.type === "edit" && history.state && history.state.treatmentD) {
      this.treatment = history.state.treatmentD[0];
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

    if (this.type === "edit") {
      const treatmentDetails = this.form.get('treatmentTypes')?.value.map((treatment: any) => ({
        id: treatment.id,
        treatmentTypeId: treatment.treatmentTypeId,
        piece: treatment.piece,
        price: treatment.price
      })) as UpdateTreatmentDto[];

      console.log('Datos enviados para editar:', treatmentDetails);

      const requests = treatmentDetails.map(async (detail: UpdateTreatmentDto) => {
        try {
          const response = await this._treatmentService.updateTreatment(detail);
          if (response && response.code !== 200) {
            const errorMessage = `Error al actualizar el detalle del tratamiento con ID ${detail.id}`;
            this._snackBarService.open(errorMessage, '', { horizontalPosition: "center", verticalPosition: "top", duration: 5000 });
          }
        } catch (error) {
          console.error(`Error al actualizar el detalle del tratamiento con ID ${detail.id}:`, error);
        }
      });

      Promise.all(requests).then(() => {
        const message = "Plan de tratamiento actualizado correctamente";
        this._snackBarService.open(message, '', { horizontalPosition: "center", verticalPosition: "top", duration: 5000 });
        this.form.reset();
        this.returnPage();
      }).catch(() => {
        const errorMessage = "Error al actualizar el plan de tratamiento";
        this._snackBarService.open(errorMessage, '', { horizontalPosition: "center", verticalPosition: "top", duration: 5000 });
      }).finally(() => {
        this._spinnerService.hide();
      });
    } else if (this.type === "create") {
      const data = {
        patientId: this.form.get('patientId')?.value,
        name: this.form.get('name')?.value,
        quotation: this.form.get('quotation')?.value,
        treatmentTypes: this.form.get('treatmentTypes')?.value,
        description: this.form.get('description')?.value
      };

      console.log('Datos enviados para crear:', data);

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
    }
  }

  async saveNewTreatmentType(index: number) {
    const treatmentTypeGroup = this.treatmentTypes.at(index);
    if (treatmentTypeGroup.invalid) {
      this._snackBarService.open('Verifique todos los campos del tratamiento', '', { horizontalPosition: "center", verticalPosition: "top", duration: 5000 });
      return;
    }

    const treatmentTypeId = treatmentTypeGroup.get('id')?.value;
    if (!treatmentTypeId) {
      const requestData: Partial<CreateTreatmentDetailDTO> = {
        treatmentId: this.treatment.id,
        treatmentTypeId: treatmentTypeGroup.get('treatmentTypeId')?.value,
        price: treatmentTypeGroup.get('price')?.value,
        piece: treatmentTypeGroup.get('piece')?.value
      };
      const response = await this._treatmentService.createTreatmentDetail(requestData);
      if (response && response.code === 201) {
        this._snackBarService.open('Tratamiento agregado correctamente', '', { horizontalPosition: "center", verticalPosition: "top", duration: 5000 });
        treatmentTypeGroup.get('id')?.setValue(response.data.id);  // Assuming the response contains the new id
      } else {
        this._snackBarService.open('Error al agregar tratamiento', '', { horizontalPosition: "center", verticalPosition: "top", duration: 5000 });
      }
    }
  }

  async deleteTreatmentType(treatmentTypeId: number) {
    try {
      const response = await this._treatmentService.deleteTreatmentDetail(treatmentTypeId);
      if (response && response.code === 200) {
        const message = `Tratamiento con ID ${treatmentTypeId} eliminado correctamente`;
        this._snackBarService.open(message, '', { horizontalPosition: "center", verticalPosition: "top", duration: 5000 });
      } else {
        const errorMessage = `Error al eliminar el tratamiento con ID ${treatmentTypeId}`;
        this._snackBarService.open(errorMessage, '', { horizontalPosition: "center", verticalPosition: "top", duration: 5000 });
      }
    } catch (error) {
      console.error(`Error al eliminar el tratamiento con ID ${treatmentTypeId}:`, error);
      const errorMessage = `Error al eliminar el tratamiento con ID ${treatmentTypeId}`;
      this._snackBarService.open(errorMessage, '', { horizontalPosition: "center", verticalPosition: "top", duration: 5000 });
    }
  }

  async returnPage() {
    this._router.navigateByUrl("/treatment/list");
  }

  private async initializeForm() {
    console.log('iniciar edicion', this.treatment)
    this.form.controls["patientId"].setValue(this.treatment.patientId);
    this.form.controls["name"].setValue(this.treatment.name);
    this.form.controls["quotation"].setValue(this.treatment.quotation);
    this.form.controls["description"].setValue(this.treatment.description);

    this.treatment.treatmentDetails.forEach((detail: any) => {
      this.addTreatmentType(detail.id, detail.treatmentType.id, detail.realPrice, detail.piece);
    });
  }
}
