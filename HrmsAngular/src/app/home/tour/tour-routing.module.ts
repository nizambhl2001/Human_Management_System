import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TourApplyComponent } from './tour-apply/tour-apply.component';
import { TourApproveComponent } from './tour-approve/tour-approve.component';
import { TourApproveHrComponent } from './tour-approve-hr/tour-approve-hr.component';
import { PageGuard } from '../../guards/page.guard';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild([
        {path: 'tour-apply', canActivate: [PageGuard], data:{pageId:227}, component: TourApplyComponent},
        {path: 'tour-approve', canActivate: [PageGuard], data:{pageId:228}, component: TourApproveComponent},
        {path: 'tour-approve-hr',canActivate: [PageGuard], data:{pageId:229},  component: TourApproveHrComponent},
    ])
  ],
  exports: [RouterModule]
})
export class TourRoutingModule { }
