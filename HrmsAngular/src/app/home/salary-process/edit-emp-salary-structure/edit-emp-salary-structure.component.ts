import { AuthService } from './../../../services/auth.service';
import { SalarySetupService } from './../../../services/SalarySetup/salary-setup.service';
import { Component, OnInit } from '@angular/core';
import { Pagination } from '../../../shared/paginate';
import { StructureType } from '../../../models/salary-process/structure-type.model';
import { FormGroup, FormArray, FormBuilder, FormControl, Validators } from '@angular/forms';
import { SalaryHead } from '../../../models/SalarySetup/salary-head';
import { SalaryStructureView } from '../../../models/salary-process/salary-structure-view.model';
import { SalaryProcessService } from '../../../services/salary-process/salary-process-service.service';
import { EmploymentService } from '../../../services/hr/employment.service';
import { ToastrService } from 'ngx-toastr';
import { ApiResponse } from '../../../models/response.model';
import { Employment } from '../../../models/hr/employment.model';
import { EmpSalaryStructure } from '../../../models/salary-process/emp-salary-structure.model';
import { BasicEntryService } from '../../../services/system-setup/basic-entry.service';
import { BasicEntry } from '../../../models/system-setup/basic-entry.model';
import { BasedOn } from '../../../models/salary-process/based-on.model';

@Component({
  selector: 'app-edit-emp-salary-structure',
  templateUrl: './edit-emp-salary-structure.component.html',
  styleUrls: ['./edit-emp-salary-structure.component.scss','../../../../vendor/libs/ng-select/ng-select.scss']
})
export class EditEmpSalaryStructureComponent extends Pagination implements OnInit {

  structureModel: StructureType[] = [];
  editSalaryForm:FormGroup;
  comid:number;
  editEmpAdditionForm:FormArray;
  editEmpDeductionForm:FormArray;
  salaryHeadModel: SalaryHead[] = [];
  salaryStructureAddition:SalaryStructureView[]=[];
  salaryStructureDeduction:SalaryStructureView[]=[];
  typeItem:BasicEntry[]=[];
  isSubmitted=false;
  basedOnItem:BasedOn[]=[];
  totalAdditionAmount:number=0;
  totalDeductionAmount:number=0;
  constructor(
    private sPService:SalaryProcessService,
    private formBuilder:FormBuilder,
    private empService:EmploymentService,
    private salaryheadService:SalarySetupService,
    private toster:ToastrService,
    private basicEntryService:BasicEntryService
  ) {
    super()
    this.editEmpAdditionForm = this.formBuilder.array([]);
    this.editEmpDeductionForm=this.formBuilder.array([]);
  }

  ngOnInit() {
    this.items=[];
    this.update
    this.comid=AuthService.getLoggedCompanyId();
    this.structureList();
    this.createEmpSalaryForm();
  }

  getSalaryHead() {
    this.salaryheadService.getAllSalaryHead().subscribe((response: ApiResponse) => {
      if (response.status) {
        this.salaryHeadModel=response.result as SalaryHead[];
      }
    })
  }

  structureList(){
    this.sPService.getSalaryTypeList().subscribe((response:ApiResponse)=>{
      if(response.status){
        this.structureModel=response.result as StructureType[];
      }
    });
  }

  getBasedOnItem(){
    this.sPService.getBasedOnList().subscribe((response:ApiResponse)=>{
      if(response.status){
        this.basedOnItem=response.result as BasedOn[];
      }else{
        this.basedOnItem=[];
      }
    });
  }



  getAllAddition(structureId:number){
    this.sPService.getSalaryStructureAddition(structureId,this.comid).subscribe((response:ApiResponse)=>{
      if(response.status){
        this.salaryStructureAddition=response.result as SalaryStructureView[];
        let aArray=response.result as SalaryStructureView[];
       this.editEmpAdditionForm= this.loadTable(aArray, this.editEmpAdditionForm);

      }
    });
  }


  getAllDeduction(structureId:number){
    this.sPService.getSalaryStructureDeduction(structureId,this.comid).subscribe((response:ApiResponse)=>{
      if(response.status){
        this.salaryStructureDeduction=response.result as SalaryStructureView[];
        let dArray=response.result as SalaryStructureView[];
       this.editEmpDeductionForm= this.loadTable(dArray, this.editEmpDeductionForm);
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
    this.getBasedOnItem();
    // this.totalAdditionAmount=0;
    // this.totalDeductionAmount=0;
  }


  addDedutionRow() {

    // let add:SalaryStructureView[]=this.salaryStructureDeduction
    // let salaryHeadType=add[0].salaryHeadType;
    // let basedOnID=add[0].basedOnID;
    // let salaryTypeID=add[0].salaryTypeID;
    // let typeName=add[0].typeName;
    // let basedOnName=add[0].basedOnName;
    this.editEmpDeductionForm.push(
      new FormGroup({
        salaryHeadID: new FormControl(0, []),
        amount: new FormControl(0, []),
        basedOnName: new FormControl("", []),
        typeName: new FormControl("", []),
        salaryTypeID:new FormControl(0, []),
        basedOnID:new FormControl(0, []),
        salaryHeadType:new FormControl(0, []),
        sortOrder:new FormControl(0, [])
      })
    )
  }



  addAdditionRow() {
    // let add:SalaryStructureView[]=this.salaryStructureAddition
    // let salaryHeadType=add[0].salaryHeadType;
    // let basedOnID=add[0].basedOnID;
    // let salaryTypeID=add[0].salaryTypeID;
    // let typeName=add[0].typeName;
    // let basedOnName=add[0].basedOnName;
      this.editEmpAdditionForm.push(
        new FormGroup({
          salaryHeadID: new FormControl(0, []),
          amount: new FormControl(0, []),
          basedOnName: new FormControl("", []),
          typeName: new FormControl("", []),
          salaryTypeID:new FormControl(0, []),
          basedOnID:new FormControl(0, []),
          salaryHeadType:new FormControl(0, []),
          sortOrder:new FormControl(0, [])
        })
      )
    }

    amountChangeAddition(){
      let totalAmount = 0;
      this.editEmpAdditionForm.value.forEach(control=>{
        totalAmount += control.amount
      })
      this.totalAdditionAmount=totalAmount;
    }

    amountChangeDeduction(){
      let totalAmount = 0;
      this.editEmpDeductionForm.value.forEach(control=>{
        totalAmount += control.amount
      })
      this.totalDeductionAmount=totalAmount;
    }


    removeAdditionRow(index:number){
      this.editEmpAdditionForm.removeAt(index);
      this.amountChangeAddition();
    }

    removeDeductionRow(index:number){
      this.editEmpDeductionForm.removeAt(index);
      this.amountChangeDeduction();
    }




  getEmpInfoById(empCode: any) {
    if (empCode == "") {
      return;
    }else{
          this.f.empCode.patchValue(empCode.empCode)
          this.f.empName.patchValue(empCode.empName);
          // this.f.department.patchValue(empCode.department);
          // this.f.designation.patchValue(empCode.designation);
    }
  }


saveEditEmpSalaryStructure(){
  this.isSubmitted=true;
  if(this.editSalaryForm.invalid){
    //this.toster.warning("Fill Required Fields");
    return;
  }else{
    let obj= new EmpSalaryStructure();
        obj=this.editSalaryForm.value;
        obj.empadditionModel=this.editEmpAdditionForm.value;
        obj.empdeductionModel=this.editEmpDeductionForm.value;
    this.sPService.editEmpSalaryStructure(obj).subscribe((response:ApiResponse)=>{
      if(response.status){
        this.toster.success(response.result,"Success");
        this.Reset();
      }
      else{
        this.toster.error(response.result,"Failed!!");
      }
    });
  }
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

createEmpSalaryForm(){
  this.editSalaryForm=this.formBuilder.group({
    id:[0,[]],
    empID:[0,[]],
    structureID:[,[Validators.required]],
    amount:[,[Validators.required]],
    empCode:[,[Validators.required]],
    empName:[,[]],
    companyID:[this.comid,[]]
  })
}

get f(){
  return this.editSalaryForm.controls;
}

Reset(){
  this.isSubmitted=false;
  this.totalAdditionAmount=0;
  this.totalDeductionAmount=0;
  this.editSalaryForm.reset();
  this.createEmpSalaryForm();
  this.editEmpAdditionForm=this.formBuilder.array([]);
  this.editEmpDeductionForm=this.formBuilder.array([]);
}

// get aform(){
//   return this.editEmpAdditionForm.controls;
// }

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
          salaryHeadType:[item.salaryHeadType,[]],
          sortOrder:[item.sortOrder,[]]
          }));
          //this.totalAdditionAmount=this.totalAdditionAmount+item.amount;
          //this.totalDeductionAmount=this.totalDeductionAmount+item.amount;
        });
        return formArray;
}


}
