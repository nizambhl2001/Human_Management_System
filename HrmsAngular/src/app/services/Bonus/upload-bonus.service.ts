import { UploadBonusModel } from './../../models/bonus/upload-bonus.model';
import { Injectable } from "@angular/core";
import { HttpClient, HttpParams } from "@angular/common/http";
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UploadBonusService{
  constructor(private http:HttpClient){}
  deleteBonus(uploadBonus:UploadBonusModel){
  return this.http.post(environment.apiUrl+'/festival/bonus/delete/bonus',uploadBonus);
  }

  importFileData(importModel:UploadBonusModel){
    let paramObj:HttpParams = new HttpParams()
    .set('ID', importModel.id.toString())
    .set('BonusType', importModel.bonusType.toString())
    .set('SalaryHead', importModel.salaryHead.toString())
    .set('CompanyID', importModel.companyID.toString())
    .set('Grade', importModel.grade.toString())
    .set('PeriodID', importModel.periodID.toString())
    .set('PeriodName', importModel.periodName);
    let formFiles = new FormData();
    for(let i=0; i<importModel.excelFiles.length; i++){
      formFiles.append('excelFile'+i, importModel.excelFiles[i], importModel.excelFiles[i].name);
    }
   
    return this.http.post(environment.apiUrl+'/bonus/import', formFiles, {params:paramObj});
  }
}

