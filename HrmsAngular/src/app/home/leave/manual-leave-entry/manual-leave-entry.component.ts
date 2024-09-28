import { AuthService } from './../../../services/auth.service';

import { EmploymentService } from './../../../services/hr/employment.service';

import { ApiResponse } from './../../../models/response.model';
import { LeaveService } from './../../../services/leave.service';
import { LeaveApply } from './../../../models/leave/leave-apply.model';
import { LeaveType } from './../../../models/leave/leave-type.model';
import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { NgbDateCustomParserFormatter } from '../../../shared/dateformat';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { SearchEmployee } from '../../../models/hr/search-emp.model';
import { Employment } from '../../../models/hr/employment.model';
import { ToastrService } from 'ngx-toastr';
import { SystemSetupService } from '../../../services/system-setup/system-setup.service';
import { LeaveStatus } from '../../../models/leave/leave-status.model';

@Component({
  selector: 'app-manual-leave-entry',
  templateUrl: './manual-leave-entry.component.html',
  styleUrls: ['./manual-leave-entry.component.scss', '../../../../vendor/libs/ng-select/ng-select.scss']
})
export class ManualLeaveEntryComponent implements OnInit {

  _userId: number;
  _compId: number;
  _grade: number;
  _applicantGrade = -1;
  isAddBtnClick:boolean = false;
  _btnStatus:any = 'Add';
  _index:number;

  _leaveApplicationForm: FormGroup;
  _leaveApplicationList: LeaveApply[] = [];
  _leaveTypes: LeaveType[] = [];
  leaveInfo: LeaveApply[] = [];
  leaveStatus: LeaveStatus[] = [];
  leaveTypes: LeaveType[] = [];
  hasPendingApplication: boolean= false;
  isExistBalance: boolean = true;

  constructor(
    private fb: FormBuilder,
    private dateFormat: NgbDateCustomParserFormatter,
    private leaveService: LeaveService,
    private holydayService: SystemSetupService,
    private empService: EmploymentService,
    private modalService: NgbModal,
    private toaster:ToastrService
  ) { }

  ngOnInit() {
    this._userId =AuthService.getLoggedUserId();
    this._compId = AuthService.getLoggedCompanyId();
    this._grade = AuthService.getLoggedGradeValue();
    this.createApplicationForm();
    this.getLeaveTypes(this._grade, 0);
  }
  onSearchClick(searchModal: any) {
    this.modalService.open(searchModal)
  }
  getEmployee(empCode: string) {
    if (empCode == "")
    {return }
    this.empService.getEmployment(empCode, this._compId).subscribe((response: ApiResponse) => {
      if (response.status) {
        let applicant = response.result as Employment;
        this.getLeaveTypes(applicant.empGradeID, applicant.gender)
        this._leaveApplicationForm.patchValue({
          empCode: applicant.empCode,
          empName: applicant.empName,
          department: applicant.department,
          designation: applicant.designation
        })
      } else {
        this._leaveApplicationForm.patchValue({
          empName: null,
          department: null,
          designation: null
        })
      }
    })
  }

  getLeaveTypes(grade: number, gender: number) {
    this.leaveService.getLeaveType(grade, gender).subscribe((response: ApiResponse) => {
      if (response.status) {
        this._leaveTypes = response.result as LeaveType[];
      }
      else{
        return;
      }
    })
  }
  getDuration() {
    if (this.f.lsDateNgb == null || this.f.leDateNgb == null) {
      return;
    }
    let fromDate = this.dateFormat.getNgbDateToYyyymmdd(this.f.lsDateNgb);
    let toDate = this.dateFormat.getNgbDateToYyyymmdd(this.f.leDateNgb);
    let duration = this.dateFormat.getDateDiff(this.f.lsDateNgb, this.f.leDateNgb);
    this.holydayService.getNumOfHolyday(fromDate, toDate, this._applicantGrade).subscribe((response: ApiResponse) => {
      if (response.status) {
        this._leaveApplicationForm.patchValue({
          accepteDuration: duration
          -response.result
        });
      }
      this.checkExistBalance();
    })
  }
  addApplication(){
    this.isAddBtnClick = true;
    if(this._leaveApplicationForm.invalid){
      this.toaster.error('Fill all required(*) field!','Invalid Submission');
      return;
    }
    else if(this.isExistBalance==false && this._leaveApplicationForm.controls.withpay.value==1){
    this.toaster.warning("No blence !!");
    return;
    }
    else if(this.hasPendingApplication==true){
     this.toaster.warning("Already Painding Application !!");
     return;
    }
    else{
    let application = new LeaveApply();
    application.empCode = this.f.empCode;
    application.empName = this.f.empName;
    application.designation = this.f.designation;
    application.emgContructNo = this.f.emgContructNo;
    application.emgAddress = this.f.emgAddress;
    application.lTypedID = this.f.lTypedID;
    application.leaveTypeName = this._leaveTypes.find(c=>c.id==this.f.lTypedID).typeName;
    application.laDate = this.dateFormat.ngbDateToDate(this.f.laDateNgb).toLocaleDateString();
    application.lsDate = this.dateFormat.ngbDateToDate(this.f.lsDateNgb).toLocaleDateString();
    application.leDate = this.dateFormat.ngbDateToDate(this.f.leDateNgb).toLocaleDateString();
    application.companyID=this._compId;
    application.reason = this.f.reason;
    application.withpay = this.f.withpay;
    application.accepteDuration = this.f.accepteDuration;
    application.grandtype=this.f.grandtype;
    application.appType=this.f.appType;
    application.haEmpcode=this.f.haEmpcode;
    application.haApprove=this.f.haApprove;
    application.authorityEmpcode=this.f.authorityEmpcode;
    application.authorityApprove=this.f.authorityApprove;
    application.hrApproveID=this.f.hrApproveID;
    let available=this._leaveApplicationList.find(c=>c.empCode==application.empCode && c.lTypedID==application.lTypedID && (c.lsDate==application.lsDate && c.leDate==application.leDate))
    if(available==null){
    this._leaveApplicationList.push(application);
    this.reset();
    this.isAddBtnClick = false;
    }
    else{
      this.toaster.warning("Already Exist");
    }
  }
}
  checkExistBalance() {
    let appliedDays = this._leaveApplicationForm.controls.accepteDuration.value;
    let appliedLeaveType = this.leaveStatus.find(c => c.typeee == this._leaveApplicationForm.controls.lTypedID.value);
    if (this._leaveApplicationForm.controls.empCode.value == null || appliedLeaveType == null)
    { this.isExistBalance = true;
      return; }
    this.isExistBalance = appliedLeaveType.balance>=appliedDays;
  }
  getAllLeaveStatus(empCode: any){
    if(empCode==""){
      return
    }
    this.empService.getEmployment(empCode, this._compId).subscribe((response: ApiResponse) => {
      if (response.status) {
        let applicant = response.result as Employment;
        this.getLeaveType(parseInt(applicant.gradeValue), applicant.gender);

    this.leaveService.getLeaveStatus(this._compId, empCode, new Date().getFullYear())
          .subscribe((response: ApiResponse) => {
            if (response.status) {
              this.leaveStatus = response.result as LeaveStatus[];
            } else {
              this.leaveStatus = [];
            }
          })
    this.leaveService.getLeaveInfo(this._compId, empCode).subscribe((response: ApiResponse) => {
      if (response.status) {
        this.leaveInfo = response.result as LeaveApply[];
      } else {
        this.leaveInfo = [];
      }
    })
  }
})
  }
  getLeaveType(grade: number, gender: number) {
    this.leaveService.getLeaveType(grade, gender).subscribe((response: ApiResponse) => {
      if (response.status) {
        this.leaveTypes = response.result as LeaveType[];
      }
    })
  }
  checkPendingApplication(){
    let pendingApplication = this.leaveInfo.filter(c => c.lTypedID == this._leaveApplicationForm.controls.lTypedID.value && c.appType!='1');
    console.log(pendingApplication)
    this.hasPendingApplication = pendingApplication.length>0;
  }
  editApplication(index:number){
    let application = this._leaveApplicationList[index];
    this._leaveApplicationForm.patchValue(application);
    this._leaveApplicationForm.patchValue({
      laDateNgb : this.dateFormat.stringToNgbDate(application.laDate.toString()),
      lsDateNgb : this.dateFormat.stringToNgbDate(application.lsDate.toString()),
      leDateNgb : this.dateFormat.stringToNgbDate(application.leDate.toString())
    })
    this._btnStatus = 'Modify';
    this._index = index;
  }
  modifyApplication(){
    this._leaveApplicationList[this._index].empCode = this.f.empCode;
    this._leaveApplicationList[this._index].empName = this.f.empName;
    this._leaveApplicationList[this._index].designation = this.f.designation;
    this._leaveApplicationList[this._index].emgContructNo = this.f.emgContructNo;
    this._leaveApplicationList[this._index].emgAddress = this.f.emgAddress;
    this._leaveApplicationList[this._index].leaveTypeName = this._leaveTypes.find(c=>c.id==this.f.lTypedID).typeName;
    this._leaveApplicationList[this._index].laDate = this.dateFormat.ngbDateToDate(this.f.laDateNgb);
    this._leaveApplicationList[this._index].lsDate = this.dateFormat.ngbDateToDate(this.f.lsDateNgb);
    this._leaveApplicationList[this._index].leDate = this.dateFormat.ngbDateToDate(this.f.leDateNgb);
    this._leaveApplicationList[this._index].companyID = this._compId;
    this._leaveApplicationList[this._index].reason = this.f.reason;
    this._leaveApplicationList[this._index].withpay = this.f.withpay;
    this._leaveApplicationList[this._index].accepteDuration = this.f.accepteDuration;

    this.reset();
  }
  removeApplication(index:number){
    this._leaveApplicationList.splice(index, 1);
    this._btnStatus='Add';
  }
  apply(){
    if(this._leaveApplicationList.length==0){
      this.toaster.error('No Application found', 'Not Applied!');
      return;
    }
    this.leaveService.manualApply(this._leaveApplicationList).subscribe((response:ApiResponse)=>{
      if(response.status){
        this.toaster.success(response.result, 'Success!');
        this._leaveApplicationList = [];
      }else{
        this.toaster.error(response.result, 'Failed!');
      }
    })
  }

  get f() {
    return this._leaveApplicationForm.value;
  }
  get formControl(){
    return this._leaveApplicationForm.controls;
  }
  createApplicationForm() {
    this._leaveApplicationForm = this.fb.group({
      id: new FormControl(null, []),
      empCode: new FormControl(null, [Validators.required]),
      empName: new FormControl(null, []),
      department: new FormControl(null, []),
      designation: new FormControl(null, []),
      lsDateNgb: new FormControl([Validators.required]),
      leDateNgb: new FormControl(null, [Validators.required]),
      laDateNgb: new FormControl(this.dateFormat.getCurrentNgbDate(), []),
      accepteDuration: new FormControl(null, []),
      lTypedID: new FormControl(null, [Validators.required]),
      unAccepteDuration: new FormControl(null, []),
      referanceEmpcode: new FormControl(null, []),
      withpay: new FormControl('1', []),
      grandtype: new FormControl(1, []),
      appType: new FormControl(0, []),
      yyyymmdd: new FormControl(null, []),
      aprovedate: new FormControl(null, []),
      companyID: new FormControl(null, []),
      applyTo: new FormControl(null, []),
      haEmpcode: new FormControl(0, []),
      haApprove: new FormControl(0, []),
      reason: new FormControl(null, []),
      authorityEmpcode: new FormControl(0, []),
      authorityApprove: new FormControl(0, []),
      emgContructNo: new FormControl(null, []),
      emgAddress: new FormControl(null, []),
      hrApproveID: new FormControl(0, []),
      userName: new FormControl(null, []),
    })
  }
  reset(){
    this.createApplicationForm();
    this._btnStatus = 'Add'
  }


}
