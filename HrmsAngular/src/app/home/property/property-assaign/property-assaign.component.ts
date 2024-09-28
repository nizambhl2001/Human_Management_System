import { AuthService } from './../../../services/auth.service';
import { state } from '@angular/animations';
import { AssetAddition } from './../../../models/asset-addition.model';
import { ApiResponse } from './../../../models/response.model';
import { ToastrService } from 'ngx-toastr';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { PropertyService } from '../../../services/property.service';
import { PropertyCategory } from '../../../models/Property/property-category.model';
import { PropertyName } from '../../../models/Property/property-name.model';
import { AssetAssainModel } from '../../../models/Property/asset-assain.model';
import { NgbDateCustomParserFormatter } from '../../../shared/dateformat';
import { NgbModal, NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { Employment } from '../../../models/hr/employment.model';
import { EmploymentService } from '../../../services/hr/employment.service';

@Component({
  selector: 'app-property-assaign',
  templateUrl: './property-assaign.component.html',
  styleUrls: [
    './property-assaign.component.scss',
    '../../../../vendor/libs/angular-2-dropdown-multiselect/angular-2-dropdown-multiselect.scss',
    '../../../../vendor/libs/ng-select/ng-select.scss']
})
export class PropertyAssaignComponent implements OnInit {
  compId: number;
  isSubmitted = false;
  grade: number;
  categories: PropertyCategory[] = [];
  assetname: PropertyName[];
  assetModels: AssetAddition[] = [];
  assignedAssets: AssetAssainModel[];
  propertyAssainForm: FormGroup;
  minimumDate: NgbDateStruct = { year: 1800, month: 1, day: 1 };
  maximumDate: NgbDateStruct = { year: new Date().getFullYear(), month: new Date().getMonth() + 1, day: new Date().getDate() };
  btnStatus: string = "Save";
  constructor(
    private propService: PropertyService,
    private toasterService: ToastrService,
    private formBuilder: FormBuilder,
    private employmentES: EmploymentService,
    private dateFormat: NgbDateCustomParserFormatter,
    private modalService: NgbModal
  ) { }

  ngOnInit() {
    this.compId = AuthService.getLoggedCompanyId();
    this.grade = AuthService.getLoggedGradeValue();
    this.createForm();
    this.GetCatagory();
  }
  GetCatagory() {
    this.propService.getAllCategory().subscribe((response: ApiResponse) => {
      if (response.status) {
        this.categories = response.result as PropertyCategory[];
      }
    })
  }
  GetAssetByCategory(id: number) {
    if (id > 0) {
      this.propService.getAllAssetByCategory(id).subscribe((response: ApiResponse) => {
        if (response.status) {
          this.assetname = response.result as PropertyName[];
        }
      })
    }
  }
  getAssetModel(assetId: number) {
    if (assetId > 0) {
      this.propService.getAssetModel(assetId).subscribe((response: ApiResponse) => {
        if (response.status) {
          this.assetModels = response.result as AssetAddition[];
        }
      })
    }
  }
  onAssetModelChange(id: number) {
    if (id > 0) {
      let model = this.assetModels.find(c => c.id == id);
      this.f.serial.setValue(model.serial);
      this.f.confiruration.setValue(model.confiruration);
    }
  }
  getAssignedAsset() {
    this.propService.getAssignedAsset(this.compId, this.propertyAssainForm.controls.empCode.value).subscribe((response: ApiResponse) => {
      if (response.status) {
        this.assignedAssets = response.result as AssetAssainModel[];
      }
    })
  }
  getEmpInfo(empCode:string){
    if (empCode == "") {
      this.reset();
      return;
    }
    this.employmentES.getEmployment(empCode,this.compId).subscribe((response:ApiResponse)=>{
      let empInfo=response.result as Employment;
      this.propertyAssainForm.patchValue({
       empCode:empInfo.empCode,
       empName:empInfo.empName,
       department: empInfo.department,
       designation:empInfo.designation
     })
     let reportTo=empInfo.reportTo;
     this.employmentES.getEmployment(reportTo,this.compId).subscribe((response:ApiResponse)=>{
       let reportToempInfo=response.result as Employment;
       this.propertyAssainForm.patchValue({
        reciveFrom:reportToempInfo.empCode,
        fromEmpName:reportToempInfo.empName,
        fromDesignation:reportToempInfo.designation
       })
     })
    })
  }
  getFromEmpInfo(reciveFrom: string) {
    if (reciveFrom == "") {
      return;
    }
    this.employmentES.getEmployment(reciveFrom, this.compId).subscribe((response: ApiResponse) => {
      let fromempInfo = response.result as Employment;
      this.propertyAssainForm.patchValue({
        fromEmpName: fromempInfo.empName,
        fromDesignation: fromempInfo.designation,
      })
    })
  }
  getAssainById(AssainId: number) {
    if (this.f.empCode.value == "") {
      return;
    }
    let assainAsset = this.assignedAssets.find(c => c.id == AssainId);
    this.propService.getNameById(assainAsset.propertyID).subscribe((response: ApiResponse) => {
      if (response.status != true) {
        this.reset();
      }
      this.btnStatus = "Update";
      this.f.reciveFrom.setValue(assainAsset.reciveFrom);
      this.f.assaintype.setValue(assainAsset.assainType)
      this.GetAssetByCategory(response.result.aCateoryID);
      this.f.categoryID.setValue(response.result.aCateoryID);
      this.f.propertyID.setValue(assainAsset.propertyID);
      this.getAssetModel(assainAsset.propertyID);
      this.f.modelID.setValue(assainAsset.modelID);
      this.f.serial.setValue(assainAsset.serial);
      this.f.confiruration.setValue(assainAsset.confiruration);
      this.f.assainDateNgb.setValue(this.dateFormat.stringToNgbDate(assainAsset.assainDate));
      this.f.ownershipDateNgb.setValue(this.dateFormat.stringToNgbDate(assainAsset.ownershipDate));
      this.f.id.setValue(assainAsset.id);
      this.getFromEmpInfo(this.f.reciveFrom.value);
      this.getEmpInfo(this.f.empCode.value)
    })
  }
  saveUpdate() {
    this.isSubmitted = true;
    if (this.propertyAssainForm.invalid) {
      this.toasterService.warning("Fill All Required Field", "Fail");
    }
    else {
      this.propertyAssainForm.controls.assainDate.setValue(this.dateFormat.ngbDateToDate(this.propertyAssainForm.controls.assainDateNgb.value).toLocaleDateString());
      this.propertyAssainForm.controls.ownershipDate.setValue(this.dateFormat.ngbDateToDate(this.propertyAssainForm.controls.ownershipDateNgb.value).toLocaleDateString());
      this.propService.saveUpdatePropAssain(this.propertyAssainForm.value).subscribe((response: ApiResponse) => {
        if (response.status) {
          this.toasterService.success(response.result, "Success");
          this.getAssignedAsset();
          this.reset();
          this.btnStatus = "Save";
          this.isSubmitted = false;
        }
        else {
          this.toasterService.error(response.result, "Fail To Save");
        }
      })
    }
  }
  onSelectEmp(empCode: string) {
    this.propertyAssainForm.controls['empCode'].setValue(empCode);
  }
  onSearchClick(PropAssignSearchModal: any) {
    this.modalService.open(PropAssignSearchModal);
  }
  createForm() {
    this.propertyAssainForm = this.formBuilder.group({
      id: [, []],
      empCode: [, [Validators.required]],
      reciveFrom: [, [Validators.required]],
      empName: [, []],
      department: [, []],
      designation: [, []],
      fromEmpName: [, []],
      fromDesignation: [, []],
      propertyID: [, [Validators.required]],
      modelID: [, [Validators.required]],
      categoryID: [, [Validators.required]],
      serial: [, []],
      confiruration: [, []],
      assainDate: [, []],
      assainDateNgb: [this.dateFormat.getCurrentNgbDate(), []],
      assaintype: [0, [Validators.required]],
      status: [1, []],
      companyID: [this.compId, []],
      ownershipDate: [, []],
      ownershipDateNgb: [, [Validators.required]]
    })
  }
  get f() {
    return this.propertyAssainForm.controls;
  }
  get formVal() {
    return this.propertyAssainForm.value;
  }
  reset() {
    let empCode = this.propertyAssainForm.controls.empCode.value;
    this.createForm();
    this.propertyAssainForm.controls.empCode.setValue(empCode);
    this.isSubmitted = false;
    this.btnStatus = "Save";
  }

}
