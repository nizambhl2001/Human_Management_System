import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { Employment } from '../../../models/hr/employment.model';
import { SearchEmployee } from '../../../models/hr/search-emp.model';
import { LeaveApply } from '../../../models/leave/leave-apply.model';
import { LeaveInfoStatus } from '../../../models/leave/leave-info-status.model';
import { LeaveType } from '../../../models/leave/leave-type.model';
import { ApiResponse } from '../../../models/response.model';
import { AuthService } from '../../../services/auth.service';
import { EmploymentService } from '../../../services/hr/employment.service';
import { LeaveService } from '../../../services/leave.service';
import { SystemSetupService } from '../../../services/system-setup/system-setup.service';
import { NgbDateCustomParserFormatter } from '../../../shared/dateformat';
import { Pagination } from '../../../shared/paginate';

@Component({
  selector: 'app-leave-recommend',
  templateUrl: './leave-recommend.component.html',
  styleUrls: ['./leave-recommend.component.scss']
})
export class LeaveRecommendComponent extends Pagination implements OnInit {
  _compId: number;
  _empCode: string;
  _leaveApplications: LeaveApply[] = [];
  _applierEmpCode: string;
  _leaveId: number = 0;
  leaveTypes: LeaveType[] = [];
  _applicantGrade: number;

  _forwardEmpForm: FormGroup;
  _leaveApplicationForm: FormGroup;

  constructor(
    private leaveService: LeaveService,
    private empService: EmploymentService,
    private modalService: NgbModal,
    private toaster: ToastrService,
    private fb: FormBuilder,
    private dateFormat: NgbDateCustomParserFormatter,
    private holydayService: SystemSetupService
  ) {
    super();
  }
  ngOnInit() {
    this._compId = AuthService.getLoggedCompanyId();
    this._empCode =AuthService.getLoggedEmpCode();
    this.createForm();
    this.createApplicationForm();
    this.getWaitingLeaveForRecommend();
    this.getLeaveType(-1, 0);

    // this.empService.getEmployment(this._empCode, this._compId).subscribe((response: ApiResponse) => {
    //   if (response.status) {
    //     let employee = response.result as Employment;
    //     this.getForwardEmp(employee.reportTo);
    //   }
    // })
  }

  getApplyTo(applierEmpCode:string){
    this.empService.getEmployment(applierEmpCode, this._compId).subscribe((response: ApiResponse) => {
      if (response.status) {
        let employee = response.result as Employment;
        this.getForwardEmp(employee.reportTo);
      }
    })
  }

  onEmpSearchBtnClick(modal: any) {
    this.modalService.open(modal);
  }
  getWaitingLeaveForRecommend() {
    this.leaveService.getWaitingLeaveForRecommend(this._compId, (new Date()).getFullYear().toString(), this._empCode)
      .subscribe((response: ApiResponse) => {
        if (response.status) {
          this._leaveApplications = response.result as LeaveApply[];
         
        }
      })
  }





  getForwardEmp(empCode: string) {
    if (empCode == null || empCode == "") { return; }
    this.empService.getEmployment(empCode, this._compId).subscribe((response: ApiResponse) => {
      if (response.status) {
        console.log("ref",response.result)
        let forwardEmployee = response.result as SearchEmployee;
        this._forwardEmpForm.patchValue({
          empCode: forwardEmployee.empCode,
          empName: forwardEmployee.empName,
          designation: forwardEmployee.designation
        });
    
        this._leaveApplicationForm.patchValue({
          forwardToEmpCode:forwardEmployee.empCode,
          forwardToEmpName: forwardEmployee.empName,
        })
      } else {
        this._forwardEmpForm.patchValue({
          empName: null,
          designation: null,
        })
        this._leaveApplicationForm.patchValue({
          forwardToEmpCode:null,
          empName: null,
        })
      }
    })
  }
  recommend(leave: any, modal: any) {
    this.modalService.open(modal);
    this._leaveId = leave.id;
    this._applierEmpCode = leave.empCode;
    this.getApplyTo(this._applierEmpCode)

  }
  RecommendConfirmation() {
    if (this._forwardEmpForm.invalid) {
      this.toaster.error('Forward to employee ID is required', 'Invalid Submission!');
      return;
    }
    let leaveInfoStatus = new LeaveInfoStatus();
    leaveInfoStatus.leaveID = this._leaveId;
    leaveInfoStatus.reqFrom = this._empCode;
    leaveInfoStatus.reqTo = this._forwardEmpForm.controls['empCode'].value;
    leaveInfoStatus.statusDate = new Date();
    leaveInfoStatus.remarks = this._forwardEmpForm.controls['remarks'].value;
    leaveInfoStatus.cOmpanyID = this._compId;
    leaveInfoStatus.type = 1 //Type was fixed from Stored Procedure
    this.leaveService.updateLeaveInfoStatus(leaveInfoStatus).subscribe((response: ApiResponse) => {
      if (response.status) {
        this.toaster.success('Application transferred to ' + this._forwardEmpForm.controls['empName'].value, 'Recommended!')
        this.getWaitingLeaveForRecommend();
        if(this._leaveApplications.length==1){
          this._leaveApplications=[];
         }
        this.cancel();
      }
    });
  }
  approve(leaveId: number, modal: any) {
    this.modalService.open(modal);
    this._leaveId = leaveId;
  }
  approveConfirmation() {
    let leaveInfoStatus = new LeaveInfoStatus();
    leaveInfoStatus.leaveID = this._leaveId;
    leaveInfoStatus.reqFrom = this._empCode;
    leaveInfoStatus.remarks = this._forwardEmpForm.controls['remarks'].value;
    leaveInfoStatus.cOmpanyID = this._compId;
    leaveInfoStatus.type = 2 //Type was fixed from Stored Procedure
    this.leaveService.updateLeaveInfoStatus(leaveInfoStatus).subscribe((response: ApiResponse) => {
      if (response.status) {
        this.toaster.success('Application Approved Successfully! ', 'Approved!')
        this.getWaitingLeaveForRecommend();
        if(this._leaveApplications.length==1){
          this._leaveApplications=[];
         }
        this.cancel();
      } else {
        this.toaster.error('Failed to approve application!', 'Failed!')
      }
    });
  }

  cancelApplication(leaveId: number, modal: any) {
    this._leaveId = leaveId;
    this.modalService.open(modal);
  }
  cancelConfirmation() {
    let leaveInfoStatus = new LeaveInfoStatus();
    leaveInfoStatus.leaveID = this._leaveId;
    leaveInfoStatus.reqFrom = this._empCode;
    leaveInfoStatus.remarks = this._forwardEmpForm.controls['remarks'].value;
    leaveInfoStatus.cOmpanyID = this._compId;
    leaveInfoStatus.type = 3 //Type was fixed from Stored Procedure
    this.leaveService.updateLeaveInfoStatus(leaveInfoStatus).subscribe((response: ApiResponse) => {
      if (response.status) {
        this.getWaitingLeaveForRecommend();
        if(this._leaveApplications.length==1){
          this._leaveApplications=[];
         }
        this.toaster.success('Leave Application canceled! ', 'Canceled!')
        this.cancel();
      } else {
        this.toaster.error('Failed to cancel application!', 'Failed!')
      }
    });
  }

  getLeaveType(grade: number, gender: number) {
    this.leaveService.getLeaveType(grade, gender).subscribe((response: ApiResponse) => {
      if (response.status) {
        this.leaveTypes = response.result as LeaveType[];
      }
    })
  }
  edit(leaveId: number, modal: any) {
    
    this.leaveService.getLeaveInfoById(leaveId).subscribe((response: ApiResponse) => {
      if (response.status) {
        let la = response.result as LeaveApply;
        console.log(" response.result", response.result)
        
        this.getApplyTo(la.empCode)
      
       
        this.empService.getEmployment(la.empCode, this._compId).subscribe((response:ApiResponse)=>{
          if(response.status){
            let emp = response.result as SearchEmployee;
            this.getLeaveType(1, emp.gender)
          }
        })
        this._leaveApplicationForm.patchValue({
          id: la.id,
          empCode: la.empCode,
          empName: this._leaveApplications.find(c => c.id == leaveId).empName,
          lTypedID: la.lTypedID,
          laDateNgb: this.dateFormat.stringToNgbDate(la.laDate),
          lsDateNgb: this.dateFormat.stringToNgbDate(la.lsDate),
          leDateNgb: this.dateFormat.stringToNgbDate(la.leDate),
          unAccepteDuration: la.accepteDuration,
          accepteDuration: la.accepteDuration,
          withpay: la.withpay
        });
        this.modalService.open(modal);
      }
    })
  }
  dateDiff() {
    if (this._leaveApplicationForm.value.lsDateNgb == null || this._leaveApplicationForm.value.leDateNgb == null) {
      return;
    }
    let fromDate = this.dateFormat.getNgbDateToYyyymmdd(this._leaveApplicationForm.value.lsDateNgb);
    let toDate = this.dateFormat.getNgbDateToYyyymmdd(this._leaveApplicationForm.value.leDateNgb);
    let applyDuration = this.dateFormat.getDateDiff(this._leaveApplicationForm.value.lsDateNgb, this._leaveApplicationForm.value.leDateNgb)
    let numberOfHolyday = 0;
    this.empService.getEmployment(this._leaveApplicationForm.value.empCode, this._compId)
      .subscribe((resposne: ApiResponse) => {
        if (resposne.status) {
          let emp = resposne.result as SearchEmployee;
          this.holydayService.getNumOfHolyday(fromDate, toDate, emp.gradeValue).subscribe((response: ApiResponse) => {
            if (response.status) {
              numberOfHolyday = response.result;
              this._leaveApplicationForm.patchValue({
                accepteDuration: applyDuration - numberOfHolyday
              })
            } else {
              this._leaveApplicationForm.patchValue({
                accepteDuration: applyDuration
              })
            }
          })
        }
      })
  }
  getForwardEmpInEditModal(empCode: string) {
    this.empService.getEmployment(empCode, this._compId).subscribe((response: ApiResponse) => {
      if (response.status) {
        let emp = response.result as SearchEmployee;
        this._leaveApplicationForm.patchValue({
          empCode:emp.empCode,
          forwardToEmpName: emp.empName
        })
      }
    })
  }
  updateAndForward() {

    let la: LeaveApply = new LeaveApply()
    let frm = this._leaveApplicationForm.value;
    la.id = frm.id;
    la.lTypedID = frm.lTypedID;
    la.laDate = this.dateFormat.ngbDateToDate(frm.laDateNgb).toLocaleDateString();
    la.lsDate = this.dateFormat.ngbDateToDate(frm.lsDateNgb).toLocaleDateString();
    la.leDate = this.dateFormat.ngbDateToDate(frm.leDateNgb).toLocaleDateString();
    la.unAccepteDuration = frm.unAccepteDuration - frm.accepteDuration;
    la.accepteDuration = frm.accepteDuration;
    la.withpay = frm.withpay;
    la.companyID = frm.companyID;
    la.appType = frm.appType;
    la.grandtype = frm.grandtype;
    la.authorityEmpcode = this._empCode;
    this.leaveService.updateByAuthority(la).subscribe((response: ApiResponse) => {
      if (response.status) {
        this.toaster.success(response.result, 'Updated!');

        //Forward To
        let leaveInfoStatus = new LeaveInfoStatus();
        leaveInfoStatus.leaveID = la.id;
        // leaveInfoStatus.reqFrom = la.authorityEmpcode;
        leaveInfoStatus.reqTo = frm.forwardToEmpCode;
        leaveInfoStatus.statusDate = new Date();
        leaveInfoStatus.reqFrom = this._empCode;
        // leaveInfoStatus.reqTo = this._leaveApplicationForm.controls['empCode'].value;
        // leaveInfoStatus.remarks = this._leaveApplicationForm.controls['remarks'].value;
        leaveInfoStatus.cOmpanyID = this._compId;
        leaveInfoStatus.type = 1 //Type was fixed from Stored Procedure
        debugger
        this.leaveService.updateLeaveInfoStatus(leaveInfoStatus).subscribe((response: ApiResponse) => {
          if (response.status) {
            this.toaster.success('Application transferred to ' + frm.forwardToEmpName, 'Recommended!')
            this.cancel();
              this.getWaitingLeaveForRecommend();
            if(this._leaveApplications.length==1){
              this._leaveApplications=[];
             }
            this.createApplicationForm();            
          }
        });
      } else {
        this.toaster.error(response.result, 'Failed!');
      }
    })
  }
  cancel() {
    this.modalService.dismissAll();
    this._leaveId = 0;

  }

  createForm() {
    this._forwardEmpForm = this.fb.group({
      empCode: [, [Validators.required]],
      empName: [, []],
      designation: [, []],
      remarks: [, []]
    })
  }
  createApplicationForm() {
    this._leaveApplicationForm = this.fb.group({
      id: [, []],
      empCode: [, []],
      empName: [, []],
      laDateNgb: [, []],
      lsDateNgb: [, []],
      leDateNgb: [, []],
      lTypedID: [, []],
      accepteDuration: [, []],
      unAccepteDuration: [, []],
      withpay: ['1', []],
      grandtype: [1, []],
      appType: [0, []],
      companyID: [this._compId, []],
      authorityEmpcode: [this._empCode, []],
      forwardToEmpCode: [, []],
      forwardToEmpName: [, []]

    })

  }
  get f() {
    return this._forwardEmpForm.value;
  }

}
