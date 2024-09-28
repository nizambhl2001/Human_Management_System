import { AuthService } from './../../../services/auth.service';
import { SalarySetupService } from './../../../services/SalarySetup/salary-setup.service';
import { Component, OnInit } from '@angular/core';
import { TaxYearInfoService } from '../../../services/incomeTax/tax-year-info.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AdditionalTaxInfo } from '../../../models/incomeTax/additional-tax-info.model';
import { ApiResponse } from '../../../models/response.model';
import { ToastrService } from 'ngx-toastr';
import { TaxYearInfo } from '../../../models/incomeTax/tax-year-info.model';
import { Employment } from '../../../models/hr/employment.model';
import { EmploymentService } from '../../../services/hr/employment.service';
import { SalaryHead } from '../../../models/SalarySetup/salary-head';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-additional-tax-info',
  templateUrl: './additional-tax-info.component.html',
  styleUrls: ['./additional-tax-info.component.scss','../../../../vendor/libs/ng-select/ng-select.scss']
})
export class AdditionalTaxInfoComponent implements OnInit {


  additionalTaxinfo:AdditionalTaxInfo[]=[];
  additionalTaxForm:FormGroup;
  taxYearInfo:TaxYearInfo[]=[];
  comId:number;
  salaryHead:SalaryHead[]=[];
  isSubmitted = false;
  userID:number;
  selectedItemId: number;
  btnStatus="Save";
  constructor(
    private taxService:TaxYearInfoService,
    private formBuilder:FormBuilder,
    private toster:ToastrService,
    private employmentService:EmploymentService,
    private salaryHeadservice :SalarySetupService,
    private modalService: NgbModal,

  ) { }



  ngOnInit() {
    this.comId=AuthService.getLoggedCompanyId();
    this.createAdditionalForm();
    this.getAllYearList();
    this.getAllSalaryHeadList();
    this.getAdditionalTaxInfoList()
  }

saveAdditionalInfo(){
  this.btnStatus="Save";
  this.isSubmitted=true;
  if(this.additionalTaxForm.invalid){
    //this.toster.warning("Fill Required Fields");
    return;
  }else{
    this.taxService.saveAdditionalTaxInfo(this.additionalTaxForm.value).subscribe((response:ApiResponse)=>{
      if(response.status){
        this.toster.success(response.result,"Success");
        this.getAdditionalTaxInfoList();
        this.Reset();
      }else{
        this.toster.error(response.result,"Failed!!");
      }
    })
  }

}


onSelectEmp(empinfo:any){
this.additionalTaxForm.patchValue({
  empName:empinfo.empName,
  empCode:empinfo.empCode
})
}

OnSubmit(){
  if(this.btnStatus="Save"){
    this.saveAdditionalInfo();
  }else{
    this.saveAdditionalInfo();
  }
}


getAllYearList(){

  this.taxService.getAllYearList().subscribe((response:ApiResponse)=>{
    if(response.status){
      this.taxYearInfo=response.result as TaxYearInfo[];
    }
  })
}

getAdditionalTaxInfoList(){
  this.taxService.getAdditionalTaxInfoLis(this.comId).subscribe((response:ApiResponse)=>{
    if(response.status){

      this.additionalTaxinfo=response.result as AdditionalTaxInfo[]
    }else{
      this.additionalTaxinfo=[];
    }
  });
}

getById(id:number){
  this.btnStatus="Update";
this.taxService.getAddtionalTaxInfoById(id).subscribe((response:ApiResponse)=>{
  if(response.status){
    let taxInfo=response.result as AdditionalTaxInfo
    this.additionalTaxForm.patchValue(taxInfo);
    this.getEmpInfoById(taxInfo.empCode);
  }
});
}

confirmDelete(id:number){
  this.taxService.deleteAdditionalTaxInfo(id).subscribe((response:ApiResponse)=>{
    if(response.status){
      this.toster.success(response.result,"Success");
      this.modalService.dismissAll();
      this.Reset();
    }else{
      this.toster.error(response.result,"Failed")
    }
  });
}



deleteAdditionalTaxInfo(id: number, modal: any) {
  this.selectedItemId = id;
  this.modalService.open(modal);
}


getEmpInfoById(empCode: string) {
  if (empCode == "") {
    return;
  }
    this.employmentService.getEmployment(empCode, this.comId).subscribe((response: ApiResponse) => {


      if (response.status) {
        let empInfo = response.result as Employment;
        this.f.empName.setValue(empInfo.empName);
      }

    })
}


getAllSalaryHeadList(){
  this.salaryHeadservice.getAllSalaryHead().subscribe((response:ApiResponse)=>{
    if(response.status){
      this.salaryHead=response.result as SalaryHead[];
    }
  })
}



  createAdditionalForm(){
    this.additionalTaxForm=this.formBuilder.group({
      id :[0,[]],
      empCode :[,[Validators.required]],
      salaryHeadID :[,[Validators.required]],
      exemptAmount :[,[Validators.required]],
      exemptPercent :[0,[Validators.required]],
      exemptRule :[,[Validators.required]],
      taxYearID :[,[Validators.required]],
      companyID :[this.comId,[]],
      empName:[,[]]
    })
  }

Reset(){
  this.btnStatus="Save";
  this.isSubmitted=false;
  this.additionalTaxForm.reset();
  this.createAdditionalForm();
}

  get f(){
    return this.additionalTaxForm.controls;
  }
}
