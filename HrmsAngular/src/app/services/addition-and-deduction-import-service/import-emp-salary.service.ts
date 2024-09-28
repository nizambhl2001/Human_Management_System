import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { ImportEmpSalary } from '../../models/Addition/import-emp-salary.model';

@Injectable({
  providedIn: 'root'
})
export class ImportEmpSalaryService {

  constructor(
    private http:HttpClient
  ) { }

  deleteSalary(uploadSalary:ImportEmpSalary){
    return this.http.post(environment.apiUrl+'/Addtition/salary/delete/salary',uploadSalary);
    }



  importFileData(importModel:ImportEmpSalary){
    let paramObj:HttpParams = new HttpParams()
    .set('ID', importModel.id.toString())
    .set('SalaryHead', importModel.salaryHead.toString())
    .set('CompanyID', importModel.companyID.toString())
    .set('Grade', importModel.grade.toString())
    .set('PeriodID', importModel.periodID.toString())
    .set('PeriodName', importModel.periodName);
    let formFiles = new FormData();
    for(let i=0; i<importModel.excelFiles.length; i++){
      formFiles.append('excelFile'+i, importModel.excelFiles[i], importModel.excelFiles[i].name);
    }
    return this.http.post(environment.apiUrl+'/Addtion/Salary/import', formFiles, {params:paramObj});
  }
}
