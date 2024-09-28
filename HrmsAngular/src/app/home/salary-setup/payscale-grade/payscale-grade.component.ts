import { AuthService } from './../../../services/auth.service';
import { SalarySetupService } from './../../../services/SalarySetup/salary-setup.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiResponse } from './../../../models/response.model';
import { Component, OnInit } from '@angular/core';
import { Pagination } from '../../../shared/paginate';
import { PayscaleModel } from '../../../models/SalarySetup/payscal';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-payscale-grade',
  templateUrl: './payscale-grade.component.html',
  styleUrls: ['./payscale-grade.component.scss']
})
export class PayscaleGradeComponent extends Pagination implements OnInit {

  constructor(
    private payscaleservice:SalarySetupService,
    private formBuilder:FormBuilder,
    private toaster:ToastrService
  ) {
    super()
   }
  payscaleModel:PayscaleModel[]=[];
spNo:number;
companyId:number;
payscaleform:FormGroup;
btnStatus='Save';
isSaveBtnClick=false;

  ngOnInit() {
    this.items=[];
    this.companyId=AuthService.getLoggedCompanyId();
    this.getAll();
    this.createForm();
    this.searchKeys = ['payScale']
  }


getAll(){
  this.payscaleservice.getAllpayscale(this.companyId,4).subscribe((response:ApiResponse)=>{
    if(response.status){
      this.items=response.result as PayscaleModel[];
      this.payscaleModel=response.result as PayscaleModel[];
      this.update();
    }
  })
}

getById(id:number){
  this.btnStatus='Update';
  this.payscaleservice.getAllpayscaleById(id).subscribe((response:ApiResponse)=>{
    if(response.status){
      this.payscaleform.patchValue(response.result);
    }
  })
}
save(){
this.isSaveBtnClick=true;
if(this.payscaleform.invalid){
  this.toaster.error("Please fill the all required fields","Invalid Submission");
  return;
}
this.payscaleservice.saveUpdatePayscale(this.payscaleform.value,1).subscribe((response:ApiResponse)=>{
if(response.status){
  this.toaster.success(response.result,"Success!");
  this.reset();
  this.getAll();
}else{
  this.toaster.error(response.result ,"Failed!")
}
})

}
Update(){
  this.payscaleservice.saveUpdatePayscale(this.payscaleform.value,2).subscribe((response:ApiResponse)=>{
    if(response.status){
      this.toaster.success(response.result,"Updated!");
      this.reset();
      this.getAll();
    }else{
      this.toaster.error(response.result ,"Failed!")
    }
    })
}
onSubmit(){
if(this.btnStatus=='Save')
this.save();
else
this.Update();

}
reset() {
  this.isSaveBtnClick=false;
  this.payscaleform.reset();
  this.createForm();
  this.btnStatus='Save';
}
createForm(){
this.payscaleform=this.formBuilder.group({
  id :[0,[]],
  payScale :[,[Validators.required]],
  salaryGradeID :[,[]],
  companyID :[this.companyId,[]],
  msg:[,[]],
})
}
get f(){
  return this.payscaleform.controls;
}

}
