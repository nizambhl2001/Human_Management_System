import { AuthService } from './../../../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NgbDateCustomParserFormatter } from '../../../shared/dateformat';
import { ToastrService } from 'ngx-toastr';
import { ReportService } from '../../../services/report.service';
import { ReportHelper } from '../../../shared/report-helper';
import { HttpErrorResponse } from '@angular/common/http';
import { FinalSattlementService } from '../../../services/final-sattlement/final-sattlement.service';
import { ApiResponse } from '../../../models/response.model';

@Component({
  selector: 'app-settlement-report',
  templateUrl: './settlement-report.component.html',
  styleUrls: ['./settlement-report.component.scss',
  '../../../../vendor/libs/angular2-ladda/ladda.scss',
    '../../../../vendor/libs/ng-select/ng-select.scss'
]
})
export class SettlementReportComponent implements OnInit {
  compId:number;
  gradeVal:number;
  isSubmit:boolean=false;
  exporting:boolean = false;
  settlementReportForm:FormGroup;
  reportType:any[]=[];
  inactiveEmployees:any[]=[];
  constructor(
    private fb:FormBuilder,
    private dateFormat: NgbDateCustomParserFormatter,
    private toaster:ToastrService,
    private rptService:ReportService,
    private rptHelper:ReportHelper,
    private finalSettlementService:FinalSattlementService
  ) { }
  title="Final Settlement Report";
  ngOnInit() {
    this.compId =AuthService.getLoggedCompanyId();
    this.gradeVal = AuthService.getLoggedGradeValue();
    this.createForm();
    this.getReportType();
    this.getInactiveEmployee();
  }

  getReportType() {
    this.reportType=[
      {ReportId:100,TypeName:'Single Employee'},
      {ReportId:101,TypeName:'Final Settlement Pending'},
      {ReportId:102,TypeName:'All Employee'},
      {ReportId:103,TypeName:'Summary'},
      {ReportId:104,TypeName:'Gratuity Calculation'},
      {ReportId:105,TypeName:'Gratuity Payment Details'},
      {ReportId:106,TypeName:'Gratuity Payment Summary'},
      {ReportId:109,TypeName:'Gratuity Calculation Summary'},
    ]
  }
  getInactiveEmployee(){
    this.finalSettlementService.getInactiveEmployee(this.gradeVal,this.compId).subscribe((response:ApiResponse)=>{
      if(response.status){
        this.inactiveEmployees=response.result as any[];
      }else{
        this.inactiveEmployees=[];
      }
    })
  }
  onSelectEmployee(employee){
    if(employee){
      this.settlementReportForm.patchValue({
        GradeValue:employee.gradeValue,
        Grade:employee.gradeValue,
        EmpName:employee.empName
      })
    }else{
      this.settlementReportForm.patchValue({
        GradeValue:this.gradeVal,
        Grade:this.gradeVal,
        EmpName:null
      })
    }
  }
  onSelectBranch(branchId:number){
    this.settlementReportForm.patchValue({
      Branch:branchId,
      BranchID:branchId,
      Brance:branchId
    })
  }

  onSelectPeriod(periodID:number){
    this.settlementReportForm.patchValue({
      PeriodID:periodID,
      Period:periodID


    })
  }
  export() {
    this.exporting = true;
    this.isSubmit = true;

    if (this.settlementReportForm.invalid) {
      this.toaster.error('Invalid Submission')
      this.exporting = false;
      return;
    }
    this.rptService.getPayrollReport(this.settlementReportForm.value)
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
    this.settlementReportForm = this.fb.group({
      ReportId:[,[Validators.required]],
      ExportType:['pdf',[Validators.required]],
      EmpName:[,[]],
      CompanyID:[this.compId, []],
      GradeValue:[-1,[]],
      Grade:[-1,[]],
      EmpCode:[,[]],
      DepartmentID:[,[]],
      depertment:[,[]],
      BranchID:[,[]],
      Branch:[,[]],
      Brance:[,[]],
      ProjectID:[,[]],
      Project:[,[]],
      PeriodID:[,[]],
      Period:[,[]],
      date:[this.dateFormat.getCurrentNgbDate(),[]],
      StrDate:[this.dateFormat.getCurrentNgbDate(),[]],
      EndDate:[this.dateFormat.getCurrentNgbDate(),[]]



  });

}
get formControl(){
  return this.settlementReportForm.controls;
}
get formVal(){
  return this.settlementReportForm.value;
}
reset(){
  this.createForm();
}

}

