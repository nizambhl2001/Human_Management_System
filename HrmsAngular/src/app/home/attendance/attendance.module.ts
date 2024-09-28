import { LaddaModule } from 'angular2-ladda';
import { ReportHelper } from './../../shared/report-helper';
import { NgSelectModule } from '@ng-select/ng-select';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AttendanceRoutingModule } from './attendance-routing.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApplicationComponent } from './application/application.component';
import { NgbModule, NgbTimepicker } from '@ng-bootstrap/ng-bootstrap';
import { ApproveComponent } from './approve/approve.component';
import { WeekendSetupComponent } from './weekend-setup/weekend-setup.component';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { DutyHoursSetupComponent } from './duty-hours-setup/duty-hours-setup.component';
import { ManualAttendanceComponent } from './manual-attendance/manual-attendance.component';
import { MonthlyAttendanceComponent } from './monthly-attendance/monthly-attendance.component';
import { ProcessAttendanceComponent } from './process-attendance/process-attendance.component';
import { SummeryComponent } from './summery/summery.component';
import { ShiftSetupComponent } from './shift-setup/shift-setup.component';
import { AssignShiftComponent } from './assign-shift/assign-shift.component';
import { MonthlyDataProcessComponent } from './monthly-data-process/monthly-data-process.component';
import { ImportComponent } from './import/import.component';
import { UtilityModule } from '../../utility/utility.module';
import { EmployeeSelectListComponent } from '../../utility/employee-select-list/employee-select-list.component';
import { DateControlComponent } from '../../utility/date-control/date-control.component';
import { TimeControlComponent } from '../../utility/time-control/time-control.component';
import { NgbDateCustomParserFormatter } from '../../shared/dateformat';
import { BasicEntrySelectListComponent } from '../system-setup/basic-entry/basic-entry-select-list/basicentry-select-list';
import { BasicEntryModule } from '../system-setup/basic-entry/basic-entry.module';
import { AttendanceReportComponent } from './attendance-report/attendance-report.component';
import { DepartmentSelectListComponent } from '../../utility/department-select-list/department-select-list.component';
import { ShiftSelectListComponent } from '../../utility/shift-select-list/shift-select-list.component';
import { ShiftUpdateComponent } from './shift-update/shift-update.component';
import { RosterShiftComponent } from './roster-shift/roster-shift.component';
import { WeekendSetupLocationComponent } from './weekend-setup-location/weekend-setup-location.component';
import { WeekendSetupUpdateComponent } from './weekend-setup-update/weekend-setup-update.component';
import { WeekendSelectListComponent } from '../../utility/weekend-select-list/weekend-select-list.component';
import {NgbDropdownModule,NgbDatepickerModule,NgbTimepickerModule} from '@ng-bootstrap/ng-bootstrap';
import { AttendanceReportViewComponent } from './attendance-report-view/attendance-report-view.component';
@NgModule({
  declarations: [
    ApplicationComponent,
    ApproveComponent,
    WeekendSetupComponent,
    DutyHoursSetupComponent,
    ManualAttendanceComponent,
    MonthlyAttendanceComponent,
    ProcessAttendanceComponent,
    SummeryComponent,
    ShiftSetupComponent,
    AssignShiftComponent,
    MonthlyDataProcessComponent,
    ImportComponent,
    AttendanceReportComponent,
    ShiftUpdateComponent,
    RosterShiftComponent,
    WeekendSetupLocationComponent,
    WeekendSetupUpdateComponent,
    AttendanceReportViewComponent
  ],
  imports: [
    CommonModule,
    NgSelectModule,
    FormsModule,
    NgbModule,
    NgxDatatableModule,
    AttendanceRoutingModule,
    ReactiveFormsModule,
    UtilityModule,
    BasicEntryModule,
    NgSelectModule,
    LaddaModule,
    NgbDropdownModule,NgbDatepickerModule,NgbTimepickerModule,

  ],
   providers:[NgbDateCustomParserFormatter,ReportHelper],

  entryComponents:[
    DateControlComponent,
    TimeControlComponent,
    BasicEntrySelectListComponent,
    ShiftSelectListComponent,
    WeekendSelectListComponent,
    DateControlComponent,
  ]
})
export class AttendanceModule { }
