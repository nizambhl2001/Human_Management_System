import { AuthService } from './../../../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray, FormControl } from '@angular/forms';
import { ApprisalService } from '../../../services/Apprisal/apprisal.service';
import { ToastrService } from 'ngx-toastr';
import { SalaryYear } from '../../../models/SalarySetup/salary-year';
import { QuarterModel } from '../../../models/Apprisal/quarter-model';
import { EmployeeForApprisal } from '../../../models/Apprisal/employee-for-apprisal';
import { ApiResponse } from '../../../models/response.model';
import { KpiSetupModel } from '../../../models/Apprisal/kpisetup';

@Component({
  selector: 'app-agreebyboss',
  templateUrl: './agreebyboss.component.html',
  styleUrls: ['./agreebyboss.component.scss', '../../../../vendor/libs/ng-select/ng-select.scss']
})
export class AgreebybossComponent implements OnInit {
  constructor(
    private formbuilder: FormBuilder,
    private agreeByBossService: ApprisalService,
    private toasterservice: ToastrService
  ) { }

  agreedEmployeeInfoform: FormGroup;
  employeeInfoform: FormGroup;
  employees: EmployeeForApprisal[] = [];
  allemployees: EmployeeForApprisal[] = [];
  years: SalaryYear[] = [];
  quarters: QuarterModel[] = [];
  reportTo: string;
  companyId: number;
  userId: number;
  userTypeId: number;
  KpiBusinessResult: KpiSetupModel[] = [];
  sumWeight: number = 0;
  sumWeightPeople: number = 0;
  sump: number = 0;
  empWiseKpiBusinessFormList: FormArray;
  empWiseKpiPeopleFormList: FormArray;
  KpiPeopleResult: KpiSetupModel[] = [];
  isAgreebtn: boolean = false;
  saveupdate: string;
  isSubmitted: boolean = false;

  allBusinessKpi: KpiSetupModel[] = [];
  allPeopleKpi: KpiSetupModel[] = [];
  suggestedBusinessKpi: string[] = [];
  suggestedPeopleKpi: string[] = [];
  isLoading: boolean = false;
  ngOnInit() {
    this.createBossForm();
    this.getYear();
    this.getAllquarter();
    this.reportTo = AuthService.getLoggedEmpCode();
    this.companyId = AuthService.getLoggedCompanyId();
    this.userTypeId = AuthService.getLoggedUserTypeId();
    this.getSuggestedKPI(this.reportTo, this.userTypeId, this.companyId);
    this.empWiseKpiBusinessFormList = this.formbuilder.array([]);
    this.empWiseKpiPeopleFormList = this.formbuilder.array([]);
    this.saveupdate = 'Edit';
    this.userId = AuthService.getLoggedUserId();
    this.isAgreebtn = true;

  }
  getYear() {
    this.agreeByBossService.getYear().subscribe((response: ApiResponse) => {
      if (response.status) {
        this.years = response.result as SalaryYear[];
      }
    })
  }
  getAllquarter() {
    this.agreeByBossService.getAllQuarter().subscribe((response: ApiResponse) => {
      if (response.status) {
        this.quarters = response.result as QuarterModel[];
      }
    })
  }

  show() {
    this.isSubmitted = true;
    if (this.frmVal.quarter == null || this.frmVal.quarter == "" || this.frmVal.year == null || this.frmVal.year == "") {
      this.toasterservice.error('Please fill all required field', 'Invalid Action!');
      return;
    }
    else {
      this.isLoading = true;
      this.agreeByBossService.getReportToEmp(this.frmVal.quarter, this.frmVal.year, this.reportTo).subscribe((response: ApiResponse) => {
        if (response.status) {
          this.employees = response.result as EmployeeForApprisal[];
        }

      })
      this.agreeByBossService.getAllReportToEmp(this.frmVal.quarter, this.frmVal.year, this.reportTo).subscribe((response: ApiResponse) => {
        this.isLoading = false;
        if (response.status) {
          this.allemployees = response.result as EmployeeForApprisal[];
        }

      })
    }
  }
  empEdit(empCode: string) {

    this.agreeByBossService.getSingleEmployeeInfo(this.companyId, empCode).subscribe((response: ApiResponse) => {
      if (response.status) {
        this.agreedEmployeeInfoform.patchValue(response.result);
        this.getAllKpi();
      }
    })
  }

  update() {
    this.isSubmitted = true;
    if (this.agreedEmployeeInfoform.invalid) {
      this.toasterservice.error('Please fill all required field', 'Invalid Submission!');
      return;
    }
    if (this.sumWeight < 70 || this.sumWeight > 80) {
      this.toasterservice.error('Total business weight must be 70-80');
      return;
    } if (this.sumWeightPeople < 20 || this.sumWeightPeople > 30) {
      this.toasterservice.error('Total people weight must be 20-30');
      return;
    }
    if ((this.sumWeight + this.sumWeightPeople) != 100) {
      this.toasterservice.error('Total weight must be 100');
      return;
    }
    let emp = this.agreedEmployeeInfoform.value;
    let editedEmployeeList: EmployeeForApprisal[] = [];
    this.empWiseKpiBusinessFormList.controls.forEach((businessForm: FormGroup) => {
      let businessKpi = new EmployeeForApprisal();
      businessKpi.id = businessForm.value.empId;
      businessKpi.empCode = emp.empCode;
      businessKpi.kpiType = 1;
      businessKpi.kpiName = businessForm.value.kpiName;
      businessKpi.kpiId = businessForm.value.id;
      businessKpi.target = businessForm.value.targets.filter(c => c.target != null).map(c => c.target).join('*');
      businessKpi.weight = businessForm.value.weight;
      businessKpi.companyId = this.companyId;
      businessKpi.quarterId = emp.quarter;
      businessKpi.yearId = emp.year;
      businessKpi.userId = this.userId;
      editedEmployeeList.push(businessKpi);
    })
    this.empWiseKpiPeopleFormList.controls.forEach((peopleForm: FormGroup) => {
      let peopleKpi = new EmployeeForApprisal();
      peopleKpi.id = peopleForm.value.empId;
      peopleKpi.empCode = emp.empCode;
      peopleKpi.kpiType = 2;
      peopleKpi.kpiName = peopleForm.value.kpiName;
      peopleKpi.kpiId = peopleForm.value.id;
      peopleKpi.target = peopleForm.value.targets.filter(c => c.target != null).map(c => c.target).join('*');
      peopleKpi.weight = peopleForm.value.weight;
      peopleKpi.companyId = this.companyId;
      peopleKpi.quarterId = emp.quarter;
      peopleKpi.yearId = emp.year;
      peopleKpi.userId = this.userId;
      editedEmployeeList.push(peopleKpi);
    })
    this.agreeByBossService.KpiEditByBoss(editedEmployeeList).subscribe((Response: ApiResponse) => {
      if (Response.status) {
        this.toasterservice.success("KPI Updated Successfully.", "Success");
        this.empEdit(emp.empCode);
      }
      else {
        this.toasterservice.error(Response.result, "Error!");
      }
    })
  }

  createBossForm() {
    this.agreedEmployeeInfoform = this.formbuilder.group({
      id: [0, []],
      empCode: ['', Validators.required],
      empName: [, []],
      department: [, []],
      designation: [, []],
      year: [, Validators.required],
      quarter: [, Validators.required]
    })
  }
  get frmVal() {
    return this.agreedEmployeeInfoform.value;
  }

  getSumOfBusinessWeight(): number {
    let totalWeight = 0;
    this.empWiseKpiBusinessFormList.controls.forEach(businessForm => {
      totalWeight = totalWeight + businessForm.value.weight;
    })
    return totalWeight;
  }
  onChangeBusinessWeight(rowIndex: number) {
    this.sumWeight = this.getSumOfBusinessWeight();
  }
  getSumOfPeopleWeight(): number {
    let totalPeopleWeight = 0;
    this.empWiseKpiPeopleFormList.controls.forEach(peopleForm => {
      totalPeopleWeight += peopleForm.value.weight;
    })
    return totalPeopleWeight;
  }
  onChangePeopleWeight(rowIndex: number) {
    this.sumWeightPeople = this.getSumOfPeopleWeight();
  }
  getAllKpi() {
    if (this.agreedEmployeeInfoform.invalid) {
      this.toasterservice.error('Please, Fill all required field!');
      return;
    }
    this.agreeByBossService.getEmpWiseBusiness(this.frmVal.empCode, this.frmVal.year, this.frmVal.quarter, this.companyId).subscribe((response: ApiResponse) => {
      if (response.status) {
        this.KpiBusinessResult = response.result as KpiSetupModel[];
        this.sumWeight = 0;
        this.empWiseKpiBusinessFormList = this.formbuilder.array([]);
        let i = 0;
        this.KpiBusinessResult.forEach(item => {
          if (item.empId > 0) { this.saveupdate = 'Edit'; } else { this.saveupdate = 'Save'; }
          if (item.isBossAgree == 1) {
            this.isAgreebtn = true;
          } else { this.isAgreebtn = false; }
          this.empWiseKpiBusinessFormList.push(new FormGroup({
            id: new FormControl(item.id),
            empId: new FormControl(item.empId, []),
            kpiName: new FormControl(item.kpiName, []),
            targets: this.formbuilder.array([]),
            weight: new FormControl(item.weight),
            kpiType: new FormControl(item.kPIType)
          }))
          this.sumWeight = this.sumWeight + item.weight;
          if (item.target.split('*').length == 0) {
            this.addTarget(i, 1, item.target);
          }
          item.target.split('*').forEach(val => {
            this.addTarget(i, 1, val);
          })
          i = i + 1;
        })
      }
      else {
        this.toasterservice.error(response.result, 'Failed!');
        this.empWiseKpiBusinessFormList = this.formbuilder.array([]);
      }
    });
    this.agreeByBossService.getEmpWisePeople(this.frmVal.empCode, this.frmVal.year, this.frmVal.quarter, this.companyId).subscribe((response: ApiResponse) => {
      if (response.status) {
        this.KpiPeopleResult = response.result as KpiSetupModel[];
        this.sumWeightPeople = 0;
        this.empWiseKpiPeopleFormList = this.formbuilder.array([]);
        let j = 0;
        this.KpiPeopleResult.forEach(item => {
          this.empWiseKpiPeopleFormList.push(new FormGroup({
            id: new FormControl(item.id),
            empId: new FormControl(item.empId, []),
            kpiName: new FormControl(item.kpiName, []),
            targets: this.formbuilder.array([]),
            weight: new FormControl(item.weight),
            kpiType: new FormControl(item.kPIType)
          }))
          this.sumWeightPeople += item.weight;
          if (item.target.split('*').length == 0) {
            this.addTarget(j, 2, item.target);
          }
          item.target.split('*').forEach(val => {
            this.addTarget(j, 2, val);
          })
          j = j + 1;
        })
      }
      else {
        this.toasterservice.error(response.result, 'Failed!');
        this.empWiseKpiPeopleFormList = this.formbuilder.array([]);
      }
    });
  }
  agree() {
    if (this.agreedEmployeeInfoform.invalid) {
      this.toasterservice.error("Please,Fill all required field!");
      return;
    } else {
      let employees = new EmployeeForApprisal();
      employees.empCode = this.frmVal.empCode;
      employees.companyId = this.companyId;
      employees.yearId = this.frmVal.year;
      employees.quarterId = this.frmVal.quarter;
      this.agreeByBossService.KpiAgreeByBoss(employees).subscribe((response: ApiResponse) => {
        if (response.status) {
          this.toasterservice.success("Boss Agree the Kpi.", "Success");
          this.empEdit(this.frmVal.empCode);
        }
        else {
          this.toasterservice.error("Something is not ok.");
        }
      })
    }
  }
  resetKpi() {
    this.empWiseKpiBusinessFormList = this.formbuilder.array([]);
    this.empWiseKpiPeopleFormList = this.formbuilder.array([]);
    this.agreedEmployeeInfoform.reset();
    this.saveupdate = 'Save';
    this.isAgreebtn = true;
    this.employees = [];
    this.allemployees = [];
  }
  get f() {
    return this.agreedEmployeeInfoform.controls;
  }
  getSuggestedKPI(empCode: string, userTypeID: number, companyID: number) {
    this.agreeByBossService.getbusinessresult(empCode, userTypeID, companyID)
      .subscribe((response: ApiResponse) => {
        if (response.status) {
          this.allBusinessKpi = response.result as KpiSetupModel[];
          this.suggestedBusinessKpi = (response.result as KpiSetupModel[]).map(c => c.kpiName);
        } else {
          this.suggestedBusinessKpi = [];
        }
      })
    this.agreeByBossService.getPeopleresult(empCode, userTypeID, companyID)
      .subscribe((response: ApiResponse) => {
        if (response.status) {
          this.allPeopleKpi = response.result as KpiSetupModel[];
          this.suggestedPeopleKpi = (response.result as KpiSetupModel[]).map(c => c.kpiName);
        } else {
          this.suggestedPeopleKpi = [];
        }
      })
  }
  onSelectKpiName(rowIndex: number, kpiName: string, kpiType: number) {
    if (kpiName == null) {
      this.empWiseKpiBusinessFormList.controls[rowIndex].patchValue({
        id: 0,
        kpiName: null
      })
      this.empWiseKpiPeopleFormList.controls[rowIndex].patchValue({
        id: 0,
        kpiName: null
      })
      return;
    }
    if (kpiType == 1) {
      let kpi = this.allBusinessKpi.find(c => c.kpiName.toLowerCase() == kpiName.toLowerCase());
      this.empWiseKpiBusinessFormList.controls[rowIndex].patchValue({
        id: (kpi != null) ? kpi.id : 0,
        kpiName: kpiName
      })
    }
    if (kpiType == 2) {
      let kpi = this.allPeopleKpi.find(c => c.kpiName.toLowerCase() == kpiName.toLowerCase());
      this.empWiseKpiPeopleFormList.controls[rowIndex].patchValue({
        id: (kpi != null) ? kpi.id : 0,
        kpiName: kpiName
      })
    }
  }
  addNewRow(kpiType) {
    if (kpiType == 1) {
      this.empWiseKpiBusinessFormList.push(new FormGroup({
        id: new FormControl(0), //KPI id
        empId: new FormControl(0),
        kpiName: new FormControl(null, [Validators.required]),
        //kpiId: new FormControl(0, [Validators.required]),
        targets: this.formbuilder.array([this.newTarget()]),
        weight: new FormControl(0),
        kpiType: new FormControl(kpiType)
      }))
      return;
    }
    if (kpiType == 2) {
      this.empWiseKpiPeopleFormList.push(new FormGroup({
        id: new FormControl(0), //KPI id
        empId: new FormControl(0),
        kpiName: new FormControl(null, [Validators.required]),
        //kpiId: new FormControl(0, [Validators.required]),
        targets: this.formbuilder.array([this.newTarget()]),
        weight: new FormControl(0),
        kpiType: new FormControl(kpiType)
      }))
    }
  }
  removeRow(index, kpiType) {
    if (kpiType == 1) {
      this.empWiseKpiBusinessFormList.removeAt(index);
      this.sumWeight = this.getSumOfBusinessWeight();
      return;
    }
    if (kpiType == 2) {
      this.empWiseKpiPeopleFormList.removeAt(index);
      this.sumWeightPeople = this.getSumOfPeopleWeight();
    }
  }
  getTargets(rowIndex: number, kpiType: number): FormArray {
    if (kpiType == 1) {
      return this.empWiseKpiBusinessFormList.at(rowIndex).get("targets") as FormArray
    }
    if (kpiType == 2) {
      return this.empWiseKpiPeopleFormList.at(rowIndex).get("targets") as FormArray
    }
  }
  newTarget(value = null): FormGroup {
    return this.formbuilder.group({
      target: new FormControl(value),
    })
  }
  addTarget(index: number, kpiType, value = null) {
    this.getTargets(index, kpiType).push(this.newTarget(value));
  }
  removeTarget(rowIndex: number, targetIndex: number, kpiType) {
    this.getTargets(rowIndex, kpiType).removeAt(targetIndex);
  }

  onKeyEnter(event) {
    if (event != null) {
      event.preventDefault();
    }
  }
}

