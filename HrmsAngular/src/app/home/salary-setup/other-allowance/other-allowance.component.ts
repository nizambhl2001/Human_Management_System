import { AuthService } from './../../../services/auth.service';
import { get } from 'http';
import { SalarySetupService } from './../../../services/SalarySetup/salary-setup.service';
import { OtherAllowanceDetails } from './../../../models/SalarySetup/other-selected-item.model';
import { OtherAllowance } from './../../../models/SalarySetup/other-allowance.model';
import { SalaryHead } from './../../../models/SalarySetup/salary-head';
import { SalaryGradeModel } from './../../../models/system-setup/salary-grader.model';
import { FormGroup, FormBuilder, FormArray, FormControl, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Pagination } from '../../../shared/paginate';
import { SalaryGradeService } from '../../../services/system-setup/slary-grade.service';
import { ApiResponse } from '../../../models/response.model';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-other-allowance',
  templateUrl: './other-allowance.component.html',
  styleUrls: ['./other-allowance.component.scss','../../../../vendor/libs/ng-select/ng-select.scss']
})
export class OtherAllowanceComponent extends Pagination implements OnInit {
  constructor(
    private formBuilder:FormBuilder,
    private salaryGradeES:SalaryGradeService,
    private salaryHeadService:SalarySetupService,
    private otherAllowanceService:SalarySetupService,
    private toaster:ToastrService

  ) {
    super();
    this._otherAllowanceDetailsForm = this.formBuilder.array([]);
  }
  OtherAllowanceForm:FormGroup;
  allSalaryGrade:SalaryGradeModel[]=[];
  allsalaryHeadModel:SalaryHead[]=[];
  otherallowanceModel:OtherAllowance[]=[];
  _otherAllowanceDetailsForm:FormArray;
  companyID:number;
  isSaveBtnClick = false;

  ngOnInit() {
    this.items=[];
    this.update;
    this.companyID=AuthService.getLoggedCompanyId();
    this.createForm();
    this.AllSalaryGrade();
    this.getAllSalaryHead();

  }
  AllSalaryGrade() {
    this.salaryGradeES.GetSalaryGrade().subscribe((response:ApiResponse) => {
      if (response.status) {
        this.allSalaryGrade = response.result as SalaryGradeModel[];
      }
    })
  }

  getAllSalaryHead(){
    this.salaryHeadService.getAllSalaryHead().subscribe((response:ApiResponse)=>{
      if(response.status){
        this.allsalaryHeadModel=response.result as SalaryHead[];
      }
    })
  }
selectedPayScale(gradeName:string){
if(gradeName==""){return;}else{
  this.otherAllowanceService.getAllOtherAllowance(gradeName).subscribe((response:ApiResponse)=>{
    if(response.status){
      let details = response.result as OtherAllowanceDetails[];
      this._otherAllowanceDetailsForm = this.formBuilder.array([]);
      details.forEach(payscal=>{
        this._otherAllowanceDetailsForm.push(
          new FormGroup({
            payscaleID: new FormControl(payscal.id,[Validators.required]),
            amount: new FormControl(payscal.amount,[Validators.required]),
            gradeValue:new FormControl(payscal.gradeValue, [])
          })
        )
      })

    }
    else{
      this._otherAllowanceDetailsForm = this.formBuilder.array([]);
    }
  })
}
}
save(){
  this.isSaveBtnClick = true;
  if(this.f.payscaleID.invalid || this._otherAllowanceDetailsForm.invalid){
    this.toaster.error('Fill all required field!', 'Invalid Submission!');
    return;
  }
  let otherallwnce=new OtherAllowance();
  otherallwnce=this.OtherAllowanceForm.value;
  otherallwnce.payscaleDeails=this._otherAllowanceDetailsForm.value;
  this.otherAllowanceService.saveOtherAllowance(otherallwnce).subscribe((response:ApiResponse)=>{
    if(response.status){
      this.toaster.success(response.result,"Success!");
      this.reset();
    }
    else
    {
      this.toaster.error(response.result,"Failed!");
    }
  })
}
reset(){
  this.isSaveBtnClick = false;
  this.OtherAllowanceForm.reset();
  this.createForm();
}
createForm(){
this.OtherAllowanceForm=this.formBuilder.group({
  id   :[0,[]],
  salaryHeadID  :[,[Validators.required]],
  sortOrder  :[0,[]],
  companyID  :[this.companyID,[]],
  payscaleID:[,[Validators.required]],
 amount:[,[]]

})
}
get f(){
  return this.OtherAllowanceForm.controls;
}

}
