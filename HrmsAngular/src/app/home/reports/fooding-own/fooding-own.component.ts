import { AuthService } from './../../../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ReportService } from '../../../services/report.service';
import { ReportHelper } from '../../../shared/report-helper';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-fooding-own',
  templateUrl: './fooding-own.component.html',
  styleUrls: ['./fooding-own.component.scss',
  '../../../../vendor/libs/angular2-ladda/ladda.scss',
  '../../../../vendor/libs/ng-select/ng-select.scss'

]
})
export class FoodingOwnComponent implements OnInit {

  compId:number;
  gradeVal:number;
  ReportId:number;
  empCode:string;
  isSubmit:boolean=false;
  exporting:boolean = false;
  foodingOwnReportForm:FormGroup;



  constructor(
    private fb:FormBuilder,
    private toaster:ToastrService,
    private rptService:ReportService,
    private rptHelper:ReportHelper
  ) { }

  ngOnInit() {
    this.compId =AuthService.getLoggedCompanyId();
    this.gradeVal =AuthService.getLoggedGradeValue();
    this.empCode = AuthService.getLoggedEmpCode();
    this.createForm();
  }

  export() {

    this.exporting = true;
    this.isSubmit = true;

    if (this.foodingOwnReportForm.invalid) {
      this.exporting = false;
      this.toaster.error('Invalid Submission')
      return;
    }
    this.rptService.getBasicInfoReport(this.foodingOwnReportForm.value)
      .subscribe(
        exportedFile => {
          this.exporting = false;
          this.rptHelper.openFileWindow(exportedFile as Blob);
        },
        (err: HttpErrorResponse) => {
          this.exporting = false;
          this.toaster.error(err.message, 'Failed!');
        })
  }
  createForm() {
    this.foodingOwnReportForm=this.fb.group({
      ReportId:[this.ReportId=160,[]],
      ExportType:['pdf',[Validators.required]],
     CompanyID:[this.compId, []],
     empcode:[this.empCode,[]],
     yearname:[,[]],
     Department:[,[]],

    });

  }

  get formControl(){
    return this.foodingOwnReportForm.controls;
  }

}
