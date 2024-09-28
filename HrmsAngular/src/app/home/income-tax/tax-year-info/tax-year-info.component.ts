import { AuthService } from './../../../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { TaxYearInfoService } from '../../../services/incomeTax/tax-year-info.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { TaxYearInfo } from '../../../models/incomeTax/tax-year-info.model';
import { ApiResponse } from '../../../models/response.model';
import { NgbDateCustomParserFormatter } from '../../../shared/dateformat';
import { ToastrService } from 'ngx-toastr';
import { format } from 'util';

@Component({
  selector: 'app-tax-year-info',
  templateUrl: './tax-year-info.component.html',
  styleUrls: ['./tax-year-info.component.scss']
})
export class TaxYearInfoComponent implements OnInit {



taxYearInfoForm:FormGroup;
taxYearInfo:TaxYearInfo[]=[];
comId:number;
taxifID:number;
isSubmitted = false;
userID:number;
  constructor(
    private taxyearinfoService:TaxYearInfoService,
    private formBuilder:FormBuilder,
    private dateFormate:NgbDateCustomParserFormatter,
    private toster:ToastrService
  ) { }

  ngOnInit() {
    this.comId=AuthService.getLoggedCompanyId();
    this.taxifID=1;
    this.createTaxForm();
    this.getAllList();
  }

saveTaxYearIn(){
  this.isSubmitted=true;
  if(this.taxYearInfoForm.invalid){
    this.toster.warning("Fill Required Fields");
    return;
  }else{
    let obj= new TaxYearInfo();
  obj= this.taxYearInfoForm.value;
  obj.startDate=this.dateFormate.getNgbDateToYyyy_mm_dd(this.f.startDateNgb.value)
  obj.endDate=this.dateFormate.getNgbDateToYyyy_mm_dd(this.f.endDateNgb.value)
  this.taxyearinfoService.saveTaxYearInfo(this.taxYearInfoForm.value).subscribe((response:ApiResponse)=>{
    if(response.status){
   this.toster.success(response.result,"Success");
   this.Reset();
   this.getAllList();
  }
  else{
    this.toster.error(response.result,"Failed!!");
  }
  })
  }

}


getAllList(){
  this.taxyearinfoService.getAllYearList().subscribe((response:ApiResponse)=>{
    if(response.status){
      this.taxYearInfo=response.result as TaxYearInfo[];
    }
  })
}

getByid(id:number){
  this.taxyearinfoService.getByID(id).subscribe((response:ApiResponse)=>{
    if(response.status){
     let taxYearInfo=response.result as TaxYearInfo;
      taxYearInfo.startDateNgb = this.dateFormate.stringToNgbDate(taxYearInfo.startDate.toString());
     taxYearInfo.endDateNgb = this.dateFormate.stringToNgbDate(taxYearInfo.endDate.toString());
     console.log(taxYearInfo);
      this.taxYearInfoForm.patchValue(response.result);
    }
  })
}


createTaxForm(){
  this.taxYearInfoForm=this.formBuilder.group({
      id :[0,[]],
      taxYearName :[,[Validators.required]],
      startDateNgb :[,[Validators.required]],
      endDateNgb :[,[Validators.required]],
      taxInfoID :[1,[]],
      sortOrder :[0,[]],
      companyID :[this.comId,[]]
  })
}


Reset(){
  this.isSubmitted=false;
  this.taxYearInfoForm.reset();
  this.createTaxForm();
}
get f(){
  return this.taxYearInfoForm.controls;
}

}
