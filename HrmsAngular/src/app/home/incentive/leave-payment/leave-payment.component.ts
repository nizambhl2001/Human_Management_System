import { AuthService } from './../../../services/auth.service';
import { ToastrService } from 'ngx-toastr';
import { TaxYearInfo } from './../../../models/incomeTax/tax-year-info.model';
import { ApiResponse } from './../../../models/response.model';
import { SalarySetupService } from './../../../services/SalarySetup/salary-setup.service';
import { FormGroup, FormBuilder, FormArray, FormControl, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Pagination } from '../../../shared/paginate';
import { BasicEntry } from '../../../models/system-setup/basic-entry.model';
import { BasicEntryService } from '../../../services/system-setup/basic-entry.service';
import { BonusPeriodModel } from '../../../models/bonusPeriod.model';
import { BonusPeriodService } from '../../../services/Bonus/bonus-period.service';
import { BonusSalaryHeadModel } from '../../../models/bonus/bonus-salary-head.model';
import { BonusSelectService } from '../../../services/Bonus/bonus-select.service';
import { BonuSType } from '../../../models/bonus/bonusType.model';
import { BonusTypeService } from '../../../services/Bonus/bonusType.service';
import { SalaryYear } from '../../../models/SalarySetup/salary-year';
import { SubstitutionleaveAmount } from '../../../services/insentive-Other/substitution-leave-amount.service';
import { NgbDateCustomParserFormatter } from '../../../shared/dateformat';
import { SutitutionLeaveAmountmodel } from '../../../models/incentive-other/subtitution-leave-amount-model';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { FestivalBonusService } from '../../../services/Bonus/festival-bonus.service';
import { BonusGridModel } from '../../../models/bonus-grid.model';
import { FestivalBonusModel } from '../../../models/bonus/festival-bonus.model';

@Component({
  selector: 'app-leave-payment',
  templateUrl: './leave-payment.component.html',
  styleUrls: ['./leave-payment.component.scss',
  '../../../../vendor/libs/angular-2-dropdown-multiselect/angular-2-dropdown-multiselect.scss',
  '../../../../vendor/libs/ng-select/ng-select.scss']
})
export class LeavePaymentComponent extends Pagination implements OnInit {
 compID:number;
 isSubmitted=false;
 btnStatus:string="Save"
 gradeValue:number;
 subtitutionLeaveAmountGroup:FormGroup
 employeesForm:FormArray;
 allBranch:BasicEntry[] = [];
 allBonusPeriod:BonusPeriodModel[]=[];
 allDepartment:BasicEntry[]=[];
 allBonusAllowance:BonusSalaryHeadModel[]=[];
 allBonusType:BonuSType[]=[];
 allSalaryyear:SalaryYear[]=[];
 allBonus:BonusGridModel[]=[];
 allAmount:SutitutionLeaveAmountmodel[]=[];
  constructor(
   private SubtitutionFormBuilder:FormBuilder,
   private basicES: BasicEntryService,
   private BonusPeriodES:BonusPeriodService,
   private formBuilder:FormBuilder,
   private BonusSelectES:BonusSelectService,
   private BonusTypeES:BonusTypeService,
   private festivalBonusES:FestivalBonusService,
   private DateFormate:NgbDateCustomParserFormatter,
   private salaryYear:SalarySetupService,
   private toasterservice:ToastrService,
   private substitutionES:SubstitutionleaveAmount,
  ) {
    super();
    this.employeesForm = this.formBuilder.array([]);
  }
  title="Substitute Leave Payment";
  ngOnInit() {
    this.compID=AuthService.getLoggedCompanyId();
    this.gradeValue=-1;
    this.items=[];
    this.update();
    this.createForm();
    this.AllBranch();
    this.AllBonusPeriod();
    this.AllDepartment();
    this.AllBonusAllowance();
    this.AllBonusType();
    this.AllSalaryYear();
    this.addRow();
  }
  AllBranch() {
    this.basicES.getBranch().subscribe((response: ApiResponse) => {
      if (response.status) {
        this.allBranch = response.result as BasicEntry[];
      }
      else{

      }
    })
  }
  AllBonusPeriod(){
    this.BonusPeriodES.getBonusPeriod().subscribe((response:ApiResponse)=>{
      if(response.status){
        this.allBonusPeriod=response.result as BonusPeriodModel[];
      }
    })
  }
  AllDepartment(){
    this.basicES.getDepartment().subscribe((response:ApiResponse)=>{
      if(response.status){
        this.allDepartment=response.result as BasicEntry[];
      }
    })
  }
  AllBonusAllowance(){
    this.BonusSelectES.getBonusAllowance().subscribe((response:ApiResponse)=>{
      if(response.status){
       this.allBonusAllowance=response.result as BonusSalaryHeadModel[];
      }
    })
     }
     AllBonusType(){
      this.BonusTypeES.getBonusType().subscribe((response:ApiResponse)=>{
        if(response.status){
          this.allBonusType=response.result as BonuSType[];
        }
      })
    }
    AllSalaryYear(){
      this.salaryYear.getAllSalaryYear().subscribe((response:ApiResponse)=>{
        if(response.status){
         this.allSalaryyear=response.result as SalaryYear[];
        }
      })
    }
    getAll(){
      this.isSubmitted=true;
      if(this.subtitutionLeaveAmountGroup.invalid){
        this.toasterservice.warning("Fill Required Fields");
        return;
      }
      if(!(this.subtitutionLeaveAmountGroup.controls.branchID.value>0)){
        this.subtitutionLeaveAmountGroup.controls.branchID.setValue(-1);
      }
      if(!(this.subtitutionLeaveAmountGroup.controls.departmentID.value>0)){
        this.subtitutionLeaveAmountGroup.controls.departmentID.setValue(-1);
      }
      console.log(
        this.subtitutionLeaveAmountGroup.controls.branchID.value,
        this.subtitutionLeaveAmountGroup.controls.departmentID.value,
        this.subtitutionLeaveAmountGroup.controls.yearID.value,
        this.subtitutionLeaveAmountGroup.controls.salaryPeriodID.value,
        this.subtitutionLeaveAmountGroup.controls.gradeValue.value,
        this.subtitutionLeaveAmountGroup.controls.companyID.value
      );
      this.substitutionES.getAll(
        this.subtitutionLeaveAmountGroup.controls.branchID.value,
        this.subtitutionLeaveAmountGroup.controls.departmentID.value,
        this.subtitutionLeaveAmountGroup.controls.yearID.value,
        this.subtitutionLeaveAmountGroup.controls.salaryPeriodID.value,
        this.subtitutionLeaveAmountGroup.controls.gradeValue.value,
        this.subtitutionLeaveAmountGroup.controls.companyID.value
        ).subscribe((response:ApiResponse)=>{
       if(response.status){
         this.allAmount=response.result as SutitutionLeaveAmountmodel[];
         this.isSubmitted=false;
        this.employeesForm.removeAt(0);
        this.allAmount.forEach(emp=>{
          this.employeesForm.push(
            new FormGroup({
              empCode:new FormControl(emp.empCode,[]),
              empName:new FormControl(emp.empName,[]),
              department:new FormControl(emp.department,[]),
              designation:new FormControl(emp.designation,[]),
              amount:new FormControl(emp.amount,[])
            })
          )
        })
       }
       else{
         this.toasterservice.error(response.result);
       }
      })
    }
    save(){
      this.isSubmitted=true;
      if(this.subtitutionLeaveAmountGroup.invalid || this.employeesForm.length<0 ){
        this.toasterservice.warning("Validation Required");
        return;
      }
      let performanmceBonus:FestivalBonusModel=this.subtitutionLeaveAmountGroup.value;
      performanmceBonus.bonusGrid=this.employeesForm.value;
      performanmceBonus.date= this.DateFormate.ngbDateToString(this.subtitutionLeaveAmountGroup.controls.dateNgb.value);
      this.festivalBonusES.saveFestivalBonus(performanmceBonus).subscribe((response:ApiResponse)=>{
        if(response.status){
          this.toasterservice.success("Successfully Save","Success");
          this.reset();
          this.isSubmitted=false;
        }
        else{
          this.toasterservice.error(response.result,"Fail")
        }
      })
    }
createForm(){
  this.subtitutionLeaveAmountGroup=this.SubtitutionFormBuilder.group({
     branchID:[,[]],
		 departmentID:[,[]],
		 yearID:[,[Validators.required]],
     salaryPeriodID:[,[Validators.required]],
     periodID:[,[Validators.required]],
		 gradeValue:[this.gradeValue,[]],
     salaryHeadID:[,[Validators.required]],
     oTPP:[,[]],
     bonusType:[,[Validators.required]],
     date:[,[]],
     dateNgb:[this.DateFormate.getCurrentNgbDate(),[]],
     companyID:[this.compID,[]],
     depertmentID:[,[]]
  })
}
get f(){
  return this.subtitutionLeaveAmountGroup.controls;
}
reset(){
  this.createForm();
  this.employeesForm=this.formBuilder.array([]);
  this.isSubmitted=false;
}
addRow() {
  this.employeesForm.push(
    new FormGroup({
      empCode: new FormControl(null, []),
      empName: new FormControl(null, []),
      department: new FormControl(null, []),
      designation: new FormControl(null, []),
      amount: new FormControl(0, [])
    })
  )
}
}
