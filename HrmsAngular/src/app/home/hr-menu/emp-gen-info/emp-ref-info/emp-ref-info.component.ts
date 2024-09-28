import { EmpReference } from './../../../../models/hr/emp-ref-info.model';
import { ApiResponse } from './../../../../models/response.model';
import { BasicEntryService } from './../../../../services/system-setup/basic-entry.service';
import { BasicEntry } from './../../../../models/system-setup/basic-entry.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { EmployeeService } from './../../../../services/hr/employee.service';
import { Component, OnInit, Input } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';

@Component({
  selector: 'app-emp-ref-info',
  templateUrl: './emp-ref-info.component.html',
  styleUrls: ['./emp-ref-info.component.scss']
})
export class EmpRefInfoComponent implements OnInit {

  @Input() compId:number;
  @Input() empCode:string;
  @Input() empName:number;
  btnStatus:string='Save';
  referenceId:number=0;
  referenceForm:FormGroup;
  isSubmitted:boolean = false;
  allOrganization:BasicEntry[]=[];
  allDesignation:BasicEntry[]=[];
  allRelationship:BasicEntry[]=[];
  allReference:EmpReference[]=[];
  constructor(
    private empService:EmployeeService,
    private basicES:BasicEntryService,
    private toasterService:ToastrService,
    private modalService:NgbModal,
    private frmBuilder:FormBuilder
  ) { }
  ngOnInit() {
    this.createForm();
    this.getAllOrganization()
    this.getAllDesignation();
    this.getAllRelationship();
    this.getAllReference();
  }
  get f(){
    return this.referenceForm.controls;
  }
  getAllOrganization(){
   this.basicES.getOrganization().subscribe((response:ApiResponse)=>{
     if(response.status){
       this.allOrganization = response.result as BasicEntry[];
     }
   })
  }
  getAllDesignation(){
    this.basicES.getDesignation().subscribe((response:ApiResponse)=>{
      if(response.status){
        this.allDesignation = response.result as BasicEntry[];
      }
    })
  }
  getAllRelationship(){
    this.basicES.getRelationship().subscribe((response:ApiResponse)=>{
      if(response.status){
        this.allRelationship = response.result as BasicEntry[];
      }
    })
  }
  onSubmit(){
    this.isSubmitted=true;
    if(this.referenceForm.invalid){
      this.toasterService.error('* mark field are required, fill all required field!');
      return null;;
    }
    if(this.referenceForm.controls.id.value>0){
       this.empService.updateRefInfo(this.referenceForm.value).subscribe((response:ApiResponse)=>{
         if(response.status){
           this.toasterService.success(response.result, 'Success!');
           this.btnStatus='Save';
           this.reset();
           this.getAllReference();
         }else{
           this.toasterService.error(response.result, 'Error!');
         }
       })
    }else{
      this.empService.saveRefInfo(this.referenceForm.value).subscribe((response:ApiResponse)=>{
        if(response.status){
          this.toasterService.success(response.result, 'Success!');
          this.reset();
          this.getAllReference();
        }else{
          this.toasterService.error(response.result, 'Error!');
        }
      })
    }
  }
  getAllReference(){
    if(this.empCode=="" || this.empCode==null){return;}
    this.empService.getAllReference(this.compId, this.empCode).subscribe((response:ApiResponse)=>{
      if(response.status){
        this.allReference = response.result as EmpReference[];
      }
    });
  }
  getReference(refId:number){
    this.empService.getReference(refId).subscribe((response:ApiResponse)=>{
      if(response.status){
        this.referenceForm.setValue(response.result);
        this.btnStatus = 'Update';
      }
    })
  }
  delete(refId:number, deleteModal){
    this.referenceId = refId;
    this.modalService.open(deleteModal);
  }
  confirmDelete(){
    this.empService.deleteReference(this.referenceId).subscribe((response:ApiResponse)=>{
      if(response.status){
        this.toasterService.warning(response.result, 'Deleted!');
        this.getAllReference();
        this.cancel();
      }
    })
  }
  cancel(){
    this.modalService.dismissAll();
  }
  get formVal(){
    return this.referenceForm.value;
  }
  createForm(){
    this.referenceForm = this.frmBuilder.group({
      id:[0,],
      empCode:[this.empCode, []],
      name:[, []],
      organization:[, []],
      designation:[, []],
      relationship:[, []],
      address:[, []],
      mobile:[, []],
      phone:['', []],
      email:[, []],
      remarks:['', []],
      companyID:[this.compId,[]],
    })
  }
  reset(){
    this.referenceForm.reset();
    this.btnStatus = 'Save';
    this.isSubmitted=false;
  }
  createNewRelationShip(modal:any){
    this.modalService.open(modal);
  }

}
