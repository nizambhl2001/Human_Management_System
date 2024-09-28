import { AuthService } from './../../../services/auth.service';
import { SearchEmployee } from './../../../models/hr/search-emp.model';
import { NgbDateCustomParserFormatter } from './../../../shared/dateformat';
import { EarnLeaveBalance } from './../../../models/leave/earn-leave-balance.model';
import { LeaveType } from './../../../models/leave/leave-type.model';
import { SalarySetupService } from './../../../services/SalarySetup/salary-setup.service';
import { ApiResponse } from './../../../models/response.model';
import { BasicEntryService } from './../../../services/system-setup/basic-entry.service';
import { BasicEntry } from './../../../models/system-setup/basic-entry.model';
import { Component, OnInit } from '@angular/core';
import { Pagination } from '../../../shared/paginate';
import { SalaryYear } from '../../../models/SalarySetup/salary-year';
import { LeaveService } from '../../../services/leave.service';
import { FormGroup, FormBuilder, FormArray, FormControl, Validators } from '@angular/forms';
import { EarnLeaveBalanceDetails } from '../../../models/leave/earn-leave-balance-details.model';
import { ToastrService } from 'ngx-toastr';
import { EmploymentService } from '../../../services/hr/employment.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { min } from 'rxjs/operators';

@Component({
  selector: 'app-emp-leave-opening-balance',
  templateUrl: './emp-leave-opening-balance.component.html',
  styleUrls: ['./emp-leave-opening-balance.component.scss', '../../../../vendor/libs/ng-select/ng-select.scss']
})
export class EmpLeaveOpeningBalanceComponent extends Pagination implements OnInit {


  _compId:number;
  _grade:number;
  _departments:BasicEntry[]=[];
  _designations:BasicEntry[]=[];
  _jobLocations:BasicEntry[]=[];
  _salaryYears:SalaryYear[]=[];
  _leaveTypes:LeaveType[]=[];
  _isSubmitted:boolean=false;
  _btnStatus:string = 'Save';

  _earnLeaveBalanceForm:FormGroup;
  _earnLeaveBalanceDetailsForm:FormArray;

  constructor(
    private basicService:BasicEntryService,
    private salaryService:SalarySetupService,
    private leaveService:LeaveService,
    private fb:FormBuilder,
    private dateFormat: NgbDateCustomParserFormatter,
    private toaster:ToastrService,
    private empService:EmploymentService,
    private modalService:NgbModal
  ) {
    super();
    this._earnLeaveBalanceDetailsForm = this.fb.array([]);
   }
  ngOnInit() {
    this._compId=AuthService.getLoggedCompanyId();
    this.sortBy='description';
    this.sortDesc = false;
    this._grade = AuthService.getLoggedGradeValue();

    this.createForm();
    this.addRow();
    this.getDepartments();
    this.getDesignations();
    this.getJobLocations();
    this.getSalaryYears();
    this.getLeaveTypes();
  }

  getDepartments(){
    this.basicService.getDepartment().subscribe((response:ApiResponse)=>{
      if(response.status){
        this._departments = response.result as BasicEntry[];
        this.sort(this._departments);
      }
    })
  }
  getDesignations(){
    this.basicService.getDesignation().subscribe((response:ApiResponse)=>{
      if(response.status){
        this._designations = response.result as BasicEntry[];
        this.sort(this._designations);
      }
    })
  }
  getJobLocations(){
    this.basicService.getBranch().subscribe((response:ApiResponse)=>{
      if(response.status){
        this._jobLocations = (response.result as BasicEntry[]);
        this.sort(this._jobLocations);
      }
    })
  }
  getSalaryYears(){
    this.salaryService.getAllSalaryYear().subscribe((response:ApiResponse)=>{
      if(response.status){
        this._salaryYears =  response.result as SalaryYear[];
        this.sortBy = 'yearName';
        this.sort(this._salaryYears);
      }
    })
  }
  getLeaveTypes(){
    this.leaveService.getLeaveType(-1,0).subscribe((response:ApiResponse)=>{
      if(response.status){
        this._leaveTypes = response.result as LeaveType[];
        this.sortBy = 'typeName';
        this.sort(this._leaveTypes);
      }
    })
  }
  getForEdit(){
    this._btnStatus = 'Update';
    this._isSubmitted = true;
    if(this._earnLeaveBalanceForm.invalid){
      this.toaster.error('Please, Fill all required field!', 'Invalid Submission!');
      return;
    }
    let frm = this._earnLeaveBalanceForm.value;
    let filterModel = new EarnLeaveBalance();
    filterModel.department = frm.department;
    filterModel.designation = frm.designation;
    filterModel.jobLocation = frm.jobLocation;
    filterModel.date = this.dateFormat.ngbDateToDate(frm.dateNgb).toLocaleDateString();
    filterModel.yearID = frm.yearID;
    filterModel.lType = frm.lType;
    filterModel.companyID = frm.companyID;
    filterModel.grade = frm.grade;
    this.leaveService.getEarnLeaveBalance(filterModel)
    .subscribe((response:ApiResponse)=>{
      if(response.status){
        let result = response.result as EarnLeaveBalanceDetails[];
        this._earnLeaveBalanceDetailsForm = this.fb.array([]);
        result.forEach(item=>{
          this.empService.getEmployment(item.empCode, this._compId).subscribe((response:ApiResponse)=>{
            if(response.status){
              this._earnLeaveBalanceDetailsForm.push(
                new FormGroup({
                  id: new FormControl(item.id,[]),
                  empCode : new FormControl(item.empCode, [Validators.required]),
                  empName : new FormControl(item.empName, []),
                  department : new FormControl(response.result.department, []),
                  designation : new FormControl(response.result.designation, []),
                  qty : new FormControl(item.qty, []),
                  note : new FormControl(item.note, [])
                })
              )
            }
          })
        })
      }else{
        this.toaster.error(response.result, 'Failed!');
        this._earnLeaveBalanceDetailsForm = this.fb.array([]);
      }
    })
  }
  onEmpSearchClick(modal:any){
    this.modalService.open(modal);
  }
  addNewEmpRow(empCode:string){
    if(empCode===""){
      return;
    }
    this.empService.getEmployment(empCode, this._compId).subscribe(
    (response:ApiResponse)=>{
      if(response.status){
        let emp = response.result as SearchEmployee;
        this._earnLeaveBalanceDetailsForm.push(
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
  getEmpInfoInRow(rowIndex:number, empCode:string){
    if(empCode===""){
      return;
    }
    this.empService.getEmployment(empCode, this._compId).subscribe(
    (response:ApiResponse)=>{
      if(response.status){
        let emp = response.result as SearchEmployee;
        this._earnLeaveBalanceDetailsForm.controls[rowIndex].patchValue({
          empName: emp.empName,
          department: emp.empName,
          designation: emp.designation
        })
      }else{
        this._earnLeaveBalanceDetailsForm.controls[rowIndex].patchValue({
          empName: null,
          department: null,
          designation: null
        })
      }
    });
  }
  removeRow(rowIndex:number){
    this._earnLeaveBalanceDetailsForm.removeAt(rowIndex);
  }
  onSubmit(){
    this._isSubmitted = true;
    if(this._earnLeaveBalanceForm.invalid || this._earnLeaveBalanceDetailsForm.invalid){
      this.toaster.error('Please, Fill all required field!', 'Invalid Submission!');
      return;
    }
    let frm = this._earnLeaveBalanceForm.value;
    let openingBalance = new EarnLeaveBalance();
    openingBalance.department = frm.department;
    openingBalance.designation = frm.designation;
    openingBalance.jobLocation = frm.jobLocation;
    openingBalance.date = this.dateFormat.ngbDateToDate(frm.dateNgb).toLocaleDateString();
    openingBalance.yearID = frm.yearID;
    openingBalance.lType = frm.lType;
    openingBalance.companyID = frm.companyID;
    openingBalance.details = this._earnLeaveBalanceDetailsForm.value;
    this.leaveService.saveOrUpdateOpeningBalance(openingBalance).subscribe((response:ApiResponse)=>{
      if(response.status){
        this.toaster.success(response.result);
        this._earnLeaveBalanceDetailsForm = this.fb.array([]);
        this._isSubmitted = false;
      }else{
        this.toaster.error(response.result, 'Failed')
      }
    })
  }
  createForm(){
    this._earnLeaveBalanceForm = this.fb.group({
      id: [,[]],
      lType: [,[Validators.required]],
      yearID: [,[Validators.required]],
      dateNgb: [,[Validators.required]],
      note: [,[]],
      companyID: [this._compId,[]],
      empCode: [,[]],
      department:[,[]],
      designation:[,[]],
      jobLocation:[,[]],
      qty: [,[]],
      grade: [this._grade,[]]
    })
  }
  addRow(){
    this._earnLeaveBalanceDetailsForm.push(
      new FormGroup({
        id : new FormControl(0, []),
        empCode : new FormControl(null, [Validators.required]),
        empName : new FormControl(null, []),
        department : new FormControl(null, []),
        designation : new FormControl(null, []),
        qty : new FormControl(0, []),
        note : new FormControl(null, [])
      })
    )
  }

}
