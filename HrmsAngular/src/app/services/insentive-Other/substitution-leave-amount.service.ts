import { Injectable } from "@angular/core";
import { HttpClient, HttpParams } from "@angular/common/http";
import { environment } from "../../../environments/environment";

@Injectable({
  providedIn: 'root'
})export class SubstitutionleaveAmount {
  constructor(private http:HttpClient) { }
  getAll(branchID:number,departmentID:number,yearID:number,periodID:number,gradeValue:number,companyID:number){
    var param=new HttpParams()
    .set('BranchID',branchID.toString())
    .set('DepartmentID',departmentID.toString())
    .set('YearID',yearID.toString())
    .set('PeriodID',periodID.toString())
    .set('GradeValue',gradeValue.toString())
    .set('CompanyID',companyID.toString())
    return this.http.get(environment.apiUrl+'/insentive/other/subtitution/leave/amount/getAll',{params:param})
}
}
