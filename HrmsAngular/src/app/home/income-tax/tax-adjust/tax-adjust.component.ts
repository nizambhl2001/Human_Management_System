import { AuthService } from './../../../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { SalarySetupService } from '../../../services/SalarySetup/salary-setup.service';
import { TaxYearInfoService } from '../../../services/incomeTax/tax-year-info.service';
import { BonusTypeService } from '../../../services/Bonus/bonusType.service';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ApiResponse } from '../../../models/response.model';
import { TaxYearInfo } from '../../../models/incomeTax/tax-year-info.model';
import { ThemeSettingsService } from '../../../../vendor/libs/theme-settings/theme-settings.service';

@Component({
  selector: 'app-tax-adjust',
  templateUrl: './tax-adjust.component.html',
  styleUrls: ['./tax-adjust.component.scss','../../../../vendor/libs/ng-select/ng-select.scss']
})
export class TaxAdjustComponent implements OnInit {


  taxAdjustForm:FormGroup;
  comId:number;
  grade:number;
  userTypeID:number;
  taxYearInfo:TaxYearInfo[]=[];
  isSubmitted=false;
  constructor(
    private salarySetupService:SalarySetupService,
    private incomeTAXService:TaxYearInfoService,
    private paymentTypeES:BonusTypeService,
    private formBuilder:FormBuilder,
    private toster:ToastrService
  ) { }

  ngOnInit() {
    this.comId=AuthService.getLoggedCompanyId();
    this.grade=AuthService.getLoggedGradeValue();
    this.userTypeID=AuthService.getLoggedUserTypeId();
    this.createTaxAdjustForm();
    this.getTaxYear();
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



  processEmpTAxAdjust(){

    this.isSubmitted=true;
    if(this.taxAdjustForm.invalid){
      return;
    }else{
      alert("TEst");
      let taxYearId=this.f.taxYearID.value;

      this.incomeTAXService.procesEmpTAxAdjust(taxYearId,this.userTypeID,this.comId,this.grade).subscribe((response:ApiResponse)=>{
        if(response.status){
          this.toster.success(response.result,"Success");
          this.Reset();
        }
        else{
          this.toster.error(response.result,"Failed");
        }
      });
    }

  }

  createTaxAdjustForm(){
    this.taxAdjustForm=this.formBuilder.group({
      companyID:[this.comId,[]],
      taxYearID:[,[Validators.required]],
      grade:[this.grade,[]],
      userTypeID:[this.userTypeID,[]]
    })
  }

Reset(){
  this.isSubmitted=false;
  this.taxAdjustForm.reset();
  this.createTaxAdjustForm();
}

  get f(){
    return this.taxAdjustForm.controls;
  }
}
