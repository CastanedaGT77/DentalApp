import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

// icons
import { TablerIconsModule } from 'angular-tabler-icons';
import * as TablerIcons from 'angular-tabler-icons/icons';

//Import all material modules
import { MaterialModule } from './material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

//Import Layouts
import { FullComponent } from './layouts/full/full.component';
import { BlankComponent } from './layouts/blank/blank.component';

// Vertical Layout
import { SidebarComponent } from './layouts/full/sidebar/sidebar.component';
import { HeaderComponent } from './layouts/full/header/header.component';
import { BrandingComponent } from './layouts/full/sidebar/branding.component';
import { AppNavItemComponent } from './layouts/full/sidebar/nav-item/nav-item.component';
import { NgxSpinnerModule } from 'ngx-spinner';
import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AppSideLoginComponent } from './pages/authentication/login/login.component';
import { Router } from '@angular/router';
import { setAxiosClientRouter } from './axios/axiosConfig';
import { SharedModule } from './shared.module';
import { MatIconModule } from '@angular/material/icon';
import { ConfigService } from './pages/authentication/config.service';
import { MatMenuModule } from '@angular/material/menu';
import { UnprotectedModule } from './pages/unprotected/unprotected.module';
import { InitialComponent } from './pages/unprotected/initial/initial.component';

@NgModule({
  declarations: [
    AppComponent,
    FullComponent,
    BlankComponent,
    SidebarComponent,
    HeaderComponent,
    BrandingComponent,
    AppNavItemComponent,
    InitialComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    TablerIconsModule.pick(TablerIcons),
    NgxSpinnerModule,
    SharedModule, 
    MatIconModule,
    MatMenuModule,
  ],
  exports: [TablerIconsModule],
  bootstrap: [AppComponent],
})
export class AppModule {
  constructor(router: Router) {
    // Aquí configuramos el Router para axios
    setAxiosClientRouter(router);
  }

}
