import { AuthService } from './../../../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { Pagination } from '../../../shared/paginate';
import { SalaryView } from '../../../models/salary-process/salary-view.model';
import { SalaryProcessService } from '../../../services/salary-process/salary-process-service.service';
import { ApiResponse } from '../../../models/response.model';
import { FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-salary-view',
  templateUrl: './salary-view.component.html',
  styleUrls: ['./salary-view.component.scss']
})
export class SalaryViewComponent extends Pagination implements OnInit {

  salaryView:SalaryView[]=[];
  comid:number;
  gradeValue:number;
  salaryViewForm:FormGroup;
  constructor(
          private sPService:SalaryProcessService,
          private formBuilder:FormBuilder
  ) {
    super()
  }
  ngOnInit() {
    this.items=[];
    this.update();
    this.comid=AuthService.getLoggedCompanyId();
    this.gradeValue=AuthService.getLoggedGradeValue();
    this.createSalaryViewForm();

  }

  getEmployment(code:string){
  if(code==""){
    this.Reset();
    return

  }else{
    this.sPService.getSalaryViewList(code,this.f.grade.value,this.f.companyID.value,this.f.salaryType.value).subscribe((response:ApiResponse)=>{
      if(response.status){
        this.salaryView=response.result as SalaryView[];

                this.salaryViewForm.patchValue({
          empName:this.salaryView[0].empName,
          designation:this.salaryView[0].designation
        })
      }
    });
  }
}

createSalaryViewForm(){
  this.salaryViewForm=this.formBuilder.group({
    empCode :[,[]],
    empName :[,[]],
    designation :[,[]],
    salaryHeadType :[,[]],
    accountName :[,[]],
    amount :[,[]],
    salaryType :[1,[]],
    companyID:[this.comid,[]],
    grade:[this.gradeValue,[]]
  })
}

get f(){
 return this.salaryViewForm.controls;
}

Reset(){
 this.createSalaryViewForm();
  this.salaryView.length=0;
  this.items.length=0;
  this.update();
}
}
