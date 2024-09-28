import { AuthService } from './../../../services/auth.service';
import { NgbDateCustomParserFormatter } from './../../../shared/dateformat';
import { BonusGridModel } from './../../../models/bonus-grid.model';
import { FestivalBonusService } from './../../../services/Bonus/festival-bonus.service';
import { FestivalBonusModel } from './../../../models/bonus/festival-bonus.model';
import { JobTypeComponent } from './../../system-setup/basic-entry/job-type/job-type.component';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiResponse } from './../../../models/response.model';
import { Component, OnInit } from '@angular/core';
import { BonuSType } from '../../../models/bonus/bonusType.model';
import { BonusTypeService } from '../../../services/Bonus/bonusType.service';
import { BonusSalaryHeadModel } from '../../../models/bonus/bonus-salary-head.model';
import { BonusSelectService } from '../../../services/Bonus/bonus-select.service';
import { BasicEntry } from '../../../models/system-setup/basic-entry.model';
import { BasicEntryService } from '../../../services/system-setup/basic-entry.service';
import { BonusPeriodModel } from '../../../models/bonusPeriod.model';
import { BonusPeriodService } from '../../../services/Bonus/bonus-period.service';
import { NgbModal, NgbDate } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-emp-festival-bonus',
  templateUrl: './emp-festival-bonus.component.html',
  styleUrls: ['./emp-festival-bonus.component.scss',
    '../../../../vendor/libs/angular-2-dropdown-multiselect/angular-2-dropdown-multiselect.scss',
    '../../../../vendor/libs/ng-select/ng-select.scss']
})
export class EmpFestivalBonusComponent implements OnInit {
  isSubmitted = false;
  compId: number;
  gradeValue: number;
  allJobType: BasicEntry[] = [];
  allBonusType: BonuSType[] = [];
  allBonusAllowance: BonusSalaryHeadModel[] = [];
  allBonusPeriod: BonusPeriodModel[] = [];
  festivalBonusForm: FormGroup;
  allDepartment: BasicEntry[] = [];
  allBonus: BonusGridModel[] = [];


  constructor(
    private basicES: BasicEntryService,
    private BonusTypeES: BonusTypeService,
    private BonusSelectES: BonusSelectService,
    private formBuilder: FormBuilder,
    private festivalBonusES: FestivalBonusService,
    private modalService: NgbModal,
    private dateFormate: NgbDateCustomParserFormatter,
    private toasterService: ToastrService,
    private BonusPeriodES: BonusPeriodService,
    private datePipe: DatePipe

  ) { }

  ngOnInit() {
    this.compId = AuthService.getLoggedCompanyId();
    this.gradeValue = AuthService.getLoggedGradeValue();
    this.AllBonusType();
    this.AllBonusAllowance();
    this.AllJobType();
    this.AllBonusPeriod();
    this.AllDepartment();
    this.createform();
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
  AllJobType() {
    this.basicES.getJobType().subscribe((response: ApiResponse) => {
      if (response.status) {
        this.allJobType = response.result as BasicEntry[];
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
  getAllBonus() {
    this.isSubmitted = true;
    if (this.festivalBonusForm.invalid) {
      this.toasterService.warning("Fill Required Field");
    }
    else {
      this.festivalBonusES.getFestivalBonus(this.festivalBonusForm.value)
        .subscribe((response: ApiResponse) => {
          if (response.status) {
            this.allBonus = response.result as BonusGridModel[];
            this.isSubmitted = false;
          }
          else {
            this.allBonus=[];
          }
        })
    }
  }
  saveBonus() {
    this.isSubmitted = true;
    if (this.festivalBonusForm.invalid || this.allBonus.length == 0) {
      this.toasterService.warning("No Datas Loaded");
    }
    else {
      let festivalBonus: FestivalBonusModel = this.festivalBonusForm.value;
      festivalBonus.bonusGrid = this.allBonus
      this.festivalBonusES.saveFestivalBonus(festivalBonus).subscribe((response: ApiResponse) => {
        if (response.status) {
          this.toasterService.success("Successfully Save", "Success");
          this.reset();
          this.isSubmitted = false;
          this.allBonus = [];
        }
        else {
          this.toasterService.error(response.result, "Fail")
        }
      })
    }
  }
  createform() {
    this.festivalBonusForm = this.formBuilder.group({
      periodID: [, []],
      salaryHeadID: [, []],
      otpp: [0, []],
      bonusType: [, [Validators.required]],
      date: [this.datePipe.transform(new Date(), 'yyyyMMdd'), []],
      companyID: [this.compId, []],
      depertment: [, []],
      gradeID: [this.gradeValue, []],
      companyid: [this.compId, []],
      jobType: [, []]
    })
  }
  get f() {
    return this.festivalBonusForm.controls;
  }
  reset() {
    this.festivalBonusForm.reset();
  }

  addNewJobType() {
    this.modalService.open(JobTypeComponent);
  }

}
