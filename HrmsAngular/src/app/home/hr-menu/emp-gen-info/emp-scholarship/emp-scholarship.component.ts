import { NgbDateCustomParserFormatter } from './../../../../shared/dateformat';
import { ApiResponse } from './../../../../models/response.model';
import { EmployeeService } from './../../../../services/hr/employee.service';
import { EmpScholarship } from './../../../../models/hr/emp-scholarship.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit, Input } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { BasicEntry } from '../../../../models/system-setup/basic-entry.model';

@Component({
  selector: 'app-emp-scholarship',
  templateUrl: './emp-scholarship.component.html',
  styleUrls: ['./emp-scholarship.component.scss']
})
export class EmpScholarshipComponent implements OnInit {
  @Input() compId:number;
  @Input() empCode:string;
  @Input() empName:string;
  constructor(
    private formBuilder:FormBuilder,
    private employeeService:EmployeeService,
    private toaster:ToastrService,
    private dateFormat:NgbDateCustomParserFormatter,
    private modalService:NgbModal,
  ) { }
 empScholarshipForm:FormGroup;
 btnStatus='Save';
 empScholarshipModel:EmpScholarship[]=[];
  isSubmitted:boolean=false;
  idForDelete:any;
  allCountry:BasicEntry[]=[];
  ngOnInit() {
    this.compId=1;
    this.btnStatus='Save';
    this.createForm();
    this.getAllEmpScholarship();
  }
saveEmpScholarship(){
  console.log(this.empScholarshipForm.value);
  this.employeeService.saveUpdateAndDeleteScholarship(this.empScholarshipForm.value,1).subscribe((response:ApiResponse)=>{
    if(response.status){
      this.toaster.success(response.result,"Success!");
      this.getAllEmpScholarship();
      this.reset();
    }else
    {
      this.toaster.error(response.result,"Failed!");
    }
  })
}
updateEmpScholarship(){
  this.employeeService.saveUpdateAndDeleteScholarship(this.empScholarshipForm.value,2).subscribe((response:ApiResponse)=>{
    if(response.status){
      this.toaster.success(response.result,"Success!");
      this.getAllEmpScholarship();
      this.reset();
    }else
    {
      this.toaster.error(response.result,"Failed!");
    }
  })
}
deleteEmpScholarship(id:number,modal:any){
  let empSchlship=this.empScholarshipModel.find(c=>c.id==id);
  this.idForDelete=empSchlship;
  this.modalService.open(modal);
}
confirmRemoveScholarship(){
  this.employeeService.saveUpdateAndDeleteScholarship(this.idForDelete,3).subscribe((response:ApiResponse)=>{
    if(response.status){
      this.toaster.success(response.result,"Success!");
      this.getAllEmpScholarship();
      this.reset();
      this.modalService.dismissAll();
    }else
    {
      this.toaster.error(response.result,"Failed!");
    }
  })
}
 cancel(){
  this.modalService.dismissAll();
}

getById(rowId:number){
     let empsholarship=this.empScholarshipModel.find(c=>c.id==rowId);
    this.empScholarshipForm.patchValue(empsholarship);
       this.empScholarshipForm.patchValue({
         achievmentDateNgb: this.dateFormat.stringToNgbDate(empsholarship.achievmentDate)

      })
     this.btnStatus='Update'
}
onSubmit(){
  this.isSubmitted = true;
  if(this.empScholarshipForm.invalid){
    this.toaster.error("Fill all required field, * marked field are required!", 'Invalid Submission');
    return;
  }
  if(this.btnStatus=='Save')
  this.saveEmpScholarship();
  else
  this.updateEmpScholarship();
}
getAllEmpScholarship(){
  this.employeeService.getAllScholarship(this.empScholarshipForm.value,4).subscribe((response:ApiResponse)=>{
    console.log(response.result);
    if(response.status){
      this.empScholarshipModel=response.result as EmpScholarship[];
      this.reset();
    }else{
      this.empScholarshipModel=[];
    }
  })
}
reset(){
  this.empScholarshipForm.reset();
  this.createForm();
  this.isSubmitted=false;
  this.btnStatus = 'Save'
}
createForm(){
 this.empScholarshipForm=this.formBuilder.group({
  id   :[0,[]],
  empCode  :[this.empCode,[]],
  nameofScholarship  :[,[]],
  institute  :[,[]],
  duration  :[,[]],
  country  :[,[]],
  achievment  :[,[]],
  achievmentDate:[null,[]],
  achievmentDateNgb:[,[]],
  remark  :[,[]],
  userID  :[-1,[]],
  companyID  :[this.compId,[]]
 })
}
get f(){
  return this.empScholarshipForm.controls;
}
get formVal(){
  return this.empScholarshipForm.value;
}
}
