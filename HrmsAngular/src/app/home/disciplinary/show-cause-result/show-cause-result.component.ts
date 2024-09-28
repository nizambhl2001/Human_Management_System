import { AuthService } from './../../../services/auth.service';
import { Title } from '@angular/platform-browser';
import { Pagination } from './../../../shared/paginate';
import { Component, OnInit } from '@angular/core';
import { ApiResponse } from '../../../models/response.model';
import { EmploymentService } from '../../../services/hr/employment.service';
import { Employment } from '../../../models/hr/employment.model';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ShowcauseResult } from '../../../models/disciplinary-action/showcauseresult.model';
import { ShowCauseResultService } from '../../../services/disciplinary-action/show-cause-result.service';
import { NgbDateCustomParserFormatter } from '../../../shared/dateformat';
import { ToastrService } from 'ngx-toastr';
import { BasicEntry } from '../../../models/system-setup/basic-entry.model';
import { BasicEntryService } from '../../../services/system-setup/basic-entry.service';

@Component({
  selector: 'app-show-cause-result',
  templateUrl: './show-cause-result.component.html',
  styleUrls: ['./show-cause-result.component.scss']
})
export class ShowCauseResultComponent extends Pagination implements OnInit {


  constructor
  (

      private sCRType:BasicEntryService,
      private toaster:ToastrService,
      private employmentES:EmploymentService,
      private dateFrmat:NgbDateCustomParserFormatter,
      private showCauseResultService:ShowCauseResultService,
      private employmentService:EmploymentService,
      private formBuilder:FormBuilder
  ) {
    super();
   }
  title="Show Cause Result";

  resultDetails:BasicEntry[];
  resultType:BasicEntry[];
  showcauseResult:ShowcauseResult[]=[];
  showCauseResultForm:FormGroup;
  compId:number;
  userId:number;
  gradeValue:number;
  btnStatus="Save";
  isSubmitted = false;
  totalEmployee;
  ngOnInit () {
    this.items=[];
    this.update();
    this.searchKeys=['empName'];
    this.createShowCauseResultform();
    this.compId=AuthService.getLoggedCompanyId();
    this.userId=AuthService.getLoggedUserId();
    this.gradeValue=AuthService.getLoggedGradeValue();
    this.getAllResult();
    this.getAllShowCauseResultType();
    this.getAllShowCauseResultDeteils();
  }

getAllShowCauseResultType(){
  this.sCRType.getAllShowCauseResultType().subscribe((response:ApiResponse)=>{
    if(response.status){
      this.resultType = response.result as BasicEntry[]
    }
  })
}
getEmpInfo(empCode:string){
  if (empCode == "") {
    this.Reset();
    return;
  }
  this.employmentES.getEmployment(empCode,this.compId).subscribe((response:ApiResponse)=>{
    let empInfo=response.result as Employment;
    this.showCauseResultForm.patchValue({
     empCode:empInfo.empCode,
     empName:empInfo.empName,
     department:empInfo.department,
     designation:empInfo.designation
   })
  })
}
getAllShowCauseResultDeteils(){
  this.sCRType.getAllShowCauseResultDetails().subscribe((response:ApiResponse)=>{
    if(response.status){
      this.resultDetails = response.result as BasicEntry[]
    }else{
      this.resultDetails=[];
    }
  })
}


getAllResult(){
  this.showCauseResultService.getAllShowCauseResult(null,this.gradeValue,this.compId).subscribe((response:ApiResponse)=>{
    if(response.status){
      this.items= response.result as ShowcauseResult[];
      this.showcauseResult =response.result as ShowcauseResult[];
      this.update();
      this.totalEmployee= this.items.length
    }else{
      this.items=[];
      this.update();
      this.showcauseResult=[];
    }
  })
}


saveCauseResult(){
  this.isSubmitted=true;
  if(this.showCauseResultForm.invalid){
    this.toaster.warning("Fill Required Fields");
    return;
  }else{
    this.btnStatus="Save";
  let showCauseResultObj =new ShowcauseResult();
  showCauseResultObj = this.showCauseResultForm.value;
  showCauseResultObj.startDate = this.dateFrmat.ngbDateToDate(this.f.startDateNgb.value);
  showCauseResultObj.endDate = this.dateFrmat.ngbDateToDate(this.f.endDateNgb.value);
  showCauseResultObj.date = this.dateFrmat.ngbDateToDate(this.f.dateNgb.value);
  showCauseResultObj.userID=this.userId;
  showCauseResultObj.companyID=this.compId;
  this.showCauseResultService.saveShowCauseResult(this.showCauseResultForm.value).subscribe((response:ApiResponse)=>{
    if(response.status){

    this.toaster.success(response.result,"Success!");
    this.Reset();
    this.getAllResult();
    this.update();
  }
  else
  {
    this.toaster.error(response.result,"Failed!");
  }
  });
  }

}


getResultById(id:number){
  this.btnStatus="Update";
  this.showCauseResultService.getShowCauseById(id).subscribe((response:ApiResponse)=>{
    if(response.status){
      let showCauseResult = response.result as ShowcauseResult;
      showCauseResult.startDateNgb = this.dateFrmat.stringToNgbDate(showCauseResult.startDate.toString());
      showCauseResult.endDateNgb = this.dateFrmat.stringToNgbDate(showCauseResult.endDate.toString());
      showCauseResult.dateNgb = this.dateFrmat.stringToNgbDate(showCauseResult.date.toString());
      this.showCauseResultForm.patchValue(response.result);
      this.getEmpInfoById(showCauseResult.empCode);
  };});
}


  getEmpInfoById(empCode: string) {
    if (empCode == "") {
      return;
    }
      this.employmentService.getEmployment(empCode, this.compId).subscribe((response: ApiResponse) => {
        if (response.status) {
          let empInfo = response.result as Employment;
          this.f.empName.setValue(empInfo.empName);
          this.f.department.setValue(empInfo.department);
          this.f.designation.setValue(empInfo.designation);
        }

      })
  }

  createShowCauseResultform(){
    this.showCauseResultForm= this.formBuilder.group({
      id : [0,[]],
      empCode : [,[Validators.required]],
      showCauseTypeID:[0,[Validators.required]],
      startDateNgb : [0,[]],
      endDateNgb : [0,[]],
      startDate : [0,[]],
      endDate : [0,[]],
      showCauseResultID:[0,[Validators.required]],
      dateNgb : [0,[]],
      date : [0,[]],
      note : [,[]],
      userID : [this.userId,[]],
      companyID : [this.compId,[]],
      empName:[,[]],
      designation:[,[]],
      department:[,[]]
    })
  }

  get formVal() {
    return this.showCauseResultForm.value;
  }

  Reset(){
    this.btnStatus="Save";
    this.isSubmitted=false;
    this.showCauseResultForm.reset();
    this.createShowCauseResultform();
  }

  get f() {
    return this.showCauseResultForm.controls;
  }

}
