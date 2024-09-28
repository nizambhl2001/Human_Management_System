import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { environment } from "../../../environments/environment";

@Injectable({
    providedIn: 'root'
  })
  export class CompanyService{
    constructor(private http:HttpClient) { }
    getCompany(){
        return this.http.get(environment.apiUrl+'/system/setup/company/get');
    }
  }