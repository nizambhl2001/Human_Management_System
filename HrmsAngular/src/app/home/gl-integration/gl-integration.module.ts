import { UtilityModule } from './../../utility/utility.module';
import { DateControlComponent } from './../../utility/date-control/date-control.component';
import { NgbDateCustomParserFormatter } from './../../shared/dateformat';
import { NgSelectModule } from '@ng-select/ng-select';
import { BasicEntryModule } from './../system-setup/basic-entry/basic-entry.module';
import { BasicEntryComponent } from './../system-setup/basic-entry/basic-entry.component';
import { BasicEntrySelectListComponent } from './../system-setup/basic-entry/basic-entry-select-list/basicentry-select-list';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CostHeadComponent } from './cost-head/cost-head.component';
import { GlIntegrationRoutingModule } from './gl-integration-routing.module';
import { GlCodeComponent } from './gl-code/gl-code.component';
import { SalaryHeadAssignComponent } from './salary-head-assign/salary-head-assign.component';
import { GlReportComponent } from './gl-report/gl-report.component';
import { LaddaModule } from 'angular2-ladda';
import { ReportHelper } from '../../shared/report-helper';



@NgModule({
  declarations: [
  CostHeadComponent,
  GlCodeComponent,
  SalaryHeadAssignComponent,
  GlReportComponent
],
  imports: [
    CommonModule,
    NgbModule,
    FormsModule,
    NgSelectModule,
    GlIntegrationRoutingModule,  
    ReactiveFormsModule,BasicEntryModule,
    UtilityModule,
    LaddaModule

  ],
  providers:[NgbDateCustomParserFormatter,ReportHelper],
  entryComponents:[
    BasicEntrySelectListComponent,
    DateControlComponent
  ]
})
export class GlIntegrationModule { }
