import { EmpBlockInfoModel } from './../../models/hr/emp-block-info.model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from "@angular/core";
import { environment } from "../../../environments/environment";

@Injectable({
    providedIn: 'root'
  })
  export class EmpBlockService {

    constructor(private http:HttpClient) {}
    empBlockGetById(empCode:string,companyId:number){
     return this.http.get(environment.apiUrl+'/home/hr/emp/block/info/getById/empCode/'+empCode+'/companyId/'+ companyId);
    }
    EmpBlock_niGetById(empCode:string,companyId:number){
     return this.http.get(environment.apiUrl+'/home/hr/emp/block/info/EmpBlock_ni/empCode/'+empCode+'/companyId/'+ companyId);
    }
    empBlockSave(empBlockInfo:EmpBlockInfoModel){
     return this.http.post(environment.apiUrl+'/home/hr/emp/block/info/save',empBlockInfo);
    }
  }