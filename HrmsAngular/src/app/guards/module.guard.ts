import { Injectable } from "@angular/core";
import { AuthService } from "../services/auth.service";
import { AppService } from "../app.service";
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from "@angular/router";

@Injectable({
    providedIn: 'root'
})
export class ModuleGuard implements CanActivate {
    constructor(public authService: AuthService, private appService: AppService) { }

    canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {

        if (!this.authService.isAuthenticated()) {
            this.appService.redirect('user/login');
            return false;
          }
          if (this.authService.isLocked()) {
            this.appService.redirect('user/locked');
            return false;
          }

        let moduleId = next.data['moduleId'] as number;
        if (this.authService.IsPermittedModule(moduleId)) return true;
        else {
            this.appService.redirect('/forbidden');
            return false;
        }
    }
}