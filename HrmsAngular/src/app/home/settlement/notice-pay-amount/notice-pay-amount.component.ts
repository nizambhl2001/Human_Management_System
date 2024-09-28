import { AuthService } from './../../../services/auth.service';
import { toDate } from '@angular/common/src/i18n/format_date';
import { NoticeAmount } from './../../../models/final-sattlement/notice-amount.model';
import { Component, OnInit } from '@angular/core';
import { Pagination } from '../../../shared/paginate';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FinalSattlementService } from '../../../services/final-sattlement/final-sattlement.service';
import { ToastrService } from 'ngx-toastr';
import { NgbDateCustomParserFormatter } from '../../../shared/dateformat';
import { ApiResponse } from '../../../models/response.model';

@Component({
  selector: 'app-notice-pay-amount',
  templateUrl: './notice-pay-amount.component.html',
  styleUrls: ['./notice-pay-amount.component.scss']
})
export class NoticePayAmountComponent extends Pagination implements OnInit {

  constructor(
    private formBuilder:FormBuilder,
    private finalSattlementService:FinalSattlementService,
    private toaster:ToastrService,
    private dateFormat:NgbDateCustomParserFormatter
  ) {
    super();
  }
  title="Notice Pay Amount Setup"
  noticeAmountSetupForm:FormGroup;
  noticeAmountSetupModel:NoticeAmount[]=[];
  companyID:number;
  gradeValue:number;
  userTypeID:number;
  btnStatus='Save'
  isSubmitted:boolean=false;
  ngOnInit() {
    this.items=[];
    this.update();
    this.companyID=AuthService.getLoggedCompanyId();
    this.gradeValue=AuthService.getLoggedGradeValue();
    this.userTypeID=AuthService.getLoggedUserTypeId();
    this.createForm();
    this.getAll();
    this.searchKeys=['empGrade']
    this.btnStatus='Save';
  }
  getAll(){
    this.finalSattlementService.getAllNoticeAmount(this.companyID,this.gradeValue,this.userTypeID).subscribe((response:ApiResponse)=>{
     
      if(response.status){
        this.items=response.result as NoticeAmount[];
        this.noticeAmountSetupModel=response.result as NoticeAmount[];
        this.update();
      }
    })
  }
  getByID(id:number){
    this.finalSattlementService.getNoticeAmountByID(id).subscribe((response:ApiResponse)=>{
      
      if(response.status){
        let noticeAmount=response.result as NoticeAmount;
          this.noticeAmountSetupForm.patchValue(response.result);
          this.noticeAmountSetupForm.patchValue({
            eDateNgb: this.dateFormat.stringToNgbDate(noticeAmount.eDate)
          })
          this.btnStatus='Update'
      }
    })
  }
  save(){
    let noticeamount=new NoticeAmount();
    noticeamount=this.noticeAmountSetupForm.value;
   // noticeamount.eDate=this.f.eDateNgb.value;
   
  this.finalSattlementService.saveUpdateNoticeAmount(noticeamount).subscribe((response:ApiResponse)=>{
    if(response){
      this.toaster.success(response.result ,"Success!")
      this.reset();
      this.getAll();
    }else{
      this.toaster.error(response.result ,"Failed!")
    }
  })
  }
  NoticeUpdate(){
    this.btnStatus='Update'
    let noticeamount=new NoticeAmount();
    noticeamount=this.noticeAmountSetupForm.value;
  //noticeamount.eDate=this.f.eDateNgb.value;
   console.log(this.noticeAmountSetupForm);
  this.finalSattlementService.saveUpdateNoticeAmount(noticeamount).subscribe((response:ApiResponse)=>{
    if(response){
      this.toaster.success(response.result ,"Updated!")
      this.reset();
      this.getAll();
    }else{
      this.toaster.error(response.result ,"Failed!")
    }
  })
  }
  onSubmit(){
    this.isSubmitted = true;
    if(this.noticeAmountSetupForm.invalid){
      this.toaster.error("Fill all required field, * marked field are required!", 'Invalid Submission');
      return;
    }
    if(this.btnStatus=='Save')
    this.save();
    else
    this.NoticeUpdate();
  }
  createForm(){
  this.noticeAmountSetupForm=this.formBuilder.group({
    id : [0,[]],
    empGrade :[,[Validators.required]],
    salaryHead :[,[Validators.required]],
    numberoftimes :[,[Validators.required]],
    note: [,[Validators.required]],
    eDate : [,[]],
    eDateNgb:[this.dateFormat.getCurrentNgbDate(),[]],
    companyID : [this.companyID,[]],
    userID : [this.userTypeID,[]],
    gradeName:[,[]],
    accountName:[,[]]
  })
  }

  get f(){
    return this.noticeAmountSetupForm.controls;
  }
  reset(){
    this.isSubmitted=false;
    this.noticeAmountSetupForm.reset();
    this.createForm();
    this.btnStatus='Save';

  }
}
