import { AuthService } from './../../../services/auth.service';
import { Pagination } from './../../../shared/paginate';
import { Component, OnInit } from '@angular/core';
import { PunishmentService } from '../../../services/disciplinary-action/punishment.service';
import { ApiResponse } from '../../../models/response.model';
import { Punishment } from '../../../models/disciplinary-action/punishment.model';
import { BasicEntryService } from '../../../services/system-setup/basic-entry.service';
import { BasicEntry } from '../../../models/system-setup/basic-entry.model';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { EmploymentService } from '../../../services/hr/employment.service';
import { Employment } from '../../../models/hr/employment.model';
import { NgbDateCustomParserFormatter } from '../../../shared/dateformat';
import { MisconductComponent } from '../../system-setup/basic-entry/misconduct/misconduct.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-punishment',
  templateUrl: './punishment.component.html',
  styleUrls: ['./punishment.component.scss']
})
export class PunishmentComponent extends Pagination implements OnInit {


  punishment:Punishment[]=[];
  userId:number;
  compId:number;
  gradeValue:number;
  Action:BasicEntry[]=[];
  punishmentType:BasicEntry[]=[];
  punishmentForm:FormGroup;
  btnStatus="Save";
  isSubmitted = false;

  constructor(
    private punishmentService:PunishmentService,
    private basicES:BasicEntryService,
    private formBuilder:FormBuilder,
    private employmentES:EmploymentService,
    private empService:EmploymentService,
    private dateFormator:NgbDateCustomParserFormatter,
    private modalService:NgbModal,
    private toster:ToastrService
  ) {
    super();
  }
  title="Employee Punishment";


  ngOnInit() {
    this.items = [];
    this.update();
    this.userId=AuthService.getLoggedUserId();
    this.compId=AuthService.getLoggedCompanyId();
    this.searchKeys=['empName']
    this.gradeValue=AuthService.getLoggedGradeValue();
    this.getAllPunishmentList();
    this.createPunishmentForm();
    this.getAllAction();
    this.getAllPunishmentType();
  }

  getEmpInfo(empCode:string){
    if (empCode == "") {
      this.reset();
      return;
    }
    this.employmentES.getEmployment(empCode,this.compId).subscribe((response:ApiResponse)=>{
      let empInfo=response.result as Employment;
      this.punishmentForm.patchValue({
       empCode:empInfo.empCode,
       empName:empInfo.empName,
       department:empInfo.department,
       designation:empInfo.designation
     })
    })
  }
saveUpdate(){
  this.isSubmitted=true;
      if(this.punishmentForm.invalid){
        this.toster.warning("Fill Required Fields");
        return;
      }else{
        this.btnStatus="Save";
  let punsishmentObj =new Punishment();
  punsishmentObj = this.punishmentForm.value;
  punsishmentObj.startDate = this.dateFormator.ngbDateToDate(this.f.startDateNgb.value);
  punsishmentObj.endDate = this.dateFormator.ngbDateToDate(this.f.endDateNgb.value);
  punsishmentObj.dateOfLetterIssue = this.dateFormator.ngbDateToDate(this.f.dateOfLetterIssueNgb.value);
  this.punishmentService.saveUpdate(this.punishmentForm.value).subscribe((response:ApiResponse)=>{
    if(response.status){
      this.toster.success(response.result,"Success");
      this.getAllPunishmentList();
      this.update();
      this.reset();
    }else{
      this.toster.error(response.result,"Failed");
    }
  });
      }}


getByID(id:number){
  this.btnStatus="Update";
  this.punishmentService.getByid(id).subscribe((response:ApiResponse)=>{
    if(response.status){
      let punishment = response.result as Punishment;
       punishment.startDateNgb= this.dateFormator.stringToNgbDate(punishment.startDate.toString());
       punishment.endDateNgb = this.dateFormator.stringToNgbDate(punishment.endDate.toString());
       punishment.dateOfLetterIssueNgb = this.dateFormator.stringToNgbDate(punishment.dateOfLetterIssue.toString());
      this.punishmentForm.patchValue(response.result);
      this.getEmpInfoById(punishment.empCode);

    }
  })
}
dateDiff(){
  let duration=this.dateFormator.getDateDiff(this.formVal.startDateNgb,this.formVal.endDateNgb);
  this.punishmentForm.controls.sDays.setValue(duration);
}
  getAllPunishmentList(){
this.punishmentService.getAll(null,this.gradeValue,this.compId).subscribe((response:ApiResponse)=>{
  if(response.status){
    this.items=response.result as Punishment[]
  this.punishment = response.result as Punishment[];
  this.update();
  }
})
  }

  getAllAction(){
    this.basicES.getAllAction().subscribe((response:ApiResponse)=>{
      if(response.status){
        this.Action= response.result as BasicEntry[];
      }
    })
  }


  getAllPunishmentType(){
    this.basicES.getAllPunishmentType().subscribe((response:ApiResponse)=>{
      if(response.status){
        this.punishmentType = response.result as BasicEntry[];
      }
    })
  }


  getEmpInfoById(empCode: string) {
    if (empCode == "") {
      return;
    }
      this.empService.getEmployment(empCode, this.compId).subscribe((response: ApiResponse) => {

        if (response.status) {
          let empInfo = response.result as Employment;
          this.f.empName.setValue(empInfo.empName);
          this.f.department.setValue(empInfo.department);
          this.f.designation.setValue(empInfo.designation);
        }

      })
  }



  reset(){
    this.btnStatus="Save";
    this.isSubmitted=false;
    this.punishmentForm.reset();
    this.createPunishmentForm();
  }

  get formVal() {
    return this.punishmentForm.value;
  }
  createPunishmentForm(){
    this.punishmentForm=this.formBuilder.group({
      id :[0,[]],
      empCode  :[,[Validators.required]],
      dateOfLetterIssueNgb:[0,[]],
      dateOfLetterIssue:[0,[]],
      actionID :[,[Validators.required]],
      natureOfPunishmentID :[,[Validators.required]],
      startDateNgb  :[this.dateFormator.getCurrentNgbDate(),[]],
      endDateNgb :[this.dateFormator.getCurrentNgbDate(),[]],
      sDays :[0,[]],
      userID :[this.userId,[]],
      companyID :[this.compId,[]],
      empName:[,[]],
      designation:[,[]],
      department:[,[]],
      description:[,[]]
    })
  }


get f(){
return this.punishmentForm.controls
}


addNewReason(){
  this.modalService.open(MisconductComponent)
}

}
