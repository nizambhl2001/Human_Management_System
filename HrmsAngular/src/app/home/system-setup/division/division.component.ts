import { AuthService } from './../../../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { Pagination } from '../../../shared/paginate';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { BankBranch } from '../../../models/system-setup/bank-branch.model';
import { ApiResponse } from '../../../models/response.model';
import { Division } from '../../../models/system-setup/division.model';
import { SystemSetupService } from '../../../services/system-setup/system-setup.service';
import { ToastrService } from 'ngx-toastr';
import { Data } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-division',
  templateUrl: './division.component.html',
  styleUrls: ['./division.component.scss']
})
export class DivisionComponent extends Pagination implements OnInit {

divisionForm:FormGroup;
comId:number;
btnStatus;
divisionItem:Division[]=[];
isSubmitted = false;
selectedItemId: number;
filteredItem:Division[]=[];
//searchKeys;
  constructor(
    private modalService: NgbModal,
    private formBuilder:FormBuilder,
    private sSetupService:SystemSetupService,
    private toster:ToastrService,

  ) {
    super();
  }
title="Division";
ngOnInit() {
  this.comId=AuthService.getLoggedCompanyId();
  this.items = [];
  this.searchKeys = ['divisionName']
  this.update();
  this.btnStatus="Save";
  this.createDivisionForm();
  this.getAllDivisionList();
}

onFilter(event){
  if(event.target.value){
    this.filteredItem = this.divisionItem.filter(item=>item.divisionName.toLowerCase().match(event.target.value.toString().toLowerCase()))
    }else{
    this.filteredItem = this.divisionItem;
  }
}

getAllDivisionList(){

    this.sSetupService.getAllDivision().subscribe((response:ApiResponse)=>{
      if(response.status){

        this.filteredItem=response.result as Division[];
        this.divisionItem=response.result as Division[];
        this.update();
      }
      else{
        this.items=[];
        this.update();
      }
    });
}

confirmDelete(id:number){
this.sSetupService.deleteDivision(id).subscribe((response:ApiResponse)=>{
  if(response.status){
    this.toster.success(response.result,"Success");
    this.getAllDivisionList();
    this.modalService.dismissAll();
    this.Reset();
  }else{
    this.toster.error(response.result,"Failed");
  }
});
}


deleteDivision(id: number, modal: any) {
  this.selectedItemId = id;
  this.modalService.open(modal);
}


getById(id:number){
  this.sSetupService.getByIdDivision(id).subscribe((response:ApiResponse)=>{
    if(response.status){
      this.divisionForm.patchValue(response.result);
      this.btnStatus="Update";
    }

  });
}

saveDivision(){
  this.isSubmitted=true;
    if(this.divisionForm.invalid){
      this.toster.warning("Fill Required Fields");
      return;
    }else{
      this.sSetupService.saveOrUpdateDivision(this.divisionForm.value).subscribe((response:ApiResponse)=>{
        if(response.status){
          this.toster.success(response.result,"Success");
          this.Reset();
          this.items=[];
          this.update();
          this.getAllDivisionList();
        }
        else{
          this.toster.error(response.result,"Failed");
        }
       });
    }

}

updateDivision(){
  this.sSetupService.saveOrUpdateDivision(this.divisionForm.value).subscribe((response:ApiResponse)=>{
    if(response.status){
      this.toster.success(response.result,"Success");
      this.items=[];
      this.update();
      this.Reset();
      this.btnStatus="Save";
      this.getAllDivisionList();
    }
    else{
      this.toster.error(response.result,"Failed");
    }
  });
}



onSubmit(){

  if(this.btnStatus=="Save"){
    this.saveDivision();
  }else{
    this.isSubmitted=true;
    if(this.divisionForm.invalid){
      this.toster.warning("Fill Required Fields");
      return;
    }else{
    this.updateDivision();}
  }
}

createDivisionForm(){
  this.divisionForm=this.formBuilder.group({
    id:[0,[Validators.required]],
    companyID:[this.comId,[Validators.required]],
    divisionName:[,[Validators.required]],
    code:[,[Validators.required]]
  })
}

get f(){
  return this.divisionForm.controls;
}

Reset(){
  this.btnStatus="Save";
  this.isSubmitted=false;
  this.divisionForm.reset();
  this.createDivisionForm();
  this.items=[];
  this.update();

}

}
