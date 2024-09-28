import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AllowanceReportComponent } from './allowance-report/allowance-report.component';
import { AllowanceManualComponent } from './allowance-manual/allowance-manual.component';
import { AllowanceAutoComponent } from './allowance-auto/allowance-auto.component';
import { AmountSetupComponent } from './amount-setup/amount-setup.component';
import { PageGuard } from '../../guards/page.guard';




@NgModule({
  imports: [RouterModule.forChild([
   {path: 'amount-setup', canActivate: [PageGuard], data:{pageId:151},component: AmountSetupComponent},
   {path: 'allowance-auto', canActivate: [PageGuard], data:{pageId:152},component:AllowanceAutoComponent},
   { path: 'allowance-manual',  canActivate: [PageGuard], data:{pageId:153},component:AllowanceManualComponent },
   { path: 'allowance-report',  canActivate: [PageGuard], data:{pageId:154},component:AllowanceReportComponent }

  
  ])],
  exports: [RouterModule]
})
export class SubsistanceAllowanceRoutingModule { }
