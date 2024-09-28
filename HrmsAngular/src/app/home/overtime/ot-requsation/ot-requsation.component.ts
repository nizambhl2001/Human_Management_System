import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormArray, FormControl, Validators } from '@angular/forms';
import { NgbDateCustomParserFormatter } from '../../../shared/dateformat';
import { EmploymentService } from '../../../services/hr/employment.service';
import { AuthService } from '../../../services/auth.service';
import { ApiResponse } from '../../../models/response.model';
import { EmployeeService } from '../../../services/hr/employee.service';
import { BasicEntryService } from '../../../services/system-setup/basic-entry.service';
import { ToastrService } from 'ngx-toastr';
import { forEach } from '@angular/router/src/utils/collection';
import { from } from 'rxjs';
import { OvertimeService } from '../../../services/overtime/overtime.service';

@Component({
  selector: 'app-ot-requsation',
  templateUrl: './ot-requsation.component.html',
  styleUrls: ['./ot-requsation.component.scss',
    '../../../../vendor/libs/angular-2-dropdown-multiselect/angular-2-dropdown-multiselect.scss',
    '../../../../vendor/libs/ng-select/ng-select.scss', '../../../../vendor/libs/angular2-ladda/angular2-ladda.scss']
})
export class OtRequsationComponent implements OnInit {


  dateColumns: string[] = [];
  otRequisitionMasterForm: FormGroup;
  otRequisitionDetailsForm: FormArray;
  employeeList: any[] = [];
  businessNatures: any[] = [];
  defaultFromDate = this.dateFormat.addDays(-7);
  defaultToDate = this.dateFormat.addDays(-1);
  isSubmitted: boolean = false;
  isLoadingData: boolean = false;

  constructor(
    private fb: FormBuilder,
    private dateFormat: NgbDateCustomParserFormatter,
    private otService: OvertimeService,
    private employmentService: EmploymentService,
    private empService: EmployeeService,
    private basicEntryService: BasicEntryService,
    private toaster: ToastrService
  ) {
    this.otRequisitionDetailsForm = this.fb.array([]);
  }

  ngOnInit() {
    this.createForm();
    this.getEmpByBoss()
    this.getLoggedEmpInfo()
  }

  getLoggedEmpInfo() {
    this.employmentService.getEmployment(AuthService.getLoggedEmpCode(), AuthService.getLoggedCompanyId())
      .subscribe((response: ApiResponse) => {
        if (response.status) {
          this.otRequisitionMasterForm.patchValue({
            departmentID: response.result.departmentID,
            locationID: response.result.location,
            userID: AuthService.getLoggedUserId(),
            companyID: AuthService.getLoggedCompanyId()
          })
          this.getBusinessNatureByDept(response.result.departmentID);
        }
      })
  }
  getEmpByBoss() {
    this.otService.getOtEntitledEmpByBoss(AuthService.getLoggedEmpCode())
      .subscribe((response: ApiResponse) => {
        if (response.status) {
          this.employeeList = response.result as any[]
        }
      })
  }
  getBusinessNatureByDept(deptId) {
    this.basicEntryService.getAllBusinessnature(AuthService.getLoggedCompanyId(), deptId).subscribe((response: ApiResponse) => {
      if (response.status) {
        this.businessNatures = response.result as any[];
      }
      else {
        this.businessNatures = [];
      }
    })
  }
  onAdd() {
    if (this.formVal.empCode == null && this.formVal.isSelectAll == false) {
      this.toaster.error('Select Employee Code!', 'Invalid Submission!');
      return;
    }
    if (this.formVal.fromDate == null) {
      this.toaster.error('From Date is required')
      return;
    }
    if (this.formVal.toDate == null) {
      this.toaster.error('ToDate is required')
      return;
    }
    let fromDate = this.formVal.fromDate as number;
    let toDate = this.formVal.toDate as number;
    this.dateColumns = [];
    for (fromDate; fromDate <= toDate; fromDate++) {
      this.dateColumns.push(this.dateFormat.getYyyymmddToDate(fromDate.toString()).toLocaleDateString())
    }
    if (this.formVal.empCode != null && this.formVal.isSelectAll == false) {
      let frmVal = {
        empCode: this.formVal.empCode,
        empName: this.employeeList.find(c => c.empCode == this.formVal.empCode).empName,
        designation: this.employeeList.find(c => c.empCode == this.formVal.empCode).designation,
        fromDate: this.formVal.fromDate as number,
        toDate: this.formVal.toDate as number,
        otHour: this.formVal.otHour
      }
      this.otRequisitionDetailsForm.push(this.getNewDetailsRow(frmVal))
    }
    if (this.formVal.isSelectAll) {
      this.otRequisitionDetailsForm = this.fb.array([]);
      this.employeeList.forEach(emp => {
        let frmVal = {
          empCode: emp.empCode,
          empName: emp.empName,
          designation: emp.designation,
          fromDate: this.formVal.fromDate as number,
          toDate: this.formVal.toDate as number,
          otHour: this.formVal.otHour
        }
        this.otRequisitionDetailsForm.push(this.getNewDetailsRow(frmVal))
      })
    }
  }
  onSubmit() {
    this.isSubmitted = true;
    this.isLoadingData = true;
    if (this.otRequisitionMasterForm.invalid) {
      this.toaster.error('Invalid Submission!');
      return;
    }
    let otDetailRows: any[] = [];
    (this.otRequisitionDetailsForm.value as any[]).forEach(frmVal => {
      let i = 0;
      this.dateColumns.forEach(col => {
        let empRow = {
          id: 0,
          otRequisitionMasterID: 0,
          empCode: frmVal.empCode,
          otDate: col,
          otHours: frmVal['h' + i],
          isReplace: frmVal['r' + i],
          approvedHours: 0
        }
        otDetailRows.push(empRow);
        i++;
      })
    })
    let otMasterObj = {
      id: 0,
      userID: this.formVal.userID,
      requisitionDate: this.formVal.otRequisitionDate,
      fromDate: this.dateFormat.getYyyymmddToDate(this.formVal.fromDate).toLocaleDateString(),
      toDate: this.dateFormat.getYyyymmddToDate(this.formVal.toDate).toLocaleDateString(),
      sectionID: this.formVal.sectionID,
      reasonOfOt: this.formVal.reasonOfOt,
      isApprove: false,
      isEditByBoss: false,
      companyID: this.formVal.companyID,
      otRequisitionDetails: otDetailRows
    }
    this.otService.otRequisitionApply(otMasterObj)
      .subscribe((response: ApiResponse) => {
        this.isLoadingData = false;
        if (response.status) {
          this.toaster.success(response.result, 'Applied!')
        } else {
          this.toaster.error(response.result, 'Failed!')
        }
      },err=>{
      this.isLoadingData = false;
      console.log(err)
      })
  }
  onSelectEmpInRow(rowIndex, empCode) {
    let selectedEmp = this.employeeList.find(c => c.empCode == empCode);
    this.otRequisitionDetailsForm.controls[rowIndex].patchValue({
      empName: selectedEmp.empName,
      designation: selectedEmp.designation
    })
  }
  createForm() {
    this.otRequisitionMasterForm = this.fb.group({
      id: [, []],
      userID: [, [Validators.required]],
      departmentID: [, []],
      locationID: [, []],
      sectionID: [, [Validators.required]],
      empCode: [, []],
      isSelectAll: [false, []],
      reasonOfOt: [, [Validators.required]],
      otRequisitionDate: [, []],
      fromDate: [this.dateFormat.getNgbDateToYyyymmdd(this.defaultFromDate), [Validators.required]],
      toDate: [this.dateFormat.getNgbDateToYyyymmdd(this.defaultToDate), [Validators.required]],
      otHour: [8, []],
      companyID: [, [Validators.required]],
      orRequisitionDetails: this.fb.array([])
    })
  }

  getNewDetailsRow(frmVal): FormGroup {
    let formGroup = this.fb.group({
      id: new FormControl(null, []),
      empCode: new FormControl(frmVal.empCode, []),
      empName: new FormControl(frmVal.empName, []),
      designation: new FormControl(frmVal.designation, []),
    })
    let i = 0;
    for (frmVal.fromDate; frmVal.fromDate <= frmVal.toDate; frmVal.fromDate++) {
      let frmCtrlHour = new FormControl(frmVal.otHour, []);
      let frmCtrlIsReplace = new FormControl(false, []);
      formGroup.addControl('h' + i, frmCtrlHour);
      formGroup.addControl('r' + i, frmCtrlIsReplace);
      i++
    }
    return formGroup;
  }

  get formVal() {
    return this.otRequisitionMasterForm.value;
  }
  get formControl() {
    return this.otRequisitionMasterForm.controls;
  }
  removeRow(rowIndex) {
    this.otRequisitionDetailsForm.removeAt(rowIndex);
  }
  reset() {
    this.isSubmitted = false;
    this.otRequisitionDetailsForm = this.fb.array([]);
  }
}
