import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Showcause } from '../../models/disciplinary-action/showcause.model';


@Injectable({
  providedIn: 'root'
})
export class ShowCauseService {

  constructor(private http:HttpClient) { }

  saveShowCause(showcause:Showcause){
    return this.http.post(environment.apiUrl+'/disciplinary/showcause/saveupdate',showcause);
  }

  getAllShowCause(){
   return this.http.get(environment.apiUrl+'/disciplinary/showcause/getall')
  }
  getShowCauseById(id:number){
    return this.http.get(environment.apiUrl+'/disciplinary/showcause/'+id);
  }
 
}
