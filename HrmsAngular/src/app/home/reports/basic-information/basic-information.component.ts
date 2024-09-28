import { AuthService } from './../../../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ReportService } from '../../../services/report.service';
import { ReportHelper } from '../../../shared/report-helper';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-basic-information',
  templateUrl: './basic-information.component.html',
  styleUrls: ['./basic-information.component.scss',
    '../../../../vendor/libs/angular2-ladda/ladda.scss',
    '../../../../vendor/libs/ng-select/ng-select.scss'
  ]
})
export class BasicInformationComponent implements OnInit {
  compId: number;
  gradeVal: number;
  ReportId: number;
  empCode: number;
  isSubmit: boolean = false;
  exporting: boolean = false;
  basicInfoReportForm: FormGroup;

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

    if (this.basicInfoReportForm.invalid) {
      this.exporting = false;
      this.toaster.error('Invalid Submission')
      return;
    }
    this.rptService.getBasicInfoReport(this.basicInfoReportForm.value)
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
    this.basicInfoReportForm = this.fb.group({
      ReportId: [this.ReportId = 156, []],
      ExportType: ['pdf', [Validators.required]],
      CompanyID: [this.compId, []],
      EmpCode: [this.empCode = 100005, []],
      Status: [, []],

    });
  }

  get formControl() {
    return this.basicInfoReportForm.controls;
  }


}
