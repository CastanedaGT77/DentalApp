// config.service.ts
import { Injectable, Renderer2, RendererFactory2 } from '@angular/core';

@Injectable({
  providedIn: 'root' // Esto hace que el servicio esté disponible en toda la aplicación
})
export class ConfigService {
  private renderer: Renderer2;

  constructor(rendererFactory: RendererFactory2) {
    this.renderer = rendererFactory.createRenderer(null, null);
    this.applyStylesFromLocalStorage(); // Llama al método para cargar estilos desde localStorage al iniciar el servicio
  }

  applyStylesFromLocalStorage() {
    // Obtén los datos desde localStorage y accede al primer elemento si es un array
    const properties = JSON.parse(localStorage.getItem('properties') || '{}');
    const config = Array.isArray(properties) ? properties[0] : properties;
    this.applyStylesFromProperties(config);
    console.log('entra a estilos', config);
  }

  applyStylesFromProperties(properties: any) {
    const style = this.renderer.createElement('style');
    style.innerHTML = `
      :root {
        --primary-color: ${properties.primaryColor || '#0284c7'};
        --secondary-color: ${properties.secondaryColor || '#5b21b6'};
        --primary-button-color: ${properties.primaryButtonColor || '#0ecd11'};
        --secondary-button-color: ${properties.secondaryButtonColor || '#4c2424'};
      }

      .bg-primary { background-color: var(--primary-color) !important; }
      .bg-secondary { background-color: var(--secondary-color) !important; }
      .bg-primary-button { background-color: var(--primary-button-color) !important; }
      .bg-secondary-button { background-color: var(--secondary-button-color) !important; }
      .text-primary { color: var(--primary-color) !important; }
      .text-secondary { color: var(--secondary-color) !important; }
    `;
    this.renderer.appendChild(document.head, style);
  }
}
