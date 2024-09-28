import { FormsModule, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApprisalRoutingModule } from './apprisal-routing.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { EmpApprisalComponent } from './emp-apprisal/emp-apprisal.component';

import { KpiSetupComponent } from './kpi-setup/kpi-setup.component';
import { EmployeewisekpiComponent } from './employeewisekpi/employeewisekpi.component';
import { AgreebybossComponent } from './agreebyboss/agreebyboss.component';
import { ApprisalbybossComponent } from './apprisalbyboss/apprisalbyboss.component';
import { YtdByemployeeComponent } from './ytd-byemployee/ytd-byemployee.component';
import { YtdByBossComponent } from './ytd-by-boss/ytd-by-boss.component';
import { NgSelectModule } from '@ng-select/ng-select';
import { UtilityModule } from '../../utility/utility.module';
import { ReportComponent } from './report/report.component';
import { LaddaModule } from 'angular2-ladda';
import { ReportHelper } from '../../shared/report-helper';
import { PointComponent } from './point/point.component';
import { CompetenciesTypeComponent } from './competencies-type/competencies-type.component';
import { CompetenciesComponent } from './competencies/competencies.component';
import { RecommendationComponent } from './recommendation/recommendation.component';
import{ TagInputModule} from 'ngx-chips'
import { SetupModule } from '../system-setup/setup.module';
import { KpiEntrySetup } from '../system-setup/kpi-setup/kpi-setup';
import { ResetStatusComponent } from './reset-status/reset-status.component';

@NgModule({
  declarations: [
  KpiSetupComponent,
  EmployeewisekpiComponent,
  AgreebybossComponent,
  EmpApprisalComponent,
  ApprisalbybossComponent,
  YtdByemployeeComponent,
  YtdByBossComponent,
  ReportComponent,
  PointComponent,
  CompetenciesComponent,
  CompetenciesTypeComponent,
  RecommendationComponent,
  ResetStatusComponent
  
],
  imports: [
    CommonModule,
    ApprisalRoutingModule,
    NgbModule,
    FormsModule,
    ReactiveFormsModule,
    NgSelectModule,
    UtilityModule,
    LaddaModule,
    TagInputModule,
    SetupModule
  ],
  providers:[
    ReportHelper
  ],
  entryComponents:[
   
    
    //BasicEntry
  ]
})
export class ApprisalModule { }
