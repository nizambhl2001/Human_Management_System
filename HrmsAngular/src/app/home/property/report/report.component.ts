import { AuthService } from './../../../services/auth.service';
import { PropertyName } from './../../../models/property-name.model';
import { ApiResponse } from './../../../models/response.model';
import { PropertyService } from './../../../services/property.service';
import { Component, OnInit } from '@angular/core';
import { ReportService } from '../../../services/report.service';
import { type } from 'os';
import { ReportHelper } from '../../../shared/report-helper';
import { AssetAddition } from '../../../models/asset-addition.model';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.scss', '../../../../vendor/libs/ng-select/ng-select.scss', '../../../../vendor/libs/angular2-ladda/ladda.scss']
})
export class ReportComponent implements OnInit {

  reportId: number = 0;
  propertyId: number;
  assetModelId: number;
  empCode: string;
  grade: number;
  compId: number;
  isLoading: boolean;

  allAsset: PropertyName[] = [];
  allAssetModel: AssetAddition[] = [];
  constructor(
    private propService:PropertyService,
    private rptService: ReportService,
    private rptHelper: ReportHelper,
    private modalService: NgbModal,
    private toaster: ToastrService
  ) { }
  ngOnInit() {
    this.compId = AuthService.getLoggedCompanyId();
    this.empCode=AuthService.getLoggedEmpCode();
    this.getAllAsset();
  }

  getAllAsset() {
    this.propService.getAllName().subscribe((response: ApiResponse) => {
      if (response.status) {
        this.allAsset = response.result as PropertyName[];
      }
    })
  }
  getAllAssetModel() {
    this.propService.getAssetModel(this.propertyId).subscribe((response: ApiResponse) => {
      if (response.status) {
        this.allAssetModel = response.result as AssetAddition[];
      }
    })
  }
  onEmpSearchClick(modal: any) {
    this.modalService.open(modal);
  }
  onRptBtnClick(exportType:string) {
    this.isLoading = true;
    if (this.reportId == 0) {
      this.toaster.error('Select report name!', 'Invalid input type!')
      return;
    }
    if (this.propertyId == 0 || this.propertyId == null) {
      this.propertyId = -1;
    }
    if (this.assetModelId == 0 || this.assetModelId == null) {
      this.assetModelId = -1;
    }
    this.rptService.getAssetReport(this.reportId, this.propertyId, this.assetModelId, this.compId, this.empCode, -1, exportType)
      .subscribe((response: Blob) => {
          this.rptHelper.openFileWindow(response);
          this.isLoading = false;
      })

  }
}
