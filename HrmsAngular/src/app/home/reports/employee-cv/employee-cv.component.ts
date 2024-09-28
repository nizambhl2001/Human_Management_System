import { AuthService } from './../../../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ReportService } from '../../../services/report.service';
import { ReportHelper } from '../../../shared/report-helper';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-employee-cv',
  templateUrl: './employee-cv.component.html',
  styleUrls: ['./employee-cv.component.scss',
  '../../../../vendor/libs/angular2-ladda/ladda.scss',
  '../../../../vendor/libs/ng-select/ng-select.scss'
]
})
export class EmployeeCvComponent implements OnInit {
  compId:number;
  gradeVal:number;
  ReportId:number;
  empCode:string;
  isSubmit:boolean=false;
  exportingPdf:boolean = false;
  singleEmpCvReportForm:FormGroup;

  constructor(
    private fb:FormBuilder,
    private toaster:ToastrService,
    private rptService:ReportService,
    private rptHelper:ReportHelper
  ) { }

  ngOnInit() {
    this.compId =AuthService.getLoggedCompanyId();
    this.gradeVal = AuthService.getLoggedGradeValue();
    this.empCode = AuthService.getLoggedEmpCode();
    this.createForm();
  }
  exportToPdf(exportType: string) {

    this.exportingPdf = true;
    this.isSubmit = true;

    if (this.singleEmpCvReportForm.invalid) {
      this.exportingPdf = false;
      return;
    }
    this.singleEmpCvReportForm.patchValue({ExportType:exportType})
    this.rptService.getBasicInfoReport(this.singleEmpCvReportForm.value)
      .subscribe(
        exportedFile => {
          this.exportingPdf = false;
          this.rptHelper.openFileWindow(exportedFile as Blob);
        },
        (err: HttpErrorResponse) => {
          this.exportingPdf = false;
          this.toaster.error(err.message, 'Failed!');
        })
  }
  createForm() {
    this.singleEmpCvReportForm=this.fb.group({
      ReportId:[this.ReportId=158,[]],
      ExportType:[,[]],
      EmpCode:[this.empCode,[]],
      RptType:[,[]],
      CompanyID:[this.compId,[]],
    })

  }

  get formControl(){
    return this.singleEmpCvReportForm.controls;
  }

}
