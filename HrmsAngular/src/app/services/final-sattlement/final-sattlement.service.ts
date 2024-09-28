import { FinalSettlement } from './../../models/final-sattlement/final-settlement.model';
import { GratuityYear } from './../../models/final-sattlement/gratuity-year.model';
import { GratuitySetup } from './../../models/final-sattlement/gratuity-setup.model';
import { NoticeDaySetup } from './../../models/final-sattlement/notice-day-setup.model';
import { environment } from './../../../environments/environment';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { NoticeAmount } from '../../models/final-sattlement/notice-amount.model';


@Injectable({
  providedIn: 'root'
})
export class FinalSattlementService {

  constructor(
    private http: HttpClient
  ) { }
  ////////////////////////////NoticeDaySetup/////////////////

  getAllNoticeDays(companyID: number, gradeValue: number, userTypeID: number) {
    return this.http.get(environment.apiUrl + '/finalsattlement/noticedaysetup/getall/comp/' + companyID + '/gradevalue/' + gradeValue + '/usertypeid/' + userTypeID);
  }

  getNoticedayByID(id: number) {
    return this.http.get(environment.apiUrl + '/finalsattlement/noticedaysetup/getallbyId/' + id);
  }
  saveUpdateNoticeday(noticeDay: NoticeDaySetup) {
    return this.http.post(environment.apiUrl + '/finalsattlement/noticedaysetup/saveupdate', noticeDay);
  }

  ///////////////////////NoticeAmountSetup////////////////
  getAllNoticeAmount(companyID: number, gradeValue: number, userTypeID: number) {
    return this.http.get(environment.apiUrl + '/finalsattlement/noticeamount/getall/comp/' + companyID + '/gradevalue/' + gradeValue + '/usertypeid/' + userTypeID);
  }

  getNoticeAmountByID(id: number) {
    return this.http.get(environment.apiUrl + '/finalsattlement/noticeamount/getallbyId/' + id);
  }
  saveUpdateNoticeAmount(noticeAmount: NoticeAmount) {
    return this.http.post(environment.apiUrl + '/finalsattlement/noticeamount/saveupdate', noticeAmount);
  }
  //////////////////Gratuity Setup/////////////

  getAllGratuity(companyID: number, gradeValue: number, userTypeID: number) {
    return this.http.get(environment.apiUrl + '/finalsattlement/gratuity/getall/comp/' + companyID + '/gradevalue/' + gradeValue + '/usertypeid/' + userTypeID);
  }

  getGratuityByID(id: number) {
    return this.http.get(environment.apiUrl + '/finalsattlement/gratuity/getallbyId/' + id);
  }
  saveGratuity(gratuity: GratuitySetup) {
    return this.http.post(environment.apiUrl + '/finalsattlement/gratuity/saveupdate', gratuity);
  }
  ///////////////////////Gratuity Year Setup//////////////
  getAllGratuityYear(companyID: number, gradeValue: number, userTypeID: number) {
    return this.http.get(environment.apiUrl + '/finalsattlement/gratuityyear/getall/comp/' + companyID + '/gradevalue/' + gradeValue + '/usertypeid/' + userTypeID);
  }

  getGratuityYearByID(id: number) {
    return this.http.get(environment.apiUrl + '/finalsattlement/gratuityyear/getallbyId/' + id);
  }
  saveGratuityYear(gratuityyear: GratuityYear) {
    return this.http.post(environment.apiUrl + '/finalsattlement/gratuityyear/saveupdate', gratuityyear);
  }
  ///////////////final settlement//////////////
  calculateFinalSettlement(finalsettlement: FinalSettlement) {
    return this.http.post(environment.apiUrl + '/finalsattlement/finalsettlement/caculatefinalsettlement', finalsettlement);
  }
  saveFinalSettlement(finalSettlement: FinalSettlement) {
    return this.http.post(environment.apiUrl + '/finalsattlement/finalsettlement/savefinalsettlement', finalSettlement);
  }
  /////////// new Final settlement//////////
  getInactiveEmployee(gradeValue: number, companyId: number) {
    return this.http.get(environment.apiUrl + '/finalsattlement/finalsattlement/gradeValue/' + gradeValue + '/companyId/' + companyId);
  }
  // getSeperateEmployee(empCode:string, companyId:number){
  // return this.http.get(environment.apiUrl+'/finalsattlement/getSeperationEmployee/empCode/'+ empCode+'/companyId/'+companyId);
  // }


  //===============New Mostafij Add ========================

  getCalculationFinalSattlement(finalSettlement: FinalSettlement) {
    return this.http.post(environment.apiUrl + '/finalsattlement/getSeperationEmployee', finalSettlement);
  }

}
