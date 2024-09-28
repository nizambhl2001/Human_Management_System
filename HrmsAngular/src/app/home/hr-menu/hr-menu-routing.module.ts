import { JobDescriptionComponent } from './job-description/job-description.component';

import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { EmpGenInfoComponent } from './emp-gen-info/emp-gen-info.component';
import { EmployentInfoComponent } from './employent-info/employent-info.component';
import { AdditionalDutiesComponent } from './additional-duties/additional-duties.component';
import { EmpCompanyTransferComponent } from './emp-company-transfer/emp-company-transfer.component';
import { EmpProInfoComponent } from './emp-pro-info/emp-pro-info.component';
import { HolidayInfoComponent } from './holiday-info/holiday-info.component';
import { CasualJoinDateComponent } from './casual-join-date/casual-join-date.component';
import { EmpBlockInfoComponent } from './emp-block-info/emp-block-info.component';
import { EmpForAttendanceComponent } from './emp-for-attendance/emp-for-attendance.component';
import { ResignationLetterComponent } from './resignation-letter/resignation-letter.component';
import { ResignationLetterApproveComponent } from './resignation-letter-approve/resignation-letter-approve.component';
import { EmpForResignationComponent } from './emp-for-resignation/emp-for-resignation.component';
import { NoticeByCompanyComponent } from './notice-by-company/notice-by-company.component';
import { EmpSeparationInfoComponent } from './emp-separation-info/emp-separation-info.component';
import { EmpObjectiveInfoComponent } from './emp-objective-info/emp-objective-info.component';
import { ProductionPositionInfoComponent } from './production-position-info/production-position-info.component';
import { DownloadCertificateComponent } from './download-certificate/download-certificate.component';
import { UploadFileComponent } from './upload-file/upload-file.component';
import { DownloadImgSignatureComponent } from './download-img-signature/download-img-signature.component';
import { BasicHrReportComponent } from './basic-hr-report/basic-hr-report.component';
import { PersonalFileComponent } from './personal-file/personal-file.component';
import { EmpCertificateUploadComponent } from './emp-certificate-upload/emp-certificate-upload.component';
import { NoticeByEmployeeComponent } from './notice-by-employee/notice-by-employee.component';
import { HrReportComponent } from './hr-report/hr-report.component';
import { JoiningInfoComponent } from './joining-info/joining-info.component';
import { ExitInterviewReportComponent } from './exit-interview-report/exit-interview-report.component';
import { PageGuard } from '../../guards/page.guard';
import { ExitInterviewComponent } from './exit-interview/exit-interview.component';

@NgModule({
  imports: [RouterModule.forChild([
    { path: 'emp-gen-info', canActivate: [PageGuard], data: { pageId: 11 }, component: EmpGenInfoComponent },
    { path: 'employent-info', canActivate: [PageGuard], data: { pageId: 12 }, component: EmployentInfoComponent },
    { path: 'additional-duties', canActivate: [PageGuard], data: { pageId: 13 }, component: AdditionalDutiesComponent },
    { path: 'emp-company-transfer', canActivate: [PageGuard], data: { pageId: 14 }, component: EmpCompanyTransferComponent },
    { path: 'emp-pro-info', canActivate: [PageGuard], data: { pageId: 15 }, component: EmpProInfoComponent },
    { path: 'holiday-info', canActivate: [PageGuard], data: { pageId: 16 }, component: HolidayInfoComponent },
    { path: 'casual-join-date', canActivate: [PageGuard], data: { pageId: 17 }, component: CasualJoinDateComponent },
    { path: 'emp-block-info', canActivate: [PageGuard], data: { pageId: 18 }, component: EmpBlockInfoComponent },
    // {path:'emp-for-attendance',canActivate: [PageGuard], data:{pageId:19},component:EmpForAttendanceComponent},
    { path: 'resignation-letter', canActivate: [PageGuard], data: { pageId: 19 }, component: ResignationLetterComponent },
    { path: 'resignation-letter-approve', canActivate: [PageGuard], data: { pageId: 20 }, component: ResignationLetterApproveComponent },
    { path: 'emp-for-resignation', canActivate: [PageGuard], data: { pageId: 21 }, component: EmpForResignationComponent },
    { path: 'notice-by-employee', canActivate: [PageGuard], data: { pageId: 22 }, component: NoticeByEmployeeComponent },
    { path: 'notice-by-company', canActivate: [PageGuard], data: { pageId: 23 }, component: NoticeByCompanyComponent },
    { path: 'emp-separation-info', canActivate: [PageGuard], data: { pageId: 24 }, component: EmpSeparationInfoComponent },
    { path: 'emp-objective-info', canActivate: [PageGuard], data: { pageId: 25 }, component: EmpObjectiveInfoComponent },
    { path: 'production-position-info', canActivate: [PageGuard], data: { pageId: 26 }, component: ProductionPositionInfoComponent },
    { path: 'emp-certificate-upload', canActivate: [PageGuard], data: { pageId: 27 }, component: EmpCertificateUploadComponent },
    { path: 'download-certificate', canActivate: [PageGuard], data: { pageId: 28 }, component: DownloadCertificateComponent },
    { path: 'upload-file', canActivate: [PageGuard], data: { pageId: 29 }, component: UploadFileComponent },
    { path: 'download-img-signature', component: DownloadImgSignatureComponent },
    { path: 'basic-hr-report', canActivate: [PageGuard], data: { pageId: 30 }, component: BasicHrReportComponent },
    { path: 'hr-report', canActivate: [PageGuard], data: { pageId: 31 }, component: HrReportComponent },
    { path: 'exit-interview', canActivate: [PageGuard], data: { pageId: 32 }, component: ExitInterviewComponent },
    { path: 'joining-info', canActivate: [PageGuard], data: { pageId: 33 }, component: JoiningInfoComponent },
    { path: 'exit-interview-report', canActivate: [PageGuard], data: { pageId: 34 }, component: ExitInterviewReportComponent },
    { path: 'personal-file', canActivate: [PageGuard], data: { pageId: 230 }, component: PersonalFileComponent },
    {path:'job-description',component:JobDescriptionComponent}

  ])
  ],
  exports: [RouterModule]
})
export class HrMenuRoutingModule { }
