import { AuthService } from './../../../services/auth.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ShiftAllowanceService } from '../../../services/ShiftAllowance/shift-allowance.service';
import { BasicEntryService } from '../../../services/system-setup/basic-entry.service';
import { ToastrService } from 'ngx-toastr';
import { ShiftAllowanceAssign } from '../../../models/ShiftAllowance/ShiftAssignModel';
import { BasicEntry } from '../../../models/system-setup/basic-entry.model';
import { ApiResponse } from '../../../models/response.model';
import { id } from '@swimlane/ngx-datatable/release/utils';
import { Pagination } from '../../../shared/paginate';

@Component({
  selector: 'app-edit-allowance',
  templateUrl: './edit-allowance.component.html',
  styleUrls: ['./edit-allowance.component.scss','../../../../vendor/libs/ng-select/ng-select.scss']
})
export class EditAllowanceComponent extends Pagination implements OnInit {

  constructor(
    private formBuilder: FormBuilder,
    private shiftAllowanceService: ShiftAllowanceService,
    private basicEntryService: BasicEntryService,
    private toaster: ToastrService,
    private modalService:NgbModal
  ) {
    super();
   }
  title = "Edit Shift Allowance";
  alltabledata: ShiftAllowanceAssign[] = [];
  shiftAssignFormgroup: FormGroup;
  branch: BasicEntry[] = [];
  location: BasicEntry[] = [];
  department: BasicEntry[] = [];
  designation: BasicEntry[] = [];
  productionunit: BasicEntry[] = [];
  productionline: BasicEntry[] = [];
  companyId: number;
  modelAssignData: ShiftAllowanceAssign[] = [];
  shiftAssignAllowanceModel:ShiftAllowanceAssign[] = [];
  selectedEmp: string[] = [];
  isSelect: boolean;
  shiftAllowanceEditForm:FormGroup;
  isSubmitted=false;
  activetype:number;
  idForDelete:number;
  createUser:number;
  gradeValue:number;
  totalEmp:number;
  ngOnInit(  ) {
    this.companyId = AuthService.getLoggedCompanyId();
    this.activetype=1;
    this.createUser=AuthService.getLoggedUserId();
    this.gradeValue=AuthService.getLoggedGradeValue();
    this.createForm();
    this.getAllBranchName();
    this.getAllLocationName();
    this.getAllDepartmentName();
    this.getDesignationName();
    this.getProductionUnit();

  }


  getAll() {
    let filterModel = new ShiftAllowanceAssign();
     filterModel=this.shiftAllowanceEditForm.value;
     filterModel.companyID=this.f.companyID.value;
     this.shiftAllowanceService.getEditAllowance(filterModel).subscribe((response: ApiResponse) => {
       console.log(response.result);
       if (response.status) {
         this.shiftAssignAllowanceModel = response.result as ShiftAllowanceAssign[];
        this.totalEmp=this.shiftAssignAllowanceModel.length;

       }
     })
   }


   getAllBranchName() {
     this.basicEntryService.getBranch().subscribe((response: ApiResponse) => {
       if (response.status) {
         this.branch = response.result as BasicEntry[];
       }
     })
   }
   getAllLocationName() {
     this.basicEntryService.getLocation().subscribe((response: ApiResponse) => {
       if (response.status) {
         this.location = response.result as BasicEntry[];
       }
     })
   }
   getAllDepartmentName() {
     this.basicEntryService.getDepartment().subscribe((response: ApiResponse) => {
       if (response.status) {
         this.department = response.result as BasicEntry[];
       }
     })
   }
   getDesignationName() {
     this.basicEntryService.getDesignation().subscribe((response: ApiResponse) => {
       if (response.status) {
         this.designation = response.result as BasicEntry[];
       }
     })
   }
   getProductionUnit() {
     this.basicEntryService.getProductionUnit(this.companyId).subscribe((response: ApiResponse) => {
       if (response.status) {
         this.productionunit = response.result as BasicEntry[];
       }
     })
   }

  deleteEditShiftAllwnce(id:number,modal:any){
    this.idForDelete=id;
    this.modalService.open(modal);}
    confirmDelete(){
  this.shiftAllowanceService.deleteEditAllowance(this.idForDelete).subscribe((response:ApiResponse)=>{
  if(response.status){
  this.toaster.success(response.result,"Deleted successfully");
  this. getAll() ;
  this.modalService.dismissAll();
  }else{
    this.toaster.error(response.result,"Failed to delete");
  }

})
}
  cancel(){
    this.modalService.dismissAll();
  }

   getProductionLine(unitId: number) {
     if(unitId==null){
      this.productionline=[];
       return;}

     this.basicEntryService.getProductionLine(this.companyId, unitId).subscribe((response: ApiResponse) => {
       if (response.status) {
         this.productionline = response.result as BasicEntry[];
       }else{
        this.productionline=[];
       }
     })
   }
    getId(id:number){
      let item=this.alltabledata.find(c=>c.id==id);
      console.log(item);
    }


    updateEditAllowance(id:number){
    let editallowance=new ShiftAllowanceAssign();
    editallowance=this.shiftAllowanceEditForm.value;
    editallowance.id=id;
    editallowance.activeType=this.shiftAssignAllowanceModel.find(c=>c.id==id).activeType;
     this.shiftAllowanceService.updateEiditAllowance(editallowance).subscribe((response:ApiResponse)=>{
        if(response.status){
         this.getAll();
          this.toaster.success(response.result, "Success!")

        }else{
          this.toaster.error(response.result, "Failed!")
        }
      })
  }
 reset(){
   this.shiftAllowanceEditForm.reset();
   this.createForm();
   this.productionline=[];
 }
 createForm(){
   this.shiftAllowanceEditForm=this.formBuilder.group({
    //  id:[,[]],
     empCode:[,[Validators.required]],
     activeType:[this.activetype,[]],
     createUser:[,[]],
     companyID:[this.companyId,[]],
     gradeValue:[this.gradeValue,[]],
     departmentID:[,[]],
     designationID:[,[]],
     location:[,[]],
     branchID:[,[]],
     unite:[,[]],
     line:[,[]],
     empName:[,[]],
     designation:[,[]],
     department:[,[]],
    // selectedEmp:[this.selectedEmp,[]]
   })
 }
 get f (){
   return this.shiftAllowanceEditForm.controls;
 }

}
