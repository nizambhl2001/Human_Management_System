import { AuthService } from './../../../services/auth.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ApiResponse } from './../../../models/response.model';
import { ToastrService } from 'ngx-toastr';
import { NgbDateCustomParserFormatter } from './../../../shared/dateformat';
import { GratuityYearSetupComponent } from './../../settlement/gratuity-year-setup/gratuity-year-setup.component';
import { Component, OnInit } from '@angular/core';
import { EmpGenInfo } from '../../../models/hr/emp-gen-info.model';
import { EmployeeService } from '../../../services/hr/employee.service';
import { Employment } from '../../../models/hr/employment.model';
import { EmploymentService } from '../../../services/hr/employment.service';
import { NgbDateParserFormatter, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { PropertyService } from '../../../services/property.service';
import { TaxAssain } from '../../../models/Property/tax-assain.model';
import { EmployeeViewModel } from '../../../models/hr/emp-view.model';
import { Pagination } from '../../../shared/paginate';
import { SearchEmployee } from '../../../models/hr/search-emp.model';

@Component({
  selector: 'app-vehicle-tax-assagin',
  templateUrl: './vehicle-tax-assagin.component.html',
  styleUrls: ['./vehicle-tax-assagin.component.scss']
})
export class VehicleTaxAssaginComponent extends Pagination implements OnInit {
  compId:number;
  isSubmitted=false;
  gradeValue:number;
  employmentInfo:Employment=new Employment();
  taxAssainForm:FormGroup;
  taxAssain:TaxAssain=new TaxAssain();
  btnStatus:string="Save";
  empSearchKeys: SearchEmployee = new SearchEmployee();
  constructor(
    private employmentService:EmploymentService,
    private propService:PropertyService,
    private toastrService:ToastrService,
    private formBuilder:FormBuilder,
    private employmentES:EmploymentService,
    private empService: EmployeeService,
    private dateFormate:NgbDateCustomParserFormatter,
    private modalService:NgbModal,
    private dateformat:NgbDateCustomParserFormatter)
    {
      super();
    }

  ngOnInit() {
    this.compId=AuthService.getLoggedCompanyId();
    this.gradeValue=AuthService.getLoggedGradeValue();
    this.createForm();
  }
  getById(empCode:string){
    if(empCode==""){
      return;
    }
   this.propService.TaxAssainGetById(empCode,1).subscribe((response:ApiResponse)=>{
     if(response.status){
      let tax=response.result as TaxAssain;
      tax.joiningDateNgb=this.dateFormate.stringToNgbDate(tax.joiningDate);
      tax.assainDateNgb=this.dateformat.stringToNgbDate(tax.assainDate);
      this.taxAssainForm.setValue(tax);
      this.cancel();
     }
     else{
      this.reset();
      this.f.empCode.setValue(empCode);
    }
   })
  }
  getEmpInfo(empCode:string){
    if (empCode == "") {
      this.reset();
      return;
    }
    this.employmentES.getEmployment(empCode,this.compId).subscribe((response:ApiResponse)=>{
      let empInfo=response.result as Employment;
      this.taxAssainForm.patchValue({
       empCode:empInfo.empCode,
       empName:empInfo.empName,
       department:empInfo.department,
       designation:empInfo.designation,
       joiningDateNgb:this.dateFormate.stringToNgbDate(empInfo.joinDate)
     })
    })
  }
  save(){
    this.isSubmitted=true;
    if(this.taxAssainForm.invalid){
      this.toastrService.warning("Fill All RequiredField");
    }
    else{
    this.f.joiningDate.setValue(this.dateFormate.ngbDateToDate(this.f.joiningDateNgb.value).toLocaleDateString());
    this.f.assainDate.setValue(this.dateFormate.ngbDateToDate(this.f.assainDateNgb.value).toLocaleDateString());
    this.propService.saveTaxAssain(this.taxAssainForm.value).subscribe((response:ApiResponse)=>{
      if(response.status){
        this.toastrService.success(response.result,"Success");
        this.reset();
        this.isSubmitted=false;
        this.btnStatus="Save";
          }
          else{
            this.toastrService.error(response.result,"Error");
          }
    })
  }
  }
  searchEmployees() {
    this.empSearchKeys.companyID = this.compId;
    this.empSearchKeys.gradeValue = this.gradeValue;
    this.empService.searchEmployee(this.empSearchKeys).subscribe((response: ApiResponse) => {
      if (response.status) {
        this.perPage = 10;
        this.items = response.result as EmployeeViewModel[];
        this.update();
      }
    })
  }
 createForm(){
   this.taxAssainForm=this.formBuilder.group({
  id:[,[]],
  empCode:[,[Validators.required]],
  empName:[,[]],
  department:[,[]],
  designation:[,[]],
  joiningDate:[,[]],
  joiningDateNgb:[,[]],
  assainDate:[,[]],
  assainDateNgb:[,[Validators.required]],
  type:[0,[Validators.required]],
  active:[0,[Validators.required]],
  companyID:[this.compId,[]]
   })
 }
 get f(){
  return this.taxAssainForm.controls;
 }
  cancel(){
    this.modalService.dismissAll();
  }
  reset(){
    this.createForm();
    this.isSubmitted=false;
  }
  get formVal(){
    return this.taxAssainForm.value;
  }
}
