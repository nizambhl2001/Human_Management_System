import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { SubsistanceAmountModel } from "../../models/subsistance-allowances/subsistance-amount.model";
import { environment } from "../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class SubsistanceAmountService {
  constructor(private http:HttpClient) { }
  subsistanceAmountSave(subsistanceAmount:SubsistanceAmountModel){
  return  this.http.post(environment.apiUrl+'/Subsistanve/Amount/save',subsistanceAmount);
  }
  getAll(gradeValue:number,compID:number){
    return this.http.get(environment.apiUrl+'/Subsistanve/Amount/getAll/'+gradeValue+'/'+compID);
  }
  getById(id:number){
    return this.http.get(environment.apiUrl+'/Subsistanve/Amount/getById/id/'+id)
  }
}
