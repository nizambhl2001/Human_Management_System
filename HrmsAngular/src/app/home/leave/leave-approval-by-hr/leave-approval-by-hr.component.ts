import { AuthService } from './../../../services/auth.service';
import { SearchEmployee } from './../../../models/hr/search-emp.model';
import { LeaveType } from './../../../models/leave/leave-type.model';
import { NgbDateCustomParserFormatter } from './../../../shared/dateformat';
import { ApiResponse } from './../../../models/response.model';
import { LeaveApply } from './../../../models/leave/leave-apply.model';
import { Pagination } from './../../../shared/paginate';
import { Component, OnInit } from '@angular/core';
import { LeaveService } from '../../../services/leave.service';
import { LeaveDetails } from '../../../models/leave/leave-details.model';
import { ToastrService } from 'ngx-toastr';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, FormBuilder } from '@angular/forms';
import { EmploymentService } from '../../../services/hr/employment.service';
import { SystemSetupService } from '../../../services/system-setup/system-setup.service';
import { Helper } from '../../../shared/helper';
import { ReportService } from '../../../services/report.service';
import { ReportHelper } from '../../../shared/report-helper';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-leave-approval-by-hr',
  templateUrl: './leave-approval-by-hr.component.html',
  styleUrls: ['./leave-approval-by-hr.component.scss']
})
export class LeaveApprovalByHrComponent extends Pagination implements OnInit {

  _compId: number;
  _leaveApplications: LeaveApply[] = [];
  _leaveId: number;
  leaveTypes: LeaveType[] = [];
  exporting:boolean=false;
  isSubmitted:boolean=false;
  reportList:any[]=[];
  ReportId:number=211;
  pageId:any[]=[];
  exportType:string='pdf';
  _leaveApplicationForm: FormGroup;
  constructor(
    private leaveService: LeaveService,
    private toaster: ToastrService,
    private modalService: NgbModal,
    private dateFormat: NgbDateCustomParserFormatter,
    private fb: FormBuilder,
    private empService: EmploymentService,
    private holydayService: SystemSetupService,
    private rptService:ReportService,
    private reportHelper:ReportHelper
  ) {
    super();
  }
  ngOnInit() {
    this._compId = AuthService.getLoggedCompanyId();
    this.perPage = 5;
    this.pageId=AuthService.getAssignedPages();
    this.searchKeys = ['empName', 'department', 'designation', 'laDate']
    // this.getLeaveInfoForHrApprove(this._compId, (new Date).getFullYear());
    this.getLeaveInfoForHrApprove(this._compId);
    this.createForm();
   this.getReport();
  }

  // getLeaveInfoForHrApprove(compId: number, year: number) {
  //   this.leaveService.getLeaveInfoForHrApprove(compId, year).subscribe((response: ApiResponse) => {
  //     if (response.status) {
  //       this._leaveApplications = response.result as LeaveApply[];
  //       this.items = response.result as LeaveApply[];
  //       this.update();
  //     }
  //   })
  // }
getReport(){
this.reportList=[
  {
    ReportId:211,ReportType:1,TypeName:'Leave Approval By HR'
  }
]
console.log(this.ReportId)
}
  getLeaveInfoForHrApprove(compId: number) {
    this.leaveService.getLeaveInfoForHrApprove(compId).subscribe((response: ApiResponse) => {
      if (response.status) {
        this._leaveApplications = response.result as LeaveApply[];
        this.items = response.result as LeaveApply[];
        this.update();
      }
    })
  }
  getWaringForApprove(leaveId: number, modal: any) {
    this._leaveId = leaveId;
    this.modalService.open(modal);
  }
  approve() {
    let la = this._leaveApplications.find(c => c.id == this._leaveId);
    let leaveDetails = new LeaveDetails();
    leaveDetails.leaveID = la.id;
    leaveDetails.empCode = la.empCode;
    leaveDetails.startDate = la.lsDate;
    leaveDetails.endDate = la.leDate;
    this.leaveService.approveByHr(leaveDetails).subscribe((response: ApiResponse) => {
      if (response.status) {
        this.toaster.success(response.result, 'Approved!');
        // this.getLeaveInfoForHrApprove(this._compId, (new Date()).getFullYear());
         this.getLeaveInfoForHrApprove(this._compId);
        if(this._leaveApplications.length==1){
         this._leaveApplications=[];
        }
        this.dismiss();
      } else {
        this.toaster.error(response.result, 'Failed!');
      }
      // this.getLeaveInfoForHrApprove(this._compId, (new Date()).getFullYear());
      this.getLeaveInfoForHrApprove(this._compId);

    })
    this._leaveId = 0;
  }

  getWarningForCancel(leaveId: number, modal: any) {
    this._leaveId = leaveId;
    this.modalService.open(modal);
  }
  cancel() {
    this.leaveService.cancelByHr(this._leaveId).subscribe((response: ApiResponse) => {
      if (response.status) {
        this.toaster.success(response.result, 'Canceled!');
        //this.getLeaveInfoForHrApprove(this._compId, (new Date()).getFullYear());
        this.dismiss()
      } else {
        this.toaster.error(response.result, 'Failed!');
      }
    })
    this._leaveId = 0;
  }
  getLeaveType(grade: number, gender: number) {
    this.leaveService.getLeaveType(grade, gender).subscribe((response: ApiResponse) => {
      if (response.status) {
        this.leaveTypes = response.result as LeaveType[];
      }
    })
  }

  edit(leaveId: number, modal: any) {
    this.createForm();
    let application = this._leaveApplications.find(c => c.id == leaveId);

    //Load Leave Types
    this.empService.getEmployment(application.empCode, this._compId).subscribe((response: ApiResponse) => {
      if (response.status) {
        let emp = response.result as SearchEmployee;
        this.getLeaveType(1, emp.gender);
      }
    })

    //Load Edit form
    this.leaveService.getLeaveInfoById(leaveId).subscribe((response: ApiResponse) => {
      if (response.status) {
        let la = response.result as LeaveApply;
        this._leaveApplicationForm.patchValue({
          id: la.id,
          empCode: la.empCode,
          empName: application.empName,
          laDateNgb: this.dateFormat.stringToNgbDate(la.laDate),
          lsDateNgb: this.dateFormat.stringToNgbDate(la.lsDate),
          leDateNgb: this.dateFormat.stringToNgbDate(la.leDate),
          lTypedID: la.lTypedID,
          accepteDuration: la.accepteDuration,
          unAccepteDuration: la.accepteDuration,
          withpay: la.withpay,
          appType: la.appType,
          grandType: la.grandtype,
          authorityEmpcode: la.authorityEmpcode,
        });
        this.modalService.open(modal)
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
  updateAndApprove(){
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

    this.leaveService.updateAndApproveByHr(la).subscribe((response:ApiResponse)=>{
      if(response.status){
        // this.getLeaveInfoForHrApprove(this._compId, (new Date()).getFullYear());
        this.getLeaveInfoForHrApprove(this._compId);
        this.toaster.success(response.result, 'Updated!')
        this.ngOnInit();
      }else{
        this.toaster.error(response.result, 'Failed!');
      }
    })
  }

  dismiss() {
    this.modalService.dismissAll();
    this._leaveId = 0;
  }

  onSearch(searchKey: string) {
    if (searchKey) {
      this._leaveApplications = this.items.filter(cus => (
        (cus.empCode as string).toLocaleLowerCase().match(searchKey.toLocaleLowerCase()) ||
        (Helper.isNullOrEmpty(cus.empCode) ? '' : cus.empCode as string).toLocaleLowerCase().match(searchKey.toLocaleLowerCase())
      ))
    } else {
      this._leaveApplications = this.items;
    }
  }

  createForm() {
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
      authorityEmpcode: [, []],
      leaveId:[this._leaveId,[]],
      ReportId:this.ReportId
    })
  }
export(any){
  console.log(any);
  this.exporting=true;
  this.isSubmitted = true;
  this.rptService.getLeaveReport({
    ReportId:this.ReportId,
  ExportType:this.exportType,
  CompanyID:this._compId,
  EmpCode:any.empCode,
  strDate:any.lsDate,
  EndDate:any.leDate,
  LeaveID:any.id
  })

  .subscribe(
    exportedFile=>{
    this.exporting=false;
      this.reportHelper.openFileWindow(exportedFile as Blob);
    },
    (err:HttpErrorResponse)=>{
      this.exporting=false;
      this.toaster.error(err.message, 'Failed!');
    })
  }
 }
