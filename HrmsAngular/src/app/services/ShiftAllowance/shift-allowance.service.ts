import { ShiftAllowanceAuto } from './../../models/ShiftAllowance/shiftauto-allowance.model';
import { environment } from './../../../environments/environment';
import { ShiftAllowanceAutoParam } from './../../models/ShiftAllowance/shiftauto-allowance-param.model';


import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

import {ShiftAllowanceAssign} from '../../models/ShiftAllowance/ShiftAssignModel'
import { from } from 'rxjs';
import { ShiftAmountSetup } from '../../models/ShiftAllowance/ShiftAmountSetup';
import { timeout } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class ShiftAllowanceService {

  constructor(private http:HttpClient) { }


////////////////////////ShiftSetup////////////////////////////////
  getSetupAllowance(companyId:number,grade:number,userTypeID:number){
    return this.http.get(environment.apiUrl+'/shiftallowance/amountsetup/GetShiftAllowaneAmount/getAll/compId/'+companyId+'/grade/'+grade+'/usertypeid/'+userTypeID);
  }
 
saveSetupAllowance(shiftAmountSetup:ShiftAmountSetup){
    return this.http.post(environment.apiUrl+'/shiftallowance/amountsetup/saveupdate', shiftAmountSetup);
  }
  ///////////////////////////ShiftAllowanceAssign///////////////////////////////////

  saveAsignAllowance(shiftallowanceAssign:ShiftAllowanceAssign){ 
    return this.http.post(environment.apiUrl+'/shiftallowance/assignshiftallowance/save',shiftallowanceAssign);
  }

  getAllowanceAssign(filter:ShiftAllowanceAssign){   
    return this.http.post(environment.apiUrl+'/shiftallowance/assignshiftallowance/getall',filter);
  }

///////////////////ShiftAutoAllowance/////////////////////////////
 getAllShiftAutoAllowance(autoShift:ShiftAllowanceAuto){
   return this.http.post(environment.apiUrl+'/shiftallowance/auto/getall',autoShift)
   .pipe(timeout(300000));
 }
 saveAutoShift(autoshft:ShiftAllowanceAuto){
   //console.log(ShiftAllowanceAuto);return;
   return this.http.post(environment.apiUrl+'/shiftallowance/auto/save',autoshft);
 }

///////////////////////////Edit Shift Allowance//////////////////////

getEditAllowance(filter:ShiftAllowanceAssign){   
  return this.http.post(environment.apiUrl+'/shiftallowance/editshiftallowance/getall',filter);
}
updateEiditAllowance(filter:ShiftAllowanceAssign){
  return this.http.put(environment.apiUrl+'/shiftallowance/editshiftallowance//update',filter);

}
deleteEditAllowance(id:number){
  return this.http.delete(environment.apiUrl+'/shiftallowance/editshiftallowance/delete/'+id);
}

}
