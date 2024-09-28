import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder, FormControl, FormArray } from '@angular/forms';
import { NgbDateCustomParserFormatter } from '../../../shared/dateformat';
import { AuthService } from '../../../services/auth.service';
import { ApiResponse } from '../../../models/response.model';
import { EmploymentService } from '../../../services/hr/employment.service';
import { Employment } from '../../../models/hr/employment.model';
import { AttendenceService } from '../../../services/Attendance/attendence.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-monthly-data-process',
  templateUrl: './monthly-data-process.component.html',
  styleUrls: ['./monthly-data-process.component.scss',
  '../../../../vendor/libs/angular-2-dropdown-multiselect/angular-2-dropdown-multiselect.scss',
  '../../../../vendor/libs/ng-select/ng-select.scss']
})
export class MonthlyDataProcessComponent implements OnInit {
  dateOfNextWeek: any;
  compId: number;
  empCode: string;
  columns: string[] = [];
  assignedShiftForms: FormArray;
  empCodes:Employment[]=[];
  isLoading: boolean = false;
  shiftDayFilterForm: FormGroup;
  constructor(
    private attendanceService:AttendenceService,
    private employmentES:EmploymentService,
    private fb: FormBuilder,
    private toaster: ToastrService,
    private dateFormat: NgbDateCustomParserFormatter,

  ) {

  }
  ngOnInit() {
    this.dateOfNextWeek = this.dateFormat.addDays(7);
    this.createShiftDayFilterForm();
    this.compId = AuthService.getLoggedCompanyId();
    this.empCode=AuthService.getLoggedEmpCode();
    this.getEmployees();
    this.assignedShiftForms = this.fb.array([]);
  }
  getEmpInfo(empCode:string){
    if (empCode == "") {
      return;
    }
    this.employmentES.getEmployment(empCode,this.compId).subscribe((response:ApiResponse)=>{
      let empInfo=response.result as Employment;
      this.shiftDayFilterForm.patchValue({
       empCode:empInfo.empCode,
       empName:empInfo.empName
     })
    })
  }
  getEmployees(){
    this.attendanceService.getEmpCodeByReportTo(this.empCode,this.compId).subscribe((response:ApiResponse)=>{
      if(response.status){
        this.empCodes=response.result as Employment[];
      }
      else{
        this.empCodes=[];
      }
    })
  }
  getAssignedShift() {
    if (this.shiftDayFilterForm.invalid) {
      this.toaster.error('Date field is required!', 'Invalid Submission!');
      return;
    }
    this.isLoading = true;
    this.formVal.reportTo=this.f.empCode.value;
    this.attendanceService.getAssignedShift(this.formVal).subscribe((response: ApiResponse) => {
      if (response.status) {
        this.columns = Object.keys((response.result as any[])[0]);
        this.lodaDataTable(response.result as any[])
      } else {
        this.isLoading = false;
        this.columns = [];
        this.assignedShiftForms = this.fb.array([]);
      }
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
  createShiftDayFilterForm() {
    this.shiftDayFilterForm = this.fb.group({
      empName:[,[]],
      empCode:[,[]],
      fromDate: [, [Validators.required]],
      reportTo:[,[]],
      toDate: [this.dateFormat.ngbDateToDate(this.dateOfNextWeek).toLocaleDateString(), [Validators.required]],
      companyID: [1, []],
    })
  }
  get formVal() {
    return this.shiftDayFilterForm.value;
  }
  get f() {
    return this.shiftDayFilterForm.controls;
  }
}
