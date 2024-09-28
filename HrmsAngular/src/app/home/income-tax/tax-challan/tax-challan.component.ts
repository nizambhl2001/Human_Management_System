import { AuthService } from './../../../services/auth.service';
import { SalarySetupService } from './../../../services/SalarySetup/salary-setup.service';
import { Component, OnInit } from '@angular/core';
import { TaxYearInfoService } from '../../../services/incomeTax/tax-year-info.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { TaxChallan } from '../../../models/incomeTax/tax-challan.model';
import { SalaryPeriodModel } from '../../../models/SalarySetup/SalaryPeriod';
import { ApiResponse } from '../../../models/response.model';
import { TaxYearInfo } from '../../../models/incomeTax/tax-year-info.model';
import { NgbDateCustomParserFormatter } from '../../../shared/dateformat';

@Component({
  selector: 'app-tax-challan',
  templateUrl: './tax-challan.component.html',
  styleUrls: ['./tax-challan.component.scss','../../../../vendor/libs/ng-select/ng-select.scss']
})
export class TaxChallanComponent implements OnInit {

taxChallan:TaxChallan[]=[];
salaryPeriod:SalaryPeriodModel[]=[];
taxYearInfo:TaxYearInfo[]=[];
taxChallanForm:FormGroup;
comId:number;
isSubmitted = false;
btnStatus="Save";
  constructor(
    private taxService:TaxYearInfoService,
    private formBuilder:FormBuilder,
    private toster:ToastrService,
    private salarySetupService:SalarySetupService,
    private dateFormator:NgbDateCustomParserFormatter
  ) { }

  ngOnInit() {
    this.comId=AuthService.getLoggedCompanyId();
    this.createChallanForm();
    this.getAllYearList();
    this.getSalaryPeriodList();
    this.getChallanListByTaxYearID(0);
    // this.getChallanLIst();
  }




// getChallanLIst(){
// this.taxService.getTaxChallanList(this.comId).subscribe((response:ApiResponse)=>{
//   if(response.status){
//     this.taxChallan=response.result as TaxChallan[];
//   }else{
//     this.taxChallan=[];
//   }
// });
// }

getChallanListByTaxYearID(taxid:number){
  if(taxid==null){
    return;
  }else{
    this.taxService.getTaxChallanListByTaxYearId(taxid,this.comId).subscribe((response:ApiResponse)=>{
      if(response.status){
        this.taxChallan=response.result as TaxChallan[];
      }else{
        this.taxChallan=[];
      }
    });
  }

}

OnSubmit(){
  if(this.btnStatus=="Save"){
    this.saveTaxChallan();
  }else{
    this.saveTaxChallan();
  }
}

saveTaxChallan(){
  this.isSubmitted=true;
  if(this.taxChallanForm.invalid){
    //this.toster.warning("Fill Required Fields");
    return;
  }else{
    let obj= new TaxChallan();
  obj= this.taxChallanForm.value;
  //obj.challanDate=this.dateFormator.ngbDateToString(this.f.challanDateNgb.value);
  this.taxService.saveTaxChallan(obj).subscribe((response:ApiResponse)=>{
    if(response.status){
      this.toster.success(response.result,"Save");
      //this.getChallanLIst();
      this.getChallanListByTaxYearID(0);
      this.Reset();
    }else{
      this.toster.error(response.result,"Failed!!");
    }
  })
  }

}

  getSalaryPeriodList() {
    this.salarySetupService.getAllperiod().subscribe((response: ApiResponse) => {
      if (response.status) {
        this.salaryPeriod = response.result as SalaryPeriodModel[];
      }

    })
  }


  getAllYearList(){
    this.taxService.getAllYearList().subscribe((response:ApiResponse)=>{
      if(response.status){
        this.taxYearInfo=response.result as TaxYearInfo[];
      }
    })
  }

createChallanForm(){
  this.taxChallanForm=this.formBuilder.group({
        id :[0,[]],
        taxYearID :[,[Validators.required]],
        taxChallanNo :[,[Validators.required]],
        challanDate:[,[]],
        challanDateNgb :[,[Validators.required]],
        salaryPeriodID :[,[Validators.required]],
        createdDate :[,[]],
        companyID :[this.comId,[]]
  })
}


getByID(id:number){
  this.btnStatus="Update";
  this.taxService.getTaxChallanById(id,this.comId).subscribe((response:ApiResponse)=>{
    if(response.status){
      let result= response.result as TaxChallan;
      result.challanDateNgb=this.dateFormator.stringToNgbDate(result.challanDate.toString());
      this.taxChallanForm.patchValue(response.result);
    }
  });
  }


Reset(){
  this.btnStatus="Save";
  this.isSubmitted=false;
  this.taxChallanForm.reset();
  this.createChallanForm();
  this.getChallanListByTaxYearID(0);
}
get f(){
  return this.taxChallanForm.controls;
}
}
