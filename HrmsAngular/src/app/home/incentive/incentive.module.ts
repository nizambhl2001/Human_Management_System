import { UtilityModule } from './../../utility/utility.module';
import { ArrearPaymentAutoComponent } from './arrear-payment-auto/arrear-payment-auto.component';
import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { IncentiveRoutingModule } from './incentive-routing.module';
import { LeaveTypeSetupComponent } from './leave-type-setup/leave-type-setup.component';
import { LeaveAmountSetupComponent } from './leave-amount-setup/leave-amount-setup.component';
import { LeavePaymentComponent } from './leave-payment/leave-payment.component';
import { SalesCommissionComponent } from './sales-commission/sales-commission.component';
import { EncashmentPaymentComponent } from './encashment-payment/encashment-payment.component';
import { ArrearPaymentManualComponent } from './arrear-payment-manual/arrear-payment-manual.component';
import { NgSelectModule } from '@ng-select/ng-select';
import { NgbDateCustomParserFormatter } from '../../shared/dateformat';
import { BasicEntryComponent } from '../system-setup/basic-entry/basic-entry.component';
import { Helper } from '../../shared/helper';

@NgModule({
  declarations: [
    LeaveTypeSetupComponent,
    LeaveAmountSetupComponent,
    LeavePaymentComponent,
    SalesCommissionComponent,
    EncashmentPaymentComponent,
    ArrearPaymentAutoComponent,
    ArrearPaymentManualComponent,
    ],
  imports: [
    CommonModule,
    FormsModule,
    NgbModule,
    IncentiveRoutingModule,
    ReactiveFormsModule,
    NgSelectModule,
    UtilityModule
  ],
  providers:[NgbDateCustomParserFormatter,BasicEntryComponent, Helper,  DatePipe]
})
export class IncentiveModule { }
