import { ApiResponse } from './../../../models/response.model';
import { state } from '@angular/animations';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../services/auth.service';
import { ToastrService } from 'ngx-toastr';
import { AttendenceService } from '../../../services/Attendance/attendence.service';
import { SalarySetupService } from '../../../services/SalarySetup/salary-setup.service';
import { NgbDateCustomParserFormatter } from '../../../shared/dateformat';
import { SalaryPeriodModel } from '../../../models/SalarySetup/SalaryPeriod';

@Component({
  selector: 'app-summery',
  templateUrl: './summery.component.html',
  styleUrls: ['./summery.component.scss']
})
export class SummeryComponent implements OnInit {
 attendanceSummery:FormGroup
 compId:number
 gradeVal:number
  constructor(
    private formBuilder: FormBuilder,
    private toaster: ToastrService,
    private dateFrmat:NgbDateCustomParserFormatter,
    private salarySetupService:SalarySetupService,
    private attendanceService:AttendenceService

  ) {
this.compId=AuthService.getLoggedCompanyId();
this.gradeVal=AuthService.getLoggedGradeValue();
  }
  title="Attendance Summery";
  ngOnInit() {
    this.createForm();
  }
  createForm() {
    this.attendanceSummery = this.formBuilder.group({
     strDate:[,[Validators.required]],
     endDate:[,[Validators.required]],
     compId:[this.compId,[]],
     periodId:[,[Validators.required]]
    })
  }
  deleteAttendanceSummery(){
    this.attendanceService.deleteExistingAttendance(this.compId,this.f.periodId.value).subscribe((response:ApiResponse)=>{
      if(response.status){
      }
    })
  }
  getById(id:number){
      this.salarySetupService.getByIdSalaryPeriod(id).subscribe((response:ApiResponse)=>{
        if(response.status){
          let salPeriod=response.result as SalaryPeriodModel;
          console.log(salPeriod);
          this.f.strDate.setValue(salPeriod.sDate);
          this.f.endDate.setValue(salPeriod.eDate);
        }
      })
  }
  processAttendanceSumery(){
    if(this.attendanceSummery.invalid){
      this.toaster.error("Please Select Period & Date");
    }
    else{
    this.deleteAttendanceSummery();
    this.processLateComerData();
    this.attendanceService.processSummeryAttendenceData(
      this.f.strDate.value,
      this.f.endDate.value,
      this.f.periodId.value,
      this.compId)
      .subscribe((response:ApiResponse)=>{
      if(response.status){
        this.toaster.success(response.result);
      }
    })
  }
}
processLateComerData(){
  this.attendanceService.processLateComerData(this.f.strDate.value,this.f.endDate.value,this.gradeVal,this.compId).subscribe((response:ApiResponse)=>{
    if(response.status){

    }else{
      this.toaster.error(response.result);
    }
  })
}
  get f(){
    return this.attendanceSummery.controls;
  }

}
