import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { PointComponent } from './point/point.component';
import { CompetenciesComponent } from './competencies/competencies.component';
import { CompetenciesTypeComponent } from './competencies-type/competencies-type.component';

import { KpiSetupComponent } from './kpi-setup/kpi-setup.component';
import { EmployeewisekpiComponent } from './employeewisekpi/employeewisekpi.component';
import { AgreebybossComponent } from './agreebyboss/agreebyboss.component';
import { EmpApprisalComponent } from './emp-apprisal/emp-apprisal.component';
import { ApprisalbybossComponent } from './apprisalbyboss/apprisalbyboss.component';
import { YtdByemployeeComponent } from './ytd-byemployee/ytd-byemployee.component';
import { YtdByBossComponent } from './ytd-by-boss/ytd-by-boss.component';
import { ReportComponent } from './report/report.component';
import { RecommendationComponent } from './recommendation/recommendation.component';
import { PageGuard } from '../../guards/page.guard';
import { ResetStatusComponent } from './reset-status/reset-status.component';


// canActivate: [PageGuard], data:{pageId:215},emp wise kpi
// canActivate: [PageGuard], data:{pageId:216},agree by boss
@NgModule({
  imports: [RouterModule.forChild([
  {path: 'kpi-setup',canActivate: [PageGuard], data:{pageId:214}, component:KpiSetupComponent},
  {path: 'employeewisekpi', canActivate: [PageGuard], data:{pageId:215}, component:EmployeewisekpiComponent},
  {path: 'agreebyboss',canActivate: [PageGuard], data:{pageId:216}, component:AgreebybossComponent},
  {path: 'emp-apprisal', canActivate: [PageGuard], data:{pageId:217},  component:EmpApprisalComponent},
  {path: 'apprisalbyboss', canActivate: [PageGuard], data:{pageId:218}, component:ApprisalbybossComponent},
  {path: 'recommendation',canActivate: [PageGuard], data:{pageId:237},component:RecommendationComponent},
  // {path: 'ytd-byemployee',component:YtdByemployeeComponent},
  // {path: 'ytd-by-boss',component:YtdByBossComponent},
  {path: 'report', canActivate: [PageGuard], data:{pageId:219}, component:ReportComponent},
  {path: 'reset',canActivate: [PageGuard], data:{pageId:238}, component:ResetStatusComponent}


  ])],
  exports: [RouterModule]
})
export class ApprisalRoutingModule { }
