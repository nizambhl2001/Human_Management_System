import { AuthService } from './../../../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { BasicEntry } from '../../../models/system-setup/basic-entry.model';
import { BasicEntryService } from '../../../services/system-setup/basic-entry.service';
import { ApiResponse } from '../../../models/response.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApprisalService } from '../../../services/Apprisal/apprisal.service';
import { KpiSetupModel } from '../../../models/Apprisal/kpisetup';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-kpi-setup',
  templateUrl: './kpi-setup.component.html',
  styleUrls: ['./kpi-setup.component.scss', '../../../../vendor/libs/ng-select/ng-select.scss']
})
export class KpiSetupComponent implements OnInit {
  empcode:string;
  userTypeID:number;
  companyid:number;

  constructor(
    private basicEntryService:BasicEntryService,
    private formbuilder:FormBuilder,
    private appservice:ApprisalService,
    private toasterservice:ToastrService
    ) { }

  ngOnInit() {
    this.getDepartmentName();
    this.createForm();
    this.createForm2();
    this.empcode=AuthService.getLoggedEmpCode();
    this.userTypeID=AuthService.getLoggedUserTypeId();
    this.companyid=AuthService.getLoggedCompanyId();
    this.getbusiness();
    this.getPeople();
  }
  title="Kpi Setup";
  saveupdate="Save";
  SavePeople="Save";
  departments:BasicEntry[]=[];
  kpiBusinessfrom:FormGroup;
  kpiPeopleform:FormGroup;
  KpiBusinessResult:KpiSetupModel[]=[];
  kpiPeopleResult:KpiSetupModel[]=[];
  isSubmitted:boolean=false;
  isSubmited:boolean=false;
  getDepartmentName() {
    this.basicEntryService.getDepartment().subscribe((response: ApiResponse) => {
      if (response.status) {
        this.departments = response.result as BasicEntry[];
      }

    })
  }

  getbusiness(){
    this.appservice.getbusinessresult(this.empcode,this.userTypeID,this.companyid).subscribe((response: ApiResponse) => {
      if (response.status) {
        this.KpiBusinessResult = response.result as KpiSetupModel[];
      }
    })
  }
getPeople(){
  this.appservice.getPeopleresult(this.empcode,this.userTypeID,this.companyid).subscribe((response:ApiResponse)=>{

    if(response.status){
      this.kpiPeopleResult=response.result as KpiSetupModel[];
    }
  })
}
  businessEdit(id:number){
    this.appservice.getKpiByid(id).subscribe((response:ApiResponse)=>{
    this.saveupdate="Update";
      if(response.status){
        this.kpiBusinessfrom.patchValue(response.result);
      }
    })
  }
  peopleEdit(id:number){
    this.appservice.getKpiByid(id).subscribe((response:ApiResponse)=>{
    this.SavePeople="Update";
      if(response.status){
        this.kpiPeopleform.patchValue(response.result);
      }
    })
  }
  saveUpdateBusiness(){
    this.isSubmitted=true;
    if(this.kpiBusinessfrom.invalid){
      this.toasterservice.error('Please fill all required field', 'Invalid Submission!');
      return;
    }
    this.kpiBusinessfrom.patchValue({option:1});
    this.appservice.saveUpdateKpi(this.kpiBusinessfrom.value).subscribe((res:ApiResponse)=>{
      if(res.status){
        this.toasterservice.success(this.saveupdate + " Successfully.","Success");
        this.getbusiness();
        this.resetBusiness();
      }else{
        this.toasterservice.error(res.result,"Failed");
      }
    })
  }
  saveUpdatePeople(){
    this.isSubmited=true;
    if(this.kpiPeopleform.invalid){
      this.toasterservice.error('Please fill all required field', 'Invalid Submission!');
      return;
    }
    this.kpiPeopleform.patchValue({option:1});
    this.appservice.saveUpdateKpi(this.kpiPeopleform.value).subscribe((res:ApiResponse)=>{
      if(res.status){
        this.toasterservice.success(this.SavePeople +" Successfully.","Success");
        this.resetPeople();
        this.getPeople();
      }else{
        this.toasterservice.error(res.result,"Failed");
      }
    })
  }
  createForm(){
    this.kpiBusinessfrom=this.formbuilder.group({
       id:[0,[]],
       kpiName:[,[Validators.required]],
       serialNo:[,[Validators.required]],
       departmentId:[,[Validators.required]],
       kpiType:[1,[]],
       userId:[this.userTypeID,[]],
       companyId:[1,[]],
       option:[,[]]
    })
    }
 createForm2(){
    this.kpiPeopleform=this.formbuilder.group({
      id:[0,[]],
      kpiName:[,[Validators.required]],
      serialNo:[,[Validators.required]],
      departmentId:[,[Validators.required]],
      kpiType:[2,[]],
      userId:[this.userTypeID,[]],
      companyId:[1,[]],
      option:[,[]]
    })
    }
    get f(){
      return this.kpiBusinessfrom.controls;
    }
    get g(){
      return this.kpiPeopleform.controls;
    }

    resetBusiness(){
      this.createForm();
      this.saveupdate="Save";
      this.isSubmitted=false;
    }
    resetPeople(){
      this.createForm2();
      this.SavePeople="Save";
      this.isSubmited=false;
    }
    businessDelete(id:number){
    this.appservice.deleteKpi(id,this.companyid).subscribe((response:ApiResponse)=>{
    if(response.status)
      {
        this.toasterservice.success("Deleted Successfully.","Success");
        this.getbusiness();
      }
    })
    }
    peopleDelete(id:number){
    this.appservice.deleteKpi(id,this.companyid).subscribe((response:ApiResponse)=>{
    if(response.status)
      {
        this.toasterservice.success("Deleted Successfully.","Success");
        this.getPeople();
      }
    })
    }


}
