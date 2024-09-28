import { BonusType } from './../../models/Addition/bonus-types';
import { environment } from './../../../environments/environment';
import { Injectable } from "@angular/core";
import { HttpClient, HttpParams } from "@angular/common/http";
import { ProcessImportModel } from "../../models/bonus/process-import.model";

@Injectable({
  providedIn: 'root'
})
export class ProcessBonusService{
  constructor(private http:HttpClient){}
  getProcessBonus(companyId:number,periodId:number,salaryHeadID:number,bonusType:number){
    var param=new HttpParams()
   .set('CompanyID',companyId.toString())
   .set('PeriodID',periodId.toString())
   .set('SalaryHeadID',salaryHeadID.toString())
   .set('BonusType',bonusType.toString())
  return this.http.get(environment.apiUrl+'/bonus/Process/Bonus/get/',{params:param});
  }
}
