import { environment } from './../../../environments/environment';
import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { ResignationLettreModel } from '../../models/hr/emp-resignation-lettre.model';

@Injectable({
  providedIn: 'root'
})
export class ResignationApproveService {

  constructor(private http:HttpClient) { }
  getResignationApprove(reqTo:string,compId:number){
    var param=new HttpParams()
    .set('ReqTo',reqTo)
    .set('CompanyID',compId.toString())
    return this.http.get(environment.apiUrl+'/hr/resignation/lettre/approve',{params:param})
  }
  noticeLettereStatus(resignationStatus:ResignationLettreModel){
  return this.http.post(environment.apiUrl+'/hr/resignation/lettre/status',resignationStatus)
  }
  getAllApproveLettreList(){
    return this.http.get(environment.apiUrl+'/hr/resignation/Letter/get/approveList')
  }
}
