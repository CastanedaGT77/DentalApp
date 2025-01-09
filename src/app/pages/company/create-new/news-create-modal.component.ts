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

        try {
            let response;

            if (this.isEditMode) {
                response = await this.companyService.updateNew(newsData); // Actualiza
                if (response?.code === 200) { // Verifica el código HTTP correcto
                    this.dialogRef.close({ success: true }); // Notifica éxito al componente padre
                    return;
                }
            } else {
                response = await this.companyService.crearNew(newsData); // Crea nueva
                if (response?.status === 201) { // Verifica el código HTTP correcto
                    this.dialogRef.close({ success: true }); // Notifica éxito al componente padre
                    return;
                }
            }

            // Si el código no es el esperado
            this.dialogRef.close({ error: true });
        } catch (error) {
            console.error('Error al guardar la noticia:', error);
            this.dialogRef.close({ error: true }); // Notifica error al componente padre
        }
    } else {
        Swal.fire('Error', 'Por favor complete todos los campos.', 'error');
    }
  }

  close() {
      this.dialogRef.close();
  }

}
