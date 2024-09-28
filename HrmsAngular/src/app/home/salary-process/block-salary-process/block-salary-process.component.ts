import { AuthService } from './../../../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { Pagination } from '../../../shared/paginate';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SalaryProcessService } from '../../../services/salary-process/salary-process-service.service';
import { BlockSalaryProcess } from '../../../models/salary-process/block-salary-process.model';
import { ApiResponse } from '../../../models/response.model';
import { BlockSalaryProcessView } from '../../../models/salary-process/block-salary-process-view.model';
import { ToastrService } from 'ngx-toastr';
import { validateStyleProperty } from '@angular/animations/browser/src/render/shared';
import { unescapeHtml } from '@angular/platform-browser/src/browser/transfer_state';

@Component({
  selector: 'app-block-salary-process',
  templateUrl: './block-salary-process.component.html',
  styleUrls: ['./block-salary-process.component.scss']
})
export class BlockSalaryProcessComponent extends Pagination implements OnInit {

  blockSalaryProcessModel:BlockSalaryProcess[]=[];
  blockSalaryProcessViewModel:BlockSalaryProcessView[]=[];
  blockSalaryProcessForm:FormGroup;
  comid:number;
  gradeId:number;
  userTypeid:number;
  searchKeys;
  isSubmitted=false;
  isShowData:boolean=false;
  constructor(
    private formBuilder:FormBuilder,
    private sPService:SalaryProcessService,
    private toster:ToastrService

  ) {
    super()
  }

  ngOnInit() {
    this.items = [];
    this.update();
    this.searchKeys=['empCode']
    this.comid=AuthService.getLoggedCompanyId();
    this.gradeId=AuthService.getLoggedGradeValue();
    this.userTypeid=AuthService.getLoggedUserTypeId();
    this.createBlockSalaryForm();
  }


  onSelectPeriod(period:any){
  this.blockSalaryProcessForm.patchValue({
  taxYearID:period.taxYearID,
  periodID:period.id,
  periodName:period.monthName,
  yearID:period.yearID
})
  }
getblockSalary(){
  this.isSubmitted=true;
  if(this.blockSalaryProcessForm.invalid){
    //this.toster.warning("Fill Required Fields");
    return;
  }else{
    this.isShowData=true;
    let obj=new BlockSalaryProcess();
  obj=this.blockSalaryProcessForm.value;
  this.sPService.getBlockSalaryProcess(obj).subscribe((response:ApiResponse)=>{
    if(response.status){
      this.isShowData=false;
     this.blockSalaryProcessViewModel= response.result as BlockSalaryProcessView[];
     this.items=response.result as BlockSalaryProcessView[];
     this.update();
    }else{
      this.isShowData=false;
      this.toster.error(response.result,"Information");
      this.blockSalaryProcessViewModel=[];

    }
  });
  }

  }


removeBlockSalary(empCode: string) {
  let index = this.items.findIndex(c => c.empCode == empCode);
  this.items.splice(index, 1);
 this.update();
}

processEmpSalaryBlock(){
  this.isSubmitted=true;
  if(this.f.periodID.value==null){
    this.toster.warning("Please Select Period First");
  }else if(this.f.bonustype.value==null){
    this.toster.warning("Please Select Payment Type");
  }
  else{
  let obj = new BlockSalaryProcess();
  obj= this.blockSalaryProcessForm.value;
  obj.blockSalaryViewModel=this.items;
  this.sPService.processEmpSalaryBlock(obj).subscribe((response:ApiResponse)=>{
    if(response.status){
      this.toster.success(response.result,"Success");
      this.Reset();
    }else{
      this.toster.error(response.result,"Faided!!");
    }
  });
}
}

  createBlockSalaryForm(){
    this.blockSalaryProcessForm=this.formBuilder.group({
      id:[,[]],
      taxYearID:[,[]],
      periodID:[,[Validators.required]],
      periodName:[,[]],
      yearID:[,[]],
      salaryhead:[0,[]],
      grade:[this.gradeId,[]],
      companyID:[this.comid,[]],
      bonustype:[,[Validators.required]],
      userTypeID:[this.userTypeid,[]]
    })
  }


  get f(){
    return this.blockSalaryProcessForm.controls;
   }

   Reset(){
     this.isShowData=false;
     this.isSubmitted=false;
     this.blockSalaryProcessForm.reset();
     this.createBlockSalaryForm();
     this.items=[];
     this.update();
   }
}
