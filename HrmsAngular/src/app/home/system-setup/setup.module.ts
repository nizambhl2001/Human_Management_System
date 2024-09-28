import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BankBranchComponent } from './bank-branch/bank-branch.component';
import { SetupRoutingModule } from './setup-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { ChartsModule as Ng2ChartsModule } from 'ng2-charts/ng2-charts';
import { DivisionComponent } from './division/division.component';
import { GroupComponent } from './group/group.component';
import { HolydayCalenderComponent } from './holyday-calender/holyday-calender.component';
import { AssignDeptGlComponent } from './assign-dept-gl/assign-dept-gl.component';
import { ProductionUnitComponent } from './production-unit/production-unit.component';
import { ProductionFloorComponent } from './production-floor/production-floor.component';
import { ProductionLineComponent } from './production-line/production-line.component';
import { ProductionMachineComponent } from './production-machine/production-machine.component';
import { BasicEntrySelectListComponent } from './basic-entry/basic-entry-select-list/basicentry-select-list';
import { BasicEntryComponent } from './basic-entry/basic-entry.component';
import { UtilityModule } from '../../utility/utility.module';
import { BankSelectListComponent } from '../../utility/bank-select-list/bank-select-list.component';
import { BasicEntryModule } from './basic-entry/basic-entry.module';
import { NgSelectModule } from '@ng-select/ng-select';
import { DateControlComponent } from '../../utility/date-control/date-control.component';
import { LaddaModule } from 'angular2-ladda';
import { KpiBasicEntryComponent } from './kpi-basic-entry/kpi-basic-entry.component';
import {  KpiEntrySetup } from './kpi-setup/kpi-setup';
import { KpiSetupModel } from '../../models/Apprisal/kpisetup';

@NgModule({
  imports: [
    CommonModule,
    CommonModule,
    FormsModule,
    NgbModule,
    Ng2ChartsModule,
    PerfectScrollbarModule,
    SetupRoutingModule,
    BasicEntryModule,
    ReactiveFormsModule,
    UtilityModule,
    LaddaModule,
    NgSelectModule
  ],
  declarations: [
    BankBranchComponent,
    DivisionComponent,
    GroupComponent,
    HolydayCalenderComponent,
    AssignDeptGlComponent,
    ProductionUnitComponent,
    ProductionFloorComponent,
    ProductionLineComponent,
    ProductionMachineComponent,
    KpiBasicEntryComponent,
    KpiEntrySetup
   ],
   exports: []
})
export class SetupModule { }
