import { FinalSettlementComponent } from './final-settlement/final-settlement.component';
import { GratuitySetupComponent } from './gratuity-setup/gratuity-setup.component';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { NoticeDaySetupComponent } from './notice-day-setup/notice-day-setup.component';
import { NoticePayAmountComponent } from './notice-pay-amount/notice-pay-amount.component';
import { GratuityYearSetupComponent } from './gratuity-year-setup/gratuity-year-setup.component';
import { SettlementReportComponent } from './settlement-report/settlement-report.component';
import { PageGuard } from '../../guards/page.guard';

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forChild([
      { path: 'notice-day-setup', canActivate: [PageGuard], data: { pageId: 173 }, component: NoticeDaySetupComponent },
      { path: 'notice-pay-amount', canActivate: [PageGuard], data: { pageId: 174 }, component: NoticePayAmountComponent },
      { path: 'gratuity-setup', canActivate: [PageGuard], data: { pageId: 175 }, component: GratuitySetupComponent },
      { path: 'gratuity-year-setup', canActivate: [PageGuard], data: { pageId: 176 }, component: GratuityYearSetupComponent },
      { path: 'final-settlement', canActivate: [PageGuard], data: { pageId: 177 }, component: FinalSettlementComponent },
      { path: 'settlement-report', canActivate: [PageGuard], data: { pageId: 178 }, component: SettlementReportComponent },
    ])
  ],
  exports: [RouterModule]
})
export class SettlementRoutingModule { }
