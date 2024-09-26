import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { axiosClient } from "src/app/axios/axiosConfig";

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(private router: Router) {}

  async login(credentials: { userName: string; password: string }) {
    try {
      const response = await axiosClient.post('/auth', credentials);
      const userData = response.data;
      
      const userInfo = {
        id: userData.id,
        firstName: userData.firstName,
        lastName: userData.lastName,
        email: userData.email,
        role: userData.rol.name,
        company: userData.company.name,
        token: userData.access_token,
        permissions: [...new Set(userData.permissions)], // Limpia duplicados
      };
      
      // Almacenar el token y los permisos en localStorage
      localStorage.setItem('access_token', userInfo.token);
      localStorage.setItem('user_permissions', JSON.stringify(userInfo.permissions));

      return userInfo;

    } catch (error) {
      console.error("Error en la autenticación", error);
      throw error;
    }
  }

  // Verificar si el usuario está autenticado
  isLoggedIn(): boolean {
    return !!localStorage.getItem('access_token');
  }

  // Obtener los permisos del usuario
  getUserPermissions(): string[] {
    const permissions = localStorage.getItem('user_permissions');
    return permissions ? JSON.parse(permissions) : [];
  }

  // Cerrar sesión
  logout() {
    localStorage.removeItem('access_token');
    localStorage.removeItem('user_permissions');
    this.router.navigate(['/login']); // Redirigir al login después de cerrar sesión
  }

  // Redirigir al login si el token expira
  handleTokenExpiration() {
    this.logout(); // Ejecuta el logout y redirige al login
    this.router.navigate(['/login']);
  }
}
