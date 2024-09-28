import { LaddaModule } from 'angular2-ladda';

import { HrMenuModule } from './../hr-menu/hr-menu.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LeaveRoutingModule } from './leave-routing.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LeaveSetupComponent } from './leave-setup/leave-setup.component';
import { LeaveEntryComponent } from './leave-entry/leave-entry.component';
import { ManualLeaveEntryComponent } from './manual-leave-entry/manual-leave-entry.component';
import { UpdateLeaveEntryComponent } from './update-leave-entry/update-leave-entry.component';
import { LeaveApprovalComponent } from './leave-approval/leave-approval.component';
import { LeaveApprovalByHrComponent } from './leave-approval-by-hr/leave-approval-by-hr.component';
import { EmpLeaveOpeningBalanceComponent } from './emp-leave-opening-balance/emp-leave-opening-balance.component';
import { LeaveCarryForwardComponent } from './leave-carry-forward/leave-carry-forward.component';
import { LeaveEncashmentComponent } from './leave-encashment/leave-encashment.component';
import { RecreationLeaveEncashmentComponent } from './recreation-leave-encashment/recreation-leave-encashment.component';
import { SubstituteLeaveComponent } from './substitute-leave/substitute-leave.component';
import { LeaveReportComponent } from './leave-report/leave-report.component';
import { LeaveInfoDetailsComponent } from './leave-info-details/leave-info-details.component';
import { NgSelectModule } from '@ng-select/ng-select';
import { NgbDateCustomParserFormatter } from '../../shared/dateformat';
import { SearchEmployeeComponent } from '../search/search-employee/search-employee.component';
import { SearchModule } from '../search/search.module';
import { ReportHelper } from '../../shared/report-helper';
import { UtilityModule } from '../../utility/utility.module';
import { LeaveApplyUserComponent } from './leave-apply-user/leave-apply-user.component';
import { LeaveDataViewComponent } from './leave-data-view/leave-data-view.component';
import { LeaveRecommendComponent } from './leave-recommend/leave-recommend.component';

@NgModule({
  declarations: [
    LeaveSetupComponent,
    LeaveEntryComponent,
    ManualLeaveEntryComponent,
    UpdateLeaveEntryComponent,
    LeaveApprovalComponent,
    LeaveApprovalByHrComponent,
    EmpLeaveOpeningBalanceComponent,
    LeaveCarryForwardComponent,
    LeaveEncashmentComponent,
    RecreationLeaveEncashmentComponent,
    SubstituteLeaveComponent,
    LeaveReportComponent,
    LeaveInfoDetailsComponent,
    LeaveApplyUserComponent,
    LeaveDataViewComponent,
    LeaveRecommendComponent
  ],
  imports: [
    CommonModule,
    LeaveRoutingModule,
    NgbModule,
    FormsModule,
    ReactiveFormsModule,
    NgSelectModule,
    SearchModule,
    LaddaModule,
    UtilityModule
  ],
  providers:[NgbDateCustomParserFormatter, ReportHelper],
  entryComponents:[SearchEmployeeComponent]
})
export class LeaveModule { }
