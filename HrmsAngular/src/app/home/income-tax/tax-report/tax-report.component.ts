import { AuthService } from './../../../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ReportService } from '../../../services/report.service';
import { ReportHelper } from '../../../shared/report-helper';
import { HttpErrorResponse } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-tax-report',
  templateUrl: './tax-report.component.html',
  styleUrls: [
    './tax-report.component.scss',
    '../../../../vendor/libs/angular2-ladda/ladda.scss',
    '../../../../vendor/libs/ng-select/ng-select.scss'
  ]
})
export class TaxReportComponent implements OnInit {

  compId:number;
  gradeVal:number;
  isSubmit:boolean=false;
  exporting:boolean = false;

  reportForm:FormGroup;
  reportType:any[]=[];

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
  }

  getReportType(){
    this.reportType = [
      {ReportId:94, TypeName:'Tax Calculation'},
      {ReportId:95, TypeName:'Tax Certificate'},
      {ReportId:96, TypeName:'Statement of Salaries & Allowance 108'},
      {ReportId:97, TypeName:'Statement of Tax Deduction'},
      {ReportId:98, TypeName:'Statement of Deduction by Period'},
      {ReportId:99, TypeName:'AIT Certificate Envelope'},
      {ReportId:212, TypeName:'Tax Deduction'},
    ]
  }
  onSelectPeriod(period) {
    this.reportForm.patchValue({
      PeriodID: period.id,
      Period: period.id,
    })
  }
  onSelectBranch(branchId:number){
    this.reportForm.patchValue({
      Branch:branchId,
      BranchID:branchId
    })
  }
  onSelectProject(projectId:number){
    this.reportForm.patchValue({
      Project:projectId,
      ProjectID:projectId
    })
  }

  export() {
    this.exporting = true;
    this.isSubmit = true;
    if (this.reportForm.invalid) {
      this.toaster.error('Invalid Submission')
      this.exporting = false;;
      return;
    }
    console.log(this.reportForm.value);
    this.rptService.getPayrollReport(this.reportForm.value)
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
  createForm(){
    this.reportForm = this.fb.group({
      ReportId:[,[Validators.required]],
      ExportType:['pdf',[Validators.required]],
      CompanyID:[this.compId, []],
      GradeValue:[this.gradeVal,[]],
      Grade:[this.gradeVal,[]],
      EmpCode:[,[]],
      DepartmentID:[,[]],
      BranchID:[,[]],
      Branch:[,[]],
      ProjectID:[,[]],
      Project:[,[]],
      TaxYearID:[,[]],
      SignatoryL:[,[]],
      PeriodID:[,[]],
      StrPeriod:[,[]],
      EndPeriod:[,[]]
    })
  }
  get formControl(){
    return this.reportForm.controls;
  }
  reset(){
    this.createForm();
  }

}
