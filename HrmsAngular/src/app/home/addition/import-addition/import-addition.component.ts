import { AuthService } from './../../../services/auth.service';
import { SalarySetupService } from './../../../services/SalarySetup/salary-setup.service';
import { ImportEmpSalaryService } from '../../../services/addition-and-deduction-import-service/import-emp-salary.service';
import { SalaryHead } from './../../../models/SalarySetup/salary-head';
import { SalaryPeriodModel } from './../../../models/SalarySetup/SalaryPeriod';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { ApiResponse } from '../../../models/response.model';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-import-addition',
  templateUrl: './import-addition.component.html',
  styleUrls: ['./import-addition.component.scss','../../../../vendor/libs/ng-select/ng-select.scss']
})
export class ImportAdditionComponent implements OnInit {

  constructor(
    private formbuilder:FormBuilder,

    private salarySetupService:SalarySetupService,
    private importempSalary:ImportEmpSalaryService,
    private toasterService:ToastrService
  ) { }
  compID:number;
  gradeValue:number;
  title="Upload Employee Salary";
  importAdditionForm:FormGroup;
  salaryPeriod:SalaryPeriodModel[]=[];
  allSalaryHead:SalaryHead[]=[];
  _isProcessing=false;
  additionSalaryHead:SalaryHead[]=[];
  isSubmitted=false;

  ngOnInit() {
    this.compID=AuthService.getLoggedCompanyId();
    this.gradeValue=AuthService.getLoggedGradeValue();
    this.createForm();
    this.getSalaryHead();
    this.getSalaryPeriod();
  }

getSalaryPeriod() {
  this.salarySetupService.getAllperiod().subscribe((response: ApiResponse) => {
    if (response.status) {
      this.salaryPeriod = response.result as SalaryPeriodModel[];
    }
    else{
      this.salaryPeriod=[];
    }
  })
}
getSalaryHead() {
  this.salarySetupService.getAllSalaryHead().subscribe((response: ApiResponse) => {
    if (response.status) {
      this.allSalaryHead=response.result as SalaryHead[];
      let allSalaryHead:SalaryHead[] = response.result as SalaryHead[];
     this.additionSalaryHead = allSalaryHead.filter(c => c.salaryHeadType == "Addition" );
    }
  })
}
onFileChange(files:FileList){
  this.importAdditionForm.controls['excelFiles'].setValue(files);
  if(files.length==1){
      this.importAdditionForm.controls['fileCount'].setValue(files[0].name);
      return;
  }
  this.importAdditionForm.controls['fileCount'].setValue(files.length+' file attached');
}

onPeriodChange(period:any){
  if(period != null){
    this.importAdditionForm.controls.periodName.setValue(period.periodName);
  }

}

importFileData(){
  this.isSubmitted = true;
  if(this.importAdditionForm.invalid){
    this.toasterService.error("Fill all required field, * marked field are required!", 'Invalid Submission');
    return;
  } else{
    if(this.importAdditionForm.controls['excelFiles'].value==null){
      this.toasterService.success("Please fill the File field first", 'Warning:');
      console.log(this.importAdditionForm.controls['excelFiles'].get.length);
     return;}
    else{
     console.log(this.importAdditionForm.controls['excelFiles'].value==null);
     this._isProcessing=true;
     this.importempSalary.importFileData(this.importAdditionForm.value).subscribe((response:ApiResponse)=>{
      if(response.status){
           this.toasterService.success(response.result, 'Success!');
       }else{
          this.toasterService.error(response.result, 'Failed!');
       }
        this._isProcessing=false;
       })
    }
  }


 }
createForm(){
  this.importAdditionForm=this.formbuilder.group({
    id:[0,[]],
    salaryHead:[,[Validators.required]],
    periodID:[,[Validators.required]],
    companyID:[this.compID,[]],
    periodName:[null,[]],
    grade:[this.gradeValue,[]],
    excelFiles:[,[]],
    fileCount:[,[]]
  })
}
get f(){
  return this.importAdditionForm.controls;
}
}
