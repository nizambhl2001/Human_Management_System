import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { JoiningInfoModel } from "../../models/FlipBook/join-info-model";
import { environment } from "../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class JoiningInfoService {
  constructor(private http:HttpClient) { }
  saveJoiningInfo(joiningInfo:JoiningInfoModel){
  return this.http.post(environment.apiUrl+'/hr/Joining/info/saveOrUpdate',joiningInfo)
  }
  getJoiningInfo(empCode:string){
    return this.http.get(environment.apiUrl+'/hr/Joining/info/get/by/empCode/'+empCode);
  }
}
