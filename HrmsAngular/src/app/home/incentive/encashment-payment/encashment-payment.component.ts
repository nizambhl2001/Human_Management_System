import { AuthService } from './../../../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { Pagination } from '../../../shared/paginate';
import { FormGroup, FormArray, FormBuilder, FormControl, Validators } from '@angular/forms';
import { BasicEntry } from '../../../models/system-setup/basic-entry.model';
import { BonusPeriodModel } from '../../../models/bonusPeriod.model';
import { BonusSalaryHeadModel } from '../../../models/bonus/bonus-salary-head.model';
import { BonuSType } from '../../../models/bonus/bonusType.model';
import { SalaryYear } from '../../../models/SalarySetup/salary-year';
import { BonusGridModel } from '../../../models/bonus-grid.model';
import { SutitutionLeaveAmountmodel } from '../../../models/incentive-other/subtitution-leave-amount-model';
import { BasicEntryService } from '../../../services/system-setup/basic-entry.service';
import { BonusPeriodService } from '../../../services/Bonus/bonus-period.service';
import { BonusSelectService } from '../../../services/Bonus/bonus-select.service';
import { BonusTypeService } from '../../../services/Bonus/bonusType.service';
import { FestivalBonusService } from '../../../services/Bonus/festival-bonus.service';
import { NgbDateCustomParserFormatter } from '../../../shared/dateformat';
import { SalarySetupService } from '../../../services/SalarySetup/salary-setup.service';
import { ToastrService } from 'ngx-toastr';
import { SubstitutionleaveAmount } from '../../../services/insentive-Other/substitution-leave-amount.service';
import { ApiResponse } from '../../../models/response.model';
import { encashmentPayment } from '../../../services/insentive-Other/encashment-payment.service';
import { FestivalBonusModel } from '../../../models/bonus/festival-bonus.model';

@Component({
  selector: 'app-encashment-payment',
  templateUrl: './encashment-payment.component.html',
  styleUrls: ['./encashment-payment.component.scss',
  '../../../../vendor/libs/angular-2-dropdown-multiselect/angular-2-dropdown-multiselect.scss',
  '../../../../vendor/libs/ng-select/ng-select.scss']
})
export class EncashmentPaymentComponent extends Pagination implements OnInit {
  isSubmitted=false;
  compID:number;
  gradeValue:number;
  encashmentPaymentForm:FormGroup
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
    private encashmentFormBuilder:FormBuilder,
    private basicES: BasicEntryService,
    private BonusPeriodES:BonusPeriodService,
    private BonusSelectES:BonusSelectService,
    private BonusTypeES:BonusTypeService,
    private festivalBonusES:FestivalBonusService,
    private DateFormate:NgbDateCustomParserFormatter,
    private salaryYear:SalarySetupService,
    private toasterservice:ToastrService,
    private encashmentES:encashmentPayment,
  ) {
    super();
   this.employeesForm=this.encashmentFormBuilder.array([]);
  }
  title="Leave Encashment Payment"
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
      if(this.encashmentPaymentForm.invalid){
        this.toasterservice.warning("Fill Required Fields");
        return;
      }
      if(!(this.encashmentPaymentForm.controls.branchID.value>0)){
        this.encashmentPaymentForm.controls.branchID.setValue(-1);
      }
      if(!(this.encashmentPaymentForm.controls.departmentID.value>0)){
        this.encashmentPaymentForm.controls.departmentID.setValue(-1);
      }
        this.encashmentES.getAll(
        this.encashmentPaymentForm.controls.branchID.value,
        this.encashmentPaymentForm.controls.departmentID.value,
        this.encashmentPaymentForm.controls.yearID.value,
        this.encashmentPaymentForm.controls.salaryPeriodID.value,
        this.encashmentPaymentForm.controls.gradeValue.value,
        this.encashmentPaymentForm.controls.companyID.value
        ).subscribe((response:ApiResponse)=>{
       if(response.status){
         this.isSubmitted=false;
         this.allAmount=response.result as SutitutionLeaveAmountmodel[];
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
      if(this.encashmentPaymentForm.invalid){
        this.toasterservice.warning("Fill required Fields");
      }
      else if(this.allAmount.length<=0){
        this.toasterservice.error("No data  in Table");
      }
      else{
      let performanmceBonus:FestivalBonusModel=this.encashmentPaymentForm.value;
      performanmceBonus.bonusGrid=this.employeesForm.value;
      performanmceBonus.companyID=this.f.companyID.value;
      performanmceBonus.depertmentID=this.f.departmentID.value;
      performanmceBonus.date=this.DateFormate.ngbDateToString(this.f.dateNgb.value);
      if(performanmceBonus.depertmentID==-1){
        performanmceBonus.depertmentID=0;
      }
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
  }
    createForm(){
      this.encashmentPaymentForm=this.encashmentFormBuilder.group({
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
      return this.encashmentPaymentForm.controls;
    }
    reset(){
      this.createForm();
      this.employeesForm=this.encashmentFormBuilder.array([]);
      this.isSubmitted=false;
    }
    addRow() {
      this.employeesForm.push(
        new FormGroup({
          empCode: new FormControl(null, [Validators.required]),
          empName: new FormControl(null, []),
          department: new FormControl(null, []),
          designation: new FormControl(null, []),
          amount: new FormControl(0, [Validators.required])
        })
      )
    }
}
