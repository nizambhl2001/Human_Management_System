import { AuthService } from './../../../services/auth.service';
import { SearchEmployee } from './../../../models/hr/search-emp.model';
import { ToastrService } from 'ngx-toastr';
import { ApiResponse } from './../../../models/response.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbDateCustomParserFormatter } from './../../../shared/dateformat';
import { Component, OnInit } from '@angular/core';
import { EmpBlockService } from '../../../services/hr/emp-block-info.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { EmpBlockInfoModel } from '../../../models/hr/emp-block-info.model';
import { EmployeeViewModel } from '../../../models/hr/emp-view.model';
import { Pagination } from '../../../shared/paginate';
import { EmployeeService } from '../../../services/hr/employee.service';
import { Employment } from '../../../models/hr/employment.model';
import { EmploymentService } from '../../../services/hr/employment.service';
import { EmpGenInfo } from '../../../models/hr/emp-gen-info.model';

@Component({
  selector: 'app-emp-block-info',
  templateUrl: './emp-block-info.component.html',
  styleUrls: ['./emp-block-info.component.scss','../../../../vendor/libs/ng-select/ng-select.scss']
})
export class EmpBlockInfoComponent extends Pagination implements OnInit {
  compId:number;
  gradeValue:number;
  isSubmitted=false;
  empCodes: EmpGenInfo[] = [];
  empCode: EmpGenInfo[] = [];
  formGroup:FormGroup;
  btnStatus:string="Save";
  empSearchKeys: SearchEmployee = new SearchEmployee();
  constructor(
    private empBlockSE:EmpBlockService,
    private toasterService:ToastrService,
    private dateFormate:NgbDateCustomParserFormatter,
    private empService: EmployeeService,
    private employmentES:EmploymentService,
    private modalService:NgbModal,
    private formBuilder:FormBuilder
    )
  {
 super();
  }

  ngOnInit() {
  this.compId=AuthService.getLoggedCompanyId();
  this.gradeValue=AuthService.getLoggedGradeValue();
  this.createForm();
  this.getEmployee();
  this.getEmployeeForBlock();
  }
  
 getEmpBlockInfoById(empCode:string){
   if(empCode==""){
     return;
   }
   this.empBlockSE.empBlockGetById(empCode,this.compId).subscribe((response:ApiResponse)=>{
     if(response.status){
       this.btnStatus="Update";
     let empBlockInfo=response.result as EmpBlockInfoModel;
     console.log(empBlockInfo);
     this.f.id.setValue(empBlockInfo.id);
     this.f.isBlock.setValue(empBlockInfo.isBlock);
     this.f.blockDateNgb.setValue(this.dateFormate.stringToNgbDate(empBlockInfo.blockDate));
     this.f.remark.setValue(empBlockInfo.remark);
     this.f.status.setValue(empBlockInfo.status);
     this.cancel();
     }
     else{
       this.formGroup.controls.isBlock.setValue('No');
       this.formGroup.controls.blockDateNgb.setValue(null);
       this.formGroup.controls.remark.setValue(null);
       this.formGroup.controls.status.setValue(null);
     }
   })
 }

 getEmpBlockById(empCode:string){
   if(empCode==""){
     return;
   }
   this.empBlockSE.EmpBlock_niGetById(empCode,this.compId).subscribe((response:ApiResponse)=>{
     if(response.status){
       this.btnStatus="Update";
     let empBlockInfo=response.result as EmpBlockInfoModel;
     console.log(empBlockInfo);
     this.f.empCode.setValue(empBlockInfo.empCode);
     this.f.empName.setValue(empBlockInfo.empName);
     this.f.department.setValue(empBlockInfo.department);
     this.f.designation.setValue(empBlockInfo.designation);
     this.f.id.setValue(empBlockInfo.id);
     this.f.isBlock.setValue(empBlockInfo.isBlock);
     this.f.blockDateNgb.setValue(this.dateFormate.stringToNgbDate(empBlockInfo.blockDate));
     this.f.joiningDateNgb.setValue(this.dateFormate.stringToNgbDate(empBlockInfo.joiningDate));
     this.f.remark.setValue(empBlockInfo.remark);
     this.f.status.setValue(empBlockInfo.status);
     this.cancel();
     }
     else{
       this.formGroup.controls.isBlock.setValue('No');
       this.formGroup.controls.blockDateNgb.setValue(null);
       this.formGroup.controls.remark.setValue(null);
       this.formGroup.controls.status.setValue(null);
     }
   })
 }




 getEmployee() {
  this.empService.getAllBlockEmpCodeName( this.gradeValue).subscribe((response: ApiResponse) => {
    if (response.status) {
      this.empCodes = response.result as EmpGenInfo[];
      console.log("this.empCodes",this.empCodes)
    } else {
      this.empCodes = [];
    }
  })
}

getEmployeeForBlock() {
  this.empService.allBlockEmpCodeName( this.gradeValue).subscribe((response: ApiResponse) => {
    if (response.status) {
      this.empCode = response.result as EmpGenInfo[];
      console.log("this.empCodes",this.empCodes)
    } else {
      this.empCodes = [];
    }
  })
}
 getEmpInfo(empCode:any){
  if(empCode){
    debugger
  this.employmentES.getEmployment(empCode.empCode,this.compId).subscribe((response:ApiResponse)=>{
    let empInfo=response.result as Employment;
    this.getEmpBlockInfoById(empCode.empCode);
    this.formGroup.patchValue({
     empCode:empInfo.empCode,
     empName:empInfo.empName,
     department:empInfo.department,
     designation:empInfo.designation,
     joiningDateNgb:this.dateFormate.stringToNgbDate(empInfo.joinDate)
   })
  })
}
else{
  this.formGroup.patchValue({
    empCode:null,
    empName:null,
    department:null,
    designation:null,
    joiningDateNgb:null
  })
  this.reset();
}
 }
 empBlockSave(){
   this.isSubmitted=true;
   if(this.formGroup.invalid){
   this.toasterService.warning("Fill All Required Field");
   return;
   }
   this.f.joiningDate.setValue(this.dateFormate.ngbDateToDate(this.f.joiningDateNgb.value).toLocaleDateString());
   this.f.blockDate.setValue(this.dateFormate.ngbDateToDate(this.f.blockDateNgb.value).toLocaleDateString());
   this.empBlockSE.empBlockSave(this.formGroup.value).subscribe((response:ApiResponse)=>{
     if(response.status){
   this.toasterService.success(response.result,"Success");
   this.isSubmitted=false;
   this.reset();
   this.btnStatus="Save";
   this.getEmployee();
     }
     else{
       this.toasterService.error(response.result,"Error");
     }
   })
 }

searchEmployees() {
  this.empSearchKeys.companyID = this.compId;
  this.empSearchKeys.gradeValue = this.gradeValue;
  this.empService.searchEmployee(this.empSearchKeys).subscribe((response: ApiResponse) => {
    if (response.status) {
      this.perPage = 10;
      this.items = response.result as EmployeeViewModel[];
      this.update();
    }
  })
}


 createForm(){
   this.formGroup=this.formBuilder.group({
     id:[,[]],
     empCode:[,[Validators.required]],
     empName:[,[]],
     designation:[,[]],
     department:[,[]],
     joiningDate:[,[]],
     joiningDateNgb:[,[Validators.required]],
     isBlock:['No',[Validators.required]],
     blockDate:[,[]],
     blockDateNgb:[,[Validators.required]],
     remark:[,[Validators.required]],
     companyID:[this.compId,[]],
     status:[,[]]
   })
 }
 get f(){
   return this.formGroup.controls;
 }
 get formVal(){
   return this.formGroup.value;
 }
 reset(){
   let empCode=this.f.empCode.value;
   let comID=this.f.companyID.value;
   this.createForm();
   this.f.empCode.setValue(empCode);
   this.f.companyID.setValue(comID);
   this.isSubmitted=false;
  this.btnStatus="Save";
 }
 cancel(){
   this.modalService.dismissAll();
 }
}
;
