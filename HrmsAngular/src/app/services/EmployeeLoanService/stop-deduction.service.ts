
import { environment } from './../../../environments/environment';
import { StopDeduction } from './../../models/EmloyeeLoanInfo/stop-deduction.model';

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StopDeductionService {

  constructor(
    private http:HttpClient
  ) { }

saveUpdate(stopDeduction:StopDeduction,pOptions:number){
    return this.http.post(environment.apiUrl+'/loan/stopdeduction/saveupdate/pOtion/'+pOptions,stopDeduction);
  }
getAll(stopDeduct:StopDeduction,pOptions:number){
  return this.http.post(environment.apiUrl+'/loan/stopdeduction/getall/'+pOptions,stopDeduct);
}


}
