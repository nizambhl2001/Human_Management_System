import { AuthService } from './../../../services/auth.service';
import { ApiResponse } from './../../../models/response.model';
import { SalarySetupService } from './../../../services/SalarySetup/salary-setup.service';
import { DeductionService } from './../../../services/Deduction/deduction.service';
import { StopDeductionService } from './../../../services/EmployeeLoanService/stop-deduction.service';
import { SalaryPeriodModel } from './../../../models/SalarySetup/SalaryPeriod';
import { EmploymentService } from './../../../services/hr/employment.service';
import { SalaryHead } from './../../../models/SalarySetup/salary-head';
import { Component, OnInit } from '@angular/core';
import { Pagination } from '../../../shared/paginate';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Employment } from '../../../models/hr/employment.model';
import { NgbDateCustomParserFormatter } from '../../../shared/dateformat';
import { StopDeduction } from '../../../models/EmloyeeLoanInfo/stop-deduction.model';
import { ToastrService } from 'ngx-toastr';
import { SearchEmployee } from '../../../models/hr/search-emp.model';

@Component({
  selector: 'app-stop-deduction',
  templateUrl: './stop-deduction.component.html',
  styleUrls: ['./stop-deduction.component.scss','../../../../vendor/libs/ng-select/ng-select.scss']
})
export class StopDeductionComponent extends Pagination implements OnInit {

  constructor(
    private formBuilder:FormBuilder,
    private loanDeductService:DeductionService,
    private employmentService:EmploymentService,
    private salarySetupService:SalarySetupService,
    private stopDeductionService:StopDeductionService,
    private dateFrmat:NgbDateCustomParserFormatter,
    private toaster:ToastrService,


  ) {
    super();
  }
  title="Loan Deduction Stop Information";
  stopDeductionForm:FormGroup;
  loanHeadData:SalaryHead[]=[];
  compId:number;
  salaryPeriod:SalaryPeriodModel[]=[];
  btnStatus='Save';
  stopDedutionModel:StopDeduction[]=[];
  pOptions:number;
  isSaveBtnClick=false;
  userTypeID:number;
  userID:number;
  grade:number;
  allemployee:SearchEmployee[]=[];


  ngOnInit() {
    this.items = [];
    //this.update();
    this.compId=AuthService.getLoggedCompanyId();
    this.grade=AuthService.getLoggedGradeValue();
    this.userTypeID=AuthService.getLoggedUserTypeId();
    this.userID=AuthService.getLoggedUserId();
    this.pOptions=4;
    this.getLoan();
    this.getEmpAll();
    this.getSalaryPeriod();
   // this.getJoinDate();
    this.createForm();
    //this.getAll();

  }
  getLoan(){
    this.loanDeductService.getLoan(this.compId).subscribe((response:ApiResponse)=>{
      if(response.status){
        this.loanHeadData=response.result as SalaryHead[];
      }
    })
  }
  getSalaryPeriod() {
    this.salarySetupService.getAllperiod().subscribe((response: ApiResponse) => {
      if (response.status) {
        this.salaryPeriod = response.result as SalaryPeriodModel[];
      }

    })
  }
 getEmpAll(){
   this.employmentService.getAllEmpBasicInfo(this.compId,this.grade).subscribe((response:ApiResponse)=>{
     //console.log(response.result);
     if(response.result){
       this.allemployee=response.result as SearchEmployee[];

     }
   })
 }
 getJoinDate(empCode:any){
  let Jdate=this.allemployee.find(c=>c.empCode=empCode).joinDate;
  //this.f.empCode.patchValue(empCode);
  this.f.joinDate.patchValue(Jdate);
 }

  onSelectEmp(employee: SearchEmployee) {
    this.stopDeductionForm.patchValue({
      empCode: employee.empCode,
      designation: employee.designation,
      empName: employee.empName,
      joinDate: employee.joinDate,
      //companyAddress:employee.jobLocation
    })
   // this.getCashReceivedInfo(this.f.empCode.value);
  }
Save(){
  this.isSaveBtnClick=true;
  if(this.stopDeductionForm.invalid){
    this.toaster.error("Please fill the all required fields","Invalid submission");
    return;
  }
  let stopdeduction=new StopDeduction();
  stopdeduction = this.stopDeductionForm.value;
  this.stopDeductionService.saveUpdate(stopdeduction,1).subscribe((response:ApiResponse)=>{
    if(response.status){
      this.toaster.success(response.result,"Success!")
     this.getAll(this.f.empCode.value);
     this.reset();
     }else{
       this.toaster.error(response.result ,"Failed!");
     }
  })
}

Update(){
  let stopdeductio=new StopDeduction();
  stopdeductio = this.stopDeductionForm.value;
  this.stopDeductionService.saveUpdate(stopdeductio,2).subscribe((response:ApiResponse)=>{
     if(response.status){
      this.toaster.success(response.result,"Updated!")
      this.getAll(this.f.empCode.value);
      this.reset();

     }else{
       this.toaster.error(response.result ,"Failed!");
     }})
}
onSubmit(){
  if(this.btnStatus=='Save')
   this.Save();
  else
  this.Update();
}


getAll(empCode:string){
  if(empCode==""){
    return;
  }
  let stopdeduct =new StopDeduction();
  stopdeduct=this.stopDeductionForm.value;
 stopdeduct.periodID=this.f.periodID.value;
 console.log(stopdeduct);
  this.stopDeductionService.getAll(stopdeduct,4).subscribe((response:ApiResponse)=>{
   console.log(response.result);
    if(response.status){
      this.stopDedutionModel=response.result as StopDeduction[];
    }
    else{
      this.stopDedutionModel=[];
    }
  })
}
getResultById(id:number){
  this.btnStatus="Update";
       let stopdeduction =this.stopDedutionModel.find(c=>c.id==id);

     this.stopDeductionForm.patchValue(stopdeduction);
      this.stopDeductionForm.patchValue({
        dateNgb:this.dateFrmat.stringToNgbDate(this.f.date.value)
      })

      this.getJoinDate(stopdeduction.empCode);
}
reset(){
  this.isSaveBtnClick=false;
 // this.stopDeductionForm.reset();
  //this.createForm();
  // this.stopDeductionForm.patchValue({
  // })
  this.stopDeductionForm.controls['loanType'].reset();
  this.stopDeductionForm.controls['dateNgb'].reset();
  this.stopDeductionForm.controls['remarks'].reset();
  this.stopDeductionForm.controls['periodID'].reset();
  this.stopDeductionForm.controls['date'].reset();
  this.btnStatus='Save';
}

createForm(){
 this.stopDeductionForm=this.formBuilder.group({
  id   :[0,[]],
  empCode  :[,[Validators.required]],
  periodID  :[,[Validators.required]],
  loanType  :[,[Validators.required]],
  date:[,[]],
  dateNgb:[,[Validators.required]],
  remarks :[null,[]],
  userID  :[this.userID,[]],
  companyID  :[this.compId,[]],
  entryDAte  :[,[]],
   empName:[,[Validators.required]],
  designation:[,[Validators.required]],
  joinDate:[,[Validators.required]],
  grade:[this.grade,[]],
  pOptions:[this.pOptions,[]],
  userTypeID:[this.userTypeID,[]]


 })
}
get f(){
  return this.stopDeductionForm.controls;
}

}
