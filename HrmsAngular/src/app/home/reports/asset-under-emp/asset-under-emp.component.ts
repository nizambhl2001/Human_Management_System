import { AuthService } from './../../../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ReportService } from '../../../services/report.service';
import { ReportHelper } from '../../../shared/report-helper';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-asset-under-emp',
  templateUrl: './asset-under-emp.component.html',
  styleUrls: ['./asset-under-emp.component.scss',
    '../../../../vendor/libs/angular2-ladda/ladda.scss',
    '../../../../vendor/libs/ng-select/ng-select.scss'
  ]
})
export class AssetUnderEmpComponent implements OnInit {
  compId: number;
  gradeVal: number;
  ReportId: number;
  isSubmit: boolean = false;
  exporting: boolean = false;
  assetUnderEmpReportForm: FormGroup;

  reportType: any[] = [];
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

    if (this.assetUnderEmpReportForm.invalid) {
      this.exporting = false;
      this.toaster.error('Invalid Submission')
      return;
    }
    this.rptService.getAssetReportSingle(this.assetUnderEmpReportForm.value)
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
    this.assetUnderEmpReportForm = this.fb.group({
      ReportId: [this.ReportId = 162, []],
      ExportType: ['pdf', [Validators.required]],
      CompanyID: [this.compId, []],
      EmpCode: [, []],
      Grade: [, []],






    });

  }

  get formControl() {
    return this.assetUnderEmpReportForm.controls;
  }

}
