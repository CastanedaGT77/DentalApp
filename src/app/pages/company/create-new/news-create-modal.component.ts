import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
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
  base64Image: string = ''; // Base64 nunca será null
  isEditMode: boolean = false; // Bandera para determinar si es edición o creación

  constructor(
    private fb: FormBuilder,
    private sanitizer: DomSanitizer,
    private companyService: CompanyService,
    private dialogRef: MatDialogRef<NewsCreateModalComponent>,
    private snackBar: MatSnackBar,
    @Inject(MAT_DIALOG_DATA) public data: any // Datos para modo edición
  ) {
    this.isEditMode = !!data; // Si hay datos, estamos en modo edición

    this.newsForm = this.fb.group({
      title: [data?.title || '', [Validators.required]],
      description: [data?.description || '', [Validators.required, Validators.minLength(10)]],
      image: ['', [Validators.required]],
    });

    if (data?.image) {
      this.handleEditImage(data.image);
    }
  }

  /**
   * Maneja la imagen en el modo edición.
   * @param imageUrl URL o Base64 de la imagen.
   */
  private handleEditImage(imageUrl: string): void {
    // Si la imagen ya es base64, configúrala directamente
    if (imageUrl.startsWith('data:image')) {
      this.base64Image = imageUrl;
    } else {
      // Si es una URL, busca la imagen y conviértela a Base64
      this.convertImageToBase64(imageUrl);
    }
    this.previewImage = this.sanitizer.bypassSecurityTrustUrl(this.base64Image); // Vista previa
    this.newsForm.get('image')?.setValue(this.base64Image); // Configura el valor inicial
  }

  /**
   * Convierte una URL de imagen a Base64.
   * @param imageUrl URL de la imagen.
   */
  private convertImageToBase64(imageUrl: string): void {
    fetch(imageUrl)
      .then((response) => response.blob())
      .then((blob) => {
        const reader = new FileReader();
        reader.onloadend = () => {
          this.base64Image = reader.result as string;
          this.previewImage = this.sanitizer.bypassSecurityTrustUrl(this.base64Image); // Vista previa
          this.newsForm.get('image')?.setValue(this.base64Image); // Actualiza el formulario
        };
        reader.readAsDataURL(blob);
      })
      .catch((error) => console.error('Error al convertir imagen a Base64:', error));
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
        const newsData = {
            title: this.newsForm.get('title')?.value,
            description: this.newsForm.get('description')?.value,
            image: this.base64Image, // Imagen en Base64
            ...(this.isEditMode && { id: this.data.id }), // Solo incluye el ID en caso de edición
        };

        const actionText = this.isEditMode ? 'actualizar' : 'crear';

        Swal.fire({
            title: 'Confirmar acción',
            text: `¿Está seguro de que desea ${actionText} esta noticia?`,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: `Sí, ${actionText}`,
            cancelButtonText: 'Cancelar',
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    const response = this.isEditMode
                        ? await this.companyService.updateNew(newsData) // Actualiza
                        : await this.companyService.crearNew(newsData); // Crea nueva

                    // Manejo correcto de alertas según código de respuesta
                    if (response && response.code === 200 && this.isEditMode) {
                        Swal.fire('Éxito', 'Noticia actualizada exitosamente.', 'success');
                    } else if (response && response.code === 201 && !this.isEditMode) {
                        Swal.fire('Éxito', 'Noticia creada exitosamente.', 'success');
                    } else {
                        throw new Error(`Error al ${actionText} la noticia.`);
                    }

                    this.dialogRef.close(true); // Cierra el modal y notifica éxito
                } catch (error) {
                    console.error(`Error al ${actionText} la noticia:`, error);
                    Swal.fire('Error', `Ocurrió un problema al ${actionText} la noticia.`, 'error');
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
