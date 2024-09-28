import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { NoticeEnquire } from '../../models/disciplinary-action/notice-enquire.model';

@Injectable({
  providedIn: 'root'
})
export class NoticeEnquireService {

  constructor( private http:HttpClient) { }


  saveNoticeEnquire(noticeEnquire:NoticeEnquire){
    return this.http.post(environment.apiUrl+'/disciplinary/noticeenquire/saveupdate',noticeEnquire);
  }
  getAllShowCauseResult(empcode:string,gradevalue:number,comid:number){
    return this.http.get(environment.apiUrl+'/disciplinary/noticeenquire/getall/empcode/'+empcode+'/gradevalue/'+gradevalue+'/comid/'+comid+'')
  }


  getById(id:number){
    return this.http.get(environment.apiUrl+'/disciplinary/noticeenquire/'+id)
  }
}
