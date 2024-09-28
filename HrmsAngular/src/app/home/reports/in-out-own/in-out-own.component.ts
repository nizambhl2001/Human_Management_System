import { AuthService } from './../../../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ReportService } from '../../../services/report.service';
import { ReportHelper } from '../../../shared/report-helper';
import { HttpErrorResponse } from '@angular/common/http';
import { NgbDateCustomParserFormatter } from '../../../shared/dateformat';

@Component({
  selector: 'app-in-out-own',
  templateUrl: './in-out-own.component.html',
  styleUrls: ['./in-out-own.component.scss',
  '../../../../vendor/libs/angular2-ladda/ladda.scss',
  '../../../../vendor/libs/ng-select/ng-select.scss'
]
})
export class InOutOwnComponent implements OnInit {
  compId:number;
  gradeVal:number;
  ReportId:number;
  empCode:string;
  isSubmit:boolean=false;
  exporting:boolean = false;
  inOutReportForm:FormGroup;


  constructor(
    private fb:FormBuilder,
    private dateFormat: NgbDateCustomParserFormatter,
    private toaster:ToastrService,
    private rptService:ReportService,
    private rptHelper:ReportHelper
  ) { }

  ngOnInit() {

    this.compId =AuthService.getLoggedCompanyId();
    this.gradeVal =AuthService.getLoggedGradeValue();
    this.empCode = AuthService.getLoggedEmpCode();
    this.createForm();
  }
  export() {

    this.exporting = true;
    this.isSubmit = true;

    if (this.inOutReportForm.invalid) {
      this.exporting = false;
      this.toaster.error('Invalid Submission')
      return;
    }
    this.rptService.getBasicInfoReport(this.inOutReportForm.value)
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
    this.inOutReportForm = this.fb.group({
      ReportId:[this.ReportId=161,[]],
      ExportType:['pdf',[Validators.required]],
     CompanyID:[this.compId, []],
     EmpCode:[this.empCode,[]],
     StartDate:[this.dateFormat.getCurrentNgbDate(),[]],
     EndDate:[this.dateFormat.getCurrentNgbDate(),[]]




 });

  }
  get formControl(){
    return this.inOutReportForm.controls;
  }


}
