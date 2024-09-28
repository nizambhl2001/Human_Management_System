import { AuthService } from './../../../services/auth.service';
import { DetailsPayscaleSetup } from './../../../models/SalarySetup/payscale-setup-details.model';
import { SalaryYear } from './../../../models/SalarySetup/salary-year';
import { SalaryGradeService } from './../../../services/system-setup/slary-grade.service';
import { PayscaleSetup } from './../../../models/SalarySetup/payscale-setup.model';
import { ApiResponse } from './../../../models/response.model';
import { FormBuilder, FormGroup, FormArray, FormControl, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Pagination } from '../../../shared/paginate';
import { SalaryGradeModel } from '../../../models/system-setup/salary-grader.model';
import { EmpTypeModel } from '../../../models/system-setup/EmpType.model';
import { EmpTypeService } from '../../../services/system-setup/EmpType.service';
import { SalarySetupService } from '../../../services/SalarySetup/salary-setup.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-payscal-setup',
  templateUrl: './payscal-setup.component.html',
  styleUrls: ['./payscal-setup.component.scss','../../../../vendor/libs/ng-select/ng-select.scss','../../../../vendor/libs/angular2-ladda/angular2-ladda.scss']
})
export class PayscalSetupComponent extends Pagination implements OnInit {

  constructor(
    private formBuilder:FormBuilder,
    private salaryGradeES:SalaryGradeService,
    private empTypeES:EmpTypeService,
    private salarySetupService:SalarySetupService,
    private toaster:ToastrService
  ) {
    super()
    this._payscaleSetupDetails=this.formBuilder.array([]);
  }
payscaleSetupForm:FormGroup;
_payscaleSetupDetails:FormArray;
payscalesetupmodel:PayscaleSetup[]=[];
payscalesetupshowdata:PayscaleSetup[]=[];
allSalaryGrade:SalaryGradeModel[]=[];
allEmployeeType:EmpTypeModel[]=[];
compID:number;
salaryYear:SalaryYear[]=[];
isSearchBtnClick:boolean = false;
isSaveBtnClick:boolean = false;
isLoading:boolean = false;


  ngOnInit() {
    this.items=[];
    this.update;
    this.compID=AuthService.getLoggedCompanyId();
    this.createpayscalesetupform();
    this.AllSalaryGrade();
    this.AllEmployeeType();
    this.AllSalaryYear();
    this.addrow();
  }
  AllEmployeeType(){
    this.empTypeES.GetEmpType().subscribe((response:ApiResponse)=>{
      if(response.status){
        this.allEmployeeType=response.result as  EmpTypeModel[];
      }
    })
  }
  AllSalaryGrade() {
    this.salaryGradeES.GetSalaryGrade().subscribe((response:ApiResponse) => {
      if (response.status) {
        this.allSalaryGrade = response.result as SalaryGradeModel[];
      }
    })
  }
  AllSalaryYear(){
    this.salarySetupService.getAllSalaryYear().subscribe((response:ApiResponse)=>{
      if(response.status){
        this.salaryYear = response.result as SalaryYear[];
      }
    })
    }
  getall(){
    this.isSearchBtnClick = true;
    if(this.payscaleSetupForm.get('gradeName').invalid){
      this.toaster.error('Fill all required field!', 'Invalid Submission!');
      return;
    }
    this.isLoading = true;
    let frmcontrol=this.payscaleSetupForm.value;
    this.salarySetupService.getPayscalesetup(frmcontrol.gradeName,this.compID).subscribe((response:ApiResponse)=>{
      if(response.status){
        console.log("payscale",response.result)
        this.isSearchBtnClick = false;
        this.isLoading = false;
        let payscalesetupshowdata=response.result as DetailsPayscaleSetup[];
        this._payscaleSetupDetails=this.formBuilder.array([])
        payscalesetupshowdata.forEach(item=>{
          this._payscaleSetupDetails.push(
            new FormGroup({
              gradeDescription:new FormControl(item.gradeDescription,[]),
              incrementAmount:new FormControl(item.incrementAmount,[]),
              basic :new FormControl(item.basic,[]),
              hrent :new FormControl(item.hrent,[]),
              da :new FormControl(item.da,[]),
              others :new FormControl(item.others,[]),
              convance :new FormControl(item.convance,[]),
              medicale :new FormControl(item.medicale,[]),
              beverage :new FormControl(item.beverage,[]),
              incentive :new FormControl(item.incentive,[]),
              entertainment :new FormControl(item.entertainment,[]),
            })
          )
        })
      }
      else{
        this.toaster.error(response.result)
        this.isLoading = false;
      }
    })
  }


  onSubmit(){
    this.isSaveBtnClick = true;
    if(this.payscaleSetupForm.invalid || this._payscaleSetupDetails.invalid){
      this.toaster.error('Fill all required field!', 'Invalid Submission!');
      return;
    }
    let frmCon=this.payscaleSetupForm.value;
    let payscalesetup:PayscaleSetup = new PayscaleSetup();
    payscalesetup=frmCon;
    payscalesetup.details = this._payscaleSetupDetails.value;
    this.salarySetupService.savePayscaleSetup(payscalesetup,1).subscribe((response:ApiResponse)=>{
      if(response.status){
        this.isSaveBtnClick = false;
        this.toaster.success(response.result, 'Success!');
      }else{
        this.toaster.error(response.result, 'Failed!');
      }
    })

  }
addrow(){
  this._payscaleSetupDetails.push(
    new FormGroup({
              id:new FormControl(0,[]),
              gradeDescription:new FormControl(0,[]),
              incrementAmount:new FormControl(0,[]),
              basic :new FormControl(0,[]),
              hrent :new FormControl(0,[]),
              da :new FormControl(0,[]),
              others :new FormControl(0,[]),
              convance :new FormControl(0,[]),
              medicale :new FormControl(0,[]),
              beverage :new FormControl(0,[]),
              incentive :new FormControl(0,[]),
              entertainment :new FormControl(0,[]),
    })
  )
}
get formVal(){
  return this._payscaleSetupDetails.value;
}
  removeRow(rowIndex){
    this._payscaleSetupDetails.removeAt(rowIndex);
  }
createpayscalesetupform(){
    this.payscaleSetupForm=this.formBuilder.group({
      id:[0,[]],
      gradeValue :[,[Validators.required]],
      gradeName :[,[Validators.required]],
      payscaleYear :[,[Validators.required]] ,
      companyID:[this.compID,[]],
      gradeSerial :[-1,[]]

    })
  }
  reset(){
    this._payscaleSetupDetails = this.formBuilder.array([])
    this.addrow();
  }

}
