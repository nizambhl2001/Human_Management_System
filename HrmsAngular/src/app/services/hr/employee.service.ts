import { EmpAwardInfo } from './../../models/hr/emp-award-info.model';
import { EmpQualification } from './../../models/hr/emp-qualification-info.model';
import { EmpPublication } from './../../models/hr/emp-publication.model';
import { EmpScholarship } from './../../models/hr/emp-scholarship.model';
import { EmpTrainingInfo } from './../../models/hr/emp-training-info.model';
import { EmpReference } from './../../models/hr/emp-ref-info.model';
import { EmpContactInfo } from './../../models/hr/emp-contact-info.model';
import { EmpGenInfo } from './../../models/hr/emp-gen-info.model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { EmpFamilyInfo } from '../../models/hr/emp-family-info.model';
import { EmpEducation } from '../../models/hr/emp-edu-info.model';
import { EmpExperience } from '../../models/hr/emp-experience-info.model';
import { SearchEmployee } from '../../models/hr/search-emp.model';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  constructor(private http: HttpClient) { }

  //Employee General info
  saveOrUpdateEmpGenInfo(empGenInfo: EmpGenInfo) {
    return this.http.post(environment.apiUrl + '/hr/employee/genInfo/save', empGenInfo);
  }
  getMaxEmpCode() {
    return this.http.get(environment.apiUrl + '/hr/employee/genInfo/getMaxEmpCode');
  }
  getGenInfo(gradeVal: number, compId: number, empCode: string) {
    return this.http.get(environment.apiUrl + '/hr/employee/genInfo/get/gradeVal/' + gradeVal + '/compId/' + compId + '/empCode/' + empCode);
  }
  searchEmployee(empSearchKey: SearchEmployee) {
    return this.http.post(environment.apiUrl + '/hr/employee/search', empSearchKey);
  }
  getAllEmpCodeName(GradeValue:number){
    return this.http.get(environment.apiUrl+'/hr/employeeGenInfo/empCode/Name/gradeValue/'+GradeValue)
  }

  getAllBlockEmpCodeName(GradeValue:number){
    return this.http.get(environment.apiUrl+'/hr/Blockemployee/empCode/Name/gradeValue/'+GradeValue)
  }

  allBlockEmpCodeName(GradeValue:number){
    return this.http.get(environment.apiUrl+'/hr/employeeForBlock/empCode/Name/gradeValue/'+GradeValue)
  }
  getAllEmpCodeNameForSalaryReport(GradeValue:number){
    return this.http.get(environment.apiUrl+'/hr/employeeGenInfo/empCode/Name/salaryReport/gradeValue/'+GradeValue)
  }

  //Employee Family Info
  getFamilyInfo(companyId: number, empCode: string) {
    return this.http.get(environment.apiUrl + '/hr/employee/familyInfo/get/compId/' + companyId + '/empCode/' + empCode);
  }
  getFamilyMember(personId: number) {
    return this.http.get(environment.apiUrl + '/hr/employee/familyMember/get/personId/' + personId);
  }
  saveOrUpdateEmpFamily(empFamily: EmpFamilyInfo) {
    return this.http.post(environment.apiUrl + '/hr/employee/familyInfo/save', empFamily);
  }
  deleteEmpFamily(personId: number) {
    return this.http.delete(environment.apiUrl + '/hr/employee/familyInfo/delete/personId/' + personId);
  }

  //Employee Contact Info
  saveContactInfo(empContactInfo: EmpContactInfo) {
    return this.http.post(environment.apiUrl + '/hr/employee/contactInfo/save', empContactInfo);
  }
  getContactInfo(compId: number, empCode: string) {
    return this.http.get(environment.apiUrl + '/hr/employee/contactInfo/get/compId/' + compId + '/empCode/' + empCode);
  }

  //Employee Reference Info
  saveRefInfo(empRef: EmpReference) {
    return this.http.post(environment.apiUrl + '/hr/employee/reference/save', empRef);
  }
  updateRefInfo(empRef: EmpReference) {
    return this.http.post(environment.apiUrl + '/hr/employee/reference/update', empRef);
  }
  getAllReference(compId: number, empCode: string) {
    return this.http.get(environment.apiUrl + '/hr/employee/reference/get/compId/' + compId + '/empCode/' + empCode);
  }
  getReference(refId: number) {
    return this.http.get(environment.apiUrl + '/hr/employee/reference/get/referenceId/' + refId);
  }
  deleteReference(refId: number) {
    return this.http.delete(environment.apiUrl + '/hr/employee/reference/delete/referenceId/' + refId);
  }

  //Employee Education Info
  saveEmpEdu(empEdu: EmpEducation) {
    if (empEdu.id > 0) {
      return this.http.post(environment.apiUrl + '/hr/employee/education/update', empEdu);
    } else {
      return this.http.post(environment.apiUrl + '/hr/employee/education/save', empEdu);
    }
  }
  getEmpAllEdu(compId: number, empCode: string) {
    return this.http.get(environment.apiUrl + '/hr/employee/education/get/compId/' + compId + '/empCode/' + empCode);
  }
  getEmpEdu(empEduId: number) {
    return this.http.get(environment.apiUrl + '/hr/employee/education/get/empEduId/' + empEduId);
  }
  deleteEmpEdu(empEduId: number) {
    return this.http.delete(environment.apiUrl + '/hr/employee/education/delete/empEduId/' + empEduId);
  }

  //Employee Experience Info
  saveEmpExperience(empExp: EmpExperience) {
    if (empExp.id > 0) {
      return this.http.post(environment.apiUrl + '/hr/employee/experience/update', empExp);
    } else {
      return this.http.post(environment.apiUrl + '/hr/employee/experience/save', empExp);
    }
  }
  getEmpAllExperience(compId: number, empCode: string) {
    return this.http.get(environment.apiUrl + '/hr/employee/experience/get/compId/' + compId + '/empCode/' + empCode);
  }
  getEmpExperience(experienceId: number) {
    return this.http.get(environment.apiUrl + '/hr/employee/experience/get/experienceId/' + experienceId);
  }
  deleteEmpExperience(experienceId: number) {
    return this.http.get(environment.apiUrl + '/hr/employee/experience/delete/experienceId/' + experienceId);
  }

  //Employee Qualification Info
  // saveOrUpdateEmpQualification(empQualification:EmpQ)
  ////////////////Training info////////////////////////////

  getAllTrainingInfo(compID: number, empCode: string) {
    return this.http.get(environment.apiUrl + '/hr/employee/training/get/compId/' + compID + '/empCode/' + empCode);
  }
  getTrainingInfobyId(trainingId: number) {
    return this.http.get(environment.apiUrl + '/hr/employee/training/get/id/' + trainingId);
  }
  saveorUpdateTrainingInfo(empTrainingInfo: EmpTrainingInfo) {
    return this.http.post(environment.apiUrl + '/hr/employee/training/save', empTrainingInfo);
  }
  deleteTrainingInfo(trainingId: number) {
    return this.http.delete(environment.apiUrl + '/hr/employee/training/delete/empTrainID/' + trainingId);
  }
  ////////////////emp Scholarship////////////

  saveUpdateAndDeleteScholarship(empScholarship: EmpScholarship, pOptions: number) {
    return this.http.post(environment.apiUrl + '/hr/employee/scholarship/saveupdatedeleteandget/' + pOptions, empScholarship);
  }
  getAllScholarship(empScholarship: EmpScholarship, pOptions: number) {
    return this.http.post(environment.apiUrl + '/hr/employee/scholarship/getallscholarship/' + pOptions, empScholarship);
  }
  //////////////Employee Publication//////////////////
  saveUpdatePublication(empPublication: EmpPublication) {
    return this.http.post(environment.apiUrl + '/hr/employee/publication/SaveUpdatePublication', empPublication);
  }
  getAllPublication(companyID: number, empCode: string) {
    return this.http.get(environment.apiUrl + '/hr/employee/publication/GetEmpAllPublication/compID/' + companyID + '/empCode/' + empCode);
  }
  getAllChildPublication(companyID: number, empCode: string) {
    return this.http.get(environment.apiUrl + '/hr/employee/publication/GetEmpChildPublication/compID/' + companyID + '/empCode/' + empCode);
  }
  //////////////////Emp Professional Qualification ////////////////

  saveUpdateAndDeleteQualification(empQualification: EmpQualification, pOptions: number) {
    return this.http.post(environment.apiUrl + '/hr/employee/qualification/saveupdatedeleteandqualification/' + pOptions, empQualification);
  }
  getAllQualification(empQualification: EmpQualification, pOptions: number) {
    return this.http.post(environment.apiUrl + '/hr/employee/qualification/getAllqualification/' + pOptions, empQualification);
  }
  /////////////////////Employee Award Info//////////////////

  saveUpdateAndDeleteAward(empAward: EmpAwardInfo, pOptions: number) {
    return this.http.post(environment.apiUrl + '/hr/employee/award/SaveUpdatedeleteEmpAward/' + pOptions, empAward);
  }
  getAllAward(empAward: EmpAwardInfo, pOptions: number) {
    return this.http.post(environment.apiUrl + '/hr/employee/award/GetEmpAllAward/' + pOptions, empAward);
  }
  getEmpByBoss(bossEmpCode: string) {
    return this.http.get(environment.apiUrl + "/hr/employee/getByBoss/" + bossEmpCode);
  }

  getEmployeeCount( compId: number) {
    return this.http.get(environment.apiUrl + '/hr/employee/GetAllEmployeeCount/compId/' + compId);
  }

  getLeaveCount( laveDate: string) {
    return this.http.get(environment.apiUrl + '/hr/employee/GetAllLeaveCount/laveDate/' + laveDate);
  }

  getAbsentCount( compId:number ,cDate: string) {
    return this.http.get(environment.apiUrl + '/hr/employee/GetAllAbsentCount/compId/' + compId + '/cDate/' + cDate);
  }

  getAllLateComer( compId:number ,cDate: string) {
    return this.http.get(environment.apiUrl + '/hr/employee/GetAllLateComer/compId/' + compId + '/cDate/' + cDate);
  }

  getAllEmpHis( compId:number,cDate: string) {
    return this.http.get(environment.apiUrl + '/hr/employee/GetAllEmpHistory/compId/' + compId +'/cDate/' + cDate);
  }
  // getAllEmpLeaveToday( compId:number ,currentDate: string,type:number,projectID?:number,jobLocation?:number,departmentID?:number,) {
  //   return this.http.get(environment.apiUrl + '/hr/employee/GetAllEmpDetailsToday/compId/' + compId + '/currentDate/' + currentDate  + '/type/'+type + '/projectID/'+projectID + '/jobLocation/'+jobLocation+ '/departmentID/'+departmentID);
  // }
  getAllEmpLeaveToday(empDetails:any) {
    return this.http.post(environment.apiUrl + '/hr/employee/GetAllEmpDetailsToday', empDetails);
  }

  getAllEmpHisForProject(empDetails:any) {
    return this.http.post(environment.apiUrl + '/hr/employee/GetEmpByProject', empDetails);
  }

  getReportingBoss( compId:number ,empCode: string) {
    return this.http.get(environment.apiUrl + '/hr/employee/GetReportingBoss/compId/' + compId + '/empCode/' + empCode);
  }
  empDetailsByReportingBoss(currentdate: string,reportingBoss:string) {
    return this.http.get(environment.apiUrl + '/hr/employee/EmpDetailsByReportingBoss/currentdate/' + currentdate + '/reportingBoss/' + reportingBoss);
  }
  empDetailsBySupervisor(currentdate: string,reportingBoss:string) {
    return this.http.get(environment.apiUrl + '/hr/employee/EmpDetailsBySupervisor/currentdate/' + currentdate + '/reportingBoss/' + reportingBoss);
  }

}
