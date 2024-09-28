import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { EmployeeForApprisal } from '../../../models/Apprisal/employee-for-apprisal';
import { QuarterModel } from '../../../models/Apprisal/quarter-model';
import { ApiResponse } from '../../../models/response.model';
import { SalaryYear } from '../../../models/SalarySetup/salary-year';
import { ApprisalService } from '../../../services/Apprisal/apprisal.service';
import { AuthService } from '../../../services/auth.service';
import { EmployeeService } from '../../../services/hr/employee.service';

@Component({
  selector: 'app-reset-status',
  templateUrl: './reset-status.component.html',
  styleUrls: ['./reset-status.component.scss', '../../../../vendor/libs/ng-select/ng-select.scss']
})
export class ResetStatusComponent implements OnInit {

  empCode = AuthService.getLoggedEmpCode();
  companyId = AuthService.getLoggedCompanyId();
  userId = AuthService.getLoggedUserId();
  years:any[]=[];
  quarters: QuarterModel[] = [];
  employees: EmployeeForApprisal[] = [];
  resetForm = {
    yearId: null,
    yearName: null,
    quarterId: null,
    quarterName:null,
    empCode: null,
    empName: null,
    userId:this.userId,
    companyId:this.companyId
  }
  constructor(
    private appriasalService: ApprisalService,
    private empService: EmployeeService,
    private toaster:ToastrService,
    public modalService:NgbModal
  ) { }
  ngOnInit() {
    this.getQuarter();
    this.getEmployeeCode();
    this.getYear();
  }
  getYear() {
    this.appriasalService.getYear().subscribe((response: ApiResponse) => {
      if (response.status) {
        this.years = response.result as SalaryYear[];
      }
    })
  }
  getQuarter() {
    this.appriasalService.getQuarter(this.empCode, this.companyId).subscribe((response: ApiResponse) => {
      if (response.status) {
        this.quarters = response.result as QuarterModel[];
      }
    })
  }
  getEmployeeCode() {
    this.empService.getEmpByBoss(this.empCode).subscribe((response: ApiResponse) => {
      if (response.status) {
        this.employees = (response.result as EmployeeForApprisal[])
          .map(emp => {
            emp.empName = emp.empCode + ' - ' + emp.empName;
            return emp;
          })
      }
      else {
        this.employees = [];
      }
    })
  }
  onChangeYear(year){
    if(year){
      this.resetForm.yearName = year.yearName;
    }
  }
  onChangeQuarter(quarter){
    if(quarter){
      this.resetForm.quarterName = quarter.shortName;
    }
  }
  onChangeEmployee(employee){
    if(employee){
      this.resetForm.empName = employee.empName;
    }
  }

  resetKpi(){
      this.appriasalService.resetKpi(this.resetForm)
    .subscribe((response:any)=>{
      if(response.status){
        this.toaster.success('Kpi reset successfully');
        this.modalService.dismissAll();
      }
    },err=>{
      this.toaster.error('An Error occured');
      this.modalService.dismissAll();
    })
  }
  resetAppriasal(){
    this.appriasalService.resetAppriasal(this.resetForm)
    .subscribe((response:any)=>{
      if(response.status){
        this.toaster.success('Appriasal reset successfully');
        this.modalService.dismissAll();
      }
    },err=>{
      this.toaster.error('An Error occured');
      this.modalService.dismissAll();
    })
  }
  openConfirmModal(modal){
    if(this.isValid()){
      this.modalService.open(modal);
    }
  }
  isValid():boolean{
    if(!this.resetForm.yearId){
      this.toaster.error('Select Year.');
      return false;
    }
    else if(!this.resetForm.quarterId){
      this.toaster.error('Select Quarter.');
      return false;
    }
    else if(!this.resetForm.empCode){
      this.toaster.error('Select Employee.');
      return false;
    }
    else{
      return true;
    }
  }
}
