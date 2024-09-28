import { environment } from './../../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SalaryYear } from '../../models/SalarySetup/salary-year';
import { SalGradeModel } from '../../models/SalarySetup/sal-grade-model';
import { PayscaleModel } from '../../models/SalarySetup/payscal';
import { SalaryHead } from '../../models/SalarySetup/salary-head';
import { PayscaleSetup } from '../../models/SalarySetup/payscale-setup.model';
import { OtherAllowance } from '../../models/SalarySetup/other-allowance.model';
import { SalaryPeriodModel } from '../../models/SalarySetup/SalaryPeriod';


@Injectable({
  providedIn: 'root'
})
export class SalarySetupService {

  constructor(private http:HttpClient) { }

//////////////////////SalaryYearSetup///////////////////////////
getAllSalaryYear(){
  return this.http.get(environment.apiUrl+'/salarysetup/salaryyear/getAll');

}
getSalaryYearById(id:number){
  return this.http.get(environment.apiUrl+'/salarysetup/salaryyear/getById/'+id);
}
saveSalaryYear(salaryyear:SalaryYear){
  return this.http.post(environment.apiUrl+'/salarysetup/salaryyear/save', salaryyear)
}

updateSalaryYear(salyear:SalaryYear){
  return this.http.put(environment.apiUrl+'/salarysetup/salaryyear/update', salyear)
}

/////////////////////////////SalaryGradeSetup///////////////////////

getAllSalarygrade(){
  return this.http.get(environment.apiUrl+'/salarysetup/salgrade/getall');
}

getByIdSalaryGrade(id:number){
  return this.http.get(environment.apiUrl+'/salarysetup/salgrade/getallbyId/'+ id);

}
saveSalaryGrade(salgrademodel:SalGradeModel){
  return this.http.post(environment.apiUrl+'/salarysetup/salgrade/save',salgrademodel);
}
updateSalaryGrade(salgrademodel:SalGradeModel){
  return this.http.put(environment.apiUrl+'/salarysetup/salgrade/update',salgrademodel);
}
///////////////////////////////Payscale//////////////////
getAllpayscale(companyId:number, spNo:number){
  return this.http.get(environment.apiUrl+'/salarysetup/payscale/getall/compid/'+companyId+ '/spNo/'+spNo);
}
saveUpdatePayscale(paysacle:PayscaleModel,spNo:number){
  return this.http.post(environment.apiUrl+'/salarysetup/payscale/saveupdate/spno/'+spNo,paysacle);
}
getAllpayscaleById(id:number){
  return this.http.get(environment.apiUrl+'/salarysetup/payscale/getById/'+id);
}
////////////////////////SalaryHeadSetup/////////////////////////
getAllSalaryType(){
  return this.http.get(environment.apiUrl+'/salarysetup/salaryhead/getallsalarytype');
}
getAllSalaryHead(){
  return this.http.get(environment.apiUrl+'/salarysetup/salaryhead/GetAll');
}
getByIdSalaryHead(id:number){
  return this.http.get(environment.apiUrl+'/salarysetup/salaryhead/GetAllbyId/'+ id);

}
saveSalaryHead(salaryHead:SalaryHead){
  return this.http.post(environment.apiUrl+'/salarysetup/salaryhead/Save',salaryHead);
}
updateSalaryHead(salaryHead:SalaryHead){
  return this.http.put(environment.apiUrl+'/salarysetup/salaryhead/update',salaryHead);
}
//////////////////Payscale Setup///////////////////////////////

getPayscalesetup(gradeName:string,companyID:number){
  return this.http.get(environment.apiUrl+'/salarysetup/payscalesetup/getAll/gradename/'+gradeName+'/compId/'+companyID);
}
savePayscaleSetup(payscalesetup:PayscaleSetup,SpNo:number){
  return this.http.post(environment.apiUrl+'/salarysetup/payscalesetup/saveupdate/'+SpNo,payscalesetup)
}
///////////////////////////////////Other Allowance Setup//////////////////

getAllOtherAllowance(gradeName:string){
  return this.http.get(environment.apiUrl+'/salarysetup/otherallowance/getAll/'+gradeName);
}

saveOtherAllowance(otherAllw:OtherAllowance){
  return this.http.post(environment.apiUrl+'/salarysetup/otherallowance/save', otherAllw);
}
///////////////////////////////Salary Period //////////////////////
getAllMonth(){
  return this.http.get(environment.apiUrl+'/salarysetup/salaryperiod/getallmonth');
}

getAllTaxYears(){
  return this.http.get(environment.apiUrl+'/salarysetup/salaryperiod/getalltaxyear');
}
getAllperiod(){
  return this.http.get(environment.apiUrl+'/salarysetup/salaryperiod/getAll');
}
saveSalayPeriod(salPeriodModel:SalaryPeriodModel){

  return this.http.post(environment.apiUrl+'/salarysetup/salaryperiod/save',salPeriodModel);

}
getByIdSalaryPeriod(id:number){
  return this.http.get(environment.apiUrl+'/salarysetup/salaryperiod/getAll/'+id);
}

}


