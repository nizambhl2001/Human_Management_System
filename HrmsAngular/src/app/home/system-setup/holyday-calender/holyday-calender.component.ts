import { AuthService } from './../../../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { Pagination } from '../../../shared/paginate';
import { FormGroup, FormBuilder, Validators, FormArray, FormControl } from '@angular/forms';
import { HolydayCalender } from '../../../models/system-setup/holyday-calender.model';
import { SystemSetupService } from '../../../services/system-setup/system-setup.service';
import { ToastrService } from 'ngx-toastr';
import { ApiResponse } from '../../../models/response.model';
import { NgbDateCustomParserFormatter } from '../../../shared/dateformat';

@Component({
  selector: 'app-holyday-calender',
  templateUrl: './holyday-calender.component.html',
  styleUrls: ['./holyday-calender.component.scss']
})
export class HolydayCalenderComponent extends Pagination implements OnInit {

  holydayForm:FormGroup;
  holydayCalenderItem:HolydayCalender[]=[];
  comId:number;
  holydayEditForm:FormArray;
  isSubmitted = false;
  btnStatus=false;
  constructor(
    private formBuilder:FormBuilder,
    private sSetupService:SystemSetupService,
    private toster:ToastrService,
    private dateFormator:NgbDateCustomParserFormatter
  ) {
    super();
    this.holydayEditForm = this.formBuilder.array([]);
  }
title="Holyday Calender";
  ngOnInit() {
    this.items = [];
    this.update();
    this.comId=AuthService.getLoggedCompanyId();
    this.createHolydayForm();
  }

  getAllDivisionList(){
    debugger
    this.isSubmitted=true;
    if(this.holydayForm.invalid){
      this.toster.warning("Fill Required Fields");
      return;
    }else{
      debugger
      let sDate = this.dateFormator.ngbDateToDate(this.f.hYear.value).toLocaleDateString();
      

    this.sSetupService.getHolydayList(sDate).subscribe((response:ApiResponse)=>{
      if(response.status){
        this.btnStatus=true;
      this.items=response.result as HolydayCalender[];
       this.update();
       this.holydayEditForm = this.formBuilder.array([]);
       this.items.forEach(holydayParam=>{
         this.holydayEditForm.push(
           new FormGroup({
             hdate: new FormControl(holydayParam.hdate,[Validators.required]),
             note: new FormControl(holydayParam.note,[Validators.required])
           })
         )
       })
      }
      else{
        this.items=[];
        this.update();
      }
    });
    }

}


saveHolyDay(){
  this.isSubmitted=true;
  if(this.holydayForm.invalid){
    this.toster.warning("Fill Required Fields");
    return;
  }else{
    let obj= new HolydayCalender();
    obj.calenderArray=this.holydayEditForm.value;
    this.sSetupService.saveHolyDayCalender(obj).subscribe((response:ApiResponse)=>{
    if(response.status){
      this.toster.success(response.result,"Success");
      this.btnStatus=false;
      this.Reset();
    }
    else{
      this.toster.error(response.result,"Failed");

    }
  });
  }

}

createHolydayForm(){
  this.holydayForm=this.formBuilder.group({
    id:[0,[]],
    companyID:[this.comId,[]],
    hYear:[,[Validators.required]]
  })
}

get f(){
  return this.holydayForm.controls;
}

Reset(){
  this.isSubmitted=false;
  this.createHolydayForm();
  this.holydayEditForm.controls=[];
  this.items=[];
  this.update();

}
}
