import { AuthService } from './../../../services/auth.service';
import { ToastrService } from 'ngx-toastr';
import { ApiResponse } from './../../../models/response.model';
import { NgbDateCustomParserFormatter } from './../../../shared/dateformat';
import { FormGroup, FormBuilder, FormControl, AbstractControl, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { TourApplyService } from '../../../services/Tour/tour-apply.service';
import { TourApplyModel } from '../../../models/tour/tour-apply.model';
import { Employment } from '../../../models/hr/employment.model';
import { EmploymentService } from '../../../services/hr/employment.service';

@Component({
  selector: 'app-tour-apply',
  templateUrl: './tour-apply.component.html',
  styleUrls: ['./tour-apply.component.scss']
})
export class TourApplyComponent implements OnInit {
  tourApplyForm: FormGroup;
  isSubmitted = false;
  btnStatus: string = "Save"
  compId: number;
  allTour: TourApplyModel[] = [];
  constructor(
    private formBuilder: FormBuilder,
    private employmentES: EmploymentService,
    private tourAppluS: TourApplyService,
    private toastrService: ToastrService,
    private dateFormate: NgbDateCustomParserFormatter
  ) {
  }
  title = "Tour Apply";
  ngOnInit() {
    this.compId = AuthService.getLoggedCompanyId();
    this.getAll();
    this.createForm();
  }
  getEmpInfo(empCode: string) {
    console.log("getEmpInfo: "+empCode)
    if (empCode == "") {
      return;
    }
    else {
      this.employmentES.getEmployment(empCode, this.compId).subscribe((response: ApiResponse) => {
        let empInfo = response.result as Employment;
        this.tourApplyForm.patchValue({
          empCode: empInfo.empCode,
          empName: empInfo.empName,
          department: empInfo.department,
          designation: empInfo.designation
        })
        this.getToEmpInfo(empInfo.reportTo)
      })
    }
  }
  getToEmpInfo(applyTo: string) {
    console.log("getToEmpInfo: "+applyTo)
    if (applyTo == "") {
      this.reset();
      return;
    }
    this.employmentES.getEmployment(applyTo, this.compId).subscribe((response: ApiResponse) => {
      let empToInfo = response.result as Employment;
      this.tourApplyForm.patchValue({
        applyTo: empToInfo.empCode,
        toEmpName: empToInfo.empName,
        toDesignation: empToInfo.designation,
      })
    })
  }
  getRefEmpInfo(referanceEmpcode: string) {
    if (referanceEmpcode == "") {
      this.reset();
      return;
    }
    this.employmentES.getEmployment(referanceEmpcode, this.compId).subscribe((response: ApiResponse) => {
      let empToInfo = response.result as Employment;
      this.tourApplyForm.patchValue({
        referanceEmpcode: empToInfo.empCode,
        refEmpName: empToInfo.empName,
        refDesignation: empToInfo.designation,
      })
    })
  }
  dateDiff() {
    let Ndays = (this.dateFormate.getDateDiff(this.f.lsDateNgb.value, this.f.leDateNgb.value))
    this.f.accepteDuration.setValue(Ndays);
  }
  saveUpdate() {
    this.isSubmitted = true;
    if (this.tourApplyForm.invalid) {
      this.toastrService.warning("Fill Required Fields");
      return;
    }
    else {
      this.f.lsDate.setValue(this.dateFormate.ngbDateToDate(this.f.lsDateNgb.value));
      this.f.leDate.setValue(this.dateFormate.ngbDateToDate(this.f.leDateNgb.value));
      this.f.laDate.setValue(this.dateFormate.ngbDateToDate(this.f.laDateNgb.value));
      this.f.yYYYMMDD.setValue(this.dateFormate.ngbDateToDate(this.f.yYYYMMDDNgb.value));
      this.tourAppluS.saveUpdateTour(this.tourApplyForm.value).subscribe((response: ApiResponse) => {
        if (response.status) {
          this.toastrService.success(response.result, "Success");
          this.reset();
          this.getAll();
          this.btnStatus = "Save";
        }
        else {
          this.toastrService.error(response.result)
        }
      })
    }
  }
  getAll() {
    this.tourAppluS.getAll().subscribe((response: ApiResponse) => {
      if (response.status) {
        this.allTour = response.result as TourApplyModel[];
      }
    })
  }

  createForm() {
    this.tourApplyForm = this.formBuilder.group({
      id: [, []],
      empCode: [, [Validators.required]],
      empName: [, []],
      designation: [, []],
      department: [, []],
      lsDate: [, []],
      lsDateNgb: [, [Validators.required]],
      leDate: [, []],
      leDateNgb: [, [Validators.required]],
      laDate: [, []],
      laDateNgb: [this.dateFormate.getCurrentNgbDate(), []],
      accepteDuration: [, []],
      unAccepteDuration: [0, []],
      referanceEmpcode: [, [Validators.required]],
      refEmpName: [, []],
      refDesignation: [, []],
      appType: [0, []],
      yYYYMMDD: [, []],
      yYYYMMDDNgb: [this.dateFormate.getCurrentNgbDate(), []],
      companyID: [this.compId, []],
      applyTo: [, [Validators.required]],
      toEmpName: [, []],
      toDesignation: [, []],
      reason: [, [Validators.required]],
      emgContructNo: [, []],
      emgAddress: [, []],
    })
  }
  get f() {
    return this.tourApplyForm.controls;
  }
  get formVal() {
    return this.tourApplyForm.value;
  }
  reset() {
    this.createForm();
    this.btnStatus = "Save";
    this.isSubmitted=false;
  }

  setEmpInfo(empCode:string, empNameControl:AbstractControl, designationControl:AbstractControl, deptControl?:AbstractControl){
    if(empCode==null ){
      empNameControl.patchValue(null);
      designationControl.patchValue(null);
      if(deptControl!=null){
        deptControl.patchValue(null);
      }
    }
    this.employmentES.getEmployment(empCode, this.compId).subscribe((response: ApiResponse) => {
      if(response.status){
        let empToInfo = response.result as Employment;
        empNameControl.patchValue(empToInfo.empName)
        designationControl.patchValue(empToInfo.designation)
        if(deptControl!=null){
          deptControl.patchValue(empToInfo.department)
        }
      }
    })
  }
}
