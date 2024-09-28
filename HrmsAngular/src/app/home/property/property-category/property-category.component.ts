import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ApiResponse } from './../../../models/response.model';
import { Pagination } from './../../../shared/paginate';
import { ToastrService } from 'ngx-toastr';
import { PropertyService } from './../../../services/property.service';
import { PropertyCategory } from './../../../models/property-category.model';
import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-property-category',
  templateUrl: './property-category.component.html',
  styleUrls: [
    './property-category.component.scss',
  ]
})
export class PropertyCategoryComponent extends Pagination implements OnInit {
  isSubmitted=false;
  btnStatus = "Save";
  categoryForm:FormGroup;
  propCategory: PropertyCategory = new PropertyCategory();
  allCategories: PropertyCategory[] = [];
  deleteId: number;
  constructor(
    private propertyService: PropertyService,
    private toasterService: ToastrService,
    private formBuilder:FormBuilder,
    private modalService: NgbModal
  )
  {
    super();
  }

  ngOnInit() {
    this.searchKeys = ['categoryName'];
    this.perPage = 10;
    this.getAll();
    this.createForm();
  }

  savePropCategory() {
    this.isSubmitted=true;
    if(this.categoryForm.invalid){
      this.toasterService.warning("Fill Required Fields");
    }
    else{
    this.propertyService.saveCategory(this.categoryForm.value).subscribe((response: ApiResponse) => {
      if (response.status) {
        this.toasterService.success(response.result, "Saved!");
        this.getAll();
        this.reset();
        this.isSubmitted=false;
      }
      else {
        this.toasterService.error(response.result, "Failed");
      }
    })
  }
}

  getAll() {
    this.propertyService.getAllCategory().subscribe((response: ApiResponse) => {
      if (response.status) {
        this.allCategories = response.result as PropertyCategory[];
        this.items = this.allCategories;
        this.update();
      }
    })
  }
  getById(id: number) {
    this.propertyService.getCategoryById(id).subscribe((response: ApiResponse) => {
      if (response.status) {
        this.propCategory = response.result as PropertyCategory;
        this.categoryForm.patchValue(this.propCategory);
        this.btnStatus = "Update"
      }
    })
  }

  updateCategory() {
    this.isSubmitted=true;
    if(this.categoryForm.invalid){
      this.toasterService.warning("Fill Required Fields");
    }
    else{
    this.propertyService.updateCategory(this.categoryForm.value).subscribe((response: ApiResponse) => {
      if (response.status) {
        this.toasterService.success(response.result, "Update");
        this.getAll();
        this.reset();
        this.isSubmitted=false;
        this.btnStatus = "Save"
      }
      else {
        this.toasterService.error(response.result, "Failed");
      }
    })
  }
}
onSubmit(){
  if(this.btnStatus=="Save"){
    this.savePropCategory();
  }
  else{
    this.updateCategory();
  }
}
createForm(){
this.categoryForm=this.formBuilder.group({
  id:[,[]],
  categoryName:[,[Validators.required]],
  description:[,[Validators.required]]
})
}
get f(){
  return this.categoryForm.controls;
}
get formVal(){
  return this.categoryForm.value;
}
  deleteCategory(id: number, modal: any) {
    this.modalService.open(modal);
    this.deleteId = id;
  }
  confirm() {
    this.propertyService.deleteCategory(this.deleteId).subscribe((response: ApiResponse) => {
      if (response.status) {
        this.toasterService.warning(response.result, "Deleted");
        let index = this.allCategories.findIndex(c => c.id == this.deleteId);
        this.allCategories.splice(index, 1);
        this.getAll();
        this.deleteId = 0;
        this.modalService.dismissAll();
      }
    })
  }
  reset() {
    this.createForm();
    this.btnStatus="Save";
    this.isSubmitted=false;
  }

  cancel() {
    this.modalService.dismissAll();
  }

}
