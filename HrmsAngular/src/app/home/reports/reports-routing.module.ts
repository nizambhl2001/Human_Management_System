import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
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
import { PageGuard } from '../../guards/page.guard';


@NgModule({
  imports: [RouterModule.forChild([
    { path: 'salary-report', canActivate: [PageGuard], data:{pageId:179}, component: SalaryReportComponent },
    { path: 'bank-advice', canActivate: [PageGuard], data:{pageId:180}, component: BankAdviceComponent },
    { path: 'salary-reconciliation', canActivate: [PageGuard], data:{pageId:181}, component: SalaryReconciliationComponent },
    { path: 'salary-summary', canActivate: [PageGuard], data:{pageId:182}, component: SalarySummaryComponent },
    { path: 'basic-information', canActivate: [PageGuard], data:{pageId:183}, component: BasicInformationComponent },
    { path: 'payslip', canActivate: [PageGuard], data:{pageId:184}, component: PayslipComponent },
    { path: 'employee-cv', canActivate: [PageGuard], data:{pageId:185}, component: EmployeeCvComponent },
    { path: 'provident-fund', canActivate: [PageGuard], data:{pageId:186}, component: ProvidentFundComponent },
    { path: 'fooding-own', canActivate: [PageGuard], data:{pageId:187}, component: FoodingOwnComponent },
    { path: 'in-out-own', canActivate: [PageGuard], data:{pageId:188}, component: InOutOwnComponent },
    { path: 'asset-under-emp', canActivate: [PageGuard], data:{pageId:189}, component: AssetUnderEmpComponent },
    { path: 'bank-account', canActivate: [PageGuard], data:{pageId:190}, component: BankAccountComponent },
    { path: 'salary-yearly-detail', canActivate: [PageGuard], data:{pageId:191}, component: SalaryYearlyDetailComponent },
    { path: 'yearly-summary', canActivate: [PageGuard], data:{pageId:192}, component: YearlySummaryComponent },
    { path: 'employee-loan', canActivate: [PageGuard], data:{pageId:193}, component: EmployeeLoanComponent },
    { path: 'single-emp-salary', canActivate: [PageGuard], data:{pageId:194}, component: SingleEmpSalaryComponent },
    { path: 'single-emp-leave', canActivate: [PageGuard], data:{pageId:195}, component: SingleEmpLeaveComponent },
    { path: 'single-emp-increment', canActivate: [PageGuard], data:{pageId:196}, component: SingleEmpIncrementComponent },
    { path: 'single-emp-income-tax', canActivate: [PageGuard], data:{pageId:197}, component: SingleEmpIncomeTaxComponent },

  ])],
  exports: [RouterModule]
})
export class ReportsRoutingModule { }
