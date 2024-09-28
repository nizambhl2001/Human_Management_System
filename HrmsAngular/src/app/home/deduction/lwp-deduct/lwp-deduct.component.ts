import { AuthService } from './../../../services/auth.service';
import { SalarySetupService } from './../../../services/SalarySetup/salary-setup.service';
import { DeductionService } from './../../../services/Deduction/deduction.service';
import { BasicEntryService } from './../../../services/system-setup/basic-entry.service';
import { SalaryPeriodModel } from './../../../models/SalarySetup/SalaryPeriod';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { DriverAllowace } from './../../../models/Addition/driver-addition-allowance.model';
import { Component, OnInit } from '@angular/core';
import { Pagination } from '../../../shared/paginate';
import { ApiResponse } from '../../../models/response.model';
import { LWPDeduct } from '../../../models/Deduction/lwp-deduct.model';
import { BasicEntry } from '../../../models/system-setup/basic-entry.model';
import { ToastrService } from 'ngx-toastr';
import { NgbDateCustomParserFormatter } from '../../../shared/dateformat';

@Component({
  selector: 'app-lwp-deduct',
  templateUrl: './lwp-deduct.component.html',
  styleUrls: ['./lwp-deduct.component.scss', '../../../../vendor/libs/ng-select/ng-select.scss']
})
export class LwpDeductComponent extends Pagination implements OnInit {

  constructor(
    private deductService: DeductionService,
    private formBuilder: FormBuilder,
    private salarySetupService: SalarySetupService,
    private basicEntryService: BasicEntryService,
    private toaster: ToastrService,
    private dateFrmat: NgbDateCustomParserFormatter,
  ) {
    super();
  }
  title = "Employee LWP Deduct";
  lwpdeductshow: LWPDeduct[] = [];
  alllwpdept: LWPDeduct[] = [];
  lwpDeductForm: FormGroup;
  companyID: number;
  salaryPeriodModel: SalaryPeriodModel[] = [];
  departments: BasicEntry[] = [];
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
    let lwpdeductdept = this.alllwpdept.filter(c => c.department == deptName);
    this.lwpdeductshow = lwpdeductdept;
  }

  GetAll() {
    this.isSubmitted = true;
    if (this.f.periodID.invalid && this.f.startDateNgb.invalid && this.f.enddateNgb.invalid) {
      this.toaster.error("Please fill all the fileds", "Invalid Submission");
      return;
    } else {
      this.isLoading = true;
      let lwpDeductparameter = new LWPDeduct();
      lwpDeductparameter = this.lwpDeductForm.value;
      const period = this.salaryPeriodModel.find(c => c.id == this.f.periodID.value);
      lwpDeductparameter.taxYearID = period.taxYearID;
      lwpDeductparameter.yearID = period.yearID;
      lwpDeductparameter.periodName = period.periodName;
      this.deductService.getAllLWPdeduction(lwpDeductparameter).subscribe((response: ApiResponse) => {
        if (response.status) {
          this.lwpdeductshow = response.result as LWPDeduct[];
          this.alllwpdept = response.result as LWPDeduct[];
        }
        else {
          this.lwpdeductshow = [];
          this.alllwpdept = [];
        }
        this.isLoading = false;
      },err=>{
        this.isLoading = false;
        this.toaster.error(err.message)
      })
    }

  }
  removeDriver(empCode: string) {
    let index = this.lwpdeductshow.findIndex(c => c.empCode == empCode);
    this.lwpdeductshow.splice(index, 1);
  }

  SaveUpdate() {
    this.isSubmitted = true;
    if (this.lwpdeductshow.length == 0) {
      this.toaster.warning("No Data Loaded");
      if (this.f.periodID.invalid && this.f.startDateNgb.invalid && this.f.enddateNgb.invalid) {
        this.toaster.error("Please fill all the fileds", "Invalid Submission");
        return;
      }
    } else {
      let lwpdeduct = new LWPDeduct();
      lwpdeduct = this.lwpDeductForm.value;
      lwpdeduct.taxYearID = this.salaryPeriodModel.find(c => c.id == this.f.periodID.value).taxYearID;
      lwpdeduct.yearID = this.salaryPeriodModel.find(c => c.id == this.f.periodID.value).yearID;
      lwpdeduct.periodName = this.salaryPeriodModel.find(c => c.id == this.f.periodID.value).periodName;
      lwpdeduct.selectedDriver = this.lwpdeductshow;
      this.deductService.saveupdateLWPDeduction(lwpdeduct).subscribe((response: ApiResponse) => {
        if (response.status) {
          this.toaster.success("Saved Successfully", "Success!");
          this.GetAll();
          this.reset();
        } else {
          this.toaster.error(response.result, "Failed!");
        }
      })
    }

  }
  reset() {
    this.isSubmitted = false;
    this.lwpDeductForm.reset();
    this.createForm();
    this.lwpdeductshow = [];
    this.alllwpdept = [];
  }
  createForm() {
    this.lwpDeductForm = this.formBuilder.group({
      id: [0, []],
      periodID: [, [Validators.required]],
      grade: [this.grade, []],
      department: [, []],
      companyID: [this.companyID, []],
      strDate: [, []],
      startDateNgb: [, [Validators.required]],
      enddate: [, []],
      enddateNgb: [, [Validators.required]],


    })
  }
  get f() {
    return this.lwpDeductForm.controls;
  }
}
