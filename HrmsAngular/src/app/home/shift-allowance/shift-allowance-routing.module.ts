import { EditAllowanceComponent } from './edit-allowance/edit-allowance.component';
import { ManualPaymentComponent } from './manual-payment/manual-payment.component';
import { AutoPaymentComponent } from './auto-payment/auto-payment.component';
import { AssignComponent } from './assign/assign.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SetupComponent } from './setup/setup.component';
import { ShiftAllowanceReportComponent } from './shift-allowance-report/shift-allowance-report.component';
import { PageGuard } from '../../guards/page.guard';

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forChild([
      {path: 'setup',canActivate: [PageGuard], data:{pageId:87}, component: SetupComponent },
      {path: 'assign',canActivate: [PageGuard], data:{pageId:88}, component: AssignComponent },
      {path:'edit',canActivate: [PageGuard], data:{pageId:89}, component: EditAllowanceComponent},
      {path: 'auto-payment',canActivate: [PageGuard], data:{pageId:90}, component: AutoPaymentComponent },
      {path: 'manual-payment',canActivate: [PageGuard], data:{pageId:91}, component: ManualPaymentComponent },
      {path: 'shift-allowance-report',canActivate: [PageGuard], data:{pageId:92}, component: ShiftAllowanceReportComponent }
    ]),
    CommonModule
  ]
})
export class ShiftAllowanceRoutingModule { }
