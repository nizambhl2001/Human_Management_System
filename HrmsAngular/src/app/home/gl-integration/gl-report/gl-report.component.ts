import { AuthService } from './../../../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ReportService } from '../../../services/report.service';
import { ReportHelper } from '../../../shared/report-helper';
import { HttpErrorResponse } from '@angular/common/http';
import { CostHead } from '../../../models/gl-integration/cost-head.model';
import { GlIntegrationService } from '../../../services/gl-integration/gl-integration.service';
import { ApiResponse } from '../../../models/response.model';

@Component({
  selector: 'app-gl-report',
  templateUrl: './gl-report.component.html',
  styleUrls: ['./gl-report.component.scss',
    '../../../../vendor/libs/angular2-ladda/ladda.scss',
    '../../../../vendor/libs/ng-select/ng-select.scss'
  ]
})
export class GlReportComponent implements OnInit {
  compId: number;
  gradeVal: number;

  isSubmit: boolean = false;
  exporting: boolean = false;
  glIntregrateReportForm: FormGroup;
  costHeadList: CostHead[] = [];
  reportType: any[] = [];
  constructor(
    private fb: FormBuilder,
    private toaster: ToastrService,
    private glIntegrationService: GlIntegrationService,
    private rptService: ReportService,
    private rptHelper: ReportHelper
  ) { }

  ngOnInit() {
    this.compId = AuthService.getLoggedCompanyId();
    this.gradeVal = AuthService.getLoggedGradeValue();
    this.createForm();
    this.getReportType();
    this.getAllCosthead();
  }
  getReportType() {
    this.reportType = [
      { ReportId: 189, TypeName: 'Gl CostHead' },
      { ReportId: 190, TypeName: 'Salary Payment' },
      { ReportId: 191, TypeName: 'Bonus and Other Payment' },
      { ReportId: 192, TypeName: 'Gratuity Payment' },
    ]

  }
  getAllCosthead() {
    this.glIntegrationService.getlistCostHead().subscribe((response: ApiResponse) => {
      if (response) {
        this.costHeadList = response.result as CostHead[];
      }
    })
  }

  onSelectBranch(branchId: number) {
    this.glIntregrateReportForm.patchValue({
      Branch: branchId,
      BranchID: branchId

    })
  }

  export() {
    this.exporting = true;
    this.isSubmit = true;

    if (this.glIntregrateReportForm.invalid) {
      this.toaster.error('Invalid Submission')
      this.exporting = false;
      return;
    }
    this.rptService.getGlIntrgration(this.glIntregrateReportForm.value)
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
    this.glIntregrateReportForm = this.fb.group({

      ReportId: [, [Validators.required]],
      ExportType: ['pdf', [Validators.required]],
      CompanyID: [this.compId, []],
      EmpCode: [, []],
      GradeValue: [, []],
      Grade: [, []],
      Period: [, []],
      CostHead: [1, []],
      Branch: [, []],
      ostHead: [1, []],
      BranchID: [, []],
      BonusID: [, []],

    });

  }
  get formControl() {
    return this.glIntregrateReportForm.controls;
  }
  reset() {
    this.createForm();
  }

}
