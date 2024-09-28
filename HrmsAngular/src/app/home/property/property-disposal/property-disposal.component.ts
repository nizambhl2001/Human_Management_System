import { AuthService } from './../../../services/auth.service';
import { ApiResponse } from './../../../models/response.model';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { PropertyName } from '../../../models/Property/property-name.model';
import { PropertyCategory } from '../../../models/property-category.model';
import { PropertyService } from '../../../services/property.service';
import { PropertyDisposal } from '../../../models/Property/property-disposal.model';
import { AssetAddition } from '../../../models/Property/asset-addition.model';
import { NgbDateCustomParserFormatter } from '../../../shared/dateformat';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Employment } from '../../../models/hr/employment.model';
import { EmploymentService } from '../../../services/hr/employment.service';

@Component({
  selector: 'app-property-disposal',
  templateUrl: './property-disposal.component.html',
  styleUrls: ['./property-disposal.component.scss',
    '../../../../vendor/libs/angular-2-dropdown-multiselect/angular-2-dropdown-multiselect.scss',
    '../../../../vendor/libs/ng-select/ng-select.scss']
})
export class PropertyDisposalComponent implements OnInit {
  btnStatus = 'Save';
  compId: number;
  isSubmitted = false;
  catagories: PropertyCategory[] = [];
  propDisForm: FormGroup;
  assetModels: AssetAddition[] = [];
  disposalAssets: PropertyDisposal[] = [];
  assetName: PropertyName[];
  constructor(
    private propService: PropertyService,
    private formBuilder: FormBuilder,
    private modalService: NgbModal,
    private employmentES: EmploymentService,
    private dateFormat: NgbDateCustomParserFormatter,
    private toaster: ToastrService
  ) { }

  ngOnInit() {
    this.compId = AuthService.getLoggedCompanyId();
    this.GetCatagory();
    this.createForm();
  }
  GetCatagory() {
    this.propService.getAllCategory().subscribe((response: ApiResponse) => {
      if (response.status) {
        this.catagories = response.result as PropertyCategory[];
      }
      else{

      }
    });
  }

  GetAssetByCategory(id: number) {
    if(id==null){
      return;
    }
    this.propService.getAllAssetByCategory(id).subscribe((response: ApiResponse) => {
      if (response.status) {
        this.assetName = response.result as PropertyName[];
      }
      else{

      }
    });
  }
  getAssetModel(assetId: number) {
    if (assetId > 0) {
      this.propService.getAssetModel(assetId).subscribe((response: ApiResponse) => {
        if (response.status) {
          this.assetModels = response.result as AssetAddition[];
        }
      });
    }
  }
  onAssetModelChange(id: number) {
    if (id > 0) {
      const model = this.assetModels.find(c => c.id == id);
      this.f.serial.setValue(model.serial);
      this.f.confiruration.setValue(model.confiruration);
    }
  }
  getDisposeByEmpCode(empCode: string) {
    this.propService.GetAllDispose(empCode, this.compId).subscribe((response: ApiResponse) => {
      this.disposalAssets = response.result as PropertyDisposal[];
    })
  }
  getEmpInfo(empCode: string) {
    if (empCode == null) {
      this.reset();
      return;
    }
    this.employmentES.getEmployment(empCode, this.compId).subscribe((response: ApiResponse) => {
      let empInfo = response.result as Employment;
      this.propDisForm.patchValue({
        empCode: empInfo.empCode,
        empName: empInfo.empName,
        department: empInfo.department,
        designation: empInfo.designation,
      })
    })
  }
  getDisposalById(disposalId: number) {
    let disposeAsset = this.disposalAssets.find(c => c.id == disposalId);
    this.propService.getNameById(disposeAsset.propertyID).subscribe((response: ApiResponse) => {
      if (response.status != true) {
        this.btnStatus = "Save";
      }
      else {
        this.btnStatus = "Update";
        this.f.disposeDateNgb.setValue(this.dateFormat.stringToNgbDate(disposeAsset.disposeDate));
        this.f.disType.setValue(disposeAsset.disType);
        this.f.note.setValue(disposeAsset.note);
        this.f.categoryID.setValue(response.result.aCateoryID);
        this.GetAssetByCategory(response.result.aCateoryID);
        this.f.propertyID.setValue(disposeAsset.propertyID);
        this.getAssetModel(disposeAsset.propertyID);
        this.f.modelID.setValue(disposeAsset.modelID);
        this.f.serial.setValue(disposeAsset.serial);
        this.f.confiruration.setValue(disposeAsset.confiruration);
        this.f.id.setValue(disposeAsset.id);
      }
    })
  }

  SaveUpdatePropertyDispose() {
    this.isSubmitted=true;
    if (this.propDisForm.invalid) {
      this.toaster.warning('Fill All Required Field');
      return;
    }
    else{
    this.propDisForm.controls.disposeDate.setValue(this.dateFormat.ngbDateToDate(this.propDisForm.controls.disposeDateNgb.value).toLocaleDateString());
    this.propService.saveUpdateDispose(this.propDisForm.value).subscribe((response: ApiResponse) => {
      if (response.status) {
        this.toaster.success(response.result, "Success");
        this.propDisForm.reset();
        this.btnStatus = "Save";
        this.isSubmitted=false;
        this.getDisposeByEmpCode(this.formVal.empCode);

      } else {
        this.toaster.error(response.result, "Fail");
      }
    });
  }
}
  onSelectEmp(empCode: string) {
    this.propDisForm.controls['empCode'].setValue(empCode);
    this.getEmpInfo(empCode);
  }
  onSearchClick(PropDisposalSearchModal: any) {
    this.modalService.open(PropDisposalSearchModal);
  }
  createForm() {
    this.propDisForm = this.formBuilder.group({
      id: [, []],
      empCode: [, [Validators.required]],
      empName: [, []],
      designation: [, []],
      department: [, []],
      categoryID: [, [Validators.required]],
      serial: [, [Validators.required]],
      confiruration: [, []],
      propertyID: [, [Validators.required]],
      modelID: [, [Validators.required]],
      disposeDate: [, []],
      disposeDateNgb: [this.dateFormat.getCurrentNgbDate(), []],
      disType: [0, [Validators.required]],
      note: [, []],
      companyID: [1, []]
    });
  }
  get f() {
    return this.propDisForm.controls;
  }
  get formVal() {
    return this.propDisForm.value;
  }
  reset() {
    this.createForm();
    const empCode = this.propDisForm.controls.empCode.value;
    this.disposalAssets = [];
    this.isSubmitted=false;
    this.propDisForm.controls.empCode.setValue(empCode);
    this.btnStatus = "Save";
  }
}
