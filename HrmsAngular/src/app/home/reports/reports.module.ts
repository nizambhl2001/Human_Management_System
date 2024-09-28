import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ReportsRoutingModule } from './reports-routing.module';
import { SalaryReportComponent } from './salary-report/salary-report.component';
import { BankAdviceComponent } from './bank-advice/bank-advice.component';
import { SalaryReconciliationComponent } from './salary-reconciliation/salary-reconciliation.component';
import { SalarySummaryComponent } from './salary-summary/salary-summary.component';
import { BasicInformationComponent } from './basic-information/basic-information.component';
import { PayslipComponent } from './payslip/payslip.component';
import { EmployeeCvComponent } from './employee-cv/employee-cv.component';
import { ProvidentFundComponent } from './provident-fund/provident-fund.component';
import { FoodingOwnComponent } from './fooding-own/fooding-own.component';
import { InOutOwnComponent } from './in-out-own/in-out-own.component';
import { AssetUnderEmpComponent } from './asset-under-emp/asset-under-emp.component';
import { BankAccountComponent } from './bank-account/bank-account.component';
import { SalaryYearlyDetailComponent } from './salary-yearly-detail/salary-yearly-detail.component';
import { YearlySummaryComponent } from './yearly-summary/yearly-summary.component';
import { EmployeeLoanComponent } from './employee-loan/employee-loan.component';
import { SingleEmpSalaryComponent } from './single-emp-salary/single-emp-salary.component';
import { SingleEmpLeaveComponent } from './single-emp-leave/single-emp-leave.component';
import { SingleEmpIncrementComponent } from './single-emp-increment/single-emp-increment.component';
import { SingleEmpIncomeTaxComponent } from './single-emp-income-tax/single-emp-income-tax.component';
import { NgbDateCustomParserFormatter } from '../../shared/dateformat';
import { ReportHelper } from '../../shared/report-helper';
import { NgSelectModule } from '@ng-select/ng-select';
import { LaddaModule } from 'angular2-ladda';
import { UtilityModule } from '../../utility/utility.module';
import { BasicEntryModule } from '../system-setup/basic-entry/basic-entry.module';
import { BasicEntrySelectListComponent } from '../system-setup/basic-entry/basic-entry-select-list/basicentry-select-list';
import { YearSelectListComponent } from '../../utility/year-select-list/year-select-list.component';

@NgModule({
  declarations: [
    SalaryReportComponent,
    BankAdviceComponent,
    SalaryReconciliationComponent,
    SalarySummaryComponent,
    BasicInformationComponent,
    PayslipComponent,
    EmployeeCvComponent,
    ProvidentFundComponent,
    FoodingOwnComponent,
    InOutOwnComponent,
    AssetUnderEmpComponent,
    BankAccountComponent,
    SalaryYearlyDetailComponent,
    YearlySummaryComponent,
    EmployeeLoanComponent,
    SingleEmpSalaryComponent,
    SingleEmpLeaveComponent,
    SingleEmpIncrementComponent,
    SingleEmpIncomeTaxComponent
  ],
  imports: [
    CommonModule,
    NgbModule,
    FormsModule,
    ReportsRoutingModule,
    ReactiveFormsModule,
    NgSelectModule,
    LaddaModule,
    UtilityModule,BasicEntryModule
  ],
  providers:[NgbDateCustomParserFormatter,ReportHelper],
  entryComponents:[BasicEntrySelectListComponent,YearSelectListComponent]
})
export class ReportsModule { }
