import { AuthService } from './../../../services/auth.service';
import { SalarySetupService } from './../../../services/SalarySetup/salary-setup.service';
import { DeductionService } from './../../../services/Deduction/deduction.service';
import { DriverAllowace } from './../../../models/Addition/driver-addition-allowance.model';
import { BasicEntryService } from './../../../services/system-setup/basic-entry.service';
import { AllDeduction } from './../../../models/Deduction/all-deduction.model';
import { SalaryPeriodModel } from './../../../models/SalarySetup/SalaryPeriod';
import { ApiResponse } from './../../../models/response.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Pagination } from '../../../shared/paginate';
import { BasicEntry } from '../../../models/system-setup/basic-entry.model';
import { SalaryHead } from '../../../models/SalarySetup/salary-head';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-salary-deduct',
  templateUrl: './salary-deduct.component.html',
  styleUrls: ['./salary-deduct.component.scss', '../../../../vendor/libs/ng-select/ng-select.scss']
})
export class SalaryDeductComponent extends Pagination implements OnInit {

  constructor(private formBuilder: FormBuilder,

    private deductService: DeductionService,
    private basicEntryService: BasicEntryService,
    private salarySetupService: SalarySetupService,
    private toaster: ToastrService

  ) {
    super();
  }
  title = "Employee Salary Deduct";
  salaryDeductForm: FormGroup;
  salaryPeriodModel: SalaryPeriodModel[] = [];
  slarydeductshow: AllDeduction[] = [];
  departments: BasicEntry[] = [];
  allSalarydept: AllDeduction[] = [];
  deptsaldeduct: AllDeduction[] = [];
  btnStatus = 'Save';
  salaryHeadModel: SalaryHead[] = [];
  companyID: number;
  isSubmitted = false;
  grade: number;
  userTypeID: number;
  isLoading: boolean = false;

  ngOnInit() {
    this.items = [];
    this.update();
    this.companyID = AuthService.getLoggedCompanyId();
    this.grade = AuthService.getLoggedGradeValue();
    this.userTypeID = AuthService.getLoggedUserTypeId();
    this.createForm();
    this.getAllSalPeriod();
    this.getDepartmentName();
    this.getSalaryHead();
  }
  getAllSalPeriod() {
    this.salarySetupService.getAllperiod().subscribe((response: ApiResponse) => {
      if (response.status) {
        this.salaryPeriodModel = response.result as SalaryPeriodModel[];
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
  onDepartmentSelect(deptName: string) {
    let salarydeuctdept = this.allSalarydept.filter(c => c.department == deptName);
    this.slarydeductshow = salarydeuctdept;

  }


  getSalaryHead() {
    this.salarySetupService.getAllSalaryHead().subscribe((response: ApiResponse) => {
      if (response.status) {
        let allSalaryHead: SalaryHead[] = response.result as SalaryHead[];
        this.salaryHeadModel = allSalaryHead.filter(c => c.id == 19 || c.id == 23 || c.id == 24);
      }
    })
  }
  getAll() {
    this.isSubmitted = true;
    if (this.f.periodID.invalid && this.f.salaryHeadID.invalid) {
      this.toaster.error("Please fill all required fields", "Invalid submition");
      return;
    } else {
      this.isLoading = true;
      let salaryDeductparameter = new AllDeduction();
      salaryDeductparameter = this.salaryDeductForm.value;
      const period = this.salaryPeriodModel.find(c => c.id == this.f.periodID.value);
      salaryDeductparameter.taxYearID = period.taxYearID;
      salaryDeductparameter.yearID = period.yearID;
      salaryDeductparameter.periodName = period.periodName;
      this.deductService.getAllSalaryDeduction(salaryDeductparameter).subscribe((response: ApiResponse) => {
        if (response.status) {
          this.slarydeductshow = response.result as AllDeduction[];
          this.allSalarydept = response.result as AllDeduction[];
        }
        else{
          this.slarydeductshow = [];
          this.allSalarydept = [];
        }
        this.isLoading = false;
      },err=>{
        this.isLoading  =false;
        this.toaster.error(err.message)
      })
    }

  }
  SaveUpdate() {
    this.isSubmitted = true;
    if (this.slarydeductshow.length == 0) {
      this.toaster.warning("No Data Loaded");
      if (this.f.periodID.invalid && this.f.salaryHeadID.invalid) {
        this.toaster.error("Please fill all the required fields", "Invalid Submission");
        return;
      }
      return;
    }
    let salaryDeduct = new AllDeduction();
    salaryDeduct = this.salaryDeductForm.value;
    salaryDeduct.taxYearID = this.salaryPeriodModel.find(c => c.id == this.f.periodID.value).taxYearID;
    salaryDeduct.yearID = this.salaryPeriodModel.find(c => c.id == this.f.periodID.value).yearID;
    salaryDeduct.periodName = this.salaryPeriodModel.find(c => c.id == this.f.periodID.value).periodName;
    salaryDeduct.selectedDriver = this.allSalarydept;
    this.deductService.saveupdateSalaryDeduction(salaryDeduct).subscribe((response: ApiResponse) => {
      if (response.status) {
        this.toaster.success("Saved Successfully", "Success!");
        this.reset();
      } else {
        this.toaster.error(response.result, "Failed!");
      }
    })
  }

  removeDriver(empCode: string) {
    let index = this.slarydeductshow.findIndex(c => c.empCode == empCode);
    this.slarydeductshow.splice(index, 1);

  }

  reset() {
    this.isSubmitted = false;
    this.salaryDeductForm.reset();
    this.createForm();
    this.slarydeductshow = [];
  }

  createForm() {
    this.salaryDeductForm = this.formBuilder.group({
      id: [0, []],
      salaryHeadID: [, [Validators.required]],
      periodID: [, [Validators.required]],
      grade: [this.grade, []],
      userTypeID: [this.userTypeID, []],
      companyID: [this.companyID, []],
      department: [, []]
    })
  }
  get f() {
    return this.salaryDeductForm.controls;
  }
}
