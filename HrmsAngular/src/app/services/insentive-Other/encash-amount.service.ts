import { Injectable } from "@angular/core";
import { HttpClient, HttpParams } from "@angular/common/http";
import { EncashmentAmountModel } from "../../models/incentive-other/encash-amount.model";
import { environment } from "../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class EncashAmountService {
  constructor(private http:HttpClient) { }
  saveEncashmentAmount(encashmentAmount:EncashmentAmountModel){
    return this.http.post(environment.apiUrl+'/Insentive/Encashment/amount/save',encashmentAmount);
  }
  getAll(compID:number,gradevalue:number){
    var param=new HttpParams()
    .set('CompanyID',compID.toString())
    .set('GradeValue',gradevalue.toString())
    return this.http.get(environment.apiUrl+'/Insentive/Encashment/amount/getAll',{params:param});
  }
  getById(id: number) {
    return this.http.get(environment.apiUrl+'/Insentive/Encashment/amount/getById/' + id);
  }
}
