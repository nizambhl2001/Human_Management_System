import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { SalaryPeriodModel } from '../../../models/SalarySetup/SalaryPeriod';
import { SalaryYear } from '../../../models/SalarySetup/salary-year';
import { SearchEmployee } from '../../../models/hr/search-emp.model';
import { ApiResponse } from '../../../models/response.model';
import { BasicEntry } from '../../../models/system-setup/basic-entry.model';
import { SalarySetupService } from '../../../services/SalarySetup/salary-setup.service';
import { AuthService } from '../../../services/auth.service';
import { EmploymentService } from '../../../services/hr/employment.service';
import { LeaveService } from '../../../services/leave.service';
import { ReportService } from '../../../services/report.service';
import { BasicEntryService } from '../../../services/system-setup/basic-entry.service';
import { NgbDateCustomParserFormatter } from '../../../shared/dateformat';
import { ReportHelper } from '../../../shared/report-helper';
import { Pagination } from '../../../shared/paginate';

@Component({
  selector: 'app-leave-data-view',
  templateUrl: './leave-data-view.component.html',
  styleUrls: ['./leave-data-view.component.scss',
  '../../../../vendor/libs/ng-select/ng-select.scss',
  '../../../../vendor/libs/angular2-ladda/ladda.scss']
})
export class LeaveDataViewComponent extends Pagination implements OnInit {
  _compId:number;
  _gradeValue:number;
  exporting:boolean=false;
  _isSubmit:boolean = false;

  _leaveReportForm:FormGroup;
  _reportTypeList:any[]=[];
  _employees:SearchEmployee[]=[];
  _departments:BasicEntry[]=[]
  _branches:BasicEntry[]=[];
  _projects:BasicEntry[]=[];
  _salaryYears:SalaryYear[]=[];
  _salaryPeriods:SalaryPeriodModel[]=[];

  constructor(
    private fb:FormBuilder,
    private dateFormat:NgbDateCustomParserFormatter,
    private toaster:ToastrService,
    public modalService:NgbModal,
    private reportHelper:ReportHelper,
    private basicEntryService:BasicEntryService,
    private empService:EmploymentService,
    private salaryService:SalarySetupService,
    private leaveService: LeaveService,
    private rptService:ReportService
    ) {
      super();
      this.sortDesc = false;
    }

  ngOnInit() {
    this._compId = AuthService.getLoggedCompanyId();
    this._gradeValue =AuthService.getLoggedGradeValue();

    this.createForm();
    this.getReportTypeList();
    this.getEmployees( this._compId,this._gradeValue);
    this.getProjects();
    this.getSalaryYears();
    this.getSalaryPeriods();
  }

  getReportTypeList(){
    this._reportTypeList = [
      {ReportId: 62, ReportType:1, TypeName:'Leave Report'},
      {ReportId: 63, ReportType:2, TypeName:'Leave With Pay'},
      {ReportId: 64, ReportType:-1, TypeName:'Leave Without Pay'},
      // {ReportId: 65, ReportType:0, TypeName:'Carry Forward'},
      {ReportId: 66, ReportType:5, TypeName:'Single Employee Leave'},
      // {ReportId: 67, ReportType:0, TypeName:'Encashment Leave'},
      // {ReportId: 68, ReportType:0, TypeName:'Substitute Leave'},
      // {ReportId: 69, ReportType:0, TypeName:'Leave Encashment Details'},
      // {ReportId: 70, ReportType:0, TypeName:'Leave Encashment Payment'},
      // {ReportId: 71, ReportType:0, TypeName:'Encashment Probable Payment'},
      {ReportId: 72, ReportType:0, TypeName:'Leave Info Details'}
    ]
  }
  getEmployees(compId:number, gradeValue:number){
    this.empService.getAllEmpBasicInfoForLeave(compId, gradeValue)
    .subscribe((response:ApiResponse)=>{
      if(response.status){
        this._employees = response.result as SearchEmployee[];
      }
    })
  }
  getProjects(){
    this.basicEntryService.getProject().subscribe((response:ApiResponse)=>{
      if(response.status){
        this._projects = response.result as BasicEntry[];
      }
    })
  }
  getSalaryYears(){
    this.salaryService.getAllSalaryYear().subscribe((response:ApiResponse)=>{
      if(response.status){
        this._salaryYears = response.result as SalaryYear[];
        this.sortBy = 'yearName';
        this.sortDesc = true;
        this.sort(this._salaryYears);
      }
    })
  }
  getSalaryPeriods(){
    this.salaryService.getAllperiod().subscribe((response:ApiResponse)=>{
      if(response.status){
        this._salaryPeriods = response.result as SalaryPeriodModel[];
        this.sortBy = 'periodName';
        this.sortDesc = true;
        this.sort(this._salaryPeriods);
      }
    })
  }
  onReportTypeChange(){
    let reportId = this._leaveReportForm.value.ReportId;
    if(reportId==null || reportId==''){
      return;
    }
    let reportType = this._reportTypeList.find(c=>c.ReportId==reportId).ReportType;
    this._leaveReportForm.patchValue({
      ReportType: reportType
    });
  }
  onEmpCodeChange(){
    let empCode = this._leaveReportForm.value.EmpCode;
    if(empCode==null || empCode=='' ){
      this._leaveReportForm.patchValue({
        Emocode:-1,
        Grade: -1,
        GradeValue:-1
      })
      return;
    }
    let gradeVal = this._employees.find(c=>c.empCode==empCode).gradeValue;
      this._leaveReportForm.patchValue({
        Emocode:empCode,
        Grade: gradeVal,
        GradeValue:gradeVal
      })
  }
  onDeptChange(department){
    if(department){
      this._leaveReportForm.patchValue({
        DepertmentId:department.id,
        Depertment: department.id,
        department:department.id,
        DepartmentID:department.id
      })
    }
  }
  onSelectBranch(branch){
    if(branch){
      this._leaveReportForm.patchValue({
        Branch:branch.id,
        BranchID: branch.id
      })
    }
  }
  export(){
    this.exporting=true;
    this._isSubmit = true;
    if(this._leaveReportForm.invalid){
      this.exporting=false;
      this.toaster.error('Invalid Submission')
      return;
    }
    let formVal = this._leaveReportForm.value; //this.getReadyFormVal();
    console.log(formVal)
    this.rptService.getLeaveReport(formVal)

    .subscribe(
      exportedFile=>{
      this.exporting=false;
        this.reportHelper.openFileWindow(exportedFile as Blob);
      },
      (err:HttpErrorResponse)=>{
        this.exporting=false;
        this.toaster.error(err.message, 'Failed!');
      })
      // if (this.formVal.ReportId==62||63||64||66||72) {
      //   this._leaveReportForm.patchValue({
      //     StartDate: this.dateFormat.getYyyymmddToDate(this.formVal.StartDate).toLocaleDateString(),
      //     EndDate: this.dateFormat.getYyyymmddToDate(this.formVal.EndDate).toLocaleDateString()
      //   })
      // }
  }

  createForm(){
    this._leaveReportForm = this.fb.group({
      ReportId:[,[Validators.required]],
      ReportType:[,[]],
      ExportType:['pdf',[Validators.required]],
      CompanyID:[this._compId,[]],
      EmpCode:[,[]],
      Emocode:[,[]],
      DepartmentID:[,[]],
      DepertmentId:[,[]],
      Depertment:[,[]],
      department:[,[]],
      Branch:[,[]],
      BranchID:[,[]],
      ProjectID:[,[]],
      PeriodID:[,[]],
      Grade:[-1,[]],
      GradeValue:[-1,[]],
      YearID:[,[]],
      //StartDate:[this.dateFormat.getCurrentNgbDate(),[]],
      StartDate:[,[]],
      EndDate:[,[]],
      rName:[,[]],

      //EndDate:[this.dateFormat.getCurrentNgbDate(),[]],
    })
  }
  reset(){
    this._isSubmit = false;
    this._leaveReportForm.reset();
    this._leaveReportForm.patchValue({
      CompanyID:this._compId,
      Grade: this._gradeValue,
      GradeValue: this._gradeValue,
      StartDate:this.dateFormat.getCurrentNgbDate(),
      EndDate:this.dateFormat.getCurrentNgbDate()
    })
  }
  get formVal(){
    return this._leaveReportForm.value;
  }

  get f() {
    return this._leaveReportForm.controls;
  }

}
