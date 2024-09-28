import { AuthService } from './../../../services/auth.service';
import { Pagination } from './../../../shared/paginate';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { SalaryProcessService } from '../../../services/salary-process/salary-process-service.service';
import { ApiResponse } from '../../../models/response.model';
import { NewJoin } from '../../../models/salary-process/new-join.modelel';
import { NgbDateCustomParserFormatter } from '../../../shared/dateformat';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-new-join',
  templateUrl: './new-join.component.html',
  styleUrls: ['./new-join.component.scss',
  '../../../../vendor/libs/ng-select/ng-select.scss',
  '../../../../vendor/libs/angular2-ladda/ladda.scss']
})
export class NewJoinComponent extends Pagination implements OnInit {

  newJoinForm:FormGroup
  comId:number;
  grade:number;
  newJoinitem:NewJoin[]=[];
  isSubmitted=false;
  isShowEmplowee:boolean=false;
  constructor(
    private formBuilder:FormBuilder,
    private sPService:SalaryProcessService,
    private ngbDateService:NgbDateCustomParserFormatter,
    private toster:ToastrService,
  ) {
    super()
  }

  ngOnInit() {
    this.items = [];
    this.update
    this.comId=AuthService.getLoggedCompanyId();
    this.grade=AuthService.getLoggedGradeValue();
    this.createNewJoinForm();
  }

getNewJoinInfo(){
  this.isSubmitted=true;
  if(this.newJoinForm.invalid){
  }else{
    this.isShowEmplowee=true;
    let sDate = this.ngbDateService.ngbDateToDate(this.f.ngbStartDate.value).toLocaleDateString();
  let endDate = this.ngbDateService.ngbDateToDate(this.f.ngbEndDate.value).toLocaleDateString();
  this.sPService.getNewJoiningInfo( this.grade,sDate,endDate,this.comId).subscribe((response:ApiResponse)=>{
    if(response.status){
      this.isShowEmplowee=false;
      this.items= response.result as NewJoin[];
      this.update();

    }
    else{
      this.isShowEmplowee=false;
      this.toster.show(response.result,"Information")
      this.items= [];
      this.update();

    }
  });
  }

}

createNewJoinForm(){
  this.newJoinForm=this.formBuilder.group({
    companyID:[this.comId,[]],
    grade:[this.grade,[]],
    ngbStartDate:[,[Validators.required]],
    ngbEndDate:[,[Validators.required]]
  });
}

get f(){
  return this.newJoinForm.controls;
}

Reset(){
  this.isShowEmplowee=false;
  this.isSubmitted=false;
  this.items.length=0;
  this.update();
  this.newJoinForm.reset();
  this.createNewJoinForm();
}
}
