import { AuthService } from './../../../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { Pagination } from '../../../shared/paginate';
import { FormBuilder, FormGroup, FormArray, FormControl } from '@angular/forms';
import { AttendenceService } from '../../../services/Attendance/attendence.service';
import { ToastrService } from 'ngx-toastr';
import { ApiResponse } from '../../../models/response.model';
import { AttendanceApplication } from '../../../models/Attendance/attendance-application.model';
import { ApproveAttendenceApplication } from '../../../models/Attendance/approve-attendence-application.model';

@Component({
  selector: 'app-approve',
  templateUrl: './approve.component.html',
  styleUrls: ['./approve.component.scss']
})
export class ApproveComponent extends Pagination implements OnInit {

  approveForm:FormGroup;
  comId:number;
  userId:number;
  attnApplicationItem:ApproveAttendenceApplication[]=[]
  applicationListForm:FormArray;
  constructor(
    private formBilder:FormBuilder,
    private attnService:AttendenceService,
    private toster:ToastrService
  ) {
    super();
    this.applicationListForm=this.formBilder.array([])
  }
  title="Attendance Approve";
  ngOnInit() {
    this.items = [];
    this.update();
    this.comId=AuthService.getLoggedCompanyId();
    this.userId=AuthService.getLoggedUserId();
    this.createApproveForm();
    this.getApplicationForApproveList();
  }

getApplicationForApproveList(){
  this.attnService.approveApplicationAttendenceList(this.comId,this.f['reqTo'].value,5).subscribe((response:ApiResponse)=>{
    if(response.status){
      this.attnApplicationItem=response.result as ApproveAttendenceApplication[];
    }else{
      this.attnApplicationItem=[];
    }
  });
}

onSelectEmpCode(obj:any){
  this.approveForm.controls['forwordTo'].patchValue(obj.empCode)
  this.approveForm.controls['empName'].patchValue(obj.empName)
  this.approveForm.controls['designation'].patchValue(obj.designation)
}

approveAttendence(id:number){
  let obj = new ApproveAttendenceApplication();
  obj=this.approveForm.value;
  obj.id=id;
  obj.pOption=7;
  this.attnService.approveAttendence(obj).subscribe((response:ApiResponse)=>{
    if(response.status){
      this.toster.success(response.result,"Success");
      this.getApplicationForApproveList();
      this.Reset();
    }
    else{
      this.toster.error(response.result,"Failed");
    }
  });
}

recommendAttendenceApplication(id:number){
  let obj = new ApproveAttendenceApplication();
  obj=this.approveForm.value;
  obj.id=id;
  obj.pOption=6;
  this.attnService.recommendAttendenceApplication(obj).subscribe((response:ApiResponse)=>{
    if(response.status){
      this.toster.success(response.result,"Success");
      this.getApplicationForApproveList();
      this.Reset();
    }
    else{
      this.toster.error(response.result,"Failed");
    }
  });
}



cancelAttendenceApplication(id:number){
  let obj = new ApproveAttendenceApplication();
  obj=this.approveForm.value;
  obj.id=id;
  obj.pOption=8;
  this.attnService.cancelAttendenceApplication(obj).subscribe((response:ApiResponse)=>{
    if(response.status){
      this.toster.success(response.result,"Success");
      this.getApplicationForApproveList();
      this.Reset();
    }
    else{
      this.toster.error(response.result,"Failed");
    }
  });
}


createApproveForm(){
this.approveForm=this.formBilder.group({
  companyID:[this.comId,[]],
  userID:[this.userId,[]],
  reqTo:[100002,[]],
  reqFrom:[100002,[]],
  forwordTo:[,[]],
  empName:[,[]],
  designation:[,[]]
})
}

get f(){
  return this.approveForm.controls;
}

Reset(){
  this.approveForm.reset();
  this.createApproveForm();
}

}
