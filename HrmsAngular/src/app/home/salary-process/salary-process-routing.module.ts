import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { EnrolmentInformationComponent } from './enrolment-information/enrolment-information.component';
import { AllowanceAddDeductComponent } from './allowance-add-deduct/allowance-add-deduct.component';
import { ManualConfirmOrIncComponent } from './manual-confirm-or-inc/manual-confirm-or-inc.component';
import { SalaryIncComponent } from './salary-inc/salary-inc.component';
import { SalaryViewComponent } from './salary-view/salary-view.component';
import { SalaryStructureComponent } from './salary-structure/salary-structure.component';
import { EmpSalaryStructureComponent } from './emp-salary-structure/emp-salary-structure.component';
import { EditEmpSalaryStructureComponent } from './edit-emp-salary-structure/edit-emp-salary-structure.component';
import { SalaryProcessComponent } from './salary-process/salary-process.component';
import { UndoSalaryProcessComponent } from './undo-salary-process/undo-salary-process.component';
import { BlockSalaryProcessComponent } from './block-salary-process/block-salary-process.component';
import { UpdateSalaryComponent } from './update-salary/update-salary.component';
import { PaySlipEmailComponent } from './pay-slip-email/pay-slip-email.component';
import { NewJoinComponent } from './new-join/new-join.component';
import { ChangeReportComponent } from './change-report/change-report.component';
import { ExtraSalaryComponent } from './extra-salary/extra-salary.component';
import { SalaryPublishComponent } from './salary-publish/salary-publish.component';
import { PageGuard } from '../../guards/page.guard';

@NgModule({
  imports: [RouterModule.forChild([
    { path: 'enrolment-information',canActivate: [PageGuard], data:{pageId:109}, component: EnrolmentInformationComponent },
    { path: 'allowance-add-deduct',canActivate: [PageGuard], data:{pageId:110}, component: AllowanceAddDeductComponent },
    { path: 'manual-confirm-or-inc',canActivate: [PageGuard], data:{pageId:111}, component: ManualConfirmOrIncComponent },
    { path: 'salary-Inc',canActivate: [PageGuard], data:{pageId:112}, component: SalaryIncComponent },
    { path: 'salary-view',canActivate: [PageGuard], data:{pageId:113}, component: SalaryViewComponent },
    { path: 'salary-structure',canActivate: [PageGuard], data:{pageId:114}, component: SalaryStructureComponent },
    { path: 'emp-salary-structure',canActivate: [PageGuard], data:{pageId:115}, component: EmpSalaryStructureComponent },
    { path: 'edit-emp-salary-structure',canActivate: [PageGuard], data:{pageId:116}, component: EditEmpSalaryStructureComponent },
    { path: 'salary-process',canActivate: [PageGuard], data:{pageId:117}, component: SalaryProcessComponent },
    { path: 'undo-salary-process',canActivate: [PageGuard], data:{pageId:118}, component: UndoSalaryProcessComponent },
    { path: 'block-salary-process',canActivate: [PageGuard], data:{pageId:119}, component: BlockSalaryProcessComponent },
    { path: 'update-salary',canActivate: [PageGuard], data:{pageId:120}, component: UpdateSalaryComponent },
    { path:'salary-publish', canActivate: [PageGuard], data:{pageId:121},component:SalaryPublishComponent},
    { path: 'pay-slip-email',canActivate: [PageGuard], data:{pageId:122}, component: PaySlipEmailComponent },
    { path: 'new-join',canActivate: [PageGuard], data:{pageId:123}, component: NewJoinComponent },
    { path: 'change-report',canActivate: [PageGuard], data:{pageId:124}, component: ChangeReportComponent },
    { path: 'extra-salary',canActivate: [PageGuard], data:{pageId:125}, component: ExtraSalaryComponent }
  ])],
  exports: [RouterModule]
})
export class SalaryProcessRoutingModule { }
