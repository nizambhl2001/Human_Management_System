import { AuthService } from './../../../services/auth.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ApiResponse } from './../../../models/response.model';
import { ToastrService } from 'ngx-toastr';
import { PropertyName } from './../../../models/property-name.model';
import { PropertyService } from './../../../services/property.service';
import { PropertyCategory } from './../../../models/property-category.model';
import { Component, OnInit } from '@angular/core';
import { Pagination } from '../../../shared/paginate';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-property-name',
  templateUrl: './property-name.component.html',
  styleUrls: ['./property-name.component.scss',
    '../../../../vendor/libs/angular-2-dropdown-multiselect/angular-2-dropdown-multiselect.scss',
    '../../../../vendor/libs/ng-select/ng-select.scss']
})
export class PropertyNameComponent extends Pagination implements OnInit {
  compID: number;
  isSubmitted = false;
  propertyNameForm: FormGroup;
  categories: PropertyCategory[] = [];
  properties: PropertyName[] = [];
  property: PropertyName = new PropertyName();
  btnStatus = "Save";
  deleteId: number;
  constructor(
    private propService: PropertyService,
    private toastrService: ToastrService,
    private modalService: NgbModal,
    private formBuilder: FormBuilder) {
    super();
  }

  ngOnInit() {
    this.compID = AuthService.getLoggedCompanyId();
    this.getAllCatagories();
    this.getProperties();
    this.createForm();
    this.searchKeys = ['assetName']
  }
  getAllCatagories() {
    this.propService.getAllCategory().subscribe((response: ApiResponse) => {
      if (response.status) {
        this.categories = response.result as PropertyCategory[];
      }
    })
  }

  getProperties() {
    this.propService.getAllName().subscribe((response: ApiResponse) => {
      if (response.status) {
        this.properties = response.result as PropertyName[];
        this.items = this.properties;
        this.update();
      }
    })
  }
  save() {
    this.isSubmitted = true;
    if (this.propertyNameForm.invalid) {
      this.toastrService.warning("Fill Required Fields");
    }
    else {
      this.propService.saveName(this.propertyNameForm.value).subscribe((response: ApiResponse) => {
        if (response.status) {
          this.toastrService.success(response.result, "Save");
          this.getProperties();
          this.reset();
          this.isSubmitted = false;
        }
      })
    }
  }
  propertyUpdate() {
    this.isSubmitted = true;
    if (this.propertyNameForm.invalid) {
      this.toastrService.warning("Fill Required Fields");
    }
    else {
      this.propService.updateName(this.propertyNameForm.value).subscribe((response: ApiResponse) => {
        if (response.status) {
          this.toastrService.success(response.result, "Update");
          this.btnStatus = "Save";
          this.isSubmitted = false;
          this.getProperties();
          this.reset();
        }
      })
    }
  }
  onStatus() {
    if (this.btnStatus == "Save") {
      this.save();
    } else if(this.btnStatus == "Update") {
      this.propertyUpdate();
    }
  }
  getById(id: number) {
    this.propService.getNameById(id).subscribe((response: ApiResponse) => {
      if (response.status) {
        this.property = response.result as PropertyName;
        this.propertyNameForm.patchValue({
          id:this.property.id,
          aCateoryID: this.property.aCateoryID,
          assetName: this.property.assetName,
          description: this.property.description
        })
        this.btnStatus = "Update";
      }
    })
  }
  createForm() {
    this.propertyNameForm = this.formBuilder.group({
      id: [, []],
      aCateoryID: [, [Validators.required]],
      assetName: [, [Validators.required]],
      description: [, [Validators.required]],
      companyId: [this.compID, []]
    })
  }
  get f() {
    return this.propertyNameForm.controls;
  }
  get formVal() {
    return this.propertyNameForm.value;
  }
  delete(id: number, modal: any) {
    this.modalService.open(modal);
    this.deleteId = id;
  }
  confirm() {
    this.propService.deleteName(this.deleteId).subscribe((response: ApiResponse) => {
      if (response.status) {
        this.toastrService.warning(response.result, "Deleted");
        this.getProperties();
        this.modalService.dismissAll();
      }
    })
  }
  cancel() {
    this.modalService.dismissAll();
  }
  reset() {
    this.isSubmitted = false;
    this.createForm();
    this.btnStatus = "Save";
  }
}
