import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class BonusPeriodService{
  constructor(private http:HttpClient){}
  getBonusPeriod(){
    return this.http.get(environment.apiUrl+'/festival/Bonus/GetAllPeriod');
  }
}
