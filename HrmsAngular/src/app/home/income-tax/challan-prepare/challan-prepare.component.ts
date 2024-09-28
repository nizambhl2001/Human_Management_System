import { AuthService } from './../../../services/auth.service';
import { SalarySetupService } from './../../../services/SalarySetup/salary-setup.service';
import { Component, OnInit } from '@angular/core';
import { TaxYearInfo } from '../../../models/incomeTax/tax-year-info.model';
import { TaxYearInfoService } from '../../../services/incomeTax/tax-year-info.service';
import { ApiResponse } from '../../../models/response.model';
import { SalaryHead } from '../../../models/SalarySetup/salary-head';
import { SalaryPeriodModel } from '../../../models/SalarySetup/SalaryPeriod';
import { BasicEntry } from '../../../models/system-setup/basic-entry.model';
import { BasicEntryModule } from '../../system-setup/basic-entry/basic-entry.module';
import { BasicEntryService } from '../../../services/system-setup/basic-entry.service';
import { EmpTypeService } from '../../../services/system-setup/EmpType.service';
import { EmpTypeModel } from '../../../models/system-setup/EmpType.model';
import { TaxGroup } from '../../../models/incomeTax/tax-group.model';
import { BonuSType } from '../../../models/bonus/bonusType.model';
import { BonusTypeService } from '../../../services/Bonus/bonusType.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ChallanPrepair } from '../../../models/incomeTax/challan-prepair.model';
import { ToastrService } from 'ngx-toastr';
import { ChallanPrepareSave } from '../../../models/incomeTax/challan-prepare-save.model';
import { format } from 'util';
import { count, audit } from 'rxjs/operators';

@Component({
  selector: 'app-challan-prepare',
  templateUrl: './challan-prepare.component.html',
  styleUrls: ['./challan-prepare.component.scss','../../../../vendor/libs/ng-select/ng-select.scss']
})
export class ChallanPrepareComponent implements OnInit {



  salaryPeriod:SalaryPeriodModel[]=[];
  branches: BasicEntry[] = [];
  empTypeModel:EmpTypeModel[]=[];
  taxGroup:TaxGroup[]=[];
  allPaymentType:BonuSType[]=[];
  challanPrepareForm:FormGroup;
  challanPrepair:ChallanPrepair[]=[];
  challanPrepareItem:ChallanPrepareSave[]=[];
  totalEmployee:number;
  showLadda:boolean=false;
 comId:number;
 isSubmitted=false;
 isShowClick=false;
 totalAmountTaka:number=0;
 gradeValue;
  constructor(
    private taxService:TaxYearInfoService,
    private salarySetupService:SalarySetupService,
    private basicEntryService:BasicEntryService,
    private emptypeService:EmpTypeService,
    private paymentTypeES:BonusTypeService,
    private formBuilder:FormBuilder,
    private toster:ToastrService

  ) { }



  ngOnInit() {
    this.gradeValue=AuthService.getLoggedGradeValue();
    this.comId=AuthService.getLoggedCompanyId();
    this.createChallanPrepareForm();
    this.getSalaryPeriodList();
    this.getAllBranchName();
    this.getEmployeeType();
    this.getAllGroupNam();
    this.AllPaymentType();

  }

  getSalaryPeriodList() {
    this.salarySetupService.getAllperiod().subscribe((response: ApiResponse) => {
      if (response.status) {
        this.salaryPeriod = response.result as SalaryPeriodModel[];
      }

    })
  }
  getAllBranchName() {
    this.basicEntryService.getBranch().subscribe((response: ApiResponse) => {
      if (response.status) {
        this.branches = response.result as BasicEntry[];
      }
    })
  }

  getEmployeeType(){
    this.emptypeService.GetEmpType().subscribe((response:ApiResponse)=>{
      if(response.status){
        this.empTypeModel=response.result as EmpTypeModel[];
      }
    });
  }

  getAllGroupNam(){
    this.taxService.getAllTaxGroupName().subscribe((response:ApiResponse)=>{
      if(response.status){
        this.taxGroup=response.result as TaxGroup[];
      }
    })
  }

  AllPaymentType(){
    this.paymentTypeES.getBonusType().subscribe((response:ApiResponse)=>{
      if(response.status){
        this.allPaymentType=response.result as BonuSType[];
      }
    })
  }

ShowAll(){
  this.isSubmitted=false;
  this.isShowClick=true;


  if(this.challanPrepareForm.controls['periodID'].invalid){
    //this.toster.warning("Fill Required Fields");
  }else{
    this.showLadda=true;
  let obj=new ChallanPrepair();
  obj.periodID=this.f.periodID.value;
  obj.gradeValue=this.f.gradeValue.value;
  obj.branch=this.f.branch.value;
  obj.companyID=this.f.companyID.value;
  obj.paymentType=this.f.paymentType.value

  this.taxService.showAll(obj.paymentType,obj.periodID,this.f.bonusType.value,obj.gradeValue,obj.branch,this.comId).subscribe((response:ApiResponse)=>{
    if(response.status){
      this.showLadda=false;
      this.challanPrepareItem= response.result as ChallanPrepareSave[];
    this.totalEmployee=this.challanPrepareItem.length;
    let total=this.challanPrepareItem.map(t=>t.amount)
    this.totalAmountTaka=total.reduce((a,b)=>a+b,0);

  }

else{
  this.showLadda=false;
  this.toster.error(response.result,"Failed!!");

}
  })
}
}

saveChallanPrepare(){
  this.isShowClick=true;
  this.isSubmitted=true;
      if(this.challanPrepareForm.invalid){
        //this.toster.warning("Fill Required Fields");
      }else{
        let obj= new ChallanPrepair();
  obj=this.challanPrepareForm.value;
  obj.taxYearID=this.salaryPeriod.find(taxid=>taxid.id===obj.periodID).taxYearID;
  obj.details=this.challanPrepareItem;
  this.taxService.saveChallanPrepare(obj).subscribe((response:ApiResponse)=>{
    if(response.status){
      this.toster.success(response.result,"Success");
      this.totalEmployee=0;
      this.Reset();
    }else{
      this.toster.error(response.result,"Failed!!");
    }
  });
      }
};

deleteFromList(id:string){
  let dItem=this.challanPrepareItem.findIndex(c=>c.empCode==id);
  this.challanPrepareItem.splice(dItem,1)
  //this.challanPrepareItem
  this.totalEmployee=this.challanPrepareItem.length;
  let total=this.challanPrepareItem.map(t=>t.amount)
    this.totalAmountTaka=total.reduce((a,b)=>a+b,0);
}

createChallanPrepareForm(){
  this.challanPrepareForm=this.formBuilder.group({
    id :[0,[]],
    periodID :[,[Validators.required]],
    taxYearID :[4,[]],
    challanNo:[0,[]],
    gruopID :[,[Validators.required]],
    gLNo :[,[Validators.required]],
    companyID :[this.comId,[]],
    paymentType :[0,[Validators.required]],
    bonusType  :[0,[]],
    gradeValue:[this.gradeValue,[]],
    branch:[,[]]//-1(remove Sajib)
  })
}

Reset(){
  this.isSubmitted=false;
  this.isShowClick=false;
  this.totalEmployee=0;
  this.totalAmountTaka=0;
  this.challanPrepareForm.reset();
  this.createChallanPrepareForm();
  this.challanPrepareItem=[];
}
get f(){
  return this.challanPrepareForm.controls;
}
}
