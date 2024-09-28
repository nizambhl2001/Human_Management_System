import { DateControlComponent } from './../../utility/date-control/date-control.component';
import { UtilityModule } from './../../utility/utility.module';
import { LaddaModule } from 'angular2-ladda';
import { NgbDateCustomParserFormatter } from './../../shared/dateformat';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OtherAllowanceComponent } from './other-allowance/other-allowance.component';
import { SalarySetupRoutingModule } from './salary-setup-routing.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SalaryYearSetupComponent } from './salary-year-setup/salary-year-setup.component';
import { SalaryPeriodComponent } from './salary-period/salary-period.component';
import { SalaryHeadComponent } from './salary-head/salary-head.component';
import { SalaryGradeComponent } from './salary-grade/salary-grade.component';
import { PayscaleGradeComponent } from './payscale-grade/payscale-grade.component';
import { PayscalSetupComponent } from './payscal-setup/payscal-setup.component';
import { NgSelectModule } from '@ng-select/ng-select';

@NgModule({
  declarations: [
    OtherAllowanceComponent,
    SalaryYearSetupComponent,
    SalaryPeriodComponent,
    SalaryHeadComponent,
    SalaryGradeComponent,
    PayscaleGradeComponent,
    PayscalSetupComponent
  ],
  imports: [
    CommonModule,
    NgbModule,
    FormsModule,
    NgSelectModule,
    SalarySetupRoutingModule,
    ReactiveFormsModule,
    LaddaModule,
    UtilityModule
  ],
  providers:[NgbDateCustomParserFormatter,DateControlComponent],
  entryComponents:[ DateControlComponent]
})
export class SalarySetupModule { }
