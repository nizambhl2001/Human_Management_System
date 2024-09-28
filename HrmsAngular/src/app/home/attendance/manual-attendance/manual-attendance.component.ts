import { AuthService } from './../../../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { Pagination } from '../../../shared/paginate';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { BasicEntryService } from '../../../services/system-setup/basic-entry.service';
import { ApiResponse } from '../../../models/response.model';
import { EmploymentService } from '../../../services/hr/employment.service';
import { CompanyService } from '../../../services/system-setup/company.service';
import { NgbDateCustomParserFormatter } from '../../../shared/dateformat';
import { SearchEmployee } from '../../../models/hr/search-emp.model';
import { AttendenceService } from '../../../services/Attendance/attendence.service';
import { ToastrService } from 'ngx-toastr';
import { ManualAttendence } from '../../../models/Attendance/manual-attendence.model';
import { id } from '@swimlane/ngx-datatable/release/utils';
import { Employment } from '../../../models/hr/employment.model';
import { CompanyModel } from '../../../models/security/company.model';

@Component({
  selector: 'app-manual-attendance',
  templateUrl: './manual-attendance.component.html',
  styleUrls: ['./manual-attendance.component.scss']
})
export class ManualAttendanceComponent extends Pagination implements OnInit {

manualAttForm:FormGroup
comId:number;
userId:number;
manualAttendenceItem:ManualAttendence[]=[];
isSubmitted=false;
isShowdata=false;
  constructor(
    private formBuilder:FormBuilder,
    private getCompany:CompanyService,
    private dateFormat:NgbDateCustomParserFormatter,
    private attnService:AttendenceService,
    private toster:ToastrService,
    private empService:EmploymentService
  ) {
    super();
  }
  title="Manual Attendance"
  ngOnInit() {
    this.items = [];
    this.update();
    this.comId=AuthService.getLoggedCompanyId();
    this.userId=AuthService.getLoggedUserId();
    this.createManualForm();
    //this.getAttendenceByDDMMYY();
  }

    // " mm/dd/yyyy to yyyymmdd" Bappy
    getDateToyyyyMMddB(dateStr:string){

      var date = [ dateStr.slice(6, 10),dateStr.slice(3,5),dateStr.slice(0, 2)].join('');
      return date;
  }


  getEmpInfo(data:any){
    if(data.empCode==null){
     this.manualAttForm.patchValue({
      empCod:"",
      empName:"",
      designation:"",
      department:"",
      joinDateNgb:"",
      location:""
     })
      return;
    }
    this.manualAttForm.patchValue({
      empCod:data.empCode,
      empName:data.empName,
      designation:data.designation,
      department:data.department,
      joinDateNgb:this.dateFormat.stringToNgbDate(data.joinDate.toString()),
    })

    this.getCompany.getCompany().subscribe((response:ApiResponse)=>{
      if(response.status){
      let address=response.result as CompanyModel
        this.f.location.patchValue(address[0].companyAddress);
      }
    });
   }

Save(){
  this.isShowdata=true;
  this.isSubmitted=true;
  if(this.manualAttForm.invalid){
  }
  else{
    let obj= new ManualAttendence();
   obj=this.manualAttForm.value;
   console.log(obj)
   obj.attnDate=this.dateFormat.getNgbDateToYyyymmdd(this.f.attnDateNgb.value).toString()
   obj.attnTime=this.dateFormat.getNgbTimeToStrTime(this.manualAttForm.value.attnTimeNgb)
 this.attnService.saveOrUpdateManualAttendence(obj).subscribe((response:ApiResponse)=>{
   if(response.status){
     this.toster.success(response.result,"Success");
     this.Reset();
   }else{
     this.toster.error(response.result,"Failed");
   }
 });
  }

}


getManualAttendenceById(id:number){
  debugger
  this.attnService.getManualAttendenceById(id).subscribe((response:ApiResponse)=>{
    if(response.status){
      this.manualAttForm.patchValue(response.result);
      console.log("fgf",response.result);
      let manualAttn:ManualAttendence=response.result as ManualAttendence;
      this.manualAttForm.patchValue({
        date:this.dateFormat.getYyyymmddToNgbDate(manualAttn.ddmmyyyy),
        attnTimeNgb: this.dateFormat.getHhmmssToNgbTime(manualAttn.attnTime)
    });
      this.empService.getEmployment(manualAttn.empCod,this.comId).subscribe((response:ApiResponse)=>{
        if(response.status){
          console.log(response.result)
          let empInfo = response.result as Employment;
          this.manualAttForm.patchValue({
            empCod:empInfo.empCode,
            empName:empInfo.empName,
            designation:empInfo.designation,
            department:empInfo.department,
            joinDateNgb:this.dateFormat.stringToNgbDate(empInfo.joinDate.toString()),
          })
        }
      });
      this.getCompany.getCompany().subscribe((response:ApiResponse)=>{
        if(response.status){
        let address=response.result as CompanyModel
          this.f.location.patchValue(address[0].companyAddress);
        }
      });

  }});
}


getAttendenceByDDMMYY(){

  this.isSubmitted=false;
  this.isShowdata=true;
  if(this.f.dDMMYYYY.value==null){
    this.toster.warning("Please Select Date First");
  }else{

   this.attnService.getManualAttendenceByDDMMYY(this.f.dDMMYYYY.value).subscribe((response:ApiResponse)=>{
    if(response.status){
       this.manualAttendenceItem=response.result as ManualAttendence[];
       console.log("this",this.manualAttendenceItem)

     }else{
       this.manualAttendenceItem=[];
     }
   });}

}

deleteManualAttendence(id:number){
  this.attnService.deleteManualAttenById(id).subscribe((response:ApiResponse)=>{
    if(response.status){
      this.toster.success(response.result,"Success");
      this.Reset();
    }
    else{
      this.toster.error(response.result,"Failed");
    }
  });
}


createManualForm(){
this.manualAttForm=this.formBuilder.group({
  id:[0,[]],
  companyID:[this.comId,[]],
  userID:[this.userId,[]],
  empCod:[,[]],
  empName:[,[]],
  designation:[,[]],
  department:[,[]],
  location:[,[]],
  joinDate:[,[]],
  joinDateNgb:[,[]],
  attnDate:[,[]],
  attnDateNgb:[,[]],
  typee:[,[Validators.required]],
  comment:[,[]],
  attnTimeNgb:[,[]],
  attnTime:[,[]],
  punch_time:[,[]],
  dDMMYYYY:[,[]],
  date:[this.dateFormat.getDateToYyyymmdd(this.date),[]],
})
}
date: any;
time: any;

_value;
label;

getDate() {
  let value = null;
  if (!this.date) {
    if (!this.time) value = "yyyy/MM/dd";
    else
      value =
        "yyyy/MM/dd"
  }
  if (!value) {
    value = new Date(Date.UTC(
      this.date.year,
      this.date.month -1,
      this.date.day,
    )).toISOString().split('T')[0]
    this._value=value ;
  } else
    this._value=null
  this.manualAttForm.get("dDMMYYYY").setValue(this._value);
  this.label=value;
}


get f(){
  return this.manualAttForm.controls;
}

reset() {
  this.manualAttForm.reset();
  this.date = null;
  this.time = null;
}

Reset(){
  if(this.f.typee.value==1){
  this.isSubmitted=false;
  this.isShowdata=false;
  this.manualAttForm.reset();
  this.createManualForm();
  this.manualAttendenceItem=[];
}else{
  this.isSubmitted=false;
  this.isShowdata=false;
}
}

}
