import { FormBuilder, FormGroup } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { LeaveService } from '../../../services/leave.service';
import { ApiResponse } from '../../../models/response.model';
import { NgbDateCustomParserFormatter } from '../../../shared/dateformat';
import { Helper } from '../../../shared/helper';
import { ToastrService } from 'ngx-toastr';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-leave-apply-user',
  templateUrl: './leave-apply-user.component.html',
  styleUrls: ['./leave-apply-user.component.scss']
})
export class LeaveApplyUserComponent implements OnInit {


  leaveForm:FormGroup
  items:any[] = [];
  itemsFilter:any[] = [];
  exporting: boolean = false;
  setNgbDate:any;
  id:number;
  empCode:string;
  constructor(private formBuilder:FormBuilder ,private leaveService:LeaveService,private dateService:NgbDateCustomParserFormatter,private toaster: ToastrService,private modalService:NgbModal) { }

  ngOnInit() {
    this.setNgbDate = this.dateService.getCurrentNgbDate();
    this.createform();
    this.showLeaveApplyUser();

  }

  showLeaveApplyUser(){
    this.exporting= true;
    this.leaveService.getLeaveApplyUserInfo(1,this.f.Date.value).subscribe((response: ApiResponse) => {
      if (response.status) {
        this.items = response.result as any[];
        this.itemsFilter = response.result as any[];
        this.exporting= false;
      } else {
        this.items = [];
        this.exporting= false;
      }
    })

  }

  onSearch(searchKey: string) {
    if (searchKey) {
      this.items = this.itemsFilter.filter(cus => (
        (cus.empCode as string).toLocaleLowerCase().match(searchKey.toLocaleLowerCase()) ||
        (cus.empName as string).toLocaleLowerCase().match(searchKey.toLocaleLowerCase())||
        (Helper.isNullOrEmpty(cus.empCode) ? '' : cus.empCode as string).toLocaleLowerCase().match(searchKey.toLocaleLowerCase())
      ))
    } else {
      this.items = this.itemsFilter;
    }
  }

  deleteByIdConfirm(leave:any, modal: any) {
    this.leaveForm.patchValue({
      empCode:leave.empCode,
      empName:leave.empName,
      lsDate:leave.lsDate,
      leDate:leave.leDate,
    })
    this.id =leave.id;
    this.modalService.open(modal);
  }

  deleteById(){
    this.leaveService.deleteLeaveById(this.id).subscribe((res:any)=>{
      if(res.status){
        this.toaster.success(res.message)
        this.showLeaveApplyUser();
      }else{
        this.toaster.error(res.message)
      }
  },error=>{
    this.toaster.error(error.message)
  })

  }

  dismiss(){
    this.modalService.dismissAll();
  }





  createform() {
    this.leaveForm = this.formBuilder.group({
      Date: [this.dateService.getDateToYyyymmdd(new Date), []],
      DateNgb: [, []],
      empCode: [, []],
      empName: [, []],
      laDate: [, []],
      leDate: [, []],
    })
  }
  get f() {
    return this.leaveForm.controls;
  }

  get formVal(){
    return this.leaveForm.controls.value;

  }

}
