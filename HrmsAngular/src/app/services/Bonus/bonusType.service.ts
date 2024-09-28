import { BonuSType } from './../../models/bonus/bonusType.model';
import { environment } from './../../../environments/environment';
import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})

export class BonusTypeService{
  constructor(private http:HttpClient){}
  getBonusType(){
    return this.http.get(environment.apiUrl+'/Bonus/Type/Get');
  }
  saveBonus(bonusModel:BonuSType){

  const httpOptions = {
    headers: new HttpHeaders({'Content-Type':  'application/json'})
  };
     return this.http.post(environment.apiUrl+'/Bonus/Type/Save',bonusModel);
  }
}
