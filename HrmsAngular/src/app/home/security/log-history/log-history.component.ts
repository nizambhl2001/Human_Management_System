import { AuthService } from './../../../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { Pagination } from '../../../shared/paginate';
import { CompanyService } from '../../../services/system-setup/company.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { UserService } from '../../../services/security/user.service';
import { ToastrService } from 'ngx-toastr';
import { ApiResponse } from '../../../models/response.model';
import { UserModel } from '../../../models/security/user.model';
import { UserLogHistory } from '../../../models/security/user-log-history.model';
import { TempStorageData } from '../../../models/security/client-side-storage.model';

@Component({
  selector: 'app-log-history',
  templateUrl: './log-history.component.html',
  styleUrls: ['./log-history.component.scss','../../../../vendor/libs/ng-select/ng-select.scss', '../../../../vendor/libs/angular2-ladda/ladda.scss']
})
export class LogHistoryComponent implements OnInit {


  logHistoryForm:FormGroup;
  companyId:number;
  userId:number;
  userLogHistoryItem:UserLogHistory[]=[];
  userList:UserModel[]=[];
  isLoading:boolean=false;
  constructor(
    private companyService:CompanyService,
    private formBuilder:FormBuilder,
    private userService:UserService,
    private toaster:ToastrService
  ) {
  }
  title="Log History";
  ngOnInit() {
    this.companyId=AuthService.getLoggedCompanyId();
    this.createLogHistoryForm();
    this.getUsers();
  }
getUsers(){
  this.userService.getUsers(this.companyId,[])
  .subscribe((response:ApiResponse)=>{
    if(response.status){
      this.userList = response.result as UserModel[];
    }
  })
}
  getHistory(){
    this.isLoading = true;
    this.userService.getLogHistory(this.f['historyType'].value,this.f['userID'].value,this.companyId).subscribe((response:ApiResponse)=>{
      if(response.status){
        this.userLogHistoryItem = [];
        this.userLogHistoryItem=response.result as UserLogHistory[];
        this.isLoading=false;
      }else{
        this.userLogHistoryItem=[];
        this.isLoading=false;
      }
    }, err=>{
      this.isLoading = false;
    }
    )
  }

createLogHistoryForm(){
  this.logHistoryForm=this.formBuilder.group({
    historyType:[,[]],
    userID:[,[]],
    companyID:[this.companyId,[]]
  })
}

get f(){
  return this.logHistoryForm.controls;
}
}
