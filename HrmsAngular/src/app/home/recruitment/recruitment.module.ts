import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RecruitmentRoutingModule } from './recruitment-routing.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import { RecruitmentComponent } from './recruitment/recruitment.component';
import { RecruitmentApprovalComponent } from './recruitment-approval/recruitment-approval.component';
import { ApprovalByHrComponent } from './approval-by-hr/approval-by-hr.component';
import { ApprovalByAccountComponent } from './approval-by-account/approval-by-account.component';

@NgModule({
  declarations: [
    RecruitmentComponent,
    RecruitmentApprovalComponent,
    ApprovalByHrComponent,
    ApprovalByAccountComponent
  ],
  imports: [
    CommonModule,
    RecruitmentRoutingModule,
    NgbModule,
    FormsModule
  ]
})
export class RecruitmentModule { }
