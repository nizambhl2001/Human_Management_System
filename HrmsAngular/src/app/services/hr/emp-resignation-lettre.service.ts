import { environment } from './../../../environments/environment';
import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { ResignationLettreModel } from "../../models/hr/emp-resignation-lettre.model";

@Injectable({
  providedIn: 'root'
})
export class ResignationLettreService {

  constructor(private http:HttpClient) {}
  savelettre(resignation:ResignationLettreModel){
  return this.http.post(environment.apiUrl+'/hr/resignation/Letter/save',resignation);
  }
  getAllLetter(){
    return this.http.get(environment.apiUrl+'/hr/resignation/Letter/getAll')
  }
  getById(id:number){
    return this.http.get(environment.apiUrl+'/hr/resignation/Letter/getById/id/'+id)
  }
  getAllNotice(gradeValue:number,companyId:number,type:number,empCode:number){
    var param=new HttpParams()
    .set('GradeValue',gradeValue.toString())
    .set('CompanyID',companyId.toString())
    .set('Type',type.toString())
    .set('EmpCode',empCode.toString())
    return this.http.get(environment.apiUrl+'/hr/resignation/Notice/lettre/get',{params:param})
  }
}
