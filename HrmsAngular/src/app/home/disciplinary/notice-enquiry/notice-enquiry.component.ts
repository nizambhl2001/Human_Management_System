import { AuthService } from './../../../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { Pagination } from '../../../shared/paginate';
import { NoticeEnquire } from '../../../models/disciplinary-action/notice-enquire.model';
import { NoticeEnquireService } from '../../../services/disciplinary-action/notice-enquire.service';
import { ApiResponse } from '../../../models/response.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Employment } from '../../../models/hr/employment.model';
import { EmployeeService } from '../../../services/hr/employee.service';
import { EmploymentService } from '../../../services/hr/employment.service';
import { NgbDateCustomParserFormatter } from '../../../shared/dateformat';
import { EnquireCommitty } from '../../../models/disciplinary-action/enquirecommitty.model';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-notice-enquiry',
  templateUrl: './notice-enquiry.component.html',
  styleUrls: ['./notice-enquiry.component.scss']
})
export class NoticeEnquiryComponent extends Pagination implements OnInit {

  noticeEnquiry:NoticeEnquire[]=[];
  enquireForm:FormGroup;
  userId:number;
  compId:number;
  gradeValue:number;
  enquireCommitty:EnquireCommitty[]=[new EnquireCommitty()];
  btnStatus="Save";
  isSubmitted = false;

  constructor(
    private dateFrmat:NgbDateCustomParserFormatter,
    private noticeEnqService:NoticeEnquireService,
    private formBuilder:FormBuilder,
    private employmentES:EmploymentService,
    private empService:EmploymentService,
    private toster:ToastrService
    ) {
    super();
  }
  title="Notice of Enquiry";



  ngOnInit() {
    this.items=[];
    this.update();
    this.userId=AuthService.getLoggedUserId();
    this.compId=AuthService.getLoggedCompanyId();
    this.searchKeys=['empName'];
    this.gradeValue=AuthService.getLoggedGradeValue()
    this.createNoticeEnquireform();
    this.getAll();
  }

  getEmpInfo(empCode:string){
    if (empCode == "") {
      this.Reset();
      return;
    }
    this.employmentES.getEmployment(empCode,this.compId).subscribe((response:ApiResponse)=>{
      let empInfo=response.result as Employment;
      this.enquireForm.patchValue({
       empCode:empInfo.empCode,
       empName:empInfo.empName,
       department:empInfo.department,
       designation:empInfo.designation
     })
    })
  }
saveUpdateEnquire(){
  this.isSubmitted=true;
  if(this.enquireForm.invalid){
    return;
  }else{
    this.btnStatus="Save";
  let noticeEnquireObj =new NoticeEnquire();
  noticeEnquireObj = this.enquireForm.value;
  noticeEnquireObj.dateOfEnquiry = this.dateFrmat.ngbDateToDate(this.f.dateOfEnquireNgb.value);
  noticeEnquireObj.dateOfNoticeIssue = this.dateFrmat.ngbDateToDate(this.f.dateOfNoticeIssueNgb.value);
  noticeEnquireObj.enquireCommitty=this.enquireCommitty;
  this.noticeEnqService.saveNoticeEnquire(this.enquireForm.value).subscribe((response:ApiResponse)=>{
  if(response.status){
    this.toster.success(response.result,"Success");
    this.Reset();
    this.getAll();
    this.update();
  }else{
    this.toster.error(response.result,"Failed");
  }
});
  }
}


getAll(){
  this.noticeEnqService.getAllShowCauseResult(null,this.gradeValue,this.compId).subscribe((response:ApiResponse)=>{
    if(response.status){
      this.items =response.result as NoticeEnquire[];
      this.noticeEnquiry =response.result as NoticeEnquire[];
      this.update();
    }
  })
}

getInquirEmp(index:number, empCode:string){

  this.empService.getEmployment(empCode, this.compId).subscribe((response:ApiResponse)=>{
    if(response.status){
      let emp = response.result as EnquireCommitty;
      this.enquireCommitty[index].empName = emp.empName;
      this.enquireCommitty[index].department = emp.department;
      this.enquireCommitty[index].designation = emp.designation;
      this.enquireCommitty.push(new EnquireCommitty())
    }else{
      this.enquireCommitty[index].empName = null;
      this.enquireCommitty[index].department = null;
      this.enquireCommitty[index].designation = null;
    }
  })
}
removeSelectedEmp(index){
  this.enquireCommitty.splice(index, 1);

}


getByid(id:number){
  this.btnStatus="Update";
  this.noticeEnqService.getById(id).subscribe((response:ApiResponse)=>{
    if(response.status){
      let noticeInQ = response.result as NoticeEnquire;
      this.enquireCommitty = noticeInQ.enquireCommitty;
      noticeInQ.dateOfEnquireNgb = this.dateFrmat.stringToNgbDate(noticeInQ.dateOfEnquiry.toString());
      noticeInQ.dateOfNoticeIssueNgb = this.dateFrmat.stringToNgbDate(noticeInQ.dateOfNoticeIssue.toString());
     this.getEmpInfoById(noticeInQ.empCode)
      this.enquireForm.patchValue(response.result);
    }
  })
}



getEmpInfoById(empCode: string) {
  if (empCode == "") {
    return;
  }
    this.empService.getEmployment(empCode, this.compId).subscribe((response: ApiResponse) => {


      if (response.status) {
        let empInfo = response.result as Employment;
        this.f.empName.setValue(empInfo.empName);
        this.f.department.setValue(empInfo.department);
        this.f.designation.setValue(empInfo.designation);
      }

    })
}

Reset(){
  this.btnStatus="Save";
  this.isSubmitted=false;
  this.enquireForm.reset();
  this.enquireCommitty= [new EnquireCommitty()];
  this.createNoticeEnquireform();
}

createNoticeEnquireform(){
  this.enquireForm= this.formBuilder.group({
    id :[0,[]],
    noticeID :[0,[]],
    empCode  :[,[Validators.required]],
    dateOfEnquireNgb:[0,[]],
    dateOfNoticeIssueNgb:[0,[]],
    venue :[,[]],
    note :[,[]],
    enqEmpCode :[0,[]],
    userID :[this.userId,[]],
    companyID :[this.compId,[]],
    empName:[,[]],
    empNote:[0,[]],
    designation:[,[]],
    department:[,[]],
  })
}


get f() {
  return this.enquireForm.controls;
}
get formVal() {
  return this.enquireForm.value;
}

}
