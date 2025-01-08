import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import Swal from 'sweetalert2';
import { CompanyService } from '../company.service';

@Component({
  selector: 'app-news-create-modal',
  templateUrl: './news-create-modal.component.html',
})
export class NewsCreateModalComponent {
  newsForm: FormGroup;
  previewImage: SafeUrl | null = null;
  base64Image: string | null = null;

  constructor(
    private fb: FormBuilder,
    private sanitizer: DomSanitizer,
    private companyService: CompanyService,
    private dialogRef: MatDialogRef<NewsCreateModalComponent>,
    private snackBar: MatSnackBar
  ) {
    this.newsForm = this.fb.group({
      title: ['', [Validators.required]],
      description: ['', [Validators.required, Validators.minLength(10)]],
      image: ['', [Validators.required]],
    });
  }

  // Maneja la selección del archivo y lo convierte a Base64
  onFileChange(event: any) {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        this.base64Image = reader.result as string; // Convierte la imagen a Base64
        this.previewImage = this.sanitizer.bypassSecurityTrustUrl(this.base64Image); // Vista previa
        this.newsForm.get('image')?.setValue(this.base64Image); // Actualiza el valor del control
        this.newsForm.get('image')?.updateValueAndValidity(); // Valida el cambio
      };
      reader.readAsDataURL(file);
    }
  }

  async save() {
    if (this.newsForm.valid) {
      // Muestra un SweetAlert para confirmar
      Swal.fire({
        title: 'Confirmar acción',
        text: '¿Está seguro de que desea crear esta noticia?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Sí, crear',
        cancelButtonText: 'Cancelar',
      }).then(async (result) => {
        if (result.isConfirmed) {
          try {
            // Construye el objeto para enviar al backend
            const newsData = {
              ...this.newsForm.value, // Usa los valores actualizados del formulario
            };

            const response = await this.companyService.crearNew(newsData);

            if (response && response.status === 201) {
              Swal.fire('Éxito', 'Noticia creada exitosamente.', 'success');
              this.dialogRef.close(true); // Cierra el modal y notifica éxito
            } else {
              throw new Error('Error al crear la noticia.');
            }
          } catch (error) {
            console.error('Error al guardar la noticia:', error);
            Swal.fire('Error', 'Ocurrió un problema al crear la noticia.', 'error');
          }
        }
      });
    } else {
      Swal.fire('Error', 'Por favor complete todos los campos.', 'error');
    }
  }

  close() {
    this.dialogRef.close(false);
  }
}
