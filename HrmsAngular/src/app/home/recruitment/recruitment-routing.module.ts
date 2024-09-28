import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { RecruitmentComponent } from './recruitment/recruitment.component';
import { RecruitmentApprovalComponent } from './recruitment-approval/recruitment-approval.component';
import { ApprovalByHrComponent } from './approval-by-hr/approval-by-hr.component';
import { ApprovalByAccountComponent } from './approval-by-account/approval-by-account.component';
import { PageGuard } from '../../guards/page.guard';

@NgModule({
  imports: [RouterModule.forChild([
    { path: 'recruitment',canActivate: [PageGuard], data:{pageId:223},  component: RecruitmentComponent },
    { path: 'recruitment-approval',canActivate: [PageGuard], data:{pageId:224},  component: RecruitmentApprovalComponent },
    { path: 'approval-by-hr',canActivate: [PageGuard], data:{pageId:225},  component: ApprovalByHrComponent },
    { path: 'approval-by-account',canActivate: [PageGuard], data:{pageId:226},  component: ApprovalByAccountComponent },
 
  ])],
  exports: [RouterModule]
})
export class RecruitmentRoutingModule { }
