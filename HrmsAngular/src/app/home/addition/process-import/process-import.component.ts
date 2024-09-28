import { AuthService } from './../../../services/auth.service';
import { type } from 'os';
import { SalarySetupService } from './../../../services/SalarySetup/salary-setup.service';
import { AdditionAllowanceService } from './../../../services/Addition/addition-allowance.service';
import { DriverAllowace } from './../../../models/Addition/driver-addition-allowance.model';
import { ProccessImport } from './../../../models/Addition/proccess-import.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiResponse } from './../../../models/response.model';
import { SalaryHead } from './../../../models/SalarySetup/salary-head';
import { Component, OnInit } from '@angular/core';
import { Pagination } from '../../../shared/paginate';
import { SalaryPeriodModel } from '../../../models/SalarySetup/SalaryPeriod';

import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-process-import',
  templateUrl: './process-import.component.html',
  styleUrls: ['./process-import.component.scss', '../../../../vendor/libs/ng-select/ng-select.scss']
})
export class ProcessImportComponent extends Pagination implements OnInit {

  constructor(

    private additionAllowanceService: AdditionAllowanceService,
    private salarySetupService: SalarySetupService,
    private formBuilder: FormBuilder,
    private toaster: ToastrService
  ) {
    super();
  }
  title = "Process Employee Imported Salary";
  salaryPeriodModel: SalaryPeriodModel[] = [];
  allsalaryHeadModel: SalaryHead[] = [];
  companyID: number;
  processImportform: FormGroup
  processImportModel: ProccessImport[] = [];
  btnStatus = 'Save'
  salarytype: number;
  driverAllowanceModel: ProccessImport[] = [];
  remobableItem: ProccessImport[] = [];
  isSubmitted = false;
  grade: number;
  userTypeID: number;
  isLoading:boolean = false;


  ngOnInit() {
    this.items = [];
    this.update();
    this.companyID = AuthService.getLoggedCompanyId();
    this.grade = AuthService.getLoggedGradeValue();
    this.userTypeID = AuthService.getLoggedUserTypeId();
    this.createForm();
    this.getPeriod();
    this.searchKeys = ['empCode'];

  }
  getPeriod() {
    this.salarySetupService.getAllperiod().subscribe((response: ApiResponse) => {
      if (response.status) {
        this.salaryPeriodModel = response.result as SalaryPeriodModel[];
      }
    })
  }

  onSelectSalaryHead() {
    if (this.f.periodID.value != null) {
      this.additionAllowanceService.getImpotedSalaryHead(this.f.periodID.value, this.companyID).subscribe((response: ApiResponse) => {
        if (response.status) {
          this.allsalaryHeadModel = response.result as SalaryHead[];

        }
      })
    }

  }
  getAll() {
    this.isSubmitted = true;
    if (this.f.periodID.invalid) {
      this.toaster.error("Please fill all required fields", "Invalid submission");
      return;
    }
    this.isLoading = true;
    let procImportparameter = new ProccessImport();
    procImportparameter = this.processImportform.value;
    const period = this.salaryPeriodModel.find(c => c.id == this.f.periodID.value);
    procImportparameter.taxYearID = period.taxYearID;
    procImportparameter.periodName = period.periodName;
    procImportparameter.yearID = period.yearID;
    this.additionAllowanceService.getAllprocessImport(
      {...procImportparameter,
      userTypeId:AuthService.getLoggedUserTypeId()}
      ).subscribe((response: ApiResponse) => {
      if (response.status) {
        this.processImportModel = response.result as ProccessImport[];
        this.remobableItem = response.result as ProccessImport[];
      }
      else {
        this.processImportModel = [];
        this.remobableItem = [];
      }
      this.isLoading = false;
    },err=>{
      this.isLoading = false;
      this.toaster.error(err.message)
    })

  }
  removeDriver(empCode: string) {
    let index = this.remobableItem.findIndex(c => c.empCode == empCode);
    this.remobableItem.splice(index, 1);
  }
  save() {
    this.isSubmitted = true;
    if (this.f.periodID.invalid) {
      this.toaster.error("Please fill all required fields", "Invalid submission");
      return;
    }
    let procImpt: ProccessImport = new ProccessImport();
    procImpt = this.processImportform.value;
    const period = this.salaryPeriodModel.find(c => c.id == this.f.periodID.value);
    procImpt.taxYearID = period.taxYearID;
    procImpt.periodName = period.periodName;
    procImpt.yearID = period.yearID;
    procImpt.selectedDriver = this.remobableItem;
    let type = this.allsalaryHeadModel.find(c => c.id == this.f.salaryHeadID.value).salaryHeadType;

    this.additionAllowanceService.saveUpdateProcessImport(procImpt, type).subscribe((response: ApiResponse) => {
      if (response.status) {
        this.toaster.success("Saved Successfully", "Success!");
        this.reset();
        //this.getAll();
      } else {
        this.toaster.error(response.result, "Failed!");
      }
    })
  }
  reset() {
    this.isSubmitted = false;
    this.processImportform.controls['periodID'].reset();
    this.processImportform.controls['salaryHeadID'].reset();

  }
  createForm() {
    this.processImportform = this.formBuilder.group({
      id: [0, []],
      salaryHeadID: [, [Validators.required]],
      periodID: [, [Validators.required]],
      companyID: [this.companyID, []],
      grade: [this.grade, []],


    })
  }
  get f() {
    return this.processImportform.controls;
  }
}


