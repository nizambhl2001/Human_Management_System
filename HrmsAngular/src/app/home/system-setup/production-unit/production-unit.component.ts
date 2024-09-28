import { AuthService } from './../../../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { Pagination } from '../../../shared/paginate';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Division } from '../../../models/system-setup/division.model';
import { SystemSetupService } from '../../../services/system-setup/system-setup.service';
import { ToastrService } from 'ngx-toastr';
import { ApiResponse } from '../../../models/response.model';
import { BasicEntry } from '../../../models/system-setup/basic-entry.model';
import { BasicEntryService } from '../../../services/system-setup/basic-entry.service';

@Component({
  selector: 'app-production-unit',
  templateUrl: './production-unit.component.html',
  styleUrls: ['./production-unit.component.scss']
})
export class ProductionUnitComponent extends Pagination implements OnInit {

  productionUnitForm:FormGroup;
  comId:number;
  btnStatus;
  productionUnitItem:BasicEntry[]=[];
  filteredItem:BasicEntry[]=[];
  isSubmitted = false;
    constructor(
      private formBuilder:FormBuilder,
      private sSetupService:SystemSetupService,
      private toster:ToastrService,
      private basicEntryService:BasicEntryService

    ) {
      super();
    }
  title="Production Unit";
  ngOnInit() {
    this.comId=AuthService.getLoggedCompanyId();
    this.items = [];
    this.searchKeys=['description']
    this.update();
    this.btnStatus="Save";
    this.createProductionUnitForm();
    this.getAllProductionUnitList();
  }

  onFilter(event){
    if(event.target.value){
      this.filteredItem = this.productionUnitItem.filter(item=>item.description.toLowerCase().match(event.target.value.toString().toLowerCase()))
      }else{
      this.filteredItem = this.productionUnitItem;
    }
  }

  getAllProductionUnitList(){

      this.basicEntryService.getProductionUnit(this.comId).subscribe((response:ApiResponse)=>{
        if(response.status){
         console.log(response.result)
          this.filteredItem=response.result as BasicEntry[];
          this.productionUnitItem=response.result as BasicEntry[];
          this.update();
        }
        else{
          this.items=[];
          this.update();
        }
      });
  }

  // delete(id:number){
  // this.sSetupService.deleteDivision(id).subscribe((response:ApiResponse)=>{
  //   if(response.status){
  //     this.toster.success(response.result,"Success");
  //     this.getAllDivisionList();
  //     this.Reset();
  //   }else{
  //     this.toster.error(response.result,"Failed");
  //   }
  // });
  // }


  getById(id:number){
    this.sSetupService.getByIdProductionUnit(id).subscribe((response:ApiResponse)=>{
      if(response.status){
        this.productionUnitForm.patchValue(response.result);
        this.btnStatus="Update";
      }
    });
  }

  saveProductionUnit(){
    this.isSubmitted=true;
      if(this.productionUnitForm.invalid){
        this.toster.warning("Fill Required Fields");
        return;
      }else{
        this.sSetupService.saveOrUpdateProductionUnit(this.productionUnitForm.value).subscribe((response:ApiResponse)=>{
          if(response.status){
            this.toster.success(response.result,"Success");
            this.Reset();
            this.items=[];
            this.update();
            this.getAllProductionUnitList();
          }
          else{
            this.toster.error(response.result,"Failed");
          }
         });
      }

  }

  updateProductionUnit(){
    this.sSetupService.saveOrUpdateProductionUnit(this.productionUnitForm.value).subscribe((response:ApiResponse)=>{
      if(response.status){
        this.toster.success(response.result,"Success");
        this.items=[];
        this.update();
        this.Reset();
        this.btnStatus="Save";
        this.getAllProductionUnitList();
      }
      else{
        this.toster.error(response.result,"Failed");
      }
    });
  }



  onSubmit(){

    if(this.btnStatus=="Save"){
      this.saveProductionUnit();
    }else{
      this.isSubmitted=true;
      if(this.productionUnitForm.invalid){
        this.toster.warning("Fill Required Fields");
        return;
      }else{
      this.updateProductionUnit();}
    }
  }

  createProductionUnitForm(){
    this.productionUnitForm=this.formBuilder.group({
      id:[0,[Validators.required]],
      companyID:[this.comId,[Validators.required]],
      description:[,[Validators.required]],
      userID:[1,[Validators.required]]
    })
  }

  get f(){
    return this.productionUnitForm.controls;
  }

  Reset(){
    this.btnStatus="Save";
    this.isSubmitted=false;
    this.productionUnitForm.reset();
    this.createProductionUnitForm();
   this.getAllProductionUnitList();
  }
}
