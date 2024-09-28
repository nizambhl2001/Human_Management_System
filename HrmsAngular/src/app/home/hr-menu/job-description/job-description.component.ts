import { ApiResponse } from './../../../models/response.model';
import { ToastrService } from 'ngx-toastr';
import { JobDescriptionMode } from './../../../models/hr/jobDescription.model';
import { AuthService } from './../../../services/auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, Input, OnInit } from '@angular/core';
import { EmploymentService } from '../../../services/hr/employment.service';

@Component({
  selector: 'app-job-description',
  templateUrl: './job-description.component.html',
  styleUrls: ['./job-description.component.scss']
})
export class JobDescriptionComponent implements OnInit {
  @Input() empCode:string;
  @Input() empName:string
  btnStatus:string='Save';
  compId:number;
  jobDescriptionModel:JobDescriptionMode[]=[];
  jobDescriptionForm:FormGroup
  constructor(
    private employmentService:EmploymentService,
    private formBuilde:FormBuilder,
    private toaster:ToastrService
  ) { }

  ngOnInit() {
    this.compId=AuthService.getLoggedCompanyId();
    this.createForm();
    this.getJobDescriptionByEmpCode();

  }
getJobDescriptionByEmpCode(){
  this.employmentService.getDiscriptionByEmpCode(this.empCode,this.compId).subscribe((response:ApiResponse)=>{
    if(response.status){
    this.jobDescriptionModel=response.result as JobDescriptionMode[];
    }
    else{
      return;
    }
  })
}
getJobDescriptionById(id:number){
  this.employmentService.getDiscriptionById(id).subscribe((response:ApiResponse)=>{
    if(response.status){
    let jobDescription=response.result as JobDescriptionMode;
    this.jobDescriptionForm.controls.description.patchValue(jobDescription.description);
    this.jobDescriptionForm.controls.id.patchValue(jobDescription.id);
    this.btnStatus='Update';
    }
    else{
      return;
    }
  })
}
  saveJobDescription(){
    if(this.jobDescriptionForm.invalid){
      this.toaster.error("Please Fill Job Description Field");
    }
    else{
    let obj=new JobDescriptionMode;
    obj.id=this.jobDescriptionForm.controls.id.value;
    obj.companyID=this.compId;
    obj.description=this.jobDescriptionForm.controls.description.value;
    obj.empCode=this.jobDescriptionForm.controls.empCode.value;
    obj.pOptions=1;
    obj.status=this.jobDescriptionForm.controls.status.value;
    console.log(obj,'obj')
   this.employmentService.saveJobDescription(obj).subscribe((response:ApiResponse)=>{
     if(response.status){
       this.btnStatus='Save';
       this.getJobDescriptionByEmpCode();
    this.toaster.success(response.result);
     }
     else{
       this.toaster.error("Fail To Save");
     }
   })
  }
}
  createForm(){
    this.jobDescriptionForm=this.formBuilde.group({
      id:[0,[]],
      empName:[this.empName,[]],
      empCode:[this.empCode,[]],
      description:[,[]],
      companyID:[this.compId,[]],
      msg:[,[]],
      pOptions:[,[]],
      status:[1,[]]
    })
  }
  reset(){
    this.jobDescriptionForm.controls.description.patchValue(null);
    this.btnStatus='Save';
  }



}
