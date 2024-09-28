import { AuthService } from './../../../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { Pagination } from '../../../shared/paginate';
import { ShowCauseService } from '../../../services/disciplinary-action/show-cause.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Showcause } from '../../../models/disciplinary-action/showcause.model';
import { ApiResponse } from '../../../models/response.model';
import { EmploymentService } from '../../../services/hr/employment.service';
import { PropertyService } from '../../../services/property.service';
import { Employment } from '../../../models/hr/employment.model';
import { BasicEntry } from '../../../models/system-setup/basic-entry.model';
import { BasicEntryService } from '../../../services/system-setup/basic-entry.service';
import { NgbDateCustomParserFormatter } from '../../../shared/dateformat';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { GenderComponent } from '../../system-setup/basic-entry/gender/gender.component';
import { ShowCauseResultComponent } from '../show-cause-result/show-cause-result.component';
import { MisconductComponent } from '../../system-setup/basic-entry/misconduct/misconduct.component';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-show-cause',
  templateUrl: './show-cause.component.html',
  styleUrls: ['./show-cause.component.scss']
})
export class ShowCauseComponent extends Pagination implements OnInit {

  allCauseRules:BasicEntry[]
  showCause:Showcause[]=[];
  showCauseForm:FormGroup;
  redetails:BasicEntry[]
  allReason: BasicEntry[] = [];
  compId: number;
  userId:number;
  btnStatus="Save";
  isSubmitted = false;


  constructor(private showCauseService :ShowCauseService,
    private formbuilder: FormBuilder,
    private employmentService: EmploymentService,
    private basicES:BasicEntryService,
    private employmentES:EmploymentService,
    private dateFrmat:NgbDateCustomParserFormatter,
    private modalService:NgbModal,
    private toster:ToastrService
    ) {
    super();
  }
  //Variable---------------------


  title="Show Cause Info";


  ngOnInit() {
    this.compId = AuthService.getLoggedCompanyId();
    this.userId=AuthService.getLoggedUserId();
    this.items=[];
    this.update();
    this.createShowCauseform();
    this.searchKeys=['empCode'];
    this.allRules();
    this.getAllShowCause();
    this.getAllShowCauseResultDetails();

  }

allRules(){
  this.basicES.getShowcaseRules().subscribe((response:ApiResponse)=>{
if(response.status){
  this.allCauseRules = response.result as BasicEntry[];
}
  })
}
getEmpInfo(empCode:string){
  if (empCode == "") {
    this.ResetForm();
    return;
  }
  this.employmentES.getEmployment(empCode,this.compId).subscribe((response:ApiResponse)=>{
    let empInfo=response.result as Employment;
    this.showCauseForm.patchValue({
     empCode:empInfo.empCode,
     empName:empInfo.empName,
     department:empInfo.department,
     designation:empInfo.designation
   })
  })
}

getAllShowCauseResultDetails(){
  this.basicES.getAllShowCauseResultDetails().subscribe((response:ApiResponse)=>{
    if(response.status){
      this.redetails = response.result as BasicEntry[]
    }
  })
}


  SaveShowCause(){
    this.isSubmitted=true;
    if(this.showCauseForm.invalid){
      this.toster.warning("Fill Required Fields");
      return;
    }else{
      this.btnStatus="Save";
    let showCauseObj =new Showcause();
    showCauseObj = this.showCauseForm.value;
    showCauseObj.startDate = this.dateFrmat.ngbDateToDate(this.f.startDateNgb.value);
    showCauseObj.endDate = this.dateFrmat.ngbDateToDate(this.f.endDateNgb.value);
    showCauseObj.showcaseDate = this.dateFrmat.ngbDateToDate(this.f.showcaseDateNgb.value);
  this.showCauseService.saveShowCause(this.showCauseForm.value).subscribe((response:ApiResponse)=>{
  if(response.status){
    this.toster.success(response.result,"Success");
    this.ResetForm();
    this.getAllShowCause();
    this.update();
  }else{
    this.toster.error(response.result,"Failed");
  }
});
    }
  }

  getById(id:number){
    this.btnStatus="Update";
    this.showCauseService.getShowCauseById(id).subscribe((response:ApiResponse)=>{
      if(response.status){
        let showCause = response.result as Showcause;
        showCause.startDateNgb = this.dateFrmat.stringToNgbDate(showCause.startDate.toString());
        showCause.endDateNgb = this.dateFrmat.stringToNgbDate(showCause.endDate.toString());
        showCause.showcaseDateNgb = this.dateFrmat.stringToNgbDate(showCause.showcaseDate.toString());
        this.showCauseForm.patchValue(response.result);
        this.getEmpInfo(showCause.empCode);
      }
    });
  }


getAllShowCause(){

  this.showCauseService.getAllShowCause().subscribe((response:ApiResponse)=>{
    if(response.status){
  this.items=response.result as Showcause[];
  this.showCause=response.result as Showcause[];
  this.update();
}
  })
}


  createShowCauseform(){
    this.showCauseForm= this.formbuilder.group({
      id : [0,[]],
      empCode : [,[Validators.required]],
      type : [0,[Validators.required]],
      startDateNgb : [0,[]],
      endDateNgb : [0,[]],
      startDate : [0,[]],
      endDate : [0,[]],
      showcaseDate : [,[]],
      showcaseDateNgb : [,[]],
      action : [,[Validators.required]],
      userID : [this.userId,[]],
      companyID : [this.compId,[]],
      remarks :[,[]],
      empName:[,[]],
      designation:[,[]],
      department:[,[]]
    })
  }

  get f() {
    return this.showCauseForm.controls;
  }

  addNewReason(){
    this.modalService.open(MisconductComponent)
  }

get formVal() {
  return this.showCauseForm.value;
}
  ResetForm(){
    this.btnStatus="Save";
    this.isSubmitted=false;
    this.showCauseForm.reset();
    this.createShowCauseform();
  }
}
