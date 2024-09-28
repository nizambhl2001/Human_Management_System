import { AuthService } from './../../../services/auth.service';
import { Pagination } from './../../../shared/paginate';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { SystemSetupService } from '../../../services/system-setup/system-setup.service';
import { ToastrService } from 'ngx-toastr';
import { ApiResponse } from '../../../models/response.model';
import { FloreModel } from '../../../models/system-setup/flore.model';
import { BasicEntryService } from '../../../services/system-setup/basic-entry.service';

@Component({
  selector: 'app-production-floor',
  templateUrl: './production-floor.component.html',
  styleUrls: ['./production-floor.component.scss']
})
export class ProductionFloorComponent extends Pagination implements OnInit {

floreForm:FormGroup;
comId:number;
btnStatus;
floreItem:FloreModel[]=[];
filteredItem:FloreModel[]=[];
isSubmitted = false;
  constructor(
    private formBuilder:FormBuilder,
    private sSetupService:SystemSetupService,
    private toster:ToastrService,
    private basicEntryService:BasicEntryService

  ) {
    super();
  }
title="Production Floor";
ngOnInit() {
  this.comId=AuthService.getLoggedCompanyId();
  this.items = [];
  this.searchKeys=['description']
  this.update();
  this.btnStatus="Save";
  this.createFloreForm();


}
onFilter(event){
  if(event.target.value){
    this.filteredItem = this.floreItem.filter(item=>item.description.toLowerCase().match(event.target.value.toString().toLowerCase()))
    }else{
    this.filteredItem = this.floreItem;
  }
}

getFloreListByProUnitID(id:number){
  if(id==null){
    return;
  }else{
    this.f['productionUniteID'].patchValue(id);
    this.sSetupService.getFloreByProductionUnitId(id).subscribe((response:ApiResponse)=>{
      if(response.status){

        this.items=response.result as FloreModel[];
        this.floreItem=response.result as FloreModel[];
        this.update();
      }
      else{
        this.items=[];
        this.update();
      }
    });
  }
}

// delete(id:number){
// this.sSetupService.deleteDivision(id).subscribe((response:ApiResponse)=>{
//   if(response.status){
//     this.toster.success(response.result,"Success");
//     this.getAllFloreList();
//     this.Reset();
//   }else{
//     this.toster.error(response.result,"Failed");
//   }
// });
// }


getAllFlore(){
  this.sSetupService.getAllFlore().subscribe((response:ApiResponse)=>{
    if(response.status){
      this.filteredItem=response.result as FloreModel[];
      this.floreItem=response.result as FloreModel[];
      this.update();
    }else{
      this.items=[];
      this.update();
    }
  });
}

getFloreByFloreId(id:number){
  this.sSetupService.getFloreByFloreId(id).subscribe((response:ApiResponse)=>{
    if(response.status){
      this.floreForm.patchValue(response.result);
      this.btnStatus="Update";
    }
  })
}

saveFlore(){
  this.isSubmitted=true;
    if(this.floreForm.invalid){
      this.toster.warning("Fill Required Fields");
      return;
    }else{

      this.sSetupService.saveOrUpdateFlore(this.floreForm.value).subscribe((response:ApiResponse)=>{
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

updateFlore(){
  this.sSetupService.saveOrUpdateFlore(this.floreForm.value).subscribe((response:ApiResponse)=>{
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
    this.saveFlore();
  }else{
    this.isSubmitted=true;
    if(this.floreForm.invalid){
      this.toster.warning("Fill Required Fields");
      return;
    }else{
    this.updateFlore();}
  }
}

createFloreForm(){
  this.floreForm=this.formBuilder.group({
    id:[0,[Validators.required]],
    companyID:[this.comId,[Validators.required]],
    productionUniteID:[,[Validators.required]],
    description:[,[Validators.required]]
  })
}

get f(){
  return this.floreForm.controls;
}

Reset(){
  this.btnStatus="Save";
  this.isSubmitted=false;
  this.floreForm.reset();
  this.createFloreForm();



}

}
