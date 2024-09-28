import { AuthService } from './../../../services/auth.service';
import { AdditionAllowance } from './../../../models/Addition/addition-allowance.model';
import { SalarySetupService } from './../../../services/SalarySetup/salary-setup.service';
import { AdditionAllowanceService } from './../../../services/Addition/addition-allowance.service';
import { DriverAllowanceModel } from './../../../models/Addition/driver-allowance.model';
import { DriverAllowace } from './../../../models/Addition/driver-addition-allowance.model';
import { BasicEntryService } from './../../../services/system-setup/basic-entry.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiResponse } from './../../../models/response.model';
import { Pagination } from './../../../shared/paginate';
import { Component, OnInit } from '@angular/core';
import { SalaryHead } from '../../../models/SalarySetup/salary-head';
import { SalaryPeriodModel } from '../../../models/SalarySetup/SalaryPeriod';
import { BasicEntry } from '../../../models/system-setup/basic-entry.model';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-driver-allowance',
  templateUrl: './driver-allowance.component.html',
  styleUrls: ['./driver-allowance.component.scss', '../../../../vendor/libs/ng-select/ng-select.scss']
})
export class DriverAllowanceComponent extends Pagination implements OnInit {

  constructor(
    private addtionAllowanceService: AdditionAllowanceService,
    private salaryheadService: SalarySetupService,
    private salaryPeriodService: SalarySetupService,
    private formBuilder: FormBuilder,
    private basicEntryService: BasicEntryService,
    private toaster:ToastrService,
    private additionAllowanceService:AdditionAllowanceService
  ) {
    super();
  }

  salaryHeadModel: SalaryHead[] = [];
  salaryPeriod: SalaryPeriodModel[] = [];
  driverAllowanceForm: FormGroup;
  departments: BasicEntry[] = [];
  driverAllowanceModel: AdditionAllowance[] = [];
  isGetAllBtnClick=false;
  isSaveBtnClick=false;
  companyId: number = 1;
  grade: number ;
  usertypeID:number;
  additionshowdata:AdditionAllowance[]=[];
  allAdditionAllowance:AdditionAllowance[]=[];
  title = "Driver Allowance";
  ngOnInit() {
    this.items = [];
    this.update();
    this.grade=AuthService.getLoggedGradeValue();
    this.usertypeID=AuthService.getLoggedUserTypeId();
    this.companyId=AuthService.getLoggedCompanyId();
    this.getSalaryPeriod();
    this.getSalaryHead();
    this.createForm();
    this.getDepartmentName();
  }
  getSalaryHead() {
    this.salaryheadService.getAllSalaryHead().subscribe((response: ApiResponse) => {
      if (response.status) {
        let allSalaryHead:SalaryHead[] = response.result as SalaryHead[];
        this.salaryHeadModel = allSalaryHead.filter(c => c.id == 40 );
      }
    })
  }
  getSalaryPeriod() {
    this.salaryPeriodService.getAllperiod().subscribe((response: ApiResponse) => {
      if (response.status) {
        this.salaryPeriod = response.result as SalaryPeriodModel[];
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
    let driverAllowance = this.allAdditionAllowance.filter(c => c.department == deptName);
    this.additionshowdata=driverAllowance;
  }
  GetAll(){
    this.isGetAllBtnClick=true;
    if( this.f.salaryHeadID.invalid){
      this.toaster.error("Please fill all required fields","Invalid submition");
      return;
    }
    let addAllowance=new AdditionAllowance();
    addAllowance=this.driverAllowanceForm.value;
  this.additionAllowanceService.getAllEmployeeAllowance(addAllowance).subscribe((response:ApiResponse)=>{
    if(response.status){
      this.additionshowdata=response.result as AdditionAllowance[];
      this.allAdditionAllowance=response.result as AdditionAllowance[];
    }else{
      this.toaster.error("No Data Found");
      this.additionshowdata=[];
    }
  })
}



  removeDriver(empCode: string) {
    let index = this.additionshowdata.findIndex(c => c.empCode == empCode);
    this.additionshowdata.splice(index, 1);
  }


saveOrUpdate() {
  this.isSaveBtnClick=true;
  this.isGetAllBtnClick=true;
  if(this.f.periodID.invalid ){
    this.toaster.error("Please fill all required field","Invalid submition");
    return;
  }
  let drvAllowance:DriverAllowanceModel = new DriverAllowanceModel();
  drvAllowance=this.driverAllowanceForm.value;
  drvAllowance.taxYearID=this.salaryPeriod.find(c=>c.id==this.f.periodID.value).taxYearID;
  drvAllowance.periodName=this.salaryPeriod.find(c=>c.id==this.f.periodID.value).periodName;
   drvAllowance.selectedDriver = this.allAdditionAllowance;
   console.log(drvAllowance);
  this.addtionAllowanceService.saveUpdateDriverAllowance(drvAllowance).subscribe((response: ApiResponse) => {
    if (response.status) {
      this.toaster.success("Saved Successfully", "Success!");
      this.reset();
    }
    else {
      this.toaster.error(response.result, "Failed!");
    }
  })
}
reset() {
  this.isGetAllBtnClick=false;
  this.isSaveBtnClick=false;
  this.driverAllowanceForm.reset();
  this.createForm();
  this.additionshowdata=[];

  }
  createForm() {
    this.driverAllowanceForm = this.formBuilder.group({
      id: [0,[]],
      salaryHeadID: [,[Validators.required]],
      periodID: [, [Validators.required]],
      companyID: [this.companyId,[]],
      department: [,[]] ,
      grade:[this.grade,[]],
      periodName:[null,[]],
      usertypeID:[this.usertypeID,[]]  ,
      empCode:[null,[]]


    })
  }
  get f() {
    return this.driverAllowanceForm.controls;
  }
}

