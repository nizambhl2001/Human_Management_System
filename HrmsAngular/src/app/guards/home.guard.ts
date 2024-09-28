import { AppService } from './../app.service';
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class HomeGuard implements CanActivate {
  constructor(public authService: AuthService, private appService: AppService) { }

  canActivate(next:ActivatedRouteSnapshot, state:RouterStateSnapshot): boolean {

    if (!this.authService.isAuthenticated()) {
      this.appService.redirect('user/login');
      return false;
    }
    if (this.authService.isLocked()) {
      this.appService.redirect('user/locked');
      return false;
    }
    
    let roles = next.data['permittedRoles'] as string[];
      if(roles){
        if(this.authService.isRoleMatch(roles)) return true;
        else{
          this.appService.redirect('/forbidden');
          return false;
        }
      }
    return true;
  }
}
