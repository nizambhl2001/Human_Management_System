import { AuthService } from './../../../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { NgbDateCustomParserFormatter } from '../../../shared/dateformat';
import { ToastrService } from 'ngx-toastr';
import { ReportService } from '../../../services/report.service';
import { ReportHelper } from '../../../shared/report-helper';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-bank-advice',
  templateUrl: './bank-advice.component.html',
  styleUrls: ['./bank-advice.component.scss',
    '../../../../vendor/libs/angular2-ladda/ladda.scss',
    '../../../../vendor/libs/ng-select/ng-select.scss'


  ]
})
export class BankAdviceComponent implements OnInit {
  compId: number;
  gradeVal: number;

  isSubmit: boolean = false;
  exporting: boolean = false;
  bankAdviceReportForm: FormGroup;
  reportType: any[] = [];
  payBy: any[] = [];
  constructor(
    private fb: FormBuilder,
    private dateFormat: NgbDateCustomParserFormatter,
    private toaster: ToastrService,
    private rptService: ReportService,
    private rptHelper: ReportHelper
  ) { }

  ngOnInit() {
    this.compId = AuthService.getLoggedCompanyId();
    this.gradeVal = AuthService.getLoggedGradeValue();
    this.createForm();
    this.getReportType();
    this.getPayBy();
  }
  getPayBy() {
    this.payBy = [
      { PayId: 1, typeName: 'All Pay' },
      { PayId: 2, typeName: 'Bank' },
      { PayId: 3, typeName: 'Cash' },
    ]
  }
  getReportType() {
    this.reportType = [
      { ReportId: 136, TypeName: 'Bank Advice Salary' },
      { ReportId: 137, TypeName: 'Bank Advice Driver' },
      { ReportId: 138, TypeName: 'Extra Bank Advice' },
      { ReportId: 139, TypeName: 'Bonus Bank Advice' },
      { ReportId: 140, TypeName: 'Bank Advice Driver Bonus' },



    ]

  }

  onSelectGrade(gradeID: number) {
    this.bankAdviceReportForm.patchValue({
      Grade: gradeID,
      GradeValue: gradeID
    })
  }
  onSelectBranch(branchId: number) {
    this.bankAdviceReportForm.patchValue({
      Branch: branchId,
      BranchID: branchId
    })
  }
  onSelectDepartment(deparmentID: number) {
    this.bankAdviceReportForm.patchValue({
      Department: deparmentID,
      DepartmentID: deparmentID,
      Depertment: deparmentID
    })
  }

  onSelectBank(bankID: number) {
    this.bankAdviceReportForm.patchValue({
      BankID: bankID,
      Bank: bankID


    })
  }
  onSelectBonus(bonusID: number) {
    this.bankAdviceReportForm.patchValue({
      BonusType: bonusID,
      BonusID: bonusID


    })
  }
  export() {
    this.exporting = true;
    this.isSubmit = true;

    if (this.bankAdviceReportForm.invalid) {
      this.exporting = false;
      this.toaster.error('Invalid Submission')
      return;
    }
    console.log("this.bankAdviceReportForm.value",this.bankAdviceReportForm.value);
    if(this.formControl.Department==undefined || this.formControl.Department==null ){
      this.bankAdviceReportForm.patchValue({
        Department:-1
      })
    }
    if(this.formControl.Branch==null || this.formControl.Branch==undefined ){
      this.bankAdviceReportForm.patchValue({
        Branch:'-1'
      })
    }

    if(this.formControl.BankID==null || this.formControl.BankID==undefined ){
      this.bankAdviceReportForm.patchValue({
        BankID:-1
      })
    }

    if(this.formControl.EmpCode==undefined || this.formControl.EmpCode==null ){
      this.bankAdviceReportForm.patchValue({
        EmpCode:'-1'
      })
    }

    if(this.formControl.Grade==undefined || this.formControl.Grade==null ){
      this.bankAdviceReportForm.patchValue({
        Grade:-1
      })
    }
    if(this.formControl.ProjectID==null || this.formControl.ProjectID==undefined ){
      this.bankAdviceReportForm.patchValue({
        ProjectID:-1
      })
    }
console.log(this.bankAdviceReportForm.value)
    this.rptService.getPayrollReport(this.bankAdviceReportForm.value)
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
    this.bankAdviceReportForm = this.fb.group({
      ReportId: [, [Validators.required]],
      ExportType: ['pdf', [Validators.required]],
      CompanyID: [1, []],
      EmpCode: ['-1', []],
      GradeValue: ['-1', []],
      Grade: [-1, []],
      PeriodID: [, [Validators.required]],
      Period: [, []],
      BranchID: [5, []],
      Branch: [5, []],
      Department: [-1, []],
      DepartmentID: [-1, []],
      Depertment: [-1, []],
      BankID: [, [Validators.required]],
      Bank: [, []],
      BonusType: ['-1', []],
      BonusID: [1, []],
      SignatoryL: ['', []],
      SignatoryR: ['', []],
      ProjectID: [1, []],
      Project: ['-1', []],
      Payby: ['All Pay', []],
      PaymentMode: ['Bank', []],
      PaymentDate: [this.dateFormat.getCurrentNgbDate(), [Validators.required]]




    });


  }
  get formControl() {
    return this.bankAdviceReportForm.controls;
  }
  get formVal(){
    return this.bankAdviceReportForm.value;
  }
  reset() {
    this.createForm();
  }
}
