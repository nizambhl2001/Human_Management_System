import { AuthService } from './../../../services/auth.service';
import { ToastrService } from 'ngx-toastr';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Pagination } from '../../../shared/paginate';
import { TourApplyService } from '../../../services/Tour/tour-apply.service';
import { TourApplyModel } from '../../../models/tour/tour-apply.model';
import { ApiResponse } from '../../../models/response.model';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-tour-approve-hr',
  templateUrl: './tour-approve-hr.component.html',
  styleUrls: ['./tour-approve-hr.component.scss']
})
export class TourApproveHrComponent extends Pagination implements OnInit {
  tourApproveHrForm:FormGroup
  compId:number
  selectedRowIndex: number = 0;
  actionType: number;
  empCode:string
  tourList: TourApplyModel[] = []
  constructor(
    private toasterService:ToastrService,
    private modalService: NgbModal,
    private formBuilder:FormBuilder,
    private tourApproveListService: TourApplyService
  ) {
    super();
  }
  title="Tour Approve by HR";
  ngOnInit() {
  this.empCode='';
    this.compId=AuthService.getLoggedCompanyId();
    this.items=[];
    this.update();
    this.getAllList();
  }
  getAllList() {
    this.tourApproveListService.getTourList(this.empCode, this.compId,5).subscribe((response: ApiResponse) => {
      if (response.status) {
        this.tourList = response.result as TourApplyModel[];
      }
    })
  }
  updateStatus(index: number, actionType: number) {
      let selectedRow = this.tourList[index];
      selectedRow.tourID = this.tourList[index].id;
      selectedRow.reqFrom = this.empCode;
      selectedRow.pOptions = actionType;
      this.tourApproveListService.tourStatus(selectedRow).subscribe((response: ApiResponse) => {
        if (response.status) {
            if (actionType == 6) {
              this.toasterService.success("Approved");
              this.getAllList();
            }
          this.getAllList();
          }
        else {
          this.toasterService.error("Fail");
        }
      })
    }

  createForm() {
    this.tourApproveHrForm = this.formBuilder.group({
      id: [, []],
      tourID: [, []],
      reqTo: [this.empCode, []],
      userID: [, []],
      cOmpanyID: [this.compId, []],
      msg: [, []],
      pOptions: [, []],
      empName: [, []],
      department: [, []],
      designation: [, []],
      gradeValue: [, []],
      status: [, []],
      empCode: [, [Validators.required]],
      companyID: [this.compId, []],
      applyTo: [, []],
      reason: [, []]
    })
  }
  get f() {
    return this.tourApproveHrForm.controls;
  }
  get formVal() {
    return this.tourApproveHrForm.value;
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
