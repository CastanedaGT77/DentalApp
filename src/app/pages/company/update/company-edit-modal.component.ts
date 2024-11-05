import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { CompanyService } from '../company.service';
import { UpdateCompanyDTO } from 'src/app/data/dtos/company/UpdateCompanyDTO';
import { NgxSpinnerService } from 'ngx-spinner';
import { MatSnackBar } from '@angular/material/snack-bar';

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

    // Set preview if logo is provided
    if (data.logo) {
      this.previewLogo = this.sanitizer.bypassSecurityTrustUrl(data.logo);
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
    this.spinnerService.show();
    
    try {
      const companyData: UpdateCompanyDTO = {
        ...this.companyForm.value,
        logo: this.logoBase64,
      };

      const response = await this.companyService.updateCompany(companyData);

      if (response) {
        this.snackBar.open('Compañía actualizada exitosamente', 'Cerrar', {
          duration: 3000,
          horizontalPosition: 'center',
          verticalPosition: 'top',
        });
        this.dialogRef.close(true);
      } else {
        throw new Error('No se pudo actualizar la compañía');
      }
    } catch (error) {
      console.error('Error al actualizar la compañía:', error);
      this.snackBar.open('Error al actualizar la compañía', 'Cerrar', {
        duration: 3000,
        horizontalPosition: 'center',
        verticalPosition: 'top',
      });
    } finally {
      this.spinnerService.hide();
    }
  }

  onCancel() {
    this.dialogRef.close(false);
  }
}
