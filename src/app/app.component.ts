import { Component, OnInit } from '@angular/core';
import { ConfigService } from './pages/authentication/config.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
})
export class AppComponent implements OnInit {
  title = 'Modernize Angular Admin Tempplate';

  constructor(private configService: ConfigService) {}

  ngOnInit() {
    // Aplicar estilos en el inicio de la aplicación
    this.configService.applyStylesFromLocalStorage();
  }
  
}
