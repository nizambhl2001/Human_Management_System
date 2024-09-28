import { AuthService } from './../../../services/auth.service';
import { id } from '@swimlane/ngx-datatable/release/utils';
import { BasicEntryService } from './../../../services/system-setup/basic-entry.service';
import { Component, OnInit, Output, EventEmitter, Input, OnDestroy, ViewChild, ElementRef } from '@angular/core';
import { BasicEntry } from '../../../models/system-setup/basic-entry.model';
import { Pagination } from '../../../shared/paginate';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiResponse } from '../../../models/response.model';
import { ToastrService } from 'ngx-toastr';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AppService } from '../../../app.service';
import { TempStorageData } from '../../../models/security/client-side-storage.model';


@Component({
  selector: 'app-basic-entry',
  templateUrl: './basic-entry.component.html',
  styleUrls: [
    './basic-entry.component.scss',
    '../../../../vendor/libs/ng-select/ng-select.scss'
  ]
})
export class BasicEntryComponent extends Pagination implements OnInit {
  @Input() title = "Basic Entry";
  @Input() tableName: string;
  @Output() allItem = new EventEmitter<any[]>();
  @Input() descriptionFieldNumber: boolean = false;
  @Input() showCloseBtn: boolean = false;
  isSubmitted = false;
  selectedItemId: number;
  filteredItem:BasicEntry[]=[];

  constructor(
    private fb: FormBuilder,
    private modalService: NgbModal,
    private basicEntryService: BasicEntryService,
    private toaster: ToastrService,
    private appService: AppService
  ) {
    super();
  }
  btnStatus = "Save";
  comID;
  basicEntryForm: FormGroup;
  basicEntryModel: BasicEntry[] = [];
  allSortOrder: any[] = [];
  ngOnInit() {
    this.comID = TempStorageData.companyID;
    this.items = [];
    this.perPage = 50,
      this.searchKeys = ['description']
    this.update();
    this.comID = AuthService.getLoggedCompanyId();
    this.createForm();
    this.getAllItem();

  }

  save() {
    this.isSubmitted = true;
    if (this.basicEntryForm.invalid) {
      return;
    }
    else {
      this.basicEntryService.saveOrUpdateBasicEntry(this.basicEntryForm.value).subscribe((response: ApiResponse) => {
        if (response.status) {
          this.toaster.success(response.result, "Success");
          this.btnStatus = "Save";
          this.getAllItem();
          this.update();
          this.Reset();
        } else {
          this.toaster.error(response.result, "Failed!!");
        }
      });
    }
  }

  getAllItem() {
    this.basicEntryService.getAllBasicItems(this.tableName, this.comID).subscribe((response: ApiResponse) => {
      if (response.status) {
        this.filteredItem = response.result as BasicEntry[];
        this.basicEntryModel = response.result as BasicEntry[];
        this.allItem.emit(this.basicEntryModel);
      }
      this.getAllSortOrder();
    });
  }
  onFilter(event){
    if(event.target.value){
      this.filteredItem = this.basicEntryModel.filter(item=>item.description.toLowerCase().match(event.target.value.toString().toLowerCase()))
      }else{
      this.filteredItem = this.basicEntryModel;
    }
  }
  getAllSortOrder() {
    let sortOrders: BasicEntry[] = this.basicEntryModel.filter(
      (item, i, arr) => arr.findIndex(t => t.sortOrder === item.sortOrder) === i
    );
    let lastItem: BasicEntry = new BasicEntry();
    lastItem.id = 0;
    if (sortOrders.length > 0) {
      lastItem.sortOrder = Math.max.apply(Math, sortOrders.map(function (o) { return o.sortOrder; })) + 1;
    } else {
      lastItem.sortOrder = 1;
    }
    sortOrders.push(lastItem);
    this.allSortOrder = sortOrders;
    this.basicEntryForm.patchValue({ sortOrder: lastItem.sortOrder });
  }

  delete(id: number, modal: any) {
    this.selectedItemId = id;
    this.modalService.open(modal);
  }
  confirmDelete(rowId: number) {
    this.basicEntryService.deleteBasicEntry(this.tableName, rowId, this.comID)
      .subscribe(
        (response: ApiResponse) => {
          if (response.status) {
            this.toaster.error(response.result);
            this.getAllItem();
            // this.modalService.dismissAll();
          }
        },
        err => {
          this.toaster.error(err, 'Failed!');
          this.modalService.dismissAll();
        }
      )
    this.modalService.dismissAll()
  }

  getById(id: number) {
    let obj = new BasicEntry();
    obj.id = id;
    obj.tableName = this.tableName
    this.basicEntryService.getByIdBasicEntry(obj).subscribe((response: ApiResponse) => {
      if (response.status) {
        let obj = response.result as BasicEntry;
        obj.tableName = this.tableName;
        this.basicEntryForm.patchValue(response.result);
        this.btnStatus = "Update";
      }
    });
  }

  createForm() {
    this.basicEntryForm = this.fb.group({
      id: [0, []],
      description: [, [Validators.required]],
      tableName: [this.tableName, []],
      sortOrder: [, []],
      companyID: [this.comID, []]
    })
  }
  get f() {
    return this.basicEntryForm.controls;
  }

  Reset() {
    this.isSubmitted = false;
    this.basicEntryForm.reset();
    this.createForm();
    this.btnStatus = 'Save'
  }
  close() {
    this.modalService.dismissAll();
  }



}
