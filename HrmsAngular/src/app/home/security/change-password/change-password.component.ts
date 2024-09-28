import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { UserService } from '../../../services/security/user.service';
import { ApiResponse } from '../../../models/response.model';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss']
})
export class ChangePasswordComponent implements OnInit {

  loginId:string;
  resetForm:FormGroup;
  
  constructor(
    private fb:FormBuilder,
    private toaster:ToastrService,
    private userService:UserService
  ) { }
  ngOnInit() {
    if(localStorage.getItem('isRemembered')=='true'){
      this.loginId = localStorage.getItem('loginID')
    }else{
      this.loginId = sessionStorage.getItem('loginID');
    }
    this.createForm();
  }

  onSubmit(){
    this.markFormGroupTouched(this.resetForm);
    if(this.resetForm.invalid){
      return;
    }
    this.userService.changePassword(this.formVal.loginId, this.formVal.oldPassword, this.formVal.newPassword)
    .subscribe((response:ApiResponse)=>{
      if(response.status){
        this.toaster.success(response.result, 'Success!')
        this.resetForm.reset();
      }else{
        this.toaster.error(response.result, 'Failed')
      }
    })

  }

  createForm(){
    this.resetForm = this.fb.group({
      loginId:[this.loginId,[Validators.required]],
      oldPassword:[,[Validators.required]],
      newPassword:[,[Validators.required]],
      confirmPassword:[,[Validators.required]]
    },
    {validator: this.isMatch('newPassword', 'confirmPassword')})
  }
  get formVal(){
    return this.resetForm.value;
  }
  get formControl(){
    return this.resetForm.controls;
  }
  markFormGroupTouched(group:FormGroup){
    Object.values(group.controls).forEach((control:AbstractControl)=>{
      control.markAsTouched();
    })
  }

  isMatch(value1:string, value2:string){
    return (group: FormGroup) => {
      if (group.controls[value1].value !=  group.controls[value2].value) {
        return group.controls[value2].setErrors({matched: false})
      }
    }
  }

}
