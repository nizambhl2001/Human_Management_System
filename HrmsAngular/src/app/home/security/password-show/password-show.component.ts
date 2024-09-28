import { Component, OnInit } from '@angular/core';
import { UserModel } from '../../../models/security/user.model';
import { UserService } from '../../../services/security/user.service';
import { ApiResponse } from '../../../models/response.model';

@Component({
  selector: 'app-password-show',
  templateUrl: './password-show.component.html',
  styleUrls: ['./password-show.component.scss']
})
export class PasswordShowComponent implements OnInit {

  title="Password Show";
  users:UserModel[]=[];
  empCode:string;

  constructor(
    private userService:UserService
  ) { }

  ngOnInit() {
  }

  getUsers(empCode){
    this.userService.getUserByEmpCode(empCode)
    .subscribe((response:ApiResponse)=>{
      if(response.status){
        this.users = response.result as UserModel[];
      }else{
        this.users=[];
      }
    })
  }

}
