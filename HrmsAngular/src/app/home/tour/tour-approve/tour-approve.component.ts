import { AuthService } from './../../../services/auth.service';
import { ToastrService } from 'ngx-toastr';
import { format } from 'util';
import { ApiResponse } from './../../../models/response.model';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Pagination } from '../../../shared/paginate';
import { TourApplyModel } from '../../../models/tour/tour-apply.model';
import { TourApplyService } from '../../../services/Tour/tour-apply.service';
import { Employment } from '../../../models/hr/employment.model';
import { EmploymentService } from '../../../services/hr/employment.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-tour-approve',
  templateUrl: './tour-approve.component.html',
  styleUrls: ['./tour-approve.component.scss']
})
export class TourApproveComponent extends Pagination implements OnInit {
  compID: number;
  userID: number;
  selectedRowIndex: number = 0;
  actionType: number;
  isSubmitted = false;
  empCode: string;
  gradeValue: number;
  tourApproveForm: FormGroup
  tourList: TourApplyModel[] = []
  constructor(
    private formBuilder: FormBuilder,
    private modalService: NgbModal,
    private employmentES: EmploymentService,
    private toasterService: ToastrService,
    private tourApproveListService: TourApplyService
  ) {
    super();
  }
  title = "Tour Approve"
  ngOnInit() {
    this.compID = AuthService.getLoggedCompanyId();
    this.userID = AuthService.getLoggedUserId();
    this.empCode = AuthService.getLoggedEmpCode();
    this.createForm();
    this.getAllList();
    this.getEmpInfoByEmpCode(this.empCode);
    this.items = [];
    this.update();
  }
  getEmpInfoByEmpCode(empCode: string) {
    this.employmentES.getEmployment(empCode, this.compID).subscribe((response: ApiResponse) => {
      let empInfo = response.result as Employment;
      this.employmentES.getEmployment(empInfo.reportTo, this.compID).subscribe((response: ApiResponse) => {
        let empReportTo = response.result as Employment;
        this.f.empCode.setValue(empReportTo.empCode);
        this.f.empName.setValue(empReportTo.empName);
        this.f.designation.setValue(empReportTo.designation);
      })
    })
  }
  getEmpInfo(empCode: string) {
    if (empCode == "") {
      return;
    }
    this.employmentES.getEmployment(empCode, this.compID).subscribe((response: ApiResponse) => {
      let empInfo = response.result as Employment;
      this.tourApproveForm.patchValue({
        empCode: empInfo.empCode,
        empName: empInfo.empName,
        designation: empInfo.designation
      })
    })
  }
  getAllList() {
    this.tourApproveListService.getTourList(this.empCode, this.compID,4).subscribe((response: ApiResponse) => {
      if (response.status) {
        this.tourList = response.result as TourApplyModel[];
      }
    })
  }
  updateStatus(index: number, actionType: number) {
    this.isSubmitted = true;
    if (this.tourApproveForm.invalid && actionType == 2) {
      this.toasterService.warning("Fill EmpCode");
      return;
    }
    else {
      this.isSubmitted=false;
      let formValue = this.tourApproveForm.value;
      let selectedRow = this.tourList[index];
      selectedRow.tourID = this.tourList[index].id;
      selectedRow.reqTo = formValue.empCode;
      selectedRow.reqFrom = this.empCode;
      selectedRow.pOptions = actionType;
      this.tourApproveListService.tourStatus(selectedRow).subscribe((response: ApiResponse) => {
        if (response.status) {
          if (actionType == 2) {
            this.toasterService.success("Successfully Recommented");
            this.getAllList();
          }
          else
            if (actionType == 1) {
              this.toasterService.success("Approved");
              this.getAllList();
            }
            else if (actionType == 3) {
              this.toasterService.warning();
              this.getAllList();
            }
          this.getAllList();
        }
        else {
          this.toasterService.error("Fail");
        }
      })
    }
  }
  createForm() {
    this.tourApproveForm = this.formBuilder.group({
      id: [, []],
      tourID: [, []],
      reqTo: [this.empCode, []],
      userID: [this.userID, []],
      cOmpanyID: [this.compID, []],
      msg: [, []],
      pOptions: [, []],
      empName: [, []],
      department: [, []],
      designation: [, []],
      gradeValue: [this.gradeValue, []],
      status: [, []],
      empCode: [, [Validators.required]],
      companyID: [this.compID, []],
      applyTo: [, []],
      reason: [, []]
    })
  }
  get f() {
    return this.tourApproveForm.controls;
  }
  get formVal() {
    return this.tourApproveForm.value;
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
