import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AllowanceSetupComponent } from './allowance-setup/allowance-setup.component';
import { BonusSetupComponent } from './bonus-setup/bonus-setup.component';
import { EmpFestivalBonusComponent } from './emp-festival-bonus/emp-festival-bonus.component';
import { EmpPerformanceBonusComponent } from './emp-performance-bonus/emp-performance-bonus.component';
import { UpdateBonusComponent } from './update-bonus/update-bonus.component';
import { ProcessImportBonusComponent } from './process-import-bonus/process-import-bonus.component';
import { UploadEmpPaymentComponent } from './upload-emp-payment/upload-emp-payment.component';
import { PageGuard } from '../../guards/page.guard';




@NgModule({
  imports: [RouterModule.forChild([
   {path: 'allowance-setup', canActivate: [PageGuard], data:{pageId:137}, component:AllowanceSetupComponent},
   {path:'bonus-setup', canActivate: [PageGuard], data:{pageId:138}, component:BonusSetupComponent},
   {path:'emp-festival-bonus', canActivate: [PageGuard], data:{pageId:139}, component: EmpFestivalBonusComponent},
   {path:'emp-performance-bonus', canActivate: [PageGuard], data:{pageId:140}, component:EmpPerformanceBonusComponent},
   {path:'update-bonus', canActivate: [PageGuard], data:{pageId:141}, component: UpdateBonusComponent},
   {path:'upload-emp-payment', canActivate: [PageGuard], data:{pageId:142}, component:UploadEmpPaymentComponent},
   {path:'process-import-bonus', canActivate: [PageGuard], data:{pageId:143}, component:ProcessImportBonusComponent}
  
  ])],
  exports: [RouterModule]
})
export class BonusRoutingModule { }
