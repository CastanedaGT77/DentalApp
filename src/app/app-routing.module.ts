import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BlankComponent } from './layouts/blank/blank.component';
import { FullComponent } from './layouts/full/full.component';
import { PatientModule } from './pages/patient/patient.module';
import { UserModule } from './pages/user/user.module';
import { AuthGuard } from './guards/auth.guard';
import { EPermissions } from './utils/permissionEnum';

const routes: Routes = [
  {
    path: '',
    component: FullComponent,
    canActivate: [AuthGuard],
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
          ),
          canActivate: [AuthGuard], /// meter siempre el guard
          data: {
            permissions: [EPermissions.LISTAR_ROLES], // Definir permisos generales si es necesario
          },
      },
      {
        path: 'company',
        loadChildren: () =>
          import('./pages/company/company.module').then(
            (m) => m.CompanyModule
          ),
          canActivate: [AuthGuard], /// meter siempre el guard
          data: {
            permissions: [EPermissions.LISTAR_ROLES], // Definir permisos de compañia pendiente
          },
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
            ),
            canActivate: [AuthGuard], /// meter siempre el guard
            data: {
              permissions: [EPermissions.LISTAR_SUCURSALES], // Definir permisos generales si es necesario
            },
      },
      {
        path: 'patient',
        loadChildren: () =>
          import('./pages/patient/patient.module').then(
            (m) => m.PatientModule
            ),
            canActivate: [AuthGuard], /// meter siempre el guard
            data: {
              permissions: [EPermissions.LISTAR_PACIENTES], // Definir permisos generales si es necesario
            },
      },
      {
        path: 'illnessDetail',
        loadChildren: () =>
          import('./pages/illnessDetail/illnessDetail.module').then(
            (m) => m.IllnessDetailModule
            ),
            canActivate: [AuthGuard], /// meter siempre el guard
            data: {
              permissions: [EPermissions.LISTAR_DETALLES_DE_ENFERMEDAD], // Definir permisos generales si es necesario
            },
      },
      {
        path: 'treatmentType',
        loadChildren: () =>
          import('./pages/treatment-type/treatment-type.module').then(
            (m) => m.TreatmentTypeModule
            ),
            canActivate: [AuthGuard], /// meter siempre el guard
            data: {
              permissions: [EPermissions.LISTAR_TIPOS_TRATAMIENTO], // Definir permisos generales si es necesario
            },
      },
      {
        path: 'date',
        loadChildren: () =>
          import('./pages/date/date.module').then(
            (m) => m.DateModule
            ),
            canActivate: [AuthGuard], /// meter siempre el guard
            data: {
              permissions: [EPermissions.LISTAR_CITAS], // Definir permisos generales si es necesario
            },
      },
      {
        path: 'treatment',
        loadChildren: () =>
          import('./pages/treatment/treatment.module').then(
            (m) => m.TreatmentModule
            ),
            canActivate: [AuthGuard], /// meter siempre el guard
            data: {
              permissions: [EPermissions.LISTAR_TRATAMIENTOS], // Definir permisos generales si es necesario
            },
      },
      {
        path: 'payment',
        loadChildren: () =>
          import('./pages/payment/payment.module').then(
            (m) => m.PaymentModule
            ),
            canActivate: [AuthGuard], /// meter siempre el guard
            data: {
              permissions: [EPermissions.LISTAR_PAGOS], // Definir permisos generales si es necesario
            },
      },
      {
      path: 'report',
      loadChildren: () =>
        import('./pages/report/report.module').then(
          (m) => m.ReportModule
          ),
          canActivate: [AuthGuard], /// meter siempre el guard
          data: {
            permissions: [EPermissions.REPORT_MODULE], // Definir permisos generales si es necesario
          },
      },
      {
        path: 'document',
        loadChildren: () =>
          import('./pages/document/document.module').then(
            (m) => m.DocumentModule
            ),
            canActivate: [AuthGuard], /// meter siempre el guard
            data: {
              permissions: [EPermissions.REPORT_MODULE], // ver permiso de documento
            },
        },
      {
        path: 'extra',
        loadChildren: () =>
          import('./pages/extra/extra.module').then((m) => m.ExtraModule),
      },
      {
        path: 'denied',
        loadChildren: () =>
          import('./pages/access/access.module').then((m) => m.AccessDeniedModule),
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
  {
    path: '',
    component: BlankComponent,
    children: [
      {
        path: 'clinic',
        loadChildren: () =>
          import('./pages/unprotected/unprotected.module').then(
            (m) => m.UnprotectedModule
          ),
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
