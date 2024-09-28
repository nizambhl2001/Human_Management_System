import { AuthService } from './../../../services/auth.service';
import { SalarySetupService } from './../../../services/SalarySetup/salary-setup.service';
import { Component, OnInit } from '@angular/core';
import { SalaryPeriodModel } from '../../../models/SalarySetup/SalaryPeriod';
import { ApiResponse } from '../../../models/response.model';
import { TaxYearInfoService } from '../../../services/incomeTax/tax-year-info.service';
import { TaxYearInfo } from '../../../models/incomeTax/tax-year-info.model';
import { BonusTypeService } from '../../../services/Bonus/bonusType.service';
import { BonuSType } from '../../../models/bonus/bonusType.model';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ProcessIncomeTax } from '../../../models/incomeTax/process-incometax.model';
import { ToastrService } from 'ngx-toastr';
import { TaxCalculation } from '../../../models/incomeTax/tax-calculation.model';


@Component({
  selector: 'app-other-tax-calculation',
  templateUrl: './other-tax-calculation.component.html',
  styleUrls: ['./other-tax-calculation.component.scss','../../../../vendor/libs/ng-select/ng-select.scss']
})
export class OtherTaxCalculationComponent implements OnInit {


  salaryPeriod:SalaryPeriodModel[]=[];
  taxYearInfo:TaxYearInfo[]=[];
  allPaymentType:BonuSType[]=[];
  otherTaxCalculationForm:FormGroup;
  processIncomeTaxModel:ProcessIncomeTax[]=[];
  companyID:number;
  grade:number;
  isSubmitted=false;
  userTypeID:number;
  constructor(
    private salarySetupService:SalarySetupService,
    private incomeTAXService:TaxYearInfoService,
    private paymentTypeES:BonusTypeService,
    private formBuilder:FormBuilder,
    private toster:ToastrService
  ) { }

  ngOnInit() {
    this.companyID=AuthService.getLoggedCompanyId();
    this.grade=AuthService.getLoggedGradeValue();
    this.userTypeID=AuthService.getLoggedUserId();
    this.createOtherTaxCalculatationForm();
    this.getSalaryPeriodList();
    this.getTaxYear();
    this.AllPaymentType();
    this.getName_EmpCode();
  }



  getName_EmpCode(){
    this.incomeTAXService.getAllName_EmpCode().subscribe((respon:ApiResponse)=>{
      if(respon.status){
        this.processIncomeTaxModel= respon.result as ProcessIncomeTax[];
      }else{
        this.processIncomeTaxModel=[];
      }
    })
  }

  getSalaryPeriodList() {
    this.salarySetupService.getAllperiod().subscribe((response: ApiResponse) => {
      if (response.status) {
        this.salaryPeriod = response.result as SalaryPeriodModel[];
      }else{
        this.salaryPeriod=[];
      }

    })
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

  AllPaymentType(){
    this.paymentTypeES.getBonusType().subscribe((response:ApiResponse)=>{
      if(response.status){
        this.allPaymentType=response.result as BonuSType[];
      }else{
        this.allPaymentType=[];
      }
    })
  }

  processOtherTaxCalculation(){
    this.isSubmitted=true;
    if(this.otherTaxCalculationForm.invalid){
      return;
    }else{
      let obj = new TaxCalculation();
      obj=this.otherTaxCalculationForm.value;
      obj.periodName=this.salaryPeriod.find(taxYear=>taxYear.id==this.f.periodID.value).periodName;
      this.incomeTAXService.otherTaxCalculation(obj).subscribe((response:ApiResponse)=>{
        if(response.status){
          this.toster.success(response.result,"Success");
          this.Reset();
        }else{
          this.toster.error(response.result,"Failed");
        }
      });
    }
  }


  createOtherTaxCalculatationForm(){
    this.otherTaxCalculationForm=this.formBuilder.group({
      companyID:[this.companyID,[]],
      periodID:[,[Validators.required]],
      empCode:[,[Validators.required]],
      taxYearID:[,[Validators.required]],
      bonusTypeID:[,[Validators.required]],
      grade:[this.grade,[]],
      userTypeID:[this.userTypeID,[]]
    })
  }

Reset(){
  this.isSubmitted=false;
  this.otherTaxCalculationForm.reset();
  this.createOtherTaxCalculatationForm();
}

  get f(){
    return this.otherTaxCalculationForm.controls;
  }

}
