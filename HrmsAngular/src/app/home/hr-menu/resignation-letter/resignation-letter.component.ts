import { AuthService } from './../../../services/auth.service';
import { NgbDateCustomParserFormatter } from './../../../shared/dateformat';
import { ToastrService } from 'ngx-toastr';
import { ApiResponse } from './../../../models/response.model';
import { EmploymentService } from './../../../services/hr/employment.service';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { ResignationLettreModel } from '../../../models/hr/emp-resignation-lettre.model';
import { SearchEmployee } from '../../../models/hr/search-emp.model';
import { ResignationLettreService } from '../../../services/hr/emp-resignation-lettre.service';
import { Employment } from '../../../models/hr/employment.model';

@Component({
  selector: 'app-resignation-letter',
  templateUrl: './resignation-letter.component.html',
  styleUrls: ['./resignation-letter.component.scss']
})
export class ResignationLetterComponent implements OnInit {
  btnStatus:string="Save";
  type:number;
  isSubmitted=false;
  approveType:number;
  compId:number;
  resignationlettre:FormGroup;
  allResignation:ResignationLettreModel[]=[]
  constructor(
    private formBuilder:FormBuilder,
    private toaster:ToastrService,
    private dateFormate:NgbDateCustomParserFormatter,
    private resignationS:ResignationLettreService,
    private employmentES:EmploymentService
  ) { }

  ngOnInit() {
    this.compId=AuthService.getLoggedCompanyId();
    this.type=1;
    this.approveType=0;
    this.createForm();
    this.getAll();
  }
  getFromEmpInfoById(reqFrom:string) {
    if (reqFrom == "") {
      return;
    }
    this.employmentES.getEmployment(reqFrom, this.compId).subscribe((response: ApiResponse) => {
      if (response.status) {
        let fromEmpInfo = response.result as SearchEmployee;
        this.f.reqTo.setValue(reqFrom);
        this.f.empNameFrom.setValue(fromEmpInfo.empName);
        this.f.empDesignationFrom.setValue(fromEmpInfo.designation);
      }
      else{
      this.f.empNameFrom.setValue(null);
      this.f.empDesignationFrom.setValue(null);
      }
    })
  }
  getEmpInfo(empCode:string){
    if (empCode == "") {
      this.reset();
      return;
    }
    this.employmentES.getEmployment(empCode,this.compId).subscribe((response:ApiResponse)=>{
      let empInfo=response.result as Employment;
      this.resignationlettre.patchValue({
       empCode:empInfo.empCode,
       empName:empInfo.empName,
       empDesignation:empInfo.designation
     })
     let reportTo=empInfo.reportTo;
     this.employmentES.getEmployment(reportTo,this.compId).subscribe((response:ApiResponse)=>{
       let reportToempInfo=response.result as Employment;
       this.resignationlettre.patchValue({
        reqTo:reportToempInfo.empCode,
        empNameFrom:reportToempInfo.empName,
        empDesignationFrom:reportToempInfo.designation
       })
     })
    })
  }
  saveResignation(){
    this.isSubmitted=true;
    if(this.resignationlettre.invalid){
      this.toaster.warning("Fill All Required Fields");
    }
    else{
    this.f.lDate.setValue(this.dateFormate.ngbDateToDate(this.f.lDateNgb.value).toLocaleDateString());
    this.resignationS.savelettre(this.resignationlettre.value).subscribe((response:ApiResponse)=>{
    if(response.status){
     this.toaster.success(response.result,"Success");
     this.isSubmitted=false;
     this.getAll();
     this.reset();
     this.btnStatus="Save";
    }
    else{
      this.toaster.error(response.result);
    }
    })
  }
}
  getAll(){
    this.resignationS.getAllLetter().subscribe((response:ApiResponse)=>{
      if(response.status){
     this.allResignation=response.result as ResignationLettreModel[];
      }

    })
  }
  getById(id:number){
  this.resignationS.getById(id).subscribe((response:ApiResponse)=>{
    let resignation=response.result as ResignationLettreModel;
    this.f.id.setValue(resignation.resignID);
    this.f.empCode.setValue(resignation.empCode);
    this.getEmpInfo(resignation.empCode);
    this.f.lDateNgb.setValue(this.dateFormate.stringToNgbDate(resignation.lDate));
    this.f.reason.setValue(resignation.reason);
    this.f.lettre.setValue(resignation.lettre);
    this.f.reqTo.setValue(resignation.reqTo);
    this.getFromEmpInfoById(resignation.reqTo);
    this.btnStatus="Update"
  })
  }
createForm(){
  this.resignationlettre=this.formBuilder.group({
  id:[,[]],
  empCode:[,[Validators.required]],
  empName:[,[]],
  empDesignation:[,[]],
  lettre:[,[Validators.required]],
  type:[1,[]],
  lDate:[,[]],
  lDateNgb:[,[Validators.required]],
  companyID:[this.compId,[]],
  reason:[,[Validators.required]],
  approveType:[0,[]],
  reqTo:[,[Validators.required]],
  empNameFrom:[,[]],
  empDesignationFrom:[,[]],
  })
}
get f(){
 return this.resignationlettre.controls;
}
get formVal(){
  return this.resignationlettre.value;
}
reset(){
  this.isSubmitted=false;
  this.createForm();
  this.btnStatus="Save";
}
clear(value:FormControl){
value.reset();
}
}
