import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IncomeTaxRoutingModule } from './income-tax-routing.module';
import { TaxYearInfoComponent } from './tax-year-info/tax-year-info.component';
import { IncomeTaxSlabComponent } from './income-tax-slab/income-tax-slab.component';
import { IncomeTaxSetupComponent } from './income-tax-setup/income-tax-setup.component';
import { MinimumTaxSetupComponent } from './minimum-tax-setup/minimum-tax-setup.component';
import { SurchargeAssignComponent } from './surcharge-assign/surcharge-assign.component';
import { SearchChargeSetupComponent } from './search-charge-setup/search-charge-setup.component';
import { BlockTaxCalculationComponent } from './block-tax-calculation/block-tax-calculation.component';
import { TaxChallanComponent } from './tax-challan/tax-challan.component';
import { AdditionalTaxInfoComponent } from './additional-tax-info/additional-tax-info.component';
import { OtherTaxCalculationComponent } from './other-tax-calculation/other-tax-calculation.component';
import { ChallanPrepareComponent } from './challan-prepare/challan-prepare.component';
import { ChallanNumberAssignComponent } from './challan-number-assign/challan-number-assign.component';
import { TxtCardReportComponent } from './txt-card-report/txt-card-report.component';
import { TaxReportComponent } from './tax-report/tax-report.component';
import { TaxPaidPayrollComponent } from './tax-paid-payroll/tax-paid-payroll.component';
import { TaxAdjustComponent } from './tax-adjust/tax-adjust.component';
import { ProcessIncomeTaxComponent } from './process-income-tax/process-income-tax.component';
import { NgSelectModule } from '@ng-select/ng-select';
import { NgbDateCustomParserFormatter } from '../../shared/dateformat';
import { ReturnTaxComponent } from './return-tax/return-tax.component';
import { UtilityModule } from '../../utility/utility.module';
import { EmployeeSelectListComponent } from '../../utility/employee-select-list/employee-select-list.component';
import { TaxYearSelectListComponent } from '../../utility/tax-year-select-list/tax-year-select-list.component';
import { SignatorySelectListComponent } from '../../utility/signatory-select-list/signatory-select-list.component';
import { DepartmentSelectListComponent } from '../../utility/department-select-list/department-select-list.component';
import { BranchSelectListComponent } from '../../utility/branch-select-list/branch-select-list.component';
import { ProjectSelectListComponent } from '../../utility/project-select-list/project-select-list.component';
import { PeriodSelectListComponent } from '../../utility/period-select-list/period-select-list.component';
import { ReportHelper } from '../../shared/report-helper';
import { LaddaModule } from 'angular2-ladda';
import { ReturnTaxReportComponent } from './return-tax-report/return-tax-report.component';




@NgModule({
  declarations: [

  TaxYearInfoComponent,

  IncomeTaxSlabComponent,

  IncomeTaxSetupComponent,

  MinimumTaxSetupComponent,

  SurchargeAssignComponent,

  SearchChargeSetupComponent,

  BlockTaxCalculationComponent,

  TaxChallanComponent,

  AdditionalTaxInfoComponent,

  OtherTaxCalculationComponent,

  ChallanPrepareComponent,

  ChallanNumberAssignComponent,

  TxtCardReportComponent,

  TaxReportComponent,

  TaxPaidPayrollComponent,

  TaxAdjustComponent,

  ProcessIncomeTaxComponent,

  ReturnTaxComponent,

  ReturnTaxReportComponent
]
  ,
  imports: [
    CommonModule,
    NgbModule,
    FormsModule,
    IncomeTaxRoutingModule,
    ReactiveFormsModule,
    NgSelectModule,
    UtilityModule,
    LaddaModule
  ],
  entryComponents:[
    EmployeeSelectListComponent,
    TaxYearSelectListComponent,
    SignatorySelectListComponent,
    DepartmentSelectListComponent,
    BranchSelectListComponent,
    ProjectSelectListComponent,
    PeriodSelectListComponent
  ],
    providers:[NgbDateCustomParserFormatter, ReportHelper],
  
})
export class IncomeTaxModule { }
