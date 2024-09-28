import { Component, OnInit } from '@angular/core';
import { TaxMinimumTax } from '../../../models/incomeTax/tax-minimum-tax.model';
import { TaxYearInfoService } from '../../../services/incomeTax/tax-year-info.service';
import { ApiResponse } from '../../../models/response.model';
import { TaxYearInfo } from '../../../models/incomeTax/tax-year-info.model';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NgbDateCustomParserFormatter } from '../../../shared/dateformat';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-minimum-tax-setup',
  templateUrl: './minimum-tax-setup.component.html',
  styleUrls: ['./minimum-tax-setup.component.scss','../../../../vendor/libs/ng-select/ng-select.scss']
})
export class MinimumTaxSetupComponent implements OnInit {


taxMinimumTax: TaxMinimumTax[]=[];
taxYearInfo:TaxYearInfo[]=[];
minTaxForm:FormGroup;
btnStatus="Save";
isSubmitted = false;
userID:number;
  constructor(
    private taxService:TaxYearInfoService,
    private formBuilder:FormBuilder,
    private dateFormator:NgbDateCustomParserFormatter,
    private toster:ToastrService
  ) { }

  ngOnInit() {
    this.createMinForm();
    this.getTaxYear();
  }

  getTaxYear(){
    this.taxService.getAllYearList().subscribe((response:ApiResponse)=>{
      if(response.status){
        this.taxYearInfo= response.result as TaxYearInfo[];
      }else{
        this.taxYearInfo=[];
      }
    })
  }


  getByMinTaxListById(id:number){
    if(id==null)
    return;
   this.taxService.getMinimumTaxListByID(id).subscribe((response:ApiResponse)=>{
      if(response.status){
        this.taxMinimumTax= response.result as TaxMinimumTax[];
      }else{
        this.taxMinimumTax=[];
      }
    })
  }

  getMinimumTaxBy(id:number){
    this.btnStatus="Update";
    this.taxService.getMinimumTaxByID(id).subscribe((response:ApiResponse)=>{
      if(response.status){
        let obj = response.result as TaxMinimumTax;
        obj.sDateNgb = this.dateFormator.stringToNgbDate(obj.sDate.toString());
        this.minTaxForm.patchValue(response.result);
      }
    })
  }


  saveMinimumTax(){
    this.btnStatus="Save";
    this.isSubmitted=true;
      if(this.minTaxForm.invalid){
       // this.toster.warning("Fill Required Fields");
        return;
      }else{
    let obj=new TaxMinimumTax();
    obj=this.minTaxForm.value
    this.taxService.saveMinimumTax(this.minTaxForm.value).subscribe((response:ApiResponse)=>{
      if(response.status){
      this.toster.success(response.result,"Success");
      this.reset();
      }else{
        this.toster.error(response.result,"Failed");
      }
    });
      }
  }

createMinForm(){
  this.minTaxForm=this.formBuilder.group({
    id :[0,[]],
    taxYearID  :[,[Validators.required]],
    minimumTax :[,[Validators.required]], 
    investRate :[,[Validators.required]], 
    investMaxamount :[,[Validators.required]],
    rebateRate :[,[Validators.required]],
    carPersent :[,[]],
    housePersent :[,[Validators.required]],
    sDate:[,[]],
    sDateNgb :[,[Validators.required]],
    note:[,[]],
    companyID :[1,[]]
  })
}

get f(){
  return this.minTaxForm.controls;
}

reset(){
  this.btnStatus="Save";
  this.isSubmitted=false;
  this.minTaxForm.reset();
  this.createMinForm();
}
}
