import { AuthService } from './../../../services/auth.service';
import { GratuitySetup } from './../../../models/final-sattlement/gratuity-setup.model';
import { Component, OnInit } from '@angular/core';
import { Pagination } from '../../../shared/paginate';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FinalSattlementService } from '../../../services/final-sattlement/final-sattlement.service';
import { ToastrService } from 'ngx-toastr';
import { NgbDateCustomParserFormatter } from '../../../shared/dateformat';
import { ApiResponse } from '../../../models/response.model';

@Component({
  selector: 'app-gratuity-setup',
  templateUrl: './gratuity-setup.component.html',
  styleUrls: ['./gratuity-setup.component.scss']
})
export class GratuitySetupComponent extends Pagination implements OnInit {

  constructor(
    private formBuilder:FormBuilder,
    private finalSattlementService:FinalSattlementService,
    private toaster:ToastrService,
    private dateFormat:NgbDateCustomParserFormatter
  ) {
    super();
  }
  title="Gratuity Setup";
  gratuitySetupForm:FormGroup;
  gratuitySetupModel:GratuitySetup[]=[];
  companyID:number;
  gradeValue:number;
  btnStatus='Save'
  isSubmitted:boolean=false;
  userTypeID:number;
  ngOnInit() {
    this.items=[];
    this.update();
    this.companyID=AuthService.getLoggedCompanyId();
    this.userTypeID=AuthService.getLoggedUserTypeId();
    this.gradeValue=AuthService.getLoggedGradeValue();
    this.createForm();
    this.getAll();
    this.searchKeys=['grade']
    this.btnStatus='Save';
  }

  getAll(){
    this.finalSattlementService.getAllGratuity(this.companyID,this.gradeValue,this.userTypeID).subscribe((response:ApiResponse)=>{
     
      if(response.status){
        this.items=response.result as GratuitySetup[];
        this.gratuitySetupModel=response.result as GratuitySetup[];
        this.update();
      }
    })
  }
  getByID(id:number){
    this.finalSattlementService.getGratuityByID(id).subscribe((response:ApiResponse)=>{
     
      if(response.status){
        let noticeAmount=response.result as GratuitySetup;
          this.gratuitySetupForm.patchValue(response.result);
          this.gratuitySetupForm.patchValue({
            sDateNgb: this.dateFormat.stringToNgbDate(noticeAmount.sDate)
          })
          this.btnStatus='Update'
      }
    })
  }
  save(){
    let gratuity=new GratuitySetup();
    gratuity=this.gratuitySetupForm.value;
  this.finalSattlementService.saveGratuity(gratuity).subscribe((response:ApiResponse)=>{
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
    let gratuity=new GratuitySetup();
    gratuity=this.gratuitySetupForm.value;
  this.finalSattlementService.saveGratuity(gratuity).subscribe((response:ApiResponse)=>{
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
    if(this.gratuitySetupForm.invalid){
      this.toaster.error("Fill all required field, * marked field are required!", 'Invalid Submission');
      return;
    }
    if(this.btnStatus=='Save')
    this.save();
    else
    this.NoticeUpdate();
  }
  createForm(){
  this.gratuitySetupForm=this.formBuilder.group({
    id : [0,[]],
    grade :[,[Validators.required]],
    salaryHead :[,[Validators.required]],
    numberofallowance :[,[Validators.required]],
    note: [,[Validators.required]],
    sDate : [,[]],
    sDateNgb:[,[]],
    companyID : [this.companyID,[]],
    gradeName:[,[]],
    accountName:[,[]]
  })
  }

  get f(){
    return this.gratuitySetupForm.controls;
  }
  reset(){
    this.isSubmitted=false;
    this.gratuitySetupForm.reset();
    this.createForm();
    this.btnStatus='Save';
  }


}
