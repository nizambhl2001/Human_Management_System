import { AuthService } from './../../../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AttendenceService } from '../../../services/Attendance/attendence.service';
import { ApiResponse } from '../../../models/response.model';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-import',
  templateUrl: './import.component.html',
  styleUrls: ['./import.component.scss']
})
export class ImportComponent implements OnInit {

  importForm:FormGroup;
  comId:number;
  userId:number;
  _isProcessing=false;

  constructor(
    private formBuilder:FormBuilder,
    private attnService:AttendenceService,
    private toster:ToastrService
  ) { }
  title="Import Employee Attendance Sheet";
  ngOnInit() {
    this.comId=AuthService.getLoggedCompanyId();
    this.userId=AuthService.getLoggedUserId();
    this.createImportForm();
  }

  onFileChange(file:FileList){
    this.importForm.controls['excelFiles'].setValue(file);

    if(file.length==1){
      this.importForm.controls['fileCount'].setValue(file[0].name);
      return;
    }
      this.importForm.controls['fileCount'].setValue(file.length+` file attached`);

  }

  importEmployeeAttendenceFileData(){
    this._isProcessing=true;
    this.importForm.value;
    this.attnService.importEmployeeAttendenceFileData(this.importForm.value).subscribe((response:ApiResponse)=>{
      if(response.status){
        this.toster.success(response.result,"Success");

      }else{
        this.toster.error(response.result,"Failed");
      }
      this._isProcessing=false;
    });

  }

  createImportForm(){
    this.importForm=this.formBuilder.group({
      companyID:[this.comId,[]],
      id:[0,[]],
      terminalID:[0,[]],
      empCode:[0,[]],
      excelFiles:[,[]],
      fileCount:[,[]]

    })
  }

  Reset(){
    this.importForm.reset();
    this.createImportForm();
  }
}
