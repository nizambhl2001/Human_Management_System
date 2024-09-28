import { UtilityModule } from './../../utility/utility.module';
import { BasicEntryModule } from './../system-setup/basic-entry/basic-entry.module';
import { JobTypeComponent } from './../system-setup/basic-entry/job-type/job-type.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { BonusRoutingModule } from './bonus-routing.module';
import { AllowanceSetupComponent } from './allowance-setup/allowance-setup.component';
import { BonusSetupComponent } from './bonus-setup/bonus-setup.component';
import { NgbModal, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { EmpFestivalBonusComponent } from './emp-festival-bonus/emp-festival-bonus.component';
import { EmpPerformanceBonusComponent } from './emp-performance-bonus/emp-performance-bonus.component';
import { UpdateBonusComponent } from './update-bonus/update-bonus.component';
import { UploadEmpPaymentComponent } from './upload-emp-payment/upload-emp-payment.component';
import { ProcessImportBonusComponent } from './process-import-bonus/process-import-bonus.component';
import { NgSelectModule } from '@ng-select/ng-select';
import { NgbDateCustomParserFormatter } from '../../shared/dateformat';
import { BasicEntryComponent } from '../system-setup/basic-entry/basic-entry.component';
import { Helper } from '../../shared/helper';
import { LaddaModule } from 'angular2-ladda';

@NgModule({
  declarations: [

  AllowanceSetupComponent,

  BonusSetupComponent,

  EmpFestivalBonusComponent,

  EmpPerformanceBonusComponent,

  UpdateBonusComponent,

  UploadEmpPaymentComponent,

  ProcessImportBonusComponent
],
  imports: [
    CommonModule,
    NgbModule,
    FormsModule,
    BonusRoutingModule,
    ReactiveFormsModule,
    NgSelectModule,
    UtilityModule,
    BasicEntryModule,
    LaddaModule
  ],
  providers:[NgbDateCustomParserFormatter, BasicEntryComponent, Helper,  DatePipe],
  entryComponents:[JobTypeComponent]
})
export class BonusModule { }
