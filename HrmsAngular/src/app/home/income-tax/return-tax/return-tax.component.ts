import { AuthService } from './../../../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { TaxYearInfoService } from '../../../services/incomeTax/tax-year-info.service';
import { ToastrService } from 'ngx-toastr';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IncomeTaxReturn } from '../../../models/incomeTax/income-tax-return.model';
import { TaxYearInfo } from '../../../models/incomeTax/tax-year-info.model';
import { ApiResponse } from '../../../models/response.model';
import { EmploymentService } from '../../../services/hr/employment.service';
import { Employment } from '../../../models/hr/employment.model';
import { NgbDateCustomParserFormatter } from '../../../shared/dateformat';

@Component({
  selector: 'app-return-tax',
  templateUrl: './return-tax.component.html',
  styleUrls: ['./return-tax.component.scss','../../../../vendor/libs/ng-select/ng-select.scss']
})
export class ReturnTaxComponent implements OnInit {


  incomeTaxReturn:IncomeTaxReturn[]=[]
  returnTaxForm:FormGroup;
  taxYearInfo:TaxYearInfo[]=[];
  comId:number;
  userName:number;
  isSubmitted=false;
  constructor(
    private taxService:TaxYearInfoService,
    private toster:ToastrService,
    private formBuilder:FormBuilder,
    private empService:EmploymentService,
    private dateFormate:NgbDateCustomParserFormatter

  ) { }

  ngOnInit() {
    this.comId=AuthService.getLoggedCompanyId();
    this.userName=150;
    this.createTaxReturnForm();
    this.getAllYearList();
  }

  getAllYearList(){
    this.taxService.getAllYearList().subscribe((response:ApiResponse)=>{
      if(response.status){
        this.taxYearInfo=response.result as TaxYearInfo[];
      }
    })
  }


  // getEmpInfoById(empCode: string) {
  //   if (empCode == "") {
  //     return;
  //   }
  //     this.empService.getEmployment(empCode, this.comId).subscribe((response: ApiResponse) => {


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


saveTaxReturn(){
  this.isSubmitted=true;
  if(this.returnTaxForm.invalid){
    //this.toster.warning("Fill Required Fields");
  }else{
    let obj= new IncomeTaxReturn();
  obj= this.returnTaxForm.value;
  obj.date=this.dateFormate.getNgbDateToYyyy_mm_dd(this.f.dateNgb.value)
  this.taxService.saveTaxReturn(this.returnTaxForm.value).subscribe((response:ApiResponse)=>{
    if(response.status){
      this.toster.success(response.result,"Success");
      this.Reset();
    }else{
      this.toster.error(response.result,"Failed!!");
    }
  });
  }

}

checkIncomeTaxReturn(){

  if(this.f.empCode.value==null){
   this.toster.warning("Please Select EmpCode","Warning!");
  }
  else if(this.f.taxYearID.value==null){
   this.toster.warning("Please Select Tax Year ","Warning!");
 }
 else{
    let obj=new IncomeTaxReturn();
    obj=this.returnTaxForm.value;
    this.taxService.checkTaxReturn( obj.empCode, obj.taxYearID, obj.companyID).subscribe((response:ApiResponse)=>{

      if(response.status){
        this.toster.success(response.result,"Success");
      }else{
        this.toster.warning(response.result,"Warning");
      }
    });
  }
}
  createTaxReturnForm(){
    this.returnTaxForm=this.formBuilder.group({
      id :[0,[]],
      empCode :[,[Validators.required]],
      taxYearID :[,[Validators.required]],
      companyID :[this.comId,[]],
      dateNgb :[,[Validators.required]],
      userName :[this.userName,[]],
      wealthAmount :[,[Validators.required]],
      taxableIncome :[,[Validators.required]],
      taxPaid :[,[Validators.required]],
      serialNo :[,[Validators.required]],
      remarks :[,[]],
      empName:[,[]],
      department:[,[]],
      designation:[,[]]
    })
  }

  Reset(){
    this.isSubmitted=false;
    this.returnTaxForm.reset();
    this.createTaxReturnForm();
  }
  get f(){
    return this.returnTaxForm.controls;
  }
}
