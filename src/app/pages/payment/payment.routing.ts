import { Routes } from '@angular/router';
import { ListPendingPaymentComponent } from './list-pending/list-pending-payment.component';
import { MakePaymentComponent } from './make-payment/make-payment.component';
import { AuthGuard } from 'src/app/guards/auth.guard';
import { EPermissions } from 'src/app/utils/permissionEnum';

export const PaymentRouting: Routes = [
  {
    path: '',
    children: [
      {
        path: 'list',
        component: ListPendingPaymentComponent,
        canActivate: [AuthGuard],
        data: {
          permissions: [EPermissions.LISTAR_PAGOS]
        }
      },
      {
        path: 'makePayment',
        component: MakePaymentComponent,
        canActivate: [AuthGuard],
        data: {
          permissions: [EPermissions.CREAR_PAGOS]
        }
      }
    ]
  }
];
