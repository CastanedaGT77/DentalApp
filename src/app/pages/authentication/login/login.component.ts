import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { AuthenticationService } from '../authentication.service';
import { ConfigService } from '../config.service';
import { ForgotPasswordModalComponent } from '../forgot-password-modal/forgot-password-modal.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
})
export class AppSideLoginComponent {
  loginForm: FormGroup;
  loading = false;

  constructor(
    private fb: FormBuilder,
    private authService: AuthenticationService,
    private router: Router,
    private snackBar: MatSnackBar,
    private configService: ConfigService,
    public dialog: MatDialog
  ) {
    this.loginForm = this.fb.group({
      userName: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  redirectToInitial(): void {
    console.log('entra aca')
    this.router.navigate(['/clinic/initial']);
  }

  async onSubmit() {
    if (this.loginForm.invalid) {
      return;
    }

    this.loading = true;
    try {
      const response = await this.authService.login(this.loginForm.value);
      if (response) {
        this.snackBar.open(
          `Acceso exitoso, bienvenido ${response.firstName} ${response.lastName}`,
          'Cerrar',
          { duration: 3000 }
        );
        localStorage.setItem('access_token', response.token);
        localStorage.setItem('companyId', response.companyId);
        localStorage.setItem('properties', JSON.stringify(response.properties));
        this.configService.applyStylesFromLocalStorage();
        this.router.navigate(['/dashboard']);
      }
    } catch (error) {
      this.snackBar.open(
        'Error en el login. Verifique sus credenciales.',
        'Cerrar',
        { duration: 3000 }
      );
    } finally {
      this.loading = false;
    }
  }

  openForgotPasswordModal(): void {
    const dialogRef = this.dialog.open(ForgotPasswordModalComponent, {
      width: '400px',
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        Swal.fire({
          title: '¿Está seguro?',
          text: 'Se enviará un correo de recuperación de contraseña.',
          icon: 'warning',
          showCancelButton: true,
          confirmButtonText: 'Sí, enviar',
          cancelButtonText: 'Cancelar',
        }).then((confirmation) => {
          if (confirmation.isConfirmed) {
            Swal.fire(
              'Correo enviado',
              'Revisa tu bandeja de entrada.',
              'success'
            );
          }
        });
      }
    });
  }
}
