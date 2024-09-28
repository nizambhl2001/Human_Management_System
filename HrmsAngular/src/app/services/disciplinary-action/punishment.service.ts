import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Punishment } from '../../models/disciplinary-action/punishment.model';

@Injectable({
  providedIn: 'root'
})
export class PunishmentService {

  constructor(private http:HttpClient) { }

  getAll(empcode:string,gradevalue:number,comid:number){
    return this.http.get(environment.apiUrl+'/disciplinary/punishment/getall/empcode/'+empcode+'/gradevalue/'+gradevalue+'/comid/'+comid+'');
  }

  saveUpdate(punishment:Punishment){
    return this.http.post(environment.apiUrl+'/disciplinary/punishment/saveupdate',punishment);
  }

  getByid(id:number){
    return this.http.get(environment.apiUrl+'/disciplinary/punishment/getbyid/'+id)
  }
}
