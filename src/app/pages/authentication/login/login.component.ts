import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AuthenticationService } from '../authentication.service';

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
    private snackBar: MatSnackBar
  ) {
    this.loginForm = this.fb.group({
      userName: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  async onSubmit() {
    if (this.loginForm.invalid) {
      return;
    }

    this.loading = true;
    try {
      const response = await this.authService.login(this.loginForm.value);
      if (response) {
        this.snackBar.open('Acceso exitoso, bienvenido'+ ' ' + response.firstName + ' ' + response.lastName, 'Cerrar', { duration: 3000 });
        // Guardar el token en el localStorage
        // console.log(response)
        localStorage.setItem('name',response.firstName+ ' ' + response.lastName);
        localStorage.setItem('access_token', response.token);
        this.router.navigate(['/dashboard']);
      }
    } catch (error) {
      this.snackBar.open('Error en el login. Verifique sus credenciales.', 'Cerrar', {
        duration: 3000,
      });
    } finally {
      this.loading = false;
    }
  }
}