import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CostHeadComponent } from './cost-head/cost-head.component';
import { GlCodeComponent } from './gl-code/gl-code.component';
import { SalaryHeadAssignComponent } from './salary-head-assign/salary-head-assign.component';
import { GlReportComponent } from './gl-report/gl-report.component';
import { PageGuard } from '../../guards/page.guard';

@NgModule({
  imports: [RouterModule.forChild([
    { path: 'cost-head',canActivate: [PageGuard], data:{pageId:210},  component: CostHeadComponent },
    { path: 'gl-code',canActivate: [PageGuard], data:{pageId:211},  component: GlCodeComponent },
    { path: 'salary-head-assign', canActivate: [PageGuard], data:{pageId:212}, component: SalaryHeadAssignComponent },
    { path: 'gl-report', canActivate: [PageGuard], data:{pageId:213}, component: GlReportComponent },


  ])],
  exports: [RouterModule]
})
export class GlIntegrationRoutingModule { }
