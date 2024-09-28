import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { FestivalBonusModel } from "../../models/bonus/festival-bonus.model";
import { environment } from "../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class ArrearPaymentManual {
  constructor(private http:HttpClient) { }
  saveArearPayment(festivalBonus:FestivalBonusModel){
    return this.http.post(environment.apiUrl+'/arear/payment/manual',festivalBonus);
   }
}
