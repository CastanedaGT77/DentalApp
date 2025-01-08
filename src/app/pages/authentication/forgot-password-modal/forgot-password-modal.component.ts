import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar'; // Para mostrar mensajes de error o éxito
import { AuthenticationService } from '../authentication.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-forgot-password-modal',
  templateUrl: './forgot-password-modal.component.html',
})
export class ForgotPasswordModalComponent {
  forgotPasswordForm2: FormGroup;
  isProcessing: boolean = false; // Controla el estado del botón de envío

  constructor(
    private fb: FormBuilder,
    private authService: AuthenticationService, // Inyecta tu servicio
    private snackBar: MatSnackBar, // Inyecta MatSnackBar para mostrar mensajes
    public dialogRef: MatDialogRef<ForgotPasswordModalComponent>
  ) {
    this.forgotPasswordForm2 = this.fb.group({
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
    });
  }

  onCancel(): void {
    this.dialogRef.close(false);
  }

  async onSubmit(): Promise<void> {
    if (this.forgotPasswordForm2.valid && !this.isProcessing) {
      this.isProcessing = true;
  
      try {
        const result = await Swal.fire({
          title: '¿Está seguro?',
          text: 'Se enviará un correo de recuperación de contraseña, sí sus datos son correctos.',
          icon: 'warning',
          showCancelButton: true,
          confirmButtonText: 'Sí, enviar',
          cancelButtonText: 'Cancelar',
        });
  
        if (result.isConfirmed) {
          const requestData = this.forgotPasswordForm2.value;
  
          const response = await this.authService.resetPassword(requestData);
  
          if (response && response.code === 200) {
            await Swal.fire({
              title: 'Correo enviado',
              text: 'Revisa tu bandeja de entrada.',
              icon: 'success',
              confirmButtonText: 'OK',
            });
            this.dialogRef.close(true);
          } else {
            await Swal.fire({
              title: 'Error',
              text: 'No se pudo enviar el correo de restablecimiento.',
              icon: 'error',
              confirmButtonText: 'OK',
            });
          }
        }
      } catch (error) {
        await Swal.fire({
          title: 'Error inesperado',
          text: 'Ocurrió un problema al procesar tu solicitud.',
          icon: 'error',
          confirmButtonText: 'OK',
        });
      } finally {
        this.isProcessing = false; // Restablecer estado
      }
    }
  }
  
}
