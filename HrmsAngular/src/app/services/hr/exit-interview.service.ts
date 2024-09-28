import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { environment } from "../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class ExitIntyerviewService {
  constructor(private http:HttpClient) { }
  interviewSave(exitInterview){
  return this.http.post(environment.apiUrl+'/exit/interview/save',exitInterview)
  }
}
