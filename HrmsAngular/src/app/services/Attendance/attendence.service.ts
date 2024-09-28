import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from "@angular/common/http";
import { environment } from "../../../environments/environment";
import { AttendanceApplication } from '../../models/Attendance/attendance-application.model';
import { WeekEndSetup } from '../../models/Attendance/week-end-setup.model';
import { ShiftSetupModel } from '../../models/Attendance/shiftsetupModel';
import { ShiftManagementInfoModel } from '../../models/Attendance/shift-management-info.model';
import { ManualAttendence } from '../../models/Attendance/manual-attendence.model';
import { AttendenceSummery } from '../../models/Attendance/attendence-summery.model';
import { ImportEmployeeAttendence } from '../../models/Attendance/import-employee-attendence.model';
import { ApproveAttendenceApplication } from '../../models/Attendance/approve-attendence-application.model';
import { AttendenceReport } from '../../models/Attendance/attendence-report.model';

@Injectable({
  providedIn: 'root'
})
export class AttendenceService {

  constructor(private http: HttpClient) { }

  //==================================Attendence Application =================================================

  saveOrUpdateAttendenceApplication(poption: number, attendance: AttendanceApplication) {
    return this.http.post(environment.apiUrl + `/attendence/attendenceapplication/save/${poption}`, attendance)
  }

  getAttendenceListtByEmpCode(empcode: string, comid: number, poption: number) {
    return this.http.get(environment.apiUrl + `/attendence/attendenceapplication/getbyempcode/empcode/${empcode}/comid/${comid}/poption/${poption}`)
  }

  getAttendenceById(id: number) {
    return this.http.get(environment.apiUrl + `/attendence/attendenceapplication/getbyid/id/${id}`);
  }

  //================================== WeekEnd - Setup =============================================

  getWeekEndList(weekEndSetup: WeekEndSetup, poption: number) {
    return this.http.post(environment.apiUrl + `/attendence/weekendsetup/poptions/${poption}`, weekEndSetup);
  }

  getWeekEndShift(weekEndSetup: any) {
    return this.http.post(environment.apiUrl + `/attendence/weekendsetup/getWeekEndShift`, weekEndSetup);
  }
  saveWeekEndSetup(weekEndSeup: WeekEndSetup, poption: number) {
    return this.http.post(environment.apiUrl + `/attendence/weekendsetup/saveweekend/poptions/${poption}`, weekEndSeup);
  }
  //================================== Manual Attendence ===============================================

saveOrUpdateManualAttendence(manualAttn:ManualAttendence){
 return this.http.post(environment.apiUrl+`/attendence/manualattendence/saveorupdateattendence`,manualAttn)
}


getManualAttendenceByDDMMYY(ddmmyyyy?:any){
  let paramObj = new HttpParams()
  .set('ddmmyyyy',ddmmyyyy.toString());
  return this.http.get(environment.apiUrl+`/attendence/manualattendence/getbyddmmyy/ddmmyy/`,{params:paramObj});
}


getManualAttendenceById(id:number){
 return this.http.get(environment.apiUrl+`/attendence/manualattendence/getbyid/${id}`);
}

deleteManualAttenById(id:number){
  return this.http.delete(environment.apiUrl+`/attendence/manualattendence/deletebyid/${id}`);
}

//=========================================== Monthly Attendence =================================
getPeriodListByYearID(id:number){
 return this.http.get(environment.apiUrl+`/attendence/monthlyattendence/getallperiodlist/${id}`);
}

// Show Attendence Data

getShowDataMonthlyAttendence(attendenceModel:AttendenceSummery){
  return this.http.post(environment.apiUrl+`/attendence/monthlyattendence/getshowdata`,attendenceModel);
}
getAttSummeryAsXl(attSummery:any[]){
  return this.http.post(environment.apiUrl+'/attendence/getAttSummeryAsXl',attSummery,{responseType:'blob'})
}

forEditAttendence(forEditParam:AttendenceSummery){
return this.http.post(environment.apiUrl+`/attendence/monthlyattendence/foreditmonthlyattendence`,forEditParam)
}

showAttendenceReportData(attendenceReport:AttendenceReport){
  debugger
  return this.http.post(environment.apiUrl+`/attendence/attendenceReport/showAttendenceReportData`,attendenceReport)
  }

// Save MonthlyAttendence
saveMonthlyAttendence(attendenceModel:AttendenceSummery){
  return this.http.post(environment.apiUrl+`/attendence/monthlyattendence/savemonthlyattendence`,attendenceModel);
}

//========================================== Process Attendence Data ===================================

processAttendenceData(strDate:any,endDate:any,comid:number,branch:number){
  return this.http.get(environment.apiUrl+`/attendence/processattendencedata/process/strDate/${strDate}/endDate/${endDate}/comid/${comid}/branch/${branch}`);
}


//====================================== Import Employee Attendence =========================================

importEmployeeAttendenceFileData(importEmployeeAttendence:ImportEmployeeAttendence){
  let paramObj:HttpParams = new HttpParams()
  .set('ID',importEmployeeAttendence.id.toString())
  .set('CompanyID',importEmployeeAttendence.companyID.toString())
  .set('TerminalID',importEmployeeAttendence.terminalID.toString())
  .set('EmpCode',importEmployeeAttendence.empCode);
  let formFiles= new FormData();
  for(let i=0;i<importEmployeeAttendence.excelFiles.length;i++){
    formFiles.append('excelFile'+i,importEmployeeAttendence.excelFiles[i],importEmployeeAttendence.excelFiles[i].name);
  }

return this.http.post(environment.apiUrl+`/attendence/importemployeeattendence`, formFiles, {params:paramObj});
}


//============================================================ Process Attendence Data =====================================================
processSummeryAttendenceData(strDate:any,endDate:any,periodId:number,compId:number){
  console.log();
  let paramObj:HttpParams = new HttpParams()
  .set('strDate',strDate.toString())
  .set('endDate',endDate.toString())
  .set('periodId',periodId.toString())
  .set('compId',compId.toString())
  return this.http.get(environment.apiUrl+'/attendance/ProcessAttendenceSummery',{params:paramObj});
}
//============================================================ Process LateComer Data =====================================================
processLateComerData(strDate:any,endDate:any,gradeVal:number,compId:number){
  console.log();
  let paramObj:HttpParams = new HttpParams()
  .set('strDate',strDate.toString())
  .set('endDate',endDate.toString())
  .set('gradeVal',gradeVal.toString())
  .set('compId',compId.toString())
  return this.http.get(environment.apiUrl+'/attendance/lateComerReportProcess',{params:paramObj});
}
//==================================== Delete Existing Attendence =================================
deleteExistingAttendance(compId:number,periodId:number){
  return this.http.delete(environment.apiUrl+`/attendence/delete/existing/attendanceData/periodId/${periodId}/compId/${compId}`)
}
// =========================================================== Approve Attendence =========================================

approveApplicationAttendenceList(comId:number,reqTo:string,pOption:number){
  return this.http.get(environment.apiUrl+`/attendence/attendenceapprove/applicationlist/comid/${comId}/reqto/${reqTo}/poption/${pOption}`);
}

// Approve Employee Attendence
approveAttendence(approveModel:ApproveAttendenceApplication){
  return this.http.post(environment.apiUrl+`/attendence/approveattendence/approve`,approveModel);
}

recommendAttendenceApplication(recommendModel:ApproveAttendenceApplication){
  return this.http.post(environment.apiUrl+`/attendence/approveattendence/approve`,recommendModel);
}

cancelAttendenceApplication(cancelModel:ApproveAttendenceApplication){
  return this.http.post(environment.apiUrl+`/attendence/approveattendence/approve`,cancelModel);
}




  //Shift Setup
  GetshiftAll() {
    return this.http.get(environment.apiUrl + '/attendance/shiftsetup/getall');
  }
  saveOrUpdateShift(shiftModel:ShiftSetupModel){
    return this.http.post(environment.apiUrl+'/attendance/shiftSetup/saveOrUpdate', shiftModel);
  }

  //Shift Assign
  getEmployees(filterModel:any){
    let paramObj = new HttpParams()
    Object.keys(filterModel).forEach(key => {
      paramObj=paramObj.set(key, filterModel[key]?filterModel[key]:'-1')
    });
    return this.http.get(environment.apiUrl+'/attendance/shiftAssign/getEmployees', {params:paramObj});
  }
  getDayOfShiftInfo(startDate:string, endDate:string, shiftName:string,weekDay:string){
    let paramObj = new HttpParams()
    .set('startDate', startDate)
    .set('endDate', endDate)
    .set('shiftName', shiftName)
    .set('weekDay',weekDay)
    return this.http.get(environment.apiUrl+'/attendance/shiftAssign/getShiftDayInfo', {params:paramObj});
  }

  GetDayOfWeekendInfo(startDate:string, endDate:string, shiftName:string, weekDay:string){
    let paramObj = new HttpParams()
    .set('startDate', startDate)
    .set('endDate', endDate)
    .set('shiftName', shiftName)
    .set('weekDay',weekDay)
    return this.http.get(environment.apiUrl+'/attendance/shiftAssign/GetDayOfWeekendInfo', {params:paramObj});
  }


  insertShiftManagementInfo(shiftInfo:ShiftManagementInfoModel[]){ 
    return this.http.post(environment.apiUrl+'/attendance/shiftAssign/insert', shiftInfo);
  }
  //shift_Update
  getAssignedShift(filterObj){
  return this.http.post(environment.apiUrl+'/attendance/shiftAssign/edit',filterObj);
  }
  assignShift(shiftInfo:ShiftManagementInfoModel[]){
    return this.http.post(environment.apiUrl+'/attendance/assignShift', shiftInfo);
  }

  assignweakend(shiftInfo:any[]){
    return this.http.post(environment.apiUrl+'/attendance/assignweakend', shiftInfo);
  }
  getEmpCodeByReportTo(empCode:string,companyID:number){
    return this.http.get(environment.apiUrl+'/attendance/get/empCodes/by/EmpCode/'+empCode+'/CompanyID/'+companyID)
  }

  isDeleteAssigned(empcodes:any){  
    return this.http.post(environment.apiUrl+'/attendance/shiftAssign/IsDeleteAssigned', empcodes);
  }

}
