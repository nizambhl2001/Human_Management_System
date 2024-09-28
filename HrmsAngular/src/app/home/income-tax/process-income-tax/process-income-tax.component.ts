import { AuthService } from './../../../services/auth.service';
import { SalarySetupService } from './../../../services/SalarySetup/salary-setup.service';
import { Component, OnInit } from '@angular/core';
import { TaxYearInfoService } from '../../../services/incomeTax/tax-year-info.service';
import { SalaryPeriodModel } from '../../../models/SalarySetup/SalaryPeriod';
import { ApiResponse } from '../../../models/response.model';
import { TaxYearInfo } from '../../../models/incomeTax/tax-year-info.model';
import { ProcessIncomeTax } from '../../../models/incomeTax/process-incometax.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProcessIncomeTaxParameter } from '../../../models/incomeTax/process-income-tax-parameter.model';
import { ToastrService } from 'ngx-toastr';
import { EmployeeService } from '../../../services/hr/employee.service';
import { interval } from 'rxjs';

@Component({
  selector: 'app-process-income-tax',
  templateUrl: './process-income-tax.component.html',
  styleUrls: ['./process-income-tax.component.scss',
    '../../../../vendor/libs/ng-select/ng-select.scss',
    '../../../../vendor/libs/angular2-ladda/ladda.scss'
  ]
})
export class ProcessIncomeTaxComponent implements OnInit {


  allSalaryPeriod: SalaryPeriodModel[] = [];
  yearWiseSalaryPeriod: SalaryPeriodModel[] = [];
  taxYear: TaxYearInfo[] = [];
  processIncomeTaxModel: ProcessIncomeTax[] = [];
  processIncomeTaxParameter: ProcessIncomeTaxParameter[] = [];
  processIncomeTaxForm: FormGroup;
  companyId: number;
  gradeId: number;
  userTypeId: number;
  salaryTypeId: number;
  isSubmitted = false;

  preProcessing: boolean = false;
  processing: boolean = false;
  isReadyToProcess: boolean = false;
  isProcessed: boolean = false;
  processedStatus: string;
  preProcessStatus: string;
  percentOfProcess: number = 0;
  constructor(
    private taxService: TaxYearInfoService,
    private salarySetupService: SalarySetupService,
    private formBuilder: FormBuilder,
    private toaster: ToastrService
  ) { }


  ngOnInit() {
    this.companyId = AuthService.getLoggedCompanyId();
    this.gradeId = AuthService.getLoggedGradeValue();
    this.userTypeId = AuthService.getLoggedUserTypeId();
    this.salaryTypeId = AuthService.getLoggedCompanySalaryType();
    this.createTaxProcessForm();
    this.getSalaryPeriodList();
    this.getAllYearList();
    this.getName_EmpCode();

  }
  getSalaryPeriodList() {
    this.salarySetupService.getAllperiod().subscribe((response: ApiResponse) => {
      if (response.status) {
        this.allSalaryPeriod = response.result as SalaryPeriodModel[];
        this.yearWiseSalaryPeriod = response.result as SalaryPeriodModel[];
      }

    })
  }
  periodGetById(period: any) {
    this.salarySetupService.getByIdSalaryPeriod(period.id).subscribe((response: ApiResponse) => {
      if (response.status) {
        let period = response.result as any;
        this.processIncomeTaxForm.controls.periodName.setValue(period.periodName);
      }
    })
  }
  getAllYearList() {
    this.taxService.getAllYearList().subscribe((response: ApiResponse) => {
      if (response.status) {
        this.taxYear = response.result as TaxYearInfo[];
      } else {
        this.taxYear = [];
      }
    })
  }
  onSelectYear(taxYear) {
    if (taxYear) {
      let periods = this.allSalaryPeriod.filter(c => c.taxYearID == taxYear.id);
      this.yearWiseSalaryPeriod = periods;
    } else {
      this.yearWiseSalaryPeriod = this.allSalaryPeriod;
    }
  }
  getName_EmpCode() {
    this.taxService.getAllName_EmpCode().subscribe((respon: ApiResponse) => {
      if (respon.status) {
        this.processIncomeTaxModel = respon.result as ProcessIncomeTax[];
      } else {
        this.processIncomeTaxModel = [];
      }
    })
  }
  preProcess() {
    this.isSubmitted = true;
    if (this.processIncomeTaxForm.invalid) {
      this.toaster.warning("Fill Required Fields");
    } else {
      this.preProcessing = true;

      this.percentOfProcess = 0;
      var el = document.getElementById('progressBar');
      el.classList.add('progress-bar-animated')
      el.style.width = this.percentOfProcess + '%';
      let timerId = setInterval(() => {
        this.percentOfProcess += 1;
        el.style.width = this.percentOfProcess + '%';
      }, 4600);
      var timeOutId = setTimeout(() => {
        clearInterval(timerId);
        el.classList.remove('progress-bar-animated')
      }, 420000);

      this.taxService.preProcessTax(this.processIncomeTaxForm.value).subscribe((response: ApiResponse) => {
        this.preProcessing = false;
        this.isReadyToProcess = response.status;
        this.preProcessStatus = response.result;
        if (response.status) {
          this.toaster.success(response.result, "Success");
          clearInterval(timerId);
          clearTimeout(timeOutId);
          this.percentOfProcess = 100;
          el.classList.remove('progress-bar-animated')
        }
        else {
          this.toaster.error(response.result, "Failed!");
          clearInterval(timerId);
          clearTimeout(timeOutId);
          el.classList.remove('progress-bar-animated')
        }
      },
        err => {
          this.preProcessing = false;
          console.log(err)
          clearInterval(timerId);
          clearTimeout(timeOutId);
          el.classList.remove('progress-bar-animated')
        }
      )
    }
  }
  process() {
    this.isSubmitted = true;
    if (!this.isReadyToProcess) {
      this.toaster.error('Tax is not ready to process!');
      return;
    }
    if (this.processIncomeTaxForm.invalid) {
      this.toaster.error("Fill Required Fields", 'Invalid Submission!');
      return;
    }
    this.percentOfProcess = 0;
    var el = document.getElementById('progressBar');
    el.classList.add('progress-bar-animated')
    el.style.width = this.percentOfProcess + '%';
    let timerId = setInterval(() => {
      this.percentOfProcess += 1;
      el.style.width = this.percentOfProcess + '%';
    }, 8600);
    var timeOutId = setTimeout(() => {
      clearInterval(timerId);
      el.classList.remove('progress-bar-animated')
    }, 780000);

    this.processing = true;
    this.processIncomeTaxForm.patchValue({ empCode: -1 });
    this.taxService.processIncomeTax(this.processIncomeTaxForm.value).subscribe((response: ApiResponse) => {
      this.processing = false;
      this.isProcessed = response.status;
      this.processedStatus = response.result
      if (response.status) {
        this.toaster.success(response.result, "Success");
        clearInterval(timerId);
        clearTimeout(timeOutId);
        this.percentOfProcess = 100;
        el.classList.remove('progress-bar-animated')
      }
      else {
        this.toaster.error(response.result, "Failed!!")
        clearInterval(timerId);
        clearTimeout(timeOutId);
        el.classList.remove('progress-bar-animated')
      }
    }, err => {
      this.processing = false;
      clearInterval(timerId);
      clearTimeout(timeOutId);
      el.classList.remove('progress-bar-animated')
    })
  }
  createTaxProcessForm() {
    this.processIncomeTaxForm = this.formBuilder.group({
      periodID: [, [Validators.required]],
      taxYearID: [, [Validators.required]],
      companyID: [this.companyId, []],
      grade: [this.gradeId, []],
      userTypeID: [this.userTypeId, []],
      salaryType: [this.salaryTypeId, []],
      empCode: [, []],
      empName: [, []],
      periodName: [, []]
    })
  }
  get f() {
    return this.processIncomeTaxForm.controls;
  }
  reset() {
    this.isSubmitted = false;
    this.processIncomeTaxForm.reset();
    this.createTaxProcessForm();

    this.percentOfProcess = 0;
    var el = document.getElementById('progressBar');
    el.style.width = '0%';
  }
  closeAlert(alertName) {
    if (alertName == 'preProcess') {
      this.preProcessStatus = null;
    } if (alertName == 'process') {
      this.processedStatus = null;
      this.isProcessed = false;
    }
  }
}
