import { AuthService } from './../../../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { TaxYearInfoService } from '../../../services/incomeTax/tax-year-info.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TaxAdvance } from '../../../models/incomeTax/tax-advance.model';
import { TaxYearInfo } from '../../../models/incomeTax/tax-year-info.model';
import { ApiResponse } from '../../../models/response.model';
import { EmploymentService } from '../../../services/hr/employment.service';
import { Employment } from '../../../models/hr/employment.model';
import { ToastrService } from 'ngx-toastr';
import { validateConfig } from '@angular/router/src/config';

@Component({
  selector: 'app-tax-paid-payroll',
  templateUrl: './tax-paid-payroll.component.html',
  styleUrls: ['./tax-paid-payroll.component.scss','../../../../vendor/libs/ng-select/ng-select.scss']
})
export class TaxPaidPayrollComponent implements OnInit {

  constructor(
    private taxService:TaxYearInfoService,
    private formBuilder:FormBuilder,
    private employmentService:EmploymentService,
    private toster:ToastrService
  ) { }

  taxAdvancec:TaxAdvance[]=[];
  taxYearList:TaxYearInfo[]=[];
  taxAdvanceForm:FormGroup;
  comId:number;
  userId:number;
  isSubmitted = false;

  ngOnInit() {
    this.comId=AuthService.getLoggedCompanyId();
    this.userId=AuthService.getLoggedUserId();
    this.createTaxAdvanceForm();
    this.getAllYearList();
  }

  getAllYearList(){
    this.taxService.getAllYearList().subscribe((response:ApiResponse)=>{
      if(response.status){
        this.taxYearList=response.result as TaxYearInfo[];
      }
    })
  }


  saveTaxAdvancePayRoll(){

  this.isSubmitted=true;
  if(this.taxAdvanceForm.invalid){
    //this.toster.warning("Fill Required Fields");
  }else{
    this.taxService.saveAdvancePaidPayRoll(this.taxAdvanceForm.value).subscribe((response:ApiResponse)=>{
      if(response.status){
        this.toster.success(response.result,"Save");
        this.reset();
      }else{
        this.toster.error(response.result,"Failed!!");
      }
     });

  }
  }


  // getEmpInfoById(empCode: string) {
  //   if (empCode == "") {
  //     return;
  //   }
  //     this.employmentService.getEmployment(empCode, this.comId).subscribe((response: ApiResponse) => {


  //       if (response.status) {
  //         let empInfo = response.result as Employment;
  //         this.f.empName.setValue(empInfo.empName);
  //         this.f.department.setValue(empInfo.department);
  //         this.f.designation.setValue(empInfo.designation);
  //       }

  //     })
  // }

  getEmpInfoById(empCode: any) {
    if (empCode == "") {
      return;
    }else{
          this.f.empCode.patchValue(empCode.empCode)
          this.f.empName.patchValue(empCode.empName);
          this.f.department.patchValue(empCode.department);
          this.f.designation.patchValue(empCode.designation);
    }
  }



createTaxAdvanceForm(){
  this.taxAdvanceForm=this.formBuilder.group({
    id :[0,[]],
    empCode :[,[Validators.required]],
    taxYear :[,[Validators.required]],
    amount  :[,[Validators.required]],
    note :[,[Validators.required]],
    userID :[this.userId,[]],
    companyID :[this.comId,[]],
    empName:[,[]],
    designation:[,[]],
    department:[,[]]
  })
};

reset(){
  this.isSubmitted=false;
  this.taxAdvanceForm.reset();
  this.createTaxAdvanceForm();
}


get f(){
  return this.taxAdvanceForm.controls;
}

}
