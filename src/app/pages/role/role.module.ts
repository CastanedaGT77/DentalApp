import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../../material.module';

// icons
import { TablerIconsModule } from 'angular-tabler-icons';
import * as TablerIcons from 'angular-tabler-icons/icons';
import { MatNativeDateModule } from '@angular/material/core';
import { NgxSpinnerModule, NgxSpinnerService } from 'ngx-spinner';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip';
import { RoleListComponent } from './list/role-list.component';
import { CreateRoleComponent } from './create/create-role.component';
import { RoleRouting } from './role.routing';
import { RoleService } from './role.service';
import { DeleteRole } from './delete/delete-role.component';
import { SharedModule } from 'src/app/shared.module';

@NgModule({
    imports: [
      CommonModule,
      RouterModule.forChild(RoleRouting),
      MaterialModule,
      FormsModule,
      ReactiveFormsModule,
      TablerIconsModule.pick(TablerIcons),
      MatNativeDateModule,
      NgxSpinnerModule,
      MatFormFieldModule,
      MatInputModule,
      FormsModule,
      MatButtonModule,
      MatTooltipModule,
      SharedModule
    ],
    declarations: [
      RoleListComponent,
      CreateRoleComponent,
      DeleteRole
    ],
    providers: [
      RoleService,
      NgxSpinnerService
    ]
  })
  export class RoleModule {}
  