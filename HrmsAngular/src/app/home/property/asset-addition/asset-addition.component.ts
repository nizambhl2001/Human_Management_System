import { AuthService } from './../../../services/auth.service';
import { retry } from 'rxjs/operators';
import { NgbDateCustomParserFormatter } from './../../../shared/dateformat';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { state } from '@angular/animations';
import { ApiResponse } from './../../../models/response.model';
import { NgbModal, NgbDateStruct, NgbDate } from '@ng-bootstrap/ng-bootstrap';
import { Component, OnInit } from '@angular/core';
import { AssetAddition } from '../../../models/asset-addition.model';
import { PropertyCategory } from '../../../models/property-category.model';
import { PropertyName } from '../../../models/property-name.model';
import { PropertyService } from '../../../services/property.service';
import { ToastrService } from 'ngx-toastr';
import { Pagination } from '../../../shared/paginate';
import { DatePipe } from '@angular/common';
import { toDate } from '@angular/common/src/i18n/format_date';

@Component({
  selector: 'app-asset-addition',
  templateUrl: './asset-addition.component.html',
  styleUrls: ['./asset-addition.component.scss',
  '../../../../vendor/libs/angular-2-dropdown-multiselect/angular-2-dropdown-multiselect.scss',
  '../../../../vendor/libs/ng-select/ng-select.scss']
})
export class AssetAdditionComponent extends Pagination implements OnInit {
  assetaddition: AssetAddition[] = [];
  assetAdditionform:FormGroup
  categories: PropertyCategory[] = [];
  assetname: PropertyName[];
  assetModels: AssetAddition[] = [];
  asset: AssetAddition = new AssetAddition();
  deleteId: number;
  compId:number;
  isSubmitted=false;
  btnStatus:string ='Save';
  constructor(
     private propService: PropertyService,
     private toasterservice: ToastrService,
     private formBuilder:FormBuilder,
     private dateFormate:NgbDateCustomParserFormatter,
    private modalService: NgbModal)
    {
    super();
    }

  ngOnInit() {
    this.searchKeys = ['model'];
    this.compId=AuthService.getLoggedCompanyId();
    this.GetAllAsset();
    this.GetCatagory();
    this.createform();
  }
  Save() {
    this.isSubmitted=true;
    if(this.assetAdditionform.invalid){
      this.toasterservice.warning("Fill All required Fields");
    }
    else{
    this.assetAdditionform.controls.purchesate.setValue(this.dateFormate.ngbDateToDate(this.formVal.purchesDateNg).toLocaleDateString());
    this.assetAdditionform.controls.warrentydate.setValue(this.dateFormate.ngbDateToDate(this.formVal.warrentyDateNg).toLocaleDateString());
    this.propService.assetsave(this.assetAdditionform.value).subscribe((response: ApiResponse) => {
      if (response.status) {
        this.toasterservice.success(response.result, "Success!");
        this.Reset();
        this.isSubmitted=false;
      }
    })
  }
}
  Update() {
    this.isSubmitted=true;
    if(this.assetAdditionform.invalid){
      this.toasterservice.warning("Fill All required Fields");
    }
    else{
    this.assetAdditionform.controls.purchesate.setValue(this.dateFormate.ngbDateToDate(this.formVal.purchesDateNg).toLocaleDateString());
    this.assetAdditionform.controls.warrentydate.setValue(this.dateFormate.ngbDateToDate(this.formVal.warrentyDateNg).toLocaleDateString());
    this.propService.assetsave(this.assetAdditionform.value).subscribe((response: ApiResponse) => {
      if (response.status) {
        this.toasterservice.success("Update SuccessFully", "Success!");
        this.btnStatus ="Save";
        this.Reset();
      }
    })
  }
  }
  onSubmit(){
    if(this.btnStatus=="Save"){
      this.Save();
    }
    else{
      this.Update();
    }
  }
  GetAllAsset() {
    this.propService.getAllAsset().subscribe((response: ApiResponse) => {

      if (response.status) {
        this.items = response.result as AssetAddition[]; //for pagination
        this.update(); //for pagination
      }
      else{

      }
    })
  }
  getAssetModel(assetId: number) {
    if(assetId>0){
      this.propService.getAssetModel(assetId).subscribe((response: ApiResponse) => {
        if (response.status) {
          this.assetModels = response.result as AssetAddition[];
        }
        else{

        }
      })
    }
  }
  GetAssetByCategory(id: number) {
    console.log(id);
    if(id==null){
      return;
    }
    this.propService.getAllAssetByCategory(id).subscribe((response: ApiResponse) => {
      if(response.status){
        this.assetname = response.result as PropertyName[];
      }
      else{

      }
    })
  }
  GetAssetById(id: number) {
    this.propService.getAssetById(id).subscribe((response: ApiResponse) => {
     if(response.status){
      this.asset = response.result as AssetAddition;
      this.assetAdditionform.patchValue(response.result);
      this.assetAdditionform.controls.purchesDateNg.setValue(this.dateFormate.stringToNgbDate(this.asset.purchesate));
      this.assetAdditionform.controls.warrentyDateNg.setValue(this.dateFormate.stringToNgbDate(this.asset.warrentydate));
      this.btnStatus = 'Update';
     }
     else{

     }
    })
  }
  AssetDelete(id: number, modal: any) {
    this.modalService.open(modal);
    this.deleteId = id;
  }
  Confirm() {
    this.propService.deleteAsset(this.deleteId).subscribe((response: ApiResponse) => {
      if (response.status) {
        this.toasterservice.error!(response.result, "Deleted");
        this.GetAllAsset();
        this.modalService.dismissAll();
      }
    })
  }
  Cancel() {
    this.modalService.dismissAll();
  }
  GetCatagory() {
    this.propService.getAllCategory().subscribe((response: ApiResponse) => {
      if(response.status){
        this.categories = response.result as PropertyCategory[];
      }
      else{
       this.categories=[];
      }
    })
  }
  GetProperty() {
    this.propService.getAllName().subscribe((response: ApiResponse) => {
      if(response.status){
        this.assetname = response.result as PropertyName[];
      }
    })
  }
  createform(){
  this.assetAdditionform=this.formBuilder.group({
    id:[,[]],
    assetCatagoryId:[,[Validators.required]],
    assetID:[,[Validators.required]],
    model:[,[Validators.required]],
    serial:[,[Validators.required]],
    purchesPrice:[,[Validators.required]],
    confiruration:[,[Validators.required]],
    warrentyType:[0,[]],
    purchesate:[,[]],
    purchesDateNg:[this.dateFormate.getCurrentNgbDate(),[]],
    warrentydate:[,[]],
    warrentyDateNg:[,[Validators.required]],
    note:[,[]],
    isActive:[,[]],
    companyId:[this.compId,[]],
  })
  }
  Reset() {
     this.createform();
    this.btnStatus = "Save";
    this.isSubmitted=false;
  }
  get f(){
    return this.assetAdditionform.controls;
  }
  get formVal(){
    return this.assetAdditionform.value;
  }

}
