import { environment } from './../../../environments/environment';
import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { EmpProductionPositionModel } from '../../models/hr/emp-production-position.model';

@Injectable({
  providedIn: 'root'
})
export class EmpProductionService {

  constructor(private http:HttpClient) {}
  save(production:EmpProductionPositionModel){
    return this.http.post(environment.apiUrl+'/HR/emp/production/position/insert',production)
  }
  getByEmpCode(empCode:string,compId:number){
    return this.http.get(environment.apiUrl+'/HR/emp/production/position/by/empCode/'+empCode+'/CompanyID/'+compId)
  }
  getById(id:number){
  return this.http.get(environment.apiUrl+'/HR/emp/production/position/by/id/'+id)
  }

}
