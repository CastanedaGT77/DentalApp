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
import { IllnessDetailService } from '../illnessDetail/illnessDetail.service';
import { MatTooltipModule } from '@angular/material/tooltip';
import { UserRouting } from './user.routing';
import { ListUserComponent } from './list/list-user.component';
import { UserService } from './user.service';
import { CreateUserComponent } from './create/create-user.component';
import { RoleService } from '../role/role.service';
import { SharedModule } from 'src/app/shared.module';

@NgModule({
    imports: [
      CommonModule,
      RouterModule.forChild(UserRouting),
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
        ListUserComponent,
        CreateUserComponent
    ],
    providers: [
      IllnessDetailService,
      NgxSpinnerService,
      UserService,
      RoleService
    ]
  })
  export class UserModule {}
  