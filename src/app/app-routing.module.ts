import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BlankComponent } from './layouts/blank/blank.component';
import { FullComponent } from './layouts/full/full.component';
import { PatientModule } from './pages/patient/patient.module';
import { UserModule } from './pages/user/user.module';

const routes: Routes = [
  {
    path: '',
    component: FullComponent,
    children: [
      {
        path: '',
        redirectTo: '/dashboard',
        pathMatch: 'full',
      },
      {
        path: 'dashboard',
        loadChildren: () =>
          import('./pages/pages.module').then((m) => m.PagesModule),
      },
      {
        path: 'ui-components',
        loadChildren: () =>
          import('./pages/ui-components/ui-components.module').then(
            (m) => m.UicomponentsModule
          ),
      },
      // ADMIN
      {
        path: 'role',
        loadChildren: () =>
          import('./pages/role/role.module').then(
            (m) => m.RoleModule
          )
      },
      {
        path: 'user',
        loadChildren: () =>
          import('./pages/user/user.module').then(
            (m) => m.UserModule
          )
      },
      {
        path: 'branch',
        loadChildren: () =>
          import('./pages/branch/branch.module').then(
            (m) => m.BranchModule
          )
      },
      {
        path: 'patient',
        loadChildren: () =>
          import('./pages/patient/patient.module').then(
            (m) => m.PatientModule
          ),
      },
      {
        path: 'illnessDetail',
        loadChildren: () =>
          import('./pages/illnessDetail/illnessDetail.module').then(
            (m) => m.IllnessDetailModule
          ),
      },
      {
        path: 'treatmentType',
        loadChildren: () =>
          import('./pages/treatment-type/treatment-type.module').then(
            (m) => m.TreatmentTypeModule
          ),
      },
      {
        path: 'date',
        loadChildren: () =>
          import('./pages/date/date.module').then(
            (m) => m.DateModule
          ),
      },
      {
        path: 'treatment',
        loadChildren: () =>
          import('./pages/treatment/treatment.module').then(
            (m) => m.TreatmentModule
          ),
      },
      {
        path: 'payment',
        loadChildren: () =>
          import('./pages/payment/payment.module').then(
            (m) => m.PaymentModule
          ),
      },
      {
        path: 'extra',
        loadChildren: () =>
          import('./pages/extra/extra.module').then((m) => m.ExtraModule),
      },
    ],
  },
  {
    path: '',
    component: BlankComponent,
    children: [
      {
        path: 'authentication',
        loadChildren: () =>
          import('./pages/authentication/authentication.module').then(
            (m) => m.AuthenticationModule
          ),
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
