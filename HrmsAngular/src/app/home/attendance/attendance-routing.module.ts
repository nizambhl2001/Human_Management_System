import { AttendanceReportViewComponent } from './attendance-report-view/attendance-report-view.component';
import { PageGuard } from './../../guards/page.guard';

import { AssignShiftComponent } from './assign-shift/assign-shift.component';
import { MonthlyAttendanceComponent } from './monthly-attendance/monthly-attendance.component';
import { ManualAttendanceComponent } from './manual-attendance/manual-attendance.component';
import { DutyHoursSetupComponent } from './duty-hours-setup/duty-hours-setup.component';
import { WeekendSetupComponent } from './weekend-setup/weekend-setup.component';
import { ApproveComponent } from './approve/approve.component';
import { ApplicationComponent } from './application/application.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ProcessAttendanceComponent } from './process-attendance/process-attendance.component';
import { SummeryComponent } from './summery/summery.component';
import { ShiftSetupComponent } from './shift-setup/shift-setup.component';
import { MonthlyDataProcessComponent } from './monthly-data-process/monthly-data-process.component';
import { ImportComponent } from './import/import.component';
import { AttendanceReportComponent } from './attendance-report/attendance-report.component';
import { ShiftUpdateComponent } from './shift-update/shift-update.component';
import { RosterShiftComponent } from './roster-shift/roster-shift.component';
import { WeekendSetupUpdateComponent } from './weekend-setup-update/weekend-setup-update.component';
// canActivate: [PageGuard], data:{pageId:50},
// canActivate: [PageGuard], data:{pageId:241},
@NgModule({
  declarations: [],
  imports: [
    RouterModule.forChild([
      {path: 'application',canActivate: [PageGuard], data:{pageId:42}, component: ApplicationComponent},
      {path: 'approve',canActivate: [PageGuard], data:{pageId:43}, component: ApproveComponent},
      {path: 'weekend-setup',canActivate: [PageGuard], data:{pageId:44}, component: WeekendSetupComponent},
      {path: 'weekend-setup-update',canActivate: [PageGuard], data:{pageId:240}, component: WeekendSetupUpdateComponent},
      {path: 'duty-hours-setup',canActivate: [PageGuard], data:{pageId:46}, component: DutyHoursSetupComponent},
      {path: 'manual-attendance',canActivate: [PageGuard], data:{pageId:47}, component: ManualAttendanceComponent},
      {path: 'monthly-attendance',canActivate: [PageGuard], data:{pageId:48}, component: MonthlyAttendanceComponent},
      {path: 'process-attendance',canActivate: [PageGuard], data:{pageId:49}, component: ProcessAttendanceComponent},
      {path: 'report',canActivate: [PageGuard], data:{pageId:50},component: AttendanceReportComponent},
      {path: 'summery',canActivate: [PageGuard], data:{pageId:51}, component: SummeryComponent},
      {path: 'shift-setup',canActivate: [PageGuard], data:{pageId:52}, component: ShiftSetupComponent},
      {path: 'assign-shift',canActivate: [PageGuard], data:{pageId:52}, component: AssignShiftComponent},
      {path: 'shift-update',canActivate: [PageGuard], data:{pageId:53}, component: ShiftUpdateComponent},
      {path: 'monthly-data-process',canActivate: [PageGuard], data:{pageId:54}, component: MonthlyDataProcessComponent},
      {path: 'roster-shift',canActivate: [PageGuard], data:{pageId:54}, component: RosterShiftComponent},
      {path: 'import',canActivate: [PageGuard], data:{pageId:55}, component: ImportComponent},
      {path: 'attendance-report-view', component: AttendanceReportViewComponent},
    ]),
    CommonModule
  ],
  exports: [RouterModule]
})
export class AttendanceRoutingModule { }
