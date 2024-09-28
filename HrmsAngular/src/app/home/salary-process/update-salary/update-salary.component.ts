import { AuthService } from './../../../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { Pagination } from '../../../shared/paginate';
import { FormBuilder, FormGroup, FormArray, FormControl, Validators } from '@angular/forms';
import { SalaryProcessService } from '../../../services/salary-process/salary-process-service.service';
import { ApiResponse } from '../../../models/response.model';
import { SalaryEdit } from '../../../models/salary-process/salary-edit.model';
import { ToastrService } from 'ngx-toastr';
import { formControlBinding } from '@angular/forms/src/directives/reactive_directives/form_control_directive';

@Component({
  selector: 'app-update-salary',
  templateUrl: './update-salary.component.html',
  styleUrls: ['./update-salary.component.scss','../../../../vendor/libs/angular2-ladda/ladda.scss']
})
export class UpdateSalaryComponent extends Pagination implements OnInit {

  updateSalaryForm:FormGroup;
  salaryEditViewForm:FormArray;
  comId:number;
  isSubmitted=false;
  isGetEmployee=false;
  searchKeys;
  grade:number;
  isShowEmplowee:Boolean=false;
  constructor(
    private formBuilder:FormBuilder,
    private sPService:SalaryProcessService,
    private toster:ToastrService,

  ) {
    super()
    this.salaryEditViewForm = this.formBuilder.array([]);
  }

  ngOnInit() {
    this.items = [];
    this.update();
    this.searchKeys=['empCode']
    this.grade=AuthService.getLoggedGradeValue();
    this.comId=AuthService.getLoggedCompanyId();
    this.createUpdateSalaryForm();
  }

  getEmployeeSalaryUpdate(){
    this.isGetEmployee=true;
  if(this.updateSalaryForm.invalid){
    return;
  }else{
    this.isShowEmplowee=true;
    let obj=new SalaryEdit();
    obj=this.updateSalaryForm.value;
  this.sPService.getEmployeeSalaryUpdate(obj).subscribe((response:ApiResponse)=>{
    if(response.status){
      this.isShowEmplowee=false;
        this.items = response.result as SalaryEdit[];
        this.update();
      this.salaryEditViewForm = this.formBuilder.array([]);
      this.items.forEach(salaryEditParm=>{
        this.salaryEditViewForm.push(
          new FormGroup({
            empName: new FormControl(salaryEditParm.empName,[Validators.required]),
            designation: new FormControl(salaryEditParm.designation,[Validators.required]),
            accountName: new FormControl(salaryEditParm.accountName,[Validators.required]),
            amount: new FormControl(salaryEditParm.amount,[Validators.required]),
            empCode:new FormControl(salaryEditParm.empCode,[Validators.required])
          })
        )
      })
    }else{
      this.isShowEmplowee=false;
      this.toster.show(response.result,"Information")
      this.items =[];
      this.update();
    }
  });
  }

}

updateSalry(){
  this.isGetEmployee=true;
  this.isSubmitted=true;
  if(this.updateSalaryForm.invalid){
  }else{
    let obj= new SalaryEdit();
  obj=this.updateSalaryForm.value;
  obj.salaryEditView=this.salaryEditViewForm.value;
  this.sPService.updateSalry(obj).subscribe((response:ApiResponse)=>{
    if(response.status){
      this.toster.success(response.result,"Success");
      this.Reset();
    }else{
      this.toster.error(response.result,"Failed!!");
    }
  });
  }

}

  createUpdateSalaryForm(){
    this.updateSalaryForm=this.formBuilder.group({
      empCode:[,[]],
      departmentID:[,[]],
      designationID:[-1,[]],
      salaryHeadID:[-1,[]],
      periodID:[,[Validators.required]],
      companyID:[this.comId,[]],
      grade:[this.grade,[]]
    })
  }

get fCon(){
return this.updateSalaryForm.controls;
}

Reset(){
  this.isShowEmplowee=false;
  this.isSubmitted=false;
  this.isGetEmployee=false;
  this.updateSalaryForm.reset();
  this.salaryEditViewForm.reset();
  this.createUpdateSalaryForm();
  this.salaryEditViewForm=this.formBuilder.array([]);
  this.items=[];
  this.update();
}

}
