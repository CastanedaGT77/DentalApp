import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { CompanyService } from '../company.service';
import { UpdateCompanyDTO } from 'src/app/data/dtos/company/UpdateCompanyDTO';
import { NgxSpinnerService } from 'ngx-spinner';
import { MatSnackBar } from '@angular/material/snack-bar';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-company-edit-modal',
  templateUrl: './company-edit-modal.component.html',
})
export class CompanyEditModalComponent {
  companyForm: FormGroup;
  previewLogo: SafeUrl | null = null;
  logoBase64: string | null = null;

  constructor(
    private fb: FormBuilder,
    private sanitizer: DomSanitizer,
    private companyService: CompanyService,
    private dialogRef: MatDialogRef<CompanyEditModalComponent>,
    private spinnerService: NgxSpinnerService,
    private snackBar: MatSnackBar,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.companyForm = this.fb.group({
      header: [data.header, Validators.required],
      allowMessageSending: [data.allowMessageSending, Validators.required],
      footer: [data.footer, Validators.required],
      primaryColor: [data.primaryColor || '#ffffff', Validators.required],
      secondaryColor: [data.secondaryColor || '#ffffff', Validators.required],
      primaryButtonColor: [data.primaryButtonColor || '#ffffff', Validators.required],
      secondaryButtonColor: [data.secondaryButtonColor || '#ffffff', Validators.required],
    });

    if (data.logo) {
      this.previewLogo = this.sanitizer.bypassSecurityTrustUrl(data.logo);
      this.logoBase64 = data.logo;
    }
  }

  onFileChange(event: any) {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        this.logoBase64 = reader.result as string;
        this.previewLogo = this.sanitizer.bypassSecurityTrustUrl(this.logoBase64);
      };
      reader.readAsDataURL(file);
    }
  }

  async onSave() {
    // Muestra la alerta de confirmación
    Swal.fire({
      title: 'Confirmar acción',
      text: '¿Está seguro de que desea guardar los cambios en la compañía?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, guardar',
      cancelButtonText: 'Cancelar',
    }).then(async (result) => {
      if (result.isConfirmed) {
        // Si el usuario confirma, realiza la actualización
        this.spinnerService.show();

        try {
          const companyData: UpdateCompanyDTO = {
            ...this.companyForm.value,
            logo: this.logoBase64,
          };

          const response = await this.companyService.updateCompany(companyData);

          if (response) {
            Swal.fire('Éxito', 'Compañía actualizada exitosamente.', 'success');
            this.dialogRef.close(true);
          } else {
            throw new Error('No se pudo actualizar la compañía');
          }
        } catch (error) {
          console.error('Error al actualizar la compañía:', error);
          Swal.fire('Error', 'Ocurrió un error al actualizar la compañía.', 'error');
        } finally {
          this.spinnerService.hide();
        }
      }
    });
  }

  onCancel() {
    this.dialogRef.close(false);
  }
}
