import { JobDescriptionMode } from './../../models/hr/jobDescription.model';
import { Employment } from './../../models/hr/employment.model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { EmployeeViewModel } from '../../models/hr/emp-view.model';

@Injectable({
  providedIn: 'root'
})
export class EmploymentService {

  constructor(private http:HttpClient) { }
 getEmployment(empCode:string,companyId){
    return this.http.get(environment.apiUrl+'/hr/employment/get/empCode/'+empCode+'/companyId/'+companyId);
  }
  GetEmploymentInfo(empCode:string,companyId){
  return this.http.get(environment.apiUrl+'/hr/employment/info/get/empCode/'+empCode+'/companyId/'+companyId);
  }
  saveEmployment(employment:Employment){
    return this.http.post(environment.apiUrl+'/hr/employment/saveupdate/',employment);
  }
  getEmploymentById(empCode:string){
    return this.http.get(environment.apiUrl+'/hr/employment/getbyid/'+empCode);
  }
  deleteEmployment(id:number){
   return this.http.delete(environment.apiUrl+'/hr/employment/delete/id/'+id);
  }
  getallEmployment(gradeVal:number, compId:number){
    return this.http.get(environment.apiUrl+'/hr/employment/get/gradeVal/'+gradeVal+'/compId/'+compId);
  }
  searchEmployee(empSearchKey:EmployeeViewModel){
    return this.http.post(environment.apiUrl+'/hr/employee/search', empSearchKey);
  }
  getAllEmpBasicInfo(compId:number, gradeValue:number){
    return this.http.get(environment.apiUrl+'/hr/employment/basicInfo/get/compId/'+compId+'/grade/'+gradeValue);
  }
  getAllEmpBasicInfoForLeave(compId:number, gradeValue:number){
    return this.http.get(environment.apiUrl+'/hr/employment/basicInfo/leave/get/compId/'+compId+'/grade/'+gradeValue);
  }
  getReportToEmployee(compId:number){
    return this.http.get(environment.apiUrl+'/hr/employment/get/reportTo/compId/'+compId)
  }

//----------------Job Description---------------//
saveJobDescription(jobDescription:JobDescriptionMode){
  return this.http.post(environment.apiUrl+'/hr/employment/saveupdate/jobDescription',jobDescription);
}
getDiscriptionByEmpCode(empCode:string,compId:number){
return this.http.get(environment.apiUrl+'/hr/employment/jobDescription/getbyEmpCode/empCode/'+empCode+'/compId/'+compId);
}
getDiscriptionById(id:number){
  return this.http.get(environment.apiUrl+'/hr/employment/jobDescription/getby/id/'+id);
  }

  userInfo(compId:number, loginID:any){ 
    return this.http.get(environment.apiUrl+'/hr/employment/userInfo/get/compId/'+compId+'/loginID/'+loginID);
  }
  getAllEmpBasicInfoByuserType(compId:number, gradeValue:number,userId:number){
    return this.http.get(environment.apiUrl+'/hr/employment/basicInfo/get/compId/'+compId+'/grade/'+gradeValue+'/userId/'+userId);
  }

}
