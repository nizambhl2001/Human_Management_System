import { environment } from './../../environments/environment';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ReportService {


  constructor(private http:HttpClient) { }

  //HR Report
  getHrReport(filterModel:any){
    let paramObj = new HttpParams();
    Object.keys(filterModel).forEach(key=>{
      paramObj = paramObj.set(key, filterModel[key]);
    });
    return this.http.get(environment.reportApiUrl+'/hr', {params:paramObj, responseType:'blob'});
  }
  //Asset/property Report
  getAssetReport(reportId: number, propId: number,assetModelId:number, compId: number, empCode:string, grade:number, exportType:string) {
    const paramObj = new HttpParams()
      .set('ReportId', reportId.toString())
      .set('PropertyID', propId.toString())
      .set('ModelID', assetModelId.toString())
      .set('CompanyID', compId.toString())
      .set('EmpCode', empCode)
      .set('Grade', grade.toString())
      .set('ExportType', exportType)

    return this.http.get(environment.reportApiUrl + '/asset', { params: paramObj, responseType: 'blob' });
  }
  //Leave Report
  getLeaveReport(leaveReportParam:any){
    let paramObj = new HttpParams();
    Object.keys(leaveReportParam).forEach(key=>{
        paramObj = paramObj.set(key,leaveReportParam[key]);
    })
    return this.http.get(environment.reportApiUrl+'/leave',{params:paramObj, responseType:'blob'})
  }
  //DisciplinaryAction Report
  getDisciplinaryReport(filterObj:any){
    let paramObj = new HttpParams();
    Object.keys(filterObj).forEach(key=>{
      paramObj = paramObj.set(key, filterObj[key]);
    })
    return this.http.get(environment.reportApiUrl+'/disciplinary', {params:paramObj, responseType:'blob'});
  }
  //ShiftAllowance/Attendance Report
  getShiftAllowanceReport(shiftRptParam:any){
    let paramObj = new HttpParams();
    Object.keys(shiftRptParam).forEach(key=>{
      paramObj = paramObj.set(key, shiftRptParam[key]);
    });
    return this.http.get(environment.reportApiUrl+'/attendance', {params:paramObj, responseType:'blob'});
  }
  //Loan Report
  getLoanReport(filterParam:any){
    let paramObj = new HttpParams();
    Object.keys(filterParam).forEach(key=>{
      paramObj = paramObj.set(key, filterParam[key]);
    });
    return this.http.get(environment.reportApiUrl+'/loan', {params:paramObj, responseType:'blob'});
  }
  //Payroll/SubstanceAllowance Report
  getPayrollReport(filterParam:any){
    let paramObj = new HttpParams();
    Object.keys(filterParam).forEach(key=>{
      paramObj = paramObj.set(key, filterParam[key]);
    })
    console.log(filterParam)
    return this.http.get(environment.reportApiUrl+'/payroll', {params:paramObj, responseType:'blob'});
  }
  //Author Setu
  getApprisalReport(filterModel:any){
    let paramObj = new HttpParams();
    Object.keys(filterModel).forEach(key=>{
      paramObj = paramObj.set(key, filterModel[key]);
    });
    return this.http.get(environment.reportApiUrl+'/apprisal', {params:paramObj, responseType:'blob'});
  }

    //Author Setu
    paySlipToEmail(filterModel:any){
      let paramObj = new HttpParams();
      Object.keys(filterModel).forEach(key=>{
        paramObj = paramObj.set(key, filterModel[key]);
      });
      return this.http.get(environment.reportApiUrl+'/paySlipToEmail', {params:paramObj, responseType:'blob'});
    }


  //Author Khaleda
  getAssetReportSingle(filterParam:any){
    let paramObj = new HttpParams();
    Object.keys(filterParam).forEach(key=>{
      paramObj = paramObj.set(key, filterParam[key]);
    })
    return this.http.get(environment.reportApiUrl+'/asset', {params:paramObj, responseType:'blob'});
  }

  getProvidentfundReport(filterParam:any){
    let paramObj = new HttpParams();
    Object.keys(filterParam).forEach(key=>{
      paramObj=paramObj.set(key,filterParam[key]);
    })
    return this.http.get(environment.reportApiUrl+'/providentfund', {params:paramObj,responseType:'blob'});
  }

  getGlIntrgration(filterParam:any){
    let paramObj = new HttpParams();
    Object.keys(filterParam).forEach(key=>{
      paramObj=paramObj.set(key,filterParam[key]);
    })
    return this.http.get(environment.reportApiUrl+'/glReport',{params:paramObj,responseType:'blob'});
  }

  getBasicInfoReport(filterParam:any){
    debugger
    let paramObj = new HttpParams();
    Object.keys(filterParam).forEach(key=>{
      paramObj = paramObj.set(key, filterParam[key]);
    })
    return this.http.get(environment.reportApiUrl+'/BasicInfo', {params:paramObj, responseType:'blob'});
  }


}
