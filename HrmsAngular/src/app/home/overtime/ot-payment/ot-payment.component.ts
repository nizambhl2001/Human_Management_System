import { Component, OnInit } from '@angular/core';
import { FormGroup, FormArray, FormBuilder, FormControl, Validators } from '@angular/forms';
import { OvertimeService } from '../../../services/overtime/overtime.service';
import { Helper } from '../../../shared/helper';
import { AuthService } from '../../../services/auth.service';
import { ApiResponse } from '../../../models/response.model';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-ot-payment',
  templateUrl: './ot-payment.component.html',
  styleUrls: ['./ot-payment.component.scss',
  '../../../../vendor/libs/ng-select/ng-select.scss',
  '../../../../vendor/libs/angular2-ladda/angular2-ladda.scss'
]
})
export class OtPaymentComponent implements OnInit {

  otPaymentForm:FormGroup;
  processListForm:FormArray;
  monthList:any[]=[];
  yearList:any[]=[];
  isSubmitted:boolean=false;
  isLoading:boolean=false;
  isProcessing:boolean = false;

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
    this.isLoading=true;
    this.otPaymentForm.patchValue({
      otMonth: this.formVal.year+this.formVal.month
    })
    if(this.otPaymentForm.invalid){
      this.toaster.error('Invalid Submission');
      this.isLoading=false;
      return;
    }
    this.otService.otPayment(AuthService.getLoggedCompanyId(), this.formVal.departmentID,this.formVal.locationID,this.formVal.otMonth)
    .subscribe((response:ApiResponse)=>{
      if(response.status){
        this.isLoading = false;
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
        this.toaster.error('No Employee found for payment');
      }
    },err=>{
      this.isLoading=false;
      console.log(err)
    })
  }
  onSubmit(){
    this.isProcessing
    this.otService.saveProcessedOt(this.processListForm.value).subscribe((response:ApiResponse)=>{
      this.isProcessing=false;
      if(response.status){
        this.toaster.success(response.result,'Payment Completed!');
      }else{
        this.toaster.error(response.result,'Failed!');
      }
    }),err=>{
      this.isProcessing=false;
      console.log(err)
    }
  }

  createForm(){
    this.otPaymentForm = this.fb.group({
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
    return this.otPaymentForm.value;
  }
  get formControl(){
    return this.otPaymentForm.controls;
  }
  reset(){
    this.isSubmitted = false;
    this.isLoading = false;
    this.isProcessing = false;
    this.processListForm = this.fb.array([]);
  }

}
