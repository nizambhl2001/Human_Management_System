import { AuthService } from './../../../services/auth.service';
import { NgbDateCustomParserFormatter } from './../../../shared/dateformat';
import { ToastrService } from 'ngx-toastr';
import { ApiResponse } from './../../../models/response.model';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { SubsistanceAmountModel } from '../../../models/subsistance-allowances/subsistance-amount.model';
import { EmpTypeService } from '../../../services/system-setup/EmpType.service';
import { EmpTypeModel } from '../../../models/system-setup/EmpType.model';
import { BonusSalaryHeadModel } from '../../../models/bonus/bonus-salary-head.model';
import { BonusSelectService } from '../../../services/Bonus/bonus-select.service';
import { SubsistanceAmountService } from '../../../services/subsistance-allowances/subsistance-amount.service';

@Component({
  selector: 'app-amount-setup',
  templateUrl: './amount-setup.component.html',
  styleUrls: ['./amount-setup.component.scss',
  '../../../../vendor/libs/angular-2-dropdown-multiselect/angular-2-dropdown-multiselect.scss',
  '../../../../vendor/libs/ng-select/ng-select.scss']
})
export class AmountSetupComponent implements OnInit {
  btnStatus:string="Save";
  isSubmitted=false;
  compId:number;
  gradeValue:number;
  userID:number;
  subsistanceAmountForm:FormGroup;
  subsistanceAmount:SubsistanceAmountModel[]=[];
  allEmployeeType:EmpTypeModel[]=[];
  allBonusAllowance:BonusSalaryHeadModel[]=[];
  constructor(
   private formBuilder:FormBuilder,
   private BonusSelectES:BonusSelectService,
   private empTypeES:EmpTypeService,
   private subsistanceAmountES:SubsistanceAmountService,
   private toasterService:ToastrService,
   private dateFormate:NgbDateCustomParserFormatter
  ) { }

  ngOnInit() {
    this.compId=AuthService.getLoggedCompanyId();
    this.userID=AuthService.getLoggedUserId();
    this.gradeValue=AuthService.getLoggedGradeValue();
    this.createForm();
    this.AllEmployeeType();
    this.AllBonusAllowance();
    this.getAll(this.gradeValue);
  }

  AllEmployeeType(){
    this.empTypeES.GetEmpType().subscribe((response:ApiResponse)=>{
      if(response.status){
        this.allEmployeeType=response.result as  EmpTypeModel[];
      }
    })
  }
  AllBonusAllowance(){
    this.BonusSelectES.getBonusAllowance().subscribe((response:ApiResponse)=>{
      if(response.status){
       this.allBonusAllowance=response.result as BonusSalaryHeadModel[];
      }
    })
    }
    save(){
      this.isSubmitted=true;
      if(this.subsistanceAmountForm.invalid){
        this.toasterService.warning("Fill All Required Fields");
      }
      else{
      this.subsistanceAmountForm.controls.eDate.setValue(this.dateFormate.ngbDateToDate(this.subsistanceAmountForm.controls.eDateNgb.value).toLocaleDateString());
      console.log(this.subsistanceAmountForm.value);
    this.subsistanceAmountES.subsistanceAmountSave(this.subsistanceAmountForm.value).subscribe((response:ApiResponse)=>{
    if(response.status){
      this.toasterService.success("Save Successfully","Success");
      this.reset();
      this.getAll(this.gradeValue);
      this.isSubmitted=false;
    }
    else{
      this.toasterService.error(response.result);
    }
    })
    }
  }
    getAll(empGrade:number){
      this.subsistanceAmountES.getAll(empGrade,this.compId).subscribe((response:ApiResponse)=>{
        if(response.status){
        this.subsistanceAmount=response.result as SubsistanceAmountModel[];
        }
      })
    }
    getById(id:number){
      this.subsistanceAmountES.getById(id).subscribe((response:ApiResponse)=>{
        if(response.status){
          let subsistanceAmount=response.result as SubsistanceAmountModel;
          this.subsistanceAmountForm.patchValue(subsistanceAmount);
          this.f.eDateNgb.setValue(this.dateFormate.stringToNgbDate(subsistanceAmount.eDate));
          this.btnStatus="Update";
        }
      })
    }
 createForm(){
   this.subsistanceAmountForm=this.formBuilder.group({
    id:[,[]],
    empGrade:[,[]],
    salaryHead:[,[Validators.required]],
    numberoftimesGuilty:[,[Validators.required]],
    numberoftimesNonGuilty:[,[Validators.required]],
    eDate:[,[]],
    eDateNgb:[this.dateFormate.getCurrentNgbDate(),[]],
    note:[,[]],
    companyID:[this.compId,[]],
    userID:[this.userID,[]]
   })
 }
 get f(){
   return this.subsistanceAmountForm.controls;
 }
 get formVal(){
   return this.subsistanceAmountForm.value;
 }
 reset(){
   this.subsistanceAmountForm.reset();
   this.isSubmitted=false;
   this.btnStatus="Save";
 }
}

