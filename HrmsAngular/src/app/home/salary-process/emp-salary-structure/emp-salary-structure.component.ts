import { Helper } from './../../../shared/helper';
import { AuthService } from './../../../services/auth.service';
import { SalarySetupService } from './../../../services/SalarySetup/salary-setup.service';
import { Component, OnInit } from '@angular/core';
import { Pagination } from '../../../shared/paginate';
import { SalaryHead } from '../../../models/SalarySetup/salary-head';
import { StructureType } from '../../../models/salary-process/structure-type.model';
import { SalaryProcessService } from '../../../services/salary-process/salary-process-service.service';
import { ApiResponse } from '../../../models/response.model';
import { FormGroup, FormBuilder, FormArray, FormControl, Validators } from '@angular/forms';
import { EmploymentService } from '../../../services/hr/employment.service';
import { Employment } from '../../../models/hr/employment.model';
import { SalaryStructureView } from '../../../models/salary-process/salary-structure-view.model';
import { ToastrService } from 'ngx-toastr';
import { EmpSalaryStructure } from '../../../models/salary-process/emp-salary-structure.model';
import { BasicEntryService } from '../../../services/system-setup/basic-entry.service';
import { BasicEntry } from '../../../models/system-setup/basic-entry.model';
import { BasedOn } from '../../../models/salary-process/based-on.model';
import { CommonHelper } from '../../../shared/commonHelper';

@Component({
  selector: 'app-emp-salary-structure',
  templateUrl: './emp-salary-structure.component.html',
  styleUrls: ['./emp-salary-structure.component.scss','../../../../vendor/libs/ng-select/ng-select.scss']
})
export class EmpSalaryStructureComponent extends Pagination implements OnInit {

  structureModel: StructureType[] = [];
  empSalaryForm:FormGroup;
  comid:number;
  empAdditionForm:FormArray;
  empDeductionForm:FormArray;
  salaryHeadModel: SalaryHead[] = [];
  salaryStructureAddition:SalaryStructureView[]=[];
  salaryStructureDeduction:SalaryStructureView[]=[];
  typeItem:BasicEntry[]=[];
  basedOnItem:BasedOn[]=[];
  salaryAmount:any[]=[];
  otherAllowance:any[]=[];
  totalAdditionAmount:number=0;
  totalDeductionAmount:number=0;
  isSubmitted=false;
  constructor(
    private sPService:SalaryProcessService,
    private formBuilder:FormBuilder,
    private empService:EmploymentService,
    private salaryheadService:SalarySetupService,
    private toster:ToastrService,
    private basicEntryService:BasicEntryService
  ) {
    super()
    this.empAdditionForm = this.formBuilder.array([]);
    this.empDeductionForm=this.formBuilder.array([]);
  }

  ngOnInit() {
    this.items=[];
    this.update
    this.comid=AuthService.getLoggedCompanyId();
    this.structureList();
    this.createEmpSalaryForm();
    this.getSalaryHead();
    this.getAllAddition(1);
    this.getAllDeduction(1);

    this.getAllType();
    this.getBasedOnItem()
    // this.getEmpSalaryAmount()
    this.totalAdditionAmount=0;
    this.totalDeductionAmount=0;
  }

  getEmpOtherAllowance(){
    this.sPService.getEmpOtherAllowance(this.f.empCode.value).subscribe((response:ApiResponse)=>{
      if(response.status){
        this.otherAllowance=response.result as any[];
        console.log("Other",this.otherAllowance);
      }else{
        this.otherAllowance=[];
      }
    });
  }

  getAllType(){
    this.basicEntryService.getAllSalaryType().subscribe((response:ApiResponse)=>{
      if(response.status){
        this.typeItem=response.result as BasicEntry[];
      }else{
        this.typeItem=[];
      }
    });
  }

  getSalaryHead() {
    this.salaryheadService.getAllSalaryHead().subscribe((response: ApiResponse) => {
      if (response.status) {
        this.salaryHeadModel=response.result as SalaryHead[];
        console.log(this.salaryHeadModel)
      }else{
        this.salaryHeadModel=[];
      }
    })
  }

  getBasedOnItem(){
    this.sPService.getBasedOnList().subscribe((response:ApiResponse)=>{
      if(response.status){
        this.basedOnItem=response.result as BasedOn[];
        console.log(this.basedOnItem)
      }else{
        this.basedOnItem=[];
      }
    });
  }

  structureList(){
    this.sPService.getSalaryTypeList().subscribe((response:ApiResponse)=>{
      if(response.status){
        this.structureModel=response.result as StructureType[];
      }else{
        this.structureModel=response.result as StructureType[];
      }
    });
  }

  getAllAddition(structureId:number){
    this.sPService.getSalaryStructureAddition(structureId,this.comid).subscribe((response:ApiResponse)=>{
      if(response.status){

        this.salaryStructureAddition=response.result as SalaryStructureView[];
        console.log("addition",this.salaryStructureAddition)
        let aArray=response.result as SalaryStructureView[];
       this.empAdditionForm= this.loadTable(aArray, this.empAdditionForm);

      }
    });
  }


  getAllDeduction(structureId:number){
    this.sPService.getSalaryStructureDeduction(structureId,this.comid).subscribe((response:ApiResponse)=>{
      if(response.status){
        this.salaryStructureDeduction=response.result as SalaryStructureView[];
        let dArray=response.result as SalaryStructureView[];

       this.empDeductionForm= this.loadTable(dArray, this.empDeductionForm);
      }
    });
  }



  getAdditionOrDeductionList(structureID:number){
    if(structureID==null){
      return;
    }
    this.getAllAddition(structureID);
    this.getAllDeduction(structureID);
    this.getSalaryHead();
    this.getAllType();
    this.getBasedOnItem()
    this.totalAdditionAmount=0;
    this.totalDeductionAmount=0;
  }


  addDedutionRow() {
    this.empDeductionForm.push(
      new FormGroup({
        structureID: new FormControl(0,[]),
        salaryHeadID: new FormControl(0, []),
        amount: new FormControl(0, []),
        basedOnName: new FormControl("", []),
        typeName: new FormControl("", []),
        salaryTypeID:new FormControl(0, []),
        basedOnID:new FormControl(0, []),
        sortOrder:new FormControl(0, [])
      })
    )
  }



  addAdditionRow() {
      this.empAdditionForm.push(
        new FormGroup({
          structureID: new FormControl(0,[]),
          salaryHeadID: new FormControl(0, []),
          amount: new FormControl(0, []),
          basedOnName: new FormControl("", []),
          typeName: new FormControl("", []),
          salaryTypeID:new FormControl(0, []),
          basedOnID:new FormControl(0, []),
          sortOrder:new FormControl(0, [])
        })
      )
    }


    removeAdditionRow(index:number){
      this.empAdditionForm.removeAt(index);
      this.amountChangeAddition()
    }

    removeDeductionRow(index:number){
      this.empDeductionForm.removeAt(index)
      this.amountChangeDeduction();

    }




  getEmpInfoById(empCode: any) {
    debugger
    if (empCode == "") {
      return;
    }else{

          this.f.empCode.patchValue(empCode.empCode)
          this.f.empName.patchValue(empCode.empName);
          CommonHelper.focusTextField('amount');
          if(empCode.amount>0 || empCode.amount ==0){
            this.f.amount.patchValue(empCode.amount);
            this.payAmountChangeAddition(empCode.amount,empCode.empCode);
            this.getSalaryStructure(empCode.empCode);
            // this.payAmountChangeDeduction(empCode.amount);
            this.payAmountChangeDeduction(empCode.amount,empCode.empCode);
            this.getEmpOtherAllowance()
          }
          else{
            this.f.amount.patchValue(0);
            // this.payAmountChangeAddition(empCode.amount);
            this.payAmountChangeDeduction(empCode.amount,empCode.empCode);
          }


    }
  }




saveEmpSalaryStructure(){
  this.isSubmitted=true;
  if(this.empSalaryForm.invalid){
    return;
  }else{
    let obj= new EmpSalaryStructure();
        obj=this.empSalaryForm.value;
        obj.empadditionModel=this.empAdditionForm.value;
        obj.empdeductionModel=this.empDeductionForm.value;
        console.log(obj)
    this.sPService.saveEmpSalaryStructure(obj).subscribe((response:ApiResponse)=>{
      if(response.status){
        this.toster.success(response.result,"Success");
         this.Reset();
         this.getAllAddition(1);
       this.getAllDeduction(1);


      }
      else{
        this.toster.error(response.result,"Failed!!");
      }
    });
  }
}

payAmountChangeAddition(payAmount:number,empCode:string){
  if(payAmount==null){
    return;
  }
  this.sPService.payAmountChangeAddition(payAmount,empCode).subscribe((response:ApiResponse)=>{
    if(response.status){

      let result= response.result as SalaryStructureView[];
      console.log("result",response.result);

      this.totalAdditionAmount=0;
      this.empAdditionForm=this.loadTable(result, this.empAdditionForm);
      result.forEach(element => {
        this.totalAdditionAmount= element.amount+this.totalAdditionAmount;
       });
       this.getSalaryHead();
       this.getAllType();
       this.getBasedOnItem()
    }
  });
}

getSalaryStructure(payAmount:number){
  if(payAmount==null){
    return;
  }
  this.sPService.getSalaryStructure(this.f.empCode.value).subscribe((response:ApiResponse)=>{
    if(response.status){

      let result= response.result as SalaryStructureView[];
      console.log("result",response.result);

      this.totalAdditionAmount=0;
      this.empAdditionForm=this.loadTable(result, this.empAdditionForm);
      result.forEach(element => {
        this.totalAdditionAmount= element.amount+this.totalAdditionAmount;
       });
       this.getSalaryHead();
       this.getAllType();
       this.getBasedOnItem()
    }
  });
}

amountChangeAddition(){
  let totalAmount = 0;
  this.empAdditionForm.value.forEach(control=>{
    totalAmount += control.amount
  })
  this.totalAdditionAmount=totalAmount;
}


amountChangeDeduction(){
  let totalAmount = 0;
  this.empDeductionForm.value.forEach(control=>{
    totalAmount += control.amount
  })
  this.totalDeductionAmount=totalAmount;
}

payAmountChangeDeduction(payAmount:number,empCode:string){
  if(payAmount==null){
    return;
  }
  this.sPService.payAmountChangeDeduction(payAmount,this.f.empCode.value).subscribe((response:ApiResponse)=>{
    if(response.status){

      let result= response.result as SalaryStructureView[];
      this.totalDeductionAmount=0;
     this.empDeductionForm= this.loadTable(result, this.empDeductionForm);

     result.forEach(element => {
      this.totalDeductionAmount= element.amount+this.totalDeductionAmount;
     });
     this.getSalaryHead();
    //  this.getAllDeduction();
      this.getAllType();
     this.getBasedOnItem()
    }
  });
}


paymentChangeAdditionOrDeduction(payAmount:number , event:any){
  if(event.key =="Enter" || event.key =="Tab"){
    this.payAmountChangeAddition(payAmount,this.f.amount.value);
    // this.sPService.payAmountChangeAddition(this.f.empCode.value).subscribe((response:ApiResponse)=>{
    //   if(response.status){

    //     let result= response.result as SalaryStructureView[];
    //     console.log("result",response.result);

    //     this.totalAdditionAmount=0;
    //     this.empAdditionForm=this.loadTable(result, this.empAdditionForm);
    //     result.forEach(element => {
    //       this.totalAdditionAmount= element.amount+this.totalAdditionAmount;
    //      });
    //      this.getSalaryHead();
    //      this.getAllType();
    //      this.getBasedOnItem()
    //   }
    // });

     this.payAmountChangeDeduction(payAmount,this.f.empCode.value);
     console.log(payAmount,this.f.empCode.value)
  }

}

createEmpSalaryForm(){
  this.empSalaryForm=this.formBuilder.group({
    id:[0,[]],
    empID:[0,[]],
    structureID:[1,[Validators.required]],
    amount:[,[Validators.required]],
    empCode:[,[Validators.required]],
    empName:[,[]],
    companyID:[this.comid,[]]
  })
}

get f(){
  return this.empSalaryForm.controls;
}

get aform(){
  return this.empAdditionForm.controls;
}

loadTable(data:SalaryStructureView[], formArray:FormArray){
  formArray=this.formBuilder.array([]);
        data.forEach(item=>{
          formArray.push(this.formBuilder.group({
          structureID:[item.structureID,[]],
          salaryHeadID:[item.salaryHeadID,[]],
          amount: [item.amount,[]],
          basedOnName:[item.basedOnName,[]],
          typeName:[item.typeName,[]],
          salaryTypeID:[item.salaryTypeID,[]],
          basedOnID:[item.basedOnID,[]],
          sortOrder:[item.sortOrder,[]]
          }));
        });

        return formArray;
}

Reset(){
  this.isSubmitted=false;
  this.totalAdditionAmount=0;
  this.totalDeductionAmount=0;
  //  this.empSalaryForm.reset();
   this.createEmpSalaryForm();
   this.getSalaryStructure(this.f.empCode.value);
  this.empAdditionForm=this.formBuilder.array([]);
  this.empDeductionForm=this.formBuilder.array([]);
  // this.getSalaryHead();
}
}
