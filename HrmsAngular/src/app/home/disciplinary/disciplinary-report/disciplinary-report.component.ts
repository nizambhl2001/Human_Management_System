import { AuthService } from './../../../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NgbDateCustomParserFormatter } from '../../../shared/dateformat';
import { ReportHelper } from '../../../shared/report-helper';
import { HttpErrorResponse } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { ReportService } from '../../../services/report.service';

@Component({
  selector: 'app-disciplinary-report',
  templateUrl: './disciplinary-report.component.html',
  styleUrls: ['./disciplinary-report.component.scss',
  '../../../../vendor/libs/ng-select/ng-select.scss',
  '../../../../vendor/libs/angular2-ladda/ladda.scss'
]
})
export class DisciplinaryReportComponent implements OnInit {


  title="Disciplinary Action Report";
  exporting:boolean=false;
  isSubmit:boolean=false;
  compId:number;
  gradeValue:number;

  disciplinaryReportForm:FormGroup;
  reportTypeList:any[]=[];

  constructor(
    private fb:FormBuilder,
    private toaster:ToastrService,
    private dateFormat:NgbDateCustomParserFormatter,
    private reportHelper:ReportHelper,
    private rptService:ReportService
  ) { }

  ngOnInit() {
    this.compId=AuthService.getLoggedCompanyId();
    this.gradeValue = AuthService.getLoggedGradeValue();
    this.createForm();
    this.getReportTypeList();
  }

  getReportTypeList(){
    this.reportTypeList = [
      {ReportId: 81, TypeName:'Show Cause Report'},
      {ReportId: 82, TypeName:'Notice of Enquiry Report'},
      {ReportId: 83, TypeName:'Punishment Report'},
      {ReportId: 84, TypeName:'Show Cause Result Report'},
    ]
  }
  onSelectShowCauseType(type:any){
    this.disciplinaryReportForm.patchValue({
      Type: type,
      ShowCauseTypeID: type
    })
  }
  convertStartDate() {
    if(this.disciplinaryReportForm.value.StartDate){
      this.disciplinaryReportForm.patchValue({
        StartDate:this.dateFormat.ngbDateToDate(this.disciplinaryReportForm.value.StartDate).toLocaleDateString()
      })
    }
  }
  convertEndDate() {
    if(this.disciplinaryReportForm.value.EndDate){
      this.disciplinaryReportForm.patchValue({
        EndDate: this.dateFormat.ngbDateToDate(this.disciplinaryReportForm.value.EndDate).toLocaleDateString(),
      })
    }
  }
  export() {
    this.exporting = true;
    this.isSubmit = true;
    if (this.disciplinaryReportForm.invalid) {
      this.toaster.error('Invalid Submission')
      this.exporting = false;;
      return;
    }
    this.convertStartDate();
    this.convertEndDate();
    this.rptService.getDisciplinaryReport(this.disciplinaryReportForm.value)
      .subscribe(
        exportedFile => {
          this.exporting = false;
          this.reportHelper.openFileWindow(exportedFile as Blob);
        },
        (err: HttpErrorResponse) => {
          this.exporting = false;
          this.toaster.error(err.message, 'Failed!');
        })
  }
  createForm(){
    this.disciplinaryReportForm = this.fb.group({
      ReportId:[,[Validators.required]],
      ExportType:['pdf',[Validators.required]],
      CompanyID:[this.compId,[]],
      GradeValue:[this.gradeValue,[]],
      EmpCode:[,[]],
      ShowCauseTypeID:[,[]],
      Type:[,[]],
      ShowCauseResultID:[,[]],
      Action:[,[]],
      ActionID:[,[]],
      DepartmentID:[,[]],
      BranchID:[,[]],
      ProjectID:[,[]],
      StartDate:[this.dateFormat.getCurrentNgbDate(),[]],
      EndDate:[this.dateFormat.getCurrentNgbDate(),[]]
    })
  }

  get frmControl(){
    return this.disciplinaryReportForm.controls;
  }

}
