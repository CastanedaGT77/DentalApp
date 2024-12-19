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
import { HttpStatusCode } from "@angular/common/http";

@Component({
  selector: "app-create-treatment",
  templateUrl: "./create-treatment.component.html"
})
export class CreateTreatmentComponent implements OnInit {
  type: "create" | "edit";
  form: FormGroup;
  treatmentId: number = 0;
  patients: any[] = [];
  treatmentTypesList: any[] = [];
  treatment: any = {};
  loading: boolean;

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
    this.loading = false;
    this.createForm();
  }

  async ngOnInit() {
    this.type = this._route.snapshot.data["type"] ?? "create";
    // Get data
    await this.getPatients();
    await this.getTreatmentTypes();
    
    if (this.type === "edit" && history.state && history.state.treatmentId) {
        this.treatmentId = history.state.treatmentId;
        await this.getTreatmentDetails(this.treatmentId);
        await this.initializeForm();
     }
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

  private async getTreatmentDetails(id: number){
    try {
      const response = await this._treatmentService.getTreatmentDetail(id);
      this.treatment = response.data;
    }
    catch(error){
      this.returnPage();
    }
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

  async onRemoveTreatmentType(index: number) {

    if (this.type === "create") {
      // Elimina del formulario en modo creación
      this.treatmentTypes.removeAt(index);
      this._snackBarService.open(
        "Tipo de tratamiento eliminado del formulario.",
        '',
        { horizontalPosition: "center", verticalPosition: "top", duration: 5000 }
      );
      return;
    } 
    // Confirmación de SweetAlert
    const result = await Swal.fire({
      title: "¿Confirmar eliminación?",
      text: "Esta acción eliminará el tratamiento seleccionado.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sí, eliminar",
      cancelButtonText: "Cancelar"
    });
  
    // Si el usuario confirma, ejecuta la eliminación
    if (result.isConfirmed) {
      const treatmentTypeId = this.treatmentTypes.at(index).get('id')?.value;
      const payments = this.treatment?.treatmentDetails?.find((t: any) => t.id === treatmentTypeId)?.payments || [];
      
      // Verifica si tiene pagos asignados
      if (payments?.length > 0) {
        this._snackBarService.open(
          "Este elemento no puede ser eliminado porque ya existen pagos asignados",
          '',
          { horizontalPosition: "center", verticalPosition: "top", duration: 5000 }
        );
        return;
      }
  
      // Muestra el spinner mientras procesa la eliminación
      this._spinnerService.show();
      try {
        const response = await this._treatmentService.deleteTreatmentDetail(treatmentTypeId);
        if (response && response.code === 200) {
          this.treatmentTypes.removeAt(index); // Solo elimina si la respuesta fue exitosa
          Swal.fire("Eliminado", "El tratamiento ha sido eliminado correctamente", "success");
          this._snackBarService.open(
            "Tratamiento eliminado correctamente",
            '',
            { horizontalPosition: "center", verticalPosition: "top", duration: 5000 }
          );
          this._spinnerService.hide();
          this.returnPage();
        } else {
          Swal.fire("Error", "No se pudo eliminar el tratamiento", "error");
          this._snackBarService.open(
            "Error al eliminar el tratamiento",
            '',
            { horizontalPosition: "center", verticalPosition: "top", duration: 5000 }
          );
        }
      } catch (error) {
        console.error(`Error al eliminar el tratamiento con ID ${treatmentTypeId}:`, error);
        Swal.fire("Error", "Error al eliminar el tratamiento", "error");
        this._snackBarService.open(
          "Error al eliminar el tratamiento",
          '',
          { horizontalPosition: "center", verticalPosition: "top", duration: 5000 }
        );
      } finally {
        // Oculta el spinner después de completar el proceso
        this._spinnerService.hide();
      }
    }
  }
  
  async getPatients() {
    try {
      const {patients} = await this._patientService.getPatient();
      if(patients){
        this.patients = patients;
      }
    }
    catch(error){
      this.patients = [];
    }
  }

  async getTreatmentTypes() {
    try {
      const types = await this._treatmentTypeService.getTreatmentTypes();
      if(types){
        this.treatmentTypesList = types;
      };
    } catch (error) {
      this.treatmentTypesList = [];
    }
  }

  async onSubmit() {
    if (this.form.invalid) {
      const errorMessage = "Verifique todos los campos del formulario.";
      this._snackBarService.open(errorMessage, '', { horizontalPosition: "center", verticalPosition: "top", duration: 5000 });
      return;
    }
  
    if (this.type === "edit") {
      this._spinnerService.show();
      const data = {
        id: this.treatment.id,
        name: this.form.get('name')?.value,
        quotation: this.form.get('quotation')?.value,
        description: this.form.get('description')?.value
      };
  
      const response = await this._treatmentService.updateTreatment(data);
      if (response && response?.code === 200) {
        this._snackBarService.open("Plan de tratamiento actualizado correctamente", '', { horizontalPosition: "center", verticalPosition: "top", duration: 5000 });
        this.returnPage();
        return;
      }
      this._snackBarService.open("No se ha podido actualizar el tratamiento", '', { horizontalPosition: "center", verticalPosition: "top", duration: 5000 });
      this._spinnerService.hide();
    } else if (this.type === "create") {
      const data = {
        patientId: this.form.get('patientId')?.value,
        name: this.form.get('name')?.value,
        quotation: this.form.get('quotation')?.value,
        treatmentTypes: this.form.get('treatmentTypes')?.value,
        description: this.form.get('description')?.value
      };
  
      Swal.fire({
        title: "¿Confirmar creación?",
        text: "¿Desea finalizar la creación del plan?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Sí, finalizar",
        cancelButtonText: "Cancelar"
      }).then(async (result) => {
        if (result.isConfirmed) {
          this._spinnerService.show();
          try {
            const response = await this._treatmentService.createTreatment(data);
            if (response && response.code === 200) {
              const message = "Plan de tratamiento creado correctamente";
              Swal.fire("Éxito", message, "success");
              this._snackBarService.open(message, '', { horizontalPosition: "center", verticalPosition: "top", duration: 5000 });
            } else {
              const errorMessage = "Error al crear el plan de tratamiento";
              Swal.fire("Error", errorMessage, "error");
              this._snackBarService.open(errorMessage, '', { horizontalPosition: "center", verticalPosition: "top", duration: 5000 });
            }
          } catch (error) {
            console.error("Error al crear el plan de tratamiento:", error);
            const errorMessage = "Error al crear el plan de tratamiento";
            Swal.fire("Error", errorMessage, "error");
            this._snackBarService.open(errorMessage, '', { horizontalPosition: "center", verticalPosition: "top", duration: 5000 });
          } finally {
            this._spinnerService.hide();
            this.returnPage();
          }
        }
      });
    }
  }

  async onSaveTreatmentType(index: number): Promise<void> {
    // Muestra SweetAlert para confirmar la acción
    const result = await Swal.fire({
      title: "¿Confirmar acción?",
      text: "¿Desea guardar este tratamiento?",
      icon: "info",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sí, guardar",
      cancelButtonText: "Cancelar"
    });
  
    if (!result.isConfirmed) {
      return; // No hacer nada si no se confirma
    }
  
    const treatmentTypeGroup = this.treatmentTypes.at(index);
    
    // Verifica si el formulario es inválido
    if (treatmentTypeGroup.invalid) {
      this._snackBarService.open(
        'Verifique todos los campos del tratamiento',
        '',
        { horizontalPosition: "center", verticalPosition: "top", duration: 5000 }
      );
      return;
    }
  
    this._spinnerService.show();
    try {
      const treatmentTypeId = treatmentTypeGroup.get('id')?.value;
  
      if (!treatmentTypeId) {
        // Crear un nuevo tratamiento
        const requestData: Partial<CreateTreatmentDetailDTO> = {
          treatmentId: this.treatment.id,
          treatmentTypeId: treatmentTypeGroup.get('treatmentTypeId')?.value,
          price: treatmentTypeGroup.get('price')?.value,
          piece: treatmentTypeGroup.get('piece')?.value
        };
  
        const response = await this._treatmentService.createTreatmentDetail(requestData);
        
        if (response && response.code === 201) {
          const message = "Tratamiento agregado correctamente";
          Swal.fire("Éxito", message, "success"); // SweetAlert de éxito
          this._snackBarService.open(message, '', { horizontalPosition: "center", verticalPosition: "top", duration: 5000 });
          treatmentTypeGroup.get('id')?.setValue(response?.data?.id); // Actualiza el ID en el formulario
          this._spinnerService.hide();
          this.returnPage();
        } else {
          const errorMessage = "Error al agregar tratamiento";
          Swal.fire("Error", errorMessage, "error"); // SweetAlert de error
          this._snackBarService.open(errorMessage, '', { horizontalPosition: "center", verticalPosition: "top", duration: 5000 });
        }
      }
    } catch (error) {
      console.error("Error al agregar tratamiento:", error);
      Swal.fire("Error", "Error al agregar tratamiento", "error"); // SweetAlert de error
      this._snackBarService.open("Error al agregar tratamiento", '', { horizontalPosition: "center", verticalPosition: "top", duration: 5000 });
    } finally {
      this._spinnerService.hide();
    }
  }

  onTreatmentTypeChange(index: number) {
    const selectedTreatmentTypeId = this.treatmentTypes.at(index).get('treatmentTypeId')?.value;
    const selectedTreatmentType = this.treatmentTypesList.find(type => type.id === selectedTreatmentTypeId);
  
    if (selectedTreatmentType) {
      this.treatmentTypes.at(index).get('price')?.setValue(selectedTreatmentType.suggestedPrice);
    }
  }

  async returnPage() {
    this._router.navigateByUrl("/treatment/list");
  }

  private async initializeForm() {
    try {
      console.log("TRIT", this.treatment);
      this.form.controls["patientId"].setValue(this.treatment.patient.id);
      this.form.controls["name"].setValue(this.treatment.name);
      this.form.controls["quotation"].setValue(this.treatment.quotation);
      this.form.controls["description"].setValue(this.treatment.description);
      this.treatment.treatmentDetails.forEach((detail: any) => {
        this.addTreatmentType(detail.id, detail.treatmentType.id, detail.realPrice, detail.piece);
      });
    }
    catch(error){
      console.log("ERROR:", error);
      this.returnPage();
    }
  }
}
