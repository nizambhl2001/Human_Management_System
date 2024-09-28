import { AuthService } from './../../../services/auth.service';
import { ToastrService } from 'ngx-toastr';
import { ApiResponse } from './../../../models/response.model';
import { BasicEntry } from './../../../models/system-setup/basic-entry.model';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { SearchEmployee } from '../../../models/hr/search-emp.model';
import { UploadCertificateModel } from '../../../models/hr/upload-certificate.model';
import { UploadCertificateService } from '../../../services/hr/upload-certificate.service';
import { ImageControlComponent } from '../../../utility/image-control/image-control.component';
import { UploadDocumentModel } from '../../../models/hr/upload-document.model';

@Component({
  selector: 'app-emp-certificate-upload',
  templateUrl: './emp-certificate-upload.component.html',
  styleUrls: ['./emp-certificate-upload.component.scss']
})
export class EmpCertificateUploadComponent implements OnInit {
  userId:number;
  btnStatus:string="Save"
  isSubmitted=false;
  companyId:number;
  dataByEmpCode:UploadCertificateModel[]=[];
  allEduLevel:BasicEntry[]=[];
  alldocument:UploadDocumentModel[]=[];
  uploadCertificateForm:FormGroup
  constructor(
    private formBuilder:FormBuilder,
    private toasterService:ToastrService,
    private uploadService:UploadCertificateService,
  ) { }

  ngOnInit() {
    this.userId=AuthService.getLoggedUserId();
    this.companyId=AuthService.getLoggedCompanyId();
    this.createForm();
  }
  onSelectEmp(employee:SearchEmployee){
    this.uploadCertificateForm.patchValue({
      empName: employee.empName,
      department:employee.department,
      designation:employee.designation
    })
  }
  save(){
    this.isSubmitted=true;
    if(this.uploadCertificateForm.invalid){
      this.toasterService.warning("Fill Required Field");
    }
    else{
    this.uploadService.insert(this.uploadCertificateForm.value).subscribe((response:ApiResponse)=>{
    if(response.status){
     this.toasterService.success(response.result);
     this.reset();
     this.getByEmpCode();
    }
    else{
      this.toasterService.error(response.result);
    }
    })
  }
}
  getByEmpCode(){
    this.uploadService.getByEmpCode(this.f.empCode.value,this.companyId).subscribe((response:ApiResponse)=>{
      if(response.status){
        this.dataByEmpCode=response.result as UploadCertificateModel[];
      }
    })
  }
  getById(id:number){
    this.uploadService.getById(id).subscribe((response:ApiResponse)=>{
      if(response.status){
        this.btnStatus="Update";
        let certificate=response.result as UploadCertificateModel;
        this.uploadCertificateForm.patchValue(certificate);
      }
    })
  }
  createForm(){
    this.uploadCertificateForm=this.formBuilder.group({
      id:[,[]],
      empCode:[,[Validators.required]],
      empName:[,[]],
      department:[,[]],
      designation:[,[]],
      description:[,[]],
      educationLevelID:[,[Validators.required]],
      cImage:[,[Validators.required]],
      userID:[this.userId,[]],
      companyID:[this.companyId,[]]
    })
  }
  get f(){
   return this.uploadCertificateForm.controls;
  }
  get formVal(){
    return this.uploadCertificateForm.value;
   }
  reset(){
    this.createForm();
    this.isSubmitted=false;
    this.btnStatus="Save";
  }
}
