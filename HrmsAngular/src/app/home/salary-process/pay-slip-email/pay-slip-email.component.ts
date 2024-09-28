import { AuthService } from './../../../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { SalarySetupService } from '../../../services/SalarySetup/salary-setup.service';
import { ApiResponse } from '../../../models/response.model';
import { SalaryPeriodModel } from '../../../models/SalarySetup/SalaryPeriod';
import { SalaryProcessService } from '../../../services/salary-process/salary-process-service.service';
import { PaySlipToEmail } from '../../../models/salary-process/pay-slip-to-email.model';
import { ReportService } from '../../../services/report.service';
import { ReportHelper } from '../../../shared/report-helper';
import { HttpErrorResponse } from '@angular/common/http';
import { Employment } from '../../../models/hr/employment.model';
import { EmploymentService } from '../../../services/hr/employment.service';

@Component({
  selector: 'app-pay-slip-email',
  templateUrl: './pay-slip-email.component.html',
  styleUrls: ['./pay-slip-email.component.scss','../../../../vendor/libs/ng-select/ng-select.scss']
})
export class PaySlipEmailComponent implements OnInit {


  isSubmitted=false;
  paySlipEmailForm:FormGroup;
  companyID:number;
  salaryPeriodItem: SalaryPeriodModel[];
  grade:number;
  isSubmit:boolean=false;
  exportingPdf:boolean = false;

  constructor(
    private formBuilderr:FormBuilder,
    private toster:ToastrService,
    private salarySetupService:SalarySetupService,
    private salaryProcessService:SalaryProcessService,
    private employmentES:EmploymentService,
    // private rptService:ReportService,
    // private rptHelper:ReportHelper
  ) { }

  ngOnInit() {
    this.companyID=AuthService.getLoggedCompanyId();
    this.grade=1;
    this.CreatePaySlipForm();
    this.getSalaryPeriodList();
  }
  onSelectEmpCode(obj:any){
    this.paySlipEmailForm.controls['empCode'].patchValue(obj.empCode)

  }

  // getEmpInfo(empCode:string){
  //   if (empCode == "") {
  //     return;
  //   }
  //   this.employmentES.getEmployment(empCode,this.companyID).subscribe((response:ApiResponse)=>{
  //     let empInfo=response.result as Employment;
  //   this.f.empCode.setValue(empInfo.empCode);
  //   })
  // }

  // onSelectEmp(empCode:any){
  //   this.paySlipEmailForm.controls["empCode"].patchValue(empCode)
  // }

  // exportToPdf(exportType: string) {

  //   this.exportingPdf = true;
  //   this.isSubmit = true;

  //   if (this.paySlipEmailForm.invalid) {
  //     this.exportingPdf = false;
  //     return;
  //   }
  //   this.paySlipEmailForm.patchValue({ExportType:exportType})
  //   this.rptService.getPayrollReport(this.paySlipEmailForm.value)
  //  // this.salaryProcessService.getGeneralinfoForPayslip(this.paySlipEmailForm.value.empCode,this.companyID,this.grade)
  //     .subscribe(
  //       exportedFile => {
  //         this.exportingPdf = false;
  //         this.rptHelper.openFileWindow(exportedFile as Blob);
  //       },
  //       (err: HttpErrorResponse) => {
  //         this.exportingPdf = false;
  //         this.toster.error(err.message, 'Failed!');
  //       })
  // }
  empCode:string;
  processPaySlip(){
    this.isSubmitted=true;
    if(this.paySlipEmailForm.invalid){
      this.toster.warning("Fill Required Fields");
    }else{
    let ent=new PaySlipToEmail;
    ent.periodID=this.paySlipEmailForm.value.periodID;
    ent.empCode=this.paySlipEmailForm.value.empCode;
    ent.companyID=this.companyID;
      this.salaryProcessService.deleteExistingPayslip(ent).subscribe((response:ApiResponse)=>{
        if(response.status){
          this.toster.success(response.result,"Existing payslip deleted Successfully")

  if(this.paySlipEmailForm.value.empCode==null||this.paySlipEmailForm.value.empCode==''){
    this.empCode='-1';
  }
  else{
    this.empCode= this.paySlipEmailForm.value.empCode;
  }
this.salaryProcessService.getGeneralinfoForPayslip(this.empCode,this.companyID,this.grade).subscribe((response:ApiResponse)=>{
  if(response.result){
    console.log(response.result);
    let result=response.result as PaySlipToEmail[];
  }
})
        }else{
          this.toster.error(response.result,"Failed to delete.!!")
        }
      });
    }
  }

  getSalaryPeriodList() {
    this.salarySetupService.getAllperiod().subscribe((response: ApiResponse) => {
      if (response.status) {
       //console.log(response.result);
        this.salaryPeriodItem = response.result as SalaryPeriodModel[];
      }
    })
  }


  CreatePaySlipForm(){
    this.paySlipEmailForm=this.formBuilderr.group({
      companyID:[this.companyID,[]],
      empCode:[,[]],
      periodID:[,[Validators.required]],
      grade:[this.grade,[]]
    })
  }

  get f(){
    return this.paySlipEmailForm.controls;
  }
  get formVal(){
    return this.paySlipEmailForm.value;
  }

  Reset(){
    this.isSubmitted=false;
    this.paySlipEmailForm.reset();
    this.CreatePaySlipForm();
  }
}
