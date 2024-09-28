import { AuthService } from './../../../services/auth.service';
import { ToastrService } from 'ngx-toastr';
import { ApiResponse } from './../../../models/response.model';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { BonusPeriodModel } from '../../../models/bonusPeriod.model';
import { BonusSalaryHeadModel } from '../../../models/bonus/bonus-salary-head.model';
import { BonuSType } from '../../../models/bonus/bonusType.model';
import { BonusTypeService } from '../../../services/Bonus/bonusType.service';
import { BonusSelectService } from '../../../services/Bonus/bonus-select.service';
import { BonusPeriodService } from '../../../services/Bonus/bonus-period.service';
import { UploadBonusService } from '../../../services/Bonus/upload-bonus.service';

@Component({
  selector: 'app-upload-emp-payment',
  templateUrl: './upload-emp-payment.component.html',
  styleUrls: ['./upload-emp-payment.component.scss',
  '../../../../vendor/libs/angular-2-dropdown-multiselect/angular-2-dropdown-multiselect.scss',
  '../../../../vendor/libs/ng-select/ng-select.scss',
  '../../../../vendor/libs/angular2-ladda/ladda.scss'
]
})
export class UploadEmpPaymentComponent implements OnInit {
  compID:number;
  isSubmitted=false;
  gradeValue:number;
  _isProcessing:boolean;
  allBonusPeriod: BonusPeriodModel[] = [];
  allBonusAllowance: BonusSalaryHeadModel[] = [];
  allBonusType: BonuSType[] = [];
  uploadFormGroup:FormGroup;
  constructor
  (
    private BonusTypeES: BonusTypeService,
    private BonusSelectES: BonusSelectService,
    private BonusPeriodES: BonusPeriodService,
    private formBuilder:FormBuilder,
    private toasterService:ToastrService,
    private uploadBonusService:UploadBonusService
  ) { }

  ngOnInit() {
    this.compID=AuthService.getLoggedCompanyId();
    this.gradeValue=AuthService.getLoggedGradeValue();
    this.AllBonusType();
    this.AllBonusAllowance();
    this.AllBonusPeriod();
    this.createForm();
  }
  AllBonusType() {
    this.BonusTypeES.getBonusType().subscribe((response: ApiResponse) => {
      if (response.status) {
        this.allBonusType = response.result as BonuSType[];
      }
    })
  }
  AllBonusAllowance() {
    this.BonusSelectES.getBonusAllowance().subscribe((response: ApiResponse) => {
      if (response.status) {
        this.allBonusAllowance = response.result as BonusSalaryHeadModel[];
      }
    })
  }
  AllBonusPeriod() {
    this.BonusPeriodES.getBonusPeriod().subscribe((response: ApiResponse) => {
      if (response.status) {
        this.allBonusPeriod = response.result as BonusPeriodModel[];
      }
    })
  }
  onFileChange(files:FileList){
    this.uploadFormGroup.controls['excelFiles'].setValue(files);
    if(files.length==1){
        this.uploadFormGroup.controls['fileCount'].setValue(files[0].name);
        return;
    }
    this.uploadFormGroup.controls['fileCount'].setValue(files.length+' file attached');
  }

  onPeriodChange(period:any){
    this.uploadFormGroup.controls.periodName.setValue(period.periodName);
  }

  importFileData(){
    console.log( this.f.salaryHead.value,this.f.bonusType.value);
    this.isSubmitted=true;
    this._isProcessing=true;
    if(this.uploadFormGroup.invalid){
      this._isProcessing=false;
      this.toasterService.warning("fill Valid Fields");
    }
    else{
    this.uploadBonusService.importFileData(this.uploadFormGroup.value)
    .subscribe((response:ApiResponse)=>{
      if(response.status){
        this.isSubmitted=false;
        this.toasterService.success(response.result, 'Success!');
      }else{
        this.toasterService.error(response.result, 'Failed!');
      }
      this._isProcessing=false;
    })
  }
  }
  createForm(){
   this.uploadFormGroup=this.formBuilder.group({
    id:[0,[]],
    salaryHead:[,[Validators.required]],
    periodID:[,[Validators.required]],
    bonusType:[,[Validators.required]],
    companyID:[this.compID,[]],
    periodName:[,[]],
    grade:[this.gradeValue,[]],
    excelFiles:[,[Validators.required]],
    fileCount:[,[]]
   })
  }
  get f(){
    return this.uploadFormGroup.controls;
  }
  reset(){
    this.uploadFormGroup.reset();
  }
  get formVal(){
    return this.uploadFormGroup.value;
  }

}
