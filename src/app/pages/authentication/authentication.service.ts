import { Injectable } from "@angular/core";
import { axiosClient } from "src/app/axios/axiosConfig";

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  async login(credentials: { userName: string; password: string }) {
    try {
      const response = await axiosClient.post('/auth', credentials);
      const userData = response.data;
      
      // Aquí podemos procesar el arreglo bonito de la respuesta del backend
      const userInfo = {
        id: userData.id,
        firstName: userData.firstName,
        lastName: userData.lastName,
        email: userData.email,
        role: userData.rol.name,
        company: userData.company.name,
        token: userData.access_token,
        permissions: userData.permissions,
      };
      
      // Retorna el usuario para ser guardado en localStorage
      return userInfo;

    } catch (error) {
      console.error("Error en la autenticación", error);
      throw error;
    }
  }

  // Comprobar si el usuario está autenticado
  isLoggedIn(): boolean {
    return !!localStorage.getItem('access_token');
  }

  // Cerrar sesión
  logout() {
    localStorage.removeItem('access_token');
  }
  
}
