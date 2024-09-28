import { LoanDeductComponent } from './loan-deduct/loan-deduct.component';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SalaryDeductComponent } from './salary-deduct/salary-deduct.component';
import { LwpDeductComponent } from './lwp-deduct/lwp-deduct.component';
import { OtherDeductComponent } from './other-deduct/other-deduct.component';
import { ImportDeductionComponent } from './import-deduction/import-deduction.component';
import { PageGuard } from '../../guards/page.guard';
import { ProcessImportComponent } from './process-import/process-import.component';

@NgModule({
  declarations: [
  ],
  imports: [
    RouterModule.forChild([
        {path: 'salary-deduct', canActivate: [PageGuard], data:{pageId:131}, component: SalaryDeductComponent},
        {path: 'loan-deduct',canActivate: [PageGuard], data:{pageId:132}, component: LoanDeductComponent},
        {path: 'lwp-deduct', canActivate: [PageGuard], data:{pageId:133},component: LwpDeductComponent},
        {path: 'other-deduct',canActivate: [PageGuard], data:{pageId:134}, component: OtherDeductComponent},
        {path: 'import-deduction', canActivate: [PageGuard], data:{pageId:135},component: ImportDeductionComponent},
        {path: 'process-import',canActivate: [PageGuard], data:{pageId:136}, component: ProcessImportComponent},

      ]),
    CommonModule
  ],
  exports:[RouterModule]
})
export class DeductionRoutingModule { }
