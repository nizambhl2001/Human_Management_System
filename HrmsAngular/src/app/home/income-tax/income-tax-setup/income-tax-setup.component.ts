import { AuthService } from './../../../services/auth.service';
import { SalarySetupService } from './../../../services/SalarySetup/salary-setup.service';
import { Component, OnInit } from '@angular/core';
import { TaxYearInfoService } from '../../../services/incomeTax/tax-year-info.service';
import { ApiResponse } from '../../../models/response.model';
import { IncomeTaxSetup } from '../../../models/incomeTax/income-tax-setup.model';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { SlabIncomeTax } from '../../../models/incomeTax/slab-income-tax.model';
import { TaxYearInfo } from '../../../models/incomeTax/tax-year-info.model';
import { SalaryHead } from '../../../models/SalarySetup/salary-head';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-income-tax-setup',
  templateUrl: './income-tax-setup.component.html',
  styleUrls: ['./income-tax-setup.component.scss','../../../../vendor/libs/ng-select/ng-select.scss']
})
export class IncomeTaxSetupComponent implements OnInit {


incomeTaxSetup:IncomeTaxSetup[]=[];
taxSetupForm:FormGroup;
// slabIncomeTax:SlabIncomeTax[]=[];
taxYearInfo:TaxYearInfo[]=[];
salaryHead: SalaryHead[]=[];
comid:number;
isSubmitted=false;
btnStatus="Save";
  constructor(
    private incomeTAXService:TaxYearInfoService,
    private Formbuilder:FormBuilder,
    private salaryHeadservice :SalarySetupService,
    private toster:ToastrService
  ) { }

  ngOnInit() {
    this.comid=AuthService.getLoggedCompanyId();
    this.getAllSalaryHeadList();
    this.getTaxYear();
    this.createForm();

  }

  getTaxYear(){
    this.incomeTAXService.getAllYearList().subscribe((response:ApiResponse)=>{
      if(response.status){
        this.taxYearInfo= response.result as TaxYearInfo[];

      }else{
        this.taxYearInfo=[];
      }
    })
  }

  getAllSalaryHeadList(){
    this.salaryHeadservice.getAllSalaryHead().subscribe((response:ApiResponse)=>{
      if(response.status){
        this.salaryHead=response.result as SalaryHead[];
      }
    })
  }


  getAllSetupById(id:number){
   if(id==null)
   return;
    this.incomeTAXService.getAllIncomeTaxSetup(id).subscribe((response:ApiResponse)=>{
      if(response.status){
        this.incomeTaxSetup= response.result as IncomeTaxSetup[];
      }else{
        this.incomeTaxSetup=[];
      }
    })
  }


  saveIncomeSetup(){
    this.btnStatus="Save";
    this.isSubmitted=true;
      if(this.taxSetupForm.invalid){
        return;
      }else{
        let obj = new IncomeTaxSetup();
        obj=this.taxSetupForm.value;
        obj.taxYearName=this.taxYearInfo.find(n=>n.id==this.f.taxYearID.value).taxYearName;
       obj.salaryHeadID= this.taxSetupForm.controls['exempPercentOfID'].value;
    this.incomeTAXService.saveSetup(obj).subscribe((response:ApiResponse)=>{
      if(response.status){
      this.toster.success(response.result,"Success");
      this.reset();
      }else{
        this.toster.error(response.result,"Failed!!");
      }
    })
      }
  }


  updateIncomeTaxSetup(){
    this.isSubmitted=true;
      if(this.taxSetupForm.invalid){
        return;
      }else{
        let obj = new IncomeTaxSetup();
        obj=this.taxSetupForm.value;
        obj.taxYearName=this.taxYearInfo.find(n=>n.id==this.f.taxYearID.value).taxYearName;
       obj.salaryHeadID= this.taxSetupForm.controls['exempPercentOfID'].value;
    this.incomeTAXService.saveSetup(obj).subscribe((response:ApiResponse)=>{
      if(response.status){
      this.toster.success(response.result,"Success");
      this.reset();
      }else{
        this.toster.error(response.result,"Failed!!");
      }

    })
      }
  }

onSubmit(){
  if(this.btnStatus=="Save"){
    this.saveIncomeSetup();
  }else{
    this.updateIncomeTaxSetup();
  }
}


  getByID(id:number){
    this.btnStatus="Update";
    this.incomeTAXService.getIncomeTaxByID(id).subscribe((response:ApiResponse)=>{
      if(response.status){
        this.taxSetupForm.patchValue(response.result);
      }
    })
  }


reset(){
  this.btnStatus="Save";
  this.isSubmitted=false;
  this.taxSetupForm.reset();
  this.createForm();
  this.incomeTaxSetup=[];
}

createForm(){
  this.taxSetupForm=this.Formbuilder.group({
    id :[0,[]],
    salaryHeadID :[,[]],
    taxYearID :[,[Validators.required]],
    taxYearName :[,[]],
    exemption :[,[Validators.required]],
    exempAmount :[,[Validators.required]],
    exempPercent :[,[Validators.required]],
    exempPercentOfID :[,[Validators.required]],
    exempMaxAmount :[,[]],
    exempRule :[,[]],
    sortOrder :[,[Validators.required]],
    companyID :[this.comid,[]],
    accountName:[,[Validators.required]]
  })
}


get f(){
  return this.taxSetupForm.controls;
}

}
