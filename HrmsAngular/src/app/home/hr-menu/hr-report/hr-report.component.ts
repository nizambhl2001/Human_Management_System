import { AuthService } from './../../../services/auth.service';
import { SalarySetupService } from './../../../services/SalarySetup/salary-setup.service';
import { PayscaleModel } from './../../../models/SalarySetup/payscal';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { BasicEntry } from '../../../models/system-setup/basic-entry.model';
import { NgbDateCustomParserFormatter } from '../../../shared/dateformat';
import { ToastrService } from 'ngx-toastr';
import { ReportHelper } from '../../../shared/report-helper';
import { BasicEntryService } from '../../../services/system-setup/basic-entry.service';
import { Pagination } from '../../../shared/paginate';
import { ApiResponse } from '../../../models/response.model';
import { EmploymentService } from '../../../services/hr/employment.service';
import { SearchEmployee } from '../../../models/hr/search-emp.model';
import { HttpErrorResponse } from '@angular/common/http';
import { stringify } from '@angular/core/src/render3/util';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ReportService } from '../../../services/report.service';

@Component({
  selector: 'app-hr-report',
  templateUrl: './hr-report.component.html',
  styleUrls: [
    './hr-report.component.scss',
    '../../../../vendor/libs/angular2-ladda/ladda.scss',
    '../../../../vendor/libs/ng-select/ng-select.scss',
  ]
})
export class HrReportComponent extends Pagination implements OnInit {

  _compId: number;
  _gradeValue: number;
  exporting: boolean = false;
  _exportingXls: boolean = false;
  _isSubmit: boolean = false;

  _hrReportForm: FormGroup;
  _reportTypeList: any[] = [];
  _employees: SearchEmployee[] = [];
  _genders:BasicEntry[]=[];
  _religions:BasicEntry[]=[];
  _payScaleGrades:PayscaleModel[]=[];
  _locations:BasicEntry[]=[];
  _jobTypes:BasicEntry[]=[];
  _bloodGroup:BasicEntry[]=[];
  _maritalStatus:BasicEntry[]=[];
  _educations:BasicEntry[]=[];
  _departments: BasicEntry[] = [];
  _branches: BasicEntry[] = [];
  _projects: BasicEntry[] = [];


  constructor(
    private fb: FormBuilder,
    private toaster: ToastrService,
    private modalService:NgbModal,
    private reportHelper: ReportHelper,
    private basicEntryService: BasicEntryService,
    private empService: EmploymentService,
    private payScaleService:SalarySetupService,
    private hrRptService: ReportService) {
    super();
  }
  ngOnInit() {
    this._compId = AuthService.getLoggedCompanyId();
    this._gradeValue = AuthService.getLoggedGradeValue();
    this.createForm();
    this.getReportTypeList();
    this.getEmployees(this._compId, this._gradeValue);
    this.getGenders();
    this.getReligions();
    this.getPayScaleGrade();
    this.getLocations();
    this.getJobType();
    this.getBloodGroup();
    this.getMaritalStatus();
    this.getEducations();
    this.getDepartments();
    this.getBranches();
    this.getProjects();
  }
  getReportTypeList() {
    this._reportTypeList = [
      { ReportId: 11, TypeName: 'Male Female List' },
      { ReportId: 12, TypeName: 'Religion List' },
      { ReportId: 13, TypeName: 'Grade Wise Employee' },
      { ReportId: 14, TypeName: 'Location Wise' },
      { ReportId: 15, TypeName: 'Contact No' },
      { ReportId: 16, TypeName: 'Address' },
      { ReportId: 17, TypeName: 'Job Type' },
      { ReportId: 18, TypeName: 'Blood Group' },
      { ReportId: 19, TypeName: 'Marital Status' },
      { ReportId: 20, TypeName: 'Children' },
      { ReportId: 21, TypeName: 'Education Information' },
      { ReportId: 22, TypeName: 'Education Degree Wise' },
      { ReportId: 23, TypeName: 'Block Employee List' },
      { ReportId: 24, TypeName: 'Employee with Email' },
      { ReportId: 25, TypeName: 'Employee without Email' },
      { ReportId: 26, TypeName: 'Employee Bank Info' },
      { ReportId: 27, TypeName: 'Employee Basic Info' },
      { ReportId: 28, TypeName: 'All Employee Basic Info' },
      { ReportId: 29, TypeName: 'Casual Joining' },
      { ReportId: 30, TypeName: 'Joining Date' },
      { ReportId: 31, TypeName: 'Birth Date' },
      { ReportId: 32, TypeName: 'Single Employee Details' },
      { ReportId: 33, TypeName: 'Job Description Report' },
      { ReportId: 34, TypeName: 'Passport Info Report' },
      { ReportId: 35, TypeName: 'Employee with Image' },
      { ReportId: 36, TypeName: 'Employee Complain Report' },
      { ReportId: 208, TypeName: 'National ID' },
      { ReportId: 209, TypeName: 'Employee TIN' },
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
  onSelectEmpCode(empCode:any) {
    if (empCode != '' && empCode!=null) {
      let emp = this._employees.find(c => c.empCode == empCode);
      this._hrReportForm.patchValue({
        EmpCode:empCode,
        EmpName: emp.empName,
        DepartmentID: emp.departmentID,
        BranchID: emp.jobLocation
      })
    }else{
      this._hrReportForm.patchValue({
        EmpName: null,
        DepartmentID: null,
        BranchID: null
      })
    }
  }
  getGenders(){
    this.basicEntryService.getGender().subscribe((response:ApiResponse)=>{
      if(response.status){
        this._genders = response.result as BasicEntry[];
      }
    })
  }
  getReligions(){
    this.basicEntryService.getReligion().subscribe((response:ApiResponse)=>{
      if(response.status){
        this._religions = response.result as BasicEntry[];
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
  getPayScaleGrade(){
    this.payScaleService.getAllpayscale(this._compId, 4).subscribe((response: ApiResponse) => {
      if (response.status) {
        this._payScaleGrades = response.result as PayscaleModel[];
        this.sortBy = 'payScale';
        this.sortDesc = false;
        this.sort(this._payScaleGrades);
      }
    })
  }
  getLocations() {
    this.basicEntryService.getLocation().subscribe((response: ApiResponse) => {
      if (response.status) {
        this._locations = response.result as BasicEntry[];
        this.sortBy = 'description';
        this.sort(this._locations);
      }
    })
  }
  getJobType() {
    this.basicEntryService.getJobType().subscribe((response: ApiResponse) => {
      if (response.status) {
        this._jobTypes = response.result as BasicEntry[];
        this.sortBy = 'description';
        this.sort(this._jobTypes);
      }
    })
  }
  getBloodGroup() {
    this.basicEntryService.getBlood().subscribe((response: ApiResponse) => {
      if (response.status) {
        this._bloodGroup = response.result as BasicEntry[];
        this.sortBy = 'description';
        this.sort(this._bloodGroup);
      }
    })
  }
  getMaritalStatus() {
    this.basicEntryService.getMaritalStatus().subscribe((response: ApiResponse) => {
      if (response.status) {
        this._maritalStatus = response.result as BasicEntry[];
        this.sortBy = 'description';
        this.sort(this._bloodGroup);
      }
    })
  }
  getEducations() {
    this.basicEntryService.getEduLevel().subscribe((response: ApiResponse) => {
      if (response.status) {
        this._educations = response.result as BasicEntry[];
        this.sortBy = 'description';
        this.sort(this._educations);
      }
    })
  }

  onSearchBtnClick(modal:any){
    this.modalService.open(modal);
  }
  onDeptChange() {
    let deptId = this._hrReportForm.value.DepartmentID;
    if (deptId == null || deptId == '') {
      this._hrReportForm.patchValue({
        depertment: -1,
        DepartmentID:-1,
        DeparetmentID:-1
      })
    }else{
    this._hrReportForm.patchValue({
      depertment: deptId,
      DepartmentID:deptId,
      DeparetmentID: deptId
    })
    }
  }
  onBranchChange() {
    let branchId = this._hrReportForm.value.BranchID;
    if (branchId == null || branchId == '') {
      this._hrReportForm.patchValue({ Brance: -1, })
      return;
    }
    this._hrReportForm.patchValue({ Brance: branchId })
  }

  export() {
    this.exporting = true;
    this._isSubmit = true;
    if(this.formVal.ReportId==24){
      this._hrReportForm.patchValue({Type:1})
    }
    if (this._hrReportForm.invalid) {
      this.toaster.error('Invalid Submission')
      this.exporting = false;;
      return;
    }
    //let formVal = this.getReadyFormVal();
    this.hrRptService.getHrReport(this._hrReportForm.value)
      .subscribe(
        exportedFile => {
          this.exporting = false;
          this.reportHelper.openFileWindow(exportedFile as Blob);
        },
        (err: HttpErrorResponse) => {
          this.exporting = false;
          this.toaster.error(err.message, 'Failed!');
        })
  }


  createForm() {
    this._hrReportForm = this.fb.group({
      ReportId: [, [Validators.required]],
      ExportType: ['pdf', [Validators.required]],
      CompanyID: [this._compId, []],
      EmpName: [, []],
      EmpCode: [, []],
      Gender: [,[]],
      Relision:[,[]],
      DepartmentID: [, []],
      DeparetmentID:[,[]],
      depertment: [, []],
      Brance: [, []],
      BranchID: [, []],
      Location:[,[]],
      JobType:[,[]],
      MeritalStatus:[,[]],
      Project: [, []],
      ProjectID: [, []],
      PayscaleGrade:[,[]],
      BloodGroup:[,[]],
      Degree:[,[]],
      Status:[,[]],
      Grade: [this._gradeValue, []],
      GradeValue: [this._gradeValue, []],
      Type:[,[]],
      DocumentType:[,[]],
      RptType:[,[]] //SubReport Sp param
    })
  }
  reset() {
    this._isSubmit = false;
    this.createForm();
  }
  get formVal() {
    return this._hrReportForm.value;
  }

}
