import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient, HttpParams } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { TempStorageData } from '../models/security/client-side-storage.model';
import { AppService } from '../app.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private http: HttpClient, private appService:AppService) {
   }

  public isAuthenticated(): boolean {

    try {
      let token = localStorage.getItem('token');
      let payload = JSON.parse(window.atob(token.split('.')[1]));
      let userId = payload['UserId'];
      let loginId = payload['LoginId'];
      let userTypeId = payload['UserTypeId'];
      let tokenExp = payload['exp'];
      let currentTimeSpan = (new Date().getTime())/1000;
      let isExpired = (tokenExp-currentTimeSpan)<0;
      if (userId != null && loginId != null && userTypeId != null && !isExpired) {
        return true;
      } else {
        return false;
      }
    }
    catch(err){
      //this.appService.redirect('user/login')
    }
  }
  public isLocked(): boolean {

    let isLocked = null;
    const remember = localStorage.getItem('remember');
    if (remember && remember === 'true') {
      isLocked = localStorage.getItem('locked');
    } else {
      isLocked = sessionStorage.getItem('locked');
    }

    return isLocked === 'true';
  }

  public logout(loginId: string) {
    const paramObj = new HttpParams()
      .set('loginId', loginId)
    return this.http.get(environment.apiUrl + '/user/logout', { params: paramObj })
  }
  public login(credentials) {
    const paramObj = new HttpParams()
      .set('loginId', credentials.loginId)
      .set('loginPassword', credentials.loginPassword);
    const header = new HttpHeaders({ 'Content-Type': 'application/x-www-urlencoded', 'No-Auth': 'True' });
    return this.http.get(environment.apiUrl + '/user/login', { headers: header, params: paramObj });
  }

  public retrieve(email: string) {
    const retrieveUrl = environment.apiUrl + '/retrieve';
    const body = new HttpParams().set('email', email);
    return this.http.post(retrieveUrl, body);
  }

  isRoleMatch(allowedRoles):boolean{
    let isMatch = false;
    var payLoad = JSON.parse(window.atob(localStorage.getItem('token').split('.')[1]));
    var userRole = payLoad["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"];
    allowedRoles.forEach(element => {
      if(userRole==element){
        isMatch =true;
        return false;
      }
    });
    return isMatch;
  }

  IsPermittedModule(moduleId:number):boolean{
    var payLoad = JSON.parse(window.atob(localStorage.getItem('token').split('.')[1]));
    var userRole = payLoad["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"];
    if(userRole==='SuperAdmin'){return true;}
    let assignedModules = JSON.parse(localStorage.getItem('assignedPages')) as any[];
    if(assignedModules.some(m=>m.ModuleID===moduleId)){
      return true;
    }
    else{
      false;
    }
  }

  IsPermittedPage(pageId:number):boolean{

    var payLoad = JSON.parse(window.atob(localStorage.getItem('token').split('.')[1]));
    var userRole = payLoad["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"];
    if(userRole==='SuperAdmin'){return true;}

    let assignedPages = JSON.parse(localStorage.getItem('assignedPages')) as any[];
    if(assignedPages.some(p=>p.PageID===pageId)){
      return true;
    }
    else{
      return false;
    }
  }

  public static getLoggedCompanyId():number{
    var payLoad = JSON.parse(window.atob(localStorage.getItem('token').split('.')[1]));
    return payLoad['CompanyId'] as number;
  }
  public static getLoggedCompanySalaryType():number{
    var payLoad = JSON.parse(window.atob(localStorage.getItem('token').split('.')[1]));
    return payLoad['SalaryType'] as number;
  }
  public static getLoggedUserId():number{
    var payLoad = JSON.parse(window.atob(localStorage.getItem('token').split('.')[1]));
    return payLoad['UserId'] as number;
  }
  public static getLoggedUserTypeId():number{
    var payLoad = JSON.parse(window.atob(localStorage.getItem('token').split('.')[1]));
    return payLoad['UserTypeId'] as number;
  }
  public static getLoggedEmpCode():string{
    var payLoad = JSON.parse(window.atob(localStorage.getItem('token').split('.')[1]));
    return payLoad['EmpCode'] as string;
  }
  public static getLoggedGradeValue():number{
    var payLoad = JSON.parse(window.atob(localStorage.getItem('token').split('.')[1]));
    return payLoad['GradeValue'] as number;
  }

  public static getLoggedGender():number{
    var payLoad = JSON.parse(window.atob(localStorage.getItem('token').split('.')[1]));
    return payLoad['gender'] as number;
  }
  public static getAssignedPages():any[]{
    return JSON.parse(localStorage.getItem('assignedPages')) as any[];
  }
  
}
