import { AuthService } from './../../../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { EmployeeForApprisal } from '../../../models/Apprisal/employee-for-apprisal';
import { ApprisalService } from '../../../services/Apprisal/apprisal.service';
import { ApiResponse } from '../../../models/response.model';
import { BasicEntryService } from '../../../services/system-setup/basic-entry.service';
import { BasicEntry } from '../../../models/system-setup/basic-entry.model';
import { Pagination } from '../../../shared/paginate';
import { SalaryYear } from '../../../models/SalarySetup/salary-year';
import { QuarterModel } from '../../../models/Apprisal/quarter-model';
import { ReportHelper } from '../../../shared/report-helper';
import { HttpErrorResponse } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { ReportService } from '../../../services/report.service';
import { EmployeeService } from '../../../services/hr/employee.service';
@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.scss'
  , '../../../../vendor/libs/ng-select/ng-select.scss'
  ,'../../../../vendor/libs/angular2-ladda/ladda.scss']
})
export class ReportComponent implements  OnInit {

  apprisalReportForm:FormGroup
  _reportTypeList: any[] = [];
  _departments:any[]=[];
  _branches:any[]=[];
  years: SalaryYear[] = [];
  quarters:QuarterModel[]=[];
  empCodes: EmployeeForApprisal[] = [];
  empCode:string;
  sortBy = 'orderNo';
  sortDesc = true;
  companyId:number;
  exporting: boolean = false;
  _isSubmit: boolean = false;

  constructor(
   private formbuilder:FormBuilder,
   private empwisekpiservice: ApprisalService,
   private basicEntryService: BasicEntryService,
   private reportHelper: ReportHelper,
   private toaster: ToastrService,
   private empService:EmployeeService,
   private reportservice:ReportService
  ) { }

  ngOnInit() {
    this.companyId=AuthService.getLoggedCompanyId();
    this.createReportForm();
    this.getReportTypeList();
    this.empCode=AuthService.getLoggedEmpCode();
    this.getEmployeeCode();
    this.getDepartments();
    this.getYear();
    this.getBranches();
  }
  getReportTypeList() {
    if(this.empCode='100005'){
      this._reportTypeList = [
        { ReportId: 193, TypeName: 'Quarter Wise Details' },
        { ReportId: 194, TypeName: 'Single Emp Yearly Details' },
        { ReportId: 195, TypeName: 'All Emp Yearly Summary' },
        { ReportId: 203, TypeName: 'Yearly Promotion List' },
        { ReportId: 196, TypeName: 'Yearly Summary' },
        { ReportId: 198, TypeName: 'YTD Report' }
      ]
    }else{
    this._reportTypeList = [
      { ReportId: 193, TypeName: 'Quarter Wise Details' },
      { ReportId: 194, TypeName: 'Single Emp Yearly Details' },
      { ReportId: 195, TypeName: 'All Emp Yearly Summary' },
      { ReportId: 203, TypeName: 'Yearly Promotion List' },
      { ReportId: 196, TypeName: 'Yearly Summary' },
      { ReportId: 198, TypeName: 'YTD Report' }
    ]
  }
  }
  getDepartments() {
    this.basicEntryService.getDepartment().subscribe((response: ApiResponse) => {
      if (response.status) {
        this._departments = response.result as BasicEntry[];
        this.sortBy = 'description';
        this.sortDesc = false;
      }
    })
  }
  getBranches() {
    this.basicEntryService.getBranch().subscribe((response: ApiResponse) => {
      if (response.status) {
        this._branches = response.result as BasicEntry[];
        this.sortBy = 'description';
      }
    })
  }
  getEmployeeCode() {
    this.empService.getEmpByBoss(this.empCode).subscribe((response: ApiResponse) => {
      if (response.status) {
        this.empCodes = response.result as EmployeeForApprisal[];

      }
      this.getQuarter();
    })
  }
  getYear() {
    this.empwisekpiservice.getYear().subscribe((response: ApiResponse) => {
      if (response.status) {
        this.years = response.result as SalaryYear[];
      }
    })
  }
  getQuarter() {
    this.empwisekpiservice.getAllQuarter().subscribe((Response: ApiResponse) => {
      if (Response.status) {
        this.quarters = Response.result as QuarterModel[];
      }
    })
  }
  reset(){
    this.createReportForm();
  }
  export() {
    this.exporting = true;
    this._isSubmit = true;
    let formVal = this.getReadyFormVal();
    if(this.apprisalReportForm.invalid){
      this.exporting = false;
      this.toaster.error('Invalid Submission.');
      return;
    }
    this.reportservice.getApprisalReport(formVal)
      .subscribe(
        (exportedFile:Blob) => {
          this.exporting = false;
          this.reportHelper.openFileWindow(exportedFile, 'test');
        },
        (err: HttpErrorResponse) => {
          this.exporting = false;
          this.toaster.error(err.message, 'Failed!');
        })
  }

  getReadyFormVal(): any {
    let frmVal = this.apprisalReportForm.value;
    if (frmVal.depertment == null) {
      this.apprisalReportForm.patchValue({
        DepartmentID: -1,
        depertment: -1
      })
    }
    else{
      this.apprisalReportForm.patchValue({
        DepartmentID: frmVal.depertment
      })
    }

    if (frmVal.BranchID == null) {
      this.apprisalReportForm.patchValue({
        BranchID: -1,
        Brance: -1
      });
    }
    return this.apprisalReportForm.value;
  }


createReportForm(){
this.apprisalReportForm=this.formbuilder.group({
  ReportId:[,[Validators.required]],
  ExportType:['pdf',[Validators.required]],
  empCode:[,[]],
  YearId:[,[]],
  QuarterId:[,[]],
  DepartmentID:[,[]],
  BranchID:[,[]],
  companyID:[this.companyId],
  KpiType:[-1,[]],
  OfficeBranch:[-1,[]],
  department:[,[]]
})
}
get formVal() {
  return this.apprisalReportForm.value;
}
}
