import { EarnLeaveBalance } from './../models/leave/earn-leave-balance.model';
import { LeaveInfoStatus } from './../models/leave/leave-info-status.model';
import { ApiResponse } from './../models/response.model';
import { LeaveApply } from './../models/leave/leave-apply.model';
import { LeaveType } from './../models/leave/leave-type.model';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { LeaveDetails } from '../models/leave/leave-details.model';
import { LeaveReportParamModel } from '../models/leave/leave-report.model';
import { LeaveStatusInfoModel } from '../models/leave/leave-status-info.model';

@Injectable({
  providedIn: 'root'
})
export class LeaveService {

  constructor(private http: HttpClient) { }

  //Leave Type setup
  saveOrUpdateLeaveType(leaveType: LeaveType) {
    const myHeader = new HttpHeaders({ 'Content-Type': 'application/json' })
    return this.http.post(environment.apiUrl + '/leave/type/saveOrUpdate', leaveType);
  }
  // getLeaveType(empCode: number, gender: number) {
  //   return this.http.get(environment.apiUrl + '/leave/type/get/empCode/' + empCode + '/gender/' + gender);
  // }

  getLeaveType(grade: number, gender: number) {
    return this.http.get(environment.apiUrl + '/leave/type/get/grade/' + grade + '/gender/' + gender);
  }
  deleteLeaveType(id: number) {
    return this.http.delete(environment.apiUrl + '/leave/type/delete/id/' + id);
  }

  //Leave Apply/Entry
  // getLeaveStatus(compId: number, grade: number, empCode: string, periodId: number, gender: number) {
  //   const paramObj = new HttpParams()
  //     .set("companyId", compId.toString())
  //     .set("grade", grade.toString())
  //     .set("empCode", empCode)
  //     .set("periodId", periodId.toString())
  //     .set("gender", gender.toString())

  //   return this.http.get(environment.apiUrl + '/leave/status/get', { params: paramObj });
  // }
  getLeaveStatus(compId: number,empCode: string, periodId: number) {
    const paramObj = new HttpParams()
      .set("companyId", compId.toString())
      //.set("grade", grade.toString())
      .set("empCode", empCode)
      .set("periodId", periodId.toString())
     // .set("gender", gender.toString())

    return this.http.get(environment.apiUrl + '/leave/status/get', { params: paramObj });
  }
  leaveDetailsStatus(type:number,leaveID:number,companyID:number,reqFrom:string,reqTo:string,remarks){
    const paramObj = new HttpParams()
    .set("Type",type.toString())
    .set("LeaveID",leaveID.toString())
    .set("CompanyID",companyID.toString())
    .set("ReqFrom",reqFrom)
    .set("ReqTo",reqTo)
    .set("Remarks",remarks)

    return this.http.get(environment.apiUrl+'/leave/details/status/get/',{ params: paramObj});
  }
  getLeaveInfo(compId: number, empCode: string) {
    return this.http.get(environment.apiUrl + '/leave/applyInfo/get/compId/' + compId + '/empCode/' + empCode);
  }
  apply(application: LeaveApply) {
    return this.http.post(environment.apiUrl + '/leave/apply', application);
  }
  getLeaveInfoById(id: number) {
    return this.http.get(environment.apiUrl + '/leaveinfo/id/' + id);
  }
  getLeaveStatusById(id:number){
    return this.http.get(environment.apiUrl+'/leave/leaveInfoStatus/getBy/Id/'+id);
  }
  getLeaveStatusInfo(empCode:string,companyID:number){
    const paramObj = new HttpParams()
    .set("empCode",empCode)
    .set("companyID", companyID.toString())
    return this.http.get(environment.apiUrl+'/leave/get/leaveInfoStatus/',{ params: paramObj })
  }

  //Leave Apply Manual
  manualApply(applications: LeaveApply[]) {
    return this.http.post(environment.apiUrl + '/leave/apply/manual', applications);
  }

  //Update Leave Entry
  getLeaveApplication(compId: number, gradeValue: number, empCode: string, startDate: Date, endDate: Date) {
    var paramObj = new HttpParams()
      .set('CompanyId', compId.toString())
      .set('GradeValue', gradeValue.toString())
      .set('EmpCode', empCode)
      .set('StartDate', startDate.toDateString())
      .set('EndDate', endDate.toDateString())

    return this.http.get(environment.apiUrl + '/leaveEntry/get', { params: paramObj });
  }
  updateLeaveApplication(applications: LeaveApply[]) {
    return this.http.post(environment.apiUrl + '/leave/entry/update', applications)
  }
  updateByAuthority(la:LeaveApply){
    return this.http.post(environment.apiUrl+'/leave/entry/updateByAuthority', la);
  }

// leave Recommend

getWaitingLeaveForRecommend(compId: number, year: string, empCode: string) {
    return this.http.get(environment.apiUrl + '/leave/recommend/compId/' + compId + '/year/' + year + '/empCode/' + empCode);
  }
  //Leave Approval
  getWaitingLeaveForApprove(compId: number, year: string, empCode: string) {
    return this.http.get(environment.apiUrl + '/leave/approval/compId/' + compId + '/year/' + year + '/empCode/' + empCode);
  }
  updateLeaveInfoStatus(leaveInfoStatus: LeaveInfoStatus) {
    return this.http.post(environment.apiUrl + '/leave/leave-info-status/update', leaveInfoStatus);
  }

  //Approve by HR
  getLeaveInfoForHrApprove(compId:number){
    return this.http.get(environment.apiUrl+'/leave/approveByHr/get/compId/'+compId);
  }
  // getLeaveInfoForHrApprove(compId:number, year:number){
  //   return this.http.get(environment.apiUrl+'/leave/approveByHr/get/compId/'+compId+'/year/'+year);
  // }
  approveByHr(leaveDetails:LeaveDetails){
    return this.http.post(environment.apiUrl+'/leave/approveByHr/approve', leaveDetails);
  }
  cancelByHr(leaveId:number){
    return this.http.get(environment.apiUrl+'/leave/approveByhr/cancel/leaveId/'+leaveId);
  }
  updateAndApproveByHr(leaveApply:LeaveApply){
    return this.http.post(environment.apiUrl+'/leave/approveByHr/updateAndApprove', leaveApply);
  }

  //Opening Leave Balance
  getEarnLeaveBalance(filterModel:EarnLeaveBalance){
    return this.http.post(environment.apiUrl+'/leave/getEarnLeaveBalance',filterModel);
  }
  saveOrUpdateOpeningBalance(leaveBalance:EarnLeaveBalance){
    return this.http.post(environment.apiUrl+'/leave/openingBalence/save', leaveBalance);
  }

  //Carry Forward or Encashment
  getCarryForwardOrEncashment(filterModel:EarnLeaveBalance){
    return this.http.post(environment.apiUrl+'/leave/carryForwardOrEncashment/get',filterModel);
  }
  saveCarryForward(leaveBalance:EarnLeaveBalance){
    return this.http.post(environment.apiUrl+'/leave/carryForward/save', leaveBalance);
  }
  saveEncashment(leaveBalance:EarnLeaveBalance){
    return this.http.post(environment.apiUrl+'/leave/encashment/save', leaveBalance);
  }

  //Substitute Leave
  getSubstituteLeave(filterModel:EarnLeaveBalance){
    return this.http.post(environment.apiUrl+'/leave/substituteLeave/get',filterModel);
  }
  saveSubstituteLeave(leaveBalance:EarnLeaveBalance){
    return this.http.post(environment.apiUrl+'/leave/substituteLeave/save', leaveBalance);
  }

  getLeaveApplyUserInfo(compId: number, date: string) {
    return this.http.get(environment.apiUrl + '/leave/apply/get/compId/' + compId + '/date/' + date);
  }

  deleteLeaveById(id:number){
  //  return this.http.post(environment.apiUrl + '/leave',leave);
   return this.http.delete(environment.apiUrl+'/leave/delete/id/'+id);
  }

  // showAttendenceReportData(attendenceReport:AttendenceReport){
  //   return this.http.post(environment.apiUrl+`/attendence/attendenceReport/showAttendenceReportData`,attendenceReport)
  //   }
}
