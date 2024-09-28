import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../services/security/user.service';
import { ToastrService } from 'ngx-toastr';
import { EmpTypeModel } from '../../../models/system-setup/EmpType.model';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ApiResponse } from '../../../models/response.model';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-lock-unlock-salary',
  templateUrl: './lock-unlock-salary.component.html',
  styleUrls: ['./lock-unlock-salary.component.scss']
})
export class LockUnlockSalaryComponent implements OnInit {

  title="Lock/Unlock Salary Process";
  empTypes:EmpTypeModel[]=[];
  lockerForm:FormGroup;
  userId:number;
  companyId:number;
  constructor(
    private userService:UserService,
    private toaster:ToastrService,
    private fb:FormBuilder
  ) { }
  ngOnInit() {
    this.createForm();
    this.companyId = AuthService.getLoggedCompanyId();
    this.userId = AuthService.getLoggedUserId();
    this.createForm();
  }

  lock(actionType:number){
    console.log("lock",this.lockerForm.value);
    this.lockerForm.patchValue({actionType:actionType})
    if(this.lockerForm.invalid){
      this.toaster.error('Please!, Fill all required field', 'Invalid Submission');
      return;
    }
    console.log("lock",this.lockerForm.value);
    this.userService.salaryLockOrUnlock(this.lockerForm.value)
    .subscribe((response:ApiResponse)=>{
      if(response.status){
        let result = (actionType===1)?'Salary Locked!':'Salary Unlocked!';
        this.toaster.success(result, 'Success!');
      }else{
        this.toaster.error(response.result, 'Failed!')
      }
    })
  }

  createForm(){
    this.lockerForm = this.fb.group({
      empType:[,[]],
      salaryPeriod:[,[Validators.required]],
      userID:[this.userId,[Validators.required]],
      companyID:[this.companyId,[Validators.required]],
      actionType:[,[Validators.required]]
    })
  }

  get formVal(){
    return this.lockerForm.value;
  }
  get formControl(){
    return this.lockerForm.controls;
  }
  reset(){
    this.createForm();
  }

}
