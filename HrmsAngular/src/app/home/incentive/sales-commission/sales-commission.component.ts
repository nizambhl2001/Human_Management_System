import { AuthService } from './../../../services/auth.service';
import { NgbDateCustomParserFormatter } from './../../../shared/dateformat';
import { Component, OnInit } from '@angular/core';
import { Pagination } from '../../../shared/paginate';
import { BasicEntry } from '../../../models/system-setup/basic-entry.model';
import { BonuSType } from '../../../models/bonus/bonusType.model';
import { BonusPeriodModel } from '../../../models/bonusPeriod.model';
import { BonusSalaryHeadModel } from '../../../models/bonus/bonus-salary-head.model';
import { SearchEmployee } from '../../../models/hr/search-emp.model';
import { BonusGridModel } from '../../../models/bonus-grid.model';
import { FormGroup, FormArray, FormBuilder, FormControl, Validators } from '@angular/forms';
import { BasicEntryService } from '../../../services/system-setup/basic-entry.service';
import { BonusPeriodService } from '../../../services/Bonus/bonus-period.service';
import { BonusTypeService } from '../../../services/Bonus/bonusType.service';
import { BonusSelectService } from '../../../services/Bonus/bonus-select.service';
import { ToastrService } from 'ngx-toastr';
import { EmploymentService } from '../../../services/hr/employment.service';
import { FestivalBonusService } from '../../../services/Bonus/festival-bonus.service';
import { ApiResponse } from '../../../models/response.model';
import { FestivalBonusModel } from '../../../models/bonus/festival-bonus.model';

@Component({
  selector: 'app-sales-commission',
  templateUrl: './sales-commission.component.html',
  styleUrls: ['./sales-commission.component.scss',
  '../../../../vendor/libs/angular-2-dropdown-multiselect/angular-2-dropdown-multiselect.scss',
  '../../../../vendor/libs/ng-select/ng-select.scss']
})
export class SalesCommissionComponent extends Pagination implements OnInit {
  isSubmitted=false;
  compId: number;
  gradeValue: number;
  allDepartment: BasicEntry[] = [];
  allBonusType: BonuSType[] = [];
  allBonusPeriod: BonusPeriodModel[] = [];
  allBonusAllowance: BonusSalaryHeadModel[] = [];
  employment:SearchEmployee[]=[];
  allBonus:BonusGridModel[]=[];
  SalesCommissionForm: FormGroup;
  employeesForm:FormArray;
  constructor(
    private basicES: BasicEntryService,
    private BonusPeriodES: BonusPeriodService,
    private formBuilder: FormBuilder,
    private BonusTypeES: BonusTypeService,
    private BonusSelectES: BonusSelectService,
    private toasterService:ToastrService,
    private empService:EmploymentService,
    private festivalBonusES:FestivalBonusService,
    private dateFormate:NgbDateCustomParserFormatter
  ) {
    super();
    this.employeesForm = this.formBuilder.array([]);
  }
  title="Employee Sales Commission Information";
  ngOnInit() {
    this.items=[];
    this.update();
    this.compId = AuthService.getLoggedCompanyId();
    this.gradeValue = -AuthService.getLoggedGradeValue();
    this.AllBonusType();
    this.AllBonusAllowance();
    this.AllBonusPeriod();
    this.AllDepartment();
    this.createForm();
    this.addRow();
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
  AllDepartment() {
    this.basicES.getDepartment().subscribe((response: ApiResponse) => {
      if (response.status) {
        this.allDepartment = response.result as BasicEntry[];
      }
    })
  }
  getEmployment(empCode:string,rowIndex:number){
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
  })
  }
  save(){
    this.isSubmitted=true;
    if(this.SalesCommissionForm.invalid || this.employeesForm.invalid){
      this.toasterService.warning("Fill Validate Field employee Code and Amount");
      return;
    }
    else{
    let performanmceBonus:FestivalBonusModel=this.SalesCommissionForm.value;
    this.f.date.setValue(this.dateFormate.ngbDateToDate(this.f.dateNgb.value))
    performanmceBonus.date=this.f.date.value;
    performanmceBonus.bonusGrid=this.employeesForm.value;
    this.festivalBonusES.saveFestivalBonus(performanmceBonus).subscribe((response:ApiResponse)=>{
      if(response.status){
        this.toasterService.success("Successfully Save","Success");
        this.reset();
        this.isSubmitted=false;
      }
      else{
        this.toasterService.error(response.result,"Fail")
      }
    })
  }
}
  createForm() {
    this.SalesCommissionForm = this.formBuilder.group({
      periodID: [, [Validators.required]],
      salaryHeadID: [, [Validators.required]],
      otpp: [0, []],
      bonusType: [, [Validators.required]],
      date:[,[]],
      dateNgb: [this.dateFormate.getCurrentNgbDate(), []],
      companyID: [this.compId, []],
      depertment: [, []],
      depertmentID:[,[Validators.required]],
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
        amount: new FormControl(null, [Validators.required])
      })
    )
  }
  removeRow(index:number){
    this.employeesForm.removeAt(index);
  }
  get formVal(){
    return this.SalesCommissionForm.value;
  }
  get f() {
    return this.SalesCommissionForm.controls;
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
