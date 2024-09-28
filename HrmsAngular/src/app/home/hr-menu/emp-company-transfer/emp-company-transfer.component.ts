import { AuthService } from './../../../services/auth.service';
import { ToastrService } from 'ngx-toastr';
import { DatePipe } from '@angular/common';
import { SalaryGradeService } from './../../../services/system-setup/slary-grade.service';
import { SalaryGradeModel } from './../../../models/system-setup/salary-grader.model';
import { ApiResponse } from './../../../models/response.model';
import { BasicEntry } from './../../../models/system-setup/basic-entry.model';
import { Component, OnInit } from '@angular/core';
import { BasicEntryService } from '../../../services/system-setup/basic-entry.service';
import { CompanyService } from '../../../services/system-setup/company.service';
import { EmpCompanyTransfer } from '../../../models/hr/emp-company-transfer.model';
import { EmpTypeService } from '../../../services/system-setup/EmpType.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { EmpTypeModel } from '../../../models/system-setup/EmpType.model';
import { TransferTypeService } from '../../../services/transferType.service';
import { CompanyTransferService } from '../../../services/hr/company-transfer.service';
import { NgbDateStruct, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgbDateCustomParserFormatter } from '../../../shared/dateformat';
import { Pagination } from '../../../shared/paginate';
import { SearchEmployee } from '../../../models/hr/search-emp.model';import { Employment } from '../../../models/hr/employment.model';
import { EmploymentService } from '../../../services/hr/employment.service';
import { EmpPromotionViewModel } from '../../../models/hr/emp-promotion-view.model';
import { CompanyModel } from '../../../models/security/company.model';
import { ListKeyManager } from '@angular/cdk/a11y';
;

@Component({
  selector: 'app-emp-company-transfer',
  templateUrl: './emp-company-transfer.component.html',
  styleUrls: [
    './emp-company-transfer.component.scss',
    '../../../../vendor/libs/angular-2-dropdown-multiselect/angular-2-dropdown-multiselect.scss',
    '../../../../vendor/libs/ng-select/ng-select.scss']
})
export class EmpCompanyTransferComponent extends Pagination implements OnInit {
  compId: number;
  gradeValue: any;
  empName: string = '';
  btnStatus = "Save";
  transferForm: FormGroup;
  isSubmitted = false;
  companyTransfer: EmpCompanyTransfer = new EmpCompanyTransfer();
  allCompany: CompanyModel[] = [];
  allSalaryLocation: BasicEntry[] = [];
  allProjectName: BasicEntry[] = [];
  allDepartment: BasicEntry[] = [];
  allUnit: BasicEntry[] = [];
  allWorkStation: BasicEntry[] = [];
  allDesignation: BasicEntry[] = [];
  allEmployeeType: EmpTypeModel[] = [];
  allSalaryGrade: SalaryGradeModel[] = [];
  allTransferType: BasicEntry[] = [];
  alldata:EmpPromotionViewModel[];
  dateformat: any;
  empSearchKeys: SearchEmployee = new SearchEmployee();

  constructor(
    private basicES: BasicEntryService,
    private companyES: CompanyService,
    private empTypeES: EmpTypeService,
    private salaryGradeES: SalaryGradeService,
    private employmentES:EmploymentService,
    private transferES: TransferTypeService,
    private companyTransferES: CompanyTransferService,
    private frmBuilder: FormBuilder,
    private dateFormat: NgbDateCustomParserFormatter,
    private datePipe: DatePipe,
    private toaster: ToastrService,
    private modalService:NgbModal
  ) { super() }


  ngOnInit() {
    this.compId = AuthService.getLoggedCompanyId();
    this.gradeValue = AuthService.getLoggedGradeValue();
    this.AllCompany();
    this.AllProjectName();
    this.AllDepartment();
    this.AllDesignation();
    this.AllEmployeeType();
    this.createForm();
    this.AllSalaryGrade();
    this.AllTransferType();
  }
  AllCompany() {
    this.companyES.getCompany().subscribe((response: ApiResponse) => {
      if (response.status) {
        this.allCompany = response.result as CompanyModel[];
      }
    })
  }
  AllProjectName() {
    this.basicES.getProject().subscribe((response: ApiResponse) => {
      if (response.status) {
        this.allProjectName = response.result as BasicEntry[];
      }
    })
  }
  AllDepartment() {
    this.basicES.getDepartment().subscribe((response: ApiResponse) => {
      if (response.status) {
        this.allDepartment = response.result as BasicEntry[];
      }
    })
  }
  AllDesignation() {
    this.basicES.getDesignation().subscribe((response: ApiResponse) => {
      if (response.status) {
        this.allDesignation = response.result as BasicEntry[];
      }
    })
  }
  AllEmployeeType() {
    this.empTypeES.GetEmpType().subscribe((response: ApiResponse) => {
      if (response.status) {
        this.allEmployeeType = response.result as EmpTypeModel[];
      }
    })
  }
  AllSalaryGrade() {
    this.salaryGradeES.GetSalaryGrade().subscribe((response: ApiResponse) => {
      if (response.status) {
        this.allSalaryGrade = response.result as SalaryGradeModel[];
      }
    })
  }
  AllTransferType() {
    this.transferES.GetTransferType().subscribe((response: ApiResponse) => {
      if (response.status) {
        this.allTransferType = response.result as BasicEntry[];
      }
    })
  }
  getEmpInfo(empCode:string){
    if (empCode == "" || empCode==null) {
      return;
    }
    this.employmentES.getEmployment(empCode,this.compId).subscribe((response:ApiResponse)=>{
      let empInfo=response.result as Employment;
      this.transferForm.patchValue({
       empCode:empInfo.empCode,
       empName:empInfo.empName
     })
    })
  }
  getProInfoView(empCode:string){
    if (empCode == "" || empCode==null) {
      return;
    }
    this.companyTransferES.getEmpTransforView(empCode,1,1).subscribe((response:ApiResponse)=>{
      if(response.status){
      this.alldata=response.result as EmpPromotionViewModel[];
      }
      else{
        this.alldata=[];
      }
    })
  }
  getEmploymentSalary(empCode){
    if (empCode == "" || empCode==null) {
      return;
    }
    this.getProInfoView(empCode);
    this.companyTransferES.getEmploymentSalaryDetails(empCode,this.f.companyID.value).subscribe((response:ApiResponse)=>{
   if(response.status){
    this.companyTransfer = response.result as EmpCompanyTransfer;
    this.companyTransferES.getCompanyTransfer(empCode,this.compId,1).subscribe((response:ApiResponse)=>{
      if(response.status){
        let result=response.result as EmpCompanyTransfer;
        this.companyTransfer.transferDateNgb= this.dateFormat.stringToNgbDate(this.datePipe.transform(result.transferDate));
               this.f.transferDateNgb.setValue(this.companyTransfer.transferDateNgb);
      }
      else{
        this.f.transferDateNgb.setValue(null);
      }
    })
        this.transferForm.patchValue(this.companyTransfer);
        this.transferForm.patchValue({
          preCompanyID:this.companyTransfer.companyID,
          pasCompanyID:this.companyTransfer.companyID,
          pasDepartmentID:this.companyTransfer.preDepartmentID,
          pasProjectID:this.companyTransfer.preProjectID,
          pasDesignationID:this.companyTransfer.preDesignationID,
          pasBranchID:this.companyTransfer.preBranchID,
          pasUnit:this.companyTransfer.preUnit,
          pasLocation:this.companyTransfer.preLocation,
          pasGrade:this.companyTransfer.preGrade,
          pasPayscaleGrade:this.companyTransfer.prePayscaleGrade
        });
         this.cancel();
         this.btnStatus="Update";
   }
   else{
     this.reset();
   }
    })

  }
  getCompanyTransfer(){
    if (this.transferForm.value.empCode== "") {
      this.reset();
      return;
    }
    this.employmentES.getEmployment(this.transferForm.value.empCode,this.compId).subscribe((response:ApiResponse)=>{
      if(response.status){
      let empInfo=response.result as Employment;
      this.transferForm.patchValue({
       empName:empInfo.empName,
    })
    }
      else{
        this.reset();
      }

    })
  }
  saveTransferInfo() {
    this.isSubmitted=true;
    if(this.transferForm.invalid){
      this.toaster.warning("Please Fill All Required Field");
      return;
    }
    this.transferForm.controls.transferDate.setValue(this.dateFormat.ngbDateToDate(this.transferForm.controls.transferDateNgb.value).toLocaleDateString());
    this.companyTransferES.saveUpdate(this.transferForm.value).subscribe((response: ApiResponse) => {
      if (response.status) {
        this.toaster.success(response.result, "Success");
        this.reset();
        this.getProInfoView(this.formVal.empCode);
        this.isSubmitted=false;
      } else {
        this.toaster.error(response.result, 'Failed')
      }
    })
  }
  createForm() {
    this.transferForm = this.frmBuilder.group({
      id: [, []],
      empCode: [, [Validators.required]],
      empName:[,[]],
      preCompanyID: [, [Validators.required]],
      preDepartmentID: [, [Validators.required]],
      preProjectID: [, [Validators.required]],
      preDesignationID: [, [Validators.required]],
      preDivisionID: [, []],
      preBranchID: [, [Validators.required]],
      preUnit: [, [Validators.required]],
      preLocation: [, [Validators.required]],
      preGrade: [, [Validators.required]],
      prePayscaleGrade: [, [Validators.required]],
      pasCompanyID: [, [Validators.required]],
      pasDepartmentID: [, [Validators.required]],
      pasProjectID: [, [Validators.required]],
      pasDesignationID: [, [Validators.required]],
      pasDivisionID: [, []],
      pasBranchID: [, [Validators.required]],
      pasUnit: [, [Validators.required]],
      pasLocation: [, [Validators.required]],
      pasGrade: [, [Validators.required]],
      pasPayscaleGrade: [, [Validators.required]],
      transferDateNgb: [, []],
      transferDate: [, []],
      note: [, []],
      tpType: [, [Validators.required]],
      companyID: [this.compId, []],
      jobresponsibilities: [, []],
    })
  }
  get f() {
    return this.transferForm.controls;
  }
  get formVal() {
    return this.transferForm.value;
  }
  cancel() {
    this.modalService.dismissAll();
  }
  reset() {
    let empCode=this.transferForm.controls.empCode.value;
    let empName=this.transferForm.controls.empName.value;
    this.createForm();
    this.transferForm.controls.empCode.setValue(empCode);
    this.transferForm.controls.empName.setValue(empName);
    this.isSubmitted=false;
    this.btnStatus="Save";
    this.alldata=[];
  }

}
