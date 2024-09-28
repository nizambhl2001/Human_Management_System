import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { KpiSetupModel } from '../../models/Apprisal/kpisetup';
import { EmployeeForApprisal } from '../../models/Apprisal/employee-for-apprisal';
import { KpiScoreAchievement } from '../../models/Apprisal/kpi-score-achievement';
import { ReportComponent } from '../../home/apprisal/report/report.component';
import { Recommendation } from '../../models/Apprisal/recommendation';

@Injectable({
  providedIn: 'root'
})
export class ApprisalService {
  constructor(private httpClient: HttpClient) { }

  getbusinessresult(empCode: string, userTypeID: number, companyId: number) {
    const paramObj = new HttpParams()
      .set("empCode", empCode)
      .set("userTypeID", userTypeID.toString())
      .set("companyId", companyId.toString())
    return this.httpClient.get(environment.apiUrl + '/apprisal/kpisetup/get/', { params: paramObj });
  }
  getKpiByid(id: number) {
    return this.httpClient.get(environment.apiUrl + '/apprisal/kpisetup/getbyId/' + id);
  }
  saveUpdateKpi(saveUpdatekpi: KpiSetupModel) {
    return this.httpClient.post(environment.apiUrl + "/apprisal/kpisetup/saveupdate", saveUpdatekpi)
  }
  deleteKpi(id: number, companyId: number) {
    return this.httpClient.delete(environment.apiUrl + "/apprisal/kpisetup/deleteKpi/id/" + id + "/companyId/" + companyId);
  }
  getPeopleresult(empCode: string, userTypeID: number, companyId: number) {
    const paramObj = new HttpParams().set("empCode", empCode)
      .set("userTypeid", userTypeID.toString())
      .set("companyId", companyId.toString())
    return this.httpClient.get(environment.apiUrl + "/apprisal/kpisetup/getpeople/", { params: paramObj });
  }
  getEmployeeInfo(companyId: number, empCode: string) {
    return this.httpClient.get(environment.apiUrl + "/apprisal/kpisetup/getEmpInfo/companyId/" + companyId + "/empCode/" + empCode);
  }
  getYear() {
    return this.httpClient.get(environment.apiUrl + "/apprisal/kpisetup/getYear");
  }
  getQuarter(empCode: string, companyId: number) {
    return this.httpClient.get(environment.apiUrl + "/apprisal/kpisetup/getQuarter/empCode/" + empCode + "/companyId/" + companyId);
  }
  getEmpWiseBusiness(empCode: string, yearId: number, quarterId: number, companyId: number) {
    const paramObj = new HttpParams().set("empCode", empCode)
      .set("yearId", yearId.toString())
      .set("quarterId", quarterId.toString())
      .set("companyId", companyId.toString())
    return this.httpClient.get(environment.apiUrl + "/apprisal/empwisekpi/getBusinessResult/", { params: paramObj });
  }
  getEmpWisePeople(empCode: string, yearId: number, quarterId: number, companyId: number) {
    const paramObj = new HttpParams().set("empCode", empCode)
      .set("yearId", yearId.toString())
      .set("quarterId", quarterId.toString())
      .set("companyId", companyId.toString())
    return this.httpClient.get(environment.apiUrl + "/apprisal/empwisekpi/getPeopleResult/", { params: paramObj });
  }
  saveUpdateEmpWiseKpi(saveUpdateEmpWisekpi: EmployeeForApprisal[]) {
    return this.httpClient.post(environment.apiUrl + "/apprisal/empwisekpi/saveUpdateEmpWiseKpi", saveUpdateEmpWisekpi);
  }
  updateEmpWiseKpiForAgree(updateForAgree: EmployeeForApprisal) {
    return this.httpClient.post(environment.apiUrl + "/apprisal/empwisekpi/updateEmpWiseKpiForAgree", updateForAgree)
  }
  getAllQuarter() {
    return this.httpClient.get(environment.apiUrl + "/apprisal/agreebybosskpi/getQuarter")
  }
  getReportToEmp(quarterId: number, yearId: number, reportTo: string) {
    const paramObj = new HttpParams()
      .set("quarterId", quarterId.toString())
      .set("yearId", yearId.toString())
      .set("reportTo", reportTo)
    return this.httpClient.get(environment.apiUrl + "/apprisal/AgreeByBossKpi/getReportToEmp/", { params: paramObj });
  }
  getAllReportToEmp(quarterId: number, yearId: number, reportTo: string) {
    const paramObj = new HttpParams()
      .set("quarterId", quarterId.toString())
      .set("yearId", yearId.toString())
      .set("reportTo", reportTo)
    return this.httpClient.get(environment.apiUrl + "/apprisal/AgreeByBossKpi/getAllReportToEmp/", { params: paramObj });
  }
  getSingleEmployeeInfo(companyId: number, empCode: string) {
    return this.httpClient.get(environment.apiUrl + "/apprisal/AgreeByBossKpi/getEmpCode/companyId/" + companyId + "/empCode/" + empCode);
  }
  KpiEditByBoss(kpiEditedByBoss: EmployeeForApprisal[]) {
    return this.httpClient.post(environment.apiUrl + "/apprisal/agreebybosskpi/kpiUpdateByBoss", kpiEditedByBoss);
  }
  KpiAgreeByBoss(agreebyBoss: EmployeeForApprisal) {
    return this.httpClient.post(environment.apiUrl + "/apprisal/agreebybosskpi/agreeByBoss", agreebyBoss);
  }
  getBusinessForAchievement(empCode: string, yearId: number, quarterId: number, companyId: number) {
    const paramObj = new HttpParams().set("empCode", empCode)
      .set("yearId", yearId.toString())
      .set("quarterId", quarterId.toString())
      .set("companyId", companyId.toString())
    return this.httpClient.get(environment.apiUrl + "/apprisal/agreebybosskpi/getBusinessKpi/", { params: paramObj });
  }
  getPeolpeForAchievement(empCode: string, yearId: number, quarterId: number, companyId: number) {
    const paramObj = new HttpParams().set("empCode", empCode)
      .set("yearId", yearId.toString())
      .set("quarterId", quarterId.toString())
      .set("companyId", companyId.toString())
    return this.httpClient.get(environment.apiUrl + "/apprisal/agreebybosskpi/getPeopleKpi/", { params: paramObj });
  }

  saveAchievementScore(kpiscoreachv: KpiScoreAchievement[]) {
    return this.httpClient.post(environment.apiUrl + "/apprisal/agreebybosskpi/saveScoreAchievement", kpiscoreachv);
  }

  getEmpForAgreeScore(quarterId: number, yearId: number, reportTo: string) {
    const paramObj = new HttpParams()
      .set("quarterId", quarterId.toString())
      .set("yearId", yearId.toString())
      .set("empCode", reportTo)
    return this.httpClient.get(environment.apiUrl + "/apprisal/agreebybossscore/getEmpScoreAchievement/", { params: paramObj });
  }

  //avarage
  getAvarageScore(yearId: number, empCode: string) {
    const paramObj = new HttpParams()
      .set("yearId", yearId.toString())
      .set("empCode", empCode)
    return this.httpClient.get(environment.apiUrl + "/apprisal/agreebybossscore/EmpCode/Year", { params: paramObj })
  }
  getAllEmpForAgreeScore(quarterId: number, yearId: number, reportTo: string) {
    const paramObj = new HttpParams()
      .set("quarterId", quarterId.toString())
      .set("yearId", yearId.toString())
      .set("empCode", reportTo)
    return this.httpClient.get(environment.apiUrl + "/apprisal/agreebybossscore/getAllEmpScoreAchievement/", { params: paramObj });
  }
  updateAchievementScore(kpiscoreachv: KpiScoreAchievement[]) {
    console.log(kpiscoreachv);
    return this.httpClient.post(environment.apiUrl + "/apprisal/agreebybossscore/updateKpiScoreByBoss", kpiscoreachv);
  }

  getApprisalReport(filterModel: any) {
    let paramObj = new HttpParams();
    Object.keys(filterModel).forEach(key => {
      paramObj = paramObj.set(key, filterModel[key]);
    });
    return this.httpClient.get(environment.reportApiUrl + '/apprisal', { params: paramObj, responseType: 'blob' });
  }
  getEmpInfo(companyId: number, empCode: string, yearId: number) {
    return this.httpClient.get(environment.apiUrl + "/apprisal/agreebybosskpi/getEmpInfo/companyId/" + companyId + "/empCode/" + empCode + "/YearId/" + yearId);
  }
  getEmpApprisalHistory(companyId: number, empCode: string, yearId: number) {
    return this.httpClient.get(environment.apiUrl + "/apprisal/agreebybosskpi/getEmpApprisalHistory/companyId/" + companyId + "/empCode/" + empCode + "/YearId/" + yearId);
  }
  getAgreeStatusForRecommendation(yearId: number, reportTo: string) {
    return this.httpClient.get(environment.apiUrl + "/apprisal/agreebybosskpi/getAgreeStatusForRecommendation/yearId/" + yearId + "/reportTo/" + reportTo);
  }
  SaveEmpRecommendation(recommendation: Recommendation) {
    return this.httpClient.post(environment.apiUrl + "/apprisal/agreebybosskpi/SaveEmpRecommendation", recommendation);
  }
  getAllKpiList() {
    return this.httpClient.get(environment.apiUrl + `/apprisal/empwisekpi/getallkpilist`)
  }
  resetKpi(kpi) {
    let paramObj = new HttpParams()
    .append('empCode',kpi.empCode)
    .append('yearId', kpi.yearId)
    .append('quarterId', kpi.quarterId)
    .append('companyId', kpi.companyId)
    .append('userId', kpi.userId)

    return this.httpClient.get(environment.apiUrl + `/apprisal/kpi/reset`,{params:kpi})
  }
  resetAppriasal(score) {
    let paramObj = new HttpParams()
    .append('empCode',score.empCode)
    .append('yearId', score.yearId)
    .append('quarterId', score.quarterId)
    .append('companyId', score.companyId)
    .append('userId', score.userId)
    return this.httpClient.get(environment.apiUrl + `/apprisal/score/reset`,{params:paramObj})
  }

}
