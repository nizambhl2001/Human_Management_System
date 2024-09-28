import { AuthService } from './../../../services/auth.service';
import { ApiResponse } from './../../../models/response.model';
import { EmpTypeService } from './../../../services/system-setup/EmpType.service';
import { LeaveType } from './../../../models/leave/leave-type.model';
import { EmpTypeModel } from './../../../models/system-setup/EmpType.model';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { LeaveService } from '../../../services/leave.service';
import { ToastrService } from 'ngx-toastr';
import { Pagination } from '../../../shared/paginate';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-leave-setup',
  templateUrl: './leave-setup.component.html',
  styleUrls: [
    './leave-setup.component.scss',
    '../../../../vendor/libs/ng-select/ng-select.scss'
  ]
})
export class LeaveSetupComponent extends Pagination implements OnInit {

  constructor(
    private formBuilder:FormBuilder,
    private empTypeService:EmpTypeService,
    private leaveService:LeaveService,
    private toaster:ToastrService,
    private modalService:NgbModal
    ) {
      super();
    }

  title:string = "Leave Type Setup";
  btnStatus:string = 'Save';
  isSubmitted:boolean=false;
  userId:number=0;
  leaveTypeForm:FormGroup;
  empTypes:EmpTypeModel[]=[];
  leaveTypes:LeaveType[]=[];
  selectedIdForDelete:number=0;
  gradeValue:number;
  ngOnInit() {
    this.perPage = 5;
    this.gradeValue = AuthService.getLoggedGradeValue();
    this.createForm();
    this.getEmpType();
    this.getLeaveType(this.gradeValue)
  }

  getEmpType(){
    this.empTypeService.GetEmpType().subscribe((response:ApiResponse)=>{
      if(response.status){
        this.empTypes = response.result as EmpTypeModel[];
      }
    })
  }
  getLeaveType(empType:number){
    if(empType==0 || empType==null){
      empType=-1
    }
    this.leaveService.getLeaveType(empType,0).subscribe((response:ApiResponse)=>{
      if(response.status){
        this.leaveTypes = response.result as LeaveType[];
        this.items = response.result as LeaveType[];
        this.update();
      }
    })
  }
  onSubmit(){
    this.isSubmitted=true;
    if(this.leaveTypeForm.invalid){
      this.toaster.error('Please fill all required field, * marked field are required.', 'Invalid Submission!');
      return;
    }
    this.leaveService.saveOrUpdateLeaveType(this.leaveTypeForm.value).subscribe((response:ApiResponse)=>{
      if(response.status){
        this.toaster.success(response.result, 'Success!');
        this.getLeaveType(this.f.gradeValue.value)
        this.reset();
      }else{
        this.toaster.error(response.result, 'Failed');
      }
    })
  }
  edit(id:number){
    let leaveType = this.leaveTypes.find(c=>c.id==id);
    this.leaveTypeForm.setValue(leaveType);
    this.btnStatus='Update';
  }
  delete(id:number,modal:any){
    this.selectedIdForDelete = id;
    this.modalService.open(modal)
  }
  confirmDelete(id:number){
    this.leaveService.deleteLeaveType(id)
    .subscribe(
      (response:ApiResponse)=>{
        if(response.status){
          this.getLeaveType(this.gradeValue)
          this.modalService.dismissAll();
          this.toaster.warning(response.result, 'Deleted!')
        }else{
          this.toaster.error(response.result, 'Failed')
        }
      },
      (err)=>{
        console.log(err)
      }
    )
  }

  createForm(){
    this.leaveTypeForm = this.formBuilder.group({
      id:[0,[]],
      typeName:[,[Validators.required]],
      maxDays:[,[Validators.required]],
      typeee:[,[]],
      shortn:[,[Validators.required]],
      gradeValue:[,[Validators.required]],
      sortOrder:[,[]],
      applyMax:[,[Validators.required]],
      userID:[this.userId,[]],
      msg: [,[]],
      pOptions:[,[]]
    })
  }
  get f(){
    return this.leaveTypeForm.controls;
  }
  reset(){
    this.createForm();
    this.btnStatus = 'Save';
    this.isSubmitted=false;
  }



}
