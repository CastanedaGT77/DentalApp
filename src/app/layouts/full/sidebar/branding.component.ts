import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-branding',
  template: `
    <div class="branding">
      <a href="/">
        <img
          *ngIf="logo"
          [src]="logo"
          class="align-middle m-2 rounded-lg opacity-2"
          alt="logo"
        />
      </a>
    </div>
  `,
})
export class BrandingComponent implements OnInit {
  logo: string | null = null;

  constructor() {}

  ngOnInit() {
    // Obtiene el objeto `properties` del localStorage
    const properties = JSON.parse(localStorage.getItem('properties') || '{}');
    const config = Array.isArray(properties) ? properties[0] : properties;

    // Asigna la URL del logo si existe
    this.logo = config.logo || null;
  }
}
