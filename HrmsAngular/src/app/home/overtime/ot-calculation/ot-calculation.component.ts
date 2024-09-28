import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray, FormControl } from '@angular/forms';
import { Helper } from '../../../shared/helper';
import { OvertimeService } from '../../../services/overtime/overtime.service';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../../../services/auth.service';
import { ApiResponse } from '../../../models/response.model';

@Component({
  selector: 'app-ot-calculation',
  templateUrl: './ot-calculation.component.html',
  styleUrls: ['./ot-calculation.component.scss',
  '../../../../vendor/libs/ng-select/ng-select.scss',
  '../../../../vendor/libs/angular2-ladda/angular2-ladda.scss'
]
})
export class OtCalculationComponent implements OnInit {

  otCalculationForm:FormGroup;
  processListForm:FormArray;
  monthList:any[]=[];
  yearList:any[]=[];
  isSubmitted:boolean=false;
  isProcessing:boolean = false;
  isSaving:boolean=false;

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
    this.processListForm = this.fb.array([]);
  }

  getProcessOt(){
    this.isSubmitted=true;
    this.isProcessing=true;
    this.otCalculationForm.patchValue({
      otMonth: this.formVal.year+this.formVal.month
    })
    if(this.otCalculationForm.invalid){
      this.toaster.error('Invalid Submission');
      this.isProcessing=false;
      return;
    }
    this.otService.otCalculate(AuthService.getLoggedCompanyId(), this.formVal.departmentID,this.formVal.locationID,this.formVal.otMonth)
    .subscribe((response:ApiResponse)=>{
      if(response.status){
        this.isProcessing = false;
        this.processListForm = this.fb.array([]);
        (response.result as any[]).forEach(ot=>{
          this.processListForm.push(new FormGroup({
            id:new FormControl(ot.id,[]),
            empCode: new FormControl(ot.empCode,[]),
            empName: new FormControl(ot.empName,[]),
            designation: new FormControl(ot.designation,[]),
            otMonth: new FormControl(ot.otMonth,[]),
            totalHour:new FormControl(ot.totalHour,[]),
            payAmount:new FormControl(ot.payAmount,[]),
            bankName: new FormControl(ot.bankName,[]),
            accNo: new FormControl(ot.accNo,[]),
            companyID:new FormControl(ot.companyID,[])
          }))
        });
      }else{
        this.reset()
        this.toaster.error('No Employee found for process!');
      }
    },err=>{
      this.isProcessing=false;
      console.log(err)
    })
  }
  onSubmit(){
    this.isSaving=true;
    this.otService.saveProcessedOt(this.processListForm.value).subscribe((response:ApiResponse)=>{
      this.isSaving=false;
      if(response.status){
        this.toaster.success(response.result,'Process Completed!');
      }else{
        this.toaster.error(response.result,'Failed!');
      }
    }),err=>{
      this.isSaving=false;
      console.log(err)
    }
  }

  createForm(){
    this.otCalculationForm = this.fb.group({
      id:[,[]],
      departmentID:[,[Validators.required]],
      locationID:[,[Validators.required]],
      otMonth:[,[Validators.required]],
      month:[((new Date).getMonth()+1).toString().padStart(2,'0'),[Validators.required]],
      year:[(new Date).getFullYear(),[Validators.required]],
      companyID:[AuthService.getLoggedCompanyId(),[]],
      userID:[AuthService.getLoggedUserId(),[]]
    })
  }

  get formVal(){
    return this.otCalculationForm.value;
  }
  get formControl(){
    return this.otCalculationForm.controls;
  }
  reset(){
    this.isSubmitted = false;
    this.isProcessing = false;
    this.processListForm = this.fb.array([]);
  }
}
