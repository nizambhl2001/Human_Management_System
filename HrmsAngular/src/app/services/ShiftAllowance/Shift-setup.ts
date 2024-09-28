import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import{ShiftAmountSetup} from  './../../models/ShiftAllowance/ShiftAmountSetup';


@Injectable({
    providedIn: 'root'
  })

  export class ShiftAllowanceService{

    constructor(private http:HttpClient) { }

    getSetupAllowance(companyId:number,grade:number){
        return this.http.get(environment.apiUrl+'/shiftallowance/amountsetup/GetShiftAllowaneAmount/getAll/compId/'+companyId+'/grade/'+grade);
      }
     
    saveSetupAllowance(shiftAmountSetup:ShiftAmountSetup){
        return this.http.post(environment.apiUrl+'/shiftallowance/amountsetup/saveupdate', shiftAmountSetup);
      }
    
  }