import { SalaryHead } from './../../models/SalarySetup/salary-head';

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { AdditionAllowance } from '../../models/Addition/addition-allowance.model';
import { AllDeduction } from '../../models/Deduction/all-deduction.model';
import { DriverAllowanceModel } from '../../models/Addition/driver-allowance.model';
import { DriverBonus } from '../../models/Addition/driver-bonus.model';
import { ProccessImport } from '../../models/Addition/proccess-import.model';

@Injectable({
  providedIn: 'root'
})
export class AdditionAllowanceService {

  constructor(
    private http:HttpClient
  ) { }
  ////////////////////EmployeeAllowance////////////////////////////
 getAllEmployeeAllowance(addiAllwnce:AdditionAllowance){
    return this.http.post(environment.apiUrl+'/addition/additionallowance/getall',addiAllwnce);
}
 saveupdateEmployeeAllowance(addiAllwnce:AdditionAllowance){
  return this.http.post(environment.apiUrl+'/addition/additionallowance/saveupdate',addiAllwnce)
}
//////////////////////DriverAllowance//////////////////////////
saveUpdateDriverAllowance(drvAllowance:DriverAllowanceModel){
  return this.http.post(environment.apiUrl+'/addition/driverallowance/saveupdate',drvAllowance);
}

getAllSalaryHeadType(){
  return this.http.get(environment.apiUrl+'/addition/additionallowance/getallsalaryheadtype');
}
///////////////////////////DriverBonusAllowance//////////////////////////
getAllDriverBonus(companyID:number,grade:number,userTypeID:number){

  return this.http.get(environment.apiUrl+'/addition/driverallwbonus/getall/compId/'+companyID+'/grade/'+grade+'/usertype/'+userTypeID);
}
getAllBonusType(){
  return this.http.get(environment.apiUrl+'/addition/driverallwbonus/DriverBonusType/getalldriverbonus');
}

saveUpdateDriverBonus(driverallwBonus:DriverBonus){
  return this.http.post(environment.apiUrl+'/addition/driverallwbonus/saveupdate',driverallwBonus);
}
//////////////////////////////////////////proccessImport//////////////////////

getImpotedSalaryHead(periodID:number,companyID:number){
  return this.http.get(environment.apiUrl+'/processimport/importedsalryhead/periodid/'+periodID+'/compId/'+companyID);
  }
  getAllprocessImport(procImport){
    return this.http.post(environment.apiUrl+'/processimport/getall', procImport);

  }
  saveUpdateProcessImport(procImport:ProccessImport,type:string){
    return this.http.post(environment.apiUrl+'/processimport/saveupdate/'+type,procImport);
  }

}
