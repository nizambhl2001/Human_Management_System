import { AuthService } from './../../../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NgbDateCustomParserFormatter } from '../../../shared/dateformat';
import { ToastrService } from 'ngx-toastr';
import { ReportService } from '../../../services/report.service';
import { ReportHelper } from '../../../shared/report-helper';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-yearly-summary',
  templateUrl: './yearly-summary.component.html',
  styleUrls: ['./yearly-summary.component.scss',
    '../../../../vendor/libs/angular2-ladda/ladda.scss',
    '../../../../vendor/libs/ng-select/ng-select.scss'
  ]
})
export class YearlySummaryComponent implements OnInit {
  compId: number;
  gradeVal: number;

  isSubmit: boolean = false;
  exporting: boolean = false;
  yearlySummaryReportForm: FormGroup;
  reportType: any[] = [];
  constructor(
    private fb: FormBuilder,
    private dateFormat: NgbDateCustomParserFormatter,
    private toaster: ToastrService,
    private rptService: ReportService,
    private rptHelper: ReportHelper
  ) { }

  ngOnInit() {
    this.compId = AuthService.getLoggedCompanyId();
    this.gradeVal = AuthService.getLoggedGradeValue();
    this.createForm();
    this.getReportType();
  }
  getReportType() {
    this.reportType = [
      { ReportId: 167, TypeName: 'Summary of salary schedule By GL' },
      { ReportId: 168, TypeName: 'Summary of salary schedule' },
      { ReportId: 169, TypeName: 'Details of salary schedule' },
      { ReportId: 170, TypeName: 'Salary Sheet GL 108' },

    ];
  }
  onSelectPeriod(periodID: number) {
    this.yearlySummaryReportForm.patchValue({
      StrPeriod: periodID,
      StartPeriodID: periodID,
      EndPeriod: periodID,
      EndPeriodID: periodID
    })
  }
  onSelectCode(codeID: number) {
    this.yearlySummaryReportForm.patchValue({
      GLCode: codeID,
      Code: codeID


    })
  }

  export() {
    this.exporting = true;
    this.isSubmit = true;

    if (this.yearlySummaryReportForm.invalid) {
      this.exporting = false;
      this.toaster.error('Invalid Submission')
      return;
    }
    this.rptService.getPayrollReport(this.yearlySummaryReportForm.value)
      .subscribe(
        exportedFile => {
          this.exporting = false;
          this.rptHelper.openFileWindow(exportedFile as Blob);
        },
        (err: HttpErrorResponse) => {
          this.exporting = false;
          this.toaster.error(err.message, 'Failed!');
        })
  }
  createForm() {
    this.yearlySummaryReportForm = this.fb.group({
      ReportId: [, [Validators.required]],
      ExportType: ['pdf', [Validators.required]],
      CompanyID: [this.compId, []],
      EmpCode: [, []],
      GradeValue: [, []],
      Grade: [, []],
      PeriodID: [, []],
      Period: [, []],
      BranchID: [, []],
      Branch: [, []],
      Department: [, []],
      DepartmentID: [, []],

      GLCode: [, []],
      Code: [, []],
      ProjectID: [, []],
      Project: [, []],
      PaymentMode: ['Bank', []],
      SalaryHeadID: [, []],
      StrPeriod: [, []],
      EndPeriod: [, []],
      StartPeriodID: [, []],
      EndPeriodID: [, []],








    });
  }
  get formControl() {
    return this.yearlySummaryReportForm.controls;
  }
  reset() {
    this.createForm();
  }


}
