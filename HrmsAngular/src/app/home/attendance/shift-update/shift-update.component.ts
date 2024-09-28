import { ShiftManagementInfoModel } from './../../../models/Attendance/shift-management-info.model';
import { ApiResponse } from './../../../models/response.model';
import { AuthService } from './../../../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray, FormControl } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { NgbDateCustomParserFormatter } from '../../../shared/dateformat';
import { AttendenceService } from '../../../services/Attendance/attendence.service';
import { BasicEntry } from '../../../models/system-setup/basic-entry.model';

@Component({
  selector: 'app-shift-update',
  templateUrl: './shift-update.component.html',
  styleUrls: ['./shift-update.component.scss',
    '../../../../vendor/libs/angular2-ladda/ladda.scss',]
})
export class ShiftUpdateComponent implements OnInit {

  title = "Shift Update";
  gradeValue: number;
  compId: number;
  empCode: string;
  shiftDayFilterForm: FormGroup;
  assignedShiftForms: FormArray;
  columns: string[] = [];
  allWorkStation: BasicEntry[] = [];
  isLoading: boolean = false;
  isUpdating: boolean = false;
  shiftID: number;
  dateOfNextWeek: any;
  constructor(
    private fb: FormBuilder,
    private toaster: ToastrService,
    private dateFormat: NgbDateCustomParserFormatter,
    private attService: AttendenceService,

  ) { }
  ngOnInit() {
    this.dateOfNextWeek = this.dateFormat.addDays(6);
    this.compId = AuthService.getLoggedCompanyId();
    this.empCode = AuthService.getLoggedEmpCode();
    this.gradeValue = AuthService.getLoggedGradeValue();
    this.createShiftDayFilterForm();
    this.assignedShiftForms = this.fb.array([]);
  }
  assignShift() {
    this.isUpdating = true;
    let updatedRows: ShiftManagementInfoModel[] = [];
    (this.assignedShiftForms.value as any[]).forEach(item => {
      for (let i = 4; i < this.columns.length; i++) {
        let updatedRow: ShiftManagementInfoModel = new ShiftManagementInfoModel();
        updatedRow.companyID = this.compId;
        updatedRow.empCode = item[0];
        updatedRow.shiftID = (item[i] == null) ? 0 : item[i];
        updatedRow.shiftDate = this.columns[i];
        updatedRow.ddmmyyyy = null;
        updatedRow.note = null;
        updatedRow.nextDate = null;
        updatedRow.shiftIDRostaring = null;
        updatedRows.push(updatedRow)
      }
    })
    this.attService.assignShift(updatedRows)
      .subscribe((response: ApiResponse) => {
        if (response.status) {
          this.toaster.success(response.result);
        }
        else {
          this
          this.toaster.error(response.result);
        }
        this.isUpdating = false;
      }, err => {
        this.isUpdating = false;
      })
  }
  getAssignedShift() {
    if (this.shiftDayFilterForm.invalid) {
      this.toaster.error('Date field is required!', 'Invalid Submission!');
      return;
    }
    this.isLoading = true;
    this.attService.getAssignedShift(this.formVal).subscribe((response: ApiResponse) => {
      if (response.status) {
        this.columns = Object.keys((response.result as any[])[0]);
        this.lodaDataTable(response.result as any[])
      } else {
        this.isLoading = false;
        this.columns = [];
        this.assignedShiftForms = this.fb.array([]);
      }
      console.log(response)
    }, err => {
      this.isLoading = false;
    })
  }
  lodaDataTable(data: any[]) {
    this.assignedShiftForms = this.fb.array([]);
    (data).forEach(el => {
      let frmControl: FormControl[] = [];
      Object.keys(el).forEach(key => {
        let value = el[key]?el[key]:null;
        frmControl.push(new FormControl(value));
      })
      let frmGroup = this.fb.group(frmControl)
      this.assignedShiftForms.push(frmGroup)
    })
    this.isLoading = false;
  }
  onSetShift() {
    let selectedShiftId = this.formVal.shiftID;
    this.assignedShiftForms.controls.forEach(row => {
      for (let i = 4; i < this.columns.length; i++) {
        if((row.get(i.toString()).value)==null){
          row.get(i.toString()).patchValue(selectedShiftId)
        }
      }
    })
  }
  onSelectBranch(branch){
   this.shiftDayFilterForm.patchValue({
    locationID:branch.id
   })
  }
  onSelectShift(shiftId: number, rowIndex: number, colIndex: any) {
    this.assignedShiftForms.controls[rowIndex].get([colIndex]).patchValue(shiftId);
  }
  createShiftDayFilterForm() {
    this.shiftDayFilterForm = this.fb.group({
      fromDate: [, [Validators.required]],
      toDate: [this.dateFormat.ngbDateToDate(this.dateOfNextWeek).toLocaleDateString(), [Validators.required]],
      shiftID: [-1, []],
      reportTo: [this.empCode, []],
      companyID: [this.compId, []],
      departmentID: [, []],
      designationID: [, []],
      locationID:[,[]],
      empCode: [, []],
    })
  }
  get formVal() {
    return this.shiftDayFilterForm.value;
  }
  get f() {
    return this.shiftDayFilterForm.controls;
  }
  reset() {
    this.assignedShiftForms = this.fb.array([]);
    this.columns = [];
  }
  removeRow(index){
    this.assignedShiftForms.removeAt(index);
  }

}
