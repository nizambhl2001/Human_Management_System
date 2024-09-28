import { AuthService } from './../../../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, FormControl, Validators } from '@angular/forms';
import { EmployeeForApprisal } from '../../../models/Apprisal/employee-for-apprisal';
import { ApprisalService } from '../../../services/Apprisal/apprisal.service';
import { ApiResponse } from '../../../models/response.model';
import { SalaryYear } from '../../../models/SalarySetup/salary-year';
import { QuarterModel } from '../../../models/Apprisal/quarter-model';
import { KpiSetupModel } from '../../../models/Apprisal/kpisetup';
import { ToastrService } from 'ngx-toastr';
import { EmployeeService } from '../../../services/hr/employee.service';

@Component({
  selector: 'app-employeewisekpi',
  templateUrl: './employeewisekpi.component.html',
  styleUrls: ['./employeewisekpi.component.scss', '../../../../vendor/libs/ng-select/ng-select.scss']
})
export class EmployeewisekpiComponent implements OnInit {


  constructor(
    private formbuilder: FormBuilder,
    private empwisekpiservice: ApprisalService,
    private empService: EmployeeService,
    private toasterservice: ToastrService
  ) { }
  sum: number = 0;
  sumWeight: number = 0;
  sumWeightPeople: number = 0;
  sump: number = 0;
  employeeInfoform: FormGroup;
  empCodes: EmployeeForApprisal[] = [];
  years: SalaryYear[] = [];
  quarters: QuarterModel[] = [];
  empCode: string;
  companyId: number;
  userId: number;
  userTypeID: number;
  KpiBusinessResult: KpiSetupModel[] = [];
  KpiPeopleResult: KpiSetupModel[] = [];
  isAgree: number = 0;
  empWiseKpiBusinessFormList: FormArray;
  empWiseKpiPeopleFormList: FormArray;
  isAgreebtn: boolean = false;
  saveupdate: string;
  isSubmitted: boolean = false;

  allBusinessKpi: KpiSetupModel[] = [];
  allPeopleKpi: KpiSetupModel[] = [];
  suggestedBusinessKpi: string[] = [];
  suggestedPeopleKpi: string[] = [];

  ngOnInit() {
    this.createEmployeeForm();
    this.empWiseKpiBusinessFormList = this.formbuilder.array([]);
    this.empWiseKpiPeopleFormList = this.formbuilder.array([]);
    this.empCode = AuthService.getLoggedEmpCode();
    this.userId = AuthService.getLoggedUserId();
    this.userTypeID = AuthService.getLoggedUserTypeId();
    this.getEmployeeCode();
    this.companyId = AuthService.getLoggedCompanyId();
    this.getYear();
    this.saveupdate = "Save";
    this.getAllKpi(this.empCode, this.userTypeID, this.companyId);
  }

  getSumOfBusinessWeight(): number {
    let totalWeight = 0;
    this.empWiseKpiBusinessFormList.controls.forEach(businessForm => {
      totalWeight = totalWeight + businessForm.value.weight;
    })
    return totalWeight;
  }
  onChangeBusinessWeight() {
    this.sumWeight = this.getSumOfBusinessWeight();
  }
  getSumOfPeopleWeight(): number {
    let totalPeopleWeight = 0;
    this.empWiseKpiPeopleFormList.controls.forEach(peopleForm => {
      totalPeopleWeight += peopleForm.value.weight;
    })
    return totalPeopleWeight;
  }
  onChangePeopleWeight() {
    this.sumWeightPeople = this.getSumOfPeopleWeight();
  }
  getYear() {
    this.empwisekpiservice.getYear().subscribe((response: ApiResponse) => {
      if (response.status) {
        this.years = response.result as SalaryYear[];
      }
    })
  }
  getQuarter() {
    this.empwisekpiservice.getQuarter(this.formVal.empCode, this.companyId).subscribe((Response: ApiResponse) => {
      if (Response.status) {
        this.quarters = Response.result as QuarterModel[];
      }
    })
  }
  saveUpdateKpi() {
    this.isSubmitted = true;
    if (this.employeeInfoform.invalid) {
      this.toasterservice.error('Please fill all required field', 'Invalid Submission!');
      return;
    }
    if(this.sumWeight<70 || this.sumWeight>80){
      this.toasterservice.error('Total business weight must be 70-80');
      return;
    }if(this.sumWeightPeople<20 || this.sumWeightPeople>30){
      this.toasterservice.error('Total people weight must be 20-30');
      return;
    }
    if((this.sumWeight+this.sumWeightPeople)!=100){
      this.toasterservice.error('Total weight must be 100');
      return;
    }
    let emp = this.employeeInfoform.value;
    let empWiseKpiList: EmployeeForApprisal[] = []

    this.empWiseKpiBusinessFormList.controls.forEach(
      (businessForm: FormGroup) => {
        let empWiseBusinessKpi = new EmployeeForApprisal();
        empWiseBusinessKpi.empCode = emp.empCode;
        empWiseBusinessKpi.quarterId = emp.quarter;
        empWiseBusinessKpi.yearId = emp.year;
        empWiseBusinessKpi.reportTo = emp.reportTo;
        empWiseBusinessKpi.id = businessForm.value.empId;
        empWiseBusinessKpi.kpiId = businessForm.value.id;
        empWiseBusinessKpi.kpiName = businessForm.value.kpiName;
        empWiseBusinessKpi.kpiType = 1; //Value 1 for business type KPI
        empWiseBusinessKpi.target = businessForm.value.targets.filter(c=>c.target!=null).map(c=>c.target).join('*')
        empWiseBusinessKpi.weight = businessForm.value.weight;
        empWiseBusinessKpi.isAgree = this.isAgree;
        empWiseBusinessKpi.userId = this.userTypeID;
        empWiseBusinessKpi.companyId = this.companyId;
        empWiseKpiList.push(empWiseBusinessKpi);
      }
    )
    this.empWiseKpiPeopleFormList.controls.forEach(
      (peopleForm: FormGroup) => {
        let empWisePeopleKpi = new EmployeeForApprisal();
        empWisePeopleKpi.empCode = emp.empCode;
        empWisePeopleKpi.quarterId = emp.quarter;
        empWisePeopleKpi.yearId = emp.year;
        empWisePeopleKpi.id = peopleForm.value.empId;
        empWisePeopleKpi.kpiId = peopleForm.value.id;
        empWisePeopleKpi.kpiName = peopleForm.value.kpiName;
        empWisePeopleKpi.kpiType = 2; //Value 2 for people type KPI
        empWisePeopleKpi.target = peopleForm.value.targets.filter(c=>c.target!=null).map(c=>c.target).join('*');
        empWisePeopleKpi.weight = peopleForm.value.weight;
        empWisePeopleKpi.isAgree = this.isAgree;
        empWisePeopleKpi.userId = this.userTypeID;
        empWisePeopleKpi.companyId = this.companyId;
        empWisePeopleKpi.reportTo = emp.reportTo;
        empWiseKpiList.push(empWisePeopleKpi);
      }
    )
    this.empwisekpiservice.saveUpdateEmpWiseKpi(empWiseKpiList).subscribe((res: ApiResponse) => {
      if (res.status) {
        this.toasterservice.success(this.saveupdate + " Successfully.", "Success");
        this.show();
        this.getAllKpi(this.empCode, this.userTypeID, this.companyId);
      } else {
        this.toasterservice.error(res.result, "Error");
      }
    })
  }
  resetKpi() {

    this.empWiseKpiBusinessFormList = this.formbuilder.array([]);
    this.empWiseKpiPeopleFormList = this.formbuilder.array([]);
    this.employeeInfoform.reset();
    this.saveupdate = 'Save';
    this.isAgreebtn = true;
    this.isSubmitted = false;
  }
  agree() {
    this.isSubmitted = true;
    if (this.employeeInfoform.invalid) {
      this.toasterservice.error('Please fill all required field', 'Invalid Submission!');
      return;
    } else {

      let emp = this.employeeInfoform.value;
      let list = new EmployeeForApprisal();

      list.empCode = emp.empCode;
      list.companyId = this.companyId;
      list.yearId = emp.year;
      list.quarterId = emp.quarter;

      this.empwisekpiservice.updateEmpWiseKpiForAgree(list).subscribe((res: ApiResponse) => {
        if (res.status) {
          this.toasterservice.success("Agree Successfully.", "Success");
          this.show();
        } else {
          this.toasterservice.error(res.result, "Failed");
        }
      })
    }
  }
  show() {
    this.isSubmitted = true;
    if (this.employeeInfoform.invalid) {
      this.toasterservice.error('Please fill all required field', 'Invalid Action!');
      return;
    }
    this.empwisekpiservice.getEmpWiseBusiness(this.formVal.empCode, this.formVal.year, this.formVal.quarter, this.companyId).subscribe((response: ApiResponse) => {
      if (response.status) {
        this.KpiBusinessResult = response.result as KpiSetupModel[];
        this.sumWeight = 0;
        this.empWiseKpiBusinessFormList = this.formbuilder.array([]);
        if(this.KpiBusinessResult.length>0){
          let i = 0;
          this.KpiBusinessResult.forEach(businessItem => {
            if (businessItem.empId > 0) { this.saveupdate = 'Update'; } else { this.saveupdate = 'Save'; }
            if (businessItem.isAgree == 1) {
              this.isAgreebtn = true;
            } else { this.isAgreebtn = false; }
            this.empWiseKpiBusinessFormList.push(new FormGroup({
              id: new FormControl(businessItem.id),
              empId: new FormControl(businessItem.empId, []),
              kpiName: new FormControl(businessItem.kpiName, [Validators.required]),
              targets:this.formbuilder.array([]),
              weight: new FormControl({value:businessItem.weight, disabled:businessItem.isAgree}),
              kpiType: new FormControl(businessItem.kPIType)
            }))
            this.sumWeight = this.sumWeight + businessItem.weight;
            if(businessItem.target.split('*').length==0){
              this.addTarget(i,1, businessItem.target);
            }
            businessItem.target.split('*').forEach(val => {
              this.addTarget(i,1, val);
            })
            i=i+1;
          })
        }else{
          this.addNewRow(1);
          this.addNewRow(1);
          this.addNewRow(1);
        }
      }
      else {
        this.toasterservice.error(response.result, 'Failed!');
        this.empWiseKpiBusinessFormList = this.formbuilder.array([]);
      }
    });
    this.empwisekpiservice.getEmpWisePeople(this.formVal.empCode, this.formVal.year, this.formVal.quarter, this.companyId).subscribe((response: ApiResponse) => {
      if (response.status) {
        this.KpiPeopleResult = response.result as KpiSetupModel[];
        this.sumWeightPeople = 0;

        this.empWiseKpiPeopleFormList = this.formbuilder.array([]);
        if(this.KpiPeopleResult.length>0){
          let j = 0;
        this.KpiPeopleResult.forEach(peopleItem => {
          this.empWiseKpiPeopleFormList.push(new FormGroup({
            id: new FormControl(peopleItem.id),
            empId: new FormControl(peopleItem.empId, []),
            kpiName: new FormControl(peopleItem.kpiName, [Validators.required]),
            targets: this.formbuilder.array([]),
            weight: new FormControl({value:peopleItem.weight, disabled:peopleItem.isAgree}),
            kpiType: new FormControl(peopleItem.kPIType)
          }))
          this.sumWeightPeople += peopleItem.weight;
          if(peopleItem.target.split('*').length==0){
            this.addTarget(j,2, peopleItem.target);
          }
          peopleItem.target.split('*').forEach(val => {
            this.addTarget(j,2, val);
          })
          j=j+1;
        })
        }else{
          this.addNewRow(2);
          this.addNewRow(2);
          this.addNewRow(2);
        }
      }
      else {
        this.toasterservice.error(response.result, 'Failed!');
        this.empWiseKpiPeopleFormList = this.formbuilder.array([]);
      }
    });
  }

  getEmployeeCode() {
    this.empService.getEmpByBoss(this.empCode).subscribe((response: ApiResponse) => {
      if (response.status) {
        this.empCodes = response.result as EmployeeForApprisal[];
      }
      else{
        this.empCodes=[];
      }
    })
  }
  getEmployeeInfo() {
    if (this.employeeInfoform.value.empCode == null || this.employeeInfoform.value.empCode == "") {
      this.employeeInfoform.patchValue({
        empName: null,
        department: null,
        designation: null,
        reportName: null,
        reportTo: null
      })
       return; }
    else {
      this.empwisekpiservice.getEmployeeInfo(this.companyId, this.employeeInfoform.value.empCode).subscribe((Response: ApiResponse) => {
        let info = Response.result as EmployeeForApprisal;
        this.employeeInfoform.patchValue({
          empName: info.empName,
          department: info.department,
          designation: info.designation,
          reportName: info.reportName,
          reportTo: info.reportTo
        })
        this.getYear();
        this.getQuarter();
      })
    }
  }

  getAllKpi(empCode: string, userTypeID: number, companyID: number) {
    this.empwisekpiservice.getbusinessresult(empCode, userTypeID, companyID)
      .subscribe((response: ApiResponse) => {
        if (response.status) {
          this.allBusinessKpi = response.result as KpiSetupModel[];
          this.suggestedBusinessKpi = (response.result as KpiSetupModel[]).map(c => c.kpiName);
        } else {
          this.suggestedBusinessKpi = [];
        }
      })
    this.empwisekpiservice.getPeopleresult(empCode, userTypeID, companyID)
      .subscribe((response: ApiResponse) => {
        if (response.status) {
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
        id: kpi ? kpi.id : 0,
        kpiName: kpiName
      })
    }
    if (kpiType == 2) {
      let kpi = this.allPeopleKpi.find(c => c.kpiName.toLowerCase() == kpiName.toLowerCase());
      this.empWiseKpiPeopleFormList.controls[rowIndex].patchValue({
        id: kpi ? kpi.id : 0,
        kpiName: kpiName
      })
    }
  }

  //=========================================  Mostafij  ==========================================================
  createEmployeeForm() {
    this.employeeInfoform = this.formbuilder.group({
      id: [0, []],
      empCode: [, Validators.required],
      empName: [, []],
      department: [, []],
      designation: [, []],
      reportName: [, []],
      reportTo: [, []],
      year: [, Validators.required],
      quarter: [, Validators.required],
      jobType: [, []],
      departmentID: [, []],
      userTypeID: [, []]
    })
  }

  get formVal() {
    return this.employeeInfoform.value;
  }
  get f() {
    return this.employeeInfoform.controls;
  }

  addNewRow(kpiType) {
    if (kpiType == 1) {
      this.empWiseKpiBusinessFormList.push(new FormGroup({
        id: new FormControl(0),
        empId: new FormControl(0),
        kpiName: new FormControl(null, [Validators.required]),
        targets: this.formbuilder.array([this.newTarget()]),
        weight: new FormControl(0),
        kpiType: new FormControl(kpiType)
      }))
      return;
    }
    if (kpiType == 2) {
      this.empWiseKpiPeopleFormList.push(new FormGroup({
        id: new FormControl(0),
        empId: new FormControl(0),
        kpiName: new FormControl(null, [Validators.required]),
        targets : this.formbuilder.array([this.newTarget()]),
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

  getTargets(rowIndex: number, kpiType:number): FormArray {
    if(kpiType==1){
      return this.empWiseKpiBusinessFormList.at(rowIndex).get("targets") as FormArray
    }
    if(kpiType==2){
      return this.empWiseKpiPeopleFormList.at(rowIndex).get("targets") as FormArray
    }
  }
  newTarget(value = null): FormGroup {
    return this.formbuilder.group({
      target: new FormControl(value),
    })
  }
  addTarget(index: number,kpiType, value = null) {

    this.getTargets(index, kpiType).push(this.newTarget(value));
  }
  removeTarget(rowIndex: number, targetIndex: number, kpiType) {
    this.getTargets(rowIndex, kpiType).removeAt(targetIndex);
  }
  onKeyEnter(event){
    if(event!=null){
      event.preventDefault();
    }
  }
}
