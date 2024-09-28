import { BranchSelectListComponent } from './../../utility/branch-select-list/branch-select-list.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DisciplinaryRoutingModule } from './disciplinary-routing.module';
import { ShowCauseComponent } from './show-cause/show-cause.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import {NoticeEnquiryComponent } from './notice-enquiry/notice-enquiry.component';
import { PunishmentComponent } from './punishment/punishment.component';
import { ShowCauseResultComponent } from './show-cause-result/show-cause-result.component';
import { DisciplinaryReportComponent } from './disciplinary-report/disciplinary-report.component';
import { NgbDateCustomParserFormatter } from '../../shared/dateformat';
import { NgSelectComponent, NgSelectModule } from '@ng-select/ng-select';
import { BasicEntryModule } from '../system-setup/basic-entry/basic-entry.module';
import { MisconductComponent } from '../system-setup/basic-entry/misconduct/misconduct.component';
import { UtilityModule } from '../../utility/utility.module';
import { DepartmentSelectListComponent } from '../../utility/department-select-list/department-select-list.component';
import { ProjectSelectListComponent } from '../../utility/project-select-list/project-select-list.component';
import { EmployeeSelectListComponent } from '../../utility/employee-select-list/employee-select-list.component';
import { MisconductSelectListComponent } from '../../utility/misconduct-select-list/misconduct-select-list.component';
import { PunishmentSelectListComponent } from '../../utility/punishment-select-list/punishment-select-list.component';
import { ShowCauseDetailsSelectListComponent } from '../../utility/show-cause-details-select-list/show-cause-details-select-list.component';
import { ShowCauseResultTypeSelectListComponent } from '../../utility/show-cause-result-type-select-list/show-cause-result-type-select-list.component';
import { ReportHelper } from '../../shared/report-helper';
import { LaddaModule } from 'angular2-ladda';

@NgModule({
  declarations: [
    ShowCauseComponent,
    NoticeEnquiryComponent,
    PunishmentComponent,
    ShowCauseResultComponent,
    DisciplinaryReportComponent
  ],
  imports: [
    CommonModule,
    NgbModule,
    FormsModule,
    DisciplinaryRoutingModule,
    ReactiveFormsModule,
    NgSelectModule,
    BasicEntryModule,
    UtilityModule,
    LaddaModule,
  ],
  providers:[NgbDateCustomParserFormatter, ReportHelper],
  entryComponents:[
    MisconductComponent,
    EmployeeSelectListComponent,
    DepartmentSelectListComponent,
    BranchSelectListComponent,
    ProjectSelectListComponent,
    MisconductSelectListComponent,
    PunishmentSelectListComponent,
    ShowCauseDetailsSelectListComponent,
    ShowCauseResultTypeSelectListComponent
  ]
})
export class DisciplinaryModule { }
