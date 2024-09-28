import { AuthService } from '../../../services/auth.service';
import { id } from '@swimlane/ngx-datatable/release/utils';
import { BasicEntryService } from '../../../services/system-setup/basic-entry.service';
import { Component, OnInit, Output, EventEmitter, Input, OnDestroy, ViewChild, ElementRef } from '@angular/core';
import { BasicEntry } from '../../../models/system-setup/basic-entry.model';
import { Pagination } from '../../../shared/paginate';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiResponse } from '../../../models/response.model';
import { ToastrService } from 'ngx-toastr';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AppService } from '../../../app.service';
import { TempStorageData } from '../../../models/security/client-side-storage.model';
import { KpiSetupModel } from '../../../models/Apprisal/kpisetup';
import { ApprisalService } from '../../../services/Apprisal/apprisal.service';


@Component({
  selector: 'kpi-basic-entry',
  templateUrl: './kpi-basic-entry.component.html',
  styleUrls: [
    './kpi-basic-entry.component.scss',
    '../../../../vendor/libs/ng-select/ng-select.scss'
  ]
})
export class KpiBasicEntryComponent extends Pagination implements OnInit {
 
  // constructor(
  //   private fb: FormBuilder,
  //   private modalService: NgbModal,
  //   private basicEntryService: BasicEntryService,
  //   private toaster: ToastrService,
  //   private appService: AppService
  // ) {
  //   super();
  // }
  // btnStatus = "Save";
  // comID;
  // basicEntryForm: FormGroup;
  // basicEntryModel: BasicEntry[] = [];
  // allSortOrder: any[] = [];
  // ngOnInit() {
  //   this.comID = TempStorageData.companyID;
  //   this.items = [];
  //   this.perPage = 50,
  //     this.searchKeys = ['description']
  //   this.update();
  //   this.comID = AuthService.getLoggedCompanyId();
  //   this.createForm();
  //   this.getAllItem();

  // }

  // save() {
  //   this.isSubmitted = true;
  //   if (this.basicEntryForm.invalid) {
  //     return;
  //   }
  //   else {
  //     this.basicEntryService.saveOrUpdateBasicEntry(this.basicEntryForm.value).subscribe((response: ApiResponse) => {
  //       if (response.status) {
  //         this.toaster.success(response.result, "Success");
  //         this.btnStatus = "Save";
  //         this.getAllItem();
  //         this.update();
  //         this.Reset();
  //       } else {
  //         this.toaster.error(response.result, "Failed!!");
  //       }
  //     });
  //   }
  // }

  // getAllItem() {
  //   this.basicEntryService.getAllBasicItems(this.tableName, this.comID).subscribe((response: ApiResponse) => {
  //     if (response.status) {
  //       this.items = response.result as BasicEntry[];
  //       this.basicEntryModel = response.result as BasicEntry[];
  //       this.allItem.emit(this.items);
  //       this.sortBy = 'sortOrder';
  //       this.sortDesc = false;
  //       this.sort(this.items);
  //       this.update();
  //     }
  //     this.getAllSortOrder();
  //   });
  // }
  // getAllSortOrder() {
  //   let sortOrders: BasicEntry[] = this.basicEntryModel.filter(
  //     (item, i, arr) => arr.findIndex(t => t.sortOrder === item.sortOrder) === i
  //   );
  //   let lastItem: BasicEntry = new BasicEntry();
  //   lastItem.id = 0;
  //   if (sortOrders.length > 0) {
  //     lastItem.sortOrder = Math.max.apply(Math, sortOrders.map(function (o) { return o.sortOrder; })) + 1;
  //   } else {
  //     lastItem.sortOrder = 1;
  //   }
  //   sortOrders.push(lastItem);
  //   this.allSortOrder = sortOrders;
  //   this.basicEntryForm.patchValue({ sortOrder: lastItem.sortOrder });
  // }

  // delete(id: number, modal: any) {
  //   this.selectedItemId = id;
  //   this.modalService.open(modal);
  // }
  // confirmDelete(rowId: number) {
  //   this.basicEntryService.deleteBasicEntry(this.tableName, rowId, this.comID)
  //     .subscribe(
  //       (response: ApiResponse) => {
  //         if (response.status) {
  //           this.toaster.warning(response.result);
  //           this.getAllItem();
  //           // this.modalService.dismissAll();
  //         }
  //       },
  //       err => {
  //         this.toaster.error(err, 'Failed!');
  //         this.modalService.dismissAll();
  //       }
  //     )
  //   this.modalService.dismissAll()
  // }

  // getById(id: number) {
  //   let obj = new BasicEntry();
  //   obj.id = id;
  //   obj.tableName = this.tableName
  //   this.basicEntryService.getByIdBasicEntry(obj).subscribe((response: ApiResponse) => {
  //     if (response.status) {
  //       let obj = response.result as BasicEntry;
  //       obj.tableName = this.tableName;
  //       this.basicEntryForm.patchValue(response.result);
  //       this.btnStatus = "Update";
  //     }
  //   });
  // }

  // createForm() {
  //   this.basicEntryForm = this.fb.group({
  //     id: [0, []],
  //     description: [, [Validators.required]],
  //     tableName: [this.tableName, []],
  //     sortOrder: [, []],
  //     companyID: [this.comID, []]
  //   })
  // }
  // get f() {
  //   return this.basicEntryForm.controls;
  // }

  // Reset() {
  //   this.isSubmitted = false;
  //   this.basicEntryForm.reset();
  //   this.createForm();
  //   this.btnStatus = 'Save'
  // }
  // close() {
  //   this.modalService.dismissAll();
  // }

//====================================== New ===========================================


empcode:string;
userid:number;
companyid:number;
//====== New ============
@Input() title = "KPI Setup";
@Input() tableName: string;
@Output() allItem = new EventEmitter<any[]>();
@Input() descriptionFieldNumber: boolean = false;
@Input() showCloseBtn: boolean = false;
isSubmitted = false;
selectedItemId: number;
constructor(
  private modalService: NgbModal,
  private basicEntryService:BasicEntryService,
  private formbuilder:FormBuilder,
  private appservice:ApprisalService,
  private toasterservice:ToastrService
  ) 
  {
      super();
    }

ngOnInit() {
  this.items = [];
  this.perPage = 50,
  this.searchKeys = ['KPIName']
  this.update();
  this.getDepartmentName();
  this.createForm();
  this.createForm2();
  this.empcode=AuthService.getLoggedEmpCode();
  this.userid=AuthService.getLoggedUserId();
  this.companyid=AuthService.getLoggedCompanyId();
  this.getbusiness();
  this.getPeople();
  
}
//title="Kpi Setup";
saveupdate="Save";
SavePeople="Save";
departments:BasicEntry[]=[];
kpiBusinessfrom:FormGroup;
kpiPeopleform:FormGroup;
KpiBusinessResult:KpiSetupModel[]=[];
kpiPeopleResult:KpiSetupModel[]=[];
allSortOrder: any[] = [];
//isSubmitted:boolean=false;
isSubmited:boolean=false;
getDepartmentName() {
  this.basicEntryService.getDepartment().subscribe((response: ApiResponse) => {
    if (response.status) {
    
      this.departments = response.result as BasicEntry[];
    }

  })
}

getbusiness(){
  this.appservice.getbusinessresult(this.empcode,this.userid,this.companyid).subscribe((response: ApiResponse) => {
    if (response.status) {
      this.KpiBusinessResult = response.result as KpiSetupModel[];
      this.items = response.result as KpiSetupModel[];
      this.allItem.emit(this.items);
      this.sortBy = 'KPIName';
      this.sortDesc = false;
      this.sort(this.items);
      this.update();
    }
  })
}
getPeople(){
this.appservice.getPeopleresult(this.empcode,this.userid,this.companyid).subscribe((response:ApiResponse)=>{

  if(response.status){
    this.kpiPeopleResult=response.result as KpiSetupModel[];
    this.items = response.result as KpiSetupModel[];
    this.allItem.emit(this.items);
    this.sortBy = 'KPIName';
    this.sortDesc = false;
    this.sort(this.items);
    this.update();
  }
})
}
businessEdit(id:number){
  this.appservice.getKpiByid(id).subscribe((response:ApiResponse)=>{
  this.saveupdate="Update";
    if(response.status){
      this.kpiBusinessfrom.patchValue(response.result);
    }
  })
}
peopleEdit(id:number){
  this.appservice.getKpiByid(id).subscribe((response:ApiResponse)=>{
  this.SavePeople="Update";
    if(response.status){
      this.kpiPeopleform.patchValue(response.result);
    }
  })
}
saveUpdateBusiness(){
  this.isSubmitted=true;
  if(this.kpiBusinessfrom.invalid){
    this.toasterservice.error('Please fill all required field', 'Invalid Submission!');
    return;
  }
  this.kpiBusinessfrom.patchValue({option:1});
  this.appservice.saveUpdateKpi(this.kpiBusinessfrom.value).subscribe((res:ApiResponse)=>{
    if(res.status){
      this.toasterservice.success(this.saveupdate + " Successfully.","Success");
      this.getbusiness();
      this.resetBusiness();
    }else{
      this.toasterservice.error(res.result,"Something is not ok..");
    }
  })
}
saveUpdatePeople(){
  this.isSubmited=true;
  if(this.kpiPeopleform.invalid){
    this.toasterservice.error('Please fill all required field', 'Invalid Submission!');
    return;
  }
  this.kpiPeopleform.patchValue({option:1});
  this.appservice.saveUpdateKpi(this.kpiPeopleform.value).subscribe((res:ApiResponse)=>{
    if(res.status){
      this.toasterservice.success(this.SavePeople +" Successfully.","Success");
      this.resetPeople();
      this.getPeople();
    }else{
      this.toasterservice.error(res.result,"Something is not ok..");
    }
  })
}
createForm(){
  this.kpiBusinessfrom=this.formbuilder.group({
     id:[0,[]],
     kpiName:[,[Validators.required]],
     serialNo:[,[Validators.required]],
     departmentId:[,[Validators.required]],
     kpiType:[1,[]],
     userId:[1,[]],
     companyId:[1,[]],
     option:[,[]]
  })
  }
createForm2(){
  this.kpiPeopleform=this.formbuilder.group({
    id:[0,[]],
    kpiName:[,[Validators.required]],
    serialNo:[,[Validators.required]],
    departmentId:[,[Validators.required]],
    kpiType:[2,[]],
    userId:[1,[]],
    companyId:[1,[]],
    option:[,[]]
  })
  }
  get f(){
    return this.kpiBusinessfrom.controls;
  }
  get g(){
    return this.kpiPeopleform.controls;
  }

  resetBusiness(){
    this.createForm();
    this.saveupdate="Save";
    this.isSubmitted=false;
  }
  resetPeople(){
    this.createForm2();
    this.SavePeople="Save";
    this.isSubmited=false;
  }
  businessDelete(id:number){
  this.appservice.deleteKpi(id,this.companyid).subscribe((response:ApiResponse)=>{
  if(response.status)
    {
      this.toasterservice.success("Deleted Successfully.","Success");
      this.getbusiness();
    }
  })
  }
  peopleDelete(id:number){
  this.appservice.deleteKpi(id,this.companyid).subscribe((response:ApiResponse)=>{
  if(response.status)
    {
      this.toasterservice.success("Deleted Successfully.","Success");
      this.getPeople();
    }
  })
  }


}
