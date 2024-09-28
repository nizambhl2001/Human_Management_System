import { AuthService } from './../../../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ReportService } from '../../../services/report.service';
import { ReportHelper } from '../../../shared/report-helper';
import { HttpErrorResponse } from '@angular/common/http';
import { NgbDateCustomParserFormatter } from '../../../shared/dateformat';

@Component({
  selector: 'app-salary-reconciliation',
  templateUrl: './salary-reconciliation.component.html',
  styleUrls: ['./salary-reconciliation.component.scss',
  '../../../../vendor/libs/angular2-ladda/ladda.scss',
  '../../../../vendor/libs/ng-select/ng-select.scss'

]
})
export class SalaryReconciliationComponent implements OnInit {
  compId:number;
  gradeVal:number;

  isSubmit:boolean=false;
  exporting:boolean = false;
  salaryReconciliationReportForm:FormGroup;
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
      {ReportId:141,TypeName:'Salary Reconciliation'},
      {ReportId:142,TypeName:'Salary Reconciliation  Summary'},
    ]
  }


  onSelectStartPeriod(period){
    this.salaryReconciliationReportForm.patchValue({
      STRPeriodID:period.id,
      StartPeriodID:period.id,
      PeriodID:period.id,
      PeriodName:period.periodName
    })
  }
  onSelectEndPeriod(periodID:number){
    this.salaryReconciliationReportForm.patchValue({
      ENDPeriodID:periodID,
    })
  }

  onSelectBranch(branch){
    this.salaryReconciliationReportForm.patchValue({
      Branch:branch.description,
      BranchID:branch.id
    })
  }

  export() {
    this.exporting = true;
    this.isSubmit = true;

    if (this.salaryReconciliationReportForm.invalid) {
      this.exporting = false;
      this.toaster.error('Invalid Submission')
      return;
    }
    this.rptService.getPayrollReport(this.salaryReconciliationReportForm.value)
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
    this.salaryReconciliationReportForm = this.fb.group({

      ReportId:[,[Validators.required]],
      ExportType:['pdf',[Validators.required]],
      CompanyID:[this.compId, []],
      EmpCode:[,[]],
      GradeValue:[AuthService.getLoggedGradeValue(),[]],
      Grade:[AuthService.getLoggedGradeValue(),[]],
      STRPeriodID:[,[]],
      ENDPeriodID:[,[]],
      Branch:[,[]],
      StartPeriodID:[,[]],
      PeriodID:[,[]],
      BranchID:[,[]],
      StartDate:[this.dateFormat.getCurrentNgbDate(),[]],
      EndDate:[this.dateFormat.getCurrentNgbDate(),[]],
      PeriodName:[]

  });

  }
  get formControl(){
    return this.salaryReconciliationReportForm.controls;
  }
  reset(){
    this.createForm();
  }

}
