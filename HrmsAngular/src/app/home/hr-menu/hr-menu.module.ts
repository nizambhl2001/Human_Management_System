import { ImageControlComponent } from './../../utility/image-control/image-control.component';
import { LaddaModule } from 'angular2-ladda';
import { BasicEntryModule } from './../system-setup/basic-entry/basic-entry.module';
import { GenderComponent } from './../system-setup/basic-entry/gender/gender.component';
import { Helper } from './../../shared/helper';
import { BasicEntryComponent } from './../system-setup/basic-entry/basic-entry.component';
import { HrMenuRoutingModule } from './hr-menu-routing.module';
import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { EmpGenInfoComponent } from './emp-gen-info/emp-gen-info.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
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
import { NgbDateCustomParserFormatter } from '../../shared/dateformat';
import { MultiselectDropdownModule } from 'angular-2-dropdown-multiselect';
import { NgSelectModule } from '@ng-select/ng-select';
import { EmpFamilyInfoComponent } from './emp-gen-info/emp-family-info/emp-family-info.component';
import { EmpContactInfoComponent } from './emp-gen-info/emp-contact-info/emp-contact-info.component';
import { EmpRefInfoComponent } from './emp-gen-info/emp-ref-info/emp-ref-info.component';
import { EmpEducationInfoComponent } from './emp-gen-info/emp-education-info/emp-education-info.component';
import { EmpExperienceInfoComponent } from './emp-gen-info/emp-experience-info/emp-experience-info.component';
import { EmpQualificationInfoComponent } from './emp-gen-info/emp-qualification-info/emp-qualification-info.component';
import { SearchModule } from '../search/search.module';
import { NoticeByEmployeeComponent } from './notice-by-employee/notice-by-employee.component';
import { ReportHelper } from '../../shared/report-helper';
import { HrReportComponent } from './hr-report/hr-report.component';
import { UtilityModule } from '../../utility/utility.module';
import { DepartmentSelectListComponent } from '../../utility/department-select-list/department-select-list.component';
import { DepartmentComponent } from '../system-setup/basic-entry/department/department.component';
import { BankComponent } from '../system-setup/basic-entry/bank/bank.component';
import { BloodGroupComponent } from '../system-setup/basic-entry/blood-group/blood-group.component';
import { TrainingInfoComponent } from './emp-gen-info/emp-training-info/emp-training-info.component';
import { EmployeeSelectListComponent } from '../../utility/employee-select-list/employee-select-list.component';
import { DateControlComponent } from '../../utility/date-control/date-control.component';
import { EmpScholarshipComponent } from './emp-gen-info/emp-scholarship/emp-scholarship.component';
import { EmpPublicationComponent } from './emp-gen-info/emp-publication/emp-publication.component';
import { BasicEntrySelectListComponent } from '../system-setup/basic-entry/basic-entry-select-list/basicentry-select-list';
import { SearchEmployeeComponent } from '../search/search-employee/search-employee.component';
import { EmpAwardInfoComponent } from './emp-gen-info/emp-award-info/emp-award-info.component';
import { JoiningInfoComponent } from './joining-info/joining-info.component';
import { ExitInterviewComponent } from './exit-interview/exit-interview.component';
import { FileConvertComponent } from '../../utility/file-convert/file-convert.component';
import { ExitInterviewReportComponent } from './exit-interview-report/exit-interview-report.component';
import { SetupModule } from '../system-setup/setup.module';
import { JobDescriptionComponent } from './job-description/job-description.component';
@NgModule({
  imports: [
    CommonModule,
    HrMenuRoutingModule,
    NgbModule,
    FormsModule,
    ReactiveFormsModule,
    NgxDatatableModule,
    NgSelectModule,
    MultiselectDropdownModule,
    SearchModule,
    BasicEntryModule,
    LaddaModule,
    UtilityModule,
    SetupModule
  ],
  declarations: [
    EmpGenInfoComponent,
    EmployentInfoComponent,
    AdditionalDutiesComponent,
    EmpCompanyTransferComponent,
    EmpProInfoComponent,
    HolidayInfoComponent,
    CasualJoinDateComponent,
    EmpBlockInfoComponent,
    EmpForAttendanceComponent,
    ResignationLetterComponent,
    ResignationLetterApproveComponent,
    EmpForResignationComponent,
    NoticeByCompanyComponent,
    EmpSeparationInfoComponent,
    EmpObjectiveInfoComponent,
    ProductionPositionInfoComponent,
    DownloadCertificateComponent,
    UploadFileComponent,
    DownloadImgSignatureComponent,
    BasicHrReportComponent,
    PersonalFileComponent,
    EmpCertificateUploadComponent,
    EmpFamilyInfoComponent,
    EmpContactInfoComponent,
    EmpRefInfoComponent,
    EmpEducationInfoComponent,
    EmpExperienceInfoComponent,
    EmpQualificationInfoComponent,
    NoticeByEmployeeComponent,
    HrReportComponent,
    TrainingInfoComponent,
    EmpScholarshipComponent,
    EmpPublicationComponent,
    EmpAwardInfoComponent,
    ExitInterviewComponent,
    JoiningInfoComponent,
    ExitInterviewComponent,
    ExitInterviewReportComponent,
    JobDescriptionComponent
  ],
  providers:[NgbDateCustomParserFormatter, BasicEntryComponent, Helper,  DatePipe, ReportHelper],
  entryComponents:[
    GenderComponent,
    ImageControlComponent,
    EmployeeSelectListComponent,
    DateControlComponent,
    DepartmentComponent,
    BasicEntrySelectListComponent,
    BankComponent,
    BloodGroupComponent,
    FileConvertComponent

  ]
})
export class HrMenuModule { }
