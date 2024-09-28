import { ReturnTaxReportComponent } from './return-tax-report/return-tax-report.component';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { TaxYearInfoComponent } from './tax-year-info/tax-year-info.component';
import { IncomeTaxSlabComponent } from './income-tax-slab/income-tax-slab.component';
import { IncomeTaxSetupComponent } from './income-tax-setup/income-tax-setup.component';
import { MinimumTaxSetupComponent } from './minimum-tax-setup/minimum-tax-setup.component';
import { SurchargeAssignComponent } from './surcharge-assign/surcharge-assign.component';
import { TaxChallanComponent } from './tax-challan/tax-challan.component';
import { BlockTaxCalculationComponent } from './block-tax-calculation/block-tax-calculation.component';
import { SearchChargeSetupComponent } from './search-charge-setup/search-charge-setup.component';
import { AdditionalTaxInfoComponent } from './additional-tax-info/additional-tax-info.component';
import { OtherTaxCalculationComponent } from './other-tax-calculation/other-tax-calculation.component';
import { ChallanPrepareComponent } from './challan-prepare/challan-prepare.component';
import { ChallanNumberAssignComponent } from './challan-number-assign/challan-number-assign.component';
import { TxtCardReportComponent } from './txt-card-report/txt-card-report.component';
import { TaxReportComponent } from './tax-report/tax-report.component';
import { TaxPaidPayrollComponent } from './tax-paid-payroll/tax-paid-payroll.component';
import { TaxAdjustComponent } from './tax-adjust/tax-adjust.component';
import { ProcessIncomeTaxComponent } from './process-income-tax/process-income-tax.component';
import { ReturnTaxComponent } from './return-tax/return-tax.component';
import { PageGuard } from '../../guards/page.guard';




@NgModule({
  imports: [RouterModule.forChild([
   {path: 'tax-year-info',canActivate: [PageGuard], data:{pageId:155}, component: TaxYearInfoComponent},
   {path: 'income-tax-slab',canActivate: [PageGuard], data:{pageId:156}, component: IncomeTaxSlabComponent},
   {path: 'income-tax-setup',canActivate: [PageGuard], data:{pageId:157}, component:IncomeTaxSetupComponent},
   {path: 'minimum-tax-setup',canActivate: [PageGuard], data:{pageId:158}, component: MinimumTaxSetupComponent},
   {path: 'surcharge-assign',canActivate: [PageGuard], data:{pageId:159}, component: SurchargeAssignComponent},
   {path: 'search-charge-setup',canActivate: [PageGuard], data:{pageId:160}, component: SearchChargeSetupComponent},
   {path: 'block-tax-calculation',canActivate: [PageGuard], data:{pageId:161}, component: BlockTaxCalculationComponent},
   {path: 'tax-challan',canActivate: [PageGuard], data:{pageId:162}, component:  TaxChallanComponent},
   {path: 'additional-tax-info',canActivate: [PageGuard], data:{pageId:163}, component:  AdditionalTaxInfoComponent},
   {path: 'other-tax-calculation',canActivate: [PageGuard], data:{pageId:164}, component: OtherTaxCalculationComponent},
   {path: 'challan-prepare',canActivate: [PageGuard], data:{pageId:165}, component:   ChallanPrepareComponent},
   {path: 'challan-number-assign',canActivate: [PageGuard], data:{pageId:166}, component:  ChallanNumberAssignComponent},
   {path: 'txt-card-report',canActivate: [PageGuard], data:{pageId:167}, component:  TxtCardReportComponent},
   {path: 'tax-report',canActivate: [PageGuard], data:{pageId:168}, component:  TaxReportComponent},
   {path: 'tax-paid-payroll',canActivate: [PageGuard], data:{pageId:169}, component:  TaxPaidPayrollComponent},
   {path: 'tax-adjust',canActivate: [PageGuard], data:{pageId:170}, component:  TaxAdjustComponent},
   {path: 'process-income-tax',canActivate: [PageGuard], data:{pageId:171}, component:  ProcessIncomeTaxComponent},
   {path: 'return-tax',canActivate: [PageGuard], data:{pageId:172}, component:  ReturnTaxComponent},
   {path: 'return-tax-report', component:ReturnTaxReportComponent}

  ])],
  exports: [RouterModule]
})
export class IncomeTaxRoutingModule { }
