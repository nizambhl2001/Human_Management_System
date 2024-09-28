import { AuthService } from './../../../services/auth.service';
import { ShiftAllowanceService } from './../../../services/ShiftAllowance/shift-allowance.service';
import { EmpTypeModel } from './../../../models/system-setup/EmpType.model';
import { EmpTypeService } from './../../../services/system-setup/EmpType.service';
import { ShiftAmountSetup } from './../../../models/ShiftAllowance/ShiftAmountSetup';
import { ApiResponse } from './../../../models/response.model';
import { Component, OnInit } from '@angular/core';
import { Pagination } from '../../../shared/paginate';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { DatatableComponent } from '@swimlane/ngx-datatable';
import {AttendenceService} from '../../../services/Attendance/attendence.service';
import {ShiftSetupModel} from './../../../models/Attendance/shiftsetupModel';
import { from } from 'rxjs';
import { ToastrService } from 'ngx-toastr';





@Component({
  selector: 'app-setup',
  templateUrl: './setup.component.html',
  styleUrls: ['./setup.component.scss','../../../../vendor/libs/ng-select/ng-select.scss']
})
export class SetupComponent extends Pagination implements OnInit {

  constructor(
    private empTypeES:EmpTypeService,
    private formBuilder:FormBuilder,
    private shiftnameservice:AttendenceService,
    private shiftAllowanceService:ShiftAllowanceService,
    private toaster:ToastrService
  ) {
    super();
  }
  title="Shift Allowance Setup";
  btnStatus='Save';
  shiftAmountSetupForm:FormGroup;
  shiftAmountSetup: ShiftAmountSetup = new ShiftAmountSetup();
  allShiftAmmount:ShiftAmountSetup[]=[];
  allshiftname:ShiftSetupModel[]=[];
  allEmployeeType:EmpTypeModel[]=[];
  companyId:number;
  isSaveBtnClick:boolean = false;
  userTypeID:number;
  grade:number;
  userID:number;


  ngOnInit() {
    this.companyId=AuthService.getLoggedCompanyId();
    this.userTypeID=AuthService.getLoggedUserTypeId();
    this.grade=AuthService.getLoggedGradeValue();
    this.userID=AuthService.getLoggedUserId();
    this.items=[];
    this.createForm();
    this.getAll();
    this.AllEmployeeType();
    this.AllShiftName();
    this.searchKeys = ['shfitName']
  }

  getAll(){

    this.shiftAllowanceService.getSetupAllowance(this.companyId,this.grade,this.userTypeID).subscribe((response:ApiResponse)=>{
      if(response.status){
        this.items = response.result as ShiftAmountSetup[];
        this.allShiftAmmount = response.result as ShiftAmountSetup[];
        this.update();
      }
    })
  }

  onSubmit(){
    this.isSaveBtnClick = true;
    if(this.shiftAmountSetupForm.invalid ){
      this.toaster.error('Fill all required field!', 'Invalid Submission!');
      return;
    }

    this.shiftAllowanceService.saveSetupAllowance(this.shiftAmountSetupForm.value).subscribe((response:ApiResponse)=>{
      if(response.status){
        this.toaster.success(response.result, "Success!");
        this.getAll();
        this.reset();
        this.isSaveBtnClick = false;
      }else{
        this.toaster.error(response.result, "Failed!")
      }
    })
  }

 getById(id:number){
   let shiftamount=this.allShiftAmmount.find(c=>c.id==id);
   this.shiftAmountSetupForm.setValue(shiftamount);
   this.btnStatus='Update';
 }


  reset() {
    this.isSaveBtnClick=false;
    this.shiftAmountSetupForm.reset();
    this.createForm();
    this.btnStatus='Save';
  }

  AllEmployeeType(){
    this.empTypeES.GetEmpType().subscribe((response:ApiResponse)=>{
      if(response.status){
        this.allEmployeeType=response.result as  EmpTypeModel[];
      }
    })

  }

  AllShiftName(){
    this.shiftnameservice.GetshiftAll().subscribe((response:ApiResponse)=>{
      if(response.status){
        this.allshiftname=response.result as  ShiftSetupModel[];
      }
    })

  }


  createForm(){
    this.shiftAmountSetupForm = this.formBuilder.group({
      id:[0,[],],
      employeeType:[,[Validators.required]],
      shiftID:[,[Validators.required]],
      amount:[,[Validators.required]],
      userID:[this.userID,[]],
      companyID:[this.companyId,[]],
      grade:[this.grade,[]],
      shfitName:[,[]],
      gradeName:[,[]]



    })
  }


get f(){
  return this.shiftAmountSetupForm.controls;
}

}




