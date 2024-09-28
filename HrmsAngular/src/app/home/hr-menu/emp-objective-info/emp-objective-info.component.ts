import { AuthService } from './../../../services/auth.service';
import { ToastrService } from 'ngx-toastr';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { EmploymentService } from '../../../services/hr/employment.service';
import { Employment } from '../../../models/hr/employment.model';
import { NgbDateCustomParserFormatter } from '../../../shared/dateformat';
import { ApiResponse } from '../../../models/response.model';
import { SearchEmployee } from '../../../models/hr/search-emp.model';
import { EmpObjectiveService } from '../../../services/hr/emp-objective.service';
import { EmpObjectiveInfoModel } from '../../../models/hr/emp-objective-info.model';
import { SalarySetupService } from '../../../services/SalarySetup/salary-setup.service';
import { SalaryYear } from '../../../models/SalarySetup/salary-year';

@Component({
  selector: 'app-emp-objective-info',
  templateUrl: './emp-objective-info.component.html',
  styleUrls: ['./emp-objective-info.component.scss',
    '../../../../vendor/libs/angular-2-dropdown-multiselect/angular-2-dropdown-multiselect.scss',
    '../../../../vendor/libs/ng-select/ng-select.scss']
})
export class EmpObjectiveInfoComponent implements OnInit {
  compID: number;
  isSubmitted = false;
  userId: number;
  objectiveInfoForm: FormGroup;
  salaryYear: SalaryYear[] = [];
  objectiveModelList: EmpObjectiveInfoModel[] = [];
  objectiveModel: EmpObjectiveInfoModel;
  btnStatus = 'Save'

  constructor(
    private employmentES: EmploymentService,
    private formBuilder: FormBuilder,
    private salarySetupService: SalarySetupService,
    private objectiveS: EmpObjectiveService,
    private toasterservice: ToastrService,
    private dateFormate: NgbDateCustomParserFormatter,
  ) { }

  ngOnInit() {
    this.compID = AuthService.getLoggedCompanyId();
    this.userId = AuthService.getLoggedUserId();
    this.btnStatus = 'Save';
    this.createForm();
    this.AllSalaryYear();
    this.getAll();
  }
  AllSalaryYear() {
    this.salarySetupService.getAllSalaryYear().subscribe((response: ApiResponse) => {
      if (response.status) {
        this.salaryYear = response.result as SalaryYear[];
      }
    })

  }
  save() {
    this.isSubmitted = true;
    if (this.objectiveInfoForm.invalid) {
      this.toasterservice.warning("Fill All Required Fields");
    }
    else {
      this.objectiveInfoForm.controls.pOptions.setValue(1);
      this.objectiveS.saveUpdateDelete(this.objectiveInfoForm.value).subscribe((response: ApiResponse) => {
        if (response.status) {
          this.toasterservice.success(response.result);
          this.getAll();
          this.reset();
          this.isSubmitted=false;
        }
        else {
          this.toasterservice.error(response.result);
        }
      })
    }
  }
  objectiveupdate() {
    this.objectiveInfoForm.controls.pOptions.setValue(2);
    this.objectiveS.saveUpdateDelete(this.objectiveInfoForm.value).subscribe((response: ApiResponse) => {
      if (response.status) {
        this.toasterservice.success(response.result);
        this.getAll();
          this.reset();
          this.isSubmitted=false;
      }
      else {
        this.toasterservice.error(response.result);
      }
    })
  }
  onSubmit() {
    if (this.btnStatus == 'Save')
      this.save();

    else
      this.objectiveupdate();
  }
  delete() {
    this.objectiveInfoForm.controls.pOptions.setValue(3);
    this.objectiveS.saveUpdateDelete(this.objectiveInfoForm.value).subscribe((response: ApiResponse) => {
      if (response.status) {
        this.toasterservice.success(response.result);
      }
      else {
        this.toasterservice.error(response.result);
      }
    })
  }
  getAll() {
    this.objectiveS.getAll().subscribe((response: ApiResponse) => {
      if (response.status) {
        this.objectiveModelList = response.result as EmpObjectiveInfoModel[];
      }
      else {
        return;
      }
    })
  }
  getById(id: number) {
    this.objectiveS.getById(id).subscribe((response: ApiResponse) => {
      if (response.status) {
        this.objectiveModel = response.result as EmpObjectiveInfoModel;
        this.f.empCode.setValue(this.objectiveModel.empCode);
        this.f.id.setValue(this.objectiveModel.id);
        this.getEmpInfo(this.objectiveModel.empCode);
        this.f.yearID.setValue(this.objectiveModel.yearID);
        this.f.description.setValue(this.objectiveModel.description);
        this.btnStatus = "Update";
      }
      else {
        this.toasterservice.error(response.result);
      }
    })
  }
  onSelectEmp(employee: SearchEmployee) {
    this.objectiveInfoForm.patchValue({
      empName: employee.empName,
      department: employee.department,
      designation: employee.designation,
      joinDateNgb: this.dateFormate.stringToNgbDate(employee.joinDate)
    })
  }
  getEmpInfo(empCode:string){
    if (empCode == "") {
      this.reset();
      return;
    }
    this.employmentES.getEmployment(empCode,this.compID).subscribe((response:ApiResponse)=>{
      let empInfo=response.result as Employment;
      this.objectiveInfoForm.patchValue({
       empCode:empInfo.empCode,
       empName:empInfo.empName,
       department:empInfo.department,
       designation:empInfo.designation,
       joinDateNgb:this.dateFormate.stringToNgbDate(empInfo.joinDate)
     })
    })
  }
  createForm() {
    this.objectiveInfoForm = this.formBuilder.group({
      id: [, []],
      empCode: [, [Validators.required]],
      empName: [, []],
      department: [, []],
      designation: [, []],
      joinDate: [, []],
      joinDateNgb: [, []],
      description: [, []],
      yearID: [, [Validators.required]],
      userID: [this.userId, []],
      companyID: [this.compID, []],
      msg: [, []],
      pOptions: [, []],
    })
  }
  get f() {
    return this.objectiveInfoForm.controls;
  }
  get formVal() {
    return this.objectiveInfoForm.value;
  }
  reset() {
    this.isSubmitted=false;
    this.createForm();
    this.btnStatus = "Save"
  }
}
