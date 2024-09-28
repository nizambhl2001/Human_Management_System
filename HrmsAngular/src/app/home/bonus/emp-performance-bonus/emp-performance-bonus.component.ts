import { AuthService } from './../../../services/auth.service';
import { ApiResponse } from './../../../models/response.model';
import { EmploymentService } from './../../../services/hr/employment.service';
import { GroupComponent } from './../../system-setup/group/group.component';
import { FormGroup, FormBuilder, FormArray, FormControl, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { BasicEntry } from '../../../models/system-setup/basic-entry.model';
import { BonuSType } from '../../../models/bonus/bonusType.model';
import { BonusSalaryHeadModel } from '../../../models/bonus/bonus-salary-head.model';
import { BonusPeriodModel } from '../../../models/bonusPeriod.model';
import { BasicEntryService } from '../../../services/system-setup/basic-entry.service';
import { BonusTypeService } from '../../../services/Bonus/bonusType.service';
import { BonusSelectService } from '../../../services/Bonus/bonus-select.service';
import { BonusPeriodService } from '../../../services/Bonus/bonus-period.service';
import { SearchEmployee } from '../../../models/hr/search-emp.model';
import { BonusGridModel } from '../../../models/bonus-grid.model';
import { FestivalBonusService } from '../../../services/Bonus/festival-bonus.service';
import { ToastrService } from 'ngx-toastr';
import { FestivalBonusModel } from '../../../models/bonus/festival-bonus.model';

@Component({
  selector: 'app-emp-performance-bonus',
  templateUrl: './emp-performance-bonus.component.html',
  styleUrls: ['./emp-performance-bonus.component.scss',
    '../../../../vendor/libs/angular-2-dropdown-multiselect/angular-2-dropdown-multiselect.scss',
    '../../../../vendor/libs/ng-select/ng-select.scss']
})
export class EmpPerformanceBonusComponent implements OnInit {
  compId: number;
  isSubmitted=false;
  gradeValue: number;
  allDepartment: BasicEntry[] = [];
  allBonusType: BonuSType[] = [];
  allBonusPeriod: BonusPeriodModel[] = [];
  allBonusAllowance: BonusSalaryHeadModel[] = [];
  employment:SearchEmployee[]=[];
  allBonus:BonusGridModel[]=[];
  empCode:string;
  performanceBonusForm: FormGroup;
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
  ) {
    this.employeesForm = this.formBuilder.array([]);
  }

  ngOnInit() {
    this.compId = AuthService.getLoggedCompanyId();
    this.gradeValue = AuthService.getLoggedGradeValue();
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
    if(empCode==""){
      this.employeesForm.controls[rowIndex].patchValue({
        empCode:null,
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
        empCode:null,
        empName:null,
        department:null,
        designation:null
      })
    }
  })
  }
  save(){
    this.isSubmitted=true;
    if(this.performanceBonusForm.invalid || this.employeesForm.invalid){
      this.toasterService.warning("Fill Required Field With Grid EmpCode And Amount");
    }
    else{
    let performanmceBonus:FestivalBonusModel=this.performanceBonusForm.value;
    performanmceBonus.bonusGrid=this.employeesForm.value;
    this.festivalBonusES.saveFestivalBonus(performanmceBonus).subscribe((response:ApiResponse)=>{
      if(response.status){
        this.toasterService.success("Successfully Save","Success");
        this.employeesForm=this.formBuilder.array([]);
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
    this.performanceBonusForm = this.formBuilder.group({
      periodID: [, [Validators.required]],
      salaryHeadID: [, [Validators.required]],
      otpp: [0, []],
      bonusType: [, [Validators.required]],
      date: [new Date(), []],
      companyID: [this.compId, []],
      depertment: [, []],
      depertmentID:[,[]],
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

  get f() {
    return this.performanceBonusForm.controls;
  }
  get emp(){
    return this.employeesForm.controls;
  }
  get arryF(){
    return this.employeesForm.controls;
  }
  get formVal(){
    return this.performanceBonusForm.value;
  }
  get empFormVal(){
    return this.employeesForm.value;
  }
  reset(){
    this.createForm();
    this.employeesForm=this.formBuilder.array([]);
  }
}
