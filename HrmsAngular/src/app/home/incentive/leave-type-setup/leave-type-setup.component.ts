import { AuthService } from './../../../services/auth.service';
import { id } from '@swimlane/ngx-datatable/release/utils';
import { ToastrService } from 'ngx-toastr';
import { ApiResponse } from './../../../models/response.model';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Pagination } from '../../../shared/paginate';
import { EmpTypeModel } from '../../../models/system-setup/EmpType.model';
import { EmpTypeService } from '../../../services/system-setup/EmpType.service';
import { LeaveType } from '../../../models/leave/leave-type.model';
import { LeaveService } from '../../../services/leave.service';
import { LeaveTypeService } from '../../../services/insentive-Other/encash-leave-type.service';
import { NgbDateCustomParserFormatter } from '../../../shared/dateformat';
import { LeaveTypeModel } from '../../../models/incentive-other/leave-type-setup.model';

@Component({
  selector: 'app-leave-type-setup',
  templateUrl: './leave-type-setup.component.html',
  styleUrls: ['./leave-type-setup.component.scss',
  '../../../../vendor/libs/angular-2-dropdown-multiselect/angular-2-dropdown-multiselect.scss',
  '../../../../vendor/libs/ng-select/ng-select.scss']
})
export class LeaveTypeSetupComponent extends Pagination implements OnInit {
  compID:number;
  isSubmitted=false;
  user:number;
  _grade:number;
  allEmployeeType:EmpTypeModel[]=[];
  leaveTypeForm:FormGroup;
  leave: LeaveTypeModel = new LeaveTypeModel();
  _leaveTypes: LeaveType[] = [];
  allLeaveType:LeaveTypeModel[]=[];
  btnStatus:string="Save";
  constructor
  (
    private empTypeES:EmpTypeService,
    private formBuilder:FormBuilder,
    private dateFormate:NgbDateCustomParserFormatter,
    private leaveTypeSetupES:LeaveTypeService,
    private leaveService: LeaveService,
    private toasterService:ToastrService
  ) {
    super();
  }
  title="Leave Encashment Leave Type Setup";
  ngOnInit() {
    this.compID=AuthService.getLoggedCompanyId();
    this.user=AuthService.getLoggedUserId();
    this._grade=AuthService.getLoggedGradeValue();
    this.items=[];
    this.AllEmployeeType();
    this.update();
    this.getAll();
    this.createForm();
    this.getLeaveTypes(this._grade, 0);
  }
  AllEmployeeType(){
    this.empTypeES.GetEmpType().subscribe((response:ApiResponse)=>{
      if(response.status){
        this.allEmployeeType=response.result as  EmpTypeModel[];
      }
    })
  }
  getLeaveTypes(grade: number, gender: number) {
    this.leaveService.getLeaveType(grade, gender).subscribe((response: ApiResponse) => {
      if (response.status) {
        this._leaveTypes = response.result as LeaveType[];
      }
    })
  }
  save(){
    this.isSubmitted=true;
    if(this.leaveTypeForm.invalid){
    this.toasterService.warning("Fill The Form");
    }
    else{
    this.leaveTypeForm.controls.eDateNgb.setValue(this.dateFormate.stringToNgbDate(this.leaveTypeForm.controls.eDate.value));
    this.leaveTypeSetupES.saveLeaveType(this.leaveTypeForm.value).subscribe((response:ApiResponse)=>{
      if(response.status){
        this.toasterService.success(response.result,"Success");
        this.getAll();
        this.reset();
        this.isSubmitted=false;
        this.btnStatus="Save";
      }
      else{
        this.toasterService.error(response.result)
      }
    })
  }
}
getById(id:number){
  this.leaveTypeSetupES.getById(id).subscribe((response:ApiResponse)=>{
    if(response.status){
      this.leave=response.result as LeaveTypeModel;
      this.leaveTypeForm.patchValue(this.leave);
      this.f.eDateNgb.setValue(this.dateFormate.stringToNgbDate(this.leave.eDate));
      this.btnStatus="Update";
    }
  })
}
  getAll(){
    this.leaveTypeSetupES.getAll(this.compID,-1).subscribe((response:ApiResponse)=>{
     this.allLeaveType=response.result as LeaveTypeModel[];
    })
  }
  createForm(){
    this.leaveTypeForm=this.formBuilder.group({
      id:[,[]],
      empGrade:[,[Validators.required]],
      leaveTypeID:[,[Validators.required]],
      numberoftimes:[,[Validators.required]],
      note:[,[Validators.required]],
      eDate:[,[]],
      eDateNgb:[this.dateFormate.getCurrentNgbDate(),[]],
      companyID:[this.compID,[]],
      userID:[this.user,[]],
    })
  }
  get f(){
    return this.leaveTypeForm.controls;
  }
  reset(){
    this.createForm();
    this.isSubmitted=false;
    this.btnStatus="Save";
  }
}
