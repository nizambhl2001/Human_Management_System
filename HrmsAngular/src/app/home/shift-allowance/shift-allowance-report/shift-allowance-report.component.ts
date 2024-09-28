import { AuthService } from './../../../services/auth.service';
import { SalarySetupService } from './../../../services/SalarySetup/salary-setup.service';
import { SalaryPeriodModel } from './../../../models/SalarySetup/SalaryPeriod';
import { Component, OnInit } from '@angular/core';
import { Pagination } from '../../../shared/paginate';
import { SearchEmployee } from '../../../models/hr/search-emp.model';
import { BasicEntry } from '../../../models/system-setup/basic-entry.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbDateCustomParserFormatter } from '../../../shared/dateformat';
import { ToastrService } from 'ngx-toastr';
import { ReportHelper } from '../../../shared/report-helper';
import { BasicEntryService } from '../../../services/system-setup/basic-entry.service';
import { EmploymentService } from '../../../services/hr/employment.service';
import { ApiResponse } from '../../../models/response.model';
import { ShiftAllowanceService } from '../../../services/ShiftAllowance/Shift-setup';
import { HttpErrorResponse } from '@angular/common/http';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { BonusType } from '../../../models/Addition/bonus-types';
import { BonusTypeService } from '../../../services/Bonus/bonusType.service';
import { ReportService } from '../../../services/report.service';

@Component({
  selector: 'app-shift-allowance-report',
  templateUrl: './shift-allowance-report.component.html',
  styleUrls: [
    './shift-allowance-report.component.scss',
    '../../../../vendor/libs/angular2-ladda/ladda.scss',
    '../../../../vendor/libs/ng-select/ng-select.scss'
  ]
})
export class ShiftAllowanceReportComponent extends Pagination implements OnInit {

  _compId: number;
  _gradeValue: number;
  exporting: boolean = false;
  _isSubmit: boolean = false;

  _shiftReportForm: FormGroup;
  _reportTypeList: any[] = [];
  _employees: SearchEmployee[] = [];
  _departments: BasicEntry[] = []
  _branches: BasicEntry[] = [];
  _projects: BasicEntry[] = [];
  _salaryPeriods: SalaryPeriodModel[] = [];
  _bonusType:BonusType[]=[];

  constructor(
    private fb: FormBuilder,
    private dateFormat: NgbDateCustomParserFormatter,
    public modalService:NgbModal,
    private toaster: ToastrService,
    private periodService: SalarySetupService,
    private bonusService:BonusTypeService,
    private reportHelper: ReportHelper,
    private rptService:ReportService,
    private basicEntryService: BasicEntryService,
    private empService: EmploymentService,
    private shiftService: ShiftAllowanceService
  ) {
    super();
  }
  title = "Shift Allowance Report";
  ngOnInit() {
    this._compId = AuthService.getLoggedCompanyId();
    this._gradeValue = AuthService.getLoggedGradeValue();

    this.createForm();
    this.getReportTypeList();
    this.getEmployees(this._compId, this._gradeValue);
    this.getDepartments();
    this.getBranches();
    this.getProjects();
    this.getSalaryPeriods();
    this.getBonusType();
  }

  getReportTypeList() {
    this._reportTypeList = [
      { ReportId: 78, TypeName: 'Shift Allowance by Shift' },
      { ReportId: 79, TypeName: 'Shift Allowance by Amount' },
      { ReportId: 80, TypeName: 'Shift Amount' },
    ]
  }
  getEmployees(compId: number, gradeValue: number) {
    this.empService.getAllEmpBasicInfo(compId, gradeValue)
      .subscribe((response: ApiResponse) => {
        if (response.status) {
          this._employees = response.result as SearchEmployee[];
        }
      })
  }
  getDepartments() {
    this.basicEntryService.getDepartment().subscribe((response: ApiResponse) => {
      if (response.status) {
        this._departments = response.result as BasicEntry[];
        this.sortBy = 'description';
        this.sortDesc = false;
        this.sort(this._departments);
      }
    })
  }
  getProjects() {
    this.basicEntryService.getProject().subscribe((response: ApiResponse) => {
      if (response.status) {
        this._projects = response.result as BasicEntry[];
      }
    })
  }
  getBranches() {
    this.basicEntryService.getBranch().subscribe((response: ApiResponse) => {
      if (response.status) {
        this._branches = response.result as BasicEntry[];
        this.sortBy = 'description';
        this.sort(this._branches);
      }
    })
  }
  getSalaryPeriods() {
    this.periodService.getAllperiod().subscribe((response: ApiResponse) => {
      if (response.status) {
        this._salaryPeriods = response.result as SalaryPeriodModel[];
        this.sortBy = 'periodName';
        this.sortDesc = true;
        this.sort(this._salaryPeriods);
      }
    })
  }
  getBonusType(){
    this.bonusService.getBonusType().subscribe((response:ApiResponse)=>{
      if(response.status){
        this._bonusType = (response.result as BonusType[]).filter(c=> ([11,12,13,14].includes(c.id)));
      }
    })
  }
  onEmpSelect(empCode: any) {
    if (empCode != null && empCode != '') {
      let emp = this._employees.find(c => c.empCode == empCode);
      this._shiftReportForm.patchValue({
        EmpCode: empCode,
        EmpName: emp.empName,
        Designation: emp.designation
      })
    }else{
      this._shiftReportForm.patchValue({
        EmpCode: null,
        EmpName: null,
        Designation: null
      })
    }
  }
  convertStartDate() {
    if(this._shiftReportForm.value.StrDate){
      this._shiftReportForm.patchValue({
        StartDate:this.dateFormat.getNgbDateToYyyymmdd(this._shiftReportForm.value.StrDate),
        StrDate: this.dateFormat.getNgbDateToYyyymmdd(this._shiftReportForm.value.StrDate),
      })
    }
  }
  convertEndDate() {
    if(this._shiftReportForm.value.EndDate){
      this._shiftReportForm.patchValue({
        EndDate: this.dateFormat.getNgbDateToYyyymmdd(this._shiftReportForm.value.EndDate),
      })
    }
  }
  export() {
    this.exporting = true;
    this._isSubmit = true;
    if (this._shiftReportForm.invalid) {
      this.toaster.error('Invalid Submission.')
      this.exporting = false;;
      return;
    }
    this.convertStartDate();
    this.convertEndDate();
    this.rptService.getShiftAllowanceReport(this._shiftReportForm.value)
      .subscribe(
        exportedFile => {
          this.exporting = false;
          this._shiftReportForm.patchValue({
            StartDate:this.dateFormat.getCurrentNgbDate(),
            StrDate: this.dateFormat.getCurrentNgbDate(),
            EndDate: this.dateFormat.getCurrentNgbDate()
          })
          this.reportHelper.openFileWindow(exportedFile as Blob);
        },
        (err: HttpErrorResponse) => {
          this.exporting = false;
          this.toaster.error(err.message, 'Failed!');
        })
  }
  createForm() {
    this._shiftReportForm = this.fb.group({
      ReportId: [, [Validators.required]],
      ExportType:['pdf',[Validators.required]],
      CompanyID: [this._compId, []],
      EmpCode: [, []],
      EmpName: [, []],
      Designation: [, []],
      GradeValue: [this._gradeValue, []],
      GradeValueas: [this._gradeValue, []],
      DepartmentID: [, []],
      BranchID: [, []],
      ProjectID: [, []],
      PeriodID: [, []],
      BonusType: [, []],
      StartDate:[this.dateFormat.getCurrentNgbDate(),[]],
      StrDate: [this.dateFormat.getCurrentNgbDate(), []],
      EndDate: [this.dateFormat.getCurrentNgbDate(), []]
    })
  }
  get formVal(){
    return this._shiftReportForm.value;
  }

}

