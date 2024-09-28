import { AuthService } from './../../../services/auth.service';
import { SalarySetupService } from './../../../services/SalarySetup/salary-setup.service';
import { Component, OnInit } from '@angular/core';
import { SalaryProcessService } from '../../../services/salary-process/salary-process-service.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { StructureType } from '../../../models/salary-process/structure-type.model';
import { ApiResponse } from '../../../models/response.model';
import { SalaryPeriodModel } from '../../../models/SalarySetup/SalaryPeriod';
import { EmploymentService } from '../../../services/hr/employment.service';
import { Employment } from '../../../models/hr/employment.model';
import { SalaryProcess } from '../../../models/salary-process/salary-process.model';
import { HttpEvent, HttpEventType } from '@angular/common/http';

@Component({
  selector: 'app-salary-process',
  templateUrl: './salary-process.component.html',
  styleUrls: ['./salary-process.component.scss',
    '../../../../vendor/libs/ng-select/ng-select.scss',
    '../../../../vendor/libs/angular2-ladda/ladda.scss']
})
export class SalaryProcessComponent implements OnInit {


  salaryProcessForm: FormGroup;
  salaryStructures: StructureType[] = [];
  salaryPeriod: SalaryPeriodModel[] = [];
  empInfo: Employment[] = [];
  companyId: number;
  isSubmitted = false;
  salaryProcessItem: SalaryProcess[] = [];
  grade: number;
  userTypeID: number;
  salaryTypeId: number;
  processedStatus: string;
  processedEmployees: number = 0;
  constructor(
    private salaryProcessService: SalaryProcessService,
    private salarySetupService: SalarySetupService,
    private formBuilder: FormBuilder,
    private empService: EmploymentService,
    private toaster: ToastrService
  ) { }

  ngOnInit() {
    this.companyId = Number(AuthService.getLoggedCompanyId());
    this.grade = Number(AuthService.getLoggedGradeValue());
    this.userTypeID = Number(AuthService.getLoggedUserTypeId());
    this.salaryTypeId = Number(AuthService.getLoggedCompanySalaryType());
    this.createEmpSalaryForm();
    this.getSalaryStructure();
  }
  getSalaryStructure() {
    this.salaryProcessService.getSalaryTypeList().subscribe((response: ApiResponse) => {
      if (response.status) {
        this.salaryStructures = response.result as StructureType[];
      }
    });
  }
  getEmpInfoById(empCode: string) {
    if (empCode == "") {
      return;
    }
    this.empService.getEmployment(empCode, this.companyId).subscribe((response: ApiResponse) => {
      if (response.status) {
        this.empInfo = response.result as Employment[];

      }
    })
  }
  onSelectPeriod(period: SalaryPeriodModel) {
    if (period != null) {
      this.salaryProcessForm.patchValue({
        periodID: period.id,
        periodName: period.periodName,
        taxYearID: period.taxYearID,
        yearID: period.yearID
      })
    } else {
      this.salaryProcessForm.patchValue({
        periodID: null,
        periodName: null,
        taxYearID: null,
        yearID: null
      })
    }
  }
  salaryProcess() {
    this.isSubmitted = true;
    if (this.salaryProcessForm.invalid) {
      return;
    }
    console.log(this.salaryProcessForm.value);
    this.salaryProcessService.getSalaryProcessInfo(this.salaryProcessForm.value).subscribe(
      (event: HttpEvent<any>) => {
        console.log(event)
        switch (event.type) {
          
          case HttpEventType.Response:
            if (event.body.status) {
              this.processedEmployees = event.body.result;
              this.processedStatus = `Salary Processed for ${event.body.result} Employees`
              this.toaster.success('Salary Processed for ' + event.body.result + ' Employees', "Processed!")
            } else {
              this.processedEmployees = 0;
              this.processedStatus = `Failed! ${event.body.result}`
              this.toaster.error(event.body.result, "Failed");
            }
            this.isSubmitted = false;
        }
      },
      err => {
        this.isSubmitted = false;
        console.log(err)
      });
  }

  createEmpSalaryForm() {
    this.salaryProcessForm = this.formBuilder.group({
      id: [0, []],
      periodID: [null, [Validators.required]],
      structureID: [, [Validators.required]],
      empCode: [, []],
      companyID: [this.companyId, []],
      grade: [this.grade, []],
      userTypeID: [this.userTypeID, []],
      salaryTypeID: [this.salaryTypeId, []],
      periodName: [, []],
      taxYearID: [, []],
      yearID: [, []]
    })
  }
  get f() {
    return this.salaryProcessForm.controls;
  }
  Reset() {
    this.isSubmitted = false;
    this.createEmpSalaryForm();
    this.processedStatus = null;
  }
  closeAlert() {
    this.processedStatus = null;
  }
}
