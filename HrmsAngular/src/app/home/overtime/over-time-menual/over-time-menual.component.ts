import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray, FormControl } from '@angular/forms';
import { OvertimeService } from '../../../services/overtime/overtime.service';
import { NgbDateCustomParserFormatter } from '../../../shared/dateformat';
import { ToastrService } from 'ngx-toastr';
import { ApiResponse } from '../../../models/response.model';
import { Helper } from '../../../shared/helper';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-over-time-menual',
  templateUrl: './over-time-menual.component.html',
  styleUrls: ['./over-time-menual.component.scss','../../../../vendor/libs/ng-select/ng-select.scss']
})
export class OverTimeMenualComponent implements OnInit {

  manualEntryForm:FormGroup;
  allManualOt:any[]=[];
  totalHour:number=0;
  monthList:any[]=[];
  yearList:any[]=[];
  isSubmitted:boolean=false;

  constructor(
    private fb:FormBuilder,
    private otService:OvertimeService,
    private toaster:ToastrService
  ){
  }

  ngOnInit() {
    this.monthList=Helper.getMonthList();
    this.yearList = Helper.getYearList();
    this.createForm();
    this.getManualOt();
  }
  onSelectEmp(employee){
    this.manualEntryForm.patchValue({
      empCode:employee.empCode,
      empName:employee.empName,
      department:employee.department
    })
    this.getManualOt();
  }

  getManualOt(){
    this.otService.getManualOt(this.formVal.companyID, this.formVal.empCode, this.formVal.year+this.formVal.month)
    .subscribe((response:ApiResponse)=>{
      if(response.status){
        this.allManualOt = (response.result as any[]).map(obj=>{
          let y = parseInt((obj.otMonth as string).substr(0,4));
          let m = parseInt((obj.otMonth as string).substr(4,2))-1;
          return {
            otDate: new Date(y,m),
            ...obj
          }
        });
        this.totalHour=0;
        this.allManualOt.forEach(obj=>{this.totalHour+=obj.otHours});
      }else{
        this.allManualOt = [];
      }
    })
  }

  onSubmit(){
    this.isSubmitted==true;
    let monthYear = this.formVal.year+this.formVal.month;
    this.manualEntryForm.patchValue({otMonth: monthYear})
    if(this.manualEntryForm.invalid){
      this.toaster.error('Invalid Submisstion');
      return;
    }
    this.otService.manulaOtEntry(this.formVal)
    .subscribe((response:ApiResponse)=>{
      this.isSubmitted=false;
      if(response.status){
        this.getManualOt()
        this.toaster.success(response.result,'Saved!');
      }else{
        this.toaster.error(response.result,'Failed!');
      }
    },err=>{
      this.isSubmitted=false;
      throw new Error(err);
    })
  }

  createForm(){
    this.manualEntryForm = this.fb.group({
      id:[,[]],
      empCode:[,[Validators.required]],
      empName:[,[]],
      department:[,[]],
      otMonth:[,[Validators.required]],
      month:[((new Date).getMonth()+1).toString().padStart(2,'0'),[Validators.required]],
      year:[(new Date).getFullYear(),[Validators.required]],
      otHours:[,[Validators.required]],
      companyID:[AuthService.getLoggedCompanyId(),[]],
      addedDate:[,[]],
      userID:[AuthService.getLoggedUserId(),[]]
    })
  }

  get formVal(){
    return this.manualEntryForm.value;
  }
  get formControl(){
    return this.manualEntryForm.controls;
  }
  
}
