import { AuthService } from './../../../services/auth.service';
import { BonusSalaryHeadModel } from './../../../models/bonus/bonus-salary-head.model';
import { ApiResponse } from './../../../models/response.model';
import { BonusTypeService } from './../../../services/Bonus/bonusType.service';
import { BonuSType } from './../../../models/bonus/bonusType.model';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BasicEntry } from '../../../models/system-setup/basic-entry.model';
import { EmpTypeModel } from '../../../models/system-setup/EmpType.model';
import { BasicEntryService } from '../../../services/system-setup/basic-entry.service';
import { EmpTypeService } from '../../../services/system-setup/EmpType.service';
import { BonusSetupModel } from '../../../models/bonus/bonus-setup.model';
import { BonusSelectService } from '../../../services/Bonus/bonus-select.service';
import { ToastrService } from 'ngx-toastr';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { NgbDateCustomParserFormatter } from '../../../shared/dateformat';

@Component({
  selector: 'app-bonus-setup',
  templateUrl: './bonus-setup.component.html',
  styleUrls: ['./bonus-setup.component.scss',
    '../../../../vendor/libs/angular-2-dropdown-multiselect/angular-2-dropdown-multiselect.scss',
    '../../../../vendor/libs/ng-select/ng-select.scss']
})
export class BonusSetupComponent implements OnInit {
  btnStatus: string = "Save";
  isSubmitted = false;
  compId: number;
  gradeValue: number;
  allJobType: BasicEntry[] = [];
  allEmployeeType: EmpTypeModel[] = [];
  paymentSetupForm: FormGroup;
  allPaymentType: BonuSType[] = [];
  allBonus: BonusSetupModel[] = [];
  allBonusAllowance: BonusSalaryHeadModel[] = [];
  constructor
    (
      private basicES: BasicEntryService,
      private formBuilder: FormBuilder,
      private empTypeES: EmpTypeService,
      private paymentTypeES: BonusTypeService,
      private BonusSelectES: BonusSelectService,
      private dateFormat: NgbDateCustomParserFormatter,
      private toasterService: ToastrService
    ) { }

  ngOnInit() {
    this.compId = AuthService.getLoggedCompanyId();
    this.gradeValue = AuthService.getLoggedGradeValue();
    this.AllJobType();
    this.AllEmployeeType();
    this.AllPaymentType();
    this.createForm();
    this.AllBonusAllowance();
    this.getAllBonus();
  }
  AllJobType() {
    this.basicES.getJobType().subscribe((response: ApiResponse) => {
      if (response.status) {
        this.allJobType = response.result as BasicEntry[];
      }
    })
  }
  AllEmployeeType() {
    this.empTypeES.GetEmpType().subscribe((response: ApiResponse) => {
      if (response.status) {
        this.allEmployeeType = response.result as EmpTypeModel[];
      }
    })
  }
  AllPaymentType() {
    this.paymentTypeES.getBonusType().subscribe((response: ApiResponse) => {
      if (response.status) {
        this.allPaymentType = response.result as BonuSType[];
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
  Save() {
    this.isSubmitted = true;
    if (this.paymentSetupForm.invalid) {
      this.toasterService.warning("Fill Required Fields");
    }
    else {
      this.paymentSetupForm.controls.bDate.setValue(this.dateFormat.ngbDateToDate(this.paymentSetupForm.controls.bDateNgb.value));
      this.BonusSelectES.saveBonusSetup(this.paymentSetupForm.value).subscribe((response: ApiResponse) => {
        if (response.status) {
          this.toasterService.success(response.result, "Success");
          this.reset();
          this.getAllBonus();
          this.isSubmitted = false;
        }
        else {
          this.toasterService.error(response.result, "Fail");
        }
      })
    }
  }
  getAllBonus() {
    this.BonusSelectES.getAllBonus(this.gradeValue, this.compId).subscribe((response: ApiResponse) => {
      if (response.status) {
        this.allBonus = response.result as BonusSetupModel[];
      }
    })
  }
  getById(id: number) {
    this.isSubmitted=false;
    let bonus = this.allBonus.find(c => c.id == id);
    this.f.id.setValue(bonus.id);
    this.paymentSetupForm.controls.bDateNgb.setValue(this.dateFormat.stringToNgbDate(this.paymentSetupForm.controls.bDate.value));
    this.paymentSetupForm.patchValue(bonus);
    this.btnStatus="Update"
  }
  createForm() {
    this.paymentSetupForm = this.formBuilder.group({
      id: [0, []],
      jobType: [, [Validators.required]],
      paymentTypeID: [, [Validators.required]],
      employeeTepe: [, [Validators.required]],
      salaryHead: [, [Validators.required]],
      number: [, [Validators.required]],
      bDate: [, []],
      bDateNgb: [, [Validators.required]],
      note: [, []],
      companyID: [this.compId, []],
      accountName: [, []],
      gradeName: [, []],
      paymentType: [, []],
      gradeValue: [this.gradeValue, []]
    })
  }
  get f() {
    return this.paymentSetupForm.controls;
  }
  reset() {
    this.createForm();
    this.isSubmitted = false;
    this.btnStatus="Save"
  }
}
