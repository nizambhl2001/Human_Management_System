import { environment } from './../../../environments/environment';
import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { AdditionalDuties } from '../../models/hr/additional-duties.model';

@Injectable({
  providedIn: 'root'
})
export class AdditionalDutiesService {
  constructor(private http:HttpClient) { }
  saveUpdate(additional:AdditionalDuties){
  console.log(additional);
    return this.http.post(environment.apiUrl+'/hr/addition/duty/saveOrUpdate',additional);
  }
  getAll(){
    return this.http.get(environment.apiUrl+'/hr/addition/duty/getAll')
  }
  getById(id: number) {
    return this.http.get(environment.apiUrl +'/hr/addition/duty/getbyid/'+ id);
  }
}
