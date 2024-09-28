import { AuthService } from './../../../../services/auth.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { BasicEntryService } from './../../../../services/system-setup/basic-entry.service';
import { NgbDateCustomParserFormatter } from './../../../../shared/dateformat';
import { ApiResponse } from './../../../../models/response.model';
import { EmpTrainingInfo } from './../../../../models/hr/emp-training-info.model';
import { EmployeeService } from './../../../../services/hr/employee.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit, Input } from '@angular/core';
import { SearchEmployee } from '../../../../models/hr/search-emp.model';
import { ToastrService } from 'ngx-toastr';
import { BasicEntry } from '../../../../models/system-setup/basic-entry.model';

@Component({
  selector: 'app-emp-training-info',
  templateUrl: './emp-training-info.component.html',
  styleUrls: ['./emp-training-info.component.scss',
  '../../../../../vendor/libs/ng-select/ng-select.scss']
})
export class TrainingInfoComponent implements OnInit {
  @Input() compId:number;
  @Input() empCode:string;
  @Input() empName:string;

  constructor(
    private formBuilder:FormBuilder,
    private employeeService:EmployeeService,
    private toaster:ToastrService,
    private dateFormat:NgbDateCustomParserFormatter,
    private basicEntryService:BasicEntryService,
    private modalService:NgbModal

  ) { }
 empTrainingInfoform:FormGroup;
 trainingInfoModel:EmpTrainingInfo[]=[];
 btnStatus='Save';
 isSubmitted:boolean=false;
tableName:string="EmpTraining";
idForDelete:number;
allTrainingSponsorType:BasicEntry[]=[];
allTrainingType:BasicEntry[]=[];
allTrainingNature:BasicEntry[]=[];
allTrainingInstitution:BasicEntry[]=[];
allTrainingCountry:BasicEntry[]=[];

  ngOnInit() {
    this.compId=AuthService.getLoggedCompanyId();
    this.createForm();
    this.btnStatus='Save';
    this.getAll(this.empCode);
  }
getAll(empCode:string){
  if(empCode=="" || empCode==null){return;}
  this.employeeService.getAllTrainingInfo(this.compId, this.f.empCode.value).subscribe((response:ApiResponse)=>{
    console.log(response.result);
    if(response.status){
      this.trainingInfoModel=response.result as EmpTrainingInfo[];

    }else{
      this.trainingInfoModel=[];
    }
  })
}
getById(id:number){
  this.employeeService.getTrainingInfobyId(id).subscribe((response:ApiResponse)=>{
    if(response.status){
      let emptraininginfo=response.result as EmpTrainingInfo;
      console.log(emptraininginfo);
      this.empTrainingInfoform.patchValue(response.result);
      this.empTrainingInfoform.patchValue({
        fromDateNgb: this.dateFormat.stringToNgbDate(emptraininginfo.fromDate),
        toDateNgb: this.dateFormat.stringToNgbDate(emptraininginfo.toDate)
      })
      this.btnStatus='Update'
    }
  })
}
onSubmit(){
  this.isSubmitted = true;
    if(this.empTrainingInfoform.invalid){
      this.toaster.error("Fill all required field, * marked field are required!", 'Invalid Submission');
      return;
    }
  this.employeeService.saveorUpdateTrainingInfo(this.empTrainingInfoform.value).subscribe((response:ApiResponse)=>{
    if(response){
      this.toaster.success(response.result,"Success!");
      this.getAll(this.empCode);
      this.reset();
      this.btnStatus='Save'
    }
    else{
      this.toaster.error(response.result ,"Failed!")
    }
  })
}
cancel(){
  this.modalService.dismissAll();
}

deletetraining(id:number,modal:any){
  this.idForDelete=id;
  this.modalService.open(modal);
}
confirmRemoveTraining(){
  this.basicEntryService.deleteBasicEntry(this.tableName,this.idForDelete,this.compId).subscribe((response:ApiResponse)=>{
    if(response.status){
      this.toaster.success(response.result, 'Success');
      this.getAll(this.empCode);
      this.modalService.dismissAll;
      this.cancel();
    }else{
      this.toaster.error(response.result, 'Error!')
    }
  })
}
reset(){
  this.isSubmitted=false;

  this.empTrainingInfoform.reset();
  this.createForm();
  this.btnStatus='Save';
}
createForm(){
  this.empTrainingInfoform=this.formBuilder.group({
    id :[0,[]],
    empCode :[this.empCode,[]],
    trainingType :[,[]],
    trainingName :[,[]],
    trainingNature :[,[]],
    description :[,[]],
    institution :[,[]],
    trainingPlace :[,[]],
    country :[,[]],
    achievement :[,[]],
    sponsorType :[,[]],
    trainingFees :[,[]],
    otherCost :[null,[]],
    fromDate :[,[]],
    toDate :[,[]],
    companyID :[this.compId,[]],
    fromDateNgb:[,[]],
    toDateNgb:[,[]],
    trainingTypeName:[,[]],
    trainingNatureName:[,[]],
    trainingSponsorType:[,[]],
    trainingInstitutionName:[,[]],
    trainingCountryName:[,[]],
    tableName:[this.tableName,[]]
  })
}
get f(){
  return this.empTrainingInfoform.controls;
}
get formVal(){
  return this.empTrainingInfoform.value;
}

}
