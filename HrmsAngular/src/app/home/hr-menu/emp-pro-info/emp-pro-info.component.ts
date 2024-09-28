import { AuthService } from './../../../services/auth.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { ApiResponse } from '../../../models/response.model';
import { SalaryGradeModel } from '../../../models/system-setup/salary-grader.model';
import { BasicEntry } from '../../../models/system-setup/basic-entry.model';
import { EmpTypeModel } from '../../../models/system-setup/EmpType.model';
import { BasicEntryService } from '../../../services/system-setup/basic-entry.service';
import { EmpTypeService } from '../../../services/system-setup/EmpType.service';
import { SalaryGradeService } from '../../../services/system-setup/slary-grade.service';
import { CompanyTransferService } from '../../../services/hr/company-transfer.service';
import { ToastrService } from 'ngx-toastr';
import { NgbDateCustomParserFormatter } from '../../../shared/dateformat';
import { EmployeeService } from '../../../services/hr/employee.service';
import { EmpCompanyTransfer } from '../../../models/hr/emp-company-transfer.model';
import { DatePipe } from '@angular/common';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { EmpPromotionViewModel } from '../../../models/hr/emp-promotion-view.model';
import { Employment } from '../../../models/hr/employment.model';
import { EmploymentService } from '../../../services/hr/employment.service';
import { EmpBlockInfoModel } from '../../../models/hr/emp-block-info.model';

@Component({
  selector: 'app-emp-pro-info',
  templateUrl: './emp-pro-info.component.html',
  styleUrls: ['./emp-pro-info.component.scss',
  '../../../../vendor/libs/angular-2-dropdown-multiselect/angular-2-dropdown-multiselect.scss',
  '../../../../vendor/libs/ng-select/ng-select.scss']
})
export class EmpProInfoComponent implements OnInit {
  isUpdating: boolean = false;
  compId: any;
  gradeValue: any;
  isSubmitted = false;
  companyTransfer: EmpCompanyTransfer = new EmpCompanyTransfer();
  empName: string = '';
  empPromotion:FormGroup;
  btnStatus = "Save";
  allSalaryGrade: SalaryGradeModel[] = [];
  alldata:EmpPromotionViewModel[];
  allDesignation: BasicEntry[] = [];
  allEmployeeType: EmpTypeModel[] = [];
  transferList:any[]=[];
  constructor(
    private basicES: BasicEntryService,
    private formBuilder:FormBuilder,
    private empTypeES: EmpTypeService,
    private employmentES:EmploymentService,
    private datePipe: DatePipe,
    private empService: EmployeeService,
    private dateFormat: NgbDateCustomParserFormatter,
    private toaster: ToastrService,
    private salaryGradeES: SalaryGradeService,
    private companyTransferES: CompanyTransferService,
    private dateFrmat:NgbDateCustomParserFormatter,
    private modalService:NgbModal
  ) { }

  ngOnInit() {
    this.compId = AuthService.getLoggedCompanyId();
    this.gradeValue = AuthService.getLoggedGradeValue();
    this.AllEmployeeType();
    this.AllSalaryGrade();
    this.createForm();
    this.getAllTransferType();
    // this.getProInfoView(empcod);
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
  getEmpInfo(empCode:string){
    if (empCode == "") {
      return;
    }
    else{
    this.employmentES.getEmployment(empCode,this.compId).subscribe((response:ApiResponse)=>{
      let empInfo=response.result as Employment;
      this.empPromotion.patchValue({
       empCode:empInfo.empCode,
       empName:empInfo.empName,
       id:0
     })
    })
  }
  }
      getEmploymentSalary(empCode:string){
        this.companyTransferES.getEmploymentSalaryDetails(empCode,this.f.companyID.value).subscribe((response:ApiResponse)=>{
          if(response.status){
           this.companyTransfer = response.result as EmpCompanyTransfer;
           this.companyTransferES.getCompanyTransfer(empCode,this.compId,2).subscribe((response:ApiResponse)=>{
             if(response.status){
               let data=response.result as EmpCompanyTransfer;
               this.companyTransfer.transferDateNgb= this.dateFormat.stringToNgbDate(this.datePipe.transform(data.transferDate));
               this.f.transferDateNgb.setValue(this.companyTransfer.transferDateNgb);
             }
           })

        this.empPromotion.patchValue(this.companyTransfer);
        this.empPromotion.patchValue({
          pasDesignationID:this.companyTransfer.preDesignationID,
          pasGrade:this.companyTransfer.preGrade,
          pasPayscaleGrade:this.companyTransfer.prePayscaleGrade,
          id:0
        })
         this.cancel();
         this.btnStatus="Update";
      }
      else{
        this.reset();
      }
      })
      }
  getCompanyTransfer(empCode:string){
    if (this.empPromotion.value.empCode== "") {
      return;
    }
    this.employmentES.getEmployment(empCode,this.compId).subscribe((response:ApiResponse)=>{
      if(response.status){
        this.getProInfoView(this.formVal.empCode);
      let empInfo=response.result as Employment;
      this.empPromotion.patchValue({
       empName:empInfo.empName,
    })
    }
      else{
        this.reset();
      }

    })
  }
  savePromotionInfo() {
    // this.isSubmitted=true;
    this.isUpdating = true;
    if(this.empPromotion.invalid){
      this.toaster.warning("Fill All Required Field");
      return;
    }
    this.empPromotion.controls.transferDate.setValue(this.dateFormat.ngbDateToDate(this.empPromotion.controls.transferDateNgb.value).toLocaleDateString());
    console.log("transer",this.empPromotion.value)
    this.companyTransferES.saveUpdate(this.empPromotion.value).subscribe((response: ApiResponse) => {
      if (response.status) {
        this.toaster.success(response.result, "Success");
        this.getProInfoView(this.formVal.empCode);
        this.reset();
      } else {
        this.toaster.error(response.result, 'Failed')
      }
      this.isUpdating = false;
    })
  }


  getByIdPromotion(id:number){
    this.companyTransferES.getByIdPromotion(id).subscribe((response:ApiResponse)=>{
      if(response.status){
        let promotion=response.result as EmpPromotionViewModel;
        promotion.transferDateNgb=this.dateFrmat.stringToNgbDate(promotion.transferDate.toString());
        this.empPromotion.patchValue(response.result);
      }
    }
    )

  }

  getProInfoView(empCode:string){
    this.companyTransferES.getEmpTransforView(empCode,this.compId,3).subscribe((response:ApiResponse)=>{
      if(response.status){
    this.alldata=response.result as EmpPromotionViewModel[];
    console.log("data",this.alldata)
      }
      else{
        this.alldata=[];
      }
    })
  }

  getProInfoViewByType(tPType:number){
    this.companyTransferES.getEmpTransforView(this.f.empCode.value,this.compId,tPType).subscribe((response:ApiResponse)=>{
      if(response.status){
    this.alldata=response.result as EmpPromotionViewModel[];
      }
      else{
        this.alldata=[];
      }
    })
  }

  getAllTransferType(){
    this.companyTransferES.GetTransferType(this.compId).subscribe((response:ApiResponse)=>{
      if(response.status){
    this.transferList=response.result as any[];
     }
      else{
      }
    })
  }
  onSelectType(type){
    this.empPromotion.patchValue({
      tpType:type.id
    })
  }
  createForm(){
  this.empPromotion=this.formBuilder.group({
      id: [0, []],
      empCode: [, [Validators.required]],
      empName:[,[]],
      preCompanyID: [, []],
      preDepartmentID: [, []],
      preProjectID: [, []],
      preDesignationID: [, [Validators.required]],
      preDivisionID: [, []],
      preBranchID: [, []],
      preUnit: [, []],
      preLocation: [, []],
      preGrade: [, [Validators.required]],
      prePayscaleGrade: [, []],
      pasCompanyID: [, []],
      pasDepartmentID: [, []],
      pasProjectID: [, []],
      pasDesignationID: [, [Validators.required]],
      pasDivisionID: [, []],
      pasBranchID: [, []],
      pasUnit: [, []],
      pasLocation: [, []],
      pasGrade: [, [Validators.required]],
      pasPayscaleGrade: [, []],
      transferDateNgb: [, [Validators.required]],
      transferDate: [, []],
      note: [, []],
      tpType: [, []],
      companyID: [this.compId, []],
      jobresponsibilities: [, []],
      transferType:[,[]]
  })
  }
  get f(){
    return this.empPromotion.controls;
  }
  get formVal(){
    return this.empPromotion.value;
  }
  reset() {
    let empCode=this.empPromotion.controls.empCode.value;
    let empName=this.empPromotion.controls.empName.value;
    this.createForm();
    this.empPromotion.controls.empCode.setValue(empCode);
    this.empPromotion.controls.empName.setValue(empName);
    this.isSubmitted=false;
    this.btnStatus="Save";
    this.alldata=[];
  }
  cancel() {
    this.modalService.dismissAll();
  }
}
