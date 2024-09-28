import { AuthService } from './../../../services/auth.service';
import { SalarySetupService } from './../../../services/SalarySetup/salary-setup.service';
import { Pagination } from './../../../shared/paginate';
import { Component, OnInit } from '@angular/core';
import { SalaryProcessService } from '../../../services/salary-process/salary-process-service.service';
import { StructureType } from '../../../models/salary-process/structure-type.model';
import { ApiResponse } from '../../../models/response.model';
import { FormGroup, FormBuilder, FormArray, FormControl, Validators } from '@angular/forms';
import { SalaryStructure } from '../../../models/salary-process/salary-structure.model';
import { SalaryStructureView } from '../../../models/salary-process/salary-structure-view.model';
import { SalaryHead } from '../../../models/SalarySetup/salary-head';
import { ToastrService } from 'ngx-toastr';
import { ReturnTaxComponent } from '../../income-tax/return-tax/return-tax.component';
import { BasicEntry } from '../../../models/system-setup/basic-entry.model';
import { BasicEntryService } from '../../../services/system-setup/basic-entry.service';

@Component({
  selector: 'app-salary-structure',
  templateUrl: './salary-structure.component.html',
  styleUrls: ['./salary-structure.component.scss','../../../../vendor/libs/ng-select/ng-select.scss']
})
export class SalaryStructureComponent extends Pagination implements OnInit {
  comId:number;
  structureModel:StructureType[]=[];
  salaryStructureAddition:SalaryStructureView[]=[];
  salaryStructureDeduction:SalaryStructureView[]=[];
  salaryHeadModel: SalaryHead[] = [];
  structureForm:FormGroup;
  additionForm:FormArray;
  deductionForm:FormArray;
  typeItem:BasicEntry[]=[];
  lstBasedOn:any[]=[
                      {"id":1,"name":"None"},
                      {"id":2,"name":"Basic"},
                      {"id":3,"name":"Gross"},
                   ]
  isSubmitted = false;

  constructor(
    private sPService:SalaryProcessService,
    private formBuilder:FormBuilder,
    private salaryheadService:SalarySetupService,
    private toster:ToastrService,
    private basicEntryService:BasicEntryService
  ) {
     super()
    this.additionForm = this.formBuilder.array([]);
    this.deductionForm=this.formBuilder.array([]);
  }

  ngOnInit() {
    this.items=[];
    this.update;
    this.comId=AuthService.getLoggedCompanyId();
    this.createStructureForm();
    this.structureList();
    this.getSalaryHead();
    this.getAllType();
    this.getAllAddition(this.f.structureID.value);
    this.getAllDeduction(this.f.structureID.value);

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

  structureList(){
    this.sPService.getSalaryTypeList().subscribe((response:ApiResponse)=>{
      if(response.status){
        this.structureModel=response.result as StructureType[];
      }
    });
  }

  getSalaryHead() {
    this.salaryheadService.getAllSalaryHead().subscribe((response: ApiResponse) => {
      if (response.status) {
        this.salaryHeadModel=response.result as SalaryHead[];
        console.log(this.salaryHeadModel);
      }
    })
  }

  getAllAddition(structureId:number){
    this.sPService.getAllStructureAddition(structureId).subscribe((response:ApiResponse)=>{
      if(response.status){
        this.salaryStructureAddition=response.result as SalaryStructureView[];
        let aArray=response.result as SalaryStructureView[];
        this.additionForm=this.loadTable(aArray,this.additionForm);
      }
    });
  }

  getAllDeduction(structureId:number){
    this.sPService.getAllStructureDeduction(structureId).subscribe((response:ApiResponse)=>{
      if(response.status){
        this.salaryStructureDeduction=response.result as SalaryStructureView[];
        let dArray=response.result as SalaryStructureView[];
        this.deductionForm=this.loadTable(dArray,this.deductionForm);
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
  }



  addAdditionRow() {
    let add:SalaryStructureView[]=this.salaryStructureAddition
    let salaryHeadType=add[0].salaryHeadType;
    let basedOnID=add[1].basedOnID;
    let salaryTypeID=add[0].salaryTypeID;
    let typeName=add[0].typeName;
    this.additionForm.push(
      new FormGroup({
        salaryHeadID: new FormControl(0, []),
        amount: new FormControl(0, []),
        typeName: new FormControl(typeName, []),
        salaryTypeID:new FormControl(salaryTypeID, []),
        basedOnID:new FormControl(basedOnID, []),
        salaryHeadType:new FormControl(salaryHeadType, []),
        sortOrder:new FormControl(0, [])
      })
    );

  }

  addDedutionRow() {
    let add:SalaryStructureView[]=this.salaryStructureDeduction
    let salaryHeadType=add[0].salaryHeadType;
    let basedOnID=add[0].basedOnID;
    let salaryTypeID=add[0].salaryTypeID;
    this.deductionForm.push(
      new FormGroup({
        salaryHeadID: new FormControl(0, []),
        amount: new FormControl(0, []),
        basedOnName: new FormControl("", []),
        typeName: new FormControl("", []),
        salaryTypeID:new FormControl(salaryTypeID, []),
        basedOnID:new FormControl(basedOnID, []),
        salaryHeadType:new FormControl(salaryHeadType, []),
        sortOrder:new FormControl(0, [])
      })
    );

  }


  saveSalaryStructure(){
    this.isSubmitted=true;
    if(this.structureForm.invalid){
      //this.toster.warning("Fill Required Fields");
      return;
    }else{
      let obj= new SalaryStructure();
    obj=this.structureForm.value;
    obj.additionModel=this.additionForm.value;
    obj.deductionModel=this.deductionForm.value;
    this.sPService.saveSalaryStructureAddition(obj).subscribe((response:ApiResponse)=>{
      if(response.status){
        this.toster.success(response.result,"Success");
        this.Reset();
      }else{
        this.toster.error(response.result,"Failed!!");
      }
    });
    }

  }




createStructureForm(){
  this.structureForm=this.formBuilder.group({
    id:[0,[]],
    structureID :[1,[Validators.required]],
    companyID:[this.comId,[]],
    salaryHeadID:[0,[]],
    // salaryTypeID :[,[]],
    // basedOnID :[,[]],
    // salaryHeadType :[,[]]
  })
}

removeAdditionRow(index:number){
  this.additionForm.removeAt(index);
}

removeDeductionRow(index:number){
  this.deductionForm.removeAt(index)
}

get f(){
  return this.structureForm.controls;
}

loadTable(data:SalaryStructureView[], formArray:FormArray){
  console.log("data",data);
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
          salaryHeadType:[item.salaryHeadType,[]],
          sortOrder:[item.sortOrder,[]]
          }));
        });
        return formArray;
}

Reset(){
  this.isSubmitted=false;
  this.structureForm.reset();
  this.createStructureForm();
  this.additionForm=this.formBuilder.array([]);
  this.deductionForm=this.formBuilder.array([]);
}

}
