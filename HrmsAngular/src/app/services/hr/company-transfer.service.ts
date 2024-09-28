import { environment } from './../../../environments/environment';
import { Employment } from './../../models/hr/employment.model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EmployeeViewModel } from '../../models/hr/emp-view.model';
import { EmpCompanyTransfer } from '../../models/hr/emp-company-transfer.model';

@Injectable({
  providedIn: 'root'
})
export class CompanyTransferService {
    constructor(private http:HttpClient) { }
    getCompanyTransfer(empCode:string,companyId:number,ptType:number){
        return this.http.get(environment.apiUrl+'/hr/company/transfer/type/get/empCode/'+empCode+'/companyId/'+companyId+'/ptType/'+ptType);
      }
      saveUpdate(transferModel:EmpCompanyTransfer){
        return this.http.post(environment.apiUrl+'/home/hr/company/transfer/save/update',transferModel);
      }

      getByIdPromotion(id:number){
        return this.http.get(environment.apiUrl+'/home/hr/company/transfer/edit/'+id);
      }
      getEmpTransforView(empCode:string,companyID:number,tpType:number){
       return this.http.get(environment.apiUrl+'/home/hr/company/transfer/View/EmpCode/'+empCode+'/TPType/'+tpType+'/CompanyID/'+companyID)
      }
      getEmploymentSalaryDetails(empCode:string,companyID:number){
        return this.http.get(environment.apiUrl+'/home/hr/company/transfer/getEmploymentsalary/EmpCode/'+empCode+'/CompanyID/'+companyID)
      }

      GetTransferType(companyID:number){
        return this.http.get(environment.apiUrl+'/hr/company/transfer/transfertype/get/companyId/'+companyID)
       }
}
