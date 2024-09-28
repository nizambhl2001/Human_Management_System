import { Helper } from './../../shared/helper';
import { LaddaModule } from 'angular2-ladda';
import { AdditionRoutingModule } from './addition-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { EmployeeAllowanceComponent } from './employee-allowance/employee-allowance.component';
import { DriverAllowanceComponent } from './driver-allowance/driver-allowance.component';
import { DriverBonusComponent } from './driver-bonus/driver-bonus.component';
import { ImportAdditionComponent } from './import-addition/import-addition.component';
import { ProcessImportComponent } from './process-import/process-import.component';
import { NgbDateCustomParserFormatter } from '../../shared/dateformat';
import { NgSelectModule } from '@ng-select/ng-select';

@NgModule({
  declarations: [
    EmployeeAllowanceComponent,
    DriverAllowanceComponent,
    DriverBonusComponent,
    ImportAdditionComponent,
    ProcessImportComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    NgbModule,
    AdditionRoutingModule,
    ReactiveFormsModule,
    NgSelectModule,
    LaddaModule
  ],
  providers:[NgbDateCustomParserFormatter,Helper]
})
export class AdditionModule { }
