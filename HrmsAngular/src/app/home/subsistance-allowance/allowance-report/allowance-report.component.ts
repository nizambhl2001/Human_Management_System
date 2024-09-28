import { AuthService } from './../../../services/auth.service';
import { ReportHelper } from './../../../shared/report-helper';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ReportService } from '../../../services/report.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-allowance-report',
  templateUrl: './allowance-report.component.html',
  styleUrls: ['./allowance-report.component.scss',
  '../../../../vendor/libs/ng-select/ng-select.scss',
  '../../../../vendor/libs/angular2-ladda/ladda.scss'
]
})
export class AllowanceReportComponent implements OnInit {

  compId:number;
  gradeVal:number;
  isSubmit:boolean = false;
  exportingPdf:boolean = false;
  reportForm:FormGroup;
  reportType:any[]=[];
  payMethod:any[]=[];

  constructor(
    private fb:FormBuilder,
    private toaster:ToastrService,
    private rptService:ReportService,
    private rptHelper:ReportHelper
  ) { }
  ngOnInit() {
    this.compId =AuthService.getLoggedCompanyId();
    this.gradeVal = AuthService.getLoggedGradeValue();

    this.createForm();
    this.getReportType();
    this.getPayMethod();
  }

  onSelectPeriod(periodId:number){
    this.reportForm.patchValue({
      PeriodID: periodId,
      PaidPeriodID: periodId
    })
  }
  getReportType(){
    this.reportType = [
      {ReportId:91, TypeName:'Substance Allowance Sheet'},
      {ReportId:92, TypeName:'Substance Allowance Advice'}
    ]
  }
  getPayMethod(){
    this.payMethod = [
      {Id:'All Pay', Name:'All Pay'},
      {Id:'Bank', Name:'Bank'},
      {Id:'Cash', Name:'Cash'},
    ]
  }
  exportToPdf(exportType: string) {
    this.exportingPdf = true;
    this.isSubmit = true;
    if (this.reportForm.invalid) {
      this.exportingPdf = false;;
      return;
    }
    this.reportForm.patchValue({ExportType:exportType})
    this.rptService.getPayrollReport(this.reportForm.value)
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
  createForm(){
    this.reportForm = this.fb.group({
      ReportId:[,[Validators.required]],
      ExportType:[,[]],
      CompanyID:[this.compId,[]],
      GradeValue:[this.gradeVal,[]],
      EmpCode:[,[]],
      DepartmentID:[,[]],
      BranchID:[,[]],
      BankID:[,[]],
      ProjectID:[,[]],
      PeriodID:[,[]],
      PaidPeriodID:[,[]],
      Payby:['All Pay',[]],
      SignatoryL:[,[]],
      SignatoryR:[,[]]
    })
  }
  get formControl(){
    return this.reportForm.controls;
  }

}
