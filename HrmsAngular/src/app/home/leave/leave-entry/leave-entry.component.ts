import { AuthService } from './../../../services/auth.service';
import { SearchEmployee } from './../../../models/hr/search-emp.model';
import { LeaveApply } from './../../../models/leave/leave-apply.model';
import { NgbDateStruct, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgbDateCustomParserFormatter } from './../../../shared/dateformat';
import { LeaveType } from './../../../models/leave/leave-type.model';
import { Employment } from './../../../models/hr/employment.model';
import { ApiResponse } from './../../../models/response.model';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { LeaveStatus } from '../../../models/leave/leave-status.model';
import { LeaveService } from '../../../services/leave.service';
import { EmploymentService } from '../../../services/hr/employment.service';
import { DatePipe } from '@angular/common';
import { ToastrService } from 'ngx-toastr';
import { SystemSetupService } from '../../../services/system-setup/system-setup.service';
import { LeaveStatusInfoModel } from '../../../models/leave/leave-status-info.model';

@Component({
  selector: 'app-leave-entry',
  templateUrl: './leave-entry.component.html',
  styleUrls: ['./leave-entry.component.scss', '../../../../vendor/libs/ng-select/ng-select.scss']
})
export class LeaveEntryComponent implements OnInit {

  constructor(
    private formBuilder: FormBuilder,
    private empService: EmploymentService,
    private leaveService: LeaveService,
    private holyDayService: SystemSetupService,
    public dateFormat: NgbDateCustomParserFormatter,
    private toaster: ToastrService,
    private modalService: NgbModal
  ) { }
  appliedLeaveStatus: LeaveStatusInfoModel[] = []
  leaveDetailsStatus:LeaveStatusInfoModel[] = []
  btnStatus: string = 'Save';
  isSubmitted: boolean = false;
  compId: number;
  userId: number;
  userTypeId: number;
  grade: number;
  gender: number;
  empCode: string;
  _applicantGrade: number = -1;

  leaveApplyForm: FormGroup;
  leaveTypes: LeaveType[] = [];
  leaveStatus: LeaveStatus[] = [];
  leaveInfo: LeaveApply[] = [];

  selectedEmp: string;
  isExistBalance: boolean = true;
  hasPendingApplication: boolean= false;


  ngOnInit() {
    this.compId = AuthService.getLoggedCompanyId();
    this.grade = AuthService.getLoggedGradeValue();
    this.gender = AuthService.getLoggedGender();
    this.userId=AuthService.getLoggedUserId();
    console.log("user",this.userId)
    this.empCode=AuthService.getLoggedEmpCode();
    this.userTypeId=AuthService.getLoggedUserTypeId();
    this.createForm();
    // this.getLeaveType(parseInt(this.empCode), 0);
    // this.getLeaveType(this.grade, 0);
    this.getAllLeaveStatus(this.empCode);

  }

  getSelectedEmpForApplicant(empCode) {
    //Employee code from search modal
    this.leaveApplyForm.controls['applicant'].patchValue({
      empCode: empCode,
    })
    this.getAllLeaveStatus(empCode)
  }
  getSelectedEmpForApplyTo(empCode: string) {
    //Employee code from search modal
    this.leaveApplyForm.controls['applyTo'].patchValue({
      empCode: empCode
    })
    this.getEmpForApply(empCode)
  }
  getSelectedEmpForPerformBy(empCode: string) {
    //Employee code from search modal
    this.leaveApplyForm.controls['performBy'].patchValue({
      empCode: empCode
    })
    this.getEmpForPerformBy(empCode)
  }
  onSearchClick(searchModal: any) {
    this.modalService.open(searchModal,{size:'lg'})
  }
  checkExistBalance() {
    let appliedDays = this.applicationControl.accepteDuration;
    let appliedLeaveType = this.leaveStatus.find(c => c.typeee == this.applicationControl.lTypedID);
    if (this.applicantControl.empCode == null || appliedLeaveType == null)
    { this.isExistBalance = true;
      return; }
    this.isExistBalance = appliedLeaveType.balance >= appliedDays;
  }
  checkPendingApplication(){
    console.log("leaveType",this.leaveInfo)
    // let pendingApplication = this.leaveInfo.filter(c => c.lTypedID == this.applicationControl.lTypedID && c.appType!='1');
    let pendingApplication = this.leaveInfo.filter(c => c.lTypedID == this.applicationControl.lTypedID && c.appType!='1');
    this.hasPendingApplication = pendingApplication.length>0;
  }
  checkAvailableDate(){
  let startDate=this.leaveInfo.find(c=> c.lsDate==this.dateFormat.ngbDateToDate(this.applicationControl.lsDate))
  let lStartDate=startDate.lsDate;
  }

  // getLeaveType(empCode: number, gender: number) {
  //   this.leaveService.getLeaveType(empCode, gender).subscribe((response: ApiResponse) => {
  //     if (response.status) {
  //       this.leaveTypes = response.result as LeaveType[];
  //     }
  //   })
  // }



  getEmpForApply(empCode: string) {
    if (empCode == "") { return }
    this.empService.getEmployment(empCode, this.compId).subscribe((response: ApiResponse) => {
      if (response.status) {
        let employee = response.result as Employment;
        this._applicantGrade = employee.empGradeID;
        this.leaveApplyForm.controls['applyTo'].patchValue({
          empCode: empCode,
          empName: employee.empName,
          designation: employee.designation
        })
      } else {
        this.leaveApplyForm.controls['applyTo'].patchValue({
          empName: null,
          designation: null
        })

      }
    })
  }

  getEmpForRecommendTo(empCode: string) {
    if (empCode == "") { return }
    this.empService.getEmployment(empCode, this.compId).subscribe((response: ApiResponse) => {
      if (response.status) {
        let employee = response.result as Employment;
        this._applicantGrade = employee.empGradeID

        this.leaveApplyForm.controls['recommendTo'].patchValue({
          empCode: empCode,
          empName: employee.empName,
          designation: employee.designation
        })
      } else {
        this.leaveApplyForm.controls['recommendTo'].patchValue({
          empCode: null,
          empName: null,
          designation: null
        })
      }
    })
  }
  getEmpForPerformBy(empCode: string) {
    if (empCode == "") { return }
    this.empService.getEmployment(empCode, this.compId).subscribe((response: ApiResponse) => {
      if (response.status) {
        let employee = response.result as Employment;
        this.leaveApplyForm.controls['performBy'].patchValue({
          empCode: employee.empCode,
          empName: employee.empName,
          designation: employee.designation
        })
      } else {
        this.leaveApplyForm.controls['performBy'].patchValue({
          empName: null,
          designation: null
        })
      }
    })
  }


  getAllLeaveStatus(empCode: any) {
    debugger
    if (empCode == "") { return }
    this.empService.getEmployment(empCode, this.compId).subscribe((response: ApiResponse) => {
      if (response.status) {
        let applicant = response.result as Employment;
        console.log("gender",applicant)
        // this.getLeaveType(parseInt(applicant.gradeValue), applicant.gender);
        // getLeaveType(parseInt(applicant.gradeValue), applicant.gender) {
         // this.leaveService.getLeaveType(parseInt(applicant.gradeValue), applicant.gender).subscribe((response: ApiResponse) => {
          this.leaveService.getLeaveType(parseInt(applicant.gradeValue), applicant.gender).subscribe((response: ApiResponse) => {
            if (response.status) {
              this.leaveTypes = response.result as LeaveType[];
            }
          })
        // }
        // this.getLeaveType(parseInt(applicant.empCode), applicant.gender);
        this.leaveApplyForm.controls['applicant'].patchValue({
          empCode:empCode,
          empName: applicant.empName,
          department: applicant.department,
          designation: applicant.designation
        })
        // this.leaveService.getLeaveStatus(this.compId, empCode, new Date().getFullYear(),parseInt(applicant.gradeValue,applicaiton=geblue))
        this.leaveService.getLeaveStatus(this.compId, empCode, new Date().getFullYear())
          .subscribe((response: ApiResponse) => {
            if (response.status) {
              this.leaveStatus = response.result as LeaveStatus[];
              console.log("Leave", this.leaveStatus)
            } else {
              this.leaveStatus = [];
            }
          })
        this.leaveService.getLeaveInfo(this.compId, empCode).subscribe((response: ApiResponse) => {
          if (response.status) {
            this.leaveInfo = response.result as LeaveApply[];
          } else {
            this.leaveInfo = [];
          }
        })


        this.getEmpForApply(applicant.reportTo);
        this.getEmpForRecommendTo(applicant.recommendTo);
        this.getLeaveStatus(empCode, this.compId)
      } else {
        this.leaveStatus = [];
        this.leaveInfo = [];
        this.leaveApplyForm.controls['applicant'].patchValue({
          empName: null,
          department: null,
          designation: null
        })
        this.leaveApplyForm.controls['applyTo'].patchValue({
          empCode: null,
          empName: null,
          designation: null
        })
        this.leaveApplyForm.controls['performBy'].patchValue({
          empCode: null,
          empName: null,
          designation: null
        })
      }
    })
  }
  getLeaveDetailsStatus(leaveID:number,modal){
    this.modalService.open(modal);
    this.leaveService.leaveDetailsStatus(
    5,leaveID,1,this.applyToControl.empCode,this.applicantControl.empCode,this.getStatusInfoControl.remarks
    ).subscribe((response:ApiResponse)=>{
      this.leaveDetailsStatus=response.result as LeaveStatusInfoModel[];
    })
  }
  getLeaveApplicationById(id: number) {
    let application = this.leaveInfo.find(c => c.id == id);
    this.getEmpForApply(application.applyTo);
    // this.getEmpForRecommendTo(application.recommendTo);
    this.getEmpForPerformBy(application.referanceEmpcode);
    this.leaveApplyForm.controls['application'].patchValue({
      id: application.id,
      lTypedID: application.lTypedID,
      accepteDuration: application.accepteDuration,
      lsDateNgb: this.dateFormat.stringToNgbDate(application.lsDate.toString()),
      leDateNgb: this.dateFormat.stringToNgbDate(application.leDate.toString()),
      laDateNgb: this.dateFormat.stringToNgbDate(application.laDate.toString()),
      reason: application.reason,
      emgContructNo: application.emgContructNo,
      emgAddress: application.emgAddress,
      withpay: application.withpay.toString(),
      companyID: application.companyID,
      grandtype: application.grandtype,
      appType: application.appType,
      yyyymmdd: application.yyyymmdd,
      aprovedate: application.aprovedate,
      haEmpcode: application.haEmpcode,
      haApprove: application.haApprove,
      authorityEmpcode: application.authorityEmpcode,
      authorityApprove: application.authorityApprove,
      hrApproveID: application.hrApproveID,
      userName: application.userName
    })
  }
  dateDiff() {
    if (this.applicationControl.lsDateNgb == null || this.applicationControl.leDateNgb == null) {
      return;
    }
    let fromDate = this.dateFormat.getNgbDateToYyyymmdd(this.applicationControl.lsDateNgb);
    let toDate = this.dateFormat.getNgbDateToYyyymmdd(this.applicationControl.leDateNgb);
    let applyDuration = this.dateFormat.getDateDiff(this.applicationControl.lsDateNgb, this.applicationControl.leDateNgb)
    console.log(applyDuration);
    let numberOfHolyday = 0;
    this.holyDayService.getNumOfHolyday(fromDate, toDate, this._applicantGrade).subscribe((response: ApiResponse) => {
      if (response.status) {
        numberOfHolyday = response.result;
        this.leaveApplyForm.controls['application'].patchValue({
          // accepteDuration: applyDuration - numberOfHolyday
          accepteDuration: applyDuration
        })
      } else {
        this.leaveApplyForm.controls['application'].patchValue({
          accepteDuration: applyDuration
        })
      }
    this.checkExistBalance();
    })
  }
  apply() {
    this.isSubmitted = true;
    if (this.leaveApplyForm.invalid) {
      this.toaster.error('Please! Fill all required field!', 'Invalid Submission')
      return;
    }
    // else if(this.hasPendingApplication==true){
    //    this.toaster.warning('Already Painding Application !!')
    //    return;
    // }
    else if(this.isExistBalance==false){
       this.toaster.warning("Balance Not Available !!");
    }
    else{
      debugger
    let application: LeaveApply = new LeaveApply();
    application.id = this.applicationControl.id;
    application.empCode = this.applicantControl.empCode;
    application.lsDate = this.dateFormat.ngbDateToDate(this.applicationControl.lsDateNgb).toLocaleDateString();
    application.leDate = this.dateFormat.ngbDateToDate(this.applicationControl.leDateNgb).toLocaleDateString();
    application.laDate = this.dateFormat.ngbDateToDate(this.applicationControl.laDateNgb).toLocaleDateString();
    application.applyTo = this.applyToControl.empCode;
    application.recommendTo = this.recommendToControl.empCode;
    application.accepteDuration = this.applicationControl.accepteDuration;
    application.referanceEmpcode = this.performByControl.empCode;
    application.lTypedID = this.applicationControl.lTypedID;
    application.reason = this.applicationControl.reason;
    application.appType = this.applicationControl.appType;
    application.emgContructNo = this.applicationControl.emgContructNo;
    application.emgAddress = this.applicationControl.emgAddress;
    application.companyID = this.applicationControl.companyID;
    application.withpay = this.applicationControl.withpay;
    // application.grandtype = "2"
    if(application.recommendTo == undefined || application.recommendTo == "null" ){
      application.grandtype = "2"
      
    }else{
      application.grandtype = "0"
    }

    this.leaveService.apply(application).subscribe((response: ApiResponse) => {
      if (response.status) {
        this.toaster.success(response.result, "Applied!")
        this.getAllLeaveStatus(application.empCode)
        this.isSubmitted = false;
        this.reset();
      } else {
        this.toaster.error(response.result, 'Failed!')
      }
    })
  }
}
  getLeaveStatus(empCode, companyId) {
    this.leaveService.getLeaveStatusInfo(empCode, companyId)
      .subscribe((response: ApiResponse) => {
        if (response.status) {
          this.appliedLeaveStatus = response.result as LeaveStatusInfoModel[];
        }
        else {
          this.appliedLeaveStatus = [];
        }
      })
  }
  get getStatusInfoControl() {
    return this.leaveApplyForm.controls['leaveStatusInfo'].value;
  }
  get applicantControl() {
    return this.leaveApplyForm.controls['applicant'].value;
  }
  get applicationControl() {
    return this.leaveApplyForm.controls['application'].value;
  }
  get applyToControl() {
    return this.leaveApplyForm.controls['applyTo'].value;
  }

  get recommendToControl() {
    return this.leaveApplyForm.controls['recommendTo'].value;
  }
  get performByControl() {
    return this.leaveApplyForm.controls['performBy'].value;
  }
  createForm() {
    this.leaveApplyForm = this.formBuilder.group({
      applicant: this.formBuilder.group({
        empCode: [this.empCode, [Validators.required]],
        empName: [, []],
        department: [, []],
        designation: [, []]
      }),
      application: this.formBuilder.group({
        id: [, []],
        empName: [, []],
        department:[,[]],
        designation:[,[]],
        lsDateNgb: [, [Validators.required]],
        leDateNgb: [, [Validators.required]],
        laDateNgb: [this.dateFormat.getCurrentNgbDate(), []],
        accepteDuration: [, []],
        lTypedID: [, [Validators.required]],
        unAccepteDuration: [, []],
        withpay: ['1', []],
        grandtype: [0, []],
        appType: [0, []],
        yyyymmdd: [, []],
        aprovedate: [, []],
        companyID: [this.compId, []],
        haEmpcode: [this.userId, []],
        haApprove: [, []],
        reason: [, []],
        authorityEmpcode: [, []],
        authorityApprove: [, []],
        emgContructNo: [, []],
        emgAddress: [, []],
        hrApproveID: [, []],
        userName: [, []],
      }),
      applyTo: this.formBuilder.group({
        empCode: [, [Validators.required]],
        empName: [, []],
        department:[,[]],
        designation: [, []]
      }),

      recommendTo: this.formBuilder.group({
        empCode: [,[]],
        empName: [, []],
        department:[,[]],
        designation: [, []]
      }),
      performBy: this.formBuilder.group({
        empCode: [, []],
        empName: [, []],
        department:[,[]],
        designation: [, []]
      }),
      leaveStatusInfo: this.formBuilder.group({
        empName: [, []],
        department:[,[]],
        designation: [, []],
        id: [, []],
        type: [, []],
        reqFrom: [, []],
        reqTo: [, []],
        accepteDuration: [, []],
        remarks: [, []],
        status: [, []],
        typeName: [, []],
        companyID: [, []]
      })
    })
  }
  viewDetails(modal){
 this.modalService.open(modal);
  }
  close(){
    this.modalService.dismissAll();
  }
  reset() {
    this.leaveApplyForm.controls['application'].reset();
    this.leaveApplyForm.controls['application'].patchValue({
      companyID: this.compId,
      appType:0,
      withpay:1,
      laDateNgb: this.dateFormat.getCurrentNgbDate()
    });
    this.leaveApplyForm.controls['applyTo'].reset();
    this.leaveApplyForm.controls['performBy'].reset();
    this.isExistBalance= true;
    this.hasPendingApplication= false;
  }

}
