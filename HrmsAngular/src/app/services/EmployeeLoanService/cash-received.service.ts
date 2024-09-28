import { CashReceived } from './../../models/EmloyeeLoanInfo/cash-received.model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CashReceivedService {

  constructor(
    private http:HttpClient
  ) { }


 getCashReceivedInfo(empCode:string){
   return this.http.get(environment.apiUrl+'/loan/cashreceived/get/empCode/'+empCode);
  }

 getById(id:number){
    return this.http.get(environment.apiUrl+'/loan/cashreceived/GetById/'+id);
  }

 saveUpdate(cashreceived:CashReceived){
    return this.http.post(environment.apiUrl+'/loan/cashreceived/saveupdate',cashreceived)
  }
}
