import { environment } from './../../../environments/environment';
import { UploadCertificateModel } from './../../models/hr/upload-certificate.model';
import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { UploadDocumentModel } from '../../models/hr/upload-document.model';

@Injectable({
  providedIn: 'root'
})
export class UploadCertificateService {

  constructor(private http:HttpClient) { }
insert(Model:UploadCertificateModel){
return this.http.post(environment.apiUrl+"/hr/certificate/upload",Model);
  }
  getByEmpCode(empCode:string,companyID:number){
   return this.http.get(environment.apiUrl+'/hr/certificate/getByempCode/EmpCode/'+empCode+'/CompanyID/'+companyID);
  }
  getById(id:number){
    return this.http.get(environment.apiUrl+'/hr/certificate/getById/id/'+id);
  }
  getImgSignatureByEmpCode(empCode:string){
  return this.http.get(environment.apiUrl+'/hr/image/signature/get/by/empCode/'+empCode)
  }
  uploadDocuments(uploadModel:UploadDocumentModel){
  return this.http.post(environment.apiUrl+'/hr/upload/document',uploadModel)
  }
  getAllDocByEmpCode(empCode:string){
  return this.http.get(environment.apiUrl+'/hr/upload/document/getby/EmpCode/'+empCode)
  }
}
