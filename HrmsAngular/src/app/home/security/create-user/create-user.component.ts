import { AuthService } from './../../../services/auth.service';
import { UserModel } from './../../../models/security/user.model';
import { UserService } from './../../../services/security/user.service';
import { ApiResponse } from './../../../models/response.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Pagination } from '../../../shared/paginate';
import { SearchEmployee } from '../../../models/hr/search-emp.model';
import { ToastrService } from 'ngx-toastr';
import { CompanyModel } from '../../../models/security/company.model';
import { CompanyService } from '../../../services/system-setup/company.service';

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.scss','../../../../vendor/libs/ng-select/ng-select.scss']
})
export class CreateUserComponent extends Pagination implements OnInit {

  allCompany:CompanyModel[]=[];
  allUserType:UserModel[]=[];
  createUserForm:FormGroup;
  adminAndUserShowModel:UserModel[]=[];
  companyID:number;
  userTypeId:number;
  isSubmitted=false;
 inActive:boolean;
  constructor(
    private companyService:CompanyService,
    private formBuilder:FormBuilder,
    private userService:UserService,
    private toaster:ToastrService
  ) {
    super();
  }
  title="Create User";

  ngOnInit() {
    this.items=[];
    this.update();
    this.companyID=AuthService.getLoggedCompanyId();
    this.userTypeId=AuthService.getLoggedUserTypeId();
    this.createForm();
    this.getCompanyModel();
    this.getAllUserType();
    this.getAllAdminAndUser();
  }
 getCompanyModel(){
    this.companyService.getCompany().subscribe((response:ApiResponse)=>{
      if(response.status){
        this.allCompany=response.result as CompanyModel[];
      }else{
        this.allCompany=[];
      }
    })
 }
 getAllUserType(){
   this.userService.getAllUserType().subscribe((response:ApiResponse)=>{
    if(response.status){
      this.allUserType=response.result as UserModel[];
      console.log("this.allUserType",this.allUserType)
    }else{
      this.allUserType=[];
    }
   })
 }
 onSelectEmp(employee: SearchEmployee) {
  this.createUserForm.patchValue({
    empCode: employee.empCode,
    designation: employee.designation,
    empName: employee.empName,
    joinDate: employee.joinDate,
    CompanyModelAddress:employee.jobLocation
  })
  //this.getCashReceivedInfo(this.f.empCode.value);
}
getAllAdminAndUser(){
  this.userService.getUsers(this.companyID,[1,2,3]).subscribe((response:ApiResponse)=>{
    if(response.status){
      this.adminAndUserShowModel=response.result as UserModel[];
    }
    else{
      this.adminAndUserShowModel=[];
    }
  })
}

saveCreateUser(){
  this.isSubmitted=true;
  if(this.createUserForm.invalid){
    //this.toster.warning("Fill Required Fields");
  }else{
    let obj = new UserModel();
    obj=this.createUserForm.value;

    this.userService.saveCreateUser(obj).subscribe((response:ApiResponse)=>{
      if(response.status){
        this.toaster.success(response.result,"Success");
        this.Reset();
      }else{
        this.toaster.error(response.result,"Failed");
      }
    });
  }

}

updateCreateUser(){
  let obj = new UserModel();
  obj=this.createUserForm.value;

  this.userService.saveCreateUser(obj).subscribe((response:ApiResponse)=>{
    if(response.status){
      this.toaster.success(response.result,"Success");
      this.Reset();

    }else{
      this.toaster.error(response.result,"Failed");
    }
  });
}


getAllEmployee(){
  this.userService.getUsers(this.companyID,[3]).subscribe((response:ApiResponse)=>{
    if(response.status){
      this.adminAndUserShowModel=response.result as UserModel[];
    }
    else{
      this.adminAndUserShowModel=[];
    }
  })
}
  getByID(id:number){
    this.inActive=true;
   this.userService.getByIdCreateUser(id).subscribe((response:ApiResponse)=>{
    if(response.status){
      let editItem=response.result as UserModel;
      this.createUserForm.patchValue(editItem);
    }else{
      this.toaster.error(response.result,"Failed");
    }
   });
  }
createForm(){
  this.createUserForm=this.formBuilder.group({
    id:[0,[]],
    userTypeID:[,[Validators.required]],
    userName:[,[Validators.required]],
    loginID:[,[Validators.required]],
    loginPassword:[,[Validators.required]],
    empCode:[,[Validators.required]],
    gradeValue:[,[Validators.required]],
    companyID:[,[]],
  })
}
get f(){
  return this.createUserForm.controls;
}


Reset(){
  this.isSubmitted=false;
  this.inActive=false;
  this.createUserForm.reset();
  this.createForm();
}

}
