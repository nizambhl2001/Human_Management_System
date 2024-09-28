import { AuthService } from './../../../services/auth.service';
import { EmploymentService } from './../../../services/hr/employment.service';

import { Component, OnInit } from '@angular/core';
import { Pagination } from '../../../shared/paginate';
import { FormGroup, FormBuilder, Validators, CheckboxControlValueAccessor, FormArray } from '@angular/forms';
import { ShiftAllowanceAssign } from "./../../../models/ShiftAllowance/ShiftAssignModel"
import { ApiResponse } from './../../../models/response.model';
import { BasicEntryService } from '../../../services/system-setup/basic-entry.service';
import { BasicEntry } from '../../../models/system-setup/basic-entry.model';
import { ToastrService } from 'ngx-toastr';
import { ShiftAllowanceService } from '../../../services/ShiftAllowance/shift-allowance.service';
import { Employment } from '../../../models/hr/employment.model';
import { SSL_OP_ALL } from 'constants';

@Component({
  selector: 'app-assign',
  templateUrl: './assign.component.html',
  styleUrls: ['./assign.component.scss', '../../../../vendor/libs/ng-select/ng-select.scss']
})
export class AssignComponent extends Pagination implements OnInit {

  constructor(
    private formBuilder: FormBuilder,
    private shiftAllowanceAssignService: ShiftAllowanceService,
    private basicEntryService: BasicEntryService,
    private toaster: ToastrService,
    private employment:EmploymentService

  ) {
    super();
  }
  title = "Assign Shift Allowance";
  alltabledata: ShiftAllowanceAssign[] = [];
  shiftAssignFormgroup: FormGroup;
  branch: BasicEntry[] = [];
  location: BasicEntry[] = [];
  department: BasicEntry[] = [];
  designation: BasicEntry[] = [];
  productionunit: BasicEntry[] = [];
  productionline: BasicEntry[] = [];
  companyId: number;
  userTypeID:number;
  gradeValue: number;
  shiftAssignAllowanceModel:ShiftAllowanceAssign[] = [];
  selectedEmp: string[] = [];
  isSelect: boolean;
  shiftAllowanceAssingForm:FormGroup;
  isSubmitted:boolean;
  activeType:number;
  totalEmp:number;


  ngOnInit() {
    this.companyId = AuthService.getLoggedCompanyId();
    this.gradeValue=AuthService.getLoggedGradeValue();
    this.userTypeID=AuthService.getLoggedUserTypeId();
    this.activeType=-1;
    this.createForm();
    this.getAllBranchName();
    this.getAllLocationName();
    this.getAllDepartmentName();
    this.getDesignationName();
   this.isSubmitted=false;
    this.getProductionUnit();
    this.searchKeys=['empCode'];

  }


  getEmpInfo(empCode:string){
    this.employment.getEmployment(empCode,this.companyId).subscribe((response:ApiResponse)=>{
      let empInfo=response.result as Employment;
      this.shiftAllowanceAssingForm.patchValue({
        empCode:empInfo.empCode
      })
         })
  }

getEmployeeIfoByEmpCode(empCode:string) {
      this.getEmpInfo(empCode);
      let filterModel = new ShiftAllowanceAssign();
      filterModel=this.shiftAllowanceAssingForm.value;
      filterModel.empCode=empCode;
        this.shiftAllowanceAssignService.getAllowanceAssign(filterModel).subscribe((response: ApiResponse) => {
          if (response.status) {
            this.shiftAssignAllowanceModel = response.result as ShiftAllowanceAssign[];
           this.selectedEmp=[];
           this.totalEmp=this.shiftAssignAllowanceModel.length;
          }
          else{
            this.shiftAssignAllowanceModel=[];
          }
        })
  }
removableItem(empCode:string){
    let index = this.shiftAssignAllowanceModel.findIndex(c => c.empCode == empCode);
    this.shiftAssignAllowanceModel.splice(index, 1);

}

  getAllBranchName() {
    this.basicEntryService.getBranch().subscribe((response: ApiResponse) => {
      if (response.status) {
        this.branch = response.result as BasicEntry[];
      }
    })
  }
  getAllLocationName() {
    this.basicEntryService.getLocation().subscribe((response: ApiResponse) => {
      if (response.status) {
        this.location = response.result as BasicEntry[];
      }
    })
  }
  getAllDepartmentName() {
    this.basicEntryService.getDepartment().subscribe((response: ApiResponse) => {
      if (response.status) {
        this.department = response.result as BasicEntry[];
      }
    })
  }
  getDesignationName() {
    this.basicEntryService.getDesignation().subscribe((response: ApiResponse) => {
      if (response.status) {
        this.designation = response.result as BasicEntry[];
      }
    })
  }
  getProductionUnit() {
    this.basicEntryService.getProductionUnit(this.companyId).subscribe((response: ApiResponse) => {
      if (response.status) {
        this.productionunit = response.result as BasicEntry[];
      }
    })
  }
  onSelect(empCode: any, isSelect: any) {
      if (isSelect) {
        this.selectedEmp.push(empCode);
      } else {
        let index = this.selectedEmp.findIndex(c => c == empCode);
        this.selectedEmp.splice(index, 1);
      }
  }
  getProductionLine(unitId: number) {
    if(unitId==null){
      this.productionline=[];
      return;}
    this.basicEntryService.getProductionLine(this.companyId, unitId).subscribe((response: ApiResponse) => {
      if (response.status) {
        this.productionline = response.result as BasicEntry[];
      }else{
        this.productionline=[];
      }
    })
  }
  onSubmit(){
   let assign = new ShiftAllowanceAssign();
   assign=this.shiftAllowanceAssingForm.value;
   assign.selectedEmp=this.selectedEmp;
   if( assign.selectedEmp.length ==0){
     this.toaster.error("No employee is selected");
     return;
   }else{
       this.shiftAllowanceAssignService.saveAsignAllowance(assign).subscribe((response:ApiResponse)=>{
    if(response.status){
      this.toaster.success(response.result, "Success!")
      this.reset();
    }else{
      this.toaster.error(response.result, "Failed!")
    }
  })}

}
reset(){

  this.shiftAllowanceAssingForm.reset();
  this.createForm();
  this.productionline=[];
  this.shiftAssignAllowanceModel=[];
  this.selectedEmp=[];

}
createForm(){
  this.shiftAllowanceAssingForm=this.formBuilder.group({
    id:[0,[]],
    activeType:[this.activeType,[]],
    createUser:[,[]],
    empCode:[,[]] ,
    companyID:[this.companyId,[]],
    departmentID:[,[]],
    designationID:[,[]],
    location:[,[]],
    branchID:[,[]],
    unite:[,[]],
    line:[,[]],
    gradeValue:[this.gradeValue,[]],
    userTypeID:[this.userTypeID,[]]

  })
}
get f (){
  return this.shiftAllowanceAssingForm.controls;
}
}









