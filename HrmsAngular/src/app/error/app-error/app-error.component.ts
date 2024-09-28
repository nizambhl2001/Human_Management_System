import { Component } from '@angular/core';
import { AppService } from '../../app.service';

@Component({
  selector: 'app-app-error',
  templateUrl: './app-error.component.html',
  styleUrls: ['./app-error.component.scss']
})
export class AppErrorComponent {

  errorText = '';
  constructor(private appService: AppService) {
    this.appService.pageTitle = 'Whoops...';
    const errorText = sessionStorage.getItem('error');
    if (errorText) {
      this.errorText = errorText;
    }
  }
  goBack() {
    this.appService.redirect('/');
  }

}
