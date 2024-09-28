import { Component, OnInit } from '@angular/core';
import { Pagination } from '../../../shared/paginate';
import { FormBuilder, FormGroup, FormArray, FormControl, Validators } from '@angular/forms';
import { SalaryProcessService } from '../../../services/salary-process/salary-process-service.service';
import { ApiResponse } from '../../../models/response.model';
import { SalaryEdit } from '../../../models/salary-process/salary-edit.model';
import { ToastrService } from 'ngx-toastr';
import { formControlBinding } from '@angular/forms/src/directives/reactive_directives/form_control_directive';
import { SalaryPublish } from '../../../models/salary-process/salary-publish.model';
import { FinalSettlementComponent } from '../../settlement/final-settlement/final-settlement.component';

@Component({
  selector: 'app-salary-publish',
  templateUrl: './salary-publish.component.html',
  styleUrls: ['./salary-publish.component.scss','../../../../vendor/libs/ng-select/ng-select.scss']
})
export class SalaryPublishComponent extends Pagination implements OnInit {

  salaryPublishForm:FormGroup;
  salaryPublishItem:SalaryPublish[]=[];
  comId:number;
  isSubmitted=false;
  searchKeys;
  btnStatus="Save";
  constructor(
    private formBuilder:FormBuilder,
    private sPService:SalaryProcessService,
    private toster:ToastrService,

  ) {
    super()
  }

  ngOnInit() {
    this.items = [];
    this.update();
    this.searchKeys=['periodName']
    this.comId=1;
    this.createSalaryPublishForm();
    this.getSalaryPublishList();
  }


getSalaryPublishList(){
  this.sPService.getSalaryPublishList(this.fCon.companyID.value).subscribe((response:ApiResponse)=>{
    if(response.status){
      this.salaryPublishItem=response.result as SalaryPublish[];
      this.items=response.result as SalaryPublish[];
      this.update();
    }else{
      this.items=[];
      this.update();
    }
  });
}

getById(id:number){
  this.sPService.getByIdPublishSalary(id).subscribe((response:ApiResponse)=>{
    if(response.status){
     let result =response.result as SalaryPublish;
     this.btnStatus="Update"

   this.salaryPublishForm.patchValue(response.result)
    }else{
      this.items=[];
      this.update();
    }
  });
}


onSelectPeriod(period:any){
  this.salaryPublishForm.patchValue({
    periodID:period.id
  })
}

updateSalaryPublish(){
  this.isSubmitted=true;
  if(this.salaryPublishForm.invalid){
    //this.toster.warning("Fill Required Fields");
  }else{
    this.sPService.saveOrUpdatePublish(this.salaryPublishForm.value).subscribe((response:ApiResponse)=>{
      if(response.status){
        this.toster.success(response.result,"Success");
       this.Reset();
        this.getSalaryPublishList();
        this.createSalaryPublishForm();
      }else{
        this.toster.error(response.result,"Failed!!");
      }
    });
  }

}

SavePublishStatus(){
  this.isSubmitted=true;
  this.btnStatus="Save";

  if(this.salaryPublishForm.invalid){
    //this.toster.warning("Fill Required Fields");
  }else{
    this.sPService.saveOrUpdatePublish(this.salaryPublishForm.value).subscribe((response:ApiResponse)=>{
      if(response.status){
        this.toster.success(response.result,"Success");
        this.getSalaryPublishList();
        this.createSalaryPublishForm();
      }else{
        this.toster.error(response.result,"Failed!!");
      }
    });
  }

}

onSubmit(){
  if(this.btnStatus=="Save"){
    this.SavePublishStatus();
  }else{
    this.updateSalaryPublish();
  }
}

createSalaryPublishForm(){
    this.salaryPublishForm=this.formBuilder.group({
      id:[0,[]],
      periodID:[,[Validators.required]],
      publish:[,[Validators.required]],
      companyID:[this.comId,[]]
    })
  }

get fCon(){
return this.salaryPublishForm.controls;
}

Reset(){
  this.isSubmitted=false;
  this.btnStatus="Save";
  this.salaryPublishForm.reset();
  this.createSalaryPublishForm();
}
}
