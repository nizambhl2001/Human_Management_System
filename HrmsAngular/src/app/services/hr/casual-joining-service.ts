import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { environment } from "../../../environments/environment";
import { CasualJoiningDateModel } from "../../models/hr/casual-joining-date.model";

@Injectable({
    providedIn: 'root'
  })
  export class CasualJoiningService {
    constructor(private http:HttpClient) { }
    getAll(empCode:string,companyId){
    return this.http.get(environment.apiUrl+'/home/hr/casual/date/joining/getById/empCode/'+empCode+'/companyId/'+companyId);
    }
    saveUpdate(casualjoin:CasualJoiningDateModel){
      return this.http.post(environment.apiUrl+'/home/hr/casual/joining/date/save/update',casualjoin);
    }
    getDateById(empCode:string,companyId){
    return this.http.get(environment.apiUrl+'/home/hr/casual/date/joining/getDateById/empCode/'+empCode+'/companyId/'+companyId);
    }
  }
