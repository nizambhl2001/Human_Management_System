
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DepartmentSelectListComponent } from './department-select-list/department-select-list.component';
import { NgSelectModule } from '@ng-select/ng-select';
import { BranchSelectListComponent } from './branch-select-list/branch-select-list.component';
import { ProjectSelectListComponent } from './project-select-list/project-select-list.component';
import { LocationSelectListComponent } from './location-select-list/location-select-list.component';
import { SearchModule } from '../home/search/search.module';
import { EmployeeSelectListComponent } from './employee-select-list/employee-select-list.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { SearchEmployeeComponent } from '../home/search/search-employee/search-employee.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MisconductSelectListComponent } from './misconduct-select-list/misconduct-select-list.component';
import { PunishmentSelectListComponent } from './punishment-select-list/punishment-select-list.component';
import { ShowCauseDetailsSelectListComponent } from './show-cause-details-select-list/show-cause-details-select-list.component';
import { ShowCauseResultTypeSelectListComponent } from './show-cause-result-type-select-list/show-cause-result-type-select-list.component';
import { PeriodSelectListComponent } from './period-select-list/period-select-list.component';
import { BonusSelectListComponent } from './bonus-select-list/bonus-select-list.component';
import { LoanTypeSelectListComponent } from './loan-type-select-list/loan-type-select-list.component';
import { DateControlComponent } from './date-control/date-control.component';
import { NgbDateCustomParserFormatter } from '../shared/dateformat';
import { BankSelectListComponent } from './bank-select-list/bank-select-list.component';
import { SignatorySelectListComponent } from './signatory-select-list/signatory-select-list.component';
import { TaxYearSelectListComponent } from './tax-year-select-list/tax-year-select-list.component';
import { ImageControlComponent } from './image-control/image-control.component';
import { TimeControlComponent } from './time-control/time-control.component';
import { EmployeeTypeListComponent } from './employee-type-list/employee-type-list.component';
import { SalaryHeadSelectListComponent } from './salary-head-select-list/salary-head-select-list.component';
import { DesignationSelectListComponent } from './designation-select-list/designation-select-list.component';
import { GenderComponent } from '../home/system-setup/basic-entry/gender/gender.component';
import { DeleteConfirmationComponent } from './delete-confirmation/delete-confirmation.component';
import { YearSelectListComponent } from './year-select-list/year-select-list.component';
import { SalaryYearSelectListComponent } from './salary-year-select-list/salary-year-select-list.component';
import { ShiftSelectListComponent } from './shift-select-list/shift-select-list.component';
import { FileConvertComponent } from './file-convert/file-convert.component';
import { KpiSelectListComponent } from './kpi-select-list/kpi-select-list.component';
import { TagInputModule } from 'ngx-chips';
import { SectionSelectListComponent } from './section-select-list/section-select-list.component';
import { LaddaModule } from 'angular2-ladda';
import { PayscaleSelectListComponent } from './payscale-select-list/payscale-select-list.component';
import { DocumentTypeSelectListComponent } from './document-type-select-list/document-type-select-list.component';
import { ThanaSelectListComponent } from './thana-select-list/thana-select-list.component';
import { WeekendSelectListComponent } from './weekend-select-list/weekend-select-list.component';


@NgModule({
  declarations: [
    DepartmentSelectListComponent,
    BranchSelectListComponent,
    ProjectSelectListComponent,
    LocationSelectListComponent,
    EmployeeSelectListComponent,
    MisconductSelectListComponent,
    PunishmentSelectListComponent,
    ShowCauseDetailsSelectListComponent,
    ShowCauseResultTypeSelectListComponent,
    PeriodSelectListComponent,
    BonusSelectListComponent,
    LoanTypeSelectListComponent,
    DateControlComponent,
    BankSelectListComponent,
    SignatorySelectListComponent,
    TaxYearSelectListComponent,
    ImageControlComponent,
    TimeControlComponent,
    EmployeeTypeListComponent,
    SalaryHeadSelectListComponent,
    DesignationSelectListComponent,
    DeleteConfirmationComponent,
    YearSelectListComponent,
    SalaryYearSelectListComponent,
    ShiftSelectListComponent,
    WeekendSelectListComponent,
    FileConvertComponent,
    KpiSelectListComponent,
    SectionSelectListComponent,
    PayscaleSelectListComponent,
    DocumentTypeSelectListComponent,
    ThanaSelectListComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
    NgSelectModule,
    SearchModule,
    TagInputModule,
    LaddaModule
  ],
  exports: [
    DepartmentSelectListComponent,
    BranchSelectListComponent,
    ProjectSelectListComponent,
    LocationSelectListComponent,
    EmployeeSelectListComponent,
    MisconductSelectListComponent,
    PunishmentSelectListComponent,
    ShowCauseDetailsSelectListComponent,
    ShowCauseResultTypeSelectListComponent,
    PeriodSelectListComponent,
    BonusSelectListComponent,
    LoanTypeSelectListComponent,
    DateControlComponent,
    BankSelectListComponent,
    SignatorySelectListComponent,
    TaxYearSelectListComponent,
    ImageControlComponent,
    TimeControlComponent,
    EmployeeTypeListComponent,
    SalaryHeadSelectListComponent,
    DesignationSelectListComponent,
    DeleteConfirmationComponent,
    SearchEmployeeComponent,
    YearSelectListComponent,
    SalaryYearSelectListComponent,
    ShiftSelectListComponent,
    WeekendSelectListComponent,
    FileConvertComponent,
    KpiSelectListComponent,
    SectionSelectListComponent,
    PayscaleSelectListComponent,
    DocumentTypeSelectListComponent,
    ThanaSelectListComponent
  ],
  entryComponents: [SearchEmployeeComponent],
  providers: [NgbDateCustomParserFormatter]
})
export class UtilityModule { }
