
import { LoanInfoComponent } from './loan-info/loan-info.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { CashReceiveComponent } from './cash-receive/cash-receive.component';
import { StopDeductionComponent } from './stop-deduction/stop-deduction.component';
import { LoanReportComponent } from './loan-report/loan-report.component';
import { PageGuard } from '../../guards/page.guard';

@NgModule({
  declarations: [

  ],
  imports: [
    RouterModule.forChild([
      {path:'loan-info',canActivate: [PageGuard], data:{pageId:98}, component: LoanInfoComponent},
      {path:'cash-receive', canActivate: [PageGuard], data:{pageId:99}, component: CashReceiveComponent},
      {path:'stop-deduction',canActivate: [PageGuard], data:{pageId:100}, component: StopDeductionComponent},
      {path:'loan-report',canActivate: [PageGuard], data:{pageId:101}, component: LoanReportComponent},
    ]),
    CommonModule
  ]
})
export class LoanRoutingModule { }
