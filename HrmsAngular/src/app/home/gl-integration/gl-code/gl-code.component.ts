import { AuthService } from './../../../services/auth.service';

import { BasicEntryService } from './../../../services/system-setup/basic-entry.service';
import { GlCode } from './../../../models/gl-integration/gl-code.model';
import { Component, OnInit } from '@angular/core';
import { Pagination } from '../../../shared/paginate';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { GlIntegrationService } from '../../../services/gl-integration/gl-integration.service';
import { ToastrService } from 'ngx-toastr';
import { ApiResponse } from '../../../models/response.model';
import { CostHead } from '../../../models/gl-integration/cost-head.model';
import { BasicEntry } from '../../../models/system-setup/basic-entry.model';

@Component({
  selector: 'app-gl-code',
  templateUrl: './gl-code.component.html',
  styleUrls: ['./gl-code.component.scss','../../../../vendor/libs/ng-select/ng-select.scss']
})
export class GlCodeComponent extends Pagination implements OnInit {

  constructor(
    private formBuilder:FormBuilder,
    private glIntegrationService:GlIntegrationService,
    private toasterService:ToastrService,
    private basicServic:BasicEntryService
  ) {
    super()
  }

  ngOnInit() {
    this.items=[];
    this.update;
    this.compId=AuthService.getLoggedCompanyId();
    this.createForm();
    this.getAllCosthead();
    this.getAllBranch();
    this.getAlldeptGL();
    this.searchKeys=['costHead'];
  }
  glCodeForm:FormGroup;
  glCodeModel:GlCode[]=[];
  compId:number;
  isbtnSaveClick=false;
  btnStatus:string="Save";
  allLocation:BasicEntry[]=[];
  allDeptGL:BasicEntry[]=[];
  costHeadList:CostHead[]=[];

  getAllCosthead(){
    this.glIntegrationService.getlistCostHead().subscribe((response:ApiResponse)=>{
      if(response){
        this.costHeadList=response.result as CostHead[];
      }
    })
  }
getAllBranch(){
  this.basicServic.getBranch().subscribe((response:ApiResponse)=>{
    if(response){
      this.allLocation=response.result as BasicEntry[];
    }
  })
}
getAlldeptGL(){
  this.basicServic.getDepartmentGL().subscribe((response:ApiResponse)=>{
    if(response){
      this.allDeptGL=response.result as BasicEntry[];
    }
  })
}

  getAllGLCode(){
    let glcode=new GlCode();
    glcode=this.glCodeForm.value;
    glcode.branchID=this.f.branchID.value;
    this.glIntegrationService.getAllGLCode(glcode, 2).subscribe((response:ApiResponse)=>{
      console.log(response.result);
      if(response.status){
        this.items=response.result as GlCode[];
        this.glCodeModel=response.result as GlCode[];
        this.update();
      }
      else{
        this.glCodeModel=[];
      }
    })
   }
   saveOrUpdateGLCode(){
     this.isbtnSaveClick=true;
     if(this.glCodeForm.invalid){
       this.toasterService.error("Please fill the all required fields","Invalid submission");
       return;
     }
   this.glIntegrationService.saveOrUpdateGLCode(this.glCodeForm.value,1).subscribe((response:ApiResponse)=>{
     if(response){
       this.toasterService.success(response.result,"Success!");
       this.btnStatus="Save";
       this.getAllGLCode();
       this.reset();
     }
     else{
       this.toasterService.error(response.result,"Faildes!")
     }
   })
   }
   getGLCodeByID(id:number){
   let costHeadID=this.items.find(c=>c.id==id);
   this.glCodeForm.patchValue(costHeadID);
   this.btnStatus="Update";
   }


   reset(){
     this.glCodeForm.reset();
     this.createForm();
     this.isbtnSaveClick=false;
     this.btnStatus="Save";
   }

   createForm(){
     this.glCodeForm=this.formBuilder.group({
      id :[0,[]],
      costID :[,[Validators.required]],
      depertmentID :[,[Validators.required]],
      branchID :[,[Validators.required]],
      glCode :[,[Validators.required]],
      glDescription :[,[Validators.required]],
      userID :[,[]],
      companyID :[this.compId,[]],
      branch:[,[]],
      departmentGL:[,[]],
      costHead:[,[]]
     })
   }
   get f(){
     return this.glCodeForm.controls;
   }
   get formVal(){
     return this.glCodeForm.value;
   }
}
