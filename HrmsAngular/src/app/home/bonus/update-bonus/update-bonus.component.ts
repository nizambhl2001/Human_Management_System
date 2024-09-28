import { AuthService } from './../../../services/auth.service';
import { EmploymentService } from './../../../services/hr/employment.service';
import { ApiResponse } from './../../../models/response.model';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BonusPeriodModel } from '../../../models/bonusPeriod.model';
import { BasicEntry } from '../../../models/system-setup/basic-entry.model';
import { BonuSType } from '../../../models/bonus/bonusType.model';
import { BonusSalaryHeadModel } from '../../../models/bonus/bonus-salary-head.model';
import { BasicEntryService } from '../../../services/system-setup/basic-entry.service';
import { BonusTypeService } from '../../../services/Bonus/bonusType.service';
import { BonusSelectService } from '../../../services/Bonus/bonus-select.service';
import { ToastrService } from 'ngx-toastr';
import { BonusPeriodService } from '../../../services/Bonus/bonus-period.service';
import { UpdateBonusService } from '../../../services/Bonus/update-bonus.service';
import { BonusGridModel } from '../../../models/bonus-grid.model';
import { SearchEmployee } from '../../../models/hr/search-emp.model';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-update-bonus',
  templateUrl: './update-bonus.component.html',
  styleUrls: ['./update-bonus.component.scss',
    '../../../../vendor/libs/angular-2-dropdown-multiselect/angular-2-dropdown-multiselect.scss',
    '../../../../vendor/libs/ng-select/ng-select.scss']
})
export class UpdateBonusComponent implements OnInit {
  gradeValue: number;
  compID: number;
  isSubmitted=false;
  updateFormGroup: FormGroup;
  allBonusPeriod: BonusPeriodModel[] = [];
  allJobType: BasicEntry[] = [];
  allBonusType: BonuSType[] = [];
  allBonusAllowance: BonusSalaryHeadModel[] = [];
  allDepartment: BasicEntry[] = [];
  allDesignation: BasicEntry[] = [];
  allBonus: BonusGridModel[] = [];
  constructor(
    private formBuilder: FormBuilder,
    private basicES: BasicEntryService,
    private BonusTypeES: BonusTypeService,
    private BonusSelectES: BonusSelectService,
    private toasterService: ToastrService,
    private BonusPeriodES: BonusPeriodService,
    private updateBonusES: UpdateBonusService,
    private EmplInfoES: EmploymentService,
    private datePipe:DatePipe
  ) { }

  ngOnInit() {
    this.gradeValue = AuthService.getLoggedGradeValue();
    this.compID = AuthService.getLoggedCompanyId();
    this.AllBonusType();
    this.AllBonusPeriod();
    this.AllDepartment();
    this.AllBonusAllowance();
    this.AllDesignation();
    this.createform();
  }
  AllBonusType() {
    this.BonusTypeES.getBonusType().subscribe((response: ApiResponse) => {
      if (response.status) {
        this.allBonusType = response.result as BonuSType[];
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
  AllDesignation() {
    this.basicES.getDesignation().subscribe((response: ApiResponse) => {
      if (response.status) {
        this.allDesignation = response.result as BasicEntry[];
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
  getEmpInfo(empCode:any) {
    if (this.updateFormGroup.controls.empCode.value == "") {
      this.reset();
      return;
    }
    this.updateFormGroup.controls.empCode.setValue(empCode);
    this.EmplInfoES.getEmployment(empCode, this.compID).subscribe((response: ApiResponse) => {
      if (response.status) {
        let empInfo = response.result as SearchEmployee;
        this.updateFormGroup.patchValue({
          departmentID: empInfo.departmentID,
          designationID: empInfo.designationID,
          grade: empInfo.gradeValue
        })
      }

    })
  }
  getAllUpdateBonus() {
    this.isSubmitted=true;
    if (this.updateFormGroup.invalid) {
      this.toasterService.warning("Fill Form");
      return;
    }
    if(!(this.updateFormGroup.value.periodID>0)){
      this.updateFormGroup.controls.periodID.setValue(-1);
    }
    if(!(this.updateFormGroup.value.salaryHeadID>0)){
      this.updateFormGroup.controls.salaryHeadID.setValue(-1);
    }
    this.updateBonusES.getUpdateBonus(
      this.updateFormGroup.controls.empCode.value,
      this.updateFormGroup.controls.periodID.value,
      this.updateFormGroup.controls.departmentID.value,
      this.updateFormGroup.controls.designationID.value,
      this.updateFormGroup.controls.salaryHeadID.value,
      this.updateFormGroup.controls.companyid.value,
      this.updateFormGroup.controls.grade.value,
      this.updateFormGroup.controls.bonusType.value
    ).subscribe((response: ApiResponse) => {
      if (response.status) {
        this.allBonus = response.result as BonusGridModel[];
        this.isSubmitted=false;
      }
      else {
        this.toasterService.error(response.result);
        this.allBonus=[];
      }
    })
  }
  onChangeAmount(rowIndex:number,amount:number){
    this.allBonus[rowIndex].amount=amount;
    this.allBonus[rowIndex].date=this.datePipe.transform(new Date(), 'yyyyMMdd');
  }
  updateBonus(){
    this.isSubmitted=true;
    if(this.updateFormGroup.invalid || this.allBonus==null){
      this.toasterService.warning("Fill required Fields");
      return;
    }
    else{
    this.updateBonusES.updateBonus(this.allBonus).subscribe((response:ApiResponse)=>{
      if(response.status){
        this.isSubmitted=false;
        this.toasterService.success("SuccessFully Update","Update");
        this.reset();
        this.allBonus=[];
      }
      else{
        this.toasterService.error(response.result);
      }
    })
  }
}
  createform() {
    this.updateFormGroup = this.formBuilder.group({
      empCode: [, [Validators.required]],
      periodID: [, []],
      salaryHeadID: [, []],
      otpp: [, []],
      amount: [, []],
      bonusType: [, [Validators.required]],
      date: [this.datePipe.transform(new Date(), 'yyyyMMdd'), []],
      companyID: [this.compID, []],
      grade: [this.gradeValue, []],
      designation: [, []],
      depertment: [, []],
      accountName: [, []],
      departmentID: [, []],
      designationID: [, []],
      gradeID: [, []],
      jobType: [, []],
      companyid: [this.compID, []],
      bonusGrid: [, []],
    })
  }
  get formVal() {
    return this.updateFormGroup.value;
  }
  reset() {
    this.updateFormGroup.reset();
    this.isSubmitted=false;
  }
get f(){
  return this.updateFormGroup.controls;
}
}
