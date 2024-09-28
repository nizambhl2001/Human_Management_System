import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { ArrearPaymentAutoModel } from "../../models/incentive-other/arear-payment-auto.model";
import { environment } from "../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class ArrearPaymentAuto {
  constructor(private http:HttpClient) { }
  arrearSaveAuto(model:ArrearPaymentAutoModel){
  return this.http.post(environment.apiUrl+'/arrear/payment/auto/Save',model);
  }
}
