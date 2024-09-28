import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../../services/auth.service';
import { ApiResponse } from '../../../models/response.model';
import { AttendenceService } from '../../../services/Attendance/attendence.service';
import { AttendenceSummery } from '../../../models/Attendance/attendence-summery.model';
import { AttendenceReport } from '../../../models/Attendance/attendence-report.model';
import { Helper } from '../../../shared/helper'; 
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-attendance-report-view',
  templateUrl: './attendance-report-view.component.html',
  styleUrls: ['./attendance-report-view.component.scss',
  '../../../../vendor/libs/ng-select/ng-select.scss',
  '../../../../vendor/libs/angular2-ladda/ladda.scss']
})
export class AttendanceReportViewComponent implements OnInit {


  attendanceReportViewForm: FormGroup;
  attendanceReportViewList: any[] = [];
  userId:number;
  empCode:string;
  userTypeId:number;
  companyID: number;
  isSubmitted: boolean = false;
  exporting: boolean = false;
  gradeValue: number;
  items: any[] = [];
  itemsFilter: any[] = [];
  reportId;number;

  pageId:number=310 // set of pagein attendance of data view
  constructor(private fb: FormBuilder,private attenService:AttendenceService,
    private toster:ToastrService

     
  ) { }

  ngOnInit() {

    this.companyID = AuthService.getLoggedCompanyId();
    this.gradeValue = AuthService.getLoggedGradeValue();
    this.userId = AuthService.getLoggedUserId();
    
    this.userTypeId = AuthService.getLoggedUserTypeId();
    this.empCode = AuthService.getLoggedEmpCode();
    this.attendanceReportList();
 
      this.createForm();
 
  }

  attendanceReportList() {
    this.attendanceReportViewList = [
      //{ ReportId: 44, TypeName: 'Shift Report' },
      { ReportId: 54, TypeName: 'Single Emp In Out Report' },
      { ReportId: 49, TypeName: 'Missing Punch Report' },
      { ReportId: 45, TypeName: 'Late Comer' },
    //  { ReportId: 46, TypeName: 'In Out Report' },
      // { ReportId: 47, TypeName: 'In Out Total Hour Report' },
      // { ReportId: 48, TypeName: 'Night Allowance Report' },
     
      { ReportId: 50, TypeName: 'Daily In Out Report' },
      // { ReportId: 51, TypeName: 'Punch Report' },
      // { ReportId: 52, TypeName: 'Report Shift Assainging Painding' },
      { ReportId: 53, TypeName: 'Attendance Summery' },      
      // { ReportId: 57, TypeName: 'App Punch Report' },
    ];   
  }

  otday:number;
  showAttendenceReport() {
    // debugger
    // if(this.attendanceReportViewForm.controls['EmpCode'].value==null &&  this.userTypeId==3){
    //  this.toster.error('Please Select Employee Id')
    //   return
    // }

    this.exporting = true;
    // this.isShowData = false;
    // this.isForEdit = true;
    // this.isLoading = true;
    if (this.attendanceReportViewForm.invalid) {
      //this.toster.warning("Fill Required Fields");
    } else {
      let obj = new AttendenceReport();
      obj.EmpCode = this.attendanceReportViewForm.controls['EmpCode'].value;
      obj.StartDate = this.attendanceReportViewForm.controls['StartDate'].value;
      obj.EndDate = this.attendanceReportViewForm.controls['EndDate'].value;
      obj.CompanyID = this.attendanceReportViewForm.controls['CompanyID'].value;
      obj.CompanyID = this.attendanceReportViewForm.controls['CompanyID'].value;
      obj.ReportId = this.attendanceReportViewForm.controls['ReportId'].value;
      obj.BranchID = this.attendanceReportViewForm.controls['BranchID'].value;
      obj.DepartmentID = this.attendanceReportViewForm.controls['DepartmentID'].value;
      obj.ProjectID = this.attendanceReportViewForm.controls['ProjectID'].value;
      obj.PeriodID = this.attendanceReportViewForm.controls['PeriodID'].value;

  
      this.attenService.showAttendenceReportData(obj).subscribe((response: ApiResponse) => {
        if (response.status) {
          
          (response.result as any[]).forEach(item => {
            item.workingDay = item.totalMDay -( Number(item.holyd)+ Number(item.day)+Number(item.lwpQty)+ Number(item.lWtPQty));
            item.lvePresent =item.atten*1 + item.lwpQty*1 + item.lWtPQty*1;
            item.absent =item.workingDay - item.lvePresent ;
            item.absent = item.absent < 1 ? 0 : item.absent;

            //letes value converted in otday
            item.lates=  item.atten- item.workingDay 
            item.lates= item.lates <1 ? 0:item.lates;


              
          })
          this.items = response.result as any[];
          console.log("Response.status",response.status)
          this.itemsFilter = response.result as any[];
          this.exporting = false;
          console.log("this.items",this.items)
        } else {
          this.items = [];
        }
        // this.isLoading = false;
      })
      // ,err=>{
      //   this.toster.error('An unexpected error occured');
      //   console.error(err);
      //   this.isLoading = false;
      // }

    }

  }


  onSearch(searchKey: string) {
    if (searchKey) {
      this.items = this.itemsFilter.filter(cus => (
        (cus.empCode as string).toLocaleLowerCase().match(searchKey.toLocaleLowerCase()) ||
        (cus.empName as string).toLocaleLowerCase().match(searchKey.toLocaleLowerCase())||
        (Helper.isNullOrEmpty(cus.empCode) ? '' : cus.empCode as string).toLocaleLowerCase().match(searchKey.toLocaleLowerCase())
      ))
    } else {
      this.items = this.itemsFilter;
    }
  }

  reset(){
    // this.createForm();
    this.exporting = false;

  }

  createForm() {
if(this.userTypeId==9 || this.userTypeId == 4){
    this.attendanceReportViewForm = this.fb.group({
      ReportId: [, [Validators.required]],
      EmpCode: [, []],
      CompanyID: [this.companyID, []],
      GradeValue: [, []],
      BranchID: [, []],
      DepartmentID: [, []],
      Location: [, []],
      strDate: [, []],
      StartDate: [, []],
      EndDate: [, []],
      ProjectID: [, []],
      PeriodID: [, []]
    })
  }else{
    this.attendanceReportViewForm = this.fb.group({
      ReportId: [, [Validators.required]],
      EmpCode: [this.empCode, []],
      CompanyID: [this.companyID, []],
      GradeValue: [, []],
      BranchID: [, []],
      DepartmentID: [, []],
      Location: [, []],
      strDate: [, []],
      StartDate: [, []],
      EndDate: [, []],
      ProjectID: [, []],
      PeriodID: [, []]
    })
  }
  }



  get f() {
    return this.attendanceReportViewForm.controls;
  }
  get formVal() {
    return this.attendanceReportViewForm.value;
  }

}
