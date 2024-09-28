
import { AuthService } from './../../../services/auth.service';
import { Pagination } from './../../../shared/paginate';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, FormControl, Validators } from '@angular/forms';
import { AttendenceService } from '../../../services/Attendance/attendence.service';
import { ToastrService } from 'ngx-toastr';
import { SalarySetupService } from '../../../services/SalarySetup/salary-setup.service';
import { ApiResponse } from '../../../models/response.model';
import { SalaryPeriodModel } from '../../../models/SalarySetup/SalaryPeriod';
import { SalaryYear } from '../../../models/SalarySetup/salary-year';
import { AttendenceSummery } from '../../../models/Attendance/attendence-summery.model';
import { NgbDateCustomParserFormatter } from '../../../shared/dateformat';
import { AttendenceSummaryView } from '../../../models/Attendance/attendence-summary-view.model';
import { EmploymentService } from '../../../services/hr/employment.service';
import { SearchEmployee } from '../../../models/hr/search-emp.model';
import { ReportHelper } from '../../../shared/report-helper';

@Component({
  selector: 'app-monthly-attendance',
  templateUrl: './monthly-attendance.component.html',
  styleUrls: ['./monthly-attendance.component.scss',
  '../../../../vendor/libs/ng-select/ng-select.scss',
  '../../../../vendor/libs/angular2-ladda/angular2-ladda.scss']
})
export class MonthlyAttendanceComponent extends Pagination implements OnInit {

  monthlyAttnForm: FormGroup
  comId: number;
  userId: number;
  gradeId: number;
  salaryYearItem: SalaryYear[] = [];
  salaryPeriodItem: SalaryPeriodModel[] = [];
  attendenceItem: AttendenceSummery[] = [];
  empAttnMonthlyViewArray: FormArray;
  isSubmitted = false;
  isShowData = false;
  isForEdit = false;
  btnStatus = "Save";
  isLoading: boolean = false;
  isExporting:boolean = false;
  constructor(
    private formBuilder: FormBuilder,
    private attenService: AttendenceService,
    private toster: ToastrService,
    private dateFormator: NgbDateCustomParserFormatter,
    private empService: EmploymentService,
    private reportHelper:ReportHelper
  ) {
    super();
    this.empAttnMonthlyViewArray = this.formBuilder.array([])
  }
  title = "Employee Attendance";
  ngOnInit() {
    this.items = [];
    this.update();
    this.comId = AuthService.getLoggedCompanyId();
    this.gradeId = AuthService.getLoggedGradeValue();
    this.createMonthlyAttendenceForm();
  }

  // getYear(yearName:any){
  //   this.monthlyAttnForm.patchValue({
  //     yearID:yearName.id
  //   })
  // }

  getDepartment(dep: any) {
    if (dep == null) {
      return;
    } else {
      this.f['depertment'].patchValue(dep.id)
    }

  }

  getProject(projId: any) {
    if (projId == null) {
      return;
    } else {
      this.f['project'].patchValue(projId.id)
    }
  }

  getBranchId(branch: any) {
    if (branch == null) {
      return;
    } else {
      this.f['branch'].patchValue(branch.id)
    }
  }



  getEmployment(empCode: string, rowIndex: number) {
    if (empCode == "") {
      this.empAttnMonthlyViewArray.controls[rowIndex].patchValue({
        empName: null,
        department: null,
        designation: null
      })
      return;
    }
    this.empService.getEmployment(empCode, this.comId).subscribe((response: ApiResponse) => {
      if (response.status) {
        let employee = response.result as SearchEmployee;
        this.empAttnMonthlyViewArray.controls[rowIndex].patchValue({
          empName: employee.empName,
          department: employee.department,
          designation: employee.designation
        })
      }
      else {
        this.empAttnMonthlyViewArray.controls[rowIndex].patchValue({
          empName: null,
          department: null,
          designation: null
        })
      }
    })
  }


  forEditAttendence() {
    this.isShowData = false;
    this.isForEdit = true;
    this.isLoading = true;
    if (this.monthlyAttnForm.invalid) {
      //this.toster.warning("Fill Required Fields");
    } else {
      let obj = new AttendenceSummery();
      obj.companyID = this.monthlyAttnForm.controls['companyID'].value;
      obj.periodID = this.monthlyAttnForm.controls['periodID'].value;
      obj.depertment = this.monthlyAttnForm.controls['depertment'].value;
      obj.project = this.monthlyAttnForm.controls['project'].value;
      obj.empCode = this.monthlyAttnForm.controls['empCode'].value;
      this.attenService.forEditAttendence(obj).subscribe((response: ApiResponse) => {
        if (response.status) {
          this.items = response.result as AttendenceSummaryView[];
          console.log(this.items);
          this.update();
          this.empAttnMonthlyViewArray = this.formBuilder.array([]);
          this.items.forEach(item => {
            this.empAttnMonthlyViewArray.push(
              new FormGroup({
                empCode: new FormControl(item.empCode),
                empName: new FormControl(item.empName),
                designation: new FormControl(item.designation),
                department: new FormControl(item.department),
                totalDay: new FormControl(item.totalDay),
                attendenceDay: new FormControl(item.attendenceDay),
                leaveWithPay: new FormControl(item.leaveWithPay),
                leavewithOutPay: new FormControl(item.leavewithOutPay),
                holiday: new FormControl(item.holiday),
                absent: new FormControl(item.absent),
                remarks: new FormControl(item.remarks),
                startDate: new FormControl(item.startDate),
                endDate: new FormControl(item.endDate),
                companyID: new FormControl(item.companyID),
              }))
          }); this.btnStatus = "Update";
        } else {
          this.items = [];
          this.update();
          this.empAttnMonthlyViewArray = this.formBuilder.array([]);
        }
        this.isLoading = false;
      },err=>{
        this.toster.error('An unexpected error occured');
        console.error(err);
        this.isLoading = false;
      });
    }

  }


  getPeriodListByYearId(id: number) {
    if (id == null) {
      return;
    } else {
      this.f['yearID'].patchValue(id);
      this.attenService.getPeriodListByYearID(id).subscribe((response: ApiResponse) => {
        if (response.status) {
          this.salaryPeriodItem = response.result as SalaryPeriodModel[];

        } else {
          this.salaryPeriodItem = [];
        }
      });
    }
  }

  fillDateControl(id: number) {
    if (id == null) {
      return;
    } else {
      let Sdate = this.salaryPeriodItem.find(sD => sD.id == id).sDate;
      let Edate = this.salaryPeriodItem.find(eD => eD.id == id).eDate;
      this.monthlyAttnForm.patchValue({
        startDateNgb: this.dateFormator.stringToNgbDate(Sdate.toString()),
        endDateNgb: this.dateFormator.stringToNgbDate(Edate.toString()),
        startDate: Sdate,
        endDate: Edate
      });
    }


  }

  showData() {
    this.isForEdit = false;
    this.isShowData = true;
    if (this.f.startDateNgb.invalid) {
      this.toster.info("Please Select StartDate", "Warning");
      return;
    }
    else if (this.f.endDateNgb.invalid) {
      this.toster.info("Please Select End Date", "Warning");
      return;
    }
    else {
      let obj = new AttendenceSummery();
      obj = this.monthlyAttnForm.value;
      this.isLoading = true;
      this.attenService.getShowDataMonthlyAttendence(obj).subscribe((response: ApiResponse) => {
        if (response.status) {
          this.items = response.result as AttendenceSummaryView[];
          this.update();
          this.empAttnMonthlyViewArray = this.formBuilder.array([]);
          this.items.forEach(item => {
            this.empAttnMonthlyViewArray.push(
              new FormGroup({
                empCode: new FormControl(item.empCode),
                empName: new FormControl(item.empName),
                designation: new FormControl(item.designation),
                department: new FormControl(item.department),
                totalDay: new FormControl(item.totolDay),
                attendenceDay: new FormControl(item.attendenceDay),
                leaveWithPay: new FormControl(item.leaveWithPay),
                leavewithOutPay: new FormControl(item.leavewithOutPay),
                holiday: new FormControl(item.holiday),
                remarks: new FormControl(item.remarks,),
                absent: new FormControl(item.absent),
                startDate: new FormControl(item.startDate),
                endDate: new FormControl(item.endDate),
                companyID:new FormControl(item.companyID)
              }))
          })
          this.forEditAttendence();
        } else {
          this.items = [];
          this.update();
          this.empAttnMonthlyViewArray = this.formBuilder.array([]);
        }
        this.isLoading = false;
      },err=>{
        this.toster.error('An Unexpected error occured.');
        console.log(err);
        this.isLoading = false;
      });
    }
  }
  exportToXl(){
    this.isExporting = true;
    this.attenService.getAttSummeryAsXl(this.empAttnMonthlyViewArray.value)
    .subscribe((response)=>{
      if(response){
        this.reportHelper.openFileWindow(response,'EmpIncrInfo')
      }
      this.isExporting = false;
    },err=>{
      this.toster.error('An Unexpecterd error occured');
      console.error(err);
      this.isExporting = false;
    })
  }
  removeAdditionRow(index: number) {
    this.empAttnMonthlyViewArray.removeAt(index);
  }

  saveMonthlyAttendence() {
    this.isForEdit = true;
    this.isShowData = true;
    this.isSubmitted = true;
    if (this.monthlyAttnForm.invalid) {
    } else {
      let obj = new AttendenceSummery();
      obj = this.monthlyAttnForm.value;
      obj.attendenceSummaryView = this.empAttnMonthlyViewArray.value;
      this.attenService.saveMonthlyAttendence(obj).subscribe((response: ApiResponse) => {
        if (response.status) {
          this.toster.success(response.result, "Success");
          this.Reset();
        }
        else {
          this.toster.error(response.result, "Failed");
        }
      });
    }
  }

  Onsubmit() {
    if (this.btnStatus == "Save") {
      this.saveMonthlyAttendence();
    }
    else {
      this.saveMonthlyAttendence();
    }
  }

  createMonthlyAttendenceForm() {
    this.monthlyAttnForm = this.formBuilder.group({
      id: [0, []],
      empCode: [, []],
      companyID: [this.comId, []],
      userID: [0, []],
      yearID: [, [Validators.required]],
      periodID: [, [Validators.required]],
      depertment: [, []],
      branch: [, []],
      startDate: [, [Validators.required]],
      startDateNgb: [, [Validators.required]],
      endDate: [, [Validators.required]],
      endDateNgb: [, [Validators.required]],
      grade: [this.gradeId, []],
      project: [, []]


    })
  }

  get f() {
    return this.monthlyAttnForm.controls;
  }
  get formVal() {
    return this.monthlyAttnForm.value;
  }

  Reset() {
    this.btnStatus = "Save";
    this.isForEdit = false;
    this.isSubmitted = false;
    this.isShowData = false;
    this.empAttnMonthlyViewArray = this.formBuilder.array([]);
    this.monthlyAttnForm.reset();
    this.createMonthlyAttendenceForm();
    this.items = [];
    this.update();
  }
}
