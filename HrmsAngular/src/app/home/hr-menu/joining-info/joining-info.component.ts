import { AuthService } from './../../../services/auth.service';
import { ToastrService } from 'ngx-toastr';
import { NgbDateCustomParserFormatter } from './../../../shared/dateformat';
import { ApiResponse } from './../../../models/response.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { BasicEntryService } from '../../../services/system-setup/basic-entry.service';
import { BasicEntry } from '../../../models/system-setup/basic-entry.model';
import { SalaryGradeService } from '../../../services/system-setup/slary-grade.service';
import { SalaryGradeModel } from '../../../models/system-setup/salary-grader.model';
import { Employment } from '../../../models/hr/employment.model';
import { EmploymentService } from '../../../services/hr/employment.service';
import { JoiningInfoService } from '../../../services/hr/joining-info.service';
import { JoiningInfoModel } from '../../../models/FlipBook/join-info-model';
import { JoiningModel } from '../../../models/hr/joining-info.model';

@Component({
  selector: 'app-joining-info',
  templateUrl: './joining-info.component.html',
  styleUrls: ['./joining-info.component.scss',
  '../../../../vendor/libs/ng-select/ng-select.scss']
})
export class JoiningInfoComponent implements OnInit {
  btnStatus:string="Save";
  compId:number;
  isSubmitted=false;
  JoiningFormGroup: FormGroup;
  allDepartment: BasicEntry[] = [];
  allSalaryGrade: SalaryGradeModel[] = [];
  allDesignation: BasicEntry[] = [];
  constructor(
    private toasterService:ToastrService,
    private basicES: BasicEntryService,
    private formBuilder:FormBuilder,
    private salaryGradeES: SalaryGradeService,
    private employmentES:EmploymentService,
    private joiningInfoS:JoiningInfoService,
    private dateFormate:NgbDateCustomParserFormatter
  ) { }

  ngOnInit() {
    this.compId=AuthService.getLoggedCompanyId();
    this.createForm();
    this.AllDepartment();
    this.AllDesignation();
    this.AllSalaryGrade();
  }


  AllDepartment() {
    this.basicES.getDepartment().subscribe((response: ApiResponse) => {
      if (response.status) {
        this.allDepartment = response.result as BasicEntry[];
      }
    })
  }
  AllDesignation() {
    this.basicES.getDesignation().subscribe((response: ApiResponse) => {
      if (response.status) {
        this.allDesignation = response.result as BasicEntry[];
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
  save(){
    this.isSubmitted=true;
    if(this.JoiningFormGroup.invalid){
      this.toasterService.warning("Fill Required Fields");
    }
    else{
    this.f.joiningDate.setValue(this.dateFormate.ngbDateToString(this.f.joiningDateNgb.value))
   this.joiningInfoS.saveJoiningInfo(this.JoiningFormGroup.value).subscribe((response:ApiResponse)=>{
     if(response.status){
     this.toasterService.success("Save Successfully");
     this.reset();
     this.isSubmitted=false;
     }
     else{

     }

   })
  }
  }
  getEmpInfo(empCode:string){
    if (empCode == "") {
      this.reset();
      return;
    }
    this.employmentES.getEmployment(empCode,this.compId).subscribe((response:ApiResponse)=>{
      let empInfo=response.result as Employment;
      this.JoiningFormGroup.patchValue({
       empCode:empInfo.empCode,
       empName:empInfo.empName,
     })
     this.getByEmpCode();
    })
  }
  getByEmpCode(){
    this.joiningInfoS.getJoiningInfo(this.f.empCode.value).subscribe((response:ApiResponse)=>{
      if(response.status){
        this.btnStatus="Update";
      let joiningInfo=response.result as JoiningModel;
      this.f.joiningDateNgb.setValue(this.dateFormate.stringToNgbDate(joiningInfo.JoiningDate))
      this.JoiningFormGroup.patchValue(joiningInfo);
      }
      else{

      }
    })
  }
  createForm(){
  this.JoiningFormGroup=this.formBuilder.group({
    empCode:[,[Validators.required]],
    department:[,[Validators.required]],
    designation:[,[Validators.required]],
    grade:[,[Validators.required]],
    joiningDate:[,[]],
    joiningDateNgb:[,[Validators.required]],
    salary:[,[Validators.required]],
    empName:[,[]]
  })
  }
  get f(){
    return this.JoiningFormGroup.controls;
  }
  get formVal(){
   return this.JoiningFormGroup.value;
  }
  reset(){
    this.createForm();
    this.btnStatus="Save";
    this.isSubmitted=false;
  }
}
