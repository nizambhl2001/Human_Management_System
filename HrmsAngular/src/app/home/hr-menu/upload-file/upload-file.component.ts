import { AuthService } from './../../../services/auth.service';
import { ToastrService } from 'ngx-toastr';
import { ApiResponse } from './../../../models/response.model';
import { NgbDateCustomParserFormatter } from './../../../shared/dateformat';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Employment } from '../../../models/hr/employment.model';
import { EmploymentService } from '../../../services/hr/employment.service';
import { UploadCertificateService } from '../../../services/hr/upload-certificate.service';
import { UploadDocumentModel } from '../../../models/hr/upload-document.model';
import { BasicEntry } from '../../../models/system-setup/basic-entry.model';

@Component({
  selector: 'app-upload-file',
  templateUrl: './upload-file.component.html',
  styleUrls: ['./upload-file.component.scss', '../../../../vendor/libs/angular2-ladda/angular2-ladda.scss']
})
export class UploadFileComponent implements OnInit {
  compId: number;
  empInfo: Employment;
  isSubmitted = false;
  uploadForm: FormGroup;
  allDocument: UploadDocumentModel[] = [];
  allEduLevel: BasicEntry[] = [];
  isUploading: boolean = false;
  constructor(
    private uploadDocument: UploadCertificateService,
    private employmentES: EmploymentService,
    private formBuilder: FormBuilder,
    private dateFormate: NgbDateCustomParserFormatter,
    private toasterService: ToastrService,
  ) { }

  ngOnInit() {
    this.compId = AuthService.getLoggedCompanyId();
    this.createForm();
  }
  getEmpInfo(empCode: string) {
    if (empCode == "") {
      return;
    }
    this.employmentES.getEmployment(empCode, this.compId).subscribe((response: ApiResponse) => {
      this.empInfo = response.result as Employment;
      this.f.name.setValue(this.empInfo.empName);
    })
  }
  onSelectEmployee(employee) {
    if (employee) {
      this.uploadForm.patchValue({
        empCode: employee.empCode,
        name: employee.empName,
        department: employee.department,
        designation: employee.designation
      })
      this.getEmpInfo(employee.empCode)
    } else {
      this.uploadForm.patchValue({
        empCode: employee.empCode,
        name: null,
        department: null,
        designation: null
      })
    }
  }
  onSelectDocumentType(type) {
    if (type) {
      this.uploadForm.patchValue({ documentType: type.id })
      // if (type.id == 4) {
      //   this.uploadForm.get('educationLevelID').setValidators(Validators.required);
      // } else {
      //   this.uploadForm.get('educationLevelID').clearValidators();
      // }
    }
  }
  onSelectFile(file) {
    if (file) {
      this.uploadForm.patchValue({
        type: '.' + file.type,
        data: file.data
      })
    }
  }
  Upload() {
    this.isSubmitted = true;
    // this.uploadForm.controls['data'].setValidators([Validators.required]);
    // this.uploadForm.updateValueAndValidity();
    if (this.uploadForm.invalid) {
      this.toasterService.error("Fill all required fields", 'Invalid Submission');
      return;
    }
    else {
      this.isUploading = true;
      // if (this.formVal.documentType == 4) {
      //   if (!this.formVal.educationLevelID) {
      //     this.toasterService.error("Education level is required", 'Invalid Submission');
      //     this.isUploading = false;
      //     return;
      //   }
      //   const paramObj = {
      //     ...this.formVal,
      //     cImage: this.formVal.data,
      //     fileExtension: this.formVal.type,
      //     userId: AuthService.getLoggedUserId()
      //   }
      //   this.uploadDocument.insert(paramObj).subscribe((response: ApiResponse) => {
      //     this.isSubmitted = false;
      //     this.isUploading = false;
      //     if (response.status) {
      //       this.toasterService.success(response.result);
      //     }
      //     else {
      //       this.toasterService.error(response.result);
      //     }
      //   }, err => {
      //     this.isSubmitted = false;
      //     this.isUploading = false;
      //     this.toasterService.error(err.message)
      //   })
      // }
      {
        this.uploadDocument.uploadDocuments(this.uploadForm.value).subscribe((response: ApiResponse) => {
          this.isSubmitted = false;
          this.isUploading = false;
          if (response.status) {
            this.toasterService.success(response.result, "Successfully");
          }
        }, err => {
          this.isSubmitted = false;
          this.isUploading = false;
          this.toasterService.error(err.message)
        })
      }
    }
  }
  createForm() {
    this.uploadForm = this.formBuilder.group({
      empCode: [, [Validators.required]],
      department: [, []],
      designation: [, []],
      id: [0, []],
      name: [, []],
      type: [, [Validators.required]],
      documentType: [, [Validators.required]],
      data: [, [Validators.required]],
      date: [new Date().toLocaleDateString(), []],
      companyID: [this.compId, []],
      pOptions: [1, []],
      educationLevelID: [0,]
    })
  }

  get f() {
    return this.uploadForm.controls;
  }
  get formVal() {
    return this.uploadForm.value;
  }
  reset() {
    this.createForm();
    this.isSubmitted = false;
    this.f.data
  }

}
