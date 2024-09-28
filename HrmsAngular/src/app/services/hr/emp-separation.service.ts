import { environment } from './../../../environments/environment';
import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { EmpSeparationInfoModel } from "../../models/hr/emp-separation-info.model";

@Injectable({
  providedIn: 'root'
})
export class EmpSeparationService {

  constructor(private http:HttpClient) {}
  insertSeparation(separation:EmpSeparationInfoModel){
  return this.http.post(environment.apiUrl+'/HR/emp/separation/insert',separation);
  }
  getAll(){
    return this.http.get(environment.apiUrl+'/HR/emp/separation/getAll');
  }
  delete(id:number){
   return this.http.delete(environment.apiUrl+'/HR/emp/separation/delete/id/'+id);
  }
  getById(id:number){
    return this.http.get(environment.apiUrl+'/HR/emp/separation/getById/id/'+id)
  }
}
