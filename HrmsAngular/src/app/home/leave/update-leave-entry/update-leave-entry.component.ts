
import { Employment } from './../../../models/hr/employment.model';
import { LeaveApply } from './../../../models/leave/leave-apply.model';
import { NgbDateCustomParserFormatter } from './../../../shared/dateformat';
import { LeaveType } from './../../../models/leave/leave-type.model';
import { ApiResponse } from './../../../models/response.model';
import { LeaveStatus } from './../../../models/leave/leave-status.model';
import { EmploymentService } from './../../../services/hr/employment.service';
import { LeaveService } from './../../../services/leave.service';
import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { SearchEmployee } from '../../../models/hr/search-emp.model';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { catchError } from 'rxjs/operators';
import { SystemSetupService } from '../../../services/system-setup/system-setup.service';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-update-leave-entry',
  templateUrl: './update-leave-entry.component.html',
  styleUrls: ['./update-leave-entry.component.scss', '../../../../vendor/libs/ng-select/ng-select.scss']
})
export class UpdateLeaveEntryComponent implements OnInit {

  private _compId:number;
  _leaveTypes:LeaveType[]=[];

  _applicationFormList:FormArray;
  _filterForm:FormGroup;

  constructor(
    private fb:FormBuilder,
    private leaveService:LeaveService,
    private toaster:ToastrService,
    private empService:EmploymentService,
    private dateFormat:NgbDateCustomParserFormatter,
    private holydayService:SystemSetupService,
    private modalService:NgbModal
  ) {
    this._applicationFormList =this.fb.array([]);
  }

  ngOnInit() {
    this._compId=AuthService.getLoggedCompanyId();
    this.createFilterForm();

  }

  getLeaveType(gradeId:number, gender:number){
    this.leaveService.getLeaveType(gradeId, gender).subscribe((response:ApiResponse)=>{
      if(response.status){
        this._leaveTypes = response.result as LeaveType[];
      }
    })
  }

  onSearchBtnClick(searchModal:any){
    this.modalService.open(searchModal);
  }
  getEmployee(empCode:string){
    if(empCode==""){return;}
    this.empService.getEmployment(empCode, this._compId).subscribe((response:ApiResponse)=>{
      if(response.status){
        let emp = response.result as Employment;
        this.getLeaveType(emp.empGradeID, emp.gender )
        this._filterForm.patchValue({
          empCode: empCode,
          empGrade: emp.gradeValue,
          empName:emp.empName,
          designation: emp.designation
        })
      }else{
        this._filterForm.patchValue({
          empName:null,
          designation: null
        })
      }
    })
  }

  getApplication(){
    if(this._filterForm.invalid){
      this.toaster.error('Fill all required field, * mark fields are required!', 'Invalid Submission!');
      return;
    }
    let startDate = this.dateFormat.ngbDateToDate(this._filterForm.value.fromDateNgb);
    let endDate = this.dateFormat.ngbDateToDate(this._filterForm.value.toDateNgb);
    let empCode = this._filterForm.value.empCode;
    let gradeValue = this._filterForm.value.empGrade;

    this.leaveService.getLeaveApplication(this._compId,gradeValue, empCode, startDate, endDate)
    .subscribe((response:ApiResponse)=>{
      if(response.status){
        let la = response.result as LeaveApply[];
        this._applicationFormList = this.fb.array([]);
        la.forEach(item=>{
          this._applicationFormList.push(this.fb.group({
            id:[item.id,[]],
            empCode: [item.empCode,[]],
            empName: [item.empName,[]],
            designation:[item.designation,[]],
            department:[item.department, []],
            lTypedID:[item.lTypedID, []],
            laDateNgb:[this.dateFormat.stringToNgbDate(item.laDate.toString()), []],
            lsDateNgb:[this.dateFormat.stringToNgbDate(item.lsDate.toString()), []],
            leDateNgb:[this.dateFormat.stringToNgbDate(item.leDate.toString()), []],
            withpay:[item.withpay,[]],
            accepteDuration:[item.accepteDuration,[]],
            companyID:[item.companyID, []]
          }))
        })
      }
    })
  }
  getDuration(rowIndex:number){
    if (this._applicationFormList.value[rowIndex].lsDateNgb == null || this._applicationFormList.value[rowIndex].leDateNgb == null) {
      return;
    }
    let fromDate = this.dateFormat.getNgbDateToYyyymmdd(this._applicationFormList.value[rowIndex].lsDateNgb);
    let toDate = this.dateFormat.getNgbDateToYyyymmdd(this._applicationFormList.value[rowIndex].leDateNgb);
    let duration = this.dateFormat.getDateDiff(this._applicationFormList.value[rowIndex].lsDateNgb, this._applicationFormList.value[rowIndex].leDateNgb);

    this.holydayService.getNumOfHolyday(fromDate, toDate, this._filterForm.value.empGrade).subscribe((response: ApiResponse) => {
      if (response.status) {
        this._applicationFormList.controls[rowIndex].patchValue({
          accepteDuration: duration-response.result
        });
      }
    })
  }
  onChangeEmpInRow(rowIndex:number, empCode:string){
    let prevRow = this._applicationFormList.value[rowIndex];
    if(empCode=="" || this._applicationFormList.value[rowIndex]){
      this._applicationFormList.controls[rowIndex].patchValue(prevRow);
      return;
    }
    this.empService.getEmployment(prevRow.empCode, this._compId).subscribe((response:ApiResponse)=>{
      if(response.status){
        let emp = response.result as SearchEmployee;
        this._applicationFormList.controls[rowIndex].patchValue({
          empCode: emp.empCode,
          empName: emp.empName,
          department: emp.department,
          designation: emp.designation,
          laDateNgb : this.dateFormat.getCurrentNgbDate(),
          lsDateNgb : this.dateFormat.getCurrentNgbDate(),
          leDateNgb : this.dateFormat.getCurrentNgbDate()
        })
      }else{
        this._applicationFormList.controls[rowIndex].patchValue(prevRow);
      }
    })
  }
  onUpdateBtnClick(){
    let applications:LeaveApply[] = [];

    this._applicationFormList.controls.forEach(la=>{
      let leaveApply = la.value as LeaveApply;
      leaveApply.laDate = this.dateFormat.ngbDateToDate(la.value.laDateNgb).toLocaleDateString();
      leaveApply.lsDate = this.dateFormat.ngbDateToDate(la.value.lsDateNgb).toLocaleDateString();
      leaveApply.leDate = this.dateFormat.ngbDateToDate(la.value.leDateNgb).toLocaleDateString();
      if(la.value.withpay){
        leaveApply.withpay = 1;
      }else{
        leaveApply.withpay = 0;
      }
      applications.push(leaveApply);
    })
    this.leaveService.updateLeaveApplication(applications)
      .subscribe((response:ApiResponse)=>{
        if(response.status){
          this.toaster.success(response.result, 'Updated!')
        }else{
          this.toaster.error(response.result, 'Failed!');
        }
      })
  }

  createFilterForm(){
    this._filterForm = this.fb.group({
      companyID:[this._compId,[]],
      empCode:[,[Validators.required]],
      empGrade:[,[]],
      empName:[,[]],
      designation: [,[]],
      fromDateNgb:[,[Validators.required]],
      toDateNgb:[this.dateFormat.getCurrentNgbDate(),[Validators.required]]
    })
  }
  get f() {
    return this._filterForm.value;
  }


}
