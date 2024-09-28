import { AuthService } from './../../../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ReportService } from '../../../services/report.service';
import { ReportHelper } from '../../../shared/report-helper';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-provident-fund',
  templateUrl: './provident-fund.component.html',
  styleUrls: ['./provident-fund.component.scss',
    '../../../../vendor/libs/angular2-ladda/ladda.scss',
    '../../../../vendor/libs/ng-select/ng-select.scss'
  ]
})
export class ProvidentFundComponent implements OnInit {
  compId: number;
  gradeVal: number;
  ReportId: number;
  empCode: string;
  isSubmit: boolean = false;
  exporting: boolean = false;
  pFReportForm: FormGroup;



  constructor(
    private fb: FormBuilder,
    private toaster: ToastrService,
    private rptService: ReportService,
    private rptHelper: ReportHelper
  ) { }

  ngOnInit() {
    this.compId = AuthService.getLoggedCompanyId();
    this.gradeVal = AuthService.getLoggedGradeValue();
    this.empCode = AuthService.getLoggedEmpCode();
    this.createForm();
  }
  export() {

    this.exporting = true;
    this.isSubmit = true;

    if (this.pFReportForm.invalid) {
      this.exporting = false;
      this.toaster.error('Invalid Submission')
      return;
    }
    this.rptService.getBasicInfoReport(this.pFReportForm.value)
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
    this.pFReportForm = this.fb.group({
      ReportId: [this.ReportId = 159, []],
      ExportType: ['pdf', [Validators.required]],
      CompanyID: [this.compId, []],
      EmpCode: [this.empCode, []],
      yearname: [, []],
      Department: [, []],




    });
  }

  get formControl() {
    return this.pFReportForm.controls;
  }

}
