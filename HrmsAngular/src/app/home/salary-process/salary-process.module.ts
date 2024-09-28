import { ReportHelper } from './../../shared/report-helper';
import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SalaryProcessRoutingModule } from './salary-process-routing.module';
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
import { NgSelectModule } from '@ng-select/ng-select';
import { SalaryProcessService } from '../../services/salary-process/salary-process-service.service';
import { EmployeeSelectListComponent } from '../../utility/employee-select-list/employee-select-list.component';

import { NgbDateCustomParserFormatter } from '../../shared/dateformat';
import { SearchModule } from '../search/search.module';
import { SearchEmployeeComponent } from '../search/search-employee/search-employee.component';
import { PeriodSelectListComponent } from '../../utility/period-select-list/period-select-list.component';
import { BonusSelectListComponent } from '../../utility/bonus-select-list/bonus-select-list.component';
import { DesignationSelectListComponent } from '../../utility/designation-select-list/designation-select-list.component';
import { DepartmentSelectListComponent } from '../../utility/department-select-list/department-select-list.component';
import { SalaryHeadSelectListComponent } from '../../utility/salary-head-select-list/salary-head-select-list.component';
import { UtilityModule } from '../../utility/utility.module';
import { SalaryPublishComponent } from './salary-publish/salary-publish.component';
import { BasicEntrySelectListComponent } from '../system-setup/basic-entry/basic-entry-select-list/basicentry-select-list';
import { BasicEntryModule } from '../system-setup/basic-entry/basic-entry.module';
import { LaddaModule } from 'angular2-ladda';

@NgModule({
  declarations: [
  EnrolmentInformationComponent,
  AllowanceAddDeductComponent,
  ManualConfirmOrIncComponent,
  SalaryIncComponent,
  SalaryViewComponent,
  SalaryStructureComponent,
  EmpSalaryStructureComponent,
  EditEmpSalaryStructureComponent,
  SalaryProcessComponent,
  UndoSalaryProcessComponent,
  BlockSalaryProcessComponent,
  UpdateSalaryComponent,
  PaySlipEmailComponent,
  NewJoinComponent,
  ChangeReportComponent,
  ExtraSalaryComponent,
  SalaryPublishComponent

],
  imports: [
    CommonModule,
    NgbModule,
    FormsModule,
    LaddaModule,
    SearchModule,
    SalaryProcessRoutingModule,ReactiveFormsModule,
    NgSelectModule,UtilityModule,BasicEntryModule
  ],
  providers:[NgbDateCustomParserFormatter,DatePipe,SearchEmployeeComponent,ReportHelper],

  entryComponents:[
    EmployeeSelectListComponent,
    PeriodSelectListComponent,
    BonusSelectListComponent,
    DesignationSelectListComponent,
    DepartmentSelectListComponent,
    SalaryHeadSelectListComponent
  ]

})
export class SalaryProcessModule { }
