import { AuthService } from './../../../services/auth.service';
import { NgbDateCustomParserFormatter } from './../../../shared/dateformat';
import { NoticeDaySetup } from './../../../models/final-sattlement/notice-day-setup.model';
import { ApiResponse } from './../../../models/response.model';
import { FinalSattlementService } from './../../../services/final-sattlement/final-sattlement.service';
import { FormBuilder, FormGroup ,Validators} from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Pagination } from '../../../shared/paginate';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-notice-day-setup',
  templateUrl: './notice-day-setup.component.html',
  styleUrls: ['./notice-day-setup.component.scss']
})
export class NoticeDaySetupComponent extends Pagination implements OnInit {

  constructor(
    private formBuilder:FormBuilder,
    private finalSattlementService:FinalSattlementService,
    private toaster:ToastrService,
    private dateFormat:NgbDateCustomParserFormatter
  ) {
    super();
  }
  title="Notice Day Setup";
 noticeDaySetupForm:FormGroup;
 noticedaysetupModel:NoticeDaySetup[]=[];
 companyID:number;
 gradeValue:number;
 userTypeID:number;
 btnStatus='Save'
 isSubmitted=false;

  ngOnInit() {
    this.items=[];
    this.update();
    this.companyID=AuthService.getLoggedCompanyId();
    this.userTypeID=AuthService.getLoggedUserTypeId();
    this.gradeValue=AuthService.getLoggedGradeValue();
    this.createForm();
    this.getAll();
    this.searchKeys=['gradeName']
    this.btnStatus='Save';
  }



getAll(){
  this.finalSattlementService.getAllNoticeDays(this.companyID,this.gradeValue,this.userTypeID).subscribe((response:ApiResponse)=>{
    console.log(response.result);
    if(response.status){
      this.items=response.result as NoticeDaySetup[];
      this.noticedaysetupModel=response.result as NoticeDaySetup[];
      this.update();
    }
  })
}
getByID(id:number){
  this.finalSattlementService.getNoticedayByID(id).subscribe((response:ApiResponse)=>{
    console.log(response.result);
    if(response.status){
      let noticeday=response.result as NoticeDaySetup;
        this.noticeDaySetupForm.patchValue(response.result);
        this.noticeDaySetupForm.patchValue({
          sDateNgb: this.dateFormat.stringToNgbDate(noticeday.sDate)
        })
        this.btnStatus='Update'
    }
  })
}
save(){
  let noticeday=new NoticeDaySetup();
  noticeday=this.noticeDaySetupForm.value;
  //if(noticeday){return;}
this.finalSattlementService.saveUpdateNoticeday(noticeday).subscribe((response:ApiResponse)=>{
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
  let noticeday=new NoticeDaySetup();
  noticeday=this.noticeDaySetupForm.value;
  console.log(this.noticeDaySetupForm);
this.finalSattlementService.saveUpdateNoticeday(noticeday).subscribe((response:ApiResponse)=>{
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
  if(this.noticeDaySetupForm.invalid){
    this.toaster.error("Fill all required field, * marked field are required!", 'Invalid Submission');
    return;
  } else{
    if(this.btnStatus=='Save')
    this.save();
    else
    this.NoticeUpdate();
  }

}
createForm(){
this.noticeDaySetupForm=this.formBuilder.group({
  id   :[0,[]],
  grade  :[,[Validators.required]],
  empDay  :[,[Validators.required]],
  day  :[,[Validators.required]],
  sDate  :[,[]],
  note  :[null,[Validators.required]],
  companyID  :[this.companyID,[]],
  gradeName:[,[]],
  sDateNgb:[,[]]
})
}

get f(){
  return this.noticeDaySetupForm.controls;
}
reset(){
  this.isSubmitted=false;
  this.noticeDaySetupForm.reset();
  this.createForm();
  this.btnStatus='Save';
}
}
