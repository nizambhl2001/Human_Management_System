import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { OvertimeApproveComponent } from './overtime-approve/overtime-approve.component';
import { OverTimeReportComponent } from './over-time-report/over-time-report.component';
import { OverTimeMenualComponent } from './over-time-menual/over-time-menual.component';
import { PageGuard } from '../../guards/page.guard';
import { OtRequsationComponent } from './ot-requsation/ot-requsation.component';
import { OtCalculationComponent } from './ot-calculation/ot-calculation.component';
import { OtPaymentComponent } from './ot-payment/ot-payment.component';
import { OtReplacementComponent } from './ot-replacement/ot-replacement.component';



@NgModule({
  imports: [RouterModule.forChild([
    { path: 'overtime-approve',canActivate: [PageGuard], data:{pageId:71}, component: OvertimeApproveComponent },
    { path: 'over-time-menual',canActivate: [PageGuard], data:{pageId:83}, component: OverTimeMenualComponent },
    { path: 'over-time-report',canActivate: [PageGuard], data:{pageId:86}, component: OverTimeReportComponent },
    { path: 'ot-requsation',canActivate: [PageGuard], data:{pageId:236}, component: OtRequsationComponent },
    { path: 'ot-calculation',canActivate: [PageGuard], data:{pageId:233}, component: OtCalculationComponent },
    { path: 'ot-payment',canActivate: [PageGuard], data:{pageId:234}, component: OtPaymentComponent },
    { path: 'ot-replacement',canActivate: [PageGuard], data:{pageId:235}, component: OtReplacementComponent }
  ])],
  exports: [RouterModule]
})
export class OvertimeRoutingModule { }
