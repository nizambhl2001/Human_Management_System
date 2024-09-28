import { AuthService } from './../../../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { SearchargeAssain } from '../../../models/incomeTax/searcharge-assain.model';
import { TaxYearInfoService } from '../../../services/incomeTax/tax-year-info.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbDateCustomParserFormatter } from '../../../shared/dateformat';
import { ApiResponse } from '../../../models/response.model';
import { ToastrService } from 'ngx-toastr';
import { Employment } from '../../../models/hr/employment.model';
import { EmploymentService } from '../../../services/hr/employment.service';
import { TaxYearInfo } from '../../../models/incomeTax/tax-year-info.model';
import { SearchChargeSetup } from '../../../models/incomeTax/search-charge-setup.model';
import { ThemeSettingsModule } from '../../../../vendor/libs/theme-settings/theme-settings.module';

@Component({
  selector: 'app-surcharge-assign',
  templateUrl: './surcharge-assign.component.html',
  styleUrls: ['./surcharge-assign.component.scss','../../../../vendor/libs/ng-select/ng-select.scss']
})
export class SurchargeAssignComponent implements OnInit {


searchargeAssiain: SearchargeAssain[]=[];
searchChargeForm:FormGroup;
comId:number;
taxYear:TaxYearInfo[]=[];
serChargeSetup:SearchChargeSetup[]=[];
isSubmitted = false;
userID:number;
  constructor(
    private taxService:TaxYearInfoService,
    private formBuilder:FormBuilder,
    private dateFormator:NgbDateCustomParserFormatter,
    private employmentService:EmploymentService,
    private toster:ToastrService
  ) { }



  ngOnInit() {
    this.comId=AuthService.getLoggedCompanyId();
    this.userID=AuthService.getLoggedUserId();
    this.createForm();
    this.getAllYearList();
  }

searchSaveUpdate(){
  this.isSubmitted=true;
  if(this.searchChargeForm.invalid){
    //this.toster.warning("Fill Required Fields");
    return;
  }else{
    let obj=new SearchargeAssain();
    obj=this.searchChargeForm.value;
//obj.sDate=this.dateFormator.ngbDateToDate(this.f.sDateNgb.value);
this.taxService.saveUpdateSerchargeAssaign(this.searchChargeForm.value).subscribe((response:ApiResponse)=>{
  if(response.status){
    this.toster.success(response.result,"Success");
    this.getSearchargeAssaignList()
    this.Reset();
  }else{
    this.toster.error(response.result,"Failed!");
  }
})
  }
}


getByID(id:number){
this.taxService.getSearchargeAssignByID(id).subscribe((response:ApiResponse)=>{
  if(response.status){
    let result= response.result as SearchargeAssain;
    result.sDateNgb=this.dateFormator.stringToNgbDate(result.sDate.toString());
    this.searchChargeForm.patchValue(response.result);
    this.getPersentageListById(result.taxYearID);
    this.employmentService.getEmployment(result.empCode,this.comId).subscribe((response:ApiResponse)=>{
      if(response.status){
        let employInfo=response.result as Employment;
        this.searchChargeForm.patchValue({
          empName:employInfo.empName,
          empCode:employInfo.empCode,
          designation:employInfo.designation,
          department:employInfo.department
        })
      }
    });
  }
});
}



getEmpInfoById(empCode: any) {
  if (empCode == "") {
    return;
  }else{
        this.f.empCode.patchValue(empCode.empCode)
        this.f.empName.patchValue(empCode.empName);
        this.f.department.patchValue(empCode.department);
        this.f.designation.patchValue(empCode.designation);
  }
}

getAllYearList(){
  this.taxService.getAllYearList().subscribe((response:ApiResponse)=>{
    if(response.status){
      this.taxYear=response.result as TaxYearInfo[];
    }else{
      this.taxYear=[];
    }
  })
}


getPersentageListById(id:number){
  if(id==null)
  return;
  this.taxService.getPersentageList(id).subscribe((response:ApiResponse)=>{
    if(response.status){
      this.serChargeSetup= response.result as SearchChargeSetup[];
    }else{
      this.serChargeSetup=[];
    }
  })
}


getSearchargeAssaignList(){
  this.taxService.getSearchargeAssaignList(this.f.empCode.value,this.comId).subscribe((response:ApiResponse)=>{
    if(response.status){
      this.searchargeAssiain=response.result as SearchargeAssain[];

    }else{
      this.searchargeAssiain=[];
    }
  });
}

createForm(){
  this.searchChargeForm=this.formBuilder.group({
    id:[0,[]],
    empCode:[,[Validators.required]],
    taxYearID  :[,[Validators.required]],
    persentID  :[,[Validators.required]],
    sDate:[,[]],
    sDateNgb:[,[Validators.required]],
    companyID  :[1,[Validators.required]],
    empName:[,[Validators.required]],
    department:[,[Validators.required]],
    designation:[,[Validators.required]]
  })
}

Reset(){
  this.isSubmitted=false;
  this.searchChargeForm.reset();
  this.createForm();
}

get f(){
  return this.searchChargeForm.controls;
}
}
