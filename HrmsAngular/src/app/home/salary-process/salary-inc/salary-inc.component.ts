import { NgbDateCustomParserFormatter } from './../../../shared/dateformat';
import { SalarySetupService } from './../../../services/SalarySetup/salary-setup.service';
import { Pagination } from './../../../shared/paginate';
import { Component, OnInit } from '@angular/core';
import { SalaryPeriodModel } from '../../../models/SalarySetup/SalaryPeriod';
import { ApiResponse } from '../../../models/response.model';
import { FormGroup, FormBuilder, FormArray, Validators } from '@angular/forms';
import { AuthService } from '../../../services/auth.service';
import { SalaryGradePayScale } from '../../../models/salary-process/salary-grade-pay-scale.model';
import { SalaryGradeModel } from '../../../models/system-setup/salary-grader.model';
import { SalaryGradeService } from '../../../services/system-setup/slary-grade.service';
import { SalaryProcessService } from '../../../services/salary-process/salary-process-service.service';
import { EmpEnrolment } from '../../../models/salary-process/emp-enrolment.model';
import { ToastrService } from 'ngx-toastr';
import { ReportHelper } from '../../../shared/report-helper';

@Component({
  selector: 'app-salary-inc',
  templateUrl: './salary-inc.component.html',
  styleUrls: ['./salary-inc.component.scss',
    '../../../../vendor/libs/angular2-ladda/ladda.scss',
    '../../../../vendor/libs/ng-select/ng-select.scss']
})
export class SalaryIncComponent implements OnInit {

  companyId: number;
  incrementForm: FormArray;
  salaryGradePayScale: SalaryGradePayScale[] = [];
  allSalaryGrade: SalaryGradeModel[] = [];
  selectedDepartmentId;
  selectedGradeForAll: string = null;
  isLoading: boolean = false;
  isSubmitted: boolean = false;

  constructor(
    private salarySetupService: SalarySetupService,
    private formBuilder: FormBuilder,
    private salaryProcessService: SalaryProcessService,
    private salaryGradeService: SalaryGradeService,
    private dateService: NgbDateCustomParserFormatter,
    private toaster: ToastrService,
    private reportHelper:ReportHelper
  ) {
  }

  ngOnInit() {
    this.companyId = AuthService.getLoggedCompanyId();
    this.createIncrementForm();
    this.getAllSalaryGrade();
  }
  getAllSalaryGrade() {
    this.salaryGradeService.GetSalaryGrade().subscribe((response: ApiResponse) => {
      if (response.status) {
        this.allSalaryGrade = response.result as SalaryGradeModel[];
      }
    })
  }
  onChangeDate(localDate) {
    this.incrementForm.controls.forEach(group => {
      group.patchValue({ date: localDate });
    })
  }
  showEmployee() {
    this.isLoading = true;
    this.salaryProcessService.getEnrollments(this.companyId, -1, 2,
      this.selectedDepartmentId ? this.selectedDepartmentId : -1)
      .subscribe((response: ApiResponse) => {
        console.log(response)
        this.incrementForm = this.formBuilder.array([]);
        if (response.status) {
          (response.result as EmpEnrolment[]).forEach(item => {
            var formGroup = this.getNewRow();
            formGroup.patchValue({
              ...item,
              preGrade: item.gradeName,
              prePayscaleID: item.payScaleID,
              prePayScaleName: item.prePayScaleName,
              incrementGrade: item.gradeName,
              incrementPayScaleName: item.incrementPayScaleName,
              incrementPacyscaleID: Number(item.payScaleID) + 1
            });
            this.incrementForm.push(formGroup);
          })
        }
        this.isLoading = false;
      }, err => {
        this.isLoading = false;
        this.toaster.error(err.message);
      })
  }
  onChangeIncrPayScale(index, payScale) {
    if(payScale){
      this.incrementForm.controls[index]
      .patchValue({ incrementPacyscaleID: payScale.id })
    }
  }
  onSubmit() {
    if (this.incrementForm.invalid) {
      this.toaster.error('Fill Required Fields', 'Invalid Submission!');
      return;
    } else {
      this.isSubmitted = true;
      this.salaryProcessService.saveConfirmatinIncrement(this.incrementForm.value).subscribe((response: ApiResponse) => {
        this.isSubmitted = false;
        if (response.status) {
          this.toaster.success(response.result, "Success");
          this.reset();
        } else {
          this.toaster.error(response.result, "Failed!");
        }
      }, err => {
        this.isSubmitted = false;
        this.toaster.error('Error occurred');
      });
    }
  }
  getExcelFile(){
    this.salaryProcessService.getIncrementInfoAsExcel(this.incrementForm.value)
    .subscribe((response)=>{
      if(response){
        this.reportHelper.openFileWindow(response,'EmpIncrInfo')
      }
    },err=>{
      this.toaster.error(err.message)
    })
  }
  createIncrementForm() {
    this.incrementForm = this.formBuilder.array([]);
  }
  getNewRow(): FormGroup {
    return this.formBuilder.group({
      id: [0, []],
      empCode: [, [Validators.required]],
      date: [new Date().toLocaleDateString(), [Validators.required]],
      type: [2, [Validators.required]],
      prePayscaleID: [, [Validators.required]],
      incrementPacyscaleID: [, [Validators.required]],
      companyID: [this.companyId, []],
      empName: [, []],
      preGrade: [, [Validators.required]],
      incrementGrade: [, [Validators.required]],
      providentFund: [, [Validators.required]],
      prePayScaleName:[null],
      incrementPayScaleName:[null]
    })
  }

  removeRow(index) {
    this.incrementForm.removeAt(index);
  }
  reset() {
    this.incrementForm = this.formBuilder.array([]);
  }

  formControl(index, field) {
    return this.incrementForm.controls[index].get(field);
  }
  isInValid(index, field) {
    return this.incrementForm.controls[index].get(field).invalid;
  }

}
