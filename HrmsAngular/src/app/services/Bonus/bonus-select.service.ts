import { BonusSetupModel } from './../../models/bonus/bonus-setup.model';
import { environment } from './../../../environments/environment';
import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class BonusSelectService{
  constructor(private http:HttpClient){}
  getBonusAllowance(){
    return this.http.get(environment.apiUrl+'/bonus/setup/getAllowance');
  }

  saveBonusSetup(bonusSetup:BonusSetupModel){
    const httpOptions = {
      headers: new HttpHeaders({'Content-Type':  'application/json'})
    };
   return this.http.post(environment.apiUrl+'/bonus/setup/Save',bonusSetup);
  }
  getAllBonus(gradeValue:number,companyId:number){
    return this.http.get(environment.apiUrl+'/bonus/setup/getAll/gradeValue/'+gradeValue+'/companyId/'+companyId);
  }
}
