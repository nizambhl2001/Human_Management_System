import { ApiResponse } from './../../../models/response.model';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { BonuSType } from './../../../models/bonus/bonusType.model';
import { Component, OnInit } from '@angular/core';
import { BonusTypeService } from '../../../services/Bonus/bonusType.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-allowance-setup',
  templateUrl: './allowance-setup.component.html',
  styleUrls: ['./allowance-setup.component.scss']
})
export class AllowanceSetupComponent implements OnInit {
  bonustype:BonuSType[]=[];
  isSubmitted=false;
  bonustypeForm:FormGroup;
  salaryid:number=1;
  present:number=1.00
  constructor
  (
    private  formbuilder:FormBuilder,
    private toasterService:ToastrService,
    private bonusService:BonusTypeService,
  ){ }
  ngOnInit() {
    this.createFrom();
    this.allBonus();
  }
  allBonus(){
    this.bonusService.getBonusType().subscribe((response:ApiResponse)=>{
      this.bonustype=response.result as BonuSType[];
    })
  }
  saveBonus(){
    this.isSubmitted=true;
    if(this.bonustypeForm.invalid){
      this.toasterService.warning("Fill The Form");
      return;
    }
    else{
   this.bonusService.saveBonus(this.bonustypeForm.value).subscribe((response:ApiResponse)=>{
     if(response.status){
      this.toasterService.success("Successfully Save","Success");
      this.reset();
      this.allBonus();
      this.isSubmitted=false;
     }
     else{
       this.toasterService.error(response.result,"Fail To Save");
     }
   })
  }
}
  createFrom(){
    this.bonustypeForm=this.formbuilder.group({
      id:[,[]],
      paymentType:[,[Validators.required]],
      persent:[1.00,[]],
      salaryID:[1,[]]
    })
    }
    get f(){
      return this.bonustypeForm.controls;
     }
     reset(){
       this.createFrom();
       this.isSubmitted=false;
     }
}
