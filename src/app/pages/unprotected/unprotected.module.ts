import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { UnprotectedRoutes } from './unprotected.routing';
import { InitialService } from './initial/initial.service';

@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild(UnprotectedRoutes),
        MatIconModule,
        MatCardModule,
        MatInputModule,
        MatCheckboxModule,
        MatButtonModule,
        FormsModule,
        ReactiveFormsModule,
    ], 
    providers: [
        NgxSpinnerService,
        InitialService
    ]
})
export class UnprotectedModule {}