import { AuthService } from './../../../services/auth.service';
import { SalaryYear } from './../../../models/SalarySetup/salary-year';
import { SalarySetupService } from './../../../services/SalarySetup/salary-setup.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiResponse } from './../../../models/response.model';
import { Pagination } from './../../../shared/paginate';
import { Component, OnInit, Input } from '@angular/core';
import { Months } from '../../../models/SalarySetup/salaryPeriodMonth';
import { taxYearModel } from '../../../models/SalarySetup/salaryPeriodTaxYearM';
import {  SalaryPeriodModel } from '../../../models/SalarySetup/SalaryPeriod';
import { ToastrService } from 'ngx-toastr';
import { NgbDateCustomParserFormatter } from '../../../shared/dateformat';

@Component({
  selector: 'app-salary-period',
  templateUrl: './salary-period.component.html',
  styleUrls: ['./salary-period.component.scss','../../../../vendor/libs/ng-select/ng-select.scss']
})
export class SalaryPeriodComponent extends Pagination implements OnInit {
  @Input() yearName:string;
  constructor(

    private formBuilder:FormBuilder,
    private dateFrmat:NgbDateCustomParserFormatter,
    private toaster:ToastrService,
    private salarySetupService:SalarySetupService
  ) {
    super()
  }
month:Months[]=[];
salaryPeriodForm:FormGroup;
taxYeardata:taxYearModel[]=[];
salaryPeriod:SalaryPeriodModel[]=[];
btnStatus='Save';
isSubmitted:boolean = false;
companyID:number;
salaryYear:SalaryYear[]=[];
isSelect:boolean;
isSaveBtnClick=false;


  ngOnInit() {
    this.items=[];
    this.companyID=AuthService.getLoggedCompanyId();
    this.getAllMonth();
    this.createForm();
    this.getAlltaxYear();
    this.AllSalaryYear();
    this.getAll();

    this.searchKeys = ['periodName']
  }
AllSalaryYear(){
  this.salarySetupService.getAllSalaryYear().subscribe((response:ApiResponse)=>{

    if(response.status){
      this.salaryYear = response.result as SalaryYear[];
    }
  })
  }

  getAllMonth(){
    this.salarySetupService.getAllMonth().subscribe((response:ApiResponse)=>{
      if(response.status){
        this.month=response.result as Months[];

      }
    })
  }
  getAlltaxYear(){
    this.salarySetupService.getAllTaxYears().subscribe((response:ApiResponse)=>{
      if(response.status){
        this.taxYeardata=response.result as taxYearModel[];
      }
    })
  }
getAll(){
  this.salarySetupService.getAllperiod().subscribe((response:ApiResponse)=>{
    if(response.status)
    this.items=response.result as SalaryPeriodModel[];
   this.salaryPeriod=response.result as SalaryPeriodModel[];
   this.update();
  })
}
saveOrUpdate(){
  this.isSaveBtnClick=true;
  if(this.salaryPeriodForm.invalid){
    this.toaster.error('Fill all required field!', 'Invalid Submission!');
    return;
  }
  let yearName=this.salaryYear.find(c=>c.id==this.f.yearID.value).yearName;
  let taxName=this.taxYeardata.find(c=>c.id==this.f.taxYearID.value).taxYearName;
  let salPeriodObj=new SalaryPeriodModel();
  salPeriodObj=this.salaryPeriodForm.value;
  salPeriodObj.yearName=yearName;
  salPeriodObj.taxYear=taxName;
  this.salarySetupService.saveSalayPeriod(salPeriodObj).subscribe((response:ApiResponse)=>{
if(response){
  this.toaster.success("Saved Successfully","Success!");
  this.Reset();
  this.getAll();
}
else{
  this.toaster.error(response.result,"Failed!");
}

  })

    }

getById(id:number){
  this.btnStatus="Update";
    this.salarySetupService.getByIdSalaryPeriod(id).subscribe((response:ApiResponse)=>{
      if(response.status){
        let salPeriod=response.result as SalaryPeriodModel;
        salPeriod.startDateNgb=this.dateFrmat.stringToNgbDate(salPeriod.sDate.toString());
        salPeriod.endDateNgb=this.dateFrmat.stringToNgbDate(salPeriod.eDate.toString());
        this.salaryPeriodForm.patchValue(response.result);

      }
    })
}

 Reset(){
  this.isSaveBtnClick=false;
  this.salaryPeriodForm.reset();
  this.createForm();
  this.btnStatus='Save';
}
createForm(){
  this.salaryPeriodForm=this.formBuilder.group({
    id: [0,[]],
    periodName: [,[Validators.required]],
    monthName: [null,[Validators.required]],
   yearID: [,[Validators.required]],
    yearName: [ ,[]],
    financialYear: [null,[]],
   taxYearID: [,[Validators.required]],
    taxYear: [,[]],
    createdDate: [,[]],
   sortOrder: [0,[]],
   companyID: [this.companyID,[]],
   periodValue: [,[]],
   periodValueREVERS: [,[]],
   taxcard: [,[]],
   sDate:[,[]],
   startDateNgb : [,[Validators.required]],
   eDate:[,[]],
   endDateNgb : [,[Validators.required]]
  })
}
get f() {
  return this.salaryPeriodForm.controls;
}
}
