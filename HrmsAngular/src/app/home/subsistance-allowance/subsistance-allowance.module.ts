import { BasicEntryModule } from './../system-setup/basic-entry/basic-entry.module';
import { SignatorySelectListComponent } from './../../utility/signatory-select-list/signatory-select-list.component';
import { ReportHelper } from './../../shared/report-helper';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { SubsistanceAllowanceRoutingModule } from './subsistance-allowance-routing.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AmountSetupComponent } from './amount-setup/amount-setup.component';
import { AllowanceAutoComponent } from './allowance-auto/allowance-auto.component';
import { AllowanceManualComponent } from './allowance-manual/allowance-manual.component';
import { AllowanceReportComponent } from './allowance-report/allowance-report.component';
import { NgSelectModule } from '@ng-select/ng-select';
import { BasicEntryComponent } from '../system-setup/basic-entry/basic-entry.component';
import { NgbDateCustomParserFormatter } from '../../shared/dateformat';
import { Helper } from '../../shared/helper';
import { UtilityModule } from '../../utility/utility.module';
import { EmployeeSelectListComponent } from '../../utility/employee-select-list/employee-select-list.component';
import { DepartmentSelectListComponent } from '../../utility/department-select-list/department-select-list.component';
import { BranchSelectListComponent } from '../../utility/branch-select-list/branch-select-list.component';
import { ProjectSelectListComponent } from '../../utility/project-select-list/project-select-list.component';
import { PeriodSelectListComponent } from '../../utility/period-select-list/period-select-list.component';
import { BankSelectListComponent } from '../../utility/bank-select-list/bank-select-list.component';
import { LaddaModule } from 'angular2-ladda';
import { EmployeeTypeListComponent } from '../../utility/employee-type-list/employee-type-list.component';

@NgModule({
  declarations: [

  AmountSetupComponent,

  AllowanceAutoComponent,

  AllowanceManualComponent,

  AllowanceReportComponent
],
  imports: [
    CommonModule,
    NgbModule,
    FormsModule,
    SubsistanceAllowanceRoutingModule,
    ReactiveFormsModule,
    NgSelectModule,
    UtilityModule,
    LaddaModule,
    BasicEntryModule
  ],
  providers:[NgbDateCustomParserFormatter,BasicEntryComponent, Helper,  DatePipe, ReportHelper],
  entryComponents:[
    EmployeeSelectListComponent,
    DepartmentSelectListComponent,
    BranchSelectListComponent,
    ProjectSelectListComponent,
    PeriodSelectListComponent,
    BankSelectListComponent,
    SignatorySelectListComponent,
    EmployeeTypeListComponent
  ]
})
export class SubsistanceAllowanceModule { }
