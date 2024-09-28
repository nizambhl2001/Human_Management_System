import { BonusGridModel } from './../../models/bonus-grid.model';
import { environment } from './../../../environments/environment';
import { Injectable } from "@angular/core";
import { HttpClient, HttpParams } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class UpdateBonusService{
  constructor(private http:HttpClient){}
  getUpdateBonus(empCode:string,periodid:number,departmentid:number,designationid:number,salaryHeadid:number,companyid:number,grade:number,BonusType:number){
  var param=new HttpParams()
  .set('EmpCode',empCode.toString())
  .set('PeriodID',periodid.toString())
  .set('DepertMentID',departmentid.toString())
  .set('DesignationID',designationid.toString())
  .set('SalaryHeadID',salaryHeadid.toString())
  .set('CompanyID',companyid.toString())
  .set('Grade',grade.toString())
  .set('BonusType',BonusType.toString())
  return this.http.get(environment.apiUrl+'/festival/bonus/Update/bonus',{params:param})
  }
  updateBonus(bonusGrid:BonusGridModel[]){
    return this.http.post(environment.apiUrl+'/festival/bonus/Update',bonusGrid)
  }
}
