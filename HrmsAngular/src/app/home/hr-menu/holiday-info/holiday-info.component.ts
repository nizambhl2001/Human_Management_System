import { AuthService } from './../../../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { NgbDateCustomParserFormatter } from '../../../shared/dateformat';
import { ToastrService } from 'ngx-toastr';
import { ReportService } from '../../../services/report.service';
import { ReportHelper } from '../../../shared/report-helper';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-holiday-info',
  templateUrl: './holiday-info.component.html',
  styleUrls: ['./holiday-info.component.scss',
  '../../../../vendor/libs/angular2-ladda/ladda.scss',
  '../../../../vendor/libs/ng-select/ng-select.scss'
]
})
export class HolidayInfoComponent implements OnInit {
  compId:number;
  gradeVal:number;
  ReportId:number;
  empCode:number;
  isSubmit:boolean=false;
  exportingPdf:boolean = false;
  holidayReportForm:FormGroup;
  constructor(
    private fb:FormBuilder,
    private dateFormat: NgbDateCustomParserFormatter,
    private toaster:ToastrService,
    private rptService:ReportService,
    private rptHelper:ReportHelper
  ) { }

  ngOnInit() {
    this.compId =AuthService.getLoggedCompanyId();
    this.gradeVal = AuthService.getLoggedGradeValue();
    this.createForm();
  }

  exportToPdf(exportType: string) {

    this.exportingPdf = true;
    this.isSubmit = true;

    if (this.holidayReportForm.invalid) {
      this.exportingPdf = false;
      return;
    }
    this.holidayReportForm.patchValue({ExportType:exportType})
    this.rptService.getBasicInfoReport(this.holidayReportForm.value)
      .subscribe(
        exportedFile => {
          this.exportingPdf = false;
          this.rptHelper.openFileWindow(exportedFile as Blob);
        },
        (err: HttpErrorResponse) => {
          this.exportingPdf = false;
          this.toaster.error(err.message, 'Failed!');
        })
  }
  createForm() {
    this.holidayReportForm = this.fb.group({
      ReportId:[this.ReportId=1,[]],
      ExportType:[,[]],
     CompanyID:[this.compId, []],
     Startdate:[this.dateFormat.getCurrentNgbDate(),[]],
     Enddate:[this.dateFormat.getCurrentNgbDate(),[]]




 });
  }
  get formControl(){
    return this.holidayReportForm.controls;
  }

}
