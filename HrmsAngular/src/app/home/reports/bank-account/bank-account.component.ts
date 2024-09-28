import { AuthService } from './../../../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NgbDateCustomParserFormatter } from '../../../shared/dateformat';
import { ToastrService } from 'ngx-toastr';
import { ReportService } from '../../../services/report.service';
import { ReportHelper } from '../../../shared/report-helper';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-bank-account',
  templateUrl: './bank-account.component.html',
  styleUrls: ['./bank-account.component.scss',
    '../../../../vendor/libs/angular2-ladda/ladda.scss',
    '../../../../vendor/libs/ng-select/ng-select.scss'
  ]
})
export class BankAccountComponent implements OnInit {
  compId: number;
  gradeVal: number;

  isSubmit: boolean = false;
  exporting: boolean = false;
  bankAccountReportForm: FormGroup;
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
      { ReportId: 163, TypeName: 'Account of separated Employees' },
      { ReportId: 164, TypeName: 'Group Insurance Letter' },

    ];
  }
  export() {
    this.exporting = true;
    this.isSubmit = true;

    if (this.bankAccountReportForm.invalid) {
      this.exporting = false;
      this.toaster.error('Invalid Submission')
      return;
    }
    this.rptService.getHrReport(this.bankAccountReportForm.value)
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

    this.bankAccountReportForm = this.fb.group({
      ReportId: [, [Validators.required]],
      ExportType: ['pdf', [Validators.required]],
      CompanyID: [this.compId, []],
      EmpCode: [, []],
      GradeValue: [, []],
      Grade: [, []],
      BranchID: [, []],
      DepartmentID: [, []],
      BankBranch: [, []],
      SignatoryL: [, []],
      SignatoryR: [, []],
      Bank: [, []],
      StrDate: [this.dateFormat.getCurrentNgbDate(), []],
      EndDate: [this.dateFormat.getCurrentNgbDate(), []],





    });

  }
  get formControl() {
    return this.bankAccountReportForm.controls;
  }
  reset() {
    this.createForm();
  }

}
