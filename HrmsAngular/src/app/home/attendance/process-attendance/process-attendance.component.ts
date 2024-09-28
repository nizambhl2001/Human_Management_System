import { AuthService } from './../../../services/auth.service';
import { NgbDateCustomParserFormatter } from './../../../shared/dateformat';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

import { ToastrService } from 'ngx-toastr';
import { AttendenceService } from '../../../services/Attendance/attendence.service';
import { ApiResponse } from '../../../models/response.model';


@Component({
  selector: 'app-process-attendance',
  templateUrl: './process-attendance.component.html',
  styleUrls: ['./process-attendance.component.scss']
})
export class ProcessAttendanceComponent implements OnInit {

  comId:number;
  userId:number;
  processAttendenceForm:FormGroup
  isLoading: boolean = false;
  isSubmitted=false;
  constructor(

    private formBuilder:FormBuilder,
    private toster:ToastrService,
    private attnService:AttendenceService,
    private dateFormator:NgbDateCustomParserFormatter
  ) { }
  title="Process Attendance Data";
  ngOnInit() {
    this.comId=AuthService.getLoggedCompanyId();
    this.userId=AuthService.getLoggedUserId();
    this.createProcessAttendence();
  }

  getBranchId(branch:any){
    if(branch==null){
      return;
    }else{
      this.f['branch'].patchValue(branch.id)
    }
  }


processAttendenceData(){
  this.isLoading = true;
  this.isSubmitted=true;
  if(this.processAttendenceForm.invalid){
    this.toster.warning("Fill Required Fields");
  }else{
    // let date = this.dateFormator.getNgbDateToYyyymmdd(this.f.dateNgb.value);
    // console.log(date,this.comId,this.f.branch.value);
    this.attnService.processAttendenceData(this.f.strDate.value,this.f.endDate.value,this.comId,-1).subscribe((response:ApiResponse)=>{
      if(response.status){
        this.toster.success(response.result,"Success");

      }else{
        this.toster.error(response.result,"Failed");
      }
      this.isLoading = false;
    });
  }

}


  createProcessAttendence(){
    this.processAttendenceForm=this.formBuilder.group({
      companyID:[this.comId,[]],
      userID:[this.userId,[]],
      branch:[,[]],
      date:[,[]],
      strDate:[,[Validators.required]],
      endDate:[,[Validators.required]],
      // dateNgb:[,[Validators.required]]
    })
  }

  get f(){
    return this.processAttendenceForm.controls;
  }

  Reset(){
    this.isSubmitted=false;
    this.processAttendenceForm.reset();
    this.createProcessAttendence();
  }
}
