import { AuthService } from './../../../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { NgbDateCustomParserFormatter } from '../../../shared/dateformat';
import { ReportHelper } from '../../../shared/report-helper';
import { HttpErrorResponse } from '@angular/common/http';
import { ReportService } from '../../../services/report.service';

@Component({
  selector: 'app-loan-report',
  templateUrl: './loan-report.component.html',
  styleUrls: ['./loan-report.component.scss',
              '../../../../vendor/libs/angular2-ladda/ladda.scss',
              '../../../../vendor/libs/ng-select/ng-select.scss'
            ]
})
export class LoanReportComponent implements OnInit {

  title= "Loan Report";
  compId:number;
  gradeValue:number;
  isSubmitted:boolean = false;
  exportingPdf:boolean = false;
  loanReportForm:FormGroup;
  reportTypeList:any[]=[];

  constructor(
    private fb:FormBuilder,
    private toaster:ToastrService,
    private rptService:ReportService,
    private dateFormat: NgbDateCustomParserFormatter,
    private reportHelper:ReportHelper
  ) { }
  ngOnInit() {
    this.compId = AuthService.getLoggedCompanyId();
    this.gradeValue = AuthService.getLoggedGradeValue();

    this.createForm();
    this.getReportType();
  }

  getReportType(){
    this.reportTypeList = [
      {ReportId: 85, TypeName: 'All Employee'},
      {ReportId: 86, TypeName: 'Single Employee'},
      {ReportId: 87, TypeName: 'Loan Summery by Loan Head'},
      {ReportId: 88, TypeName: 'Payment Details'},
      {ReportId: 89, TypeName: 'All Employee Ledger'},
      {ReportId: 90, TypeName: 'Single Employee Ledger'}
    ];
  }

  onSelectLoanType(loanType:number){
    this.loanReportForm.patchValue({
      Loantype: loanType,
      LoanID: loanType,
      SalaryHeadID:loanType
    })
  }
  exportToPdf(exportType: string) {
    this.exportingPdf = true;
    this.isSubmitted = true;
    if (this.loanReportForm.invalid) {
      this.exportingPdf = false;
      return;
    }
    this.loanReportForm.patchValue({ExportType:exportType});
    this.rptService.getLoanReport(this.loanReportForm.value)
      .subscribe(
        exportedFile => {
          this.exportingPdf = false;
          this.reportHelper.openFileWindow(exportedFile as Blob, 'loanReport');
        },
        (err: HttpErrorResponse) => {
          this.exportingPdf = false;
          this.toaster.error(err.message, 'Failed!');
        })
  }

  createForm(){
    this.loanReportForm = this.fb.group({
      ReportId: [, [Validators.required]],
      ExportType: [,[]],
      CompanyID:[this.compId,[]],
      GradeValue: [this.gradeValue,[]],
      Grade:[this.gradeValue, []],
      EmpCode:[,[]],
      Depertment:[,[]],
      Period:[,[]],
      Branch:[,[]],
      ProjectID:[,[]],
      Loantype:[,[]],
      LoanID:[,[]],
      SalaryHeadID:[,[]],
      StartDate:[this.dateFormat.getCurrentNgbDate(),[]],
      EndDate:[this.dateFormat.getCurrentNgbDate(),[]]
    })
  }
  get formControl(){
    return this.loanReportForm.controls;
  }


}
