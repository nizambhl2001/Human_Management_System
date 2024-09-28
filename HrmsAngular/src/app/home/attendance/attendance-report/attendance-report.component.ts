import { AuthService } from './../../../services/auth.service';
import { ToastrService } from 'ngx-toastr';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NgbDateCustomParserFormatter } from '../../../shared/dateformat';
import { ApiResponse } from '../../../models/response.model';
import { BasicEntryService } from '../../../services/system-setup/basic-entry.service';
import { BasicEntry } from '../../../models/system-setup/basic-entry.model';
import { HttpErrorResponse } from '@angular/common/http';
import { ReportHelper } from '../../../shared/report-helper';
import { ReportService } from '../../../services/report.service';
@Component({
  selector: 'app-attendance-report',
  templateUrl: './attendance-report.component.html',
  styleUrls: ['./attendance-report.component.scss',
    '../../../../vendor/libs/ng-select/ng-select.scss',
    // '../../../../vendor/libs/angular2-ladda/ladda.scss',
  ]
})
export class AttendanceReportComponent implements OnInit {
  companyID: number;
  isSubmitted: boolean = false;
  exporting: boolean = false;
  gradeValue: number;
  allProjectName: BasicEntry[] = [];
  attendanceReportForm: FormGroup;
  shiftReportList: any[] = [];
  userId:number;
  empCode:string;
  userTypeId:number;
  constructor(
    private basicES: BasicEntryService,
    private toaster: ToastrService,
    private rptService: ReportService,
    private formBuilder: FormBuilder,
    private reportHelper: ReportHelper,
    private dateFormate: NgbDateCustomParserFormatter
  ) { }

  ngOnInit() {
    this.companyID = AuthService.getLoggedCompanyId();
    this.gradeValue = AuthService.getLoggedGradeValue();
    this.userId = AuthService.getLoggedUserId();
    this.userTypeId = AuthService.getLoggedUserTypeId();
    this.empCode = AuthService.getLoggedEmpCode();

    this.createform();
    this.getShiftReport();
    this.AllProjectName();
  }
  AllProjectName() {
    this.basicES.getProject().subscribe((response: ApiResponse) => {
      if (response.status) {
        this.allProjectName = response.result as BasicEntry[];
      }
    })
  }
  getShiftReport() {
    this.shiftReportList = [
      { ReportId: 44, TypeName: 'Shift Report' },
      { ReportId: 45, TypeName: 'Late Comer' },
      { ReportId: 46, TypeName: 'In Out Report' },
      // { ReportId: 47, TypeName: 'In Out Total Hour Report' },
      // { ReportId: 48, TypeName: 'Night Allowance Report' },
      { ReportId: 49, TypeName: 'Missing Punch Report' },
      { ReportId: 50, TypeName: 'Daily In Out Report' },
      // { ReportId: 51, TypeName: 'Punch Report' },
      // { ReportId: 52, TypeName: 'Report Shift Assainging Painding' },
      { ReportId: 53, TypeName: 'Attendance Summery' },
      { ReportId: 54, TypeName: 'Single Emp In Out Report' },
      // { ReportId: 57, TypeName: 'App Punch Report' },
    ];
  }
  export() {
    this.exporting = true;
    this.isSubmitted = true;
    if (this.attendanceReportForm.invalid) {
      this.exporting = false;
      return;
    }

    this.attendanceReportForm.patchValue({
      strDate: this.formVal.StartDate,
      endDate: this.formVal.EndDate
      // EmpCod:this.formVal.EmpCode
    });
    if (this.formVal.ReportId==44) {
      this.attendanceReportForm.patchValue({
        StartDate: this.dateFormate.getYyyymmddToDate(this.formVal.StartDate).toLocaleDateString(),
        StrDate:this.dateFormate.getYyyymmddToDate(this.formVal.StartDate).toLocaleDateString(),
        endDate: this.dateFormate.getYyyymmddToDate(this.formVal.EndDate).toLocaleDateString()
      })
    }
    if(this.attendanceReportForm.invalid){
      this.toaster.error('Invalid Submission');
      return;
    }
    if([46,51,57].some(val=>val==this.formVal.ReportId)){
      this.attendanceReportForm.controls.GradeValue.setValue(-1);
    }
    this.rptService.getShiftAllowanceReport(this.attendanceReportForm.value)
      .subscribe(
        exportedFile => {
          this.exporting = false;
          this.reportHelper.openFileWindow(exportedFile as Blob, 'loanReport');
        },
        (err: HttpErrorResponse) => {
          this.exporting = false;
          this.toaster.error(err.message, 'Failed!');
        })
  }




  
  createform() {
    if(this.userTypeId==9 || this.userTypeId == 4){
      this.attendanceReportForm = this.formBuilder.group({
        ReportId: [, [Validators.required]],
        ExportType: ['pdf', [Validators.required]],
        EmpCod: [, []],
        EmpCode: [, []],
        CompanyID: [this.companyID, []],
        GradeValue: [this.gradeValue, []],
        BranchID: [, []],
        DepartmentID: [, []],
        Location: [, []],
        strDate: [, []],
        StartDate: [, []],
        EndDate: [, []],
        ProjectID: [-1, []],
        PeriodID: [, []]
      })
    }else{
      this.attendanceReportForm = this.formBuilder.group({
        ReportId: [, [Validators.required]],
        ExportType: ['pdf', [Validators.required]],
        EmpCod: [, []],
        EmpCode: [this.empCode, []],
        CompanyID: [this.companyID, []],
        GradeValue: [this.gradeValue, []],
        BranchID: [, []],
        DepartmentID: [, []],
        Location: [, []],
        strDate: [, []],
        StartDate: [, []],
        EndDate: [, []],
        ProjectID: [-1, []],
        PeriodID: [, []]
      })
    }
  }
  get f() {
    return this.attendanceReportForm.controls;
  }
  get formVal() {
    return this.attendanceReportForm.value;
  }
}
