import { AuthService } from './../../../../services/auth.service';
import { EmpEducation } from './../../../../models/hr/emp-edu-info.model';
import { ApiResponse } from './../../../../models/response.model';
import { BasicEntry } from './../../../../models/system-setup/basic-entry.model';
import { ToastrService } from 'ngx-toastr';
import { BasicEntryService } from './../../../../services/system-setup/basic-entry.service';
import { Component, OnInit, Input } from '@angular/core';
import { EmployeeService } from '../../../../services/hr/employee.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormControl, FormBuilder, Validators, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-emp-education-info',
  templateUrl: './emp-education-info.component.html',
  styleUrls: ['./emp-education-info.component.scss']
})
export class EmpEducationInfoComponent implements OnInit {

  @Input() compId:number;
  @Input() empCode:string;
  @Input() empName:string;
  educationForm:FormGroup;
  allEduLevel:BasicEntry[]=[];
  allEduGroup:BasicEntry[]=[];
  allInstitute:BasicEntry[]=[];
  allEduBoard:BasicEntry[]=[];
  allCountry:BasicEntry[]=[];
  allYear:BasicEntry[]=[];
  allResultType:BasicEntry[]=[];
  empAllEduInfo:EmpEducation[]=[];
  isSubmitted:boolean=false;
  empEduId:number;
  btnStatus:string='Save';
  constructor(
    private empService:EmployeeService,
    private basicES:BasicEntryService,
    private toasterService:ToastrService,
    private modalService:NgbModal,
    private frmBuilder:FormBuilder
  ) { }
  ngOnInit() {
    this.createForm();
    this.compId = AuthService.getLoggedCompanyId();
    this.getEduGroup();
    this.getResultType();
    this.getEmpAllEduInfo();
  }
  getEduGroup(){
    this.basicES.getEduGroup().subscribe((response:ApiResponse)=>{
      if(response.status){
        this.allEduGroup = response.result as BasicEntry[];
      }
    })
  }
  getResultType(){
    this.basicES.getResult().subscribe((response:ApiResponse)=>{
      if(response.status){
        this.allResultType = response.result as BasicEntry[];
      }
    })
  }
  onSubmit(){
    this.isSubmitted = true;
    if(this.educationForm.invalid){
      this.toasterService.error(' fill all required filed! * mark field are required.', 'Invalid Submission');
      return null;
    }else{
      this.empService.saveEmpEdu(this.educationForm.value).subscribe((response:ApiResponse)=>{
        if(response.status){
          this.toasterService.success(response.result, 'Success');
          this.getEmpAllEduInfo();
          this.reset();
        }else{
          this.toasterService.error(response.result, 'Error!');
        }
      })
    }

  }
  getEmpAllEduInfo(){
    if(this.empCode=="" || this.empCode==null){return;}
    this.empService.getEmpAllEdu(this.compId, this.empCode).subscribe((response:ApiResponse)=>{
      if(response.status){
        this.empAllEduInfo = response.result as EmpEducation[];
      }else{
        this.empAllEduInfo=[];
      }
    })
  }
  getEmpEdu(empEduId:number){
    this.empService.getEmpEdu(empEduId).subscribe((resposne:ApiResponse)=>{
      if(resposne.status){
        this.educationForm.setValue(resposne.result);
        this.btnStatus='Update';
      }
    })
  }
  deleteEdu(empEduId:number, deleteModal:any){
    this.empEduId = empEduId;
    this.modalService.open(deleteModal);
  }
  confirmDelete(){
    this.empService.deleteEmpEdu(this.empEduId).subscribe((response:ApiResponse)=>{
      if(response.status){
        this.modalService.dismissAll();
        this.getEmpAllEduInfo();
        this.toasterService.warning(response.result, 'Deleted!');
      }
    })
  }
  cancel(){
    this.modalService.dismissAll()
  }
  reset(){
    this.educationForm.reset();
    this.createForm();
    this.isSubmitted = false;
    this.btnStatus = 'Save';
  }

  get f(){
    return this.educationForm.controls;
  }
  get formVal(){
    return this.educationForm.value;
  }
  createForm(){
    this.educationForm = this.frmBuilder.group({
      id :[0, []],
      empCode :[this.empCode, []],
      name :[, []],
      levelof :[, []],
      institute :[, []],
      pasyear :[, []],
      marks :[, []],
      duration :[, []],
      subject :[, []],
      result :[, []],
      achivement :[, []],
      companyID :[this.compId, []],
      educationBoard :[, []],
      country :[, []],
      degreeTitle:[,[]],
      instituteName:[,[]],
      educationLevel:[,[]],
      yearName:[,[]],
      resultName:[,[]],
      groupName:[,[]]
    })
  }

}
