import { AuthService } from './../../../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NgbDateCustomParserFormatter } from '../../../shared/dateformat';
import { ToastrService } from 'ngx-toastr';
import { ReportService } from '../../../services/report.service';
import { ReportHelper } from '../../../shared/report-helper';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-salary-summary',
  templateUrl: './salary-summary.component.html',
  styleUrls: ['./salary-summary.component.scss',
    '../../../../vendor/libs/angular2-ladda/ladda.scss',
    '../../../../vendor/libs/ng-select/ng-select.scss'
  ]
})
export class SalarySummaryComponent implements OnInit {
  compId: number;
  gradeVal: number;

  isSubmit: boolean = false;
  exporting: boolean = false;
  salarySummaryReportForm: FormGroup;
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
      { ReportId: 143, TypeName: 'Department Wise Summary' },
      { ReportId: 144, TypeName: 'Salary Head Wise Summary' },
      { ReportId: 145, TypeName: 'Employee Grade Wise Summary' },
      { ReportId: 146, TypeName: 'Payment Summary' },
      { ReportId: 147, TypeName: 'Depertment Wise Summary GL' },
      { ReportId: 148, TypeName: 'Depertment Wise Summary Arrear' },
      { ReportId: 149, TypeName: 'Depertment Wise Summary Bonus' },
      { ReportId: 150, TypeName: 'Grade Wise Summary Arrear' },
      { ReportId: 151, TypeName: 'Grade Wise Summary Bonus' },
      { ReportId: 152, TypeName: 'Bonus Summary GL' },
      { ReportId: 153, TypeName: 'Arrear Summary GL' },
      { ReportId: 154, TypeName: 'Summary By Head Bonus' },
      { ReportId: 155, TypeName: 'Payment Summary Bonus' },
      {ReportId:211,TypeName:'Income Tax Deduct Details'}



    ]
  }

  onSelectBranch(branchId: number) {
    this.salarySummaryReportForm.patchValue({
      Branch: branchId,
      BranchID: branchId
    })
  }

  onSelectPeriod(periodID: number) {
    this.salarySummaryReportForm.patchValue({
      PeriodID: periodID,
      Period: periodID,
      StartPeriodID: periodID,
      EndPeriodID: periodID


    })
  }
  onSelectBonus(bonusID: number) {
    this.salarySummaryReportForm.patchValue({
      BonusType: bonusID,
      BonusID: bonusID


    })
  }

  export() {
    this.exporting = true;
    this.isSubmit = true;

    if (this.salarySummaryReportForm.invalid) {
      this.exporting = false;
      this.toaster.error('Invalid Submission')
      return;
    }
    this.rptService.getPayrollReport(this.salarySummaryReportForm.value)
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
    this.salarySummaryReportForm = this.fb.group({
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
      SignatoryL: [, []],
      SignatoryR: [, []],
      ProjectID: [, []],
      Project: [, []],
      Payby: [, []],
      PaymentMode: [, []],
      SalaryHeadID: [, []],
      StartPeriodID: [, []],

      EndPeriodID: [, []],
      GLCode: [3, []],
      //  PaymentDate:[this.dateFormat.getCurrentNgbDate(),[]]




    });

  }
  get formControl() {
    return this.salarySummaryReportForm.controls;
  }
  reset() {
    this.createForm();
  }

}
