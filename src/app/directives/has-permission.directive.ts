import { Directive, Input, TemplateRef, ViewContainerRef } from '@angular/core';
import { AuthenticationService } from '../pages/authentication/authentication.service';

@Directive({
  selector: '[appHasPermission]'
})
export class HasPermissionDirective {
  private userPermissions: string[] = [];

  constructor(
    private authService: AuthenticationService,
    private templateRef: TemplateRef<any>,
    private viewContainer: ViewContainerRef
  ) {
    this.userPermissions = this.authService.getUserPermissions();
  }

  @Input() set appHasPermission(requiredPermissions: string[]) {
    if (!requiredPermissions || requiredPermissions.length === 0) {
      this.viewContainer.createEmbeddedView(this.templateRef);
      return;
    }
  
    const hasPermission = requiredPermissions.some(permission => 
      this.userPermissions.includes(permission.trim()) // Limpia cualquier espacio en blanco accidental
    );
  
    if (hasPermission) {
      this.viewContainer.createEmbeddedView(this.templateRef);
    } else {
      this.viewContainer.clear(); // Remueve el elemento si no tiene los permisos
    }
  }
  
}