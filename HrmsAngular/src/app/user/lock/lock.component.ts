
import { Component } from '@angular/core';
import { AppService } from '../../app.service';


@Component({
  selector: 'app-lock',
  templateUrl: './lock.component.html',
  styleUrls: [
    '../../../vendor/styles/pages/authentication.scss'
  ]
})
export class LockComponent {

  constructor(private appService: AppService) {
    this.appService.pageTitle = 'Session locked';
  }

  user = {
    avatar: '1.png',
    name: localStorage.getItem('name')
  };

  credentials = {
    password: ''
  };

  unlock() {
    let password;
    const remember = localStorage.getItem('remember');
    if (remember && remember === 'true') {
      password = localStorage.getItem('password');
    } else {
      password = sessionStorage.getItem('password');
    }

    if (password === this.credentials.password) {
      if (remember && remember === 'true') {
        localStorage.setItem('locked', 'false');
      } else {
        sessionStorage.setItem('locked', 'false');
      }
      this.appService.redirect('/');
    }
  }
}
