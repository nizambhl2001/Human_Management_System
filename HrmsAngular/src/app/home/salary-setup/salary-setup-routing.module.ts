import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { OtherAllowanceComponent } from './other-allowance/other-allowance.component';
import { SalaryYearSetupComponent } from './salary-year-setup/salary-year-setup.component';
import { SalaryPeriodComponent } from './salary-period/salary-period.component';
import { SalaryHeadComponent } from './salary-head/salary-head.component';
import { SalaryGradeComponent } from './salary-grade/salary-grade.component';
import { PayscaleGradeComponent } from './payscale-grade/payscale-grade.component';
import { PayscalSetupComponent } from './payscal-setup/payscal-setup.component';
import { PageGuard } from '../../guards/page.guard';




@NgModule({
  imports: [RouterModule.forChild([
    { path: 'other-allowance',canActivate: [PageGuard], data:{pageId:102}, component: OtherAllowanceComponent },
    { path: 'salary-year-setup',canActivate: [PageGuard], data:{pageId:103}, component: SalaryYearSetupComponent },
    { path: 'salary-period',canActivate: [PageGuard], data:{pageId:104}, component:  SalaryPeriodComponent},
    { path: 'salary-head',canActivate: [PageGuard], data:{pageId:105}, component:  SalaryHeadComponent},
    { path: 'salary-grade',canActivate: [PageGuard], data:{pageId:106}, component:  SalaryGradeComponent},
    { path: 'payscale-grade',canActivate: [PageGuard], data:{pageId:107}, component:  PayscaleGradeComponent},
    { path: 'payscal-setup',canActivate: [PageGuard], data:{pageId:108}, component:  PayscalSetupComponent},
  ])],
  exports: [RouterModule]
})
export class SalarySetupRoutingModule { }
