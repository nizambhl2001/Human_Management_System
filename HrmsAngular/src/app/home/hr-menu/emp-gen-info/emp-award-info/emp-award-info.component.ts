import { AuthService } from './../../../../services/auth.service';
import { EmpAwardInfo } from './../../../../models/hr/emp-award-info.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit, Input } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { EmployeeService } from '../../../../services/hr/employee.service';
import { NgbDateCustomParserFormatter } from '../../../../shared/dateformat';
import { ApiResponse } from '../../../../models/response.model';
import { BasicEntry } from '../../../../models/system-setup/basic-entry.model';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-emp-award-info',
  templateUrl: './emp-award-info.component.html',
  styleUrls: ['./emp-award-info.component.scss']
})
export class EmpAwardInfoComponent implements OnInit {

  @Input() compId:number;
  @Input() empCode:string;
  @Input() empName:string;
  btnStatus:string = 'Save';
  isSubmitted:boolean = false;
  empAwardForm:FormGroup
  empAwarModel:EmpAwardInfo[]=[];
 allempAwarModel:EmpAwardInfo[]=[];
 allCountry:BasicEntry[]=[];
 idForDelete:any;
  constructor(
    private formBuilder:FormBuilder,
    private toaster:ToastrService,
    private employeeService:EmployeeService,
    private dateFormat:NgbDateCustomParserFormatter,
    private modalService:NgbModal,
  ) { }


  ngOnInit() {
    this.compId=AuthService.getLoggedCompanyId();
    this.createForm();
    this.getAll();
    this.getByEmpCode();
  }
  onSubmit(){
    this.isSubmitted = true;
    if(this.empAwardForm.invalid){
      this.toaster.error("Fill all required field, * marked field are required!", 'Invalid Submission');
      return;
    }
    if(this.btnStatus=='Save')
    this.save();
    else
    this.update();

  }
  save(){
    this.employeeService.saveUpdateAndDeleteAward(this.empAwardForm.value,1).subscribe((response:ApiResponse)=>{
      if(response.status){
        this.toaster.success(response.result,"Success!");
        this.reset();
        this.getByEmpCode();
        this.btnStatus='Save'
        this.getAll();
      }
      else{
        this.toaster.error(response.result ,"Failed!")
      }
    })

  }
  update(){
    this.employeeService.saveUpdateAndDeleteAward(this.empAwardForm.value,2).subscribe((response:ApiResponse)=>{
      if(response.status){
        this.toaster.success(response.result,"Success!");
        this.reset();
        this.getByEmpCode();
        this.btnStatus='Save'
      }
      else{
        this.toaster.error(response.result ,"Failed!")
      }
    })

  }
  delete(id:number ,modal:any){
    let awardinfo=this.allempAwarModel.find(c=>c.id==id);
    this.idForDelete=awardinfo;
    this.modalService.open(modal);
  }
  confirmRemoveAwar(){
    this.employeeService.saveUpdateAndDeleteAward(this.idForDelete,3).subscribe((response:ApiResponse)=>{
      if(response){
        this.toaster.error(response.result,"Deleted!");
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
    this.employeeService.getAllAward(this.empAwardForm.value,4).subscribe((response:ApiResponse)=>{
      if(response.status){
        this.allempAwarModel=response.result as EmpAwardInfo[];
      }else{
        this.empAwarModel=[];
      }
    })
  }
  getByEmpCode(){
    this.employeeService.getAllAward(this.empAwardForm.value,6).subscribe((response:ApiResponse)=>{
      if(response.status){
        this.empAwarModel=response.result as EmpAwardInfo[];

      }else{
        this.empAwarModel=[];
      }
    })
  }
  getById(id:number){
   let empaward=this.empAwarModel.find(c=>c.id==id);
   this.employeeService.getAllAward(empaward,5).subscribe((response:ApiResponse)=>{
    if(response.status){
      let awardInfo=response.result as EmpAwardInfo;
      this.empAwardForm.patchValue(awardInfo)
      this.empAwardForm.patchValue({
        awardDateNgb : this.dateFormat.stringToNgbDate(awardInfo.awardDate)
      })
      this.btnStatus='Update'
    }
   })
  }

  reset(){
    this.empAwardForm.reset();
    this.createForm();
    this.isSubmitted=false;
  }
  get f(){
    return this.empAwardForm.controls;
  }
  get formVal(){
    return this.empAwardForm.value;
  }
createForm(){
  this.empAwardForm=this.formBuilder.group({
    id :[0,[]],
    empCode :[this.empCode,[]],
    awardTitle :[,[]],
    institute :[,[]],
    location :[,[]],
    countryID :[,[]],
    awardDate :[,[]],
    awardDateNgb:[,[]],
    description :[,[]],
    companyID :[this.compId,[]]
  })
}

}
