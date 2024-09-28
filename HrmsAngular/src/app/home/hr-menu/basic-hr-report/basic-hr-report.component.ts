import { toDate } from '@angular/common/src/i18n/format_date';
import { AuthService } from './../../../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { BasicEntry } from '../../../models/system-setup/basic-entry.model';
import { NgbDateCustomParserFormatter } from '../../../shared/dateformat';
import { ToastrService } from 'ngx-toastr';
import { ReportHelper } from '../../../shared/report-helper';
import { BasicEntryService } from '../../../services/system-setup/basic-entry.service';
import { ApiResponse } from '../../../models/response.model';
import { Pagination } from '../../../shared/paginate';
import { HttpErrorResponse } from '@angular/common/http';
import { ReportService } from '../../../services/report.service';

@Component({
  selector: 'app-basic-hr-report',
  templateUrl: './basic-hr-report.component.html',
  styleUrls: [
    './basic-hr-report.component.scss',
    '../../../../vendor/libs/ng-select/ng-select.scss',
    '../../../../vendor/libs/angular2-ladda/ladda.scss'
  ]
})
export class BasicHrReportComponent extends Pagination implements OnInit {

  _compId: number;
  _gradeValue: number;
  exporting: boolean = false;
  _exportingXls: boolean = false;
  _isSubmit: boolean = false;

  _basicHrReportForm: FormGroup;
  _reportTypeList: any[] = [];
  _separationTypeList: any[] = [];
  _departments: BasicEntry[] = [];
  _branches: BasicEntry[] = [];
  _projects: BasicEntry[] = [];

  constructor(
    private fb: FormBuilder,
    private dateFormat: NgbDateCustomParserFormatter,
    private toaster: ToastrService,
    private reportHelper: ReportHelper,
    private basicEntryService: BasicEntryService,
    private hrRptService: ReportService) {
    super();
  }
  ngOnInit() {
    this._compId = AuthService.getLoggedCompanyId();
    this._gradeValue = AuthService.getLoggedGradeValue();
    this.createForm();
    this.getReportTypeList();
    this.getSeparationTypeList();
    this.getDepartments();
    this.getProjects();
    this.getBranches();
  }

  getReportTypeList() {
    this._reportTypeList = [
      { ReportId: 2, TypeName: 'Joining Information' },
      { ReportId: 3, TypeName: 'Separation Information' },
      { ReportId: 4, TypeName: 'Confirmation Done' },
      { ReportId: 5, TypeName: 'Confirmation Due' },
      { ReportId: 6, TypeName: 'Specific Ages' },
      { ReportId: 7, TypeName: 'Transfer Information' },
      { ReportId: 8, TypeName: 'Block Information' },
      { ReportId: 9, TypeName: 'Promotion Information' },
      { ReportId: 10, TypeName: 'Confirmation Employee Details' },
      { ReportId: 210, TypeName: 'Transfer With Promotion' },
    ]
  }
  getSeparationTypeList() {
    this._separationTypeList = [
      { Id: 1, TypeName: 'Resignation' },
      { Id: 2, TypeName: 'Termination' },
      { Id: 3, TypeName: 'Dismissal' },
      { Id: 4, TypeName: 'Discharge' },
      { Id: 5, TypeName: 'Retirement' },
      { Id: 6, TypeName: 'Early Retirement' },
      { Id: 7, TypeName: 'Removal' },
      { Id: 8, TypeName: 'Death' }
    ]
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

  onDeptChange() {
    let deptId = this._basicHrReportForm.value.DepartmentID;
    if (deptId == null || deptId == '') {
      this._basicHrReportForm.patchValue({
        depertment: -1
      })
      return;
    }
    this._basicHrReportForm.patchValue({
      depertment: deptId
    })
  }
  onBranchChange() {
    let branchId = this._basicHrReportForm.value.BranchID;
    if (branchId == null || branchId == '') {
      this._basicHrReportForm.patchValue({ Brance: -1, })
      return;
    }
    this._basicHrReportForm.patchValue({ Brance: branchId })
  }
  onProjectChange() {
    let projectId = this.formVal.ProjectID;
    if (projectId == null || projectId == '') {
      this._basicHrReportForm.patchValue({ Project: -1, })
      return;
    }
    this._basicHrReportForm.patchValue({ Project: projectId })
  }
  convertStartDate() {
    this._basicHrReportForm.patchValue({
      StartDate: this.dateFormat.ngbDateToDate(this._basicHrReportForm.value.StrDate).toLocaleDateString(),
      StrDate: this.dateFormat.ngbDateToDate(this._basicHrReportForm.value.StrDate).toLocaleDateString(),
      // Date: this.dateFormat.ngbDateToDate(this._basicHrReportForm.value.StrDate).toLocaleDateString(),
      Date: this._basicHrReportForm.value.StrDate,

    })
    console.log('Dateee',this._basicHrReportForm.value)
  }
  convertEndDate() {
    this._basicHrReportForm.patchValue({
      EndDate: this.dateFormat.ngbDateToDate(this._basicHrReportForm.value.EndDate).toLocaleDateString(),
      ToDate: this.dateFormat.ngbDateToDate(this._basicHrReportForm.value.EndDate).toLocaleDateString(),
    })
  }
  export() {
    this.exporting = true;
    this._isSubmit = true;
    if (this._basicHrReportForm.invalid) {
      this.exporting = false;
      this.toaster.error('Invalid Submission')
      return;
    }
    // if(this._basicHrReportForm.controls.ReportId.value==1){
    //   this._basicHrReportForm.controls.ReportId.setValue(this._gradeValue);
    // }
    if(this._basicHrReportForm.controls.ReportId.value==210){
      this._basicHrReportForm.controls.TPType.setValue(3);
    }
    this._basicHrReportForm.patchValue({
      Date: this.formVal.StrDate,
      ToDate: this.formVal.EndDate
      // EmpCod:this.formVal.EmpCode
    });
    // let formVal = this.getReadyFormVal();
    // this.hrRptService.getHrReport(formVal);
    console.log('Date',this._basicHrReportForm.value)
    this.hrRptService.getHrReport(this._basicHrReportForm.value)

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
  getReadyFormVal(): any {
    // this.convertStartDate();
    // this.convertEndDate();
    let frmVal = this._basicHrReportForm.value;
    if (frmVal.ReportId == 7) {
      this._basicHrReportForm.controls['TPType'].setValue(1);
    }
    if (frmVal.ReportId == 9) {
      this._basicHrReportForm.controls['TPType'].setValue(2);
    }
    return this._basicHrReportForm.value;
  }
  createForm() {
    this._basicHrReportForm = this.fb.group({
      ReportId: [, [Validators.required]],
      Type: [, []],
      ExportType: ['pdf', [Validators.required]],
      CompanyID: [this._compId, []],
      DepartmentID: [, []],
      depertment: [, []],
      Brance: [, []],
      BranchID: [, []],
      Project: [, []],
      ProjectID: [, []],
      Grade: [-1, []],
      GradeValue: [-1, []],
      Date: [, []],
      Age: [, []],
      StrDate: [, []],
      StartDate: [, []],
      EndDate: [, []],
      ToDate: [, []],
      TPType: [, []]
    })
  }
  reset() {
    this._isSubmit = false;
    this._basicHrReportForm.reset();
    this._basicHrReportForm.patchValue({
      CompanyID: this._compId,
      Grade: this._gradeValue,
      GradeValue: this._gradeValue,
      StrDate: this.dateFormat.getCurrentNgbDate(),
      EndDate: this.dateFormat.getCurrentNgbDate()
    })
  }
  get formVal() {
    return this._basicHrReportForm.value;
  }
  get f() {
    return this._basicHrReportForm.controls;
  }

}
