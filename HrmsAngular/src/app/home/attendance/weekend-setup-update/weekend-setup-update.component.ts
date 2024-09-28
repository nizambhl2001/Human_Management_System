import { Component, OnInit } from '@angular/core';
import { FormGroup, FormArray, FormBuilder, FormControl, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ShiftManagementInfoModel } from '../../../models/Attendance/shift-management-info.model';
import { ApiResponse } from '../../../models/response.model';
import { SalaryPeriodModel } from '../../../models/SalarySetup/SalaryPeriod';
import { BasicEntry } from '../../../models/system-setup/basic-entry.model';
import { AttendenceService } from '../../../services/Attendance/attendence.service';
import { AuthService } from '../../../services/auth.service';
import { NgbDateCustomParserFormatter } from '../../../shared/dateformat';

@Component({
  selector: 'app-weekend-setup-update',
  templateUrl: './weekend-setup-update.component.html',
  styleUrls: ['../../../../vendor/libs/ng-select/ng-select.scss']
})
export class WeekendSetupUpdateComponent implements OnInit {

  title = "Shift Update";
  gradeValue: number;
  compId: number;
  empCode: string;
  weekendUpdateForm: FormGroup;
  weekendUpdateArray: FormArray;
  columns: string[] = [];
  allWorkStation: BasicEntry[] = [];
  isLoading: boolean = false;
  isUpdating: boolean = false;
  shiftID: number;
  salaryPeriodItem: SalaryPeriodModel[] = [];

  lstdayName:any[]=[
    { dayName:'Saturday', id:8},
    { dayName:'Sunday', id:9},
    { dayName:'Monday', id:10},
    { dayName:'Tuesday', id:11},
    { dayName:'Wednesday', id:12},
    { dayName:'Thursday', id:13},
    { dayName:'Friday', id:14}
    ];
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
    this.createWeekendUpdateForm();
    this.weekendUpdateArray = this.fb.array([]);
  }

  getPeriodListByYearId(id: number) {
    if (id == null) {
      return;
    } else {
      this.f['yearID'].patchValue(id);
      this.attService.getPeriodListByYearID(id).subscribe((response: ApiResponse) => {
        if (response.status) {
          this.salaryPeriodItem = response.result as SalaryPeriodModel[];

        } else {
          this.salaryPeriodItem = [];
        }
      });
    }
  }
  assignShift() {
    this.isUpdating = true;
    let updatedRows: ShiftManagementInfoModel[] = [];
    // (this.weekendUpdateArray.value as any[]).forEach(item => {
    //   for (let i = 4; i < this.columns.length; i++) {
    //     let updatedRow: ShiftManagementInfoModel = new ShiftManagementInfoModel();
    //     updatedRow.companyID = this.compId;
    //     updatedRow.empCode = item[0];
    //     updatedRow.shiftID = (item[i] == null) ? 0 : item[i];
    //     updatedRow.shiftDate = this.columns[i];
    //     updatedRow.ddmmyyyy = null;
    //     // updatedRow.day = null;
    //     updatedRow.note = null;
    //     updatedRow.nextDate = null;
    //     updatedRow.shiftIDRostaring = null;
    //     updatedRows.push(updatedRow)
    //   }
    // })

    let test=(this.detailsFormAllVal as any[]).filter(p=>p.note!='');
    this.attService.assignweakend(test)
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
    if (this.weekendUpdateForm.invalid) {
      this.toaster.error('Date field is required!', 'Invalid Submission!');
      return;
    }
    this.isLoading = true;
    this.attService.getWeekEndShift(this.formVal).subscribe((response: ApiResponse) => {
      if (response.status) {
        this.lodaDataTable(response.result as any[])
      } else {
        this.isLoading = false;
        this.weekendUpdateArray = this.fb.array([]);
      }
    }, err => {
      this.isLoading = false;
    })
  }
  lodaDataTable(data: any[]) {
    console.log(data);
    this.weekendUpdateArray = this.fb.array([]);
    (data).forEach(el => {


      this.weekendUpdateArray.push(new FormGroup({
        id: new FormControl(el.id),
        empName: new FormControl(el.empName),
        empCode: new FormControl(el.empCode),
        designation: new FormControl(el.designation),
        designationId: new FormControl(el.designationID),
        departmentId: new FormControl(el.departmentID),
        locationID: new FormControl(el.locationID),
        department: new FormControl(el.department),
        periodId: new FormControl(this.f.periodId.value),
     weak1: new FormControl(el.weak1),
     weak2: new FormControl(el.weak2),
     weak3: new FormControl(el.weak3),
     weak4: new FormControl(el.weak4),
     weak5: new FormControl(el.weak5),
     companyID: new FormControl(this.compId)
 }))
 })
      // let frmControl: FormControl[] = [];
      // console.log("data",el)
      // Object.keys(el).forEach(key => {
      //   let value = el[key]?el[key]:null;
      //   frmControl.push(new FormControl(value));
      // })
      // let frmGroup = this.fb.group(frmControl)
    //   // this.weekendUpdateArray.push(frmGroup)
    // })
    this.isLoading = false;
  }
  onSetShift() {
    let selectedShiftId = this.formVal.shiftID;
    this.weekendUpdateArray.controls.forEach(row => {
      for (let i = 4; i < this.columns.length; i++) {
        if((row.get(i.toString()).value)==null){
          row.get(i.toString()).patchValue(selectedShiftId)
        }
      }
    })
  }
  onSelectBranch(branch){
   this.weekendUpdateForm.patchValue({
    locationID:branch.id
   })
  }
  onSelectShift(shiftId: number, rowIndex: number, colIndex: any) {
    this.weekendUpdateArray.controls[rowIndex].get([colIndex]).patchValue(shiftId);
  }
  createWeekendUpdateForm() {
    this.weekendUpdateForm = this.fb.group({
      fromDate:[this.dateFormat.getCurrentNgbDate(),[]],
      toDate:[this.dateFormat.getCurrentNgbDate(),[]],
      shiftID: [, []],
      reportTo: [this.empCode, []],
      companyID: [this.compId, []],
      departmentID: [, []],
      designationID: [, []],
      periodId:[,[]],
      locationID:[,[]],
      empCode: [, []],
      weekDay: [, []],
      yearID:[,[]],
      branchID:[,[]],
    })
  }
  getShiftDay(){
    this.attService.GetDayOfWeekendInfo(this.formVal.fromDate, this.formVal.toDate, this.f.empCode.value , this.f.weekDay.value)
    .subscribe(
      (response:ApiResponse)=>{
        if(response.status){
          this.weekendUpdateArray = this.fb.array([]);
          response.result.forEach(holyDay => {
            this.weekendUpdateArray.push(new FormGroup({
              id:new FormControl(holyDay.id,[]),
              holyDayId:new FormControl(holyDay.id,[]),
              hYear:new FormControl(holyDay.hYear,[]),
              hDate:new FormControl(holyDay.hdate,[]),
              note:new FormControl(holyDay.note,[]),
              nextDate:new FormControl(holyDay.nextDate,[]),
              weekDays:new FormControl(holyDay.weekDays,[]),
              empCode:new FormControl(this.formVal.empCode,[]),
              fromDate:new FormControl(this.formVal.fromDate,[]),
              toDate:new FormControl(this.formVal.toDate,[]),
              locationID:new FormControl(this.formVal.locationID,[])
            }))
          });
        }
      }
    )
  }

  get formVal() {
    return this.weekendUpdateForm.value;
  }
  get f() {
    return this.weekendUpdateForm.controls;
  }

  get ff() {
    return this.weekendUpdateArray.controls;
  }
  get detailsFormAllVal() {
    return this.weekendUpdateArray.value;
  }
  reset() {
    this.weekendUpdateArray = this.fb.array([]);
    this.columns = [];
  }
  removeRow(index){
    this.weekendUpdateArray.removeAt(index);
  }

}
