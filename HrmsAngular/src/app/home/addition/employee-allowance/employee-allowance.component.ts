import { AuthService } from './../../../services/auth.service';
import { id } from '@swimlane/ngx-datatable/release/utils';
import { SalarySetupService } from './../../../services/SalarySetup/salary-setup.service';
import { AllDeduction } from './../../../models/Deduction/all-deduction.model';

import { BasicEntryService } from './../../../services/system-setup/basic-entry.service';
import { DriverAllowace } from './../../../models/Addition/driver-addition-allowance.model';
import { ApiResponse } from './../../../models/response.model';
import { AdditionAllowanceService } from './../../../services/Addition/addition-allowance.service';
import { Component, OnInit } from '@angular/core';
import { Pagination } from '../../../shared/paginate';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AdditionAllowance } from '../../../models/Addition/addition-allowance.model';
import { SalaryPeriodModel } from '../../../models/SalarySetup/SalaryPeriod';
import { BasicEntry } from '../../../models/system-setup/basic-entry.model';
import { SalaryHead } from '../../../models/SalarySetup/salary-head';
import { ToastrService } from 'ngx-toastr';




@Component({
  selector: 'app-employee-allowance',
  templateUrl: './employee-allowance.component.html',
  styleUrls: ['./employee-allowance.component.scss', '../../../../vendor/libs/ng-select/ng-select.scss']
})
export class EmployeeAllowanceComponent extends Pagination implements OnInit {

  constructor(
    private formBuilder: FormBuilder,
    private additionAllowanceService: AdditionAllowanceService,
    private salaryPeriodService: SalarySetupService,
    private basicEntryService: BasicEntryService,
    private toaster: ToastrService
  ) {
    super();
  }

  title = "Addition Allowance";
  companyID: number;
  additionAllowance: AdditionAllowance[] = [];
  salaryPeriod: SalaryPeriodModel[] = [];
  additionAllowanceForm: FormGroup;
  additionshowdata: AdditionAllowance[] = [];
  departments: BasicEntry[] = [];
  allSalaryHead: SalaryHead[] = [];
  allAdditionAllowance: AdditionAllowance[] = [];
  btnStatus = 'Save';
  grade: number;
  isGetAllBtnClick = false;
  isSaveBtnClick = false;


  ngOnInit() {
    this.items = [];
    this.update();
    this.companyID = AuthService.getLoggedCompanyId();
    this.grade = AuthService.getLoggedGradeValue();
    this.createForm();
    this.getSalaryPeriod();
    this.getDepartmentName();
    this.getSalaryHead();

  }
  getSalaryPeriod() {
    this.salaryPeriodService.getAllperiod().subscribe((response: ApiResponse) => {
      if (response.status) {
        this.salaryPeriod = response.result as SalaryPeriodModel[];
      }
    })
  }

  getSalaryHead() {
    this.additionAllowanceService.getAllSalaryHeadType().subscribe((response: ApiResponse) => {
      if (response.status) {
        this.allSalaryHead = response.result as SalaryHead[];
      }
    })
  }
  getDepartmentName() {
    this.basicEntryService.getDepartment().subscribe((response: ApiResponse) => {
      if (response.status) {
        this.departments = response.result as BasicEntry[];
      }
    })
  }
  GetAll() {
    this.isGetAllBtnClick = true;
    if (this.f.periodID.invalid || this.f.salaryHeadID.invalid) {
      this.toaster.error("Please fill all required fields", "Invalid submition");
      return;
    }
    let addAllowance = new AdditionAllowance();
    addAllowance = this.additionAllowanceForm.value;
    addAllowance.taxYearID = this.salaryPeriod.find(c => c.id == this.f.periodID.value).taxYearID;
    addAllowance.yearID = this.salaryPeriod.find(c => c.id == this.f.periodID.value).yearID;
    addAllowance.periodName = this.salaryPeriod.find(c => c.id == this.f.periodID.value).periodName;
    this.additionAllowanceService.getAllEmployeeAllowance(addAllowance).subscribe((response: ApiResponse) => {
      if (response.status) {
        this.additionshowdata = response.result as AdditionAllowance[];
        this.allAdditionAllowance = response.result as AdditionAllowance[];
      }
      else{
        this.toaster.error("No Data Found");
      }
    })
  }
  SaveUpdate() {
    this.isGetAllBtnClick = true;
    if (this.additionAllowanceForm.invalid) {
      this.toaster.error("Please fill all required fields", "Invalid submition");
      return;
    }
    let empallowance = new AdditionAllowance();
    empallowance = this.additionAllowanceForm.value;
    empallowance.taxYearID = this.salaryPeriod.find(c => c.id == this.f.periodID.value).taxYearID;
    empallowance.yearID = this.salaryPeriod.find(c => c.id == this.f.periodID.value).yearID;
    empallowance.periodName = this.salaryPeriod.find(c => c.id == this.f.periodID.value).periodName;
    empallowance.selectedDriver = this.allAdditionAllowance;
    this.additionAllowanceService.saveupdateEmployeeAllowance(empallowance).subscribe((response: ApiResponse) => {
      if (response.status) {
        this.toaster.success("Saved Successfully", "Success!");
        this.reset();
      } else {
        this.toaster.error(response.result, "Failed!");
      }
    })
  }

  removeDriver(empCode: string) {
    let index = this.allAdditionAllowance.findIndex(c => c.empCode == empCode);
    this.allAdditionAllowance.splice(index, 1);
  }

  reset() {
    this.isGetAllBtnClick = false;
    this.createForm();
    this.additionAllowanceForm.reset();
    this.createForm();
    this.btnStatus = 'Save';
    this.additionshowdata = [];
  }
  createForm() {
    this.additionAllowanceForm = this.formBuilder.group({
      id: [0, []],
      empID: [0, []],
      salaryHeadID: [, [Validators.required]],
      periodID: [, [Validators.required]],
      companyID: [this.companyID, []],
      grade: [this.grade, []],
      department: [, []]
    })
  }
  get f() {
    return this.additionAllowanceForm.controls;
  }

}
