import { AuthService } from './../../../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { Pagination } from '../../../shared/paginate';
import { ApiResponse } from '../../../models/response.model';
import { SalGradeModel } from '../../../models/SalarySetup/sal-grade-model';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { SalarySetupService } from '../../../services/SalarySetup/salary-setup.service';

@Component({
  selector: 'app-salary-grade',
  templateUrl: './salary-grade.component.html',
  styleUrls: ['./salary-grade.component.scss']
})
export class SalaryGradeComponent extends Pagination implements OnInit {

  constructor(
    private salGradeService:SalarySetupService,
    private formBuilder:FormBuilder,
    private toaster:ToastrService
  ) {
    super()
  }
salGradeModel:SalGradeModel[]=[];
salGradeForm:FormGroup;
btnStatus='Save';
companyID:number;
isSaveBtnClick=false;

  ngOnInit() {
    this.items=[];
    this.update();
    this.companyID=AuthService.getLoggedCompanyId();
    this.createForm();
    this.getAll();
    this.searchKeys = ['structureName']
  }
  getAll(){
    this.salGradeService.getAllSalarygrade().subscribe((response:ApiResponse)=>{
      if(response.status){
        this.items=response.result as SalGradeModel[];
        this.salGradeModel=response.result as SalGradeModel[];
        this.update();
      }
    })
  }
  getById(id:number){
    this.btnStatus='Update';
  this.salGradeService.getByIdSalaryGrade(id).subscribe((response:ApiResponse)=>{
    console.log(response.result);
    if(response.status){
      this.salGradeForm.patchValue(response.result);
    }
  })
  }
 save(){
  this.isSaveBtnClick=true;
    if(this.salGradeForm.invalid){
      this.toaster.error("Please fill the all required fields","Invalid submission");
      return;
    }
    let salgrade=new SalGradeModel();
    salgrade=this.salGradeForm.value;
    this.salGradeService.saveSalaryGrade(salgrade).subscribe((response:ApiResponse)=>{
     console.log(response.result);
      if(response.status){
       this.toaster.success(response.result,"Success!")
       this.reset();
       this.getAll();
      }else{
        this.toaster.error(response.result ,"Failed!");
      }})
    }

    reset() {
      this.isSaveBtnClick=false;
      this.salGradeForm.reset();
      this.createForm()
      this.btnStatus='Save';

    }
  Update(){
    this.salGradeService.updateSalaryGrade(this.salGradeForm.value).subscribe((response:ApiResponse)=>{
      console.log(response.result);
       if(response.status){

        this.toaster.success(response.result,"Updated!")
        this.reset();
        this.getAll();
       }else{
         this.toaster.error(response.result ,"Failed!");
       }})
  }
  onSubmit(){
    if(this.btnStatus=='Save')
    this.save();
    else
    this.Update();
  }

  createForm(){
  this.salGradeForm=this.formBuilder.group({
    id  :[0,[]],
    structureName:[,[Validators.required]],
    sortOrder:[,[Validators.required]],
    companyID:[this.companyID,[]]
  })
  }
get f(){
  return this.salGradeForm.controls;
}



}
