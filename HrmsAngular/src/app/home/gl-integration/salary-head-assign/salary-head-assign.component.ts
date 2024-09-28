import { AuthService } from './../../../services/auth.service';
import { id } from '@swimlane/ngx-datatable/release/utils';
import { NgbDateCustomParserFormatter } from './../../../shared/dateformat';
import { GlSalaryHeadAssign } from './../../../models/gl-integration/gl-salary-head-assign.model';
import { Component, OnInit } from '@angular/core';
import { Pagination } from '../../../shared/paginate';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { GlIntegrationService } from '../../../services/gl-integration/gl-integration.service';
import { ToastrService } from 'ngx-toastr';
import { BasicEntryService } from '../../../services/system-setup/basic-entry.service';
import { ApiResponse } from '../../../models/response.model';
import { BasicEntry } from '../../../models/system-setup/basic-entry.model';
import { CostHead } from '../../../models/gl-integration/cost-head.model';

@Component({
  selector: 'app-salary-head-assign',
  templateUrl: './salary-head-assign.component.html',
  styleUrls: ['./salary-head-assign.component.scss','../../../../vendor/libs/ng-select/ng-select.scss']
})
export class SalaryHeadAssignComponent extends Pagination implements OnInit {

  constructor(
    private formBuilder:FormBuilder,
    private glIntegrationService:GlIntegrationService,
    private toasterService:ToastrService,
    private dateFormetter:NgbDateCustomParserFormatter
  ) {
    super()
  }

  ngOnInit() {
    this.items=[];
    this.update;
    this.compId=AuthService.getLoggedCompanyId();
    this.createForm();
    this.getAllCosthead();
    this.searchKeys=['accountName'];
  }
  glSalaryHeadAssignForm:FormGroup;
  glSalaryHeadAssignModel:GlSalaryHeadAssign[]=[];
  compId:number;
  isbtnSaveClick=false;
  btnStatus:string="Save";
  costHeadList:CostHead[]=[];

  getAllCosthead(){
    this.glIntegrationService.getlistCostHead().subscribe((response:ApiResponse)=>{
      if(response){
        this.costHeadList=response.result as CostHead[];
      }
      else{
        this.costHeadList=[];
      }
    })
  }


  getAllGLSalaryHeadAssign(){
    let glsalheadassgn=new GlSalaryHeadAssign();
    glsalheadassgn=this.glSalaryHeadAssignForm.value;
    glsalheadassgn.costHead=this.f.costHead.value;
    if(glsalheadassgn.costHead==null){return;}
    this.glIntegrationService.getAllGLSalaryHeadAssign(glsalheadassgn, 2).subscribe((response:ApiResponse)=>{
      if(response.status){
        this.items=response.result as GlSalaryHeadAssign[];
        this.glSalaryHeadAssignModel=response.result as GlSalaryHeadAssign[];
        this.update();
      }
      else{
        this.glSalaryHeadAssignModel=[];
      }
    })
   }
   saveOrUpdateGLSalaryHeadAssign(){
     this.isbtnSaveClick=true;
     if(this.glSalaryHeadAssignForm.invalid){
       this.toasterService.error("Please fill the all required fields","Invalid submission");
       return;
     }
   this.glIntegrationService.saveOrUpdateGLSalaryHeadAssign(this.glSalaryHeadAssignForm.value,1).subscribe((response:ApiResponse)=>{
     if(response){
       this.toasterService.success(response.result,"Success!");
       this.btnStatus="Save";
       this.getAllGLSalaryHeadAssign();
       this.reset();
     }
     else{
       this.toasterService.error(response.result,"Faildes!")
     }
   })
   }
   getGLSalaryHeadAssignByID(id:number){
   let costHeadID:GlSalaryHeadAssign=this.items.find(c=>c.id==id);
   this.glSalaryHeadAssignForm.patchValue(costHeadID);
   this.glSalaryHeadAssignForm.patchValue({
     dateNgb:this.dateFormetter.stringToNgbDate(costHeadID.date.toString())

   })

   this.btnStatus="Update";
   }
   onSelect(salaryHead:any){
    this.glSalaryHeadAssignForm.patchValue({
      salaryHead:salaryHead.id
    })
   }

   reset(){
     this.glSalaryHeadAssignForm.reset();
     this.createForm();
     this.isbtnSaveClick=false;
     this.btnStatus="Save";
   }

   createForm(){
     this.glSalaryHeadAssignForm=this.formBuilder.group({
      id :[0,[]],
      costHead :[,[Validators.required]],
      salaryHead :[,[Validators.required]],
      date :[,[]],
      dateNgb:[,[Validators.required]],
      note :[,[Validators.required]],
      userID :[,[]],
      companyID :[this.compId,[]],
      accountName :[,[]],
      costHeadName :[,[]]
     })
   }
   get f(){
     return this.glSalaryHeadAssignForm.controls;
   }
   get formVal(){
     return this.glSalaryHeadAssignForm.value;
   }

}
