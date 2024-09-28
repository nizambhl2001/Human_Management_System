import { DriverBonusComponent } from './driver-bonus/driver-bonus.component';
import { EmployeeAllowanceComponent } from './employee-allowance/employee-allowance.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { DriverAllowanceComponent } from './driver-allowance/driver-allowance.component';
import { ImportAdditionComponent } from './import-addition/import-addition.component';
import { ProcessImportComponent } from './process-import/process-import.component';
import { PageGuard } from '../../guards/page.guard';

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forChild([
        {path: 'employee-allowance',canActivate: [PageGuard], data:{pageId:126}, component: EmployeeAllowanceComponent},
        {path: 'driver-allowance',canActivate: [PageGuard], data:{pageId:127}, component: DriverAllowanceComponent},
        {path: 'driver-bonus',canActivate: [PageGuard], data:{pageId:128}, component: DriverBonusComponent},
        {path: 'import-addition',canActivate: [PageGuard], data:{pageId:129}, component: ImportAdditionComponent},
        {path: 'process-import',canActivate: [PageGuard], data:{pageId:130}, component: ProcessImportComponent},
    ]),
    CommonModule
  ],
  exports: [RouterModule]
})
export class AdditionRoutingModule { }
