import { AuthService } from './../../../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SalaryProcessService } from '../../../services/salary-process/salary-process-service.service';
import { SalaryPeriodModel } from '../../../models/SalarySetup/SalaryPeriod';
import { SalarySetupService } from '../../../services/SalarySetup/salary-setup.service';
import { ApiResponse } from '../../../models/response.model';
import { ToastrService } from 'ngx-toastr';
import { SalaryProcess } from '../../../models/salary-process/salary-process.model';

@Component({
  selector: 'app-undo-salary-process',
  templateUrl: './undo-salary-process.component.html',
  styleUrls: ['./undo-salary-process.component.scss','../../../../vendor/libs/ng-select/ng-select.scss']
})
export class UndoSalaryProcessComponent implements OnInit {

  undoSalaryProForm:FormGroup;
  salaryPeriod:SalaryPeriodModel[]=[];
  comId:number;
  userId:number;
  grade:number;
  isSubmitted = false;
  constructor(
    private formBuilder:FormBuilder,
    private salaryProService:SalaryProcessService,
    private salarySetupService:SalarySetupService,
    private toster:ToastrService
  ) { }

  ngOnInit() {
    this.comId=AuthService.getLoggedCompanyId();
    this.userId=AuthService.getLoggedUserId();
    this.grade=AuthService.getLoggedGradeValue();
    this.createUndoSalaryProcessForm();
    this.getSalaryPeriodList();
  }


  getSalaryPeriodList() {
    this.salarySetupService.getAllperiod().subscribe((response: ApiResponse) => {
      if (response.status) {
        this.salaryPeriod = response.result as SalaryPeriodModel[];
        console.log("SalaryPeriod", this.salaryPeriod)
      }

    });
  }

  undoSalryProcess(){
    this.isSubmitted=true;
    if(this.undoSalaryProForm.invalid){
      return;
    }else{
      let obj = new SalaryProcess();
      obj=this.undoSalaryProForm.value;

      this.salaryProService.undoSalaryProcess(obj).subscribe((response:ApiResponse)=>{
        if(response.status){
          this.toster.success(response.result,"Success");
        }
        else{
          this.toster.error(response.result,"Failed ");
        }
      });
    }
  }
  createUndoSalaryProcessForm(){
    this.undoSalaryProForm=this.formBuilder.group({
      companyID:[this.comId,[]],
      periodID:[,[Validators.required]],
      grade:[this.grade,[]],
      userTypeID:[this.userId,[]]
    })
  }

  get f(){
    return this.undoSalaryProForm.controls;
  }

  Reset(){
    this.isSubmitted=false;
    this.undoSalaryProForm.reset();
    this.createUndoSalaryProcessForm();
  }
}
