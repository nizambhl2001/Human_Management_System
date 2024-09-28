import { AuthService } from './../../../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { Pagination } from '../../../shared/paginate';
import { FormBuilder, FormGroup, Validators, FormArray, FormControl } from '@angular/forms';
import { SalaryProcessService } from '../../../services/salary-process/salary-process-service.service';
import { SalarySetupService } from '../../../services/SalarySetup/salary-setup.service';
import { SalaryPeriodModel } from '../../../models/SalarySetup/SalaryPeriod';
import { ApiResponse } from '../../../models/response.model';
import { AdditionAllowanceService } from '../../../services/Addition/addition-allowance.service';
import { BonusType } from '../../../models/Addition/bonus-types';
import { EmployeeExtraSalaryView } from '../../../models/salary-process/employee-extra-salary-view.model';
import { SalaryHead } from '../../../models/SalarySetup/salary-head';
import { EmploymentService } from '../../../services/hr/employment.service';
import { SearchEmployee } from '../../../models/hr/search-emp.model';
import { EmployeeExtraSalary } from '../../../models/salary-process/employee-extra-salary.model';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-extra-salary',
  templateUrl: './extra-salary.component.html',
  styleUrls: ['./extra-salary.component.scss',
  '../../../../vendor/libs/ng-select/ng-select.scss',
  '../../../../vendor/libs/angular2-ladda/ladda.scss']
})
export class ExtraSalaryComponent extends Pagination implements OnInit {

  extraSalaryForm:FormGroup;
  isSubmitted=false;
  isSaveButtonClick=false;
  salaryPeriodItem:SalaryPeriodModel[]=[];
  bonusTypesModel: BonusType[]=[];
  comId:number;
  grade:number;
  empExtraSalaryItem:EmployeeExtraSalaryView[]
  empExtraSalaryFormArray:FormArray;
  salaryHeadItem:SalaryHead[]=[];
  ShoData:boolean=false;
  isShowEmployee:boolean=false;
  constructor(
    private formBuilder:FormBuilder,
    private salaryService:SalaryProcessService,
    private salarySetupService:SalarySetupService,
    private additionAllowanceService:AdditionAllowanceService,
    private salaryheadService: SalarySetupService,
    private empService:EmploymentService,
    private toster:ToastrService
  ) {
    super()
    this.empExtraSalaryFormArray=this.formBuilder.array([]);
  }

  ngOnInit() {
    this.items=[];
    this.update
    this.comId=AuthService.getLoggedCompanyId();
    this.grade=AuthService.getLoggedGradeValue();
    this.getSalaryPeriodList();
    this.getSalaryHead();
    this.getAllBonusType();
    this.createExtraSalaryForm();
  }


  getSalaryHead() {
    this.salaryheadService.getAllSalaryHead().subscribe((response: ApiResponse) => {
      if (response.status) {
       this.salaryHeadItem = response.result as SalaryHead[];
      }else{
        this.salaryHeadItem=[];
      }
    })
  }

  getSalaryPeriodList() {
    this.salarySetupService.getAllperiod().subscribe((response: ApiResponse) => {
      if (response.status) {
        this.salaryPeriodItem = response.result as SalaryPeriodModel[];
      }

    })
  }

  getAllBonusType() {
    this.additionAllowanceService.getAllBonusType().subscribe((response: ApiResponse) => {
      if (response.status) {
        this.bonusTypesModel = response.result as BonusType[];
      }else{
        this.bonusTypesModel=[];
      }
    })
  }



  getEmployment(empCode:any,rowIndex:number){
    if(empCode==""){
      this.empExtraSalaryFormArray.controls[rowIndex].patchValue({
        empName:null,
        department:null,
        designation:null
      })
      return;
    }
  this.empService.getEmployment(empCode,this.comId).subscribe((response:ApiResponse)=>{
    if(response.status){
     let employee=response.result as SearchEmployee;
      this.empExtraSalaryFormArray.controls[rowIndex].patchValue({
        empName:employee.empName,
        department:employee.department,
        designation:employee.designation
      })
    }
    else{
      this.empExtraSalaryFormArray.controls[rowIndex].patchValue({
        empName:null,
        department:null,
        designation:null
      })
    }
  })
  }


saveEmpExtraSalary(){
  this.isSubmitted=true;
this.isSaveButtonClick=true;
  if(this.extraSalaryForm.invalid){
    //this.toster.warning("Fill Required Fields");
    return;
  }else{
    let obj =new EmployeeExtraSalary();
  obj=this.extraSalaryForm.value;
  obj.empExtraSalary=this.empExtraSalaryFormArray.value;
 this.salaryService.saveEmployeeExtraSalary(obj).subscribe((response:ApiResponse)=>{
   if(response.status){
     this.toster.success(response.result,"Success");
     this.Reset();
   }else{
     this.toster.error(response.result,"Failed");
   }
 });
  }
}

  searchExtraSalary(){
    this.isSubmitted=true;
    this.isSaveButtonClick=false;
    if(this.extraSalaryForm.controls['periodID'].invalid){
      return;
    }else{
      this.ShoData=true;
      this.salaryService.searchExtraSalary(this.extraSalaryForm.value).subscribe((response:ApiResponse)=>{
        if(response.status){
          this.ShoData=false;
          this.items=response.result as EmployeeExtraSalaryView[]
          this.update();
          this.empExtraSalaryFormArray=this.formBuilder.array([]);
          this.items.forEach(item=>{
            this.empExtraSalaryFormArray.push(
              new FormGroup({
                empCode:new FormControl(item.empCode),
                empName:new FormControl(item.empName),
                designation:new FormControl(item.designation),
                department:new FormControl(item.department),
                salaryHeadID:new FormControl(item.salaryHeadID),
                amount:new FormControl(item.amount),
                note:new FormControl(item.note),
              })
            )
          })
        }
        else{
          this.ShoData=false;
          this.toster.error(response.result)
          this.items=[];
          this.update();
          this.empExtraSalaryFormArray=this.formBuilder.array([]);
        }
      });
    }
  }


  createExtraSalaryForm(){
    this.extraSalaryForm=this.formBuilder.group({
      companyID:[this.comId,[]],
      grade:[this.grade,[]],
      empCode:[,[]],
      periodID:[,[Validators.required]],
      bonusTypeID:[,[Validators.required]]
    })
  }



  get f(){
    return this.extraSalaryForm.controls;
  }

  Reset(){
    this.ShoData=false;
    this.isSaveButtonClick=false;
    this.isSubmitted=false;
    this.empExtraSalaryFormArray=this.formBuilder.array([]);
    this.extraSalaryForm.reset();
    this.createExtraSalaryForm();
  }

}
