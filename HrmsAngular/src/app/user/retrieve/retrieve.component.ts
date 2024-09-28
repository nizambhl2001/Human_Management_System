import { Component, OnInit } from '@angular/core';
import { AppService } from '../../app.service';
import { AuthService } from '../../services/auth.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-retrieve',
  templateUrl: './retrieve.component.html',
  styleUrls: [
    '../../../vendor/styles/pages/authentication.scss'
  ]
})
export class RetrieveComponent {

  constructor(private appService: AppService, private authService: AuthService, private toastrService: ToastrService) {
    this.appService.pageTitle = 'Password retrieve';
  }

  credentials = {
    email: ''
  };

  retrieve() {
    this.toastrService.toastrConfig.onActivateTick = true;
    this.toastrService.toastrConfig.preventDuplicates = true;
    this.toastrService.toastrConfig.positionClass = 'toast-top-center';
    this.toastrService.toastrConfig.enableHtml = true;
    this.authService.retrieve(this.credentials.email).subscribe(data => {

      this.toastrService.success(data.toString(), null);
      this.appService.redirect('user/login');
    });
  }
}
