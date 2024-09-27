import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree,
  Router,
} from '@angular/router';
import { AuthenticationService } from '../pages/authentication/authentication.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(
    private authService: AuthenticationService,
    private router: Router
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean | UrlTree {
    const isLoggedIn = this.authService.isLoggedIn();
    
    // Si el usuario está logueado
    if (isLoggedIn) {
      // Obtener los permisos requeridos desde la ruta
      const requiredPermissions = route.data['permissions'] as string[];
      
      // Si no se requieren permisos o el usuario tiene los permisos necesarios, se permite el acceso
      if (!requiredPermissions || requiredPermissions.length === 0) {
        return true;
      }

      // Verificar si el usuario tiene los permisos necesarios
      const userPermissions = this.authService.getUserPermissions();
      const hasPermission = requiredPermissions.some(permission => 
        userPermissions.includes(permission)
      );

      if (hasPermission) {
        return true;
      } else {
        // Redirigir a una página de acceso denegado o similar si no tiene permisos
        // console.log('chinga tu madre, acceso denegado')
        return this.router.createUrlTree(['/denied/denied']);
      }
    } else {
      // Si no está autenticado, redirigir al login
      return this.router.createUrlTree(['/authentication/login']);
    }
  }
}

