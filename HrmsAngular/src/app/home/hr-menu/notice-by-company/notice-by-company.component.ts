import { AuthService } from './../../../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ResignationLettreModel } from '../../../models/hr/emp-resignation-lettre.model';
import { EmploymentService } from '../../../services/hr/employment.service';
import { ResignationLettreService } from '../../../services/hr/emp-resignation-lettre.service';
import { ToastrService } from 'ngx-toastr';
import { NgbDateCustomParserFormatter } from '../../../shared/dateformat';
import { ApiResponse } from '../../../models/response.model';
import { Employment } from '../../../models/hr/employment.model';

@Component({
  selector: 'app-notice-by-company',
  templateUrl: './notice-by-company.component.html',
  styleUrls: ['./notice-by-company.component.scss']
})
export class NoticeByCompanyComponent implements OnInit {
  isSubmitted=false;
  compId:number;
  type:number;
  btnStatus:string="Save";
  approveType:number;
  noticeLettreForm:FormGroup;
  allLettre:ResignationLettreModel[]=[];
  constructor(
    private formBuilder:FormBuilder,
    private employmentES:EmploymentService,
    private resignationS:ResignationLettreService,
    private toaster:ToastrService,
    private dateFormate:NgbDateCustomParserFormatter
  ) { }

  ngOnInit() {
    this.compId=AuthService.getLoggedCompanyId();
    this.type=2;
    this.approveType=0;
    this.createForm();
    this.getAll();
  }
  getEmpInfo(empCode:string){
    if (empCode == "") {
      this.reset();
      return;
    }
    this.employmentES.getEmployment(empCode,this.compId).subscribe((response:ApiResponse)=>{
      let empInfo=response.result as Employment;
      this.noticeLettreForm.patchValue({
       empCode:empInfo.empCode,
       empName:empInfo.empName,
       empDesignation:empInfo.designation
     })
    })
  }
  saveEmpNotice(){
    this.isSubmitted=true;
    if(this.noticeLettreForm.invalid){
      this.toaster.warning("Fill Required Fields");
      return;
    }
    else{
    this.f.lDate.setValue(this.dateFormate.ngbDateToDate(this.f.lDateNgb.value).toLocaleDateString());
    this.resignationS.savelettre(this.noticeLettreForm.value).subscribe((response:ApiResponse)=>{
    if(response.status){
     this.toaster.success(response.result,"Success");
     this.getAll();
     this.reset();
     this.isSubmitted=false;
     this.btnStatus="Save";
    }
    else{
      this.toaster.error(response.result);
    }
    })
  }
  }
  getAll(){
    this.resignationS.getAllNotice(this.f.gradeValue.value,this.f.companyID.value,this.f.type.value,-1).subscribe((response:ApiResponse)=>{
     if(response.status){
    this.allLettre=response.result as ResignationLettreModel[];
     }
    })
  }
  getById(id:number){
    this.resignationS.getById(id).subscribe((response:ApiResponse)=>{
      let resignation=response.result as ResignationLettreModel;
      this.f.id.setValue(resignation.id);
      this.f.empCode.setValue(resignation.empCode);
      this.getEmpInfo(resignation.empCode);
      this.f.lDateNgb.setValue(this.dateFormate.stringToNgbDate(resignation.lDate));
      this.f.reason.setValue(resignation.reason);
      this.f.lettre.setValue(resignation.lettre);
      this.f.reqFrom.setValue(resignation.reqFrom);
      this.btnStatus="Update"
    })
    }
  createForm(){
    this.noticeLettreForm=this.formBuilder.group({
    id:[,[]],
    empCode:[,[Validators.required]],
    empName:[,[]],
    empDesignation:[,[]],
    lettre:[,[Validators.required]],
    type:[2,[]],
    lDate:[,[]],
    lDateNgb:[,[Validators.required]],
    companyID:[this.compId,[]],
    reason:[,[Validators.required]],
    approveType:[0,[]],
    reqFrom:[0,[]],
    empNameFrom:[,[]],
    empDesignationFrom:[,[]],
    gradeValue:[-1,[]]
    })
  }
  get f(){
  return this.noticeLettreForm.controls;
  }
  get formVal(){
    return this.noticeLettreForm.value;
  }
  reset(){
    this.isSubmitted=false;
    this.createForm();
    this.btnStatus="Save";
  }

}
