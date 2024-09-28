import { GlSalaryHeadAssign } from './../../models/gl-integration/gl-salary-head-assign.model';
import { GlCode } from './../../models/gl-integration/gl-code.model';
import { environment } from './../../../environments/environment';
import { CostHead } from './../../models/gl-integration/cost-head.model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GlIntegrationService {

  constructor(
    private http:HttpClient
  ) { }
///////////////////CostHead///////////
saveOrUpdateCostHead(costHead:CostHead,option:number){
  return this.http.post(environment.apiUrl+'/glintegration/costhead/saveorupdate/'+option,costHead);
}
getAllCostHead(costhead:CostHead, option:number){ 
  return this.http.post(environment.apiUrl+'/glintegration/costhead/getallcosthead/'+option,costhead);
}
///////////////////GLCode//////////
saveOrUpdateGLCode(glCode:GlCode,option:number){
  return this.http.post(environment.apiUrl+'/glintegration/glcode/saveorupdate/'+option,glCode);
}
getAllGLCode(glCode:GlCode,option:number){ 
  return this.http.post(environment.apiUrl+'/glintegration/glcode/getallcosthead/'+option,glCode);
}
getlistCostHead(){
  return this.http.get(environment.apiUrl+'/glintegration/glcode/getallcostheadfordropdown');
}
/////////////////GL Salary Head Assign////////////////
saveOrUpdateGLSalaryHeadAssign(glsalheadassg:GlSalaryHeadAssign,option:number){
  return this.http.post(environment.apiUrl+'/glintegration/glsalheadassign/saveorupdate/'+option,glsalheadassg);
}
getAllGLSalaryHeadAssign(glsalheadassg:GlSalaryHeadAssign,option:number){ 
  return this.http.post(environment.apiUrl+'/glintegration/glsalheadassign/getallsalheadassgn/'+option,glsalheadassg);
}
}
