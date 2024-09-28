import { AuthService } from './../../../services/auth.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Pagination } from './../../../shared/paginate';
import { ApiResponse } from './../../../models/response.model';
import { BasicEntryService } from './../../../services/system-setup/basic-entry.service';
import { BasicEntry } from './../../../models/system-setup/basic-entry.model';
import { ToastrService } from 'ngx-toastr';
import { Component, OnInit } from '@angular/core';
import { EmploymentService } from '../../../services/hr/employment.service';
import { Employment } from '../../../models/hr/employment.model';
import { EmpTypeService } from '../../../services/system-setup/EmpType.service';
import { EmpTypeModel } from '../../../models/system-setup/EmpType.model';
import { NgbDateCustomParserFormatter } from '../../../shared/dateformat';
import { EmpGenInfo } from '../../../models/hr/emp-gen-info.model';
import { EmployeeService } from '../../../services/hr/employee.service';
import { NgbDateStruct, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { SearchEmployee } from '../../../models/hr/search-emp.model';
import { KpiSetupModel } from '../../../models/Apprisal/kpisetup';

@Component({
  selector: 'app-employent-info',
  templateUrl: './employent-info.component.html',
  styleUrls: ['./employent-info.component.scss', '../../../../vendor/libs/ng-select/ng-select.scss']
})
export class EmployentInfoComponent extends Pagination implements OnInit {
  empGenBtn: string = "Save";
  userTypeId: number;
  isSubmitted = false;
  isLoading: boolean = false;
  btnStatus = "Save";
  empCode: string;
  empName: string = "";
  maxJoinYear: number;
  compId: any;
  gradeVal: any;
  employmentForm: FormGroup;
  employment: Employment = new Employment();
  allUnit: BasicEntry[] = [];
  allDepartment: BasicEntry[] = [];
  allDesignation: BasicEntry[] = [];
  allJobType: BasicEntry[] = [];
  empCodes: EmpGenInfo[] = [];
  reportToEmployees: Employment[] = [];
  allEmployeeType: EmpTypeModel[] = [];
  allProject: BasicEntry[] = [];
  allSection: BasicEntry[] = [];
  allSalaryLocation: BasicEntry[] = [];
  allWorkStation: BasicEntry[] = [];
  empGenInfo: EmpGenInfo = new EmpGenInfo();
  empSearchKeys: SearchEmployee = new SearchEmployee();
  constructor(
    private formBuilder: FormBuilder,
    private empService: EmployeeService,
    private dateFormat: NgbDateCustomParserFormatter,
    private employmentService: EmploymentService,
    private toasterservice: ToastrService,
    private modalService: NgbModal,
    private dateformat: NgbDateCustomParserFormatter
  ) { super() }

  ngOnInit() {
    this.gradeVal = AuthService.getLoggedGradeValue();
    this.compId = AuthService.getLoggedCompanyId();
    this.userTypeId = AuthService.getLoggedUserTypeId();
    this.createForm();
    this.getEmployee();
    this.getReportToEmployees();
    this.maxJoinYear = (new Date).getFullYear() + 1
  }
  getEmpInfo(empCode) {
    if (empCode == "") {
      this.reset();
      return;
    }
    this.empService.getGenInfo(this.gradeVal, this.compId, empCode).subscribe((response: ApiResponse) => {
      let empInfo = response.result as Employment;
      this.employmentForm.patchValue({
        empCode: empInfo.empCode,
        empName: empInfo.empName
      })
    })
  }
  getEmployee() {
    this.empService.getAllEmpCodeName(this.gradeVal).subscribe((response: ApiResponse) => {
      if (response.status) {
        this.empCodes = response.result as EmpGenInfo[];
      } else {
        //this.empCodes = [];
      }
    })
  }
  saveEmployment() {
    this.isSubmitted = true;

    this.f.status.setValue('Active');
    if (this.formVal.confirmationDateNgb == null) {
      console.log(this.employmentForm.value);
      this.employmentForm.patchValue({
        joinDate: this.dateFormat.ngbDateToDate(this.formVal.joinDateNgb).toLocaleDateString(),
        confirmationDate: null,
        confirmationDueDate: this.dateFormat.ngbDateToDate(this.formVal.confirmationDueDateNgb).toLocaleDateString()
      })
    }
    else {
      this.employmentForm.patchValue({
        joinDate: this.dateFormat.ngbDateToDate(this.formVal.joinDateNgb).toLocaleDateString(),
        confirmationDate: this.dateFormat.ngbDateToDate(this.formVal.confirmationDateNgb).toLocaleDateString(),
        confirmationDueDate: this.dateFormat.ngbDateToDate(this.formVal.confirmationDueDateNgb).toLocaleDateString()
      })
      this.employmentForm.get('confirmationDateNgb').patchValue(null)
      if (this.employmentForm.invalid) {
        alert()
        this.toasterservice.warning("Fill Required Fields");
        return;
      }
    }
      this.employmentService.saveEmployment(this.employmentForm.value).subscribe((response: ApiResponse) => {
        if (response.status) {
          this.toasterservice.success(response.result, "Success");
          this.isSubmitted = false;
          this.reset();
          this.getEmployment(this.formVal.empCode);
        }
        else {
          this.toasterservice.error(response.result, "Failed");
        }
      })
  }

  onSearchClick(empCode: string, searchModal: any) {
    this.employmentService.getEmployment(empCode, 1).subscribe((response: ApiResponse) => {
      if (response.status) {
        this.employment = response.result as Employment;
        this.employmentForm.patchValue(this.employment);
        this.employmentForm.patchValue({
          joinDateNgb: this.dateformat.stringToNgbDate(this.employment.joinDate),
          confirmationDateNgb: this.dateformat.stringToNgbDate(this.employment.confirmationDate),
          confirmationDueDateNgb: this.dateformat.stringToNgbDate(this.employment.confirmationDueDate)
        })
      }
      else {
        this.empSearchKeys.empCode = '';
        this.empSearchKeys.empName = '';
        this.empSearchKeys.department = '';
        this.empSearchKeys.designation = '';
        this.modalService.open(searchModal);
      }
    });
  }
  getEmployment(empCode: string) {
    if (empCode == "") {
      this.reset();
      return;
    }
    this.isLoading = true;
    this.employmentService.getEmployment(empCode, 1).subscribe((response: ApiResponse) => {
      if (response.status) {
        this.employment = response.result as Employment;
        this.employmentForm.patchValue(this.employment);
        this.employmentForm.patchValue({
          joinDateNgb: this.dateformat.stringToNgbDate(this.employment.joinDate),
          confirmationDateNgb: this.dateformat.stringToNgbDate(this.employment.confirmationDate),
          confirmationDueDateNgb: this.dateformat.stringToNgbDate(this.employment.confirmationDueDate)
        })
        let reportToempCode = this.employment.reportTo;
        this.employmentService.getEmployment(reportToempCode, 1).subscribe((response: ApiResponse) => {
          let reportToEmployement = response.result as Employment;
          this.employmentForm.patchValue({
            reportTo: reportToEmployement.empCode,
            empNameRpt: reportToEmployement.empName,
          })
        })

        let recommendToempCode = this.employment.recommendTo;

        this.employmentService.getEmployment(recommendToempCode, 1).subscribe((response: ApiResponse) => {
          let recommendToEmployement = response.result as Employment;
          this.employmentForm.patchValue({
            recommendTo:recommendToEmployement.empCode,
            empNameRcmt:recommendToEmployement.empName
          })
        })

        this.btnStatus = "Update";
        this.cancel();
      }
      else {
        this.reset();
        this.empService.getGenInfo(this.gradeVal, this.compId, empCode).subscribe((response: ApiResponse) => {
          if (response.status) {
            let empInfo = response.result as EmpGenInfo;
            this.employmentForm.patchValue({
              empCode: empInfo.empCode,
              empName: empInfo.empName+' '+empInfo.lastName
            })
          }
        })
      }
      this.isLoading = false;
    })
  }
  getReportToEmpInfo(employee) {
    if (employee) {
      this.employmentForm.patchValue({
        reportTo: employee.empCode,
        empNameRpt: employee.empName,
      })
    } else {
      this.employmentForm.patchValue({
        recommendTo:null,
        empNameRcmt:null
      })
    }
  }

  getRecommendToEmpInfo(employee) {
    if (employee) {
      this.employmentForm.patchValue({
        recommendTo:employee.empCode,
        empNameRcmt: employee.empName,
      })
    } else {
      this.employmentForm.patchValue({
        recommendTo:null,
        empNameRcmt:null
      })
    }
  }
  getReportToEmployees() {
    this.employmentService.getReportToEmployee(this.compId).subscribe((response: ApiResponse) => {
      if (response.status) {
        this.reportToEmployees = response.result as Employment[];
      }
      else {
        this.reportToEmployees = [];
      }
    })
  }
  cancel() {
    this.modalService.dismissAll();
  }
  createForm() {
    this.employmentForm = this.formBuilder.group({
      id: [0, []],
      empCode: [, [Validators.required]],
      companyID: [this.compId, []],
      businessNatureID: [, []],
      designationID: [, [Validators.required]],
      empTypeID: [, []],
      joinDate: [, []],
      joinDateNgb: [, [Validators.required]],
      jobType: [, [Validators.required]],
      empGradeID: [, [Validators.required]],
      jobDescription: [, []],
      overTimeEntityID: [, []],
      jobLocation: [1, [Validators.required]],
      projectID: [, []],
      departmentID: [, [Validators.required]],
      confirmationDate: [, []],
      confirmationDateNgb: [, []],
      confirmationDueDate: [, []],
      confirmationDueDateNgb: [, [Validators.required]],
      cardNo: [, []],
      experience: [, []],
      resident: [, []],
      isComCar: [, []],
      status: [, []],
      location: [, [Validators.required]],
      isBlock: [, []],
      unit: [, []],
      machineID: [, []],
      reportTo: ['None', []],
      recommendTo: ['None', []],
      ot: ['No', []],
      empName: [, [Validators.required]],
      gradeName: [, []],
      gradeValue: [this.gradeVal, []],
      salaryLocationID: [, []],
      type: [, []],
      active: [, []],
      workStationID: [, []],
      section: [, []],
      empNameRpt: [, []],
      empNameRcmt: [, []],
      userTypeId: [this.userTypeId, []],
    })
  }


  onCngJoindate() {
    let date=this.dateFormat.ngbDateToDate(this.employmentForm.controls.joinDateNgb.value);
    date.setMonth(date.getMonth()+6);
    date.setDate(date.getDate()+1);
    let NgbDate=this.dateFormat.dateToNgbDate(date);
    this.employmentForm.patchValue({
      confirmationDueDateNgb: NgbDate
    })
  }
  get f() {
    return this.employmentForm.controls;
  }
  get formVal() {
    return this.employmentForm.value;
  }
  reset() {
    this.createForm();
    //this.empCode=this.employmentForm.controls.empCode.value;
    this.isSubmitted = false;
    this.btnStatus = "Save";
    this.employment = null;
  }
  modalServOpen(event:any){
    this.modalService.open(event,{size: 'lg', windowClass: 'modal-xl'})

  }

}
