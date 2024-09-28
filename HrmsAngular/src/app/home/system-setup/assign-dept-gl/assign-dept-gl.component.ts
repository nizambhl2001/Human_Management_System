import { AuthService } from './../../../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { Pagination } from '../../../shared/paginate';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { SystemSetupService } from '../../../services/system-setup/system-setup.service';
import { ApiResponse } from '../../../models/response.model';
import { AssaignDepartmentGlView } from '../../../models/system-setup/assaign-department-gl-view.model';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-assign-dept-gl',
  templateUrl: './assign-dept-gl.component.html',
  styleUrls: ['./assign-dept-gl.component.scss']
})
export class AssignDeptGlComponent extends Pagination implements OnInit {

  departmentGLForm:FormGroup;
  comId:number;
  departmentAssignItem:AssaignDepartmentGlView[];
  isSubmitted=false;
  filteredItem:AssaignDepartmentGlView[]=[];
  constructor(
    private formBuilder:FormBuilder,
    private sSetupService:SystemSetupService,
    private toster:ToastrService
  ) {
    super();
  }
title="Assign Department GL";
  ngOnInit() {
    this.items = [];
    this.searchKeys=['depertment']
    this.update();
    this.comId=AuthService.getLoggedCompanyId();
    this.createDepartmentGLForm();
    this.getAllAssaignDepartmentList();
  }
  onFilter(event){
    if(event.target.value){
      this.filteredItem = this.departmentAssignItem.filter(item=>
        item.depertment.toLowerCase().match(event.target.value.toString().toLowerCase()) ||
        item.depertmentGL.toLowerCase().match(event.target.value.toString().toLowerCase())
        )
      }else{
      this.filteredItem = this.departmentAssignItem;
    }
  }
getAllAssaignDepartmentList(){
  this.sSetupService.getAllAssaignDepartmentGLList(this.comId).subscribe((response:ApiResponse)=>{
    if(response.status){
      this.departmentAssignItem=response.result as AssaignDepartmentGlView[];
      this.filteredItem=response.result as AssaignDepartmentGlView[];
      this.update();
    }else{
      this.items=[];
      this.update();
    }
  });
}

assignDepartmentGL(){
  this.isSubmitted=true;
  if(this.departmentGLForm.invalid){
    this.toster.warning("Fill Required Fields");
    return;
  }else{
    this.sSetupService.assignDepartmentGL(this.departmentGLForm.value).subscribe((response:ApiResponse)=>{
      if(response.status){
        this.toster.success(response.result,"Success");
        this.getAllAssaignDepartmentList();
        this.Reset();
      }else{
        this.toster.error(response.result,"Failed");
      }
    });
  }
}

  createDepartmentGLForm(){
    this.departmentGLForm=this.formBuilder.group({
      id:[,[Validators.required]],
      companyID:[this.comId,[]],
      gLID:[,[Validators.required]]
    })
  }

  get f(){
    return this.departmentGLForm.controls;
  }

  Reset(){
    this.isSubmitted=false;
    this.departmentGLForm.reset();
    this.createDepartmentGLForm();
  }
}
