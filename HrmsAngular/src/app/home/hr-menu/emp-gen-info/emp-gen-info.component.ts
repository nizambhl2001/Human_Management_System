import { AuthService } from './../../../services/auth.service';
import { GenderComponent } from './../../system-setup/basic-entry/gender/gender.component';
import { SearchEmployee } from './../../../models/hr/search-emp.model';
import { ApiResponse } from './../../../models/response.model';
import { NgbDateStruct, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { BasicEntryService } from './../../../services/system-setup/basic-entry.service';
import { BasicEntry } from './../../../models/system-setup/basic-entry.model';
import { NgbDateCustomParserFormatter } from './../../../shared/dateformat';
import { EmpGenInfo } from './../../../models/hr/emp-gen-info.model';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { EmployeeService } from '../../../services/hr/employee.service';
import { Pagination } from '../../../shared/paginate';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { DateOperationService } from '../../../services/date-operation.service';
import { ToastrService } from 'ngx-toastr';
import { ReportService } from '../../../services/report.service';
import { ReportHelper } from '../../../shared/report-helper';


@Component({
  selector: 'app-emp-gen-info',
  templateUrl: './emp-gen-info.component.html',
  styleUrls: [
    './emp-gen-info.component.scss',
    '../../../../vendor/libs/angular-2-dropdown-multiselect/angular-2-dropdown-multiselect.scss',
    '../../../../vendor/libs/ng-select/ng-select.scss',
    '../../../../vendor/libs/angular2-ladda/ladda.scss'
  ]
})
export class EmpGenInfoComponent extends Pagination implements OnInit {
  title = "Employee General Information";
  isLoading: boolean = false;
  isSubmitted: boolean = false;
  empGenBtn: string = "Save";
  empGenInfoForm: FormGroup;
  minimumDate: NgbDateStruct = { year: 1800, month: 1, day: 1 };
  maximumDate: NgbDateStruct = { year: new Date().getFullYear(), month: new Date().getMonth() + 1, day: new Date().getDate() };
  empCode: string;
  empName: string = "";
  compId: any;
  gradeVal: any;
  GradeValue:number;
  allSuffix: BasicEntry[] = [];
  allPrefix: BasicEntry[] = [];
  allGender: BasicEntry[] = [];
  allBloodGroup: BasicEntry[] = [];
  allReligion: BasicEntry[] = [];
  allNationality: BasicEntry[] = [];
  allMaritalStatus: BasicEntry[] = [];
  allOccupation: BasicEntry[] = [];
  empSearchKeys: SearchEmployee = new SearchEmployee();
  filteredEmployees: SearchEmployee[] = [];
  empGenInfo: EmpGenInfo = new EmpGenInfo();
  employees: string[] = [];
  selectedEmp:string[]=[];
  constructor(
    private fb: FormBuilder,
    private empService: EmployeeService,
    private dateFormat: NgbDateCustomParserFormatter,
    private toaster: ToastrService,
    private modalService: NgbModal,
    private dateService: DateOperationService,
    private rptService: ReportService,
    private rptHelper: ReportHelper
  ) {
    super();
  }
  ngOnInit() {
    this.compId = AuthService.getLoggedCompanyId();
    this.GradeValue=AuthService.getLoggedGradeValue();
    this.gradeVal = -1;
    this.createForm();

    // this.empService.getMaxEmpCode().subscribe(res=>{
    //   this.empGenInfoForm.patchValue({
    //     empCode:res
    //   })
    // })
    this.getEmployee();
  }
  saveOrUpdateEmpGen() {
    this.isSubmitted = true;
    console.log(this.empGenInfoForm);
    if (this.empGenInfoForm.invalid) {
      this.toaster.error('Please fill all required field, * mark are required');
      return;
    }
    this.empGenInfoForm.patchValue({
      dob: this.dateFormat.ngbDateToDate(this.formVal.dob).toLocaleDateString(),
      originalBirthDate: this.dateFormat.ngbDateToDate(this.formVal.dob).toLocaleDateString(),
    })
    this.empService.saveOrUpdateEmpGenInfo(this.formVal).subscribe((response: any) => {
      if (response.status) {
        this.toaster.success(response.result, 'Success');
        this.reset();
      } else {
        this.toaster.error(response.result, 'Failed');
      }
    })
  }
  getEmpGenInfo(empCode: string) {
    debugger
    if (!empCode || empCode == "") {
      this.reset();
      return; }
      this.selectedEmp = [];
      this.selectedEmp.push(empCode);
    this.empGenInfoForm.patchValue({ empCode: empCode })
    this.isLoading = true;
    this.empService.getGenInfo(this.GradeValue, this.compId, empCode).subscribe((response: any) => {
      if (response.status) {
        this.empGenBtn = 'Update';
        this.empGenInfoForm.patchValue(response.result);
        this.empCode = this.formVal.empCode;
        let lastName = this.formVal.lastName ? this.formVal.lastName : '';
        this.empName = this.formVal.empName + ' ' + lastName;
        this.empGenInfoForm.patchValue({
          dob: this.dateFormat.stringToNgbDate(this.formVal.dob),
          passportIssueDateNgb:this.dateFormat.stringToNgbDate(this.formVal.passportIssueDate),
          // this.dateFormat.dateToNgbDate(
          //   (this.formVal.passportIssueDate==null || this.formVal.passportIssueDate=='')?null:new Date(this.formVal.passportIssueDate as Date)),
          passportExpairedDateNgb: this.dateFormat.stringToNgbDate(this.formVal.passportExpairedDate)
          // this.dateFormat.dateToNgbDate(
          //   (this.formVal.passportExpairedDate==null || this.formVal.passportExpairedDate=='')?null:new Date(this.formVal.passportExpairedDate as Date)),
        })
        this.modalService.dismissAll();
      }
      else {
        this.createForm();
        this.empGenInfoForm.patchValue({ empCode: empCode })
        this.toaster.error('No Employee found')
      }
      this.isLoading = false;
    });
  }
  onSearchClick(empCode: string, searchModal: any) {
    debugger
    this.empService.getGenInfo(this.gradeVal, this.compId, empCode).subscribe((response: any) => {
      if (response.status) {
        debugger
        this.empGenBtn = 'Update';
        this.empGenInfo = response.result as EmpGenInfo;
        console.log(this.empGenInfo);
        this.empGenInfoForm.controls.empCode.setValue(this.empGenInfo.empCode);
        this.empCode = this.empGenInfo.empCode;
        this.empName = this.empGenInfo.empName;
        this.empGenInfo.dobNgb = this.dateFormat.stringToNgbDate(this.empGenInfo.dob);
        this.empGenInfo.passportIssueDateNgb = this.dateFormat.stringToNgbDate(this.empGenInfo.passportIssueDate);
        this.empGenInfo.passportExpairedDateNgb = this.dateFormat.stringToNgbDate(this.empGenInfo.passportExpairedDate);
        this.reset();
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
  getAge() {
    if (this.formVal.dob != null) {
      let dob = this.dateFormat.ngbDateToDate(this.formVal.dob);
      this.dateService.dateOperation(dob, (new Date())).subscribe(
        (response: ApiResponse) => {
          if (response.status) {
            this.formControl['age'].patchValue(response.result)
          }
        }
      )
    }
  }
  getEmpCV() {
    let empCode = this.formVal.empCode;
    if (empCode == '' || empCode == null) {
      this.toaster.error('Select an Employee...', 'Employee not found!')
    } else {
      let filterModel: any = {
        ReportId: 32,
        ExportType: 'pdf',
        CompanyID: this.compId,
        EmpCode: empCode,
        RptType: 2 //RptType=2 fixed from Stored procedure to get Promotion
      }
      console.log(filterModel);
      this.rptService.getBasicInfoReport(filterModel).subscribe(
        (exportedFile: Blob) => {
          this.rptHelper.openFileWindow(exportedFile);
        }
      )
    }
  }
  getEmployee() {
    this.empService.getAllEmpCodeName(this.GradeValue).subscribe((response: ApiResponse) => {
      if (response.status) {
        this.employees = (response.result as EmpGenInfo[]).map(c => c.empCode);
      } else {
        this.employees = [];
      }
    })
  }
  reset() {
    this.createForm();
    this.isSubmitted = false;
    this.empGenBtn = "Save";
    this.empCode = "";
    this.empName = "";
    this.selectedEmp = [];
    document.getElementById('pictureFileName').innerText = 'Choose file...'
    document.getElementById('signatureFileName').innerText = 'Choose file...'
  }
  cancel() {
    this.modalService.dismissAll();
    this.tempItems = [];
  }
  createForm() {
    this.empGenInfoForm = this.fb.group({
      id: [0, []],
      empCode: [, [Validators.required]],
      empName: [, [Validators.required]],
      lastName: [, []],
      shortName: [, []],
      fName: [, []],
      fatherOccupation: [, []],
      mName: [, []],
      motherOccupation: [, []],
      wifeName: [, []],
      email: [, []],
      nationality: [, [Validators.required]],
      weight: [, []],
      height: [, []],
      gender: [, [Validators.required]],
      dob: [, [Validators.required]],
      nationalId: [, []],
      tinNo: [, []],
      religion: [, [Validators.required]],
      meritalStatus: [-1, [Validators.required]],
      pasportNo: [, []],
      bloodGroup: [, []],
      remarks: [, []],
      companyID: [this.compId, []],
      gradeValue: [, []],
      gradeId: [, []],
      status: [, []],
      originalBirthDate: [, []],
      age: [, []],
      cardID: [, []],
      active: [, []],
      picture: [, []],
      pictureFile: [, []],
      signature: [, []],
      signatureFile: [, []],
      passportExpairedDate: [, []],
      passportExpairedDateNgb: [, []],
      title: [, []],
      suffix: [, []],
      child: [, []],
      passportIssueDate: [, []],
      passportIssueDateNgb: [, []],
    })
  }
  get formControl() {
    return this.empGenInfoForm.controls;
  }
  get formVal() {
    return this.empGenInfoForm.value;
  }

}

