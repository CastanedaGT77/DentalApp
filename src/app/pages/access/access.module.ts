import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { AccessDeniedComponent } from './access.component';
import { RouterModule } from '@angular/router';
import { AccessRouting } from './access.routing';

@NgModule({
  declarations: [AccessDeniedComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(AccessRouting),
    MatCardModule,
    MatButtonModule,
    MatIconModule,
  ],
})
export class AccessDeniedModule {}
