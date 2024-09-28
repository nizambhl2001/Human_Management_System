import { AuthService } from './../../../services/auth.service';
import { ToastrService } from 'ngx-toastr';
import { NgbDateCustomParserFormatter } from './../../../shared/dateformat';
import { FormGroup, FormBuilder, FormArray, FormControl, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Pagination } from '../../../shared/paginate';
import { BonusTypeService } from '../../../services/Bonus/bonusType.service';
import { BonusSelectService } from '../../../services/Bonus/bonus-select.service';
import { BonusPeriodService } from '../../../services/Bonus/bonus-period.service';
import { BonuSType } from '../../../models/bonus/bonusType.model';
import { BonusPeriodModel } from '../../../models/bonusPeriod.model';
import { BonusSalaryHeadModel } from '../../../models/bonus/bonus-salary-head.model';
import { ApiResponse } from '../../../models/response.model';
import { EmploymentService } from '../../../services/hr/employment.service';
import { SearchEmployee } from '../../../models/hr/search-emp.model';
import { FestivalBonusModel } from '../../../models/bonus/festival-bonus.model';
import { BonusGridModel } from '../../../models/bonus-grid.model';
import { FestivalBonusService } from '../../../services/Bonus/festival-bonus.service';
import { ArrearPaymentManual } from '../../../services/insentive-Other/arear-payment-manual.service';

@Component({
  selector: 'app-arrear-payment-manual',
  templateUrl: './arrear-payment-manual.component.html',
  styleUrls: ['./arrear-payment-manual.component.scss',
  '../../../../vendor/libs/angular-2-dropdown-multiselect/angular-2-dropdown-multiselect.scss',
  '../../../../vendor/libs/ng-select/ng-select.scss']
})
export class ArrearPaymentManualComponent extends Pagination implements OnInit {
  isSubmitted=false;
  compId:number;
  allBonusType: BonuSType[] = [];
  allBonusPeriod: BonusPeriodModel[] = [];
  employment:SearchEmployee[]=[];
  allBonusAllowance: BonusSalaryHeadModel[] = [];
  allBonus:BonusGridModel[]=[];
  arearPaymentGroup:FormGroup;
  employeesForm:FormArray;
  constructor(
    private BonusTypeES: BonusTypeService,
    private BonusSelectES: BonusSelectService,
    private BonusPeriodES: BonusPeriodService,
    private empService:EmploymentService,
    private festivalBonusES:FestivalBonusService,
    private arearPaymentES:ArrearPaymentManual,
    private formBuilder:FormBuilder,
    private toasterService:ToastrService,
    private dateFormate:NgbDateCustomParserFormatter
  ) {
    super();
    this.employeesForm = this.formBuilder.array([]);
  }
  title="Employee Arrear Information";
  ngOnInit() {
    this.compId=AuthService.getLoggedCompanyId();
    this.items=[];
    this.update();
    this.AllBonusType();
    this.AllBonusPeriod();
    this.AllBonusAllowance();
    this.addRow();
    this.createForm();
  }
  AllBonusType() {
    this.BonusTypeES.getBonusType().subscribe((response: ApiResponse) => {
      if (response.status) {
        this.allBonusType = response.result as BonuSType[];
      }
    })
  }
  AllBonusAllowance() {
    this.BonusSelectES.getBonusAllowance().subscribe((response: ApiResponse) => {
      if (response.status) {
        this.allBonusAllowance = response.result as BonusSalaryHeadModel[];
      }
    })
  }
  AllBonusPeriod() {
    this.BonusPeriodES.getBonusPeriod().subscribe((response: ApiResponse) => {
      if (response.status) {
        this.allBonusPeriod = response.result as BonusPeriodModel[];
      }
    })
  }
  getEmployment(empCode:string,rowIndex:number){
    if(empCode==""){
      this.employeesForm.controls[rowIndex].patchValue({
        empName:null,
        department:null,
        designation:null
      })
      return;
    }

    this.empService.getEmployment(empCode,this.compId).subscribe((response:ApiResponse)=>{
      if(response.status){
       let employee=response.result as SearchEmployee;
        this.employeesForm.controls[rowIndex].patchValue({
          empCode:employee.empCode,
          empName:employee.empName,
          department:employee.department,
          designation:employee.designation
        })
      }
      else{
        this.employeesForm.controls[rowIndex].patchValue({
          empName:null,
          department:null,
          designation:null
        })
      }
    })
    }

    saveBonus(){
      this.isSubmitted=true;
      if(this.arearPaymentGroup.invalid || this.employeesForm.invalid){
        this.toasterService.warning("Fill Required Fields");
        if(this.employeesForm.invalid){
          this.toasterService.warning("Fill EmpCode,Salaryhead");
        }
      }
      else{
      this.arearPaymentGroup.controls.date.setValue(this.dateFormate.ngbDateToString(this.arearPaymentGroup.controls.dateNgb.value));
      let festivalBonus:FestivalBonusModel=this.arearPaymentGroup.value;
      festivalBonus.bonusGrid=this.employeesForm.value
      this.arearPaymentES.saveArearPayment(festivalBonus).subscribe((response:ApiResponse)=>{
        if(response.status){
          this.toasterService.success("Successfully Save","Success");
          this.reset();
        }
        else{
          this.toasterService.error(response.result,"Fail")
        }
      })
    }
  }
  createForm() {
    this.arearPaymentGroup = this.formBuilder.group({
      empCode:[,[]],
      periodID: [, [Validators.required]],
      salaryHeadID: [, []],
      otpp: [0, []],
      bonusType: [, [Validators.required]],
      date: [, []],
      dateNgb:[this.dateFormate.getCurrentNgbDate(),[]],
      companyID: [this.compId, []],
      depertment: [, []],
      DepertmentID:[,[]],
      companyid: [this.compId, []],
      jobType: [1, []]
    })
  }
  addRow() {
    this.employeesForm.push(
      new FormGroup({
        empCode: new FormControl(null, [Validators.required]),
        empName: new FormControl(null, []),
        department: new FormControl(null, []),
        designation: new FormControl(null, []),
        salaryHeadID:new FormControl(null,[Validators.required]),
        amount: new FormControl(null, [Validators.required])
      })
    )
  }
  removeRow(index:number){
    this.employeesForm.removeAt(index);
  }
  get f(){
    return this.arearPaymentGroup.controls;
  }
  get formVal(){
    return this.arearPaymentGroup.value;
  }
  get g(){
    return this.employeesForm.controls;
  }
  reset(){
    this.createForm();
    this.employeesForm=this.formBuilder.array([]);
    this.isSubmitted=false;
  }
}
