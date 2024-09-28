import { ApiResponse } from './../../../../models/response.model';
import { NgbModal, NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { BasicEntry } from './../../../../models/system-setup/basic-entry.model';
import { Component, OnInit, Input } from '@angular/core';
import { EmpExperience } from '../../../../models/hr/emp-experience-info.model';
import { BasicEntryService } from '../../../../services/system-setup/basic-entry.service';
import { EmployeeService } from '../../../../services/hr/employee.service';
import { ToastrService } from 'ngx-toastr';
import { NgbDateCustomParserFormatter } from '../../../../shared/dateformat';

@Component({
  selector: 'app-emp-experience-info',
  templateUrl: './emp-experience-info.component.html',
  styleUrls: [
    './emp-experience-info.component.scss',
    '../../../../../vendor/libs/ng-select/ng-select.scss']
})
export class EmpExperienceInfoComponent implements OnInit {

  @Input() compId:number;
  @Input() empCode:string;
  @Input() empName:string;

  isSubmitted:boolean=false;
  btnStatus:string='Save';
  allCountry:BasicEntry[] = [];
  allExperienceType:BasicEntry[]=[];
  experienceForm:FormGroup;
  allExperience:EmpExperience[]=[];
  experienceInfo:EmpExperience;
  experienceId:number;
  constructor(
    private basicES:BasicEntryService,
    private empService:EmployeeService,
    private modalService:NgbModal,
    private toaster:ToastrService,
    private formBuilder:FormBuilder,
    private dateFormat:NgbDateCustomParserFormatter
  ) { }
  ngOnInit() {
    this.createForm();
    this.getAllCountry();
    this.getAllExpType();
    this.getAllExperience();
  }
  onSubmit(){
    this.isSubmitted = true;
    if(this.experienceForm.invalid){
      this.toaster.error("Fill all required field, * marked field are required!", 'Invalid Submission');
      return;
    }
    this.empService.saveEmpExperience(this.experienceForm.value).subscribe((response:ApiResponse)=>{
      if(response.status){
        this.toaster.success(response.result, 'Success!');
        this.getAllExperience();
        this.reset();
      }
    })
  }
  getAllExperience(){
    if(this.empCode=="" || this.empCode==null){return;}
    this.empService.getEmpAllExperience(this.compId, this.empCode).subscribe((response:ApiResponse)=>{
       if(response.status){
         this.allExperience = response.result as EmpExperience[];
       }
    })
  }
  getExperienceInfo(experienceId:number){
    this.empService.getEmpExperience(experienceId).subscribe((response:ApiResponse)=>{
      if(response.status){
        let empExp = response.result as EmpExperience;
        //empExp.joinDateNgb = this.dateFormat.stringToNgbDate(empExp.joinDate);
        //empExp.endDateNgb = this.dateFormat.stringToNgbDate(empExp.endDate);
        this.experienceForm.setValue(response.result);
        this.btnStatus = 'Update';
      }
    })
  }
  getAllCountry(){
    this.basicES.getCountry().subscribe((response:ApiResponse)=>{
      if(response.status){
        this.allCountry = response.result as BasicEntry[];
      }
    })
  }
  getAllExpType(){
    this.basicES.getExperienceType().subscribe((resposne:ApiResponse)=>{
      if(resposne.status){
        this.allExperienceType = resposne.result as BasicEntry[];
      }
    })
  }
  delete(id:number, deleteModal:any){
    this.experienceId = id;
    this.modalService.open(deleteModal);
  }
  confirmDelete(){
    this.empService.deleteEmpExperience(this.experienceId).subscribe((response:ApiResponse)=>{
      if(response.status){
        this.toaster.warning(response.result, 'Deleted');
        this.getAllExperience();
        this.modalService.dismissAll();
      }else{
        this.toaster.error(response.result, 'Error!')
      }
    })
  }
  get f (){
    return this.experienceForm.controls;
  }
  get formVal(){
    return this.experienceForm.value;
  }
  createForm(){
    this.experienceForm = this.formBuilder.group({
      id :[0,[]],
      empCode :[this.empCode,[]],
      organization :[,[]],
      address :[,[]],
      joinDate :[,[]],
      //joinDateNgb :[,[Validators.required]],
      endDate :[,[]],
      //endDateNgb :[,[Validators.required]],
      yearOfExperience :[,[]],
      position :[,[]],
      designation :[,[]],
      phoneNo :[,[]],
      jobDescription :[,[]],
      supervisorName :[,[]],
      supervisorMobileNo :[,[]],
      companyID :[this.compId,[]],
      countryID :[,[]],
      exprienceType :[,[]],
    })
  }
  reset(){
    this.experienceForm.reset();
    this.createForm();
    this.isSubmitted=false;
  }
  cancel(){
    this.experienceId=0;
    this.modalService.dismissAll();
  }

}
