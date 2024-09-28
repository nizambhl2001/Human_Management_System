
import { environment } from './../../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { UserModel } from '../../models/security/user.model';
import { UserTypeModel } from '../../models/security/user-type.model';
import { SalaryLockModel } from '../../models/security/salary-lock.model';
import { CompanyModel } from '../../models/security/company.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http:HttpClient) { }

  //========================================= Create User =================================================
  getUsers(comid:number,userTypes:number[]){
    const paramObj = new HttpParams()
    .append('userTypes', userTypes.toString())
    return this.http.get(environment.apiUrl+`/security/user/get/companyId/${comid}`, {params:paramObj});
  }
  
  // getAllAdminAndUser(comid:number,user_typeid:number){
  //   return this.http.get(environment.apiUrl+`/security/user/get/companyId/${comid}/userTypeId/${user_typeid}`);
  // }
  getUserByEmpCode(empCode:string){
    return this.http.get(environment.apiUrl+`/security/user/get/empCode/${empCode}`)
  }
  getByIdCreateUser(id:number){
    return this.http.get(environment.apiUrl+`/security/user/get/id/${id}`);
  }

  saveCreateUser(createUserModel:UserModel){
    return this.http.post(environment.apiUrl+`/security/user/save`,createUserModel);
  }

  //====================================== User Login History ===============================================

  getLogHistory(historyType:number,userId:number,companyId:number){
    return this.http.get(environment.apiUrl+`/security/logHistory/get/historyType/${historyType}/companyId/${companyId}/userId/${userId?userId:0}`);
  }

  //User Type
  getAllUserType(){
    return this.http.get(environment.apiUrl+`/security/userType/get`);
  }
  createUserType(userType:UserTypeModel){
    return this.http.post(environment.apiUrl+'/security/userType/create', userType)
  }
  deleteUserType(id:number){
    return this.http.delete(environment.apiUrl+`/security/userType/delete/${id}`);
  }

  //Change Password
  changePassword(loginId:string, oldPassword:string, newPassword:string){
    return this.http.post(environment.apiUrl+'/user/changePassword', 
    {loginId:loginId, oldPassword:oldPassword, newPassword:newPassword}
    )
  }
  //Salary Lock-Unlock
  salaryLockOrUnlock(lockerModel:SalaryLockModel){
    return this.http.post(environment.apiUrl+'/security/salaryLock', lockerModel);
  }

  saveOrUpdateCompany(company:CompanyModel){
    return this.http.post(environment.apiUrl+'/security/company/save', company);
  }
  getCompanies(){
    return this.http.get(environment.apiUrl+'/security/company/get');
  }

}
