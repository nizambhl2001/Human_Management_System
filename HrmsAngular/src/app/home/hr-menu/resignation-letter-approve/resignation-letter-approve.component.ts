import { AuthService } from './../../../services/auth.service';
import { ApiResponse } from './../../../models/response.model';
import { Employment } from './../../../models/hr/employment.model';
import { ToastrService } from 'ngx-toastr';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { EmploymentService } from '../../../services/hr/employment.service';
import { ResignationApproveService } from '../../../services/hr/resignation-lettre-approve.service';
import { ResignationLettreModel } from '../../../models/hr/emp-resignation-lettre.model';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-resignation-letter-approve',
  templateUrl: './resignation-letter-approve.component.html',
  styleUrls: ['./resignation-letter-approve.component.scss']
})
export class ResignationLetterApproveComponent implements OnInit {
  companyID: number;
  isSubmitted = false;
  selectedRowIndex: number = 0;
  actionType: number;
  empCode: string;
  allResignationLetter: ResignationLettreModel[] = [];
  resignationApproveForm: FormGroup
  constructor(
    private formBuilder: FormBuilder,
    private employmentES: EmploymentService,
    private modalService: NgbModal,
    private toastrService: ToastrService,
    private resignationApproveS: ResignationApproveService
  ) { }

  ngOnInit() {
    this.companyID = AuthService.getLoggedCompanyId();
    this.empCode = AuthService.getLoggedEmpCode();
    this.createForm();
    this.getAllResignationLetter();
    this.getEmpInfoByEmpCode(this.empCode);
  }

  getEmpInfoByEmpCode(empCode: string) {
    this.employmentES.getEmployment(empCode, this.companyID).subscribe((response: ApiResponse) => {
      let empInfo = response.result as Employment;
      this.employmentES.getEmployment(empInfo.reportTo, this.companyID).subscribe((response: ApiResponse) => {
        let empReportTo = response.result as Employment;
        this.f.empCode.setValue(empReportTo.empCode);
        this.f.empName.setValue(empReportTo.empName);
        this.f.empDesignation.setValue(empReportTo.designation);
      })
    })
  }
  getEmpInfo(empCode: string) {
    if (empCode == "") {
      this.reset();
      return;
    }
    this.employmentES.getEmployment(empCode, this.companyID).subscribe((response: ApiResponse) => {
      let empInfo = response.result as Employment;
      this.resignationApproveForm.patchValue({
        empCode: empInfo.empCode,
        empName: empInfo.empName,
        empDesignation: empInfo.designation
      })
    })
  }
  getAllResignationLetter() {
    this.resignationApproveS.getResignationApprove
      (
        this.f.reqTo.value,
        this.f.companyID.value
      )
      .subscribe((response: ApiResponse) => {
        if (response.status) {
          this.allResignationLetter = response.result as ResignationLettreModel[];
        }
        else {

        }
      })
  }
  updateStatus(index: number, actionType: number) {
    this.isSubmitted = true;
    if (this.resignationApproveForm.invalid && actionType == 2) {
      this.toastrService.warning("Fill EmpCode");
      return;
    }
    else {
      this.isSubmitted = false;
      let formValue = this.resignationApproveForm.value;
      let selectedRow = this.allResignationLetter[index];
      selectedRow.reqFrom = this.empCode;
      selectedRow.reqTo = formValue.empCode;
      selectedRow.remarks = formValue.remarks;
      selectedRow.type = actionType;//Type Fixed From StoreProcidure
      this.resignationApproveS.noticeLettereStatus(selectedRow).subscribe((response: ApiResponse) => {
        if (response.status) {
          if (actionType == 2) {
            this.toastrService.success("Successfully Recommented");
            this.getAllResignationLetter();
          }
          else if (actionType == 1) {
            this.toastrService.success("Approved");
            this.getAllResignationLetter();
          }
          else if (actionType == 3) {
            this.getAllResignationLetter();
            this.toastrService.warning();
          }
          this.getAllResignationLetter();
        }
        else {
          this.toastrService.error(response.result, "Fail");
        }
      })
    }
  }
  createForm() {
    this.resignationApproveForm = this.formBuilder.group({
      id: [, []],
      empCode: [, [Validators.required]],
      empName: [, []],
      empDesignation: [, []],
      lettre: [, []],
      type: [, []],
      lDate: [, []],
      lDateNgb: [, []],
      companyID: [this.companyID, []],
      reason: [, []],
      approveType: [, []],
      reqFrom: [, []],
      resignID: [, []],
      reqTo: [this.empCode, []],
      remarks: [, []],
      msg: [, []]
    })
  }
  get f() {
    return this.resignationApproveForm.controls;
  }
  get formVal() {
    return this.resignationApproveForm.value;
  }
  reset() {
    this.createForm();
  }
  cancel(index: number, actionType: number, modal: any) {
    this.selectedRowIndex = index;
    this.actionType = actionType;
    this.modalService.open(modal);
  }
  confirm() {
    this.updateStatus(this.selectedRowIndex, this.actionType);
    this.modalService.dismissAll();
  }
  close() {
    this.modalService.dismissAll();
  }
}

