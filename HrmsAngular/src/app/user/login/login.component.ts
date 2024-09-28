import { AuthService } from './../../services/auth.service';
import { Component, ViewEncapsulation, OnInit } from '@angular/core';
import { AppService } from '../../app.service';
import { ToastrService } from 'ngx-toastr';
import { UserModel } from '../../models/security/user.model';
import { TempStorageData } from '../../models/security/client-side-storage.model';
import { AppStateService } from '../../services/app-state.service';



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['../../../vendor/styles/pages/authentication.scss',
    '../../../vendor/libs/ngx-sweetalert2/ngx-sweetalert2.scss',
    '../../../vendor/libs/angular2-ladda/angular2-ladda.scss'],
})
export class LoginComponent implements OnInit {

  submitted = false;
  isLoading = false;
  credentials;
  isUnAuthorize = false;

  constructor(
    private appService: AppService,
     private authService: AuthService,
      private toastr: ToastrService
      ) {
    this.appService.pageTitle = 'Login';
  }
  ngOnInit() {
    this.credentials = {
      loginId: '',
      loginPassword: '',
      rememberMe: false
    };
  }
  loginFormInvalid() {
    if (this.credentials.loginId.length === 0) {
      return true;
    }
    if (this.credentials.loginPassword.length === 0) {
      return true;
    }
    return false;
  }

  login() {
    this.submitted = true;
    if (this.loginFormInvalid()) {
      return;
    }
    this.isLoading = true;
    this.authService.login(this.credentials).subscribe((data: any) => {
      if (data.token) {
        localStorage.setItem('isRemembered', this.credentials.rememberMe ? 'true' : 'false');
        localStorage.setItem('token', data.token);
        localStorage.setItem('picture', data.user.picture);
        localStorage.setItem('userName', data.user.userName);
        localStorage.setItem('assignedPages',JSON.stringify(data.user.assignedPages));
        localStorage.setItem('loginID', data.user.loginID);
        let user = data.user as UserModel;
        if (this.credentials.rememberMe) {
          localStorage.setItem('loginID', user.loginID);
          localStorage.setItem('userName', user.userName);
          localStorage.setItem('userID', user.id.toString());
          localStorage.setItem('userTypeID', user.userTypeID.toString());
          localStorage.setItem('empCode', user.empCode);
          localStorage.setItem('picture', user.picture);
          localStorage.setItem('gradeValue', user.gradeValue.toString());
          localStorage.setItem('companyID', user.companyID.toString());
          localStorage.setItem('locked', 'false');
        } else {
          sessionStorage.setItem('loginID', user.loginID);
          sessionStorage.setItem('userName', user.userName);
          sessionStorage.setItem('userID', user.id.toString());
          sessionStorage.setItem('userTypeID', user.userTypeID.toString());
          sessionStorage.setItem('empCode', user.empCode);
          sessionStorage.setItem('picture', user.picture);
          sessionStorage.setItem('gradeValue', user.gradeValue.toString());
          sessionStorage.setItem('companyID', user.companyID.toString());
          sessionStorage.setItem('locked', 'false');
        }
        this.isLoading = false;
        this.appService.redirect('/');
      }
    }, () => {
      this.isLoading = false;
      this.isUnAuthorize = true;
    });
  }

  clearErrMsg() {
    this.isUnAuthorize = false;
  }
}
