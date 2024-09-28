import { NgbDateCustomParserFormatter } from './../../shared/dateformat';
import { DateControlComponent } from './../../utility/date-control/date-control.component';
import { EmployeeTypeListComponent } from './../../utility/employee-type-list/employee-type-list.component';
import { NgSelectModule } from '@ng-select/ng-select';
import { SettlementRoutingModule } from './settlement-routing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NoticeDaySetupComponent } from './notice-day-setup/notice-day-setup.component';
import { NoticePayAmountComponent } from './notice-pay-amount/notice-pay-amount.component';
import { GratuitySetupComponent } from './gratuity-setup/gratuity-setup.component';
import { GratuityYearSetupComponent } from './gratuity-year-setup/gratuity-year-setup.component';
import { FinalSettlementComponent } from './final-settlement/final-settlement.component';
import { SettlementReportComponent } from './settlement-report/settlement-report.component';
import { UtilityModule } from '../../utility/utility.module';
import { LaddaModule } from 'angular2-ladda';
import { ReportHelper } from '../../shared/report-helper';

@NgModule({
  declarations: [
    NoticeDaySetupComponent,
    NoticePayAmountComponent,
    GratuitySetupComponent,
    GratuityYearSetupComponent,
    FinalSettlementComponent,
    SettlementReportComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    NgbModule,
    SettlementRoutingModule,
    ReactiveFormsModule,
    NgSelectModule,
    UtilityModule,
    LaddaModule
  ],
  entryComponents:[
    EmployeeTypeListComponent,
    EmployeeTypeListComponent,
    DateControlComponent
  ],
  providers:[NgbDateCustomParserFormatter, ReportHelper]
})
export class SettlementModule { }
