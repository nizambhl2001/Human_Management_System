import { AuthService } from '../../../services/auth.service';
import { Pagination } from '../../../shared/paginate';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SalaryProcessService } from '../../../services/salary-process/salary-process-service.service';
import { ToastrService } from 'ngx-toastr';
import { NgbDateCustomParserFormatter } from '../../../shared/dateformat';
import { ConformationIncrement } from '../../../models/salary-process/conformation-increment.model';
import { SalaryGradePayScale } from '../../../models/salary-process/salary-grade-pay-scale.model';
import { ApiResponse } from '../../../models/response.model';
import { SalaryGradeService } from '../../../services/system-setup/slary-grade.service';
import { SalaryGradeModel } from '../../../models/system-setup/salary-grader.model';
import { EmpEnrolment } from '../../../models/salary-process/emp-enrolment.model';
import { Employment } from '../../../models/hr/employment.model';
import { EmploymentService } from '../../../services/hr/employment.service';
import { DatePipe } from '@angular/common';
import { ConformIncType } from '../../../models/salary-process/conform-inc-type.model';
import { empty, iif } from 'rxjs';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-manual-confirm-or-inc',
  templateUrl: './manual-confirm-or-inc.component.html',
  styleUrls: ['./manual-confirm-or-inc.component.scss','../../../../vendor/libs/ng-select/ng-select.scss']
})
export class ManualConfirmOrIncComponent extends Pagination implements OnInit {


  confirmationIncrementModel:ConformationIncrement[]=[];
  confirmationIncrementForm:FormGroup;
  comid:number;
  salaryGradePayScale:SalaryGradePayScale[]=[];
  allSalaryGrade:SalaryGradeModel[]=[];
  empEnrolment:EmpEnrolment[]=[];
  incrementType:ConformIncType[]=[];
  selectedRow:any={
    id:0,
    comid:0
  };
  isSubmitted = false;
  searchKeys
  constructor(
    private empService:EmploymentService,
    private formBuilder:FormBuilder,
    private sPService:SalaryProcessService,
    private toster:ToastrService,
    private dateFormator:NgbDateCustomParserFormatter,
    private salaryGradeES:SalaryGradeService,
    private modalService: NgbModal
  ) {
    super()
  }

  ngOnInit() {
    this.searchKeys=['empCode']
    this.items=[];
    this.update();
    this.comid=AuthService.getLoggedCompanyId();
    this.createConfirmationForm();
    this.AllSalaryGrade();
    this.getIncrementType();
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

  getById(empcode:any){
    this.getEmpInfoById(empcode)
    this.isSubmitted=false;
    if(empcode== "")
    return;
  this.sPService.enrolmentGetByid(this.f.empCode.value,this.comid).subscribe((response:ApiResponse)=>{
    if(response.status){
      this.empEnrolment= response.result as EmpEnrolment[];
      this.confirmationIncrementForm.patchValue({
        prePayscaleID: this.empEnrolment[0].payScaleID,
       incrementPacyscaleID: this.empEnrolment[0].payScaleID,
       preGrade:this.empEnrolment[0].gradeName,
       incrementGrade:this.empEnrolment[0].gradeName,
       providentFund:this.empEnrolment[0].providentFund,
       empName:this.empEnrolment[0].empName
      })
      this.payScaleList(this.f.preGrade.value);
    }
  })
  this.sPService.getConfirmationInCrementList(this.f.empCode.value,this.comid).subscribe((response:ApiResponse)=>{
    if(response.status){
      this.items=response.result as ConformationIncrement[];
      this.confirmationIncrementModel=response.result as ConformationIncrement[];
      this.update();
    }
  });
}

getIncrementType(){
  this.sPService.getIncrementType().subscribe((response:ApiResponse)=>{
    if(response.status){
      this.incrementType=response.result as ConformIncType[];
    }else{
      this.incrementType=[];
    }
  });
}

// getEmpInfoById(empCode: string) {
//   if (empCode == "") {
//     return;
//   }
//     this.empService.getEmployment(empCode, this.comid).subscribe((response: ApiResponse) => {
//       if (response.status) {
//         let empInfo = response.result as Employment;
//         this.f.empName.setValue(empInfo.empName);
//       }
//     })
// }


getEmpInfoById(empInfo:any) {
  if (empInfo == "") {
    return;
  }
        this.f.empCode.patchValue(empInfo.empCode);
        this.f.empName.patchValue(empInfo.empName)
}



saveConIncrement(){
  this.isSubmitted=true;
  if(this.confirmationIncrementForm.invalid){
    //this.toster.warning("Fill Required Fields");
    return;
  }else{
    let obj= new ConformationIncrement();
  obj=this.confirmationIncrementForm.value;
  obj.date=this.dateFormator.ngbDateToDate(this.f.dateNgb.value).toLocaleDateString();
  console.log(obj);
  this.sPService.saveConfirmatinIncrement([obj]).subscribe((response:ApiResponse)=>{
    if(response.status){
      this.toster.success(response.result,"Success");
      this.Reset();
    }else{
      this.toster.error(response.result,"Failed!");
    }
  });
  }

}

checkConfirmOrIncrement(typeId:number){
  if(this.f.providentFund.value=="Yes" && typeId==1){
    this.toster.warning("Already Conformation Complete","Warning")
  }
}

deleteConIncrement(id:number,comid:number, modal: any) {
  this.selectedRow.id=id;
  this.selectedRow.comid=comid;
  this.modalService.open(modal);

}
cancel() {
  this.modalService.dismissAll();
}
confirmDelete(){

  this.sPService.deleteConfirmationIncrement(this.selectedRow.id,this.selectedRow.comid).subscribe((response:ApiResponse)=>{
    if(response.status){
      this.cancel();
      this.toster.success(response.result,"Success");
      this.Reset();
      this.selectedRow.id=0;
      this.selectedRow.comid=0;
    }
    else{
      this.toster.error(response.result,"Failded");
    }
  });

}


  createConfirmationForm(){
    this.confirmationIncrementForm=this.formBuilder.group({
    id:[0,[]],
    empCode :[,[Validators.required]],
    type :[,[Validators.required]],
    dateNgb :[this.dateFormator.getCurrentNgbDate(),[Validators.required]],
    prePayscaleID :[,[Validators.required]],
    incrementPacyscaleID :[,[Validators.required]],
    companyID :[this.comid,[]],
    empName:[,[]],
    preGrade:[,[Validators.required]],
    incrementGrade:[,[Validators.required]],
    providentFund:[0,[Validators.required]]
    })
  }

  Reset(){
    this.isSubmitted=false;
    this.confirmationIncrementForm.reset();
    this.createConfirmationForm();
    this.items.length=0;
    this.update();
    this.confirmationIncrementModel.length=0;

  }

  get f(){
    return this.confirmationIncrementForm.controls;
  }


}
