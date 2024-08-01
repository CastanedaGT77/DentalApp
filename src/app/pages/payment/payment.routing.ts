import { Routes } from '@angular/router';
import { ListPendingPaymentComponent } from './list-pending/list-pending-payment.component';
import { MakePaymentComponent } from './make-payment/make-payment.component';

export const PaymentRouting: Routes = [
  {
    path: '',
    children: [
      {
        path: 'list',
        component: ListPendingPaymentComponent
      },
      {
        path: 'makePayment',
        component: MakePaymentComponent
      },
      
    ],
    
  },
];