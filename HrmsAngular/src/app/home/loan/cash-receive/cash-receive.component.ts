import { AuthService } from './../../../services/auth.service';
import { DeductionService } from './../../../services/Deduction/deduction.service';

import { SalaryHead } from './../../../models/SalarySetup/salary-head';
import { CashReceived } from './../../../models/EmloyeeLoanInfo/cash-received.model';
import { CashReceivedService } from './../../../services/EmployeeLoanService/cash-received.service';
import { FormBuilder, FormGroup,Validators } from '@angular/forms';
import { EmploymentService } from './../../../services/hr/employment.service';
import { Component, OnInit } from '@angular/core';
import { Pagination } from '../../../shared/paginate';
import { ApiResponse } from '../../../models/response.model';
import { Employment } from '../../../models/hr/employment.model';

import { NgbDateCustomParserFormatter } from '../../../shared/dateformat';
import { ToastrService } from 'ngx-toastr';
import { SearchEmployee } from '../../../models/hr/search-emp.model';

@Component({
  selector: 'app-cash-receive',
  templateUrl: './cash-receive.component.html',
  styleUrls: ['./cash-receive.component.scss','../../../../vendor/libs/ng-select/ng-select.scss']
})
export class CashReceiveComponent extends Pagination implements OnInit {

  constructor(
    private employmentService:EmploymentService,
    private formBuilder:FormBuilder,
    private cashReceivedService:CashReceivedService,
    private loanDeductService:DeductionService,
    private dateFrmat:NgbDateCustomParserFormatter,
    private toaster:ToastrService
  ) {
    super();
  }
  title="Employee Loan Cash Payment Information";
  compId:number;
  cashReceivedForm:FormGroup;
  cashReceivedInfo:CashReceived[]=[];
  loanHeadData:SalaryHead[]=[];
  btnStatus='Save';
  isSaveBtnClick=false;
  interest:number;
  netPayment:number;
  principleAmount:number;

  ngOnInit() {
    this.items=[];
    this.update();
    this.compId=AuthService.getLoggedCompanyId();
    this.createForm();
    this.getLoan();
  }
  getLoan(){
    this.loanDeductService.getLoan(this.compId).subscribe((response:ApiResponse)=>{
      if(response.status){
        this.loanHeadData=response.result as SalaryHead[];
      }
    })
  }
  onSelectEmp(employee: SearchEmployee) {
    this.cashReceivedForm.patchValue({
      empCode: employee.empCode,
      designation: employee.designation,
      empName: employee.empName,
      joinDate: employee.joinDate,
      companyAddress:employee.jobLocation
    })
    this.getCashReceivedInfo(this.f.empCode.value);
  }

getCashReceivedInfo(empCode:string){
    if(empCode==""){
      return;
    }
    this.cashReceivedService.getCashReceivedInfo(empCode).subscribe((response:ApiResponse)=>{
      if(response.status){
        this.cashReceivedInfo=response.result as CashReceived[];
      }else{
        this.cashReceivedInfo=[];
      }
      })
  }
getCashReceivedInfobyId(id:number){
    this.cashReceivedService.getById(id).subscribe((response: ApiResponse) => {
      if (response.status) {
        let cashreceriveinfo = response.result as CashReceived;
        cashreceriveinfo.paymentDateNgb = this.dateFrmat.stringToNgbDate(cashreceriveinfo.paymentDate);
        this.cashReceivedForm.patchValue(response.result);
        this.onSelectEmp(this.cashReceivedForm.value);
        this.btnStatus='Update'
      }
    })
}
onCalcution(){
  this.interest=this.f.interest.value;
  this.netPayment=this.f.netPayment.value;
  this.principleAmount=this.f.principleAmount.value;
    if(this.interest>0){
      this.netPayment=this.principleAmount;

     console.log(this.netPayment)

    }
    this.netPayment=this.interest=this.f.interest.value+this.principleAmount;
  console.log(this.principleAmount);
}
onSubmit(){
  this.isSaveBtnClick=true;
  if(this.cashReceivedForm.invalid){
    this.toaster.error("Please fill the all required fields","Invalid submission");
    return;
  }
  let cashReceivedInfodata=new CashReceived();
  cashReceivedInfodata = this.cashReceivedForm.value;
  cashReceivedInfodata.netPayment=this.netPayment;

  //cashReceivedInfodata.paymentDate = this.dateFrmat.ngbDateToDate(this.f.paymentDateNgb.value);
  this.cashReceivedService.saveUpdate(cashReceivedInfodata).subscribe((response:ApiResponse)=>{
    if(response.status){
      this.toaster.success(response.result,"Success!")
      this.reset();
      this.getCashReceivedInfo(this.f.empCode.value);
      this.cashReceivedInfo=[];

     }else{
       this.toaster.error(response.result ,"Failed!");
     }})
    }


    reset() {
      this.isSaveBtnClick=false;
     this.cashReceivedForm.controls['paymentDateNgb'].reset();
     this.cashReceivedForm.controls['salaryHeadID'].reset();
     this.cashReceivedForm.controls['principleAmount'].reset();
     this.cashReceivedForm.controls['interest'].reset();
     this.cashReceivedForm.controls['netPayment'].reset();
     this.cashReceivedForm.controls['remarks'].reset();
      this.btnStatus='Save';
    }

createForm(){
  this.cashReceivedForm=this.formBuilder.group({
    id   :[0,[]],
    empCode  :[,[Validators.required]],
    paymentDate  :[,[]],
    paymentDateNgb:[,[Validators.required]],
    salaryHeadID  :[,[Validators.required]],
    principleAmount  :[,[Validators.required]],
    interest  :[,[Validators.required]],
    netPayment  :[,[]],
    remarks :[null,[]],
    userID  :[1,[]],
    companyID  :[this.compId,[]],
    empName:[,[]],
    designation:[,[]],
    joinDate:[,[]]
  })

}

get f(){
  return this.cashReceivedForm.controls;
}

}
