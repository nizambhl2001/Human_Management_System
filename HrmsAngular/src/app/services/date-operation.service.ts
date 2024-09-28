import { Injectable } from "@angular/core";
import { HttpClient, HttpParams } from "@angular/common/http";
import { environment } from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class DateOperationService {
  constructor(private http:HttpClient) { }
  dateOperation(fromDate:Date,toDate:Date){
    var param=new HttpParams()
    .set('fromDate', fromDate.toLocaleDateString())
    .set('toDate', toDate.toLocaleDateString());
   return this.http.get(environment.apiUrl+'/Date/operation',{params:param})
  }
}
