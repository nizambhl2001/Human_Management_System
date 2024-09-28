import { AuthService } from './../../../services/auth.service';
import { NgbDateCustomParserFormatter } from './../../../shared/dateformat';
import { ToastrService } from 'ngx-toastr';
import { ApiResponse } from './../../../models/response.model';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Pagination } from '../../../shared/paginate';
import { BonusPeriodModel } from '../../../models/bonusPeriod.model';
import { BonuSType } from '../../../models/bonus/bonusType.model';
import { BonusTypeService } from '../../../services/Bonus/bonusType.service';
import { BonusPeriodService } from '../../../services/Bonus/bonus-period.service';
import { ArrearPaymentAuto } from '../../../services/insentive-Other/arrear-payment-auto.service';

@Component({
  selector: 'app-arrear-payment-auto',
  templateUrl: './arrear-payment-auto.component.html',
  styleUrls: ['./arrear-payment-auto.component.scss',
  '../../../../vendor/libs/angular-2-dropdown-multiselect/angular-2-dropdown-multiselect.scss',
  '../../../../vendor/libs/ng-select/ng-select.scss']
})
export class ArrearPaymentAutoComponent extends Pagination implements OnInit {
  isSubmitted=false;
  compID:number;
  gradeID:number;
  arrearPaymentAutoForm:FormGroup;
  allBonusPeriod:BonusPeriodModel[]=[];
  allBonusType:BonuSType[]=[];
  constructor(
   private formBuilder:FormBuilder,
   private BonusTypeES:BonusTypeService,
   private toasterService:ToastrService,
   private dateformat:NgbDateCustomParserFormatter,
   private arrearPaymentES:ArrearPaymentAuto,
   private BonusPeriodES:BonusPeriodService,
  ) {
    super();
  }
  title="Employee Arrear Information";
  ngOnInit() {
    this.compID=AuthService.getLoggedCompanyId();
    this.gradeID=AuthService.getLoggedGradeValue();
    this.items=[];
    this.update();
    this.createForm();
    this.AllBonusPeriod();
    this.AllBonusType();
  }
  AllBonusPeriod(){
    this.BonusPeriodES.getBonusPeriod().subscribe((response:ApiResponse)=>{
      if(response.status){
        this.allBonusPeriod=response.result as BonusPeriodModel[];
      }
    })
  }
  AllBonusType(){
    this.BonusTypeES.getBonusType().subscribe((response:ApiResponse)=>{
      if(response.status){
        this.allBonusType=response.result as BonuSType[];
      }
    })
  }
  save(){
    this.isSubmitted=true;
    this.arrearPaymentAutoForm.controls.arrearDate.setValue(this.dateformat.ngbDateToString(this.arrearPaymentAutoForm.controls.arrearDateNgb.value));
    this.arrearPaymentAutoForm.controls.incrementDate.setValue(this.dateformat.ngbDateToString(this.arrearPaymentAutoForm.controls.incrementDateNgb.value));
    if(this.arrearPaymentAutoForm.invalid){
      this.toasterService.warning("Fill Required Info");
    }
    else{
    this.arrearPaymentES.arrearSaveAuto(this.arrearPaymentAutoForm.value).subscribe((response:ApiResponse)=>{
      if(response.status){
      this.toasterService.success("Success");
      this.reset();
      }
      else{
        this.toasterService.error(response.result);
      }
    })
  }
}
  createForm(){
  this.arrearPaymentAutoForm=this.formBuilder.group({
    startPeriod:[,[Validators.required]],
    comparePeriod:[,[Validators.required]],
    arrearPeriod:[,[Validators.required]],
    arrearDate:[,[]],
    arrearDateNgb:[,[Validators.required]],
    incrementDate:[,[]],
    incrementDateNgb:[,[Validators.required]],
    compantID:[this.compID,[]],
    bonusTYpe:[,[Validators.required]],
    grade:[this.gradeID,[]],
    empCode:[,[]]
  })
  }
  get formVal(){
    return this.arrearPaymentAutoForm.value;
  }
  get f(){
    return this.arrearPaymentAutoForm.controls;
  }
  reset(){
    this.createForm();
    this.isSubmitted=false;
  }

}
