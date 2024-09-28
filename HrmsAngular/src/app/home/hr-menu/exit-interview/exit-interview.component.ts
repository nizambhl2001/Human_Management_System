import { AuthService } from './../../../services/auth.service';
import { NgbDateCustomParserFormatter } from './../../../shared/dateformat';
import { ToastrService } from 'ngx-toastr';
import { FormGroup, FormBuilder, FormArray, FormControl, Validators } from '@angular/forms';
import { ApiResponse } from './../../../models/response.model';
import { Component, OnInit } from '@angular/core';
import { LeavingReasonModel } from '../../../models/hr/leaving-reason.model';
import { LeavingReasonService } from '../../../services/hr/leaving-reason.service';
import { Employment } from '../../../models/hr/employment.model';
import { EmploymentService } from '../../../services/hr/employment.service';
import { ExitIntyerviewService } from '../../../services/hr/exit-interview.service';

@Component({
  selector: 'app-exit-interview',
  templateUrl: './exit-interview.component.html',
  styleUrls: ['./exit-interview.component.scss']
})
export class ExitInterviewComponent implements OnInit {
  isSubmitted=false;
  exitInterViewForm:FormGroup;
  compId:number;
  leaveReasonForm:FormArray;
  leavingReasonModel:LeavingReasonModel[]=[];
  constructor(
    private leavingReasonService:LeavingReasonService,
    private formBuilder:FormBuilder,
    private exitInterviewService:ExitIntyerviewService,
    private employmentES:EmploymentService,
    private toasterService:ToastrService,
    private dateFormate:NgbDateCustomParserFormatter
  ) {
    this.leaveReasonForm=this.formBuilder.array([]);
  }

  ngOnInit() {
    this.compId=AuthService.getLoggedCompanyId();
    this.createForm();
    this.getAllLeavingreason();
  }
getAllLeavingreason(){
this.leavingReasonService.getAllLeavingReason().subscribe((response:ApiResponse)=>{
  if(response.status){
  (response.result as LeavingReasonModel[]).forEach(reason=>{
    this.leaveReasonForm.push(new FormGroup({
      isSelected : new FormControl(false, []),
      leavingReasonID:new FormControl(reason.leavingReasonID,[]),
      leavingReason:new FormControl(reason.leavingReason,[]),
      reasonPerchentage:new FormControl(null,[])
    }))
  })
  }
})
}
get g(){
  return this.leaveReasonForm.controls;
}
onSelectAll(isSelect:boolean){
  this.leaveReasonForm.controls.forEach(reasonForm=>{
    reasonForm.get('isSelected').patchValue(isSelect)
  })
}
getEmpInfo(empCode:string){
  if (empCode == "") {
    this.reset();
    return;
  }
  this.employmentES.getEmployment(empCode,this.compId).subscribe((response:ApiResponse)=>{
    let empInfo=response.result as Employment;
    this.exitInterViewForm.patchValue({
     empCode:empInfo.empCode,
     empName:empInfo.empName,
     designation:empInfo.designation
   })
   let reportTo=empInfo.reportTo;
   this.employmentES.getEmployment(reportTo,this.compId).subscribe((response:ApiResponse)=>{
     let reportToempInfo=response.result as Employment;
     this.exitInterViewForm.patchValue({
      interViewer:reportToempInfo.empCode,
      ivName:reportToempInfo.empName,
      ivDesignation:reportToempInfo.designation
     })
   })
  })
}
getIVEmpInfo(interViewer:string){
  if (interViewer == "") {
    this.reset();
    return;
  }
  this.employmentES.getEmployment(interViewer,this.compId).subscribe((response:ApiResponse)=>{
    let empInfo=response.result as Employment;
    this.exitInterViewForm.patchValue({
      interViewer:empInfo.empCode,
      ivName:empInfo.empName,
      ivDesignation:empInfo.designation
   })
  })
}
submit(){
  this.exitInterViewForm.patchValue({
    leavingReason:this.leaveReasonForm.value.filter(c=>c.isSelected==true)
  })
  this.f.dateOfInterview.setValue(this.dateFormate.ngbDateToString(this.f.dateOfInterviewNgb.value))
  this.isSubmitted=true;
  if(this.exitInterViewForm.invalid){
    this.toasterService.warning("Fill Required Fields");
    return;
  }
  else if(this.leaveReasonForm.length == 0){
   this.toasterService.error("No Reason Found");
   return;
  }
  else{
  this.exitInterviewService.interviewSave(this.exitInterViewForm.value).subscribe((response:ApiResponse)=>{
    if(response.status){
 this.toasterService.success(response.result,"Success");
 this.isSubmitted=false;
 this.reset();
    }
  })
  }
}
createForm(){
  this.exitInterViewForm=this.formBuilder.group({
    id:[,[]],
    empCode:[,[Validators.required]],
    empName:[,[]],
    designation:[,[]],
    leavingReason:[,[]],
    interViewer:[,[Validators.required]],
    ivName:[,[]],
    ivDesignation:[,[]],
    dateOfInterview:[,[]],
    dateOfInterviewNgb:[,[Validators.required]],
    outOfPayroll:[,[]],
  })
}
get f(){
  return this.exitInterViewForm.controls;
}
get formValue(){
  return this.exitInterViewForm.value;
}
reset(){
  this.createForm();
  this.isSubmitted=false;
  this.leaveReasonForm=this.formBuilder.array([]);
}


}
