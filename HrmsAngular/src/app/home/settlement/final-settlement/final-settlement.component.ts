import { AuthService } from './../../../services/auth.service';
import { ToastrService } from 'ngx-toastr';

import { NgbDateCustomParserFormatter } from './../../../shared/dateformat';
import { FinalSettlement } from './../../../models/final-sattlement/final-settlement.model';
import { ApiResponse } from './../../../models/response.model';
import { FormBuilder, FormGroup, FormArray, FormControl, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { FinalSattlementService } from '../../../services/final-sattlement/final-sattlement.service';
import { SearchEmployee } from '../../../models/hr/search-emp.model';
import { EmployeeService } from '../../../services/hr/employee.service';
import { EmpGenInfo } from '../../../models/hr/emp-gen-info.model';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { show } from '../../../shared/animations';
import { CheckType } from '@angular/core/src/view';
import { EmploymentService } from '../../../services/hr/employment.service';
import { Employment } from '../../../models/hr/employment.model';
import { SalaryPeriodModel } from '../../../models/SalarySetup/SalaryPeriod';
import { AttendenceService } from '../../../services/Attendance/attendence.service';
import { ThemeSettingsModule } from '../../../../vendor/libs/theme-settings/theme-settings.module';


@Component({
  selector: 'app-final-settlement',
  templateUrl: './final-settlement.component.html',
  styleUrls: ['./final-settlement.component.scss',
    '../../../../vendor/libs/ng-select/ng-select.scss',
    '../../../../vendor/libs/angular2-ladda/angular2-ladda.scss'
  ]
})
export class FinalSettlementComponent implements OnInit {
  salaryPeriodItem: SalaryPeriodModel[];

  constructor(
    private formbuilder: FormBuilder,
    private finalSettlementService: FinalSattlementService,
    private dateFormet: NgbDateCustomParserFormatter,
    private toaster: ToastrService,
    public modalService:NgbModal,
    private employmentES: EmploymentService,
    private attenService: AttendenceService,
  ) {
    this._FinalSettlementArry = this.formbuilder.array([]);
  }
  title = "Final Settlement";
  finalSettlementForm: FormGroup
  compID: number;
  finalSettlementModel: FinalSettlement[] = [];
  isLoading: boolean = false;
  _FinalSettlementArry: FormArray;
  calculationtype: number;
  isSubmitted: boolean = false;
  empCodes: FinalSettlement[] = [];
  //mostafiz add
  userTypeID: number;
  //nodeduct;
  setEmpCode:string;
  gradevalue: number;
  empGenInfo: EmpGenInfo = new EmpGenInfo();
  empSearchKeys: SearchEmployee = new SearchEmployee();
  filteredEmployees: SearchEmployee[] = [];
  empCode: string;
  empName: string = '';
  calType: number;
  nodedct: number;
  ngOnInit() {
    this.compID = AuthService.getLoggedCompanyId();
    this.calculationtype = 1;
    this.userTypeID = AuthService.getLoggedUserTypeId();
    this.gradevalue = AuthService.getLoggedGradeValue();
    this.createForm();
    this.getEmployee();
  }


  getEmployee() {
    this.finalSettlementService.getInactiveEmployee(this.gradevalue, this.compID).subscribe((response: ApiResponse) => {
      if (response.status) {
        this.empCodes = response.result as FinalSettlement[];
      } else {
        this.empCodes = [];
      }
    })
  }



  getEmpInfo(empCode) {
    if (empCode == "") {
      this.reset();
      return;
    }
    this.employmentES.getEmployment(empCode, this.compID).subscribe((response: ApiResponse) => {
      let empInfo = response.result as Employment;
      this.finalSettlementForm.patchValue({
        empCode: empInfo.empCode,
        empName: empInfo.empName
      })
    })
  }

  onSelectEmp(employee:any) {
    this.finalSettlementForm.patchValue({
      empCode: employee.empCode,
      empName: employee.empName
    })
  }
  onSearchBtnClick(empCode:string){
    this.setEmpCode=empCode;
    let emp = this.empCodes.find(c=>c.empCode==empCode);
    this.onSelectEmp(emp);
  }


  //============================ New Mostafij Add ====================================================

  CalculateSatellment() {
    if (this.frmVal.empCode == '' || this.frmVal.empCode == null ||
      this.frmVal.periodID == '' || this.frmVal.periodID == null ||
      this.frmVal.lastWorkingDate == '' || this.frmVal.lastWorkingDate == null) {
      this.toaster.error("Please fill all the required fields", "Invalid Action");
    }
    else {
      let ent = new FinalSettlement();
      let frm = this.finalSettlementForm.value;
      if (frm.calculationtype == true) {
        ent.calculationtype = 2;
      }
      else {
        ent.calculationtype = 1;
      }
      if (this.f.nodeduct.value == true) {
        ent.nodeduct = 2;
      }
      else {
        ent.nodeduct = 1;
      }

      ent.empCode = frm.empCode;
      ent.lwDate = this.dateFormet.getYyyymmddToDate(frm.lastWorkingDate);
      ent.companyID = frm.companyID;
      ent.periodID = frm.periodID;
      ent.gradeValue = frm.gradeValue;
      ent.userTypeID = frm.userTypeID;
      ent.empnoticeday = frm.empnoticeday;
      ent.comnoticeday = frm.comnoticeday;

      this.isSubmitted = true;
      this.isLoading = true;
      this.finalSettlementService.getCalculationFinalSattlement(ent).subscribe((response: ApiResponse) => {
        this.isLoading = false;
        this.isSubmitted = false;
        if (response.status) {
          let value = response.result as FinalSettlement;
          this.finalSettlementForm.patchValue({
            dueSalary: value.dueSalary,
            noticeEmp: value.noticeEmp,
            el: value.el,
            gratuty: value.gratuty,
            death: value.death,
            exgratia: value.exgratia,
            overTime: value.overTime,
            noticePayCompany: value.noticePayCompany,
            excessSalary: value.excessSalary,
            eps: value.eps,
            mobile: value.mobile,
            staffOther: value.staffOther,
            wppf: value.wppf,
            pfOwn: value.pfOwn,
            pfCompany: value.pfCompany,
            pfLoan: value.pfLoan,
            pflInterest: value.pflInterest,
            tax: value.tax,
            driverAllowance: value.driverAllowance,
            performanceBonus: value.performanceBonus,
            dueHospitalizationCoverage: value.dueHospitalizationCoverage,
            laptopAdv: value.laptopAdv
          });
        }
        else {
          this.toaster.error(response.result, "Failed");
          this.reset();
        }
      }, err => {
        this.isLoading = false;
        this.isSubmitted = false;
        console.error(err);
      });
    }
  }




  getPeriodListByYearId(id: number) {
    if (id == null) {
      return;
    } else {
      // this.f['yearID'].patchValue(id);
      this.attenService.getPeriodListByYearID(id).subscribe((response: ApiResponse) => {
        if (response.status) {
          this.salaryPeriodItem = response.result as SalaryPeriodModel[];

        } else {
          this.salaryPeriodItem = [];
        }
      });
    }
  }
  onSubmit() {
    this.isSubmitted = true;
    if (this.frmVal.empCode == '' || this.frmVal.empCode == null ||
      this.frmVal.periodID == '' || this.frmVal.periodID == null ||
      this.frmVal.lastWorkingDate == '' || this.frmVal.lastWorkingDate == null) {
      this.toaster.error("Please fill all the required fields", "Invalid submission");
    }
    else {
      let finalsettlement = new FinalSettlement();
      let value = this.finalSettlementForm.value;

      finalsettlement.empCode = value.empCode;
      finalsettlement.dueSalary = value.dueSalary;
      finalsettlement.noticeEmp = value.noticeEmp;
      finalsettlement.el = value.el;
      finalsettlement.gratuty = value.gratuty;
      finalsettlement.death = value.death;
      finalsettlement.exgratia = value.exgratia;
      finalsettlement.overTime = value.overTime;
      finalsettlement.noticePayCompany = value.noticePayCompany;
      finalsettlement.excessSalary = value.excessSalary;
      finalsettlement.eps = value.eps;
      finalsettlement.mobile = value.mobile;
      finalsettlement.staffOther = value.staffOther;
      finalsettlement.wppf = value.wppf;
      finalsettlement.pfOwn = value.pfOwn;
      finalsettlement.pfCompany = value.pfCompany;
      finalsettlement.pfLoan = value.pfLoan;
      finalsettlement.pflInterest = value.pflInterest;
      finalsettlement.tax = value.tax;
      finalsettlement.driverAllowance = value.driverAllowance;
      finalsettlement.lastWorkingDate = value.lastWorkingDate;
      finalsettlement.companyID = this.compID;
      finalsettlement.periodId = value.periodID;
      finalsettlement.performanceBonus = value.performanceBonus;
      finalsettlement.dueHospitalizationCoverage = value.dueHospitalizationCoverage;
      finalsettlement.laptopAdv = value.laptopAdv;
      this.finalSettlementService.saveFinalSettlement(finalsettlement).subscribe((response: ApiResponse) => {
        if (response.status) {
          //  this.getAll();
          this.toaster.success(response.result, "Success!")
          this.reset();

        } else {
          this.toaster.error(response.result, "Failed!")
        }
      })

    }
  }


  reset() {
    this.isSubmitted = false;
    this.finalSettlementForm.reset();
    this.createForm();
  }


  createForm() {
    this.finalSettlementForm = this.formbuilder.group({
      id: [0, []],
      empCode: [, [Validators.required]],
      dueSalary: [, []],
      bonus: [, []],
      noticeEmp: [, []],
      el: [, []],
      gratuty: [, []],
      death: [, []],
      exgratia: [, []],
      overTime: [, []],
      noticePayCompany: [, []],
      excessSalary: [, []],
      eps: [, []],
      mobile: [, []],
      staffOther: [, []],
      wppf: [, []],
      pfOwn: [, []],
      pfCompany: [, []],
      pfLoan: [, []],
      pflInterest: [, []],
      tax: [, []],
      driverAllowance: [, []],
      lastWorkingDate: [, [Validators.required]],
      lastWorkingDateNgb: [, []],
      companyID: [this.compID, []],
      periodId: [, []],
      periodID: [, [Validators.required]],
      performanceBonus: [, []],
      empName: [, []],
      comnoticeday: [0, []],
      empnoticeday: [0, []],
      calculationtype: [, []],
      nodeduct: [, []],
      gradeValue: [this.gradevalue, []],
      userTypeID: [this.userTypeID, []],
      dueHospitalizationCoverage: [, []],
      laptopAdv: [, []]
    })
  }
  get f() {
    return this.finalSettlementForm.controls;
  }
  get frmVal() {
    return this.finalSettlementForm.value;
  }
}




