import { DateControlComponent } from './../../utility/date-control/date-control.component';
import { EmployeeSelectListComponent } from './../../utility/employee-select-list/employee-select-list.component';
import { NgSelectModule } from '@ng-select/ng-select';
import { FormsModule, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OvertimeRoutingModule } from './overtime-routing.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { OvertimeApproveComponent } from './overtime-approve/overtime-approve.component';
import { OverTimeMenualComponent } from './over-time-menual/over-time-menual.component';
import { OverTimeReportComponent } from './over-time-report/over-time-report.component';
import { UtilityModule } from '../../utility/utility.module';
import { TimeControlComponent } from '../../utility/time-control/time-control.component';
import { BasicEntrySelectListComponent } from '../system-setup/basic-entry/basic-entry-select-list/basicentry-select-list';
import { LaddaModule } from 'angular2-ladda';
import { BasicEntryComponent } from '../system-setup/basic-entry/basic-entry.component';
import { BasicEntryModule } from '../system-setup/basic-entry/basic-entry.module';
import { NgbDateCustomParserFormatter } from '../../shared/dateformat';
import { OtRequsationComponent } from './ot-requsation/ot-requsation.component';
import { OtCalculationComponent } from './ot-calculation/ot-calculation.component';
import { OtPaymentComponent } from './ot-payment/ot-payment.component';
import { OtReplacementComponent } from './ot-replacement/ot-replacement.component';
import { Helper } from '../../shared/helper';

@NgModule({
  declarations: [
    OvertimeApproveComponent,
    OverTimeMenualComponent,
    OverTimeReportComponent,
    OtRequsationComponent,
    OtCalculationComponent,
    OtPaymentComponent,
    OtReplacementComponent
  ],
  imports: [
    CommonModule,
    OvertimeRoutingModule,
    NgbModule,
    FormsModule,
    NgSelectModule,
    ReactiveFormsModule,
    UtilityModule,
    LaddaModule,
    BasicEntryModule
  ], providers:[NgbDateCustomParserFormatter, BasicEntryComponent, Helper],
  entryComponents:[
    EmployeeSelectListComponent,
    DateControlComponent,
    TimeControlComponent,
    BasicEntrySelectListComponent]
})
export class OvertimeModule { }
