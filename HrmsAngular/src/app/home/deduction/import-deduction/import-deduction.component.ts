import { AuthService } from './../../../services/auth.service';
import { SalarySetupService } from './../../../services/SalarySetup/salary-setup.service';
import { ImportEmpSalaryService } from '../../../services/addition-and-deduction-import-service/import-emp-salary.service';
import { SalaryPeriodModel } from './../../../models/SalarySetup/SalaryPeriod';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SalaryHead } from './../../../models/SalarySetup/salary-head';

import { Component, OnInit } from '@angular/core';
import { ApiResponse } from '../../../models/response.model';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-import-deduction',
  templateUrl: './import-deduction.component.html',
  styleUrls: ['./import-deduction.component.scss',
    '../../../../vendor/libs/angular2-ladda/angular2-ladda.scss',
    '../../../../vendor/libs/ng-select/ng-select.scss']
})
export class ImportDeductionComponent implements OnInit {

  constructor(
    private salarySetupService: SalarySetupService,
    private formbuilder: FormBuilder,

    private importempSalary: ImportEmpSalaryService,
    private toasterService: ToastrService
  ) { }
  title = "Upload Employee Salary";
  allSalaryHead: SalaryHead[] = [];
  deductionSalaryHead: SalaryHead[] = [];
  importDeductionForm: FormGroup;
  compID: number;
  gradeValue: number;
  salaryPeriod: SalaryPeriodModel[] = [];
  _isProcessing: boolean
  isSubmitted = false;

  ngOnInit() {
    this.compID = AuthService.getLoggedCompanyId();
    this.gradeValue = AuthService.getLoggedGradeValue();
    this.createForm();
    this.getSalaryPeriod();
    this.getSalaryHead();

  }

  getSalaryHead() {
    this.salarySetupService.getAllSalaryHead().subscribe((response: ApiResponse) => {
      if (response.status) {
        this.allSalaryHead = response.result as SalaryHead[];
        let allSalaryHead: SalaryHead[] = response.result as SalaryHead[];
        this.deductionSalaryHead = allSalaryHead.filter(c => c.salaryHeadType == "Deduction");
      }
    })
  }

  getSalaryPeriod() {
    this.salarySetupService.getAllperiod().subscribe((response: ApiResponse) => {
      if (response.status) {
        this.salaryPeriod = response.result as SalaryPeriodModel[];
      }

    })
  }

  onFileChange(files: FileList) {
    this.importDeductionForm.controls['excelFiles'].setValue(files);
    if (files.length == 1) {
      this.importDeductionForm.controls['fileCount'].setValue(files[0].name);
      return;
    }
    this.importDeductionForm.controls['fileCount'].setValue(files.length + ' file attached');
  }

  onPeriodChange(period: any) {
    if (period != null) {
      this.importDeductionForm.controls.periodName.setValue(period.periodName);
    }

  }

  importFileData() {
    this.isSubmitted = true;
    if (this.importDeductionForm.invalid) {
      this.toasterService.error("Fill all required field, * marked field are required!", 'Invalid Submission');
      return;
    } else {
      if (this.importDeductionForm.controls['excelFiles'].value == null) {
        this.toasterService.error("Please fill the File field first", 'Warning:');
        return;
      }
      else {
        this._isProcessing = true;
        this.importempSalary.importFileData(this.importDeductionForm.value).subscribe((response: ApiResponse) => {
          if (response.status) {
            this.toasterService.success(response.result, 'Success!');
          } else {
            this.toasterService.error(response.result, 'Failed!');
          }
          this._isProcessing = false;
        }, err=>{
          this._isProcessing = false;
          this.toasterService.error(err.message, 'Failed!');
        })
      }
    }
  }

  createForm() {
    this.importDeductionForm = this.formbuilder.group({
      id: [0, []],
      salaryHead: [, [Validators.required]],
      periodID: [, [Validators.required]],
      companyID: [this.compID, []],
      periodName: [null, []],
      grade: [this.gradeValue, []],
      excelFiles: [, []],
      fileCount: [, []]
    })
  }
  get f() {
    return this.importDeductionForm.controls;
  }

}
