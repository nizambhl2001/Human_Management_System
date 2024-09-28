import { AuthService } from './../../../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NgbDateCustomParserFormatter } from '../../../shared/dateformat';
import { ToastrService } from 'ngx-toastr';
import { ReportService } from '../../../services/report.service';
import { ReportHelper } from '../../../shared/report-helper';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-exit-interview-report',
  templateUrl: './exit-interview-report.component.html',
  styleUrls: ['./exit-interview-report.component.scss',
  '../../../../vendor/libs/angular2-ladda/ladda.scss',
  '../../../../vendor/libs/ng-select/ng-select.scss'
]
})
export class ExitInterviewReportComponent implements OnInit {
  compId:number;
  gradeVal:number;
  grade:number;
  isSubmit:boolean=false;
  exportingPdf:boolean = false;
  exitInterviewReportForm:FormGroup;
  reportType:any[]=[];

  constructor(
    private fb:FormBuilder,
   private dateFormat: NgbDateCustomParserFormatter,
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
  getReportType() {
    this.reportType=[
    {ReportId:205,TypeName:'Single Employee Exit Report'},
    {ReportId:206,TypeName:'Reason wise Exit Report'},
    ]

   }

exportToPdf(exportType: string) {
 this.exportingPdf = true;
   this.isSubmit = true;
 if (this.exitInterviewReportForm.invalid) {
  this.exportingPdf = false;
       return;
   }

 this.exitInterviewReportForm.patchValue({ExportType:exportType})
  this.rptService.getHrReport(this.exitInterviewReportForm.value)

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
    this.exitInterviewReportForm=this.fb.group({
  ReportId:[,[Validators.required]],
  ExportType:[,[]],
  CompanyID:[this.compId, []],
   EmpCode:[,[]],
   StartDate:[this.dateFormat.getCurrentNgbDate(),[]]
 , EndDate:[this.dateFormat.getCurrentNgbDate(),[]],
  });


  }
  get formControl(){
  return this.exitInterviewReportForm.controls;
  }

  reset(){
  this.createForm();

   }



}

