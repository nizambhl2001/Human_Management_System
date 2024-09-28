import { ProductionFloorComponent } from './production-floor/production-floor.component';
import { AssignDeptGlComponent } from './assign-dept-gl/assign-dept-gl.component';

import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { BankBranchComponent } from './bank-branch/bank-branch.component';
import { DivisionComponent } from './division/division.component';
import { GroupComponent } from './group/group.component';
import { HolydayCalenderComponent } from './holyday-calender/holyday-calender.component';
import { ProductionUnitComponent } from './production-unit/production-unit.component';
import { ProductionLineComponent } from './production-line/production-line.component';
import { ProductionMachineComponent } from './production-machine/production-machine.component';
import { PageGuard } from '../../guards/page.guard';



@NgModule({
  imports: [RouterModule.forChild([
    { path: 'bank-branch', canActivate: [PageGuard], data:{pageId:2}, component: BankBranchComponent },
    { path: 'division', canActivate: [PageGuard], data:{pageId:3},component: DivisionComponent },
    { path: 'group',canActivate: [PageGuard], data:{pageId:4}, component: GroupComponent },
    { path: 'holyday-calender',canActivate: [PageGuard], data:{pageId:5}, component: HolydayCalenderComponent },
    { path: 'assign-dept-gl',canActivate: [PageGuard], data:{pageId:6}, component: AssignDeptGlComponent },
    { path: 'production-unit',canActivate: [PageGuard], data:{pageId:7}, component: ProductionUnitComponent },
    { path: 'production-floor',canActivate: [PageGuard], data:{pageId:8}, component: ProductionFloorComponent },
    { path: 'production-line',canActivate: [PageGuard], data:{pageId:9}, component: ProductionLineComponent },
    { path: 'production-machine',canActivate: [PageGuard], data:{pageId:10}, component: ProductionMachineComponent }
  ])],

  exports: [RouterModule]
})
export class SetupRoutingModule { }
