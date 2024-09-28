import { environment } from './../../../environments/environment';
import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { EmpObjectiveInfoModel } from "../../models/hr/emp-objective-info.model";

@Injectable({
  providedIn: 'root'
})
export class EmpObjectiveService {

  constructor(private http:HttpClient) {}
  saveUpdateDelete(objectiveModel:EmpObjectiveInfoModel){
   return this.http.post(environment.apiUrl+'/hr/objective/info/save/update/delete',objectiveModel);
  }
  getById(id:number){
    return this.http.get(environment.apiUrl+'/HR/emp/objective/getById/id/'+id)
  }
  getAll(){
    return this.http.get(environment.apiUrl+'/hr/objective/info/getAll');
  }
}
