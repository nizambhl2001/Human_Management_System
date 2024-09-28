import { AuthService } from './../../../services/auth.service';
import { Pagination } from './../../../shared/paginate';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Division } from '../../../models/system-setup/division.model';
import { SystemSetupService } from '../../../services/system-setup/system-setup.service';
import { ToastrService } from 'ngx-toastr';
import { ApiResponse } from '../../../models/response.model';
import { LineModel } from '../../../models/system-setup/line.model';
import { FloreModel } from '../../../models/system-setup/flore.model';

@Component({
  selector: 'app-production-line',
  templateUrl: './production-line.component.html',
  styleUrls: ['./production-line.component.scss']
})
export class ProductionLineComponent extends Pagination implements OnInit {

  ProductionLineForm:FormGroup;
  comId:number;
  btnStatus;
  ProductionLineItem:LineModel[]=[];
  floreItem:FloreModel[]=[];
  lineItem:LineModel[]=[];
  isSubmitted = false;
  userID:number;
    constructor(
      private formBuilder:FormBuilder,
      private sSetupService:SystemSetupService,
      private toster:ToastrService,

    ) {
      super();
    }
  title="Production Line";
  ngOnInit() {
    this.comId=AuthService.getLoggedCompanyId();
    this.userID=AuthService.getLoggedUserId();
    this.items = [];
    this.searchKeys=['description']
    this.update();
    this.btnStatus="Save";
    this.createProductionLineForm();

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
          this.items=response.result as LineModel[];
          this.update();
          this.lineItem=response.result as LineModel[];
        }
        else{
          this.lineItem=[];
          this.items=[];
          this.update();
        }
      });
    }
  }

  getByIdProductionLine(id:number){
    this.sSetupService.getByIdProductionLine(id).subscribe((response:ApiResponse)=>{
      if(response.status){
        this.ProductionLineForm.patchValue(response.result);
        this.btnStatus="Update";
      }else{
        this.toster.error(response.result,"Error")
      }

    });
  }

  saveProductionLine(){
    this.isSubmitted=true;
      if(this.ProductionLineForm.invalid){
        this.toster.warning("Fill Required Fields");
        return;
      }else{
        this.sSetupService.saveOrUpdateProductionLine(this.ProductionLineForm.value).subscribe((response:ApiResponse)=>{
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

  updateProductionLine(){
    this.sSetupService.saveOrUpdateProductionLine(this.ProductionLineForm.value).subscribe((response:ApiResponse)=>{
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
      this.saveProductionLine();
    }else{
      this.isSubmitted=true;
      if(this.ProductionLineForm.invalid){
        this.toster.warning("Fill Required Fields");
        return;
      }else{
      this.updateProductionLine();}
    }
  }

  createProductionLineForm(){
    this.ProductionLineForm=this.formBuilder.group({
      id:[0,[Validators.required]],
      userID:[this.userID,[]],
      companyID:[this.comId,[Validators.required]],
      productionUniteID:[,[Validators.required]],
      floreID:[,[Validators.required]],
      description:[,[Validators.required]]

    })
  }

  get f(){
    return this.ProductionLineForm.controls;
  }

  Reset(){
    this.btnStatus="Save";
    this.isSubmitted=false;
    this.ProductionLineForm.reset();
    this.createProductionLineForm();
    this.items=[];
    this.update();

  }

}
