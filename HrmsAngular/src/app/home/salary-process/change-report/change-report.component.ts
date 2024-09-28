import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { NgbDateCustomParserFormatter } from '../../../shared/dateformat';
import { ToastrService } from 'ngx-toastr';
import { ReportService } from '../../../services/report.service';
import { ReportHelper } from '../../../shared/report-helper';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-change-report',
  templateUrl: './change-report.component.html',
  styleUrls: ['./change-report.component.scss',
  '../../../../vendor/libs/angular2-ladda/ladda.scss',
  '../../../../vendor/libs/ng-select/ng-select.scss'
]
})
export class ChangeReportComponent implements OnInit {
  compId:number;
  gradeVal:number;
  ReportId:number;
  isSubmit:boolean=false;
  exportingPdf:boolean = false;
 changeReportForm:FormGroup;
  constructor(
    private fb:FormBuilder,
    private dateFormat: NgbDateCustomParserFormatter,
    private toaster:ToastrService,
    private rptService:ReportService,
    private rptHelper:ReportHelper
  ) { }

  ngOnInit() {
    this.compId =1;
    this.gradeVal = -1;
    this.createForm();
    
  }
  exportToPdf(exportType: string) {
    this.exportingPdf = true;
    this.isSubmit = true;

    if (this.changeReportForm.invalid) {
      this.exportingPdf = false;
      return;
    }
    this.changeReportForm.patchValue({ExportType:exportType})
    this.rptService.getPayrollReport(this.changeReportForm.value)
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
    this.changeReportForm=this.fb.group({

      ReportId:[this.ReportId=207,[]],
      ExportType:[,[]],
     CompanyID:[this.compId, []],
     Grade:[this.gradeVal,[]],
     Branch:[,[]],
     StartDate:[this.dateFormat.getCurrentNgbDate(),[]],
     EndDate:[this.dateFormat.getCurrentNgbDate(),[]],

    });
  }

  get formControl(){
    return this.changeReportForm.controls;
  }


}
