import { AuthService } from './../../../services/auth.service';
import { SalarySetupService } from './../../../services/SalarySetup/salary-setup.service';
import { Component, OnInit } from '@angular/core';
import { SalaryPeriodModel } from '../../../models/SalarySetup/SalaryPeriod';
import { ApiResponse } from '../../../models/response.model';
import { TaxGroup } from '../../../models/incomeTax/tax-group.model';
import { TaxYearInfoService } from '../../../services/incomeTax/tax-year-info.service';
import { BonuSType } from '../../../models/bonus/bonusType.model';
import { BonusTypeService } from '../../../services/Bonus/bonusType.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ChallanPrepair } from '../../../models/incomeTax/challan-prepair.model';
import { ToastrService } from 'ngx-toastr';
import { NgbDateCustomParserFormatter } from '../../../shared/dateformat';
import { ChallanNumberAssaign } from '../../../models/incomeTax/challan-number-assaign.model';

@Component({
  selector: 'app-challan-number-assign',
  templateUrl: './challan-number-assign.component.html',
  styleUrls: ['./challan-number-assign.component.scss','../../../../vendor/libs/ng-select/ng-select.scss']
})
export class ChallanNumberAssignComponent implements OnInit {

  salaryPeriod:SalaryPeriodModel[]=[];
  taxGroup:TaxGroup[]=[];
  allPaymentType:BonuSType[]=[];
  challanPretair:ChallanNumberAssaign[]=[];
  challanPrepareForm:FormGroup;
  comId:number;
  isSubmitted=false;
  userId:number;
  constructor(
    private taxService:TaxYearInfoService,
    private salarySetupService:SalarySetupService,
    private paymentTypeES:BonusTypeService,
    private formBuilder:FormBuilder,
    private toster:ToastrService,
    private dateFormator:NgbDateCustomParserFormatter
  ) { }

  ngOnInit() {
    this.comId=AuthService.getLoggedCompanyId();
    this.userId=AuthService.getLoggedUserId();
    this.createForm();
    this.getSalaryPeriodList();
    this.AllPaymentType();
    this.getAllGroupNam();
  }


  getSalaryPeriodList() {
    this.salarySetupService.getAllperiod().subscribe((response: ApiResponse) => {
      if (response.status) {
        this.salaryPeriod = response.result as SalaryPeriodModel[];
      }

    })
  }


  getAllGroupNam(){
    this.taxService.getAllTaxGroupName().subscribe((response:ApiResponse)=>{
      if(response.status){
        this.taxGroup=response.result as TaxGroup[];
      }
    })
  }

  AllPaymentType(){
    this.paymentTypeES.getBonusType().subscribe((response:ApiResponse)=>{
      if(response.status){
        this.allPaymentType=response.result as BonuSType[];

      }
    })
  }

  updateChallanNumberAssaign(){
    this.isSubmitted=true;
    if(this.challanPrepareForm.invalid){
      //this.toster.warning("Fill Required Fields");
    }else{
      let challanPrepareObj =new ChallanNumberAssaign();
    challanPrepareObj = this.challanPrepareForm.value;
    challanPrepareObj.challanDate = this.dateFormator.ngbDateToDate(this.f.challanDateNgb.value);


    this.taxService.updateChallanNumber(this.challanPrepareForm.value).subscribe((response:ApiResponse)=>{
      if(response.status){
        this.toster.success(response.result,"Success");
        this.Reset();
      }
      else{
        this.toster.error(response.result,"Failed!!");
      }
    });
    }

  }

createForm(){
  this.challanPrepareForm=this.formBuilder.group({
    id :[0,[]],
    empCode :[,[]],
    periodID :[,[Validators.required]],
    challanNo:[,[Validators.required]],
    challanDateNgb :[this.dateFormator.getCurrentNgbDate(),[Validators.required]],
    gruopID :[,[Validators.required]],
    gLNo :[,[]],
    companyID :[this.comId,[]],
    paymentType :[0,[Validators.required]],
    bonusType  :[0,[]]
  })
}

Reset(){
  this.isSubmitted=false;
  this.challanPrepareForm.reset();
  this.createForm();
}
get f(){
  return this.challanPrepareForm.controls;
}
}
