import { AuthService } from './../../../services/auth.service';
import { ToastrService } from 'ngx-toastr';
import { CostHead } from './../../../models/gl-integration/cost-head.model';
import { ApiResponse } from './../../../models/response.model';
import { GlIntegrationService } from './../../../services/gl-integration/gl-integration.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Pagination } from '../../../shared/paginate';

@Component({
  selector: 'app-cost-head',
  templateUrl: './cost-head.component.html',
  styleUrls: ['./cost-head.component.scss']
})
export class CostHeadComponent extends Pagination implements OnInit {

  constructor(
    private formBuilder:FormBuilder,
    private glIntegrationService:GlIntegrationService,
    private toasterService:ToastrService

  ) {
    super()
  }

  ngOnInit() {
    this.items=[];
    this.update;
    this.compId=AuthService.getLoggedCompanyId();
    this.createForm();
    this.getAllCostHead();
    this.searchKeys=['costHead'];

  }
  costheadForm:FormGroup;
  costHeadModel:CostHead[]=[];
  compId:number;
  isbtnSaveClick=false;
  btnStatus:string="Save";


getAllCostHead(){
 this.glIntegrationService.getAllCostHead(this.costheadForm.value,2).subscribe((response:ApiResponse)=>{
   if(response.status){
     this.items=response.result as CostHead[];
     this.costHeadModel=response.result as CostHead[];
     this.update();
   }
   else{
     this.costHeadModel=[];
   }
 })
}
saveOrUpdateCostHead(){
  this.isbtnSaveClick=true;
  if(this.costheadForm.invalid){
    this.toasterService.error("Please fill the all required fields","Invalid submission");
    return;
  }
this.glIntegrationService.saveOrUpdateCostHead(this.costheadForm.value,1).subscribe((response:ApiResponse)=>{
  if(response){
    this.toasterService.success(response.result,"Success!");
    this.btnStatus="Save";
    this.getAllCostHead();
    this.reset();
  }
  else{
    this.toasterService.error(response.result,"Failed!")
  }
})
}
getCostHeadByID(id:number){
let costHeadID=this.items.find(c=>c.id==id);
this.costheadForm.patchValue(costHeadID);
this.btnStatus="Update";
}


reset(){
  this.costheadForm.reset();
  this.createForm();
  this.isbtnSaveClick=false;
  this.btnStatus="Save";
}

createForm(){
  this.costheadForm=this.formBuilder.group({
    id  :[0,[]],
    costHead  :[,[Validators.required]],
    companyID  :[this.compId,[]],
    createUser  :[,[]]

  })
}
get f(){
  return this.costheadForm.controls;
}
}
