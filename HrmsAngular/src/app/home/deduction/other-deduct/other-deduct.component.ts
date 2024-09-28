import { AuthService } from './../../../services/auth.service';
import { SalarySetupService } from './../../../services/SalarySetup/salary-setup.service';
import { DeductionService } from './../../../services/Deduction/deduction.service';
import { DriverAllowace } from './../../../models/Addition/driver-addition-allowance.model';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { SalaryHead } from './../../../models/SalarySetup/salary-head';
import { BasicEntryService } from './../../../services/system-setup/basic-entry.service';
import { SalaryPeriodModel } from './../../../models/SalarySetup/SalaryPeriod';
import { Component, OnInit } from '@angular/core';
import { Pagination } from '../../../shared/paginate';
import { ApiResponse } from '../../../models/response.model';
import { BasicEntry } from '../../../models/system-setup/basic-entry.model';
import { ToastrService } from 'ngx-toastr';
import { AllDeduction } from '../../../models/Deduction/all-deduction.model';


@Component({
  selector: 'app-other-deduct',
  templateUrl: './other-deduct.component.html',
  styleUrls: ['./other-deduct.component.scss','../../../../vendor/libs/ng-select/ng-select.scss']
})
export class OtherDeductComponent extends Pagination implements OnInit {

  constructor(

    private basicEntryService:BasicEntryService,
    private salarySetupService:SalarySetupService,
    private formBuilder:FormBuilder,
    private toaster:ToastrService,
    private otherDeductionService:DeductionService
  ) {
    super();
  }
  title="Employee Other Deduct";
  salaryPeriodModel:SalaryPeriodModel[]=[];
  departments:BasicEntry[]=[];
  salaryHeadModel:SalaryHead[]=[];
  otherDeductionForm:FormGroup;
  otherdeductionshow:AllDeduction[]=[];
  alldeductData:AllDeduction[]=[];
  btnStatus = 'Save';
  companyID:number;
  grade:number;
  isSubmitted=false;
  userTypeID:number;

  ngOnInit() {
    this.items=[];
    this.update();
    this.companyID=AuthService.getLoggedCompanyId();
    this.userTypeID=AuthService.getLoggedUserTypeId();
    this.grade=AuthService.getLoggedGradeValue();
    this.createForm();
    this.getAllSalPeriod();
    this.getSalaryHead();
    this.getDepartmentName();
  }
  getAllSalPeriod(){
    this.salarySetupService.getAllperiod().subscribe((response:ApiResponse)=>{
      if(response.status){
        this.salaryPeriodModel=response.result as SalaryPeriodModel[];
      }
    })
    }

    getDepartmentName() {
      this.basicEntryService.getDepartment().subscribe((response: ApiResponse) => {
        if (response.status) {
          this.departments = response.result as BasicEntry[];
        }

      })
    }
      onDepartmentSelect(deptName: string) {
       let salarydeuctdept = this.alldeductData.filter(c => c.department == deptName);
      this.otherdeductionshow=salarydeuctdept;

      }
    getSalaryHead() {
      this.salarySetupService.getAllSalaryHead().subscribe((response: ApiResponse) => {
        if (response.status) {
          let allSalaryHead:SalaryHead[] = response.result as SalaryHead[];
          this.salaryHeadModel = allSalaryHead.filter(c => c.id == 24 );
        }
      })
    }
    getAll(){
      this.isSubmitted=true;
      if(this.otherDeductionForm.invalid){
        this.toaster.error("Please fill all the required fields","Invalid submission");
        return;
      }else{
        let otherDeductparameter =new AllDeduction();
        otherDeductparameter=this.otherDeductionForm.value;
        otherDeductparameter.taxYearID=this.salaryPeriodModel.find(c=>c.id==this.f.periodID.value).taxYearID;
        otherDeductparameter.yearID=this.salaryPeriodModel.find(c=>c.id==this.f.periodID.value).yearID;
        otherDeductparameter.periodName=this.salaryPeriodModel.find(c=>c.id==this.f.periodID.value).periodName;
       this.otherDeductionService.getAllOtherDeduction(otherDeductparameter).subscribe((response:ApiResponse)=>{
        if(response.status){
          this.otherdeductionshow=response.result as AllDeduction[];
          this.alldeductData=response.result as AllDeduction[];

        }})
      }

     }
     SaveUpdate(){
      this.isSubmitted=true;
      if(this.otherDeductionForm.invalid){
        this.toaster.error("Please fill all the required fields","Invalid submission");
        return;
      }else{
        let otherDeduct=new AllDeduction();
        otherDeduct=this.otherDeductionForm.value;
        otherDeduct.taxYearID=this.salaryPeriodModel.find(c=>c.id==this.f.periodID.value).taxYearID;
       otherDeduct.yearID=this.salaryPeriodModel.find(c=>c.id==this.f.periodID.value).yearID;
       otherDeduct.periodName=this.salaryPeriodModel.find(c=>c.id==this.f.periodID.value).periodName;
       otherDeduct.selectedDriver=this.otherdeductionshow;
        console.log(otherDeduct);
        this.otherDeductionService.saveupdateOtherDeduction(otherDeduct).subscribe((response:ApiResponse)=>{
         // console.log(response.result);
          if(response.status){
           this.toaster.success("Saved Successfully", "Success!");
                 this.reset();

          }else {
                this.toaster.error(response.result, "Failed!");
              }
        })
      }

     }

    removeDriver(empCode: string) {
      let index = this.otherdeductionshow.findIndex(c => c.empCode == empCode);
      this.otherdeductionshow.splice(index, 1);
    }
    reset(){
      this.isSubmitted=false;
      this.otherDeductionForm.reset();
      this.createForm();
      this.btnStatus = 'Save';
    }
    createForm(){
      this.otherDeductionForm=this.formBuilder.group({
        id            :[0,[]],
        salaryHeadID  :[,[Validators.required]],
        periodID      :[,[Validators.required]],
       grade          :[this.grade,[]],
       department	    :[null,[]],
       companyID      :[this.companyID,[]]
      })
    }
    get f(){
      return this.otherDeductionForm.controls;
    }
}
