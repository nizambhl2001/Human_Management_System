import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { ShowcauseResult } from '../../models/disciplinary-action/showcauseresult.model';

@Injectable({
  providedIn: 'root'
})
export class ShowCauseResultService {

  constructor(private http:HttpClient) { }


  getAllShowCauseResult(empcode:string,gradevalue:number,comid:number){
    return this.http.get(environment.apiUrl+'/disciplinary/showcauseresultList/getall/empcode/'+empcode+'/gradevalue/'+gradevalue+'/comid/'+comid+'')
  }
saveShowCauseResult(showCauseResult:ShowcauseResult){
  const httpOptions = {
    headers: new HttpHeaders({'Content-Type':  'application/json'})
  };

return this.http.post(environment.apiUrl+'/disciplinary/showcauseresult/saveupdate',showCauseResult);
}

getShowCauseById(id:number){
 return this.http.get(environment.apiUrl+'/disciplinary/showcauseresult/'+id);
}

}
