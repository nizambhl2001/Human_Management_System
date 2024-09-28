import { AuthService } from './../../../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { TaxYearInfoService } from '../../../services/incomeTax/tax-year-info.service';
import { ApiResponse } from '../../../models/response.model';
import { Slabtype } from '../../../models/incomeTax/slabtype.model';
import { TaxYearInfo } from '../../../models/incomeTax/tax-year-info.model';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { SlabIncomeTax } from '../../../models/incomeTax/slab-income-tax.model';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-income-tax-slab',
  templateUrl: './income-tax-slab.component.html',
  styleUrls: ['./income-tax-slab.component.scss','../../../../vendor/libs/ng-select/ng-select.scss']
})
export class IncomeTaxSlabComponent implements OnInit {


taxYearInfo:TaxYearInfo[]=[];
slabtype:Slabtype[]=[];
slabIncomeTax:SlabIncomeTax[]=[];
incomeTaxForm:FormGroup;
comID:number;
isSubmitted=false;
btnStatus="Save";

  constructor(
    private taxService:TaxYearInfoService,
    private formBuilder:FormBuilder,
    private toster:ToastrService

  ) { }

  ngOnInit()  {
    this.comID=AuthService.getLoggedCompanyId();
    this.getAllSlab();
    this.getTaxYear();
    this.createTaxForm();
  }

  getAllSlab(){
this.taxService.getAllSlabType().subscribe((response:ApiResponse)=>{
  if(response.status){
    this.slabtype=response.result as Slabtype[];
  }
})
  }

  getTaxYear(){

    this.taxService.getAllYearList().subscribe((response:ApiResponse)=>{
      if(response.status){
        this.taxYearInfo= response.result as TaxYearInfo[];
    }
    })
  }

  slabIncomeByTaxYearId(id:number){
    if(id==null)
    return;
    if (this.f.slabTypeID.value == null) {
      this.f.slabTypeID.patchValue(0);
    }
    this.slabIncomeTax=[];
    this.taxService.getAllSlabIncomeByTaxYearID(id,this.f.slabTypeID.value).subscribe((response:ApiResponse)=>{
      if(response.status){
        this.slabIncomeTax =response.result as SlabIncomeTax[];

      }
    })
  }

  slabIncomeBySlabTypeId(id:number){
    if(id==null)
    return;    
      if (this.f.taxYearID.value == null) {
        this.f.taxYearID.patchValue(0);
      }
      this.slabIncomeTax=[];
    this.taxService.getAllSlabIncomeBySlabId(id,this.f.taxYearID.value).subscribe((response:ApiResponse)=>{
      if(response.status){        
        this.slabIncomeTax =response.result as SlabIncomeTax[];
      } 
    })
  }


  saveSlabIncomeTax(){
    this.btnStatus="Save";
    this.isSubmitted=true;
      if(this.incomeTaxForm.invalid){
        //this.toster.warning("Fill Required Fields");
        return;
      }else{ 
        this.taxService.saveSlabeIncomeTax(this.incomeTaxForm.value).subscribe((response:ApiResponse)=>{
          if(response.status){
           this.toster.success(response.result,"Success");
           this.Reset();
          }
          else{
            this.toster.error(response.result,"Failed!!");
          }
        })
      }
  }


 updateSlabIncomeTax(){
    this.isSubmitted=true;
      if(this.incomeTaxForm.invalid){
        //this.toster.warning("Fill Required Fields");
        return;
      }else{

        this.taxService.saveSlabeIncomeTax(this.incomeTaxForm.value).subscribe((response:ApiResponse)=>{
          if(response.status){
           this.toster.success(response.result,"Success");
           this.Reset();
          }
          else{
            this.toster.error(response.result,"Failed!!");
          }
        })
      }
  }

onSubmit(){
if(this.btnStatus=="Save"){
  this.saveSlabIncomeTax();
}else{
  this.updateSlabIncomeTax();
}
}

  getBYID(id:number){
    this.btnStatus="Update";
    this.taxService.getBySlabIncomeid(id).subscribe((response:ApiResponse)=>{
      if(response.status){
       this.incomeTaxForm.patchValue(response.result);
      }
    })
  }


  createTaxForm(){
    this.incomeTaxForm= this.formBuilder.group({
      id:[0,[]],
      taxYearID:[,[Validators.required]],
      slabTypeID:[,[Validators.required]],
      amount:[,[Validators.required]],
      taxRate:[,[Validators.required]],
      slabText:[,[]],
      taxAmount:[2500,[]],
      companyID:[this.comID,[]],
      sortOrder:[1,[Validators.required]],
      slabOrder:[,[Validators.required]]
}
 )}

Reset(){
  this.btnStatus="Save";
  this.isSubmitted=false;
  this.incomeTaxForm.reset();
  this.createTaxForm();
  this.slabIncomeTax=[];
}

get f(){
  return this.incomeTaxForm.controls;
}

}
