
import { environment } from './../../../environments/environment';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class OvertimeService {

  constructor(
    private http:HttpClient
  ) { }
  getOtEntitledEmpByBoss(bossEmpCode){
    return this.http.get(environment.apiUrl+'/ot/requisition/getOtEntitledEmp/bossEmpCode/'+bossEmpCode);
  }
  otRequisitionApply(requisitionFormVal){
    return this.http.post(environment.apiUrl+'/ot/requisition/apply',requisitionFormVal);
  }
  getOtRequisition(id:number=0){
    return this.http.get(environment.apiUrl+'/ot/requisition/get/'+id);
  }
  manulaOtEntry(formVal){
    return this.http.post(environment.apiUrl+'/ot/manual/entry', formVal);
  }
  getManualOt(companyId, empCode, otMonth){
    empCode = (empCode==null || empCode=='')?'-1':empCode;
    otMonth = (otMonth==null || otMonth=='')?'-1':otMonth;
    return this.http.get(environment.apiUrl+`/ot/manual/get/companyId/${companyId}/empCode/${empCode}/otMonth/${otMonth}`);
  }
  otCalculate(companyId,departmentId,locationId,otMonth){
    let httpParam = new HttpParams()
    .append('companyId', companyId)
    .append('departmentId',departmentId)
    .append('locationId', locationId)
    .append('otMonth',otMonth)
    return this.http.get(environment.apiUrl+'/ot/process/get', {params:httpParam});
  }
  saveProcessedOt(processedOt){
    return this.http.post(environment.apiUrl+'/ot/process/save', processedOt);
  }
  otPayment(companyId,departmentId,locationId,otMonth){
    let httpParam = new HttpParams()
    .append('companyId', companyId)
    .append('departmentId',departmentId)
    .append('locationId', locationId)
    .append('otMonth',otMonth)
    return this.http.get(environment.apiUrl+'/ot/payment/get', {params:httpParam});
  }
  getReplacedApptovedOt(companyId, empCode='-1', otDate="-1"){
    let httpParam = new HttpParams()
    .append('companyId',companyId)
    .append('empCode',empCode)
    .append('otDate',otDate)
    return this.http.get(environment.apiUrl+'/ot/replace/get',{params:httpParam});
  }
  applyOtReplace(otReplace){
    return this.http.post(environment.apiUrl+'/ot/replace/apply',otReplace);
  }
}
