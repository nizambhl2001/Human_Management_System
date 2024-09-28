import { AuthService } from './../../../services/auth.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Pagination } from '../../../shared/paginate';
import { DatatableComponent } from '@swimlane/ngx-datatable';
import { AppService } from '../../../app.service';
import { FormBuilder, FormGroup, Validators, FormArray, FormControl } from '@angular/forms';
import { BasicEntry } from '../../../models/system-setup/basic-entry.model';
import { AttendenceService } from '../../../services/Attendance/attendence.service';
import { ApiResponse } from '../../../models/response.model';
import { WeekEndSetup } from '../../../models/Attendance/week-end-setup.model';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-weekend-setup',
  templateUrl: './weekend-setup.component.html',
  styleUrls: [
    './weekend-setup.component.scss',
    '../../../../../node_modules/@swimlane/ngx-datatable/release/index.css',
    '../../../../../node_modules/@swimlane/ngx-datatable/release/assets/icons.css',
    '../../../../vendor/libs/ng-select/ng-select.scss',
    '../../../../vendor/libs/ngx-datatable/ngx-datatable.scss'
  ]
})
export class WeekendSetupComponent extends Pagination implements OnInit {

title="Weekend Setup";

isSubmitted=false;
weeKendSetupForm:FormGroup;
userId:number;
comId:number;
departmentItem:BasicEntry[]=[];
branchItem:BasicEntry[]=[];
locationItem:BasicEntry[]=[];
weekEndItem:WeekEndSetup[]=[];
weekEndFormList:FormArray;
grade:number;
constructor(
  private formBuilder:FormBuilder,
  private attendenceService:AttendenceService,
  private toster:ToastrService

) {
  super();
  this.weekEndFormList= this.formBuilder.array([]);
}


  ngOnInit() {
    this.items=[];
    this.update();
    this.userId=AuthService.getLoggedUserId();
    this.comId=AuthService.getLoggedCompanyId();
    this.grade=AuthService.getLoggedGradeValue();
    this.createWeekendForm();
  }



  getEmpCode(empCode:String){
   this.weeKendSetupForm.patchValue({
     empCode:empCode
   })
  }

getAllWeekEndList(){
  this.attendenceService.getWeekEndList(this.weeKendSetupForm.value,3).subscribe((response:ApiResponse)=>{
    if(response.status){
      this.items=response.result as WeekEndSetup[];
      this.update();
      this.weekEndFormList=this.formBuilder.array([]);
      this.items.forEach(item=>{
        this.weekEndFormList.push(
          new FormGroup({
            empCode: new FormControl(item.empCode,[Validators.required]),
            empName: new FormControl(item.empName,[Validators.required]),
            designation: new FormControl(item.designation,[Validators.required]),
            department: new FormControl(item.department,[Validators.required]),
            weekEndDay: new FormControl(item.weekEndDay,[Validators.required])
          })
        )
      })

    }else{
      this.items=[];
      this.update();
      this.weekEndFormList=this.formBuilder.array([]);
    }
  })
}


saveWeekEndSetup(){
  this.isSubmitted=true;
  if(this.weeKendSetupForm.invalid){
  }else{
    let obj= new WeekEndSetup();
  obj=this.weeKendSetupForm.value;
  obj.weekEndFormArray=this.weekEndFormList.value;
  this.attendenceService.saveWeekEndSetup(obj,1).subscribe((response:ApiResponse)=>{
    if(response.status){
      this.toster.success(response.result,"Success");
      this.Reset();
    }
    else{
      this.toster.error(response.result,"Failed");
    }
  });
  }

}

deleteFromList(id){
  this.weekEndFormList.removeAt(id);
}

  createWeekendForm(){
    this.weeKendSetupForm= this.formBuilder.group({
      id:[0,[]],
      empCode:[,[Validators.required]],
      userID:[this.userId,[]],
      companyID:[this.comId,[]],
      departmentID: [,[]],
      designationID:[,[]],
      branchID:[,[]],
      locationID:[,[]],
      grade:[this.grade,[]],
      day:[,[]]
    })
  }

  get f(){
   return this.weeKendSetupForm.controls;
  }

  Reset(){
    //this.btnStatus="Save";
    this.isSubmitted=false;
    this.weekEndFormList=this.formBuilder.array([]);
    this.weeKendSetupForm.reset();
    this.createWeekendForm();
    this.items=[];
    this.update();
  }

}
