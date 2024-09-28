import { environment } from './../../../environments/environment';
import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class PersonalFileService {
  constructor(private http:HttpClient) { }
  getPersonalFileInfo(empCode:string){
   return this.http.get(environment.apiUrl+'/hr/personal/file/flipBook/getAll/empCode/'+empCode)
  }
}
