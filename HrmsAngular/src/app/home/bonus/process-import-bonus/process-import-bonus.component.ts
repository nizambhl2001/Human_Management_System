import { NgbDateCustomParserFormatter } from './../../../shared/dateformat';
import { ToastrService } from 'ngx-toastr';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { ApiResponse } from '../../../models/response.model';
import { BonusTypeService } from '../../../services/Bonus/bonusType.service';
import { BonusPeriodModel } from '../../../models/bonusPeriod.model';
import { BonusSalaryHeadModel } from '../../../models/bonus/bonus-salary-head.model';
import { BonuSType } from '../../../models/bonus/bonusType.model';
import { BonusSelectService } from '../../../services/Bonus/bonus-select.service';
import { BonusPeriodService } from '../../../services/Bonus/bonus-period.service';
import { ProcessBonusService } from '../../../services/Bonus/process-import-bonus.service';
import { ProcessImportModel } from '../../../models/bonus/process-import.model';
import { ImportBonusGet } from '../../../models/bonus/process-Import-get.model';
import { FestivalBonusModel } from '../../../models/bonus/festival-bonus.model';
import { BonusGridModel } from '../../../models/bonus-grid.model';
import { FestivalBonusService } from '../../../services/Bonus/festival-bonus.service';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-process-import-bonus',
  templateUrl: './process-import-bonus.component.html',
  styleUrls: ['./process-import-bonus.component.scss',
    '../../../../vendor/libs/angular-2-dropdown-multiselect/angular-2-dropdown-multiselect.scss',
    '../../../../vendor/libs/ng-select/ng-select.scss']
})
export class ProcessImportBonusComponent implements OnInit {
  compID: number;
  isSubmitted = false;
  allBonusPeriod: BonusPeriodModel[] = [];
  allBonusAllowance: BonusSalaryHeadModel[] = [];
  allBonusType: BonuSType[] = [];
  ProcessBonus: ProcessImportModel;
  getImportBonus: BonusGridModel[]=[];
  processBonus: FormGroup;
  constructor(
    private BonusSelectES: BonusSelectService,
    private BonusTypeES: BonusTypeService,
    private BonusPeriodES: BonusPeriodService,
    private formBuilder: FormBuilder,
    private toasterService: ToastrService,
    private festivalBonusES: FestivalBonusService,
    private processbonusS: ProcessBonusService
  ) { }

  ngOnInit() {
    this.compID = AuthService.getLoggedCompanyId();
    this.AllBonusType();
    this.AllBonusAllowance();
    this.AllBonusPeriod();
    this.createForm();
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
  getAllProcess() {
    this.isSubmitted = true;
    if (this.processBonus.invalid) {
      this.toasterService.warning("Fill required fields");
    }
    else {
      if (this.f.salaryHeadID.value == null) {
        this.f.salaryHeadID.setValue(-1);
      }
      this.f.salaryHeadID.setValue(-1);
      this.processbonusS.getProcessBonus(
        this.f.companyid.value,
        this.f.periodID.value,
        this.f.salaryHeadID.value,
        this.f.bonustype.value
      ).subscribe((response: ApiResponse) => {
        if (response.status) {
          this.isSubmitted = false;
          this.getImportBonus = response.result as BonusGridModel[];
        }
        else {
          this.toasterService.error(response.result);
        }
      })
    }
  }
  save() {
    if(this.getImportBonus.length==0){
      this.toasterService.warning("No Data To Save");
    }
    else{
    let performanmceBonus: FestivalBonusModel = new FestivalBonusModel();
    performanmceBonus.companyid = this.compID;
    performanmceBonus.bonusType = this.processBonus.value.bonustype;
    performanmceBonus.salaryHeadID = this.processBonus.value.salaryHeadID;
    if(performanmceBonus.salaryHeadID==-1){
      performanmceBonus.salaryHeadID=0;
    }
    performanmceBonus.periodID = this.processBonus.value.periodID;
    performanmceBonus.bonusGrid = this.getImportBonus;
    this.festivalBonusES.savePcocessImportBonus(performanmceBonus).subscribe((response: ApiResponse) => {
      if (response.status) {
        this.toasterService.success("Successfully Save", "Success");
        this.getImportBonus=[];
        this.reset();
      }
      else {
        this.toasterService.error(response.result, "Fail")
      }
    })
  }
}
  createForm() {
    this.processBonus = this.formBuilder.group({
      companyid: [this.compID, []],
      salaryHeadID: [, []],
      bonustype: [, [Validators.required]],
      periodID: [, [Validators.required]],
    })
  }
  get f() {
    return this.processBonus.controls;
  }
  reset() {
    this.createForm();
  }
}
