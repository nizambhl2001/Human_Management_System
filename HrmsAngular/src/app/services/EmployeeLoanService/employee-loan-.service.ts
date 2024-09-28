import { EmployeeLoanInfo } from './../../models/EmloyeeLoanInfo/employee-loan-info.model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EmployeeLoanService {

  constructor(
    private http:HttpClient
  ) { }

  getEmployeeLoanInfoById(id:number){
    return this.http.get(environment.apiUrl+'/loan/employeeloanInfo/getemploanbyid/'+id);
  }
  getAll(){
    return this.http.get(environment.apiUrl+'/loan/emploaninfo/getall');
  }
  getEmployeeLoanInfo(empCode:string){   
   return this.http.get(environment.apiUrl+'/loan/emploaninfo/get/empCode/'+empCode);
  }
  save(empLoanInfo:EmployeeLoanInfo){
    return this.http.post(environment.apiUrl+'/loan/emploaninfo/Save',empLoanInfo);
  }
  update(empLoanInfo:EmployeeLoanInfo){
    return this.http.put(environment.apiUrl+'/loan/emploaninfo/update',empLoanInfo);
  }


}
