import { AuthService } from './../../../services/auth.service';
import { retry } from 'rxjs/operators';
import { DesignationComponent } from './../../system-setup/basic-entry/designation/designation.component';
import { ToastrService } from 'ngx-toastr';
import { BasicEntry } from './../../../models/system-setup/basic-entry.model';
import { NgbDateCustomParserFormatter } from './../../../shared/dateformat';
import { ApiResponse } from './../../../models/response.model';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Employment } from '../../../models/hr/employment.model';
import { EmploymentService } from '../../../services/hr/employment.service';
import { AdditionalDuties } from '../../../models/hr/additional-duties.model';
import { AdditionalDutiesService } from '../../../services/hr/additional-duties.service';
import { BasicEntryService } from '../../../services/system-setup/basic-entry.service';

@Component({
  selector: 'app-additional-duties',
  templateUrl: './additional-duties.component.html',
  styleUrls: ['./additional-duties.component.scss',
  '../../../../vendor/libs/angular-2-dropdown-multiselect/angular-2-dropdown-multiselect.scss',
  '../../../../vendor/libs/ng-select/ng-select.scss']
})
export class AdditionalDutiesComponent implements OnInit {
  btnStatus:string="Save";
  compId:number;
  userID:number;
  pOption:number;
  isSubmitted = false;
  additionalDuties:AdditionalDuties[]=[];
  allDepartment:BasicEntry[]=[];
  allDesignation:BasicEntry[]=[];
  allUnit:BasicEntry[]=[];
  additionalDutiesForm:FormGroup;
  constructor(
    private basicES: BasicEntryService,
    private formBuilder:FormBuilder,
    private employmentES:EmploymentService,
    private dateFormate:NgbDateCustomParserFormatter,
    private additionalDutiesES:AdditionalDutiesService,
    private toasterService:ToastrService,
  ) { }

  ngOnInit() {
    this.compId=AuthService.getLoggedCompanyId();
    this.userID=AuthService.getLoggedUserId();
    this.createForm();
    this.getAll();
  }
  getEmpInfo(empCode:string){
    if (empCode == "") {
      this.reset();
      return;
    }
    this.employmentES.getEmployment(empCode,this.compId).subscribe((response:ApiResponse)=>{
      let empInfo=response.result as Employment;
      this.additionalDutiesForm.patchValue({
       empCode:empInfo.empCode,
       empName:empInfo.empName,
       departmentName:empInfo.department,
       designationName:empInfo.designation,
       joinDateNgb:this.dateFormate.stringToNgbDate(empInfo.joinDate)
     })
    })
  }
  save(){
    this.isSubmitted=true;
      if(this.additionalDutiesForm.invalid){
        this.toasterService.warning("Fill Required Fields");
        return;
      }
      else{
    this.additionalDutiesForm.controls.effFromDate.setValue(this.dateFormate.ngbDateToDate(this.additionalDutiesForm.controls.effFromDateNgb.value).toLocaleDateString());
    this.additionalDutiesForm.controls.effToDate.setValue(this.dateFormate.ngbDateToDate(this.additionalDutiesForm.controls.effToDateNgb.value).toLocaleDateString());
    this.additionalDutiesForm.controls.noticeIssuedDate.setValue(this.dateFormate.ngbDateToDate(this.additionalDutiesForm.controls.noticeIssuedDateNgb.value).toLocaleDateString());

    if(this.additionalDutiesForm.controls.id.value==null || this.additionalDutiesForm.controls.id.value==0){
     this.additionalDutiesForm.controls.pOptions.setValue(1);
    }
    else{
      this.additionalDutiesForm.controls.pOptions.setValue(2);
    }
    this.additionalDutiesES.saveUpdate(this.additionalDutiesForm.value).subscribe((response:ApiResponse)=>{
      if(response.status){
      this.toasterService.success(response.result);
      this.isSubmitted=false;
      this.getAll();
      this.reset();
      }
      else{
        this.toasterService.error(response.result);
    }
    })
  }
}
getAll(){
this.additionalDutiesES.getAll().subscribe((response:ApiResponse)=>{
  if(response.status){
  this.additionalDuties=response.result as AdditionalDuties[];
  }
  else{

  }
})
}
getById(id: number) {
  this.additionalDutiesES.getById(id).subscribe((response: ApiResponse) => {
    if (response.status) {
      let additionalDuty=response.result as AdditionalDuties;
      additionalDuty.effFromDateNgb= this.dateFormate.stringToNgbDate(additionalDuty.effFromDate);
      additionalDuty.effToDateNgb=this.dateFormate.stringToNgbDate(additionalDuty.effToDate);
      additionalDuty.noticeIssuedDateNgb=this.dateFormate.stringToNgbDate(additionalDuty.noticeIssuedDate);
      this.additionalDutiesForm.patchValue(additionalDuty);
      this.getEmpInfo(additionalDuty.empCode);
      this.btnStatus = "Update"
    }
  })
}
createForm(){
this.additionalDutiesForm=this.formBuilder.group({
  id:[,[]],
  empCode:[,[Validators.required]],
  payType:[,[Validators.required]],
  department:[,[Validators.required]],
  designation:[,[Validators.required]],
  empName:[,[]],
  designationName:[,[]],
  departmentName:[,[]],
  joinDate:[,[]],
  joinDateNgb:[,[]],
  schoolorOffice:[,[Validators.required]],
  responsibilities:[,[Validators.required]],
  noticeIssuedDate:[,[]],
  noticeIssuedDateNgb:[,[Validators.required]],
  effFromDate:[,[]],
  effFromDateNgb:[,[Validators.required]],
  effToDate:[,[]],
  effToDateNgb:[,[Validators.required]],
  companyID:[this.compId,[]],
  duration:[,[Validators.required]],
  pOptions:[,[]],
  amount:[,[]],
  remark:[,[]],
  userID:[this.userID,[]],
  msg:[,[]],
})
}
get f(){
  return this.additionalDutiesForm.controls;
}
get formVal() {
  return this.additionalDutiesForm.value;
}
reset(){
  this.createForm();
  this.btnStatus="Save";
  this.isSubmitted=false;
}
}
