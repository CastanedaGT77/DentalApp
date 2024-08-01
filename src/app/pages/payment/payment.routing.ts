import { Routes } from '@angular/router';
import { ListPendingPaymentComponent } from './list-pending/list-pending-payment.component';

export const PaymentRouting: Routes = [
  {
    path: '',
    children: [
      {
        path: 'list',
        component: ListPendingPaymentComponent
      },
      
    ],
    
  },
];