import { AuthService } from './../../../services/auth.service';
import { SalarySetupService } from './../../../services/SalarySetup/salary-setup.service';
import { Component, OnInit } from '@angular/core';
import { SalaryPeriodModel } from '../../../models/SalarySetup/SalaryPeriod';
import { TaxYearInfoService } from '../../../services/incomeTax/tax-year-info.service';
import { TaxYearInfo } from '../../../models/incomeTax/tax-year-info.model';
import { ApiResponse } from '../../../models/response.model';
import { ProcessIncomeTax } from '../../../models/incomeTax/process-incometax.model';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { TaxCalculation } from '../../../models/incomeTax/tax-calculation.model';

@Component({
  selector: 'app-block-tax-calculation',
  templateUrl: './block-tax-calculation.component.html',
  styleUrls: ['./block-tax-calculation.component.scss','../../../../vendor/libs/ng-select/ng-select.scss']
})
export class BlockTaxCalculationComponent implements OnInit {


  salaryPeriod: SalaryPeriodModel[] = [];
  taxYear:TaxYearInfo[]=[];
  processIncomeTaxModel:ProcessIncomeTax[]=[];
  blockTaxCalculationForm:FormGroup;
  companyID:number;
  grade:number;
  isSubmitted=false;
  userTypeID:number;
  constructor(
    private salarySetupService:SalarySetupService,
    private taxService:TaxYearInfoService,
    private formBuilder:FormBuilder,
    private toster:ToastrService
  ) {}

  ngOnInit() {
    this.companyID=AuthService.getLoggedCompanyId();
    this.grade=AuthService.getLoggedGradeValue();
    this.userTypeID=1;
    this.getSalaryPeriodList();
    this.getAllYearList();
    this.getName_EmpCode();
    this.createBlockTaxForm();
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


  getAllYearList(){
    this.taxService.getAllYearList().subscribe((response:ApiResponse)=>{
      if(response.status){
        this.taxYear=response.result as TaxYearInfo[];
      }else{
        this.taxYear=[];
      }
    })
  }


  getName_EmpCode(){
    this.taxService.getAllName_EmpCode().subscribe((respon:ApiResponse)=>{
      if(respon.status){
        this.processIncomeTaxModel= respon.result as ProcessIncomeTax[];
      }else{
        this.processIncomeTaxModel=[];
      }
    })
  }

  blockTaxCalculation(){
    this.isSubmitted=true;
    if(this.blockTaxCalculationForm.invalid){
      return;
    }else{
      let obj = new TaxCalculation();
      obj=this.blockTaxCalculationForm.value;
      obj.periodName=this.salaryPeriod.find(taxYear=>taxYear.id==this.f.periodID.value).periodName;

      this.taxService.blockTaxCalculation(this.blockTaxCalculationForm.value).subscribe((response:ApiResponse)=>{
        if(response.status){
          this.toster.success(response.result,"Success");

        }else{
          this.toster.error(response.result,"Failed");
        }
      });
    }
  }

  createBlockTaxForm(){
    this.blockTaxCalculationForm=this.formBuilder.group({
      companyID:[this.companyID,[]],
      periodID:[,[Validators.required]],
      empCode:[,[Validators.required]],
      taxYearID:[,[Validators.required]],
      grade:[this.grade,[]],
      userTypeID:[this.userTypeID,[]]
    })
  }

Reset(){
  this.isSubmitted=false;
  this.blockTaxCalculationForm.reset();
  this.createBlockTaxForm();
}

  get f(){
    return this.blockTaxCalculationForm.controls;
  }
}
