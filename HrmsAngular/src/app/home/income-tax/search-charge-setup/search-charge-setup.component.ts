import { AuthService } from './../../../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { TaxYearInfoService } from '../../../services/incomeTax/tax-year-info.service';
import { Form, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SearchChargeSetup } from '../../../models/incomeTax/search-charge-setup.model';
import { TaxYearInfo } from '../../../models/incomeTax/tax-year-info.model';
import { ApiResponse } from '../../../models/response.model';
import { NgbDateCustomParserFormatter } from '../../../shared/dateformat';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-search-charge-setup',
  templateUrl: './search-charge-setup.component.html',
  styleUrls: ['./search-charge-setup.component.scss','../../../../vendor/libs/ng-select/ng-select.scss']
})
export class SearchChargeSetupComponent implements OnInit {


searchChargeForm:FormGroup;
searchargeModel:SearchChargeSetup[]=[];
comid:number;
taxYear:TaxYearInfo[]=[];
btnStatus="Save";
isSubmitted = false;
userID:number;

  constructor(
    private taxService:TaxYearInfoService,
    private formBuilder:FormBuilder,
    private dateformator:NgbDateCustomParserFormatter,
    private toster:ToastrService
  ) { }

  ngOnInit() {
    this.comid=AuthService.getLoggedCompanyId();
    this.userID=AuthService.getLoggedUserId();
    this.getAllYearList();
    this.createSearchForm();
  }

getAllYearList(){
  this.taxService.getAllYearList().subscribe((response:ApiResponse)=>{
    if(response.status){
      this.taxYear=response.result as TaxYearInfo[];
    }
  })
}

getAllSerChargeList(id:number){
  if(id==null)
  return;
  this.taxService.getAllSearchChargeList(id).subscribe((response:ApiResponse)=>{
    if(response.status){
      this.searchargeModel=response.result as SearchChargeSetup[];
    }else{
      this.searchargeModel=[];
    }
  })
}

getBYID(id:number){
  this.btnStatus="Update";
  this.taxService.getSerChargeByID(id).subscribe((response:ApiResponse)=>{
    if(response.status){
      let obj=response.result as SearchChargeSetup;
      obj.setupDateNgb=this.dateformator.stringToNgbDate(obj.setupDate.toString());
      this.searchChargeForm.patchValue(response.result);
      // this.btnStatus="Save";
    }
  })
}
saveUpdate(){
  this.isSubmitted=true;
  if(this.searchChargeForm.invalid){

    return;
  }else{
    let obj= new SearchChargeSetup();
  obj= this.searchChargeForm.value;
  this.taxService.saveUpdateSercharge(this.searchChargeForm.value).subscribe((response:ApiResponse)=>{
    if(response.status){
     this.toster.success(response.result,"Success");
     this.getAllSerChargeList(this.f.taxYear.value);
     this.reset();


    }else{
      this.toster.error(response.result,"Failed!!")
    }
  })
  }
}




createSearchForm(){
  this.searchChargeForm=this.formBuilder.group({
    id :[0,[]],
    taxYear :[,[Validators.required]],
    slabName :[,[Validators.required]],
    slabAmount  :[0,[]],
    persentage  :[,[Validators.required]],
    note :[,[]],
    setupDate:[,[]],
    setupDateNgb  :[,[Validators.required]],
    companyID :[this.comid,[]]
  })
}

reset(){
  this.isSubmitted=false;
  this.btnStatus="Save";
  this.searchChargeForm.reset();
  this.createSearchForm();
  //this.searchargeModel=[];
}

get f(){
 return this.searchChargeForm.controls;
}
}
