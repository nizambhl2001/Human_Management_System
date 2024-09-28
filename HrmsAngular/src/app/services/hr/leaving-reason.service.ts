import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { environment } from "../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class LeavingReasonService {
  constructor(private http:HttpClient) { }
  getAllLeavingReason(){
    return this.http.get(environment.apiUrl+'/hr/leaving/reason/getAll')
  }
}
