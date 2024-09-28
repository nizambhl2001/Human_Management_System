import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpRequest } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { EmpEnrolment } from '../../models/salary-process/emp-enrolment.model';
import { PaysacleOutAddDeduct } from '../../models/salary-process/paysacle-out-add-deduct.model';
import { ConformationIncrement } from '../../models/salary-process/conformation-increment.model';
import { SalaryStructure } from '../../models/salary-process/salary-structure.model';
import { EmpSalaryStructure } from '../../models/salary-process/emp-salary-structure.model';
import { BlockSalaryProcess } from '../../models/salary-process/block-salary-process.model';
import { SalaryEdit } from '../../models/salary-process/salary-edit.model';
import { SalaryPublish } from '../../models/salary-process/salary-publish.model';
import { SalaryProcess } from '../../models/salary-process/salary-process.model';
import { EmployeeExtraSalary } from '../../models/salary-process/employee-extra-salary.model';
import { PaySlipToEmail } from '../../models/salary-process/pay-slip-to-email.model';
import { retry } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SalaryProcessService {

  constructor(
    private http:HttpClient
  ) { }

  //============================================Emp Enrolment Information========================
  payScaleList(gradeName:string){
    return this.http.get(environment.apiUrl+'/salaryprocess/payscalelist/get/'+gradeName);
  }

  saveUpdate(empEnrolment:EmpEnrolment){
    return this.http.post(environment.apiUrl+'/salaryprocess/empenrolmentinfo/saveupdate',empEnrolment);
  }
  enrolmentGetByid(empcode:string,comid:number){
    return this.http.get(environment.apiUrl+`/salaryprocess/enrolment/getbyid/${empcode}/${comid}`)
  }
  getEnrollments(companyId, empCode=-1, gradeValue=-1, departmentId = 1 ){
    const httpParam = new HttpParams()
    .append('companyId', companyId)
    .append('empCode',empCode.toString())
    .append('gradeValue',gradeValue.toString())
    .append('departmentId',departmentId.toString())
    return this.http.get(environment.apiUrl+'/salaryprocess/enrolment/getall', {params:httpParam});
  }

  getByIdEdit(id:number,empCode:string){
    return this.http.get(environment.apiUrl+`/salaryprocess/enrolment/getbyidedit/${id}/${empCode}`)
  }


  //===============================================Allowance Add Deduct==============================

  getAddDeductList(empcode:string,comid:number){
    return this.http.get(environment.apiUrl+`/salaryprocess/paysacleoutdeduct/get/${empcode}/${comid}`);
  }
  savePayScaleAddDeduct(payScale:PaysacleOutAddDeduct){

    return this.http.post(environment.apiUrl+`/salaryprocess/paysacleoutdeduct/save`,payScale);
  }

  updatePayScaleDeduct(payScale:PaysacleOutAddDeduct){

    return this.http.put(environment.apiUrl+`/salaryprocess/paysacleoutdeduct/update`,payScale)
  }

  deletePayscle(comId:number,empCode:string,id:number){
    return this.http.delete(environment.apiUrl+`/salaryprocess/paysacleoutdeduct/delete/${comId}/${empCode}/${id}`);
  }

  getByIdPayscale( id:number, empcode:string,comid:number){
    return this.http.get(environment.apiUrl+`/salaryprocess/paysacleoutdeduct/getbyid/${id}/${empcode}/${comid}`)
  }

  //======================================= ConformationIncrement Section ================================================
  getConfirmationInCrementList(empcode:string,comid:number){
    return this.http.get(environment.apiUrl+`/salaryprocess/confirmationincrement/getbyid/${empcode}/${comid}`)
  }

  getIncrementType(){
    return this.http.get(environment.apiUrl+`/salaryprocess/confirmationincrement/getincrementtype`);
  }

  saveConfirmatinIncrement(confirmIncre:ConformationIncrement[]){
    console.log(confirmIncre);
    return this.http.post(environment.apiUrl+`/salaryprocess/confirmationincrement/saveconfirmationIncre`,confirmIncre);
  }
  getIncrementInfoAsExcel(confirmIncre:ConformationIncrement[]){
    return this.http.post(environment.apiUrl+`/salaryprocess/getIncrementInfoAsExcel`,confirmIncre,{responseType:'blob'});
  }
  deleteConfirmationIncrement(id:number,comid:number){

    return this.http.delete(environment.apiUrl+`/salaryprocess/confirmationincrement/delete/${id}/${comid}`);
  }

  //============================================Salary View==================================================

  getSalaryViewList(empcode:string,grade:number,comid:number,salarytype:number){
    return this.http.get(environment.apiUrl+`/salaryprocess/salaryview/getall/${empcode}/${grade}/${comid}/${salarytype}`);
  }

  //=========================================== Salary Structure===========================================

  getSalaryTypeList(){
    return this.http.get(environment.apiUrl+`/salaryprocess/salarystructure/getalltype`);
  }

  getAllStructureAddition(structurID:number){
    return this.http.get(environment.apiUrl+`/salaryprocess/salarystructure/getalladdition/${structurID}`);
  }

  getAllStructureDeduction(structurID:number){
    return this.http.get(environment.apiUrl+`/salaryprocess/salarystructure/getalldeduction/${structurID}`);
  }


  saveSalaryStructureAddition(salaryStructure:SalaryStructure){
    return this.http.post(environment.apiUrl+`/salaryprocess/salarystructure/savesalarystructure`,salaryStructure);
  }
  //===========================================Emp Salary Structure===========================================

  getSalaryStructureAddition(structurID:number,comid:number){
    return this.http.get(environment.apiUrl+`/salaryprocess/empsalarystructure/getalladdition/${structurID}/${comid}`);
  }

  getSalaryStructureDeduction(structurID:number,comid:number){
    return this.http.get(environment.apiUrl+`/salaryprocess/empsalarystructure/getalldeduction/${structurID}/${comid}`);
  }

  payAmountChangeAddition(payamount:number,empCode:string){
    return this.http.get(environment.apiUrl+`/salaryprocess/empsalarystructure/paymentchangeaddition/${payamount}/${empCode}`);
  }

  getSalaryStructure(empCode:string){
    return this.http.get(environment.apiUrl+`/salaryprocess/empsalarystructure/getSalaryStructure/${empCode}`);
  }




  payAmountChangeDeduction(payamount:number,empCode:string){
    return this.http.get(environment.apiUrl+`/salaryprocess/empsalarystructure/paymentchangededuction/${payamount}/${empCode}`);
  }

saveEmpSalaryStructure(empSalaryStructure:EmpSalaryStructure){
  return this.http.post(environment.apiUrl+`/salaryprocess/empsalarystructure/saveempsalarystructure`,empSalaryStructure);
}

editEmpSalaryStructure(editEmpSalaryStructure:EmpSalaryStructure){
return this.http.post(environment.apiUrl+`/salaryprocess/empsalarystructure/editempsalarystructure`,editEmpSalaryStructure);
}



getBasedOnList(){
  return this.http.get(environment.apiUrl+`/salaryprocess/empsalarystructure/basedonlist`)
}

//=====================================Block Salary Process==============================================
getBlockSalaryProcess(parammodel:BlockSalaryProcess){
return this.http.post(environment.apiUrl+`/salaryprocess/blocksalaryprocess/getblockemployee`,parammodel)
}

processEmpSalaryBlock(parammodel:BlockSalaryProcess){
  return this.http.post(environment.apiUrl+`/salaryprocess/blocksalaryprocess/processempsalaryblock`,parammodel)
  }

  //==========================================Salary Edit Process=====================================

  getEmployeeSalaryUpdate(salaryEdit:SalaryEdit){
    return this.http.post(environment.apiUrl+`/salaryprocess/salaryedit/getempsalaryupdate`,salaryEdit)
  }

  updateSalry(salaryEdit:SalaryEdit){
   return this.http.post(environment.apiUrl+`/salaryprocess/salaryedit/updatesalary`,salaryEdit);
  }

  //========================================Salary Publish ============================================

  getSalaryPublishList(comid:number){
    return this.http.get(environment.apiUrl+`/salaryprocess/salarypublish/comid/${comid}`)
  }


  getByIdPublishSalary(id:number){
    return this.http.get(environment.apiUrl+`/salaryprocess/salarypublish/publishid/${id}`)
  }

  saveOrUpdatePublish(salaryPublish:SalaryPublish){
    return this.http.post(environment.apiUrl+`/salaryprocess/salarypublish/saveorupdatepublishid`,salaryPublish)
  }

  //================================================New Join=========================================================

  getNewJoiningInfo(grade:number,sdate:any,edate:any,comid:number){
    let paramObj = new HttpParams()
    .set('grade',grade.toString())
    .set('sDate',sdate.toString())
    .set('eDate',edate.toString())
    .set('companyId', comid.toString())

    return this.http.get(environment.apiUrl+`/salaryprocess/getjoininginfo/`,{params:paramObj});
  }

  //================================== Salary Process =====================================================
  getSalaryProcessInfo(salaryProcessFormVal){
    //return this.http.post(environment.apiUrl+`/salaryProcess/process`,salaryProcessFormVal, {reportProgress:true});

    const req = new HttpRequest('POST',environment.apiUrl+`/salaryProcess/process`,salaryProcessFormVal, {reportProgress:true} )
    return this.http.request(req);
  }


  //====================================== Undo Salary Process =========================================

  undoSalaryProcess(undoSalaryProcessModel:SalaryProcess){
    return this.http.post(environment.apiUrl+`/undosalaryprocess/undosalary`,undoSalaryProcessModel);
  }

  //======================================== Extra Salary ===========================================

  searchExtraSalary(extraSalary:EmployeeExtraSalary){
    return this.http.post(environment.apiUrl+`/salaryprocess/empextrasalary/search`,extraSalary);
  }

  saveEmployeeExtraSalary(empExtraSalary:EmployeeExtraSalary){
    return this.http.post(environment.apiUrl+`/salaryprocess/empextrasalary/save`,empExtraSalary);
  }

  // ======================================== Pay Slip Email ==============================================
  paySlipEmail(paySlipEmailModel: PaySlipToEmail){
    return this.http.post(environment.apiUrl+`/salaryprocess/payslipemail/processpayslip`,paySlipEmailModel);
  }
  deleteExistingPayslip(paySlipEmailModel: PaySlipToEmail){
    return this.http.post(environment.apiUrl+`/salaryprocess/deleteExistingPayslip`,paySlipEmailModel);
  }
  getGeneralinfoForPayslip( empCode:string,  companyID:number,  gradeValue:number){
    const paramObj = new HttpParams()
      .set("empCode", empCode)
      .set("companyID", companyID.toString())
      .set("gradeValue", gradeValue.toString())
    return this.http.get(environment.apiUrl + '/salaryprocess/GetGeneralinfoForPayslip/', { params: paramObj });
  }

  getEmpSalaryAmount(empCode:string){
    return this.http.get(environment.apiUrl+`/salaryprocess/salarystructure/GetEmpSalaryAmount/${empCode}`);
  }

  getEmpOtherAllowance(empCode:string){
    return this.http.get(environment.apiUrl+`/salaryprocess/salarystructure/GetOtherAllowance/${empCode}`);
  }

 }
