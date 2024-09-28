import { AuthService } from './../../../services/auth.service';
import { SalarySetupService } from './../../../services/SalarySetup/salary-setup.service';
import { DeductionService } from './../../../services/Deduction/deduction.service';
import { BasicEntryService } from './../../../services/system-setup/basic-entry.service';
import { SalaryPeriodModel } from './../../../models/SalarySetup/SalaryPeriod';
import { SalaryHead } from './../../../models/SalarySetup/salary-head';
import { ApiResponse } from './../../../models/response.model';
import { AllDeduction } from './../../../models/Deduction/all-deduction.model';
import { FormBuilder, FormGroup ,Validators} from '@angular/forms';
import { Pagination } from './../../../shared/paginate';
import { Component, OnInit } from '@angular/core';
import { BasicEntry } from '../../../models/system-setup/basic-entry.model';
import { DriverAllowace } from '../../../models/Addition/driver-addition-allowance.model';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-loan-deduct',
  templateUrl: './loan-deduct.component.html',
  styleUrls: ['./loan-deduct.component.scss','../../../../vendor/libs/ng-select/ng-select.scss']
})
export class LoanDeductComponent extends Pagination implements OnInit {

  constructor(
    private formBuilder:FormBuilder,
    private deductService:DeductionService,
    private salarySetupService:SalarySetupService,
    private basicEntryService:BasicEntryService,
    private toaster:ToastrService
  ) {
    super();
  }
    title="Employee Loan Deduct";
    loanDeductAllData:AllDeduction[]=[];
    loanHeadData:SalaryHead[]=[];
    loanDeductForm:FormGroup
    compID:number;
    salaryPeriodModel:SalaryPeriodModel[]=[];
    departments:BasicEntry[]=[];
    allloandept:AllDeduction[]=[];
    loandeductshow:AllDeduction[]=[];
    isSubmitted=false;
    grade:number;
    isLoading:boolean = false;

  ngOnInit() {
    this.items=[];
    this.grade=AuthService.getLoggedGradeValue();
    this.compID=AuthService.getLoggedCompanyId();
    this.update();
    this.createForm();
    this.getLoan();
    this.getAllSalPeriod();
    this.getDepartmentName();
  }
  getAllSalPeriod(){
    this.salarySetupService.getAllperiod().subscribe((response:ApiResponse)=>{
      if(response.status){
        this.salaryPeriodModel=response.result as SalaryPeriodModel[];
      }
    })
    }

getLoan(){
  this.deductService.getLoan(this.compID).subscribe((response:ApiResponse)=>{
    if(response.status){
      this.loanHeadData=response.result as SalaryHead[];
    }
  })
}
getDepartmentName() {
  this.basicEntryService.getDepartment().subscribe((response: ApiResponse) => {
    if (response.status) {
      this.departments = response.result as BasicEntry[];
    }

  })
}
onDepartmentSelect(deptName: string) {
  let loandeuctdept = this.allloandept.filter(c => c.department == deptName);
 this.loandeductshow=loandeuctdept;
 }
GetAll(){
  this.isSubmitted=true;
  if(this.f.periodID.invalid && this.f.salaryHeadID.invalid){
    this.toaster.error("Please fill all the required fields","Invalid Submission");
    return;
  }
  else{
    let loanDeductparameter =new AllDeduction();
    loanDeductparameter=this.loanDeductForm.value;
    const selectedPeriod = this.salaryPeriodModel.find(c=>c.id==this.f.periodID.value);
    loanDeductparameter.taxYearID=selectedPeriod.taxYearID;
    loanDeductparameter.yearID=selectedPeriod.yearID;
    loanDeductparameter.periodName=selectedPeriod.periodName;
    loanDeductparameter.userTypeID = AuthService.getLoggedUserTypeId();
    this.isLoading = true;
    this.deductService.getAllLoanDeduction(loanDeductparameter).subscribe((response:ApiResponse)=>{
      if(response.status){
        this.loandeductshow=response.result as AllDeduction[];
        this.allloandept=response.result as AllDeduction[];
      }
      else{
        this.loandeductshow=[];
        this.allloandept=[];
      }
      this.isLoading = false;
    },err=>{
      this.isLoading = false;
      this.toaster.error(err.message)
    })
  }

}
SaveUpdate(){
  this.isSubmitted=true;
  if(this.loandeductshow.length==0){
    this.toaster.warning("No Data Found");
  if(this.f.periodID.invalid && this.f.salaryHeadID.invalid){
    this.toaster.error("Please fill all the required fields","Invalid Submission");
    return;
  }
  return;
}
else{
    let loanDeduct=new AllDeduction();
  loanDeduct=this.loanDeductForm.value;
  loanDeduct.taxYearID=this.salaryPeriodModel.find(c=>c.id==this.f.periodID.value).taxYearID;
  loanDeduct.yearID=this.salaryPeriodModel.find(c=>c.id==this.f.periodID.value).yearID;
  loanDeduct.periodName=this.salaryPeriodModel.find(c=>c.id==this.f.periodID.value).periodName;
  loanDeduct.selectedDriver=this.loandeductshow;
  this.deductService.saveupdateLoanDeduction(loanDeduct).subscribe((response:ApiResponse)=>{
    if(response.status){
     this.toaster.success("Saved Successfully", "Success!");
          this.reset();
    }else {
          this.toaster.error(response.result, "Failed!");
        }
  })
}
}
removeDriver(empCode: string) {
  let index = this.loandeductshow.findIndex(c => c.empCode == empCode);
  this.loandeductshow.splice(index, 1);
}
reset(){
  this.isSubmitted=false;
  this.loanDeductForm.reset();
  this.createForm();
  this.loandeductshow=[];
  this.allloandept=[];
}

createForm(){
  this.loanDeductForm=this.formBuilder.group({
    id   :[0,[]],
    salaryHeadID  :[,[Validators.required]],
    periodID :[,[Validators.required]],
    grade:[this.grade,[]],
   companyID  :[this.compID,[]],
   department :[,[]]
  })
}

get f(){
  return this.loanDeductForm.controls;
}

}
