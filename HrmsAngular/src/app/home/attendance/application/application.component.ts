import { AuthService } from './../../../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { Pagination } from '../../../shared/paginate';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { BasicEntry } from '../../../models/system-setup/basic-entry.model';
import { SearchEmployee } from '../../../models/hr/search-emp.model';
import { get } from 'http';
import { Employment } from '../../../models/hr/employment.model';
import { EmploymentService } from '../../../services/hr/employment.service';
import { ApiResponse } from '../../../models/response.model';
import { AttendenceService } from '../../../services/Attendance/attendence.service';
import { AttendanceApplication } from '../../../models/Attendance/attendance-application.model';
import { NgbDateCustomParserFormatter } from '../../../shared/dateformat';

@Component({
  selector: 'app-application',
  templateUrl: './application.component.html',
  styleUrls: [
    './application.component.scss'
]
})
export class ApplicationComponent extends Pagination implements OnInit {

  attendenceAppForm:FormGroup;
  attendenceItem:AttendanceApplication[]=[];
  comId:number;
  userId:number;
  isSubmitted=false;
  btnStatus="Save";

  constructor(
    private formBuilder:FormBuilder,
    private toster:ToastrService,
    private employment:EmploymentService,
    private attendenceService:AttendenceService,
    private dateFormat:NgbDateCustomParserFormatter

  ) {
    super();
  }
  title="Application for Attendance";
  inTime = {hour: 13, minute: 30, second: 30};
  outTime = {hour: 13, minute: 30, second: 30};

  ngOnInit() {
    this.items = [];
    this.update();
    this.comId=AuthService.getLoggedCompanyId();
    this.userId=AuthService.getLoggedUserId();
    this.btnStatus="Save";
    this.createAttendenceForm();

  }

  getEmpInfo(empCode:string){
 this.employment.getEmployment(empCode,this.comId).subscribe((response:ApiResponse)=>{
   let empInfo=response.result as Employment;
   let reqTo=empInfo.reportTo;
   this.attendenceAppForm.patchValue({
     empCode:empInfo.empCode,
     empName:empInfo.empName,
     empDesignation:empInfo.designation,
     department:empInfo.department

   })
   this.employment.getEmployment(reqTo,this.comId).subscribe((response:ApiResponse)=>{
     let toEmpInfo=response.result as Employment;
     this.attendenceAppForm.patchValue({
       reqTo:toEmpInfo.empCode,
       toEmpName:toEmpInfo.empName,
       toEmpDesignation:toEmpInfo.designation
     })
   })
 })
  }

  applyToEmpInfo(empCode:string){
    this.employment.getEmployment(empCode,this.comId).subscribe((response:ApiResponse)=>{
      let empInfo=response.result as Employment;
      this.attendenceAppForm.patchValue({
        reqTo:empInfo.empCode,
        toEmpName:empInfo.empName,
        toEmpDesignation:empInfo.designation
      })
    })
  }

  saveAttendenceApplication(){
    this.isSubmitted=true;
    this.btnStatus="Save";
      if(this.attendenceAppForm.invalid){
        //this.toster.warning("Fill Required Fields");
      }else{
       this.attendenceService.saveOrUpdateAttendenceApplication(1,this.attendenceAppForm.value).subscribe((response:ApiResponse)=>{
         if(response.status){
           this.toster.success(response.result,"Success");
           this.getAttendenceListByEmpCode(this.f.empCode.value);
           this.Reset();
         }else{
           this.toster.error(response.result,"Failed");
         }
       });
      }
    }

    updateAttendence(){
      this.isSubmitted=true;
          if(this.attendenceAppForm.invalid){
            //this.toster.warning("Fill Required Fields");
          }else{
            this.attendenceService.saveOrUpdateAttendenceApplication(2,this.attendenceAppForm.value).subscribe((response:ApiResponse)=>{
              if(response.status){
                this.toster.success(response.result,"Success");
                this.getAttendenceListByEmpCode(this.f.empCode.value)
                this.Reset();
              }else{
                this.toster.error(response.result,"Failed");
              }
            });
          }
    }



    getAttendenceListByEmpCode(empCode:string){
      this.getEmpInfo(empCode);
      this.attendenceService.getAttendenceListtByEmpCode(empCode,this.comId,4).subscribe((response:ApiResponse)=>{
        if(response.status){
          this.items=response.result as AttendanceApplication[];
          this.attendenceItem=response.result as AttendanceApplication[];
          this.update();
        }else{
          this.items=[];
          this.update();
          this.attendenceItem=[];
        }
      });
    }

getAttendenceById(id:number){
  this.btnStatus="Update";
  this.attendenceService.getAttendenceById(id).subscribe((response:ApiResponse)=>{
    if(response.status){
      this.attendenceAppForm.patchValue(response.result);
      let attendanceApp:AttendanceApplication=response.result as AttendanceApplication;
      this.attendenceAppForm.patchValue(attendanceApp)
      this.attendenceAppForm.patchValue({
        attnDateNgb:this.dateFormat.stringToNgbDate(attendanceApp.attnDate.toString()),
        inTimeNgb: this.dateFormat.getStrToNgbTime(attendanceApp.inTime),
        outTimeNgb:this.dateFormat.getStrToNgbTime(attendanceApp.outTime)
    })

    this.getEmpInfo(attendanceApp.empCode);
    }
  })
}




onSubmit(){
  if(this.btnStatus=="Save"){
    this.saveAttendenceApplication();
  }else{
    this.updateAttendence();
  }
}

  createAttendenceForm(){
    this.attendenceAppForm= this.formBuilder.group({
      id:[0,[]],
      empCode:[,[Validators.required]],
      reason:[,[Validators.required]],
      attnDate:[,[]],
      attnDateNgb:[,[Validators.required]],
      inTime:[,[]],
      outTime:[,[]],
      inTimeNgb :[,[]],
      outTimeNgb :[,[]],
      approveType:[0,[]],
      userID:[this.userId,[]],
      companyID:[this.comId,[]],
      empDesignation:[,[]],
      empName: [,[]],
      department: [,[]],
      toEmpName:[,[]],
      reqTo:[,[]],
      toEmpDesignation:[,[]],
    })
  }

  get f(){
   return this.attendenceAppForm.controls;
  }

  Reset(){
    this.btnStatus="Save";
    this.isSubmitted=false;
    this.attendenceAppForm.reset();
    this.createAttendenceForm();
    this.items=[];
    this.update();

  }

}
