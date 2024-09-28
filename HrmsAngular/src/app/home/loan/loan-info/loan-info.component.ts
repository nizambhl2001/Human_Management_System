import { AuthService } from './../../../services/auth.service';
import { SalarySetupService } from './../../../services/SalarySetup/salary-setup.service';
import { DeductionService } from './../../../services/Deduction/deduction.service';
import { SalaryPeriodModel } from './../../../models/SalarySetup/SalaryPeriod';
import { EmployeeLoanService } from './../../../services/EmployeeLoanService/employee-loan-.service';
import { SalaryHead } from './../../../models/SalarySetup/salary-head';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit, Input } from '@angular/core';
import { Pagination } from '../../../shared/paginate';
import { EmploymentService } from '../../../services/hr/employment.service';
import { Employment } from '../../../models/hr/employment.model';
import { ApiResponse } from '../../../models/response.model';
import { EmployeeLoanInfo } from '../../../models/EmloyeeLoanInfo/employee-loan-info.model';
import { NgbDateCustomParserFormatter } from '../../../shared/dateformat';
import { ToastrService } from 'ngx-toastr';
import { CompanyService } from '../../../services/system-setup/company.service';
import { DecimalPipe } from '@angular/common';
import { SearchEmployee } from '../../../models/hr/search-emp.model';
import { HttpErrorResponse } from '@angular/common/http';
import { ReportService } from '../../../services/report.service';
import { ReportHelper } from '../../../shared/report-helper';

@Component({
  selector: 'app-loan-info',
  templateUrl: './loan-info.component.html',
  styleUrls: ['./loan-info.component.scss','../../../../vendor/libs/ng-select/ng-select.scss',
  '../../../../vendor/libs/angular2-ladda/ladda.scss',
              '../../../../vendor/libs/ng-select/ng-select.scss'
]
})
export class LoanInfoComponent extends Pagination implements OnInit {

  constructor(
    private employmentService:EmploymentService,
    private formBuilder:FormBuilder,
    private loanDeductService:DeductionService,
    private rptService:ReportService,
    private employeeLoanService:EmployeeLoanService,
    private dateFrmat:NgbDateCustomParserFormatter,
    private salarySetupService:SalarySetupService,
    private toaster:ToastrService,
    private companyservice:CompanyService,
    private reportHelper:ReportHelper,
    private decimalPipe:DecimalPipe
  ) {
    super();
  }
  title="Employee Loan Information";
  empLoanInfoForm:FormGroup;
  compId:number;
  loanHeadData:SalaryHead[]=[];
  emploanInfo:EmployeeLoanInfo[]=[];
  salaryPeriod:SalaryPeriodModel[]=[];
  btnStatus='Save';
  isSaveBtnClick=false;
  exportingPdf:boolean = false;
  companyItem:Employment[]=[];
   netLoan:number;
  interest:number;
  interestrate:number;
   installmentamount:number;
   loanAmount:number;
  downPayment:number;
  noofInstallment:number;
  ID:number;
  isSubmitted:boolean=false;


  ngOnInit() {
    this.items = [];
    this.update();
    this.compId=AuthService.getLoggedCompanyId();
    this.createForm();
    this.getLoan();
    this.getSalaryPeriod();
    this.getCompany();

 }
getCompany(){
  this.companyservice.getCompany().subscribe((response:ApiResponse)=>{
    if(response.status){this.companyItem=response.result as Employment[];}

  })
}
  getSalaryPeriod() {
    this.salarySetupService.getAllperiod().subscribe((response: ApiResponse) => {
      if (response.status) {
        this.salaryPeriod = response.result as SalaryPeriodModel[];
      }

    })
  }
  getLoan(){
    this.loanDeductService.getLoan(this.compId).subscribe((response:ApiResponse)=>{
      if(response.status){
        this.loanHeadData=response.result as SalaryHead[];
      }
    })
  }
  onSelectEmp(employee: SearchEmployee) {

    this.empLoanInfoForm.patchValue({
      empCode: employee.empCode,
      designation: employee.designation,
      empName: employee.empName,
      joinDate: employee.joinDate,
      companyAddress:this.companyItem[0].companyAddress
    })
    this.getEmpLoanInfo(this.f.empCode.value);
  }
getEmployeeLoanInfobyId(id:number){
    this.employeeLoanService.getEmployeeLoanInfoById(id).subscribe((response: ApiResponse) => {
      if (response.status) {
        let loaninfo = response.result as EmployeeLoanInfo;
        loaninfo.loanDateNgb = this.dateFrmat.stringToNgbDate(loaninfo.loanDate.toString());
        this.empLoanInfoForm.patchValue(response.result);
        this.onSelectEmp(this.empLoanInfoForm.value);
        this.btnStatus='Update'
      }
    })
}



getEmpLoanInfo(empCode:string){
  if(empCode==""){
    return;
  }
  this.employeeLoanService.getEmployeeLoanInfo(empCode).subscribe((response:ApiResponse)=>{
    if(response.status){
      this.emploanInfo=response.result as EmployeeLoanInfo[];
    }
    else{
      this.emploanInfo=[];
    }
    })
}

onSelect(){
  this.netLoan=this.f.netLoan.value;
  this.installmentamount=this.f.installmentamount.value;
  this.interest=this.f.interest.value;
  this.loanAmount=this.f.loanAmount.value;
  this.downPayment=this.f.downPayment.value;
  this.noofInstallment=this.f.noofInstallment.value;
 this.netLoan=this.loanAmount-this.downPayment;
 if(this.interest>0){
   if(this.interest>0){
     this.interestrate=this.interest/100;
   }
   let interestByMonth:number=this.interestrate/12;
   let rate1:number=interestByMonth+1;
   let mathpow:number=Math.pow(rate1,this.noofInstallment);
   let mathpowminusby1:number=mathpow-1;
   this.installmentamount=(this.netLoan*mathpow*interestByMonth/mathpowminusby1);
   this.netLoan=Math.round(this.loanAmount+(this.installmentamount*this.noofInstallment-this.loanAmount));
 }
 else{
  this.installmentamount=this.netLoan/this.noofInstallment;
 this.netLoan=this.loanAmount+(this.installmentamount*this.noofInstallment-this.loanAmount);
 }

}
save(){
  this.isSaveBtnClick=true;
  if(this.empLoanInfoForm.invalid){
    this.toaster.error("Please fill the all required fields","Invalid submission");
    return;
  }
    let empLoanInfodata=new EmployeeLoanInfo();
    empLoanInfodata = this.empLoanInfoForm.value;
    empLoanInfodata.netLoan=this.netLoan;
    empLoanInfodata.installmentamount=Math.round(this.installmentamount);
      this.employeeLoanService.save(empLoanInfodata).subscribe((response:ApiResponse)=>{
      if(response.status){
       this.toaster.success(response.result,"Success!")
       this.reset();
       this.emploanInfo=[];
       this.getEmpLoanInfo(this.f.empCode.value);
      }else{
        this.toaster.error(response.result ,"Failed!");
      }})
    }


  Update(){
    let empLoanInfodata=new EmployeeLoanInfo();
    empLoanInfodata = this.empLoanInfoForm.value;
    empLoanInfodata.netLoan=this.netLoan;
    empLoanInfodata.installmentamount=this.empLoanInfoForm.controls.installmentamount.value;
    this.employeeLoanService.update(empLoanInfodata).subscribe((response:ApiResponse)=>{
       if(response.status){
        this.toaster.success(response.result,"Updated!")
        this.reset();
        this.emploanInfo=[];
        this.getEmpLoanInfo(this.f.empCode.value);
       }else{
         this.toaster.error(response.result ,"Failed!");
       }})
  }
  onSubmit(){

    if(this.btnStatus=="Save")
    this.save();
    else
    this.Update();
  }
  reset() {
    this.isSaveBtnClick=false;
    this.empLoanInfoForm.controls['loanDateNgb'].reset();
   //this.empLoanInfoForm.controls['salaryHeadID'].reset();
   this.empLoanInfoForm.controls['installmentStart'].reset();
   this.empLoanInfoForm.controls['loanAmount'].reset();
   this.empLoanInfoForm.controls['downPayment'].reset();
   this.empLoanInfoForm.controls['netLoan'].reset();
   this.empLoanInfoForm.controls['noofInstallment'].reset();
   this.empLoanInfoForm.controls['installmentType'].reset();
   this.empLoanInfoForm.controls['interest'].reset();
   this.empLoanInfoForm.controls['installmentamount'].reset();
   this.empLoanInfoForm.controls['remarks'].reset();
    this.btnStatus='Save'; 
    this.getLoan();
    this.getSalaryPeriod();
    this.getCompany();

  }




  extoPdf(exportType:string, id:number){
    let filterObj={
      ReportId: 204,
      ExportType: exportType,
      CompanyID: this.compId,
      ID: id
    }
    this.exportingPdf=false;
    this.rptService.getLoanReport(filterObj).subscribe(
       exportedFile => {
          this.exportingPdf = false;
          this.reportHelper.openFileWindow(exportedFile as Blob, 'loanReport');
    },
    (err: HttpErrorResponse) => {
      this.exportingPdf = false;
      this.toaster.error(err.message, 'Failed!');
    })
  }





createForm(){
  this.empLoanInfoForm=this.formBuilder.group({

    id:[0,[]],
    empCode:[,[Validators.required]],
    loanDate:[,[]],
    loanDateNgb:[,[Validators.required]],
   salaryHeadID:[,[Validators.required]],
   installmentStart:[,[Validators.required]],
   loanAmount:[,[Validators.required]],
   downPayment:[0,[]],
   netLoan:[,[]],
   noofInstallment:[,[Validators.required]],
   installmentType:[0,[]],
   interest:[,[Validators.required]],
   installmentamount:[,[]],
    remarks:[,[]],
   companyID:[this.compId,[]],
    dDMMYY:[null,[]],
    empName:[,[]],
    designation:[,[]],
    department:[,[]],
    joinDate:[,[]],
    companyAddress:[,[]]
  })
}
get f(){
  return this.empLoanInfoForm.controls;
}
}
