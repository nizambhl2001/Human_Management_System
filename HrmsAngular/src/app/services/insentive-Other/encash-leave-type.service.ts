import { LeaveTypeModel } from './../../models/incentive-other/leave-type-setup.model';
import { HttpClient, HttpEventType, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class LeaveTypeService {
  constructor(private http:HttpClient) { }
  saveLeaveType(leaveType:LeaveTypeModel){
    return this.http.post(environment.apiUrl+'/Insentive/others/leave/type/setup/save',leaveType);
  }
  getAll(compID:number,gradevalue:number){
    var param=new HttpParams()
    .set('CompanyID',compID.toString())
    .set('GradeValue',gradevalue.toString())
    return this.http.get(environment.apiUrl+'/Insentive/others/leave/type/setup/getAll',{params:param});
  }
  getById(id: number) {
    return this.http.get(environment.apiUrl+'/Insentive/others/leave/type/setup/getById/' + id);
  }
}
