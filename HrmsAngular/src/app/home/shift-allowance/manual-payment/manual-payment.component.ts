import { AuthService } from './../../../services/auth.service';
import { SalarySetupService } from './../../../services/SalarySetup/salary-setup.service';
import { AdditionAllowanceService } from './../../../services/Addition/addition-allowance.service';
import { NgbDateCustomParserFormatter } from './../../../shared/dateformat';
import { ShiftAllowanceService } from './../../../services/ShiftAllowance/shift-allowance.service';
import { EmploymentService } from './../../../services/hr/employment.service';
import { FormBuilder, Validators, FormGroup, FormArray, FormControl } from '@angular/forms';
import { SalaryHead } from './../../../models/SalarySetup/salary-head';
import { SalaryPeriodModel } from './../../../models/SalarySetup/SalaryPeriod';
import { BonusType } from './../../../models/Addition/bonus-types';
import { Pagination } from './../../../shared/paginate';
import { Component, OnInit } from '@angular/core';
import { ApiResponse } from '../../../models/response.model';
import { SearchEmployee } from '../../../models/hr/search-emp.model';
import { ShiftAllowanceAuto } from '../../../models/ShiftAllowance/shiftauto-allowance.model';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-manual-payment',
  templateUrl: './manual-payment.component.html',
  styleUrls: ['./manual-payment.component.scss','../../../../vendor/libs/ng-select/ng-select.scss']
})
export class ManualPaymentComponent extends Pagination implements OnInit {
  constructor(
    private driverallwBonusService:AdditionAllowanceService,
    private salarySetupService:SalarySetupService,
    private formBuilder:FormBuilder,
    private empService:EmploymentService,
    private shiftAllowanceService:ShiftAllowanceService,
    private dateFrmat:NgbDateCustomParserFormatter,
    private toaster:ToastrService
  ) {
    super();
    this._shiftManualAllowance=this.formBuilder.array([]);
  }
  title="Shift Allowance Manual Payment"
  bonusTypesModel:BonusType[]=[];
  salaryPeriod:SalaryPeriodModel[]=[];
  salaryHeadModel:SalaryHead[]=[];
  shiftManualAllowanceForm:FormGroup;
  companyId:number;
  _shiftManualAllowance:FormArray;
allshowdata:SearchEmployee[]=[];
removableitem:SearchEmployee[]=[];
  _isSubmitted:boolean;

  ngOnInit() {
    this.items = [];
    this.update();
    this.companyId=AuthService.getLoggedCompanyId();
    this.createForm();
    this.getAllBonusType();
    this.getSalaryHead();
    this.getSalaryPeriod();
    this.addRow();
    this._isSubmitted=false;
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
        console.log(response.result);
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
        this._shiftManualAllowance.push(
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


  getEmpInfoInRow(empCode:string,rowIndex:number){
    if(empCode===""){
      this._shiftManualAllowance.controls[rowIndex].patchValue({
        empCode:null,
        empName:null,
        department:null,
         designation:null
      });
      return;
    }
    this.empService.getEmployment(empCode, this.companyId).subscribe(
    (response:ApiResponse)=>{
      if(response.status){
        let emp = response.result as SearchEmployee;
        this.allshowdata=response.result as SearchEmployee[];
        this._shiftManualAllowance.controls[rowIndex].patchValue({
          empName: emp.empName,
          department: emp.department,
          designation: emp.designation,
          depertmentID:emp.departmentID

        })
      }else{
        this._shiftManualAllowance.controls[rowIndex].patchValue({
          empName: null,
          department: null,
          designation: null
        })
      }
    });
  }

  addRow(){
    this._shiftManualAllowance.push(
      new FormGroup({
        id : new FormControl(0, []),
        empCode : new FormControl(null, [Validators.required]),
        empName : new FormControl(null, []),
        department : new FormControl(null, []),
        designation : new FormControl(null, []),
       amount : new FormControl(null, [Validators.required]),
       depertmentID:new FormControl(-1,[])
      })
    )
  }

  removeRow(rowIndex:number){
    this._shiftManualAllowance.removeAt(rowIndex);
  }

  onSubmit(){
    this._isSubmitted = true;
    if(this.shiftManualAllowanceForm.invalid || this._shiftManualAllowance.invalid){
      this.toaster.error('Please, Fill all required field!', 'Invalid Submission!');
      return;
    }
    let autoshiftallw = new ShiftAllowanceAuto();
    autoshiftallw=this.shiftManualAllowanceForm.value;
    autoshiftallw.details=this._shiftManualAllowance.value;
    this.shiftAllowanceService.saveAutoShift(autoshiftallw).subscribe((response:ApiResponse)=>{
      if(response.status){
        this.toaster.success(response.result);
        this._shiftManualAllowance = this.formBuilder.array([]);
      }else{
        this.toaster.error(response.result, 'Failed')
      }
    })
  }


createForm(){
  this.shiftManualAllowanceForm =this.formBuilder.group({
    id  :[0,[]],
    periodID :[,[Validators.required]],
    salaryHeadID :[,[Validators.required]],
    bonusType :[,[Validators.required]],
    companyID :[this.companyId,[]],
    date:[,[]] ,
    dateNgb:[,[Validators.required]]

  })
}
get f(){
  return this.shiftManualAllowanceForm.controls;
}

}
