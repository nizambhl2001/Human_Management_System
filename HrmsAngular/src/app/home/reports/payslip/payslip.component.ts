import { AuthService } from './../../../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ReportService } from '../../../services/report.service';
import { ReportHelper } from '../../../shared/report-helper';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-payslip',
  templateUrl: './payslip.component.html',
  styleUrls: ['./payslip.component.scss',
    '../../../../vendor/libs/angular2-ladda/ladda.scss',
    '../../../../vendor/libs/ng-select/ng-select.scss'
  ]
})
export class PayslipComponent implements OnInit {
  compId: number;
  gradeVal: number;
  ReportId: number;
  empId: string;
  paymentMode: string;
  isSubmit: boolean = false;
  exporting: boolean = false;
  paySlipReportForm: FormGroup;



  constructor(
    private fb: FormBuilder,
    private toaster: ToastrService,
    private rptService: ReportService,
    private rptHelper: ReportHelper
  ) { }

  ngOnInit() {
    this.compId = AuthService.getLoggedCompanyId();
    this.gradeVal = AuthService.getLoggedGradeValue();
    this.empId = AuthService.getLoggedEmpCode();
    this.createForm();

  }

  export() {

    this.exporting = true;
    this.isSubmit = true;

    if (this.paySlipReportForm.invalid) {
      this.exporting = false;
      this.toaster.error('Invalid Submission')
      return;
    }
    this.rptService.getBasicInfoReport(this.paySlipReportForm.value)
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
    this.paySlipReportForm = this.fb.group({
      ReportId: [this.ReportId = 157, []],
      ExportType: ['pdf', [Validators.required]],
      CompanyID: [this.compId, []],
      EmpID: [this.empId, []],
      PeriodID: [, []],
      Department: [, []],
      PaymentMode: [this.paymentMode = 'All Pay', []],






    });

  }

  get formControl() {
    return this.paySlipReportForm.controls;
  }

}
