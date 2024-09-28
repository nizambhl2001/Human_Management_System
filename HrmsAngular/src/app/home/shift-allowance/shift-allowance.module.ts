import { DateControlComponent } from './../../utility/date-control/date-control.component';
import { UtilityModule } from './../../utility/utility.module';


import { LaddaModule } from 'angular2-ladda';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShiftAllowanceRoutingModule } from './shift-allowance-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { SetupComponent } from './setup/setup.component';
import { AssignComponent } from './assign/assign.component';
import { AutoPaymentComponent } from './auto-payment/auto-payment.component';
import { ManualPaymentComponent } from './manual-payment/manual-payment.component';
import { ShiftAllowanceReportComponent } from './shift-allowance-report/shift-allowance-report.component';
import { NgSelectModule } from '@ng-select/ng-select';
import { NgbDateCustomParserFormatter } from '../../shared/dateformat';
import { EditAllowanceComponent } from './edit-allowance/edit-allowance.component';
import { SearchModule } from '../search/search.module';
import { SearchEmployeeComponent } from '../search/search-employee/search-employee.component';
import { ReportHelper } from '../../shared/report-helper';
import { EmployeeSelectListComponent } from '../../utility/employee-select-list/employee-select-list.component';


@NgModule({
  declarations: [
    SetupComponent,
    AssignComponent,
    AutoPaymentComponent,
    ManualPaymentComponent,
    ShiftAllowanceReportComponent,
    EditAllowanceComponent
  ],
  imports: [
    CommonModule,
    ShiftAllowanceRoutingModule,
    FormsModule,
    NgbModule,
    ReactiveFormsModule,
    NgSelectModule,
    LaddaModule,
    SearchModule,
    UtilityModule
  ], providers:[NgbDateCustomParserFormatter, SearchEmployeeComponent, ReportHelper,DateControlComponent],
  entryComponents:[DateControlComponent,EmployeeSelectListComponent]
  
})
export class ShiftAllowanceModule { }
