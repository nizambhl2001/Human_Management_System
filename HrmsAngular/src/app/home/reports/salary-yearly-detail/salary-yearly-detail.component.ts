import { AuthService } from './../../../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NgbDateCustomParserFormatter } from '../../../shared/dateformat';
import { ToastrService } from 'ngx-toastr';
import { ReportService } from '../../../services/report.service';
import { ReportHelper } from '../../../shared/report-helper';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-salary-yearly-detail',
  templateUrl: './salary-yearly-detail.component.html',
  styleUrls: ['./salary-yearly-detail.component.scss',
    '../../../../vendor/libs/angular2-ladda/ladda.scss',
    '../../../../vendor/libs/ng-select/ng-select.scss'
  ]
})
export class SalaryYearlyDetailComponent implements OnInit {
  compId: number;
  gradeVal: number;

  isSubmit: boolean = false;
  exporting: boolean = false;
  salaryYearlyReportForm: FormGroup;
  reportType: any[] = [];
  payBy: any[] = [];

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
    this.getPayBy();
  }
  getPayBy() {
    this.payBy = [
      { PayId: 1, typeName: 'All Pay' },
      { PayId: 2, typeName: 'Bank' },
      { PayId: 3, typeName: 'Cash' },
    ]
  }
  getReportType() {
    this.reportType = [
      { ReportId: 165, TypeName: 'Salary Sheet section-108' },
      { ReportId: 166, TypeName: 'Other Payment section-108' },

    ];
  }

  export() {
    this.exporting = true;
    this.isSubmit = true;

    if (this.salaryYearlyReportForm.invalid) {
      this.exporting = false;
      this.toaster.error('Invalid Submission')
      return;
    }
    this.rptService.getPayrollReport(this.salaryYearlyReportForm.value)
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
    this.salaryYearlyReportForm = this.fb.group({

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
      Depertment: [, []],
      BankID: [, []],
      Bank: [, []],
      BonusType: [, []],
      BonusID: [, []],
      GLCode: [, []],
      ProjectID: [, []],
      Project: [, []],
      Payby: [, []],
      PaymentMode: [, []],
      SalaryHeadID: [, []],
      StartPeriodID: [, []],
      EndPeriodID: [, []],
      PayId: [, []],





    });

  }

  get formControl() {
    return this.salaryYearlyReportForm.controls;
  }
  reset() {
    this.createForm();
  }

}
