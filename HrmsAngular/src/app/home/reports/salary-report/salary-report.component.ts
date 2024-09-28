import { ApiResponse } from './../../../models/response.model';
import { AuthService } from './../../../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NgbDateCustomParserFormatter } from '../../../shared/dateformat';
import { ToastrService } from 'ngx-toastr';
import { ReportService } from '../../../services/report.service';
import { ReportHelper } from '../../../shared/report-helper';
import { HttpErrorResponse } from '@angular/common/http';
import { EmployeeService } from '../../../services/hr/employee.service';
import { SearchEmployee } from '../../../models/hr/search-emp.model';

@Component({
  selector: 'app-salary-report',
  templateUrl: './salary-report.component.html',
  styleUrls: ['./salary-report.component.scss',
    '../../../../vendor/libs/angular2-ladda/ladda.scss',
    '../../../../vendor/libs/ng-select/ng-select.scss'

  ]
})
export class SalaryReportComponent implements OnInit {
  compId: number;
  gradeVal: number;
  grade: number;
  employees:SearchEmployee[]=[];
  isSubmit: boolean = false;
  exporting: boolean = false;
  salaryReportForm: FormGroup;
  reportType: any[] = [];
  filteredRptType: any[] = [];
  payBy: any[] = [];
  constructor(
    private fb: FormBuilder,
    private dateFormat: NgbDateCustomParserFormatter,
    private toaster: ToastrService,
    private empService:EmployeeService,
    private rptService: ReportService,
    private rptHelper: ReportHelper
  ) { }

  ngOnInit() {
    this.compId = AuthService.getLoggedCompanyId();
    this.gradeVal = AuthService.getLoggedGradeValue();
    this.createForm();
    this.getReportType();
    this.getPayBy();
    this.gradeWiseReport();
    this.getAllEmployeesForSalary();
  }
  getPayBy() {
    this.payBy = [
      { PayId: 1, typeName: 'All Pay' },
      { PayId: 2, typeName: 'Bank' },
      { PayId: 3, typeName: 'Cash' },
    ]

  }
  onSelectEmpCode(EmpCode: string) {
    this.salaryReportForm.patchValue({
      EmpCode: EmpCode,
      EmpID: EmpCode

    })
  }
  gradeWiseReport() {
    switch (Number(this.gradeVal)) {
      case 1:
        this.filteredRptType = this.reportType.filter(report => [110,111,116,121,122,123,125,126,127,128,129,130,131,132,133,134,135,207].includes(report.ReportId));
        break;
      case 2:
        this.filteredRptType = this.reportType.filter(report => [110,111,112,117,121,122,123,125,126,127,128,129,130,131,132,133,134,135,207].includes(report.ReportId));
        break;
      case 3:
        this.filteredRptType = this.reportType.filter(report => [110,111,113,116,118,121,122,123,125,126,127,128,129,130,131,132,133,134,135,207].includes(report.ReportId));
        break;
      case 4:
        this.filteredRptType = this.reportType.filter(report => [110,111,114,121,122,123,120,124125,126,127,128,129,130,131,132,133,134,135,207].includes(report.ReportId));
        break;
      case 5:
        this.filteredRptType = this.reportType.filter(report => [110,111,121,122,123,125,126,127,128,129,130,131,132,133,134,135,207].includes(report.ReportId));
        break;
      default:
        this.filteredRptType = this.reportType;
    }
  }
  getReportType() {
    this.reportType = [
      // { ReportId: 110, TypeName: 'Pay Slip By Single' },
      { ReportId: 111, TypeName: 'Pay Slip By All' },
      // { ReportId: 112, TypeName: 'Pay Slip By AllNonManagement' },
      // { ReportId: 113, TypeName: 'Pay Slip By AllManager' },
      // { ReportId: 114, TypeName: 'Pay Slip By AllHigherManager' },
      { ReportId: 116, TypeName: 'Month Wise Salary Sheet' },
      // { ReportId: 117, TypeName: 'Month Wise Salary Sheet NonManagement' },
      // { ReportId: 118, TypeName: 'Month Wise Salary Sheet Manager' },
      // { ReportId: 121, TypeName: 'Driver Allowance' },
      // { ReportId: 120, TypeName: 'Month Wise Salary Sheet HigherManagement' },
      // { ReportId: 122, TypeName: 'Salary Sheet By Head' },
      { ReportId: 123, TypeName: 'Bonus Sheet' },
      // { ReportId: 124, TypeName: 'Salary Sheet Summary HigherManagement' },
      { ReportId: 125, TypeName: 'Salary Sheet Summary' },
      { ReportId: 126, TypeName: 'Arrear Salary Sheet' },
      { ReportId: 127, TypeName: 'Arrear Salary Summary' },
      { ReportId: 128, TypeName: 'Bonus Summary' },
      // { ReportId: 129, TypeName: 'Salary Sheet By Head Bonus' },
      // { ReportId: 130, TypeName: 'Driver Bonus Sheet' },
      { ReportId: 131, TypeName: 'Block Salary Sheet' },
      // { ReportId: 132,  TypeName: 'Cost to the company' },
      // { ReportId: 133, TypeName: 'Signature Sheet' },
      // { ReportId: 134, TypeName: 'Project Wise Salary Sheet' },
      { ReportId: 135, TypeName: 'Dues Salary Report' },
      { ReportId: 207, TypeName: ' Salary Certificate' },
    ]
  }

  getAllEmployeesForSalary(){
    this.empService.getAllEmpCodeNameForSalaryReport(this.gradeVal).subscribe((response:ApiResponse)=>{
      if(response.status){
        this.employees=response.result as SearchEmployee[];
      }
    })
  }
  onSelectBranch(branch) {
    console.log(branch);
    this.salaryReportForm.patchValue({
      Branch: branch,
      BranchID: branch,
      BranchName: branch.description
    })
  }
  onSelectGrade(gradeValue: number) {
    this.salaryReportForm.patchValue({
      Grade: gradeValue,
      GradeValue: gradeValue
    })
  }

  onSelectPeriod(period) {
    this.salaryReportForm.patchValue({
      PeriodID: period.id,
      Period: period.id,
      PeriodName: period.periodName

    })
  }

  onSelectBonus(bonusID: number) {
    this.salaryReportForm.patchValue({
      BonusID: bonusID,
      bonustype: bonusID


    })
  }
  onSelectDepartment(deparmentID: number) {
    this.salaryReportForm.patchValue({
      Department: deparmentID,
      DepartmentID: deparmentID,
      Depertment: deparmentID
    })
  }

  export() {
    this.exporting = true;
    this.isSubmit = true;

    if (this.salaryReportForm.invalid) {
      this.exporting = false;
      this.toaster.error('Invalid Submission.')
      return;
    }
    this.rptService.getPayrollReport(this.salaryReportForm.value)
      .subscribe(
        exportedFile => {
          this.exporting = false;
          this.rptHelper.openFileWindow(exportedFile as Blob);
        },
        (err: HttpErrorResponse) => {
          this.exporting = false;
          this.toaster.error(err.message, 'Failed!');
        })
  }
  createForm() {
    this.salaryReportForm = this.fb.group({
      ReportId: [, [Validators.required]],
      ExportType: ['pdf', [Validators.required]],
      CompanyID: [this.compId, []],
      EmpCode: [, []],
      EmpID: [, []],
      GradeValue: [this.gradeVal, []],
      Grade: [-1, []],
      PeriodID: [, []],
      PeriodName: [, []],
      Period: [, []],
      BranchID: [, []],
      Branch: [-1, []],
      BranchName: [, []],
      Department: [-1, []],
      DepartmentID: [, []],
      Depertment: [, []],
      BonusID: [, []],
      bonustype: [, []],
      ProjectID: [-1, []],
      Project: [, []],
      SignatoryL: [, []],
      SignatoryR: [, []],
      PaymentMode: ['All Pay', []],
      SalaryHeadID: [, []],
      PayId: [, []],
    });
  }
  get formControl() {
    return this.salaryReportForm.controls;
  }

  reset() {
    this.createForm();
  }

}
