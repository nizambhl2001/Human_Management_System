import { SalarySetupService } from './../../services/SalarySetup/salary-setup.service';
import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { ApiResponse } from '../../models/response.model';
import { Pagination } from '../../shared/paginate';
import { SalaryHead } from '../../models/SalarySetup/salary-head';

@Component({
  selector: 'app-salaryhead-select-list',
  template:`<ng-select [(ngModel)]="salaryhead" [ngClass]="{'is-invalid': isRequired}"
  name="salaryhead"
  (change)="onSelect($event)"
  [items]="salaryHeadModel"
  bindLabel="accountName"
  bindValue="id"
  placeholder="Select Salary Head">
  </ng-select>`,
  styleUrls: [ '../../../vendor/libs/ng-select/ng-select.scss']
})
export class SalaryHeadSelectListComponent extends Pagination implements OnInit {

  salaryHeadModel:SalaryHead[]=[];
  @Input() salaryhead:any;
  @Input() isRequired:boolean=false;
  @Output() onChange = new EventEmitter<SalaryHead>();
  
  constructor(
   private salaryHeadService: SalarySetupService,
  ) {
    super();
   }
  ngOnInit() {
    this.getSalaryHead();
  }

  onSelect(salaryhead:any){
    if(salaryhead==null){
      this.onChange.emit(new SalaryHead());
      return;
    }
    this.onChange.emit(salaryhead);
  }
  getSalaryHead() {
    this.salaryHeadService.getAllSalaryHead().subscribe((response: ApiResponse) => {
      if (response.status) {
        this.salaryHeadModel = response.result as SalaryHead[];
        this.sortBy = 'paymentType';
        this.sortDesc = false;
        this.sort(this.salaryHeadModel);
      }
    })
  }
}