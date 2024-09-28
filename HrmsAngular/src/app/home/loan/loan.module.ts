import { LoanRoutingModule } from './loan-routing.module';
import { NgModule } from '@angular/core';
import { CommonModule, DecimalPipe } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { LoanInfoComponent } from './loan-info/loan-info.component';
import { CashReceiveComponent } from './cash-receive/cash-receive.component';
import { StopDeductionComponent } from './stop-deduction/stop-deduction.component';
import { LoanReportComponent } from './loan-report/loan-report.component';
import { NgSelectModule } from '@ng-select/ng-select';
import { NgbDateCustomParserFormatter } from '../../shared/dateformat';
import { UtilityModule } from '../../utility/utility.module';
import { LoanTypeSelectListComponent } from '../../utility/loan-type-select-list/loan-type-select-list.component';
import { ReportHelper } from '../../shared/report-helper';
import { DepartmentSelectListComponent } from '../../utility/department-select-list/department-select-list.component';
import { ProjectSelectListComponent } from '../../utility/project-select-list/project-select-list.component';
import { BranchSelectListComponent } from '../../utility/branch-select-list/branch-select-list.component';
import { EmployeeSelectListComponent } from '../../utility/employee-select-list/employee-select-list.component';
import { DateControlComponent } from '../../utility/date-control/date-control.component';
import { LaddaModule } from 'angular2-ladda';


@NgModule({
  declarations: [
    LoanInfoComponent,
    CashReceiveComponent,
    StopDeductionComponent,
    LoanReportComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    NgbModule,
    LoanRoutingModule,
    ReactiveFormsModule,
    NgSelectModule,
    LaddaModule,
    UtilityModule
  ],
  providers:[
    NgbDateCustomParserFormatter,
    LoanTypeSelectListComponent,
    DepartmentSelectListComponent,
    ProjectSelectListComponent,
    BranchSelectListComponent,
    EmployeeSelectListComponent,
    DateControlComponent,
    ReportHelper,
    DecimalPipe
  ],
  entryComponents:[ DateControlComponent]

})
export class LoanModule { }
