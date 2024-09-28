import { ArrearPaymentManualComponent } from './arrear-payment-manual/arrear-payment-manual.component';
import { ArrearPaymentAutoComponent } from './arrear-payment-auto/arrear-payment-auto.component';
import { LeavePaymentComponent } from './leave-payment/leave-payment.component';
import { LeaveTypeSetupComponent } from './leave-type-setup/leave-type-setup.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { LeaveAmountSetupComponent } from './leave-amount-setup/leave-amount-setup.component';
import { SalesCommissionComponent } from './sales-commission/sales-commission.component';
import { EncashmentPaymentComponent } from './encashment-payment/encashment-payment.component';
import { PageGuard } from '../../guards/page.guard';

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forChild([
        {path: 'leave-type-setup', canActivate: [PageGuard], data:{pageId:144}, component: LeaveTypeSetupComponent},
        {path: 'leave-amount-setup', canActivate: [PageGuard], data:{pageId:145}, component: LeaveAmountSetupComponent},
        {path: 'leave-payment', canActivate: [PageGuard], data:{pageId:146}, component: LeavePaymentComponent},
        {path: 'sales-commission', canActivate: [PageGuard], data:{pageId:147}, component: SalesCommissionComponent},
        {path: 'encashment-payment', canActivate: [PageGuard], data:{pageId:148}, component: EncashmentPaymentComponent},
        {path: 'arrear-payment-auto', canActivate: [PageGuard], data:{pageId:149}, component: ArrearPaymentAutoComponent},
        {path: 'arrear-payment-manual', canActivate: [PageGuard], data:{pageId:150}, component: ArrearPaymentManualComponent}
    ]),
    CommonModule
  ],
  exports: [RouterModule]
})
export class IncentiveRoutingModule { }
