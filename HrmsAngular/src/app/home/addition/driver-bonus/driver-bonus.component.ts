import { AuthService } from './../../../services/auth.service';
import { SalarySetupService } from './../../../services/SalarySetup/salary-setup.service';
import { AdditionAllowanceService } from './../../../services/Addition/addition-allowance.service';
import { BonusType } from './../../../models/Addition/bonus-types';
import { SalaryHead } from './../../../models/SalarySetup/salary-head';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiResponse } from './../../../models/response.model';
import { Component, OnInit } from '@angular/core';
import { Pagination } from '../../../shared/paginate';
import { DriverBonus } from '../../../models/Addition/driver-bonus.model';
import { SalaryPeriodModel } from '../../../models/SalarySetup/SalaryPeriod';
import { ToastrService } from 'ngx-toastr';
import { DriverAllowace } from '../../../models/Addition/driver-addition-allowance.model';


@Component({
  selector: 'app-driver-bonus',
  templateUrl: './driver-bonus.component.html',
  styleUrls: ['./driver-bonus.component.scss', '../../../../vendor/libs/ng-select/ng-select.scss']
})
export class DriverBonusComponent extends Pagination implements OnInit {

  constructor(
    private salryperiodService: SalarySetupService,
    private additionAllowanceService: AdditionAllowanceService,
    private formBuilder: FormBuilder,
    private salaryHeadService: SalarySetupService,
    private toaster: ToastrService
  ) {
    super();
  }
  title = "Driver Festival Bonus Info";
  allDriverAllowanceBonusModel:DriverAllowace[]=[];
  driverAllowanceModel: DriverAllowace[] = [];
  companyID: number;
  grade: number;
  salaryPeriodmodel: SalaryPeriodModel[] = [];
  driverAllwBonusForm: FormGroup;
  salaryHeadModel: SalaryHead[] = [];
  bonusTypesModel: BonusType[] = [];
  btnStatus = 'Save';
  isSaveBtnClick=false;
  usertypeID:number;
  ngOnInit() {
    this.items = [];
    this.companyID=AuthService.getLoggedCompanyId();
    this.grade=AuthService.getLoggedGradeValue();
    this.usertypeID=AuthService.getLoggedUserTypeId();
    this.update();
    this.createForm();
    this.getAllPeriodData();
    this.getAllSalaryhead();
    this.getAllBonusType();
  }

  getAll() {
    this.additionAllowanceService.getAllDriverBonus(this.companyID, this.grade,this.usertypeID).subscribe((response: ApiResponse) => {
      if (response.status) {
        this.driverAllowanceModel = response.result as DriverAllowace[];
       this.allDriverAllowanceBonusModel=response.result as DriverAllowace[];
      }
      else{
        this.driverAllowanceModel=[];
      }
    })
  }
  removeDriver(empCode: string) {
    let index = this.driverAllowanceModel.findIndex(c => c.empCode == empCode);
    this.allDriverAllowanceBonusModel.splice(index, 1);
  }
  getAllPeriodData() {
    this.salryperiodService.getAllperiod().subscribe((response: ApiResponse) => {
      if (response.status) {
        this.salaryPeriodmodel = response.result as SalaryPeriodModel[];
      }
    })
  }
  getAllSalaryhead() {
    this.salaryHeadService.getAllSalaryHead().subscribe((response: ApiResponse) => {
      if (response.status) {
        this.salaryHeadModel = response.result as SalaryHead[];
      }
    })
  }
  getAllBonusType() {
    this.additionAllowanceService.getAllBonusType().subscribe((response: ApiResponse) => {
      if (response.status) {
        this.bonusTypesModel = response.result as BonusType[];
      }
    })
  }
  saveOrUpdate() {
     this.isSaveBtnClick=true;
     if(this.f.periodID.invalid && this.f.salaryHeadID.invalid && this.f.bonusID.invalid){
       this.toaster.error("Please fill all required fields","Invalid submition");
       return;
     }
    let driverBounus: DriverBonus = new DriverBonus();
    driverBounus=this.driverAllwBonusForm.value;
    driverBounus.selectedDriver = this.allDriverAllowanceBonusModel;
    this.additionAllowanceService.saveUpdateDriverBonus(driverBounus).subscribe((response: ApiResponse) => {
      if (response.status) {
        this.toaster.success("Saved Successfully", "Success!");
          this.reset();
      }
      else {
        this.toaster.error(response.result, "Failed!");
      }
    })
  }

  reset() {
    this.isSaveBtnClick=false;
    this.driverAllwBonusForm.reset();
    this.createForm();
    this.driverAllowanceModel=[];
  }

  createForm() {
    this.driverAllwBonusForm = this.formBuilder.group({
      id: [0,[]],
      salaryHeadID: [,[Validators.required]],
      periodID: [,[Validators.required]],
      bonusID: [,[Validators.required]],
      companyID: [this.companyID,[]],
      userID: [,[]]
    })
  }

  get f() {
    return this.driverAllwBonusForm.controls;
  }

}
