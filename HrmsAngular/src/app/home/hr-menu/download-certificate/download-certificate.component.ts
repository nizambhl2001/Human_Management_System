import { type } from 'os';
import { AuthService } from './../../../services/auth.service';
import { ApiResponse } from './../../../models/response.model';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Employment } from '../../../models/hr/employment.model';
import { EmploymentService } from '../../../services/hr/employment.service';
import { UploadCertificateService } from '../../../services/hr/upload-certificate.service';
import { UploadCertificateModel } from '../../../models/hr/upload-certificate.model';
import { ImageSignatureModel } from '../../../models/hr/image-signature.model';
import { UploadDocumentModel } from '../../../models/hr/upload-document.model';

@Component({
  selector: 'app-download-certificate',
  templateUrl: './download-certificate.component.html',
  styleUrls: ['./download-certificate.component.scss','../../../../vendor/libs/angular2-ladda/angular2-ladda.scss']
})
export class DownloadCertificateComponent implements OnInit {
  compId: number;
  image: string;
  empInfo: Employment;
  downloadCertificate: FormGroup;
  allDocument:UploadDocumentModel[]=[];
  dataByEmpCode: UploadCertificateModel[] = [];
  imageSignatureByEmpCode: ImageSignatureModel[] = [];
  isLoadingDocument:boolean = false;
  isLoadingCertificate:boolean = false;
  isLoadingImgSig:boolean = false;
  constructor(
    private uploadService: UploadCertificateService,
    private employmentES: EmploymentService,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit() {
    this.compId=AuthService.getLoggedCompanyId();
    this.createForm();
  }
  onSelectEmployee(employee) {
    if(employee){
      this.downloadCertificate.patchValue({
        empCode:employee.empCode,
        empName:employee.empName,
        department:employee.department,
        designation:employee.designation
      })
      this.getByEmpCode();
      this.getImgSignatureByEmpCode();
      this.getAllDocByEmpCode()
    }
  }
  getByEmpCode() {
    this.isLoadingCertificate = true;
    this.uploadService.getByEmpCode(this.f.empCode.value, this.compId).subscribe((response: ApiResponse) => {
      this.isLoadingCertificate = false;
      if (response.status) {
        this.dataByEmpCode = response.result as UploadCertificateModel[];
      }
    },err=>{
      this.isLoadingCertificate = false;
    })
  }
  getAllDocByEmpCode(){
    this.isLoadingDocument = true;
    this.uploadService.getAllDocByEmpCode(this.f.empCode.value).subscribe((response:ApiResponse)=>{
      this.isLoadingDocument = false;
      if(response.status){
        this.allDocument=response.result as UploadDocumentModel[];
        console.log(this.allDocument);
      }
    },err=>{
      this.isLoadingDocument = false;
    })
}
  getImgSignatureByEmpCode() {
    this.isLoadingImgSig = true;
    this.uploadService.getImgSignatureByEmpCode(this.f.empCode.value).subscribe((response: ApiResponse) => {
      this.isLoadingImgSig = false;
      if (response.status) {
        this.imageSignatureByEmpCode = response.result as ImageSignatureModel[];
      }
    },err=>{
      this.isLoadingImgSig = false;
    })
  }
  onDownloadCertificate(id: number): any {
    let certificate = this.dataByEmpCode.find(c => c.id === id);
    const imgBlob = this.dataURItoBlob(certificate.cImage);
    var downloadURL = URL.createObjectURL(imgBlob);
    var link = document.createElement('a');
    link.href = downloadURL;
    link.download = certificate.empCode+'_'+certificate.description.replace(' ', '_')+certificate.fileExtension;
    link.click();
  }
  onDownloadDocument(id:number):any{
    let data=this.allDocument.find(c=> c.id == id);
    var documentBlop=this.documntURItoBlob(data.data);
    var downloadURL=URL.createObjectURL(documentBlop);
    var link=document.createElement('a');
    link.href=downloadURL;
    let type=this.allDocument.find(c=> c.type ==type)
    link.download=data.empCode+'_'+data.type.replace(' ','');
    link.click();
  }
  onDownloadImgSignature(fileData:any){
    const imgBlob = this.dataURItoBlob(fileData);
    var downloadURL = URL.createObjectURL(imgBlob);
    var link = document.createElement('a');
    link.href = downloadURL;
    link.download = this.formVal.empCode +'_'+this.formVal.empName.replace(' ', '_')+'.jpg';
    link.click();
  }
  dataURItoBlob(dataURI) {
    const byteString = window.atob(dataURI);
    const arrayBuffer = new ArrayBuffer(byteString.length);
    const int8Array = new Uint8Array(arrayBuffer);
    for (let i = 0; i < byteString.length; i++) {
      int8Array[i] = byteString.charCodeAt(i);
    }
    const blob = new Blob([int8Array], { type: 'image/jpeg' });
    return blob;
  }
  documntURItoBlob(documentURI) {
    const byteString = window.atob(documentURI);
    const arrayBuffer = new ArrayBuffer(byteString.length);
    const int8Array = new Uint8Array(arrayBuffer);
    for (let i = 0; i < byteString.length; i++) {
      int8Array[i] = byteString.charCodeAt(i);
    }
    const blob = new Blob([int8Array], { type: 'txt/docx/doc/image/jepg/pdf/xlsx' });
    return blob;
  }
  createForm() {
    this.downloadCertificate = this.formBuilder.group({
      empName: [, []],
      empCode: [, []],
      department:[,[]],
      designation:[,[]]
    })
  }
  get f() {
    return this.downloadCertificate.controls;
  }
  get formVal() {
    return this.downloadCertificate.value;
  }
  reset() {
    this.createForm();
  }
}
