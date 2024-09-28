import { AuthService } from './../../../services/auth.service';
import { GratuityYear } from './../../../models/final-sattlement/gratuity-year.model';
import { Component, OnInit } from '@angular/core';
import { Pagination } from '../../../shared/paginate';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FinalSattlementService } from '../../../services/final-sattlement/final-sattlement.service';
import { ToastrService } from 'ngx-toastr';
import { NgbDateCustomParserFormatter } from '../../../shared/dateformat';
import { ApiResponse } from '../../../models/response.model';

@Component({
  selector: 'app-gratuity-year-setup',
  templateUrl: './gratuity-year-setup.component.html',
  styleUrls: ['./gratuity-year-setup.component.scss']
})
export class GratuityYearSetupComponent extends Pagination implements OnInit {

  constructor(
    private formBuilder:FormBuilder,
    private finalSattlementService:FinalSattlementService,
    private toaster:ToastrService,
    private dateFormat:NgbDateCustomParserFormatter
  ) {
    super();
  }
  title="Gratuity Year Setup";
  gratuityYearSetupForm:FormGroup;
  gratuityYearSetupModel:GratuityYear[]=[];
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
    this.finalSattlementService.getAllGratuityYear(this.companyID,this.gradeValue,this.userTypeID).subscribe((response:ApiResponse)=>{
      console.log(response.result);
      if(response.status){
        this.items=response.result as GratuityYear[];
        this.gratuityYearSetupModel=response.result as GratuityYear[];
        this.update();
      }
    })
  }
  getByID(id:number){
    this.finalSattlementService.getGratuityYearByID(id).subscribe((response:ApiResponse)=>{
      console.log(response.result);
      if(response.status){
        let noticeAmount=response.result as GratuityYear;
          this.gratuityYearSetupForm.patchValue(response.result);
          this.gratuityYearSetupForm.patchValue({
            sDateNgb: this.dateFormat.stringToNgbDate(noticeAmount.sDate)
          })
          this.btnStatus='Update'
      }
    })
  }
  save(){
    let gratuityyear=new GratuityYear();
    gratuityyear=this.gratuityYearSetupForm.value;
    console.log(this.gratuityYearSetupForm.value);
  this.finalSattlementService.saveGratuityYear(gratuityyear).subscribe((response:ApiResponse)=>{
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
    let gratuityyear=new GratuityYear();
    gratuityyear=this.gratuityYearSetupForm.value;
    console.log(this.gratuityYearSetupForm);
  this.finalSattlementService.saveGratuityYear(gratuityyear).subscribe((response:ApiResponse)=>{
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
    if(this.gratuityYearSetupForm.invalid){
      this.toaster.error("Fill all required field, * marked field are required!", 'Invalid Submission');
      return;
    }
    if(this.btnStatus=='Save')
    this.save();
    else
    this.NoticeUpdate();
  }
  createForm(){
  this.gratuityYearSetupForm=this.formBuilder.group({
    id :[0,[]],
    grade :[,[Validators.required]],
    gYear :[,[Validators.required]],
    sDate :[,[]],
    sDateNgb:[,[]],
    note :[null,[Validators.required]],
    companyID :[this.companyID,[]]
  })
  }

  get f(){
    return this.gratuityYearSetupForm.controls;
  }
  reset(){
    this.isSubmitted=false;
    this.gratuityYearSetupForm.reset();
    this.createForm();
    this.btnStatus='Save';
  }

}
