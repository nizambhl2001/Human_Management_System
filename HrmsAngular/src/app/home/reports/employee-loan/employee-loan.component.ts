import { AuthService } from './../../../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ReportService } from '../../../services/report.service';
import { ReportHelper } from '../../../shared/report-helper';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-employee-loan',
  templateUrl: './employee-loan.component.html',
  styleUrls: ['./employee-loan.component.scss',
    '../../../../vendor/libs/angular2-ladda/ladda.scss',
    '../../../../vendor/libs/ng-select/ng-select.scss'

  ]
})
export class EmployeeLoanComponent implements OnInit {
  compId: number;
  gradeVal: number;
  ReportId: number;
  empCode: number;
  isSubmit: boolean = false;
  exporting: boolean = false;
  singleEmpLoanReportForm: FormGroup;


  constructor(
    private fb: FormBuilder,
    private toaster: ToastrService,
    private rptService: ReportService,
    private rptHelper: ReportHelper
  ) { }

  ngOnInit() {

    this.compId = AuthService.getLoggedCompanyId();
    this.gradeVal = AuthService.getLoggedGradeValue();
    this.createForm();
  }
  export() {

    this.exporting = true;
    this.isSubmit = true;

    if (this.singleEmpLoanReportForm.invalid) {
      this.exporting = false;
      this.toaster.error('Invalid Submission')
      return;
    }
    this.rptService.getBasicInfoReport(this.singleEmpLoanReportForm.value)
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
    this.singleEmpLoanReportForm = this.fb.group({
      ReportId: [this.ReportId = 171, []],
      ExportType: ['pdf', [Validators.required]],
      CompanyID: [this.compId, []],
      EmpCode: [this.empCode = 100005, []],
      Loantype: [, []],
      Depertment: [, []],
      Branch: [, []],
      Grade: [, []],
      ProjectID: [, []],


    })
  }
  get formControl() {
    return this.singleEmpLoanReportForm.controls;
  }

}
