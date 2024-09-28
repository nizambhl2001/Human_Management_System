import { AuthService } from './../../../services/auth.service';
import { ProcessIncomeTax } from './../../../models/incomeTax/process-incometax.model';
import { ApiResponse } from './../../../models/response.model';
import { TaxYearInfoService } from './../../../services/incomeTax/tax-year-info.service';
import { SalarySetupService } from './../../../services/SalarySetup/salary-setup.service';
import { AdditionAllowanceService } from './../../../services/Addition/addition-allowance.service';
import { EmployeeService } from './../../../services/hr/employee.service';
import { ShiftAllowanceAuto } from './../../../models/ShiftAllowance/shiftauto-allowance.model';
import { SalaryHead } from './../../../models/SalarySetup/salary-head';
import { SalaryPeriodModel } from './../../../models/SalarySetup/SalaryPeriod';
import { Component, OnInit } from '@angular/core';
import { Pagination } from '../../../shared/paginate';
import { BasicEntry } from '../../../models/system-setup/basic-entry.model';
import { FormBuilder, FormGroup, Validators, FormArray, FormControl } from '@angular/forms';
import { BasicEntryService } from '../../../services/system-setup/basic-entry.service';

import { ShiftAllowanceService } from '../../../services/ShiftAllowance/shift-allowance.service';
import { BonusType } from '../../../models/Addition/bonus-types';
import { NgbDateCustomParserFormatter } from '../../../shared/dateformat';
import { DriverAllowace } from '../../../models/Addition/driver-addition-allowance.model';
import { EmploymentService } from '../../../services/hr/employment.service';
import { Employment } from '../../../models/hr/employment.model';
import { ToastrService } from 'ngx-toastr';
import { SearchEmployee } from '../../../models/hr/search-emp.model';


@Component({
  selector: 'app-auto-payment',
  templateUrl: './auto-payment.component.html',
  styleUrls: ['./auto-payment.component.scss','../../../../vendor/libs/ng-select/ng-select.scss', '../../../../vendor/libs/angular2-ladda/ladda.scss']
})
export class AutoPaymentComponent extends Pagination implements OnInit {


  constructor(
    private formBuilder:FormBuilder,
    private shiftAllowanceService: ShiftAllowanceService,
    private basicEntryService:BasicEntryService,
    private driverallwBonusService:AdditionAllowanceService,
    private salarySetupService:SalarySetupService,
    private dateFrmat:NgbDateCustomParserFormatter,
    private empService:EmploymentService,
    private toaster:ToastrService,
    private taxService:TaxYearInfoService

    ) {
    super();
    this._shiftAutoAllowanceform=this.formBuilder.array([]);
   }
   title="Shift Allowance Auto Payment";
   shiftAutoFormgroup:FormGroup;
   isLoading:boolean=false;
   branch:BasicEntry[]=[];
   department:BasicEntry[]=[];
   productionunit:BasicEntry[]=[];
   productionline:BasicEntry[]=[];
   companyId:number;
   gradeValue:number;
  bonusTypesModel:BonusType[]=[];
  salaryPeriod:SalaryPeriodModel[]=[];
  salaryHeadModel:SalaryHead[]=[];
  alltabledata: ShiftAllowanceAuto[] = [];
  _shiftAutoAllowanceform:FormArray;
  _isSubmitted:boolean;
  isGetAllBtnClick:boolean;
  employeeListModel:ProcessIncomeTax[]=[];
  empCode:string;
  totalEmp:number;
  ngOnInit() {
    this.items=[];
    this.companyId=AuthService.getLoggedCompanyId();
    this.gradeValue = AuthService.getLoggedCompanyId();
    this.createForm();
    this.getAllBranchName();
    this.addRow();
    this.getAllBonusType();
    this.getAllDepartmentName();
    this.getSalaryPeriod();
    this.getProductionUnit();
    this.getSalaryHead();
    this._isSubmitted=false;
    this.isGetAllBtnClick=false;
    this.getEmpList();
  }
  getEmpList(){
    this.taxService.getAllName_EmpCode().subscribe((response:ApiResponse)=>{
      if(response.status){
        this.employeeListModel=response.result as ProcessIncomeTax[];
      }else{
        this.employeeListModel=[];
      }
    })
  }


  getAll(){
    this.isGetAllBtnClick=true;
    if(this.f.startDateNgb.invalid || this.f.endDateNgb.invalid){
      this.toaster.error('Fill all required field!', 'Invalid Submission!');
      return;
    }
    this.isLoading=true;

   let autoshiftallwn=new ShiftAllowanceAuto();
   autoshiftallwn=this.shiftAutoFormgroup.value;
    this.shiftAllowanceService.getAllShiftAutoAllowance(autoshiftallwn).subscribe((response:ApiResponse)=>{
      this.isLoading=false;
      if(response.status){
        this.alltabledata = response.result as ShiftAllowanceAuto[];
        this.totalEmp=this.alltabledata.length;
        this._shiftAutoAllowanceform=this.formBuilder.array([]);
       this.alltabledata.forEach(item=>{
          this._shiftAutoAllowanceform.push(
            new FormGroup({
              id:new FormControl(item.id,[]),
              empCode:new FormControl(item.empCode,[]),
              empName:new FormControl(item.empName,[]),
              department:new FormControl(item.department,[]),
              designation:new FormControl(item.designation,[]),
              amount:new FormControl(item.amount,[])
            })
          )
        })
      }
    })
  }


getAllBranchName(){
this.basicEntryService.getBranch().subscribe((response:ApiResponse)=>{
if(response.status)
{
  this.branch=response.result as BasicEntry[];
}})
}

getAllDepartmentName(){
this.basicEntryService.getDepartment().subscribe((response:ApiResponse)=>{
  if(response.status)
  {
    this.department=response.result as BasicEntry[];
  }})
}

getProductionUnit(){

this.basicEntryService.getProductionUnit(this.companyId).subscribe((response:ApiResponse)=>{
  if(response.status)
  {
    this.productionunit=response.result as BasicEntry[];
  }})
}
getProductionLine(unitId:number){
  if(unitId==null){
    this.productionline=[];
    return;}else{
    this.basicEntryService.getProductionLine(this.companyId,unitId).subscribe((response:ApiResponse)=>{
      if(response.status)
      {
        this.productionline=response.result as BasicEntry[];
      }else{
        this.productionline=[];
      }
    })
  }

    }
    getAllBonusType() {
      this.driverallwBonusService.getAllBonusType().subscribe((response: ApiResponse) => {
        if (response.status) {
          this.bonusTypesModel = response.result as BonusType[];

        }
      })
    }

  getSalaryPeriod() {
    this.salarySetupService.getAllperiod().subscribe((response: ApiResponse) => {
      if (response.status) {
        this.salaryPeriod = response.result as SalaryPeriodModel[];
      }

    })
  }
  getSalaryHead() {
    this.salarySetupService.getAllSalaryHead().subscribe((response: ApiResponse) => {
      if (response.status) {
        let allSalaryHead:SalaryHead[] = response.result as SalaryHead[];
        this.salaryHeadModel = allSalaryHead.filter(c => c.id == 43 );
      }
    })
  }
  addNewEmpRow(empCode:string){
    if(empCode===""){
      return;
    }
    this.empService.getEmployment(empCode, this.companyId).subscribe(
    (response:ApiResponse)=>{
      if(response.status){
        let emp = response.result as SearchEmployee;
        this._shiftAutoAllowanceform.push(
          new FormGroup({
            id: new FormControl(0,[]),
            empCode : new FormControl(emp.empCode, [Validators.required]),
            empName : new FormControl(emp.empName, []),
            department : new FormControl(emp.department, []),
            designation : new FormControl(emp.designation, []),
            qty : new FormControl(0, []),
            note : new FormControl(null, [])
          })
        )
      }
    })
  }


  getEmpInfoInRow(rowIndex:number,empCode:string){
    if(empCode=="")
    {
      this._shiftAutoAllowanceform.controls[rowIndex].patchValue({
              empCode:null,
              empName:null,
              department:null,
               designation:null
            });
            return;
    }else{
      this.empService.getEmployment(empCode, this.companyId).subscribe(
        (response:ApiResponse)=>{
          if(response.status){
            let emp = response.result as SearchEmployee;

            this._shiftAutoAllowanceform.controls[rowIndex].patchValue({
              empName: emp.empName,
              department: emp.department,
              designation: emp.designation,
              depertmentID:emp.departmentID

            })
          }else{
            this._shiftAutoAllowanceform.controls[rowIndex].patchValue({
              empName: null,
              department: null,
              designation: null
            })
          }
        });
    }

  }
  addRow(){
    this._shiftAutoAllowanceform.push(
      new FormGroup({
        empCode : new FormControl(null, [Validators.required]),
        empName : new FormControl(null, []),
        department : new FormControl(null, []),
        designation : new FormControl(null, []),
       amount : new FormControl(null, [Validators.required])

      })
    )
  }

  removeRow(rowIndex:number){
    this._shiftAutoAllowanceform.removeAt(rowIndex);
  }

  onSubmit(){
    this._isSubmitted = true;
    if(this.f.periodID.invalid && this.f.bonusType.invalid && this.f.salaryHeadID.invalid && this.f.dateNgb.invalid || this._shiftAutoAllowanceform.invalid ){
      this.toaster.error('Please, Fill all required field!', 'Invalid Submission!');
      return;
    }

    let autoshiftallw = new ShiftAllowanceAuto();
    autoshiftallw=this.shiftAutoFormgroup.value;
    autoshiftallw.details=this._shiftAutoAllowanceform.value;
    if(autoshiftallw.details.length==0){
      return;
    }else{
      this.shiftAllowanceService.saveAutoShift(autoshiftallw).subscribe((response:ApiResponse)=>{
        if(response.status){
          this.toaster.success(response.result);
          this.reset();
        }else{
          this.toaster.error(response.result, 'Failed')
        }
      })
    }

  }
createForm(){
  this.shiftAutoFormgroup=this.formBuilder.group({
    id  :[0,[]],
    periodID :[,[Validators.required]],
    salaryHeadID :[,[Validators.required]],
    bonusType :[,[Validators.required]],
    companyID :[this.companyId,[]],
    depertmentID :[,[]],
    branchID:[,[]],
    unite:[,[]],
    line:[,[]],
    strDate:[,[]]  ,
    startDateNgb :[,[Validators.required]],
    enddate:[,[]],
    endDateNgb:[,[Validators.required]],
    gradeValue:[this.gradeValue,[]],
    date:[,[]],
    dateNgb:[,[Validators.required]]

  })
}
get f(){
  return this.shiftAutoFormgroup.controls;
}
get formVal(){
  return this.shiftAutoFormgroup.value;
}
get arryF(){
  return this._shiftAutoAllowanceform.controls;
}
reset(){
  this._isSubmitted=false;
  this.shiftAutoFormgroup.reset();
  this.createForm();
 this.productionline=[];


}
}
