import { AppService } from './../app.service';
import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class LockGuard implements CanActivate {

  constructor(public authService: AuthService, private appService: AppService) { }

  canActivate(): boolean {
    if (!this.authService.isAuthenticated()) {
      this.appService.redirect('user/login');
      return false;
    }
    return true;
  }
}
