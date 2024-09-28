import { taxYearModel } from './../../../models/SalarySetup/salaryPeriodTaxYearM';
import { ApiResponse } from './../../../models/response.model';
import { TaxCardModel } from './../../../models/incomeTax/tax-card.model';
import { Component, OnInit } from '@angular/core';
import { ReportService } from '../../../services/report.service';
import { ReportHelper } from '../../../shared/report-helper';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../../../services/auth.service';
import { ToastrService } from 'ngx-toastr';
import { TaxYearInfoService } from '../../../services/incomeTax/tax-year-info.service';

@Component({
  selector: 'app-txt-card-report',
  templateUrl: './txt-card-report.component.html',
  styleUrls: ['./txt-card-report.component.scss', '../../../../vendor/libs/angular2-ladda/ladda.scss']
})
export class TxtCardReportComponent implements OnInit {

  companyId:number;
  isExporting:boolean = false;
  taxCardForm:FormGroup;
  taxCardModel:TaxCardModel
  constructor(
    private rptService:ReportService,
    private rptHelper:ReportHelper,
    private fb:FormBuilder,
    private toaster:ToastrService,
    private taxService:TaxYearInfoService
  ) { }

  ngOnInit() {
    this.companyId = AuthService.getLoggedCompanyId();
    this.createForm();
  }
taxCardProcess(){
 let obj  = new TaxCardModel();
 obj.companyID=this.companyId;
 obj.empCode=this.taxCardForm.controls.EmpCode.value;
 obj.periodID=this.taxCardForm.controls.PeriodID.value;
 obj.taxYearID=this.taxCardForm.controls.TaxYearID.value;
  this.taxService.processTaxCard(obj).subscribe((response:ApiResponse)=>{
    if(response.status){

    }
    else{
      this.toaster.error("fail");
    }
  })
}
  onSubmit(exportType){
    if(exportType){
      this.taxCardForm.patchValue({ExportType:exportType})
    }
    if(this.taxCardForm.invalid){
      this.toaster.error('Please! Fill all required field', 'Invalid Submission');
      return;
    }
    this.isExporting = true;
    this.taxCardProcess();
    this.rptService.getPayrollReport(this.frmVal)
    .subscribe(exportedFile=>{
      this.isExporting = false;
      this.rptHelper.openFileWindow(exportedFile, 'tax_card_rpt_'+this.frmVal.EmpCode)
    }, err=>{
      this.isExporting = false;
    }
    )
  }

  createForm(){
    this.taxCardForm = this.fb.group({
      CompanyID:[this.companyId,[]],
      EmpCode:[,[Validators.required]],
      TaxYearID:[,[Validators.required]],
      PeriodID:[,[]],
      ReportId:[94,[]],
      ExportType:['pdf',[]]
    })
  }

  get frmVal(){
    return this.taxCardForm.value;
  }
  get frmControl(){
    return this.taxCardForm.controls;
  }
}
