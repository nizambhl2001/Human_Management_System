import { AuthService } from './../../../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UserService } from '../../../services/security/user.service';
import { ApiResponse } from '../../../models/response.model';
import { ToastrService } from 'ngx-toastr';
import { UserTypeModel } from '../../../models/security/user-type.model';
import { TempStorageData } from '../../../models/security/client-side-storage.model';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-create-user-type',
  templateUrl: './create-user-type.component.html',
  styleUrls: ['./create-user-type.component.scss']
})
export class CreateUserTypeComponent implements OnInit {

  title="Create User Type";
  companyId:number;
  userTypeForm:FormGroup;
  isSubmitted:boolean=false;
  btnStatus:string = 'Save';
  userTypes:UserTypeModel[]=[];
  selectedTypeId:number;
  constructor(
    private fb:FormBuilder,
    private userService:UserService,
    private toaster:ToastrService,
    private modalService:NgbModal
  ) { }
  ngOnInit() {
    this.companyId = AuthService.getLoggedCompanyId();
    this.createForm();
    this.getAllUserType();
  }
  onSubmit(){
    this.isSubmitted =true;
    if(this.userTypeForm.invalid){
      this.toaster.error('Invalid Submission!', 'Failed');
      return;
    }
    this.userService.createUserType(this.userTypeForm.value)
    .subscribe((response:ApiResponse)=>{
      if(response.status){
        this.toaster.success(response.result, 'Success!');
        this.getAllUserType();
        this.isSubmitted=false;
        this.reset();
      }else{
        this.toaster.error(response.result, 'Failed');
      }
    })
  }
  getAllUserType(){
    this.userService.getAllUserType()
    .subscribe((response:ApiResponse)=>{
      if(response.status){
        this.userTypes = response.result as UserTypeModel[];
      }
    })
  }
  edit(id:number){
    this.btnStatus = 'Update'
    let userType = this.userTypes.find(c=>c.id ===id);
    this.userTypeForm.patchValue(userType);
  }
  delete(id:number, modal:any){
    this.selectedTypeId = id;
    this.modalService.open(modal);
  }
  confirmDelete(id:number){
    this.userService.deleteUserType(id)
    .subscribe((response:ApiResponse)=>{
      if(response.status){
        let index = this.userTypes.findIndex(c=>c.id===id);
        this.userTypes.splice(index, 1);
        this.modalService.dismissAll();
        this.toaster.error(response.result, 'Deleted!');
      }else{
        this.toaster.warning(response.result, 'Failed!');
        this.modalService.dismissAll();
      }
    })
    this.selectedTypeId = 0;
  }

  createForm(){
    this.userTypeForm = this.fb.group({
      id:[,[]],
      userTypeName:[,[Validators.required]],
      sortOrder:[,[]],
      companyId:[this.companyId,[]]
    })
  }
  get formControl(){
    return this.userTypeForm.controls;
  }
  reset(){
    this.createForm();
    this.btnStatus = 'Save'
  }

}
