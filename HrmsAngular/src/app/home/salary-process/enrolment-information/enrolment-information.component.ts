import { AuthService } from './../../../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { Pagination } from '../../../shared/paginate';
import { EmploymentService } from '../../../services/hr/employment.service';
import { Employment } from '../../../models/hr/employment.model';
import { ApiResponse } from '../../../models/response.model';
import { EmpEnrolment } from '../../../models/salary-process/emp-enrolment.model';
import { ToastrService } from 'ngx-toastr';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BasicEntryService } from '../../../services/system-setup/basic-entry.service';
import { BasicEntry } from '../../../models/system-setup/basic-entry.model';
import { SalaryGradeModel } from '../../../models/system-setup/salary-grader.model';
import { SalaryGradeService } from '../../../services/system-setup/slary-grade.service';
import { SalaryProcessService } from '../../../services/salary-process/salary-process-service.service';
import { SalaryGradePayScale } from '../../../models/salary-process/salary-grade-pay-scale.model';
import { empty } from 'rxjs';
import { SalaryPeriodModel } from '../../../models/SalarySetup/SalaryPeriod';

@Component({
  selector: 'app-enrolment-information',
  templateUrl: './enrolment-information.component.html',
  styleUrls: ['./enrolment-information.component.scss','../../../../vendor/libs/ng-select/ng-select.scss']
})
export class EnrolmentInformationComponent extends Pagination implements OnInit {

empEnrolment:EmpEnrolment[]=[];
comId:number;
empEnrolmentForm:FormGroup;
allBank:BasicEntry[]=[];
bankBranch:BasicEntry[]=[];
allSalaryGrade: SalaryGradeModel[] = [];
salaryGradePayScale:SalaryGradePayScale[]=[];
btnStatus="Save";
searchKeys
isSubmitted = false;
userID:number;
  constructor(
    private empService:EmploymentService,
    private toster:ToastrService,
    private formBuilder:FormBuilder,
    private basicEntry:BasicEntryService,
    private salaryGradeES:SalaryGradeService,
    private sPService:SalaryProcessService

  ) {
    super()
   }

  ngOnInit() {
    this.items=[];
    this.update();
    this.searchKeys= ['empCode'];
    this.comId=AuthService.getLoggedCompanyId();
    this.CreateEnrolmentForm();
    this.getAllBank();
    this.getAllBankBranch();
    this.AllSalaryGrade();
  }

getAllBank(){
  this.basicEntry.getBank().subscribe((response:ApiResponse)=>{
    if(response.status){
      this.allBank=response.result as BasicEntry[]
    }
  })
}

getAllBankBranch(){
  this.basicEntry.getBankBranches().subscribe((response:ApiResponse)=>{
    if(response.status){
      this.bankBranch=response.result as BasicEntry[]
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

payScaleList(gradeName:string){
  this.sPService.payScaleList(gradeName).subscribe((response:ApiResponse)=>{
    if(response.status){
      this.salaryGradePayScale= response.result as SalaryGradePayScale[];
    }
  });
}


getPayScale(empcode:string,comid:number){
  this.isSubmitted=false;
  if(empcode== "")
  return;
this.sPService.enrolmentGetByid(empcode,comid).subscribe((response:ApiResponse)=>{
  if(response.status){
    this.empEnrolment= response.result as EmpEnrolment[];
    this.empEnrolmentForm.patchValue({
      test:this.empEnrolment[0].gradeName,
      //payScaleID: this.empEnrolment[0].payScaleID,
    })
    this.payScaleList(this.f.test.value);
  }
})}


getByIdEdit(item:any){
  this.sPService.getByIdEdit(item.id,item.empCode).subscribe((response:ApiResponse)=>{
    if(response.status){
      this.empEnrolmentForm.patchValue(response.result);
      this.getPayScale(item.empCode,this.comId);

      this.btnStatus="Update";
    }
  })
}

onSubmit(){
if(this.btnStatus=="Save"){
this.save();
}else{
  this.Update();
}
}

save(){
  this.isSubmitted=true;
      if(this.empEnrolmentForm.invalid){
        //this.toster.warning("Fill Required Fields");
        return;
      }else{
        this.btnStatus="Save";
  this.sPService.saveUpdate(this.empEnrolmentForm.value).subscribe((response:ApiResponse)=>{
    if(response.status){
      this.toster.success(response.result,"Success");
      this.Reset();
    }
    else{
      this.toster.error(response.result,"Failed!!");
    }
  });
      }
}

Update(){
  this.isSubmitted=true;
  if(this.empEnrolmentForm.invalid){
    //this.toster.warning("Fill Required Fields");
    return;
  }else{
    this.btnStatus="Update";
  this.sPService.saveUpdate(this.empEnrolmentForm.value).subscribe((response:ApiResponse)=>{
    if(response.status){
      this.toster.success(response.result,"Success");
      this.Reset();
    }
    else{
      this.toster.error(response.result,"Failed!!");
    }
  });
  }

}

getById(empInfo:any){
  this.empEnrolmentForm.controls["empCode"].patchValue(empInfo.empCode);
  this.empEnrolmentForm.controls["empName"].patchValue(empInfo.empName);
    if(empInfo.empCode== "")
    return;
  this.sPService.enrolmentGetByid(empInfo.empCode,this.comId).subscribe((response:ApiResponse)=>{
    if(response.status){
      this.empEnrolment= response.result as EmpEnrolment[];
      console.log("Em",this.empEnrolment)
      this.items=response.result as EmpEnrolment[];
      this.update();
    }
  })
}

clickCash(){
  if(this.f.payby.value=="Cash"){
    this.empEnrolmentForm.patchValue({
      bank:0,
      bankBranch:0,
      accountName:0,
      accountNo:0
    })
  }
}

onSelectPeriod(period: SalaryPeriodModel) {
    this.empEnrolmentForm.patchValue({
      effectivePeriodID: period.id,
    })

}


  CreateEnrolmentForm(){
    this.empEnrolmentForm= this.formBuilder.group({
    id  :[0,[]],
    empCode :[,[Validators.required]],
    bank :[,[Validators.required]],
    bankBranch :[,[Validators.required]],
    accountNo :[,[Validators.required]],
    accountName :[,[Validators.required]],
    payby :[,[Validators.required]],
    incomeTax :[,[Validators.required]],
    taxDeductAmt :[0.00,[Validators.required]],
    providentFund :[,[Validators.required]],
    companyID :[this.comId,[]],
    payScaleID :[,[]],
    effectivePeriodID :[,[Validators.required]],
    taxpaybycompany :[,[Validators.required]],
    empName:[,[]],
    test:[,[]],
    })
  };

  Reset(){
    this.btnStatus="Save";
    this.isSubmitted=false;
    this.empEnrolmentForm.reset();
    this.CreateEnrolmentForm();
    this.items=[];
    this.update();
  }
  get f(){
    return this.empEnrolmentForm.controls;
  }
}
