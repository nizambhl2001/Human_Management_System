import { AuthService } from './../../../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { Pagination } from '../../../shared/paginate';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { ApiResponse } from '../../../models/response.model';
import { BasicEntry } from '../../../models/system-setup/basic-entry.model';
import { SystemSetupService } from '../../../services/system-setup/system-setup.service';
import { ToastrService } from 'ngx-toastr';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-group',
  templateUrl: './group.component.html',
  styleUrls: ['./group.component.scss']
})
export class GroupComponent extends Pagination implements OnInit {

 academicDisForm:FormGroup;
comId:number;
btnStatus;
academicDisItem:BasicEntry[]=[];
isSubmitted = false;
selectedItemId: number;
filteredItem:BasicEntry[]=[];
  constructor(
    private modalService: NgbModal,
    private formBuilder:FormBuilder,
    private sSetupService:SystemSetupService,
    private toster:ToastrService
  ) {
    super();
  }
title="Major/Group Name";
  ngOnInit() {
    this.comId=AuthService.getLoggedCompanyId();
    this.items = [];
    this.searchKeys=['description'];
    this.update();
    this.btnStatus="Save";
    this.createAcademicDisForm();
    this.getAllAcademicList();
  }
  onFilter(event){
    if(event.target.value){
      this.filteredItem = this.academicDisItem.filter(item=>item.description.toLowerCase().match(event.target.value.toString().toLowerCase()))
      }else{
      this.filteredItem = this.academicDisItem;
    }
  }
  getAllAcademicList(){

    this.sSetupService.getAcademicDisList().subscribe((response:ApiResponse)=>{
      if(response.status){

        this.filteredItem=response.result as BasicEntry[];
        this.academicDisItem=response.result as BasicEntry[];
        this.update();
      }
      else{
        this.items=[];
        this.update();
      }
    });
}


deleteGroup(id: number, modal: any) {
  this.selectedItemId = id;
  this.modalService.open(modal);
}

confirmDelete(id:number){
this.sSetupService.deleteAcademicDis(id).subscribe((response:ApiResponse)=>{
  if(response.status){
    this.toster.success(response.result,"Success");
    this.getAllAcademicList();
    this.modalService.dismissAll();
    this.Reset();
  }else{
    this.toster.error(response.result,"Failed");
  }
});
}

getById(id:number){
  this.sSetupService.getByIdAcademicDis(id).subscribe((response:ApiResponse)=>{
    if(response.status){
      this.academicDisForm.patchValue(response.result);
      this.btnStatus="Update";
    }

  });
}

saveAcademicDis(){
  this.isSubmitted=true;
    if(this.academicDisForm.invalid){
      this.toster.warning("Fill Required Fields");
      return;
    }else{
      this.sSetupService.saveOrUpdateAcademicDis(this.academicDisForm.value).subscribe((response:ApiResponse)=>{
        if(response.status){
          this.toster.success(response.result,"Success");
          this.Reset();
          this.items=[];
          this.update();
          this.getAllAcademicList();
        }
        else{
          this.toster.error(response.result,"Failed");
        }
       });
    }
}

updateAcademicDis(){
  this.sSetupService.saveOrUpdateAcademicDis(this.academicDisForm.value).subscribe((response:ApiResponse)=>{
    if(response.status){
      this.toster.success(response.result,"Success");
      this.items=[];
      this.update();
      this.Reset();
      this.btnStatus="Save";
      this.getAllAcademicList();
    }
    else{
      this.toster.error(response.result,"Failed");
    }
  });
}

onSubmit(){

  if(this.btnStatus=="Save"){
    this.saveAcademicDis();
  }else{
    this.isSubmitted=true;
    if(this.academicDisForm.invalid){
      this.toster.warning("Fill Required Fields");
      return;
    }else{
    this.updateAcademicDis();}
  }
}

createAcademicDisForm(){
  this.academicDisForm=this.formBuilder.group({
    id:[0,[Validators.required]],
    companyID:[this.comId,[Validators.required]],
    description:[,[Validators.required]],
    code:[,[]]
  })
}

get f(){
  return this.academicDisForm.controls;
}

Reset(){
  this.btnStatus="Save";
  this.isSubmitted=false;
  this.academicDisForm.reset();
  this.createAcademicDisForm();
  this.items=[];
  this.update();

}

}
