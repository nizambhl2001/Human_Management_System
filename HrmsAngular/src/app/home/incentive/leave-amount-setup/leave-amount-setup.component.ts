import { AuthService } from './../../../services/auth.service';
import { SalarySetupService } from './../../../services/SalarySetup/salary-setup.service';
import { ApiResponse } from './../../../models/response.model';
import { EncashmentAmountModel } from './../../../models/incentive-other/encash-amount.model';
import { Component, OnInit } from '@angular/core';
import { Pagination } from '../../../shared/paginate';
import { EmpTypeModel } from '../../../models/system-setup/EmpType.model';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { LeaveType } from '../../../models/leave/leave-type.model';
import { EmpTypeService } from '../../../services/system-setup/EmpType.service';
import { NgbDateCustomParserFormatter } from '../../../shared/dateformat';
import { ToastrService } from 'ngx-toastr';
import { EncashAmountService } from '../../../services/insentive-Other/encash-amount.service';
import { SalaryHead } from '../../../models/SalarySetup/salary-head';

@Component({
  selector: 'app-leave-amount-setup',
  templateUrl: './leave-amount-setup.component.html',
  styleUrls: ['./leave-amount-setup.component.scss',
  '../../../../vendor/libs/angular-2-dropdown-multiselect/angular-2-dropdown-multiselect.scss',
  '../../../../vendor/libs/ng-select/ng-select.scss']
})
export class LeaveAmountSetupComponent extends Pagination implements OnInit {
  compID:number;
  btnStatus:string="Save";
  isSubmitted=false;
  user:number;
  grade:number;
  amount: EncashmentAmountModel = new EncashmentAmountModel();
  allEmployeeType:EmpTypeModel[]=[];
  EncashAmountGroup:FormGroup;
  _leaveTypes: LeaveType[] = [];
  salaryHeadModel: SalaryHead[] = [];
  allEnCashAmount:EncashmentAmountModel[]=[];
  constructor
  (
    private empTypeES:EmpTypeService,
    private formBuilder:FormBuilder,
    private salaryHeadService: SalarySetupService,
    private dateFormate:NgbDateCustomParserFormatter,
    private encashAmountES:EncashAmountService,
    private toasterService:ToastrService
  ) {
    super();
  }
  title="Leave Encashment Amount Setup";
  ngOnInit() {
    this.compID=AuthService.getLoggedCompanyId();
    this.grade=AuthService.getLoggedGradeValue();
    this.user=AuthService.getLoggedUserId();
    this.items=[];
    this.AllEmployeeType();
    this.getAllSalaryhead();
    this.update();
    this.getAll();
    this.createForm();
  }
  AllEmployeeType(){
    this.empTypeES.GetEmpType().subscribe((response:ApiResponse)=>{
      if(response.status){
        this.allEmployeeType=response.result as  EmpTypeModel[];
      }
    })
  }
  save(){
    this.isSubmitted=true;
    if(this.EncashAmountGroup.invalid){
     this.toasterService.warning("Fill Form");
    }
    else{
    this.EncashAmountGroup.controls.eDate.setValue(this.dateFormate.ngbDateToDate(this.EncashAmountGroup.controls.eDateNgb.value));
    this.encashAmountES.saveEncashmentAmount(this.EncashAmountGroup.value).subscribe((response:ApiResponse)=>{
      if(response.status){
        this.toasterService.success(response.result,"Success");
        this.reset();
        this.getAll();
      }
      else{
        this.toasterService.error(response.result);
      }
    })
  }
}
  getAllSalaryhead() {
    this.salaryHeadService.getAllSalaryHead().subscribe((response: ApiResponse) => {
      if (response.status) {
        this.salaryHeadModel = response.result as SalaryHead[];
      }
    })
  }
  getById(id:number){
    this.encashAmountES.getById(id).subscribe((response:ApiResponse)=>{
      if(response.status){
        this.amount=response.result as EncashmentAmountModel;
        this.EncashAmountGroup.patchValue(this.amount);
        this.f.eDateNgb.setValue(this.dateFormate.stringToNgbDate(this.amount.eDate));
        this.btnStatus="Update";
      }
    })
  }
  getAll(){
    this.encashAmountES.getAll(this.compID,this.grade).subscribe((response:ApiResponse)=>{
     this.allEnCashAmount=response.result as EncashmentAmountModel[];
    })
  }
  createForm(){
    this.EncashAmountGroup=this.formBuilder.group({
      id:[,[]],
      empGrade:[,[Validators.required]],
      salaryHead:[,[Validators.required]],
      numberoftimes:[,[Validators.required]],
      note:[,[Validators.required]],
      eDate:[,[]],
      eDateNgb:[this.dateFormate.getCurrentNgbDate(),[]],
      companyID:[this.compID,[]],
      userID:[this.user,[]]
    })
  }
  get f(){
    return this.EncashAmountGroup.controls;
  }
  reset(){
    this.createForm();
  this.isSubmitted=false;
  this.btnStatus="Save";
  }
}
