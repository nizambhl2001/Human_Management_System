import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
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
import { PageGuard } from '../../guards/page.guard';
import { LeaveApplyUserComponent } from './leave-apply-user/leave-apply-user.component';
import { LeaveDataViewComponent } from './leave-data-view/leave-data-view.component';
import { LeaveRecommendComponent } from './leave-recommend/leave-recommend.component';


// canActivate: [PageGuard], data:{pageId:57},
@NgModule({
  imports: [RouterModule.forChild([
    { path: 'leave-setup', canActivate: [PageGuard], data:{pageId:56}, component: LeaveSetupComponent },
    { path: 'leave-entry', component: LeaveEntryComponent },
    { path: 'manual-leave-entry',canActivate: [PageGuard], data:{pageId:58}, component: ManualLeaveEntryComponent },
    { path: 'update-leave-entry',canActivate: [PageGuard], data:{pageId:59}, component: UpdateLeaveEntryComponent },
    { path: 'leave-approval',canActivate: [PageGuard], data:{pageId:60}, component: LeaveApprovalComponent },
    { path: 'leave-approval-by-hr',canActivate: [PageGuard], data:{pageId:61}, component: LeaveApprovalByHrComponent },
    { path: 'emp-leave-opening-balance',canActivate: [PageGuard], data:{pageId:62}, component: EmpLeaveOpeningBalanceComponent },
    { path: 'leave-carry-forward',canActivate: [PageGuard], data:{pageId:63}, component: LeaveCarryForwardComponent },
    { path: 'leave-encashment',canActivate: [PageGuard], data:{pageId:64}, component: LeaveEncashmentComponent },
    // { path: 'recreation-leave-encashment',canActivate: [PageGuard], data:{pageId:0}, component: RecreationLeaveEncashmentComponent },
    { path: 'substitute-leave',canActivate: [PageGuard], data:{pageId:65}, component: SubstituteLeaveComponent },
    { path: 'leave-report',canActivate: [PageGuard], data:{pageId:66}, component: LeaveReportComponent },
    // { path: 'leave-info-details',canActivate: [PageGuard], data:{pageId:30}, component: LeaveInfoDetailsComponent },
    { path: 'leave-apply-user',canActivate: [PageGuard], data:{pageId:242}, component: LeaveApplyUserComponent },
    { path: 'leave-data-view',canActivate: [PageGuard], data:{pageId:243}, component: LeaveDataViewComponent },
    { path: 'leave-recommend',canActivate: [PageGuard], data:{pageId:245}, component: LeaveRecommendComponent },

  ])],
  exports: [RouterModule]
})
export class LeaveRoutingModule { }
