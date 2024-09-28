import { AuthService } from './../../../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ReportService } from '../../../services/report.service';
import { ReportHelper } from '../../../shared/report-helper';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-single-emp-income-tax',
  templateUrl: './single-emp-income-tax.component.html',
  styleUrls: ['./single-emp-income-tax.component.scss',
   '../../../../vendor/libs/angular2-ladda/ladda.scss',
  '../../../../vendor/libs/ng-select/ng-select.scss'

]
})
export class SingleEmpIncomeTaxComponent implements OnInit {
  compId:number;
  gradeVal:number;
  ReportId:number;
  yearName:number;
  empCode:string;
  isSubmit:boolean=false;
  exporting:boolean = false;
  singleEmpincomeTaxReportForm:FormGroup;
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
export() {

  this.exporting = true;
  this.isSubmit = true;

  if (this.singleEmpincomeTaxReportForm.invalid) {
    this.exporting = false;
    this.toaster.error('Invalid Submission')
    return;
  }
  this.rptService.getBasicInfoReport(this.singleEmpincomeTaxReportForm.value)
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
   this.singleEmpincomeTaxReportForm=this.fb.group({
     ReportId:[this.ReportId=176,[]],
     ExportType:['pdf',[Validators.required]],
     empcode:[this.empCode,[]],
     yearname:[,[]],
     Department:[,[]],
     companyid:[this.compId,[]],
   })

  }

  get formControl(){
    return this.singleEmpincomeTaxReportForm.controls;
  }

}

