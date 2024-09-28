import { AuthService } from './../../../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { Pagination } from '../../../shared/paginate';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { LineModel } from '../../../models/system-setup/line.model';
import { FloreModel } from '../../../models/system-setup/flore.model';
import { SystemSetupService } from '../../../services/system-setup/system-setup.service';
import { ToastrService } from 'ngx-toastr';
import { ApiResponse } from '../../../models/response.model';
import { MachineModel } from '../../../models/system-setup/machine.model';

@Component({
  selector: 'app-production-machine',
  templateUrl: './production-machine.component.html',
  styleUrls: ['./production-machine.component.scss']
})
export class ProductionMachineComponent extends Pagination implements OnInit {

  machineForm:FormGroup;
  comId:number;
  btnStatus;

  ProductionLineItem:LineModel[]=[];
  floreItem:FloreModel[]=[];
  machineItem:MachineModel[]=[];
  isSubmitted = false;
  userID:number;
    constructor(
      private formBuilder:FormBuilder,
      private sSetupService:SystemSetupService,
      private toster:ToastrService,

    ) {
      super();
    }
  title="Production Machine";
  ngOnInit() {
    this.comId=AuthService.getLoggedCompanyId();
    this.userID=AuthService.getLoggedUserId();
    this.items = [];
    this.searchKeys=['description']
    this.update();
    this.btnStatus="Save";
    this.createProductionMachineForm();

  }



  getFloreListByProUnitID(proID:number){
    if(proID==null){
      return;
    }else{
      this.f['productionUniteID'].patchValue(proID);
      this.sSetupService.getFloreList(this.f.productionUniteID.value,this.comId).subscribe((response:ApiResponse)=>{
        if(response.status){
          this.floreItem=response.result as FloreModel[];
        }
        else{
          this.floreItem=[];
        }
      });
    }
  }

  getProductionLineList(floreid:number){
    if(floreid==null){
      return;
    }else{
      this.f['floreID'].patchValue(floreid);
      this.sSetupService.getLineList(this.f.floreID.value,this.comId).subscribe((response:ApiResponse)=>{
        if(response.status){
          this.ProductionLineItem=response.result as LineModel[];
        }
        else{
          this.ProductionLineItem=[];

        }
      });
    }
  }

  getProductionMachineList(lineid:number){
    if(lineid==null){
      return;
    }else{
      this.f['lineID'].patchValue(lineid);
      this.sSetupService.getProductionMachineByLineId(this.f.lineID.value,this.comId).subscribe((response:ApiResponse)=>{
        if(response.status){
          this.items=response.result as MachineModel[];
          this.update();
          this.machineItem=response.result as MachineModel[];
        }
        else{
          this.machineItem=[];
          this.items=[];
          this.update();
        }
      });
    }
  }

  getByIdProductionMachine(id:number){
    this.sSetupService.getMachineId(id).subscribe((response:ApiResponse)=>{
      if(response.status){
        this.machineForm.patchValue(response.result);
        this.btnStatus="Update";
      }else{
        this.toster.error(response.result,"Error")
      }

    });
  }

  saveProductionMachine(){
    this.isSubmitted=true;
      if(this.machineForm.invalid){
        this.toster.warning("Fill Required Fields");
        return;
      }else{
        this.sSetupService.saveOrUpdateProductionMachine(this.machineForm.value).subscribe((response:ApiResponse)=>{
          if(response.status){
            this.toster.success(response.result,"Success");
            this.Reset();
            this.items=[];
            this.update();

          }
          else{
            this.toster.error(response.result,"Failed");
          }
         });
      }

  }

  updateProductionMachine(){
    this.sSetupService.saveOrUpdateProductionMachine(this.machineForm.value).subscribe((response:ApiResponse)=>{
      if(response.status){
        this.toster.success(response.result,"Success");
        this.items=[];
        this.update();
        this.Reset();
        this.btnStatus="Save";

      }
      else{
        this.toster.error(response.result,"Failed");
      }
    });
  }



  onSubmit(){

    if(this.btnStatus=="Save"){
      this.saveProductionMachine();
    }else{
      this.isSubmitted=true;
      if(this.machineForm.invalid){
        this.toster.warning("Fill Required Fields");
        return;
      }else{
      this.updateProductionMachine();}
    }
  }

  createProductionMachineForm(){
    this.machineForm=this.formBuilder.group({
      id:[0,[Validators.required]],
      userID:[this.userID,[]],
      companyID:[this.comId,[Validators.required]],
      productionUniteID:[,[Validators.required]],
      floreID:[,[Validators.required]],
      lineID:[,[Validators.required]],
      description:[,[Validators.required]]

    })
  }

  get f(){
    return this.machineForm.controls;
  }

  Reset(){
    this.btnStatus="Save";
    this.isSubmitted=false;
    this.machineForm.reset();
    this.createProductionMachineForm();
    this.items=[];
    this.update();

  }
}
