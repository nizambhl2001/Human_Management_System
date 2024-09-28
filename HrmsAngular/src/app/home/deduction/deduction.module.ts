import { LaddaModule } from 'angular2-ladda';
import { DeductionRoutingModule } from './deduction-routing.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SalaryDeductComponent } from './salary-deduct/salary-deduct.component';
import { LoanDeductComponent } from './loan-deduct/loan-deduct.component';
import { LwpDeductComponent } from './lwp-deduct/lwp-deduct.component';
import { OtherDeductComponent } from './other-deduct/other-deduct.component';
import { ImportDeductionComponent } from './import-deduction/import-deduction.component';
import { NgSelectModule } from '@ng-select/ng-select';
import { NgbDateCustomParserFormatter } from '../../shared/dateformat';
import { UtilityModule } from '../../utility/utility.module';
import { DateControlComponent } from '../../utility/date-control/date-control.component';
import { ProcessImportComponent } from './process-import/process-import.component';

@NgModule({
  declarations: [
    SalaryDeductComponent,
    LoanDeductComponent,
    LwpDeductComponent,
    OtherDeductComponent,
    ImportDeductionComponent,
    ProcessImportComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    NgbModule,
    DeductionRoutingModule,
    ReactiveFormsModule,
    NgSelectModule,
    LaddaModule,
    UtilityModule
  ], providers: [NgbDateCustomParserFormatter, DateControlComponent],
  entryComponents: [DateControlComponent]
})
export class DeductionModule { }
