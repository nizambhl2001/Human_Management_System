import { DisciplinaryReportComponent } from './disciplinary-report/disciplinary-report.component';
import { PunishmentComponent } from './punishment/punishment.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ShowCauseComponent } from './show-cause/show-cause.component';
import { NoticeEnquiryComponent } from './notice-enquiry/notice-enquiry.component';
import { ShowCauseResultComponent } from './show-cause-result/show-cause-result.component';
import { PageGuard } from '../../guards/page.guard';

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forChild([
      {path: 'show-cause',canActivate: [PageGuard], data:{pageId:93}, component: ShowCauseComponent},
      {path: 'show-cause-result',canActivate: [PageGuard], data:{pageId:94}, component: ShowCauseResultComponent},
      {path: 'notice-enquiry',canActivate: [PageGuard], data:{pageId:95}, component: NoticeEnquiryComponent},
      {path: 'punishment',canActivate: [PageGuard], data:{pageId:96}, component: PunishmentComponent},
      {path: 'disciplinary-report',canActivate: [PageGuard], data:{pageId:97}, component: DisciplinaryReportComponent}
    ]),
    CommonModule
  ]
})
export class DisciplinaryRoutingModule { }
