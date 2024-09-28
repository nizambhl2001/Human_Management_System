import { AuthService } from './../../../../services/auth.service';
import { NgbDateCustomParserFormatter } from './../../../../shared/dateformat';
import { EmpQualification } from './../../../../models/hr/emp-qualification-info.model';
import { EmployeeService } from './../../../../services/hr/employee.service';
import { ToastrService } from 'ngx-toastr';
import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ApiResponse } from '../../../../models/response.model';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { BasicEntry } from '../../../../models/system-setup/basic-entry.model';

@Component({
  selector: 'app-emp-qualification-info',
  templateUrl: './emp-qualification-info.component.html',
  styleUrls: ['./emp-qualification-info.component.scss']
})
export class EmpQualificationInfoComponent implements OnInit {
  @Input() compId:number;
  @Input() empCode:string;
  @Input() empName:string;
  btnStatus:string = 'Save';
  isSubmitted:boolean = false;
  qualificationForm:FormGroup;
  qualificationModel:EmpQualification[]=[];
 allqualificationModel:EmpQualification[]=[];
 idForDelete:any;
 allCountry:BasicEntry[]=[];
  constructor(
    private formBuilder:FormBuilder,
    private toaster:ToastrService,
    private employeeService:EmployeeService,
    private dateFormat:NgbDateCustomParserFormatter,
    private modalService:NgbModal
  ) { }
  ngOnInit() {
    this.compId=AuthService.getLoggedCompanyId();
    this.createForm();
    this.getAll();
    this.getByEmpCode();
  }
  onSubmit(){
    this.isSubmitted = true;
    if(this.qualificationForm.invalid){
      this.toaster.error("Fill all required field, * marked field are required!", 'Invalid Submission');
      return;
    }
    if(this.btnStatus=='Save')
    this.save();
    else
    this.update();
  }
  save(){
    this.employeeService.saveUpdateAndDeleteQualification(this.qualificationForm.value,1).subscribe((response:ApiResponse)=>{
      if(response.status){
        this.toaster.success(response.result,"Success!");
        this.reset();
        this.getByEmpCode();
        this.btnStatus='Save';
        this.getAll();
      }
      else{
        this.toaster.error(response.result ,"Failed!")
      }
    })
  }
  update(){
    this.employeeService.saveUpdateAndDeleteQualification(this.qualificationForm.value,2).subscribe((response:ApiResponse)=>{
      if(response.status){
        this.toaster.success(response.result,"Success!");
        this.reset();
        this.getByEmpCode();
        this.btnStatus='Save';
        let indexOfUpdatedItem = this.allqualificationModel.findIndex(c=>c.id==this.qualificationForm.value.id);
        this.allqualificationModel[indexOfUpdatedItem] = this.qualificationForm.value;
      }
      else{
        this.toaster.error(response.result ,"Failed!")
      }
    })
  }
  delete(id:number,modal:any){
    let qualification=this.allqualificationModel.find(c=>c.id==id);
    this.idForDelete=qualification;
    this.modalService.open(modal);
  }
   confirmRemoveQualification(){
    this.employeeService.saveUpdateAndDeleteQualification(this.idForDelete,3).subscribe((response:ApiResponse)=>{
      if(response){
        this.toaster.success(response.result,"Success!");
        this.getByEmpCode();
        this.reset();
        this.modalService.dismissAll();
      }
      else{
        this.toaster.error(response.result ,"Failed!")
      }
    })
  }
   cancel(){
    this.modalService.dismissAll();
 }
  getAll(){
    this.employeeService.getAllQualification(this.qualificationForm.value,4).subscribe((response:ApiResponse)=>{
      console.log(response.result);
      if(response.status){
        this.allqualificationModel=response.result as EmpQualification[];

      }else{
        this.qualificationModel=[];
      }
    })
  }
  getByEmpCode(){
    this.employeeService.getAllQualification(this.qualificationForm.value,6).subscribe((response:ApiResponse)=>{
      console.log(response.result);
      if(response.status){
        this.qualificationModel=response.result as EmpQualification[];

      }else{
        this.qualificationModel=[];
      }
    })
  }
  getById(id:number){
   let qualification=this.allqualificationModel.find(c=>c.id==id);
   console.log(qualification);
   this.employeeService.getAllQualification(qualification,5).subscribe((response:ApiResponse)=>{
    if(response.status){
      let proQualification=response.result as EmpQualification;
      this.qualificationForm.patchValue(response.result)
      this.qualificationForm.patchValue({
        fromDateNgb : this.dateFormat.stringToNgbDate(proQualification.fromDate),
        toDateNgb : this.dateFormat.stringToNgbDate(proQualification.toDate)
      })
      this.btnStatus='Update'
    }
   })
  }
  reset(){
    this.qualificationForm.reset();
    this.createForm();
    this.isSubmitted=false;
  }
  get f(){
    return this.qualificationForm.controls;
  }
  get formVal(){
    return this.qualificationForm.value;
  }
  createForm(){
    this.qualificationForm = this.formBuilder.group({
      id :[0,[]],
      empCode :[this.empCode,[]],
      certification :[,[]],
      institute :[,[]],
      location :[,[]],
      countryID :[,[]],
      fromDate :[,[]],
      fromDateNgb:[,[]],
      toDate :[,[]],
      toDateNgb:[,[]],
      duration :[,[]],
      achievement :[,[]],
      companyID :[this.compId,[]]
    })
  }
}
