import { AuthService } from './../../../services/auth.service';
import { Pagination } from './../../../shared/paginate';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ApiResponse } from './../../../models/response.model';
import { Component, OnInit } from '@angular/core';
import { CasualJoiningService } from '../../../services/hr/casual-joining-service';
import { CasualJoiningDateModel } from '../../../models/hr/casual-joining-date.model';
import { ToastrService } from 'ngx-toastr';
import { NgbModal, NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { NgbDateCustomParserFormatter } from '../../../shared/dateformat';
import { group } from '@angular/animations';
import { EmployeeViewModel } from '../../../models/hr/emp-view.model';
import { EmployeeService } from '../../../services/hr/employee.service';
import { SearchEmployee } from '../../../models/hr/search-emp.model';
import { EmploymentService } from '../../../services/hr/employment.service';
import { Employment } from '../../../models/hr/employment.model';

@Component({
  selector: 'app-casual-join-date',
  templateUrl: './casual-join-date.component.html',
  styleUrls: ['./casual-join-date.component.scss']
})
export class CasualJoinDateComponent extends Pagination implements OnInit {
  compId:number;
  gradeValue:any;
  btnStatus:string="Save";
  isSubmitted:boolean = false;
  casualJoiningForm:FormGroup;
  empName:string;
  empSearchKeys: SearchEmployee = new SearchEmployee();
  constructor(
    private casualJoinES:CasualJoiningService,
    private toaster: ToastrService,
    private employmentES:EmploymentService,
    private dateFormat: NgbDateCustomParserFormatter,
    private frmBuilder: FormBuilder,
    private dateFormate:NgbDateCustomParserFormatter,
    private empService: EmployeeService,
    private modalService:NgbModal
    ) { super() }

  ngOnInit() {
  this.compId=AuthService.getLoggedCompanyId();
  this.gradeValue = AuthService.getLoggedGradeValue();
  this.createForm();
  }
  getCasualJoining(empCode:string){
    if(empCode==""){
      return;
    }
 this.casualJoinES.getAll(empCode,this.compId).subscribe((response:ApiResponse)=>{
   if(response.status){
    let casualJoin = response.result as CasualJoiningDateModel;
    casualJoin.joiningDateNgb = this.dateFormat.stringToNgbDate(casualJoin.joiningDate);
    casualJoin.casualJoiningDateNgb =this.dateFormat.stringToNgbDate(casualJoin.casualJoining);
    casualJoin.dateNgb = this.dateFormat.stringToNgbDate(casualJoin.date);
    if(casualJoin.casualJoiningDateNgb.year==1){
      casualJoin.casualJoiningDateNgb=null;
    }
    else if(casualJoin.dateNgb.year==1){
      casualJoin.dateNgb=null;
    }
    else{
      this.btnStatus="Update";
    }
    this.casualJoiningForm.setValue(casualJoin);
    this.cancel();
   }
   else{
    this.f.empCode.setValue(empCode);
   }
 })
  }
  getEmpInfo(empCode:string){
    if (empCode == "") {
      return;
    }
    this.employmentES.getEmployment(empCode,this.compId).subscribe((response:ApiResponse)=>{
      let empInfo=response.result as Employment;
      this.getByID(empCode);
      this.casualJoiningForm.patchValue({
       empCode:empInfo.empCode,
       empName:empInfo.empName,
       department:empInfo.department,
       designation:empInfo.designation,
       joiningDateNgb:this.dateFormate.stringToNgbDate(empInfo.joinDate)
     })
    })
  }
  saveUpdate(){
    this.isSubmitted = true;
    if(this.casualJoiningForm.invalid){
      this.toaster.warning("Please Fill All Required Field");
      return;
    }
    this.f.joiningDate.setValue(this.dateFormat.ngbDateToDate(this.f.joiningDateNgb.value).toLocaleDateString());
    this.f.casualJoining.setValue(this.dateFormat.ngbDateToDate(this.f.casualJoiningDateNgb.value).toLocaleDateString());
    this.f.date.setValue(this.dateFormat.ngbDateToDate(this.f.dateNgb.value).toLocaleDateString());
    this.f.companyID.setValue(this.compId);
    this.casualJoinES.saveUpdate(this.casualJoiningForm.value).subscribe((response:ApiResponse)=>{
      if(response.status){
        this.btnStatus="Update";
      this.toaster.success(response.result,"Success");
      this.reset();
      this.isSubmitted=false;
      }
      else{
        this.toaster.error(response.result,"Error");
      }
    })
  }
  getByID(empCode:string){
    this.casualJoinES.getDateById(empCode,this.compId).subscribe((response:ApiResponse)=>{
      if(response.status){
        this.btnStatus="Update";
      let data=response.result as CasualJoiningDateModel;
      this.casualJoiningForm.patchValue({
        casualJoiningDateNgb:this.dateFormate.stringToNgbDate(data.casualJoining),
        dateNgb:this.dateFormate.stringToNgbDate(data.date)
      })
    }
    else{
      this.f.casualJoiningDateNgb.setValue(null);
      this.f.dateNgb.setValue(null);
      this.btnStatus="Save";
    }
    })
  }
  createForm(){
    this.casualJoiningForm=this.frmBuilder.group({
      id:[,[]],
      companyID:[this.compId,[]],
      empCode: [, [Validators.required]],
      empName: [,[]],
      designation:[,[]],
      department:[,[]],
      joiningDate:[,[]],
      joiningDateNgb:[,[Validators.required]],
      casualJoining:[,[]],
      casualJoiningDateNgb:[,[Validators.required]],
      date:[,[]],
      dateNgb:[,[Validators.required]]
    })
  }
  get f(){
   return this.casualJoiningForm.controls;
  }
  get formVal(){
    return this.casualJoiningForm.value;
  }
  reset(){
    let empCode=this.casualJoiningForm.controls.empCode.value;
    this.createForm();
    this.isSubmitted=false;
    this.casualJoiningForm.controls.empCode.setValue(empCode);
    this.btnStatus="Save";
  }
  cancel(){
    this.modalService.dismissAll();
  }
}
