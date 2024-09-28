import { AuthService } from './../../../services/auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiResponse } from './../../../models/response.model';
import { Component, OnInit } from '@angular/core';
import { Pagination } from '../../../shared/paginate';
import { SalarySetupService } from '../../../services/SalarySetup/salary-setup.service';
import { SalaryYear } from '../../../models/SalarySetup/salary-year';
import { ToastrService } from 'ngx-toastr';
import { NgbDateCustomParserFormatter } from '../../../shared/dateformat';
import { format } from 'util';

@Component({
  selector: 'app-salary-year-setup',
  templateUrl: './salary-year-setup.component.html',
  styleUrls: ['./salary-year-setup.component.scss']
})
export class SalaryYearSetupComponent extends Pagination implements OnInit {

  constructor(
    private salarySetupService:SalarySetupService,
    private formBuilder:FormBuilder,
    private toaster:ToastrService,
    private dateFormate:NgbDateCustomParserFormatter,

  ) {
    super()
   }
   title = "Salary Year";
   salaryYear:SalaryYear[]=[];
   salaryYearform:FormGroup;
   btnStatus='Save';
   isSaveBtnClick = false;
   companyID:number;

  ngOnInit() {
    this.items=[];
    this.companyID=AuthService.getLoggedCompanyId();
    this.createForm();
    this.getAll();
    this.searchKeys = ['yearName']
  }
  getAll(){
    this.salarySetupService.getAllSalaryYear().subscribe((response:ApiResponse)=>{
      if(response.status){
        this.items=response.result as SalaryYear[];
        this.salaryYear = response.result as SalaryYear[];
        this.update();
      }
    })
    }
getById(id:number){
this.salarySetupService.getSalaryYearById(id).subscribe((response:ApiResponse)=>{
if(response.status){
let salaryYear=response.result as SalaryYear;
salaryYear.startDateNgb = this.dateFormate.stringToNgbDate(salaryYear.startDate.toString());
salaryYear.endDateNgb = this.dateFormate.stringToNgbDate(salaryYear.endDate.toString());
  this.salaryYearform.patchValue(response.result);
  this.btnStatus='Update';
}
})

}
save(){
  this.isSaveBtnClick = true;
  if(this.salaryYearform.invalid){
    this.toaster.error("Please fill the all required field","Invalid submission");
    return;
  }
   let salaryyear=new SalaryYear();
   salaryyear=this.salaryYearform.value;
   salaryyear.startDate = this.dateFormate.getNgbDateToYyyy_mm_dd(this.f.startDateNgb.value);
   salaryyear.endDate = this.dateFormate.getNgbDateToYyyy_mm_dd(this.f.endDateNgb.value);
this.salarySetupService.saveSalaryYear(this.salaryYearform.value).subscribe((response:ApiResponse)=>{
if(response.status){
  this.getAll();
  this.toaster.success(response.result,"Success!")
  this.reset()
}else{
  this.toaster.error(response.result,"Failed!")
}
})
}
Update(){
  let salaryyear=new SalaryYear();
  salaryyear=this.salaryYearform.value;
  salaryyear.startDate = this.dateFormate.getNgbDateToYyyy_mm_dd(this.f.startDateNgb.value);
  salaryyear.endDate = this.dateFormate.getNgbDateToYyyy_mm_dd(this.f.endDateNgb.value);
  this.salarySetupService.updateSalaryYear(this.salaryYearform.value).subscribe((response:ApiResponse)=>{
    if(response.status){

      this.toaster.success(response.result,"Success!")
      this.reset();
      this.getAll();
    }else{
      this.toaster.error(response.result,"Failed!")
    }
  })
}
onSubmit(){
  if(this.btnStatus=='Save')
  this.save();
  else
  this.Update();
}

reset() {
  this.isSaveBtnClick=false;
  this.salaryYearform.reset();
  this.createForm()
  this.btnStatus='Save';
}


createForm(){
  this.salaryYearform=this.formBuilder.group({
    id:[0,[]],
    yearName:[,[Validators.required]],
    startDate:[,[]],
    startDateNgb :[,[Validators.required]],
    endDate:[,[]],
    endDateNgb :[,[Validators.required]],
    createdDate:[,[]],
    sortOrder:[0,[]],
    companyID:[this.companyID,[]]
  })
}
get f (){
  return this.salaryYearform.controls;
}

  }


