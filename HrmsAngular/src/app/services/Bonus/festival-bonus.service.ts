import { environment } from './../../../environments/environment';
import { FestivalBonusModel } from './../../models/bonus/festival-bonus.model';
import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";

@Injectable({
  providedIn: 'root'
})
export class FestivalBonusService{
  constructor(private http:HttpClient){}
  getFestivalBonus(filterModel:any){
    var param=new HttpParams()
   .set('Department',filterModel.depertment)
   .set('companyid',filterModel.companyid)
   .set('GradeID',filterModel.gradeID)
   .set('BonusType',filterModel.bonusType)
   .set('JobType',filterModel.jobType)

  return this.http.get(environment.apiUrl+'/festival/Bonus/getAllBonus',{params:param});
  }
  saveFestivalBonus(festivalBonus:FestivalBonusModel){
   return this.http.post(environment.apiUrl+'/festival/bonus/save',festivalBonus);
  }
  savePcocessImportBonus(festivalBonus:FestivalBonusModel){
    return this.http.post(environment.apiUrl+'/Process/import/bonus/save',festivalBonus);
   }
}
