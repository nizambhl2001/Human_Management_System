import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { OvertimeService } from '../../../services/overtime/overtime.service';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../../../services/auth.service';
import { ApiResponse } from '../../../models/response.model';

@Component({
  selector: 'app-ot-replacement',
  templateUrl: './ot-replacement.component.html',
  styleUrls: ['./ot-replacement.component.scss']
})
export class OtReplacementComponent implements OnInit {

  applicationForm: FormGroup;
  allReplacedApprovedOt:any[]=[];
  totalOtHour:number = 0;
  totalReplaced:number = 0;
  currentOtBalance:number=0;

  constructor(
    private fb: FormBuilder,
    private otService: OvertimeService,
    private toaster: ToastrService
  ) { }
  ngOnInit() {
    this.createForm();
  }
  onSelectEmp(employee) {
    this.applicationForm.patchValue({
      empCode: employee.empCode,
      empName: employee.empName,
      department: employee.department,
      designation: employee.designation
    })
    this.getReplacedApprovedOt();
  }
  getReplacedApprovedOt(){
    if(this.formVal.empCode==null){
      return this.toaster.error('Select Employee Code', 'Invalid Submission!');
    }
    this.otService.getReplacedApptovedOt(AuthService.getLoggedCompanyId(), this.formVal.empCode,'-1')
    .subscribe((response:ApiResponse)=>{
      if(response.status){
        this.totalOtHour =0;
        this.totalReplaced =0;
        this.currentOtBalance=0;
        this.allReplacedApprovedOt = (response.result as any[]).map(obj=>{
          this.totalOtHour += obj.otHours;
          this.totalReplaced += obj.replacedHours;
          this.currentOtBalance += obj.otBalance;
          return obj;
        });
      }else{
        this.allReplacedApprovedOt = [];
      }
    })
  }
  apply(){
    if(this.applicationForm.invalid){
      return this.toaster.error('Invalid Submission');
    }
    this.otService.applyOtReplace(this.formVal)
    .subscribe((response:ApiResponse)=>{
      if(response.status){
        this.getReplacedApprovedOt();
        return this.toaster.success(response.result,'Applied!');
      }else{
        return this.toaster.error(response.result,'Failed');
      }
    })
  }
  createForm() {
    this.applicationForm = this.fb.group({
      id: [, []],
      otRequisitionDetailsID: [, []],
      empCode: [, [Validators.required]],
      empName: [, []],
      department: [, []],
      designation: [, []],
      replacedHours: [, [Validators.required]],
      replacedDate: [, [Validators.required]],
      applyDate: [, [Validators.required]],
      otDate: [, [Validators.required]],
      companyID: [AuthService.getLoggedCompanyId(), []]
    })
  }

  get formVal() {
    return this.applicationForm.value;
  }
  get formControl() {
    return this.applicationForm.controls;
  }

}
