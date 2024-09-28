import { SalaryYear } from './../../models/SalarySetup/salary-year';
import { Pagination } from './../../shared/paginate';
import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { SalarySetupService } from '../../services/SalarySetup/salary-setup.service';
import { ApiResponse } from '../../models/response.model';

@Component({
  selector: 'app-year-select-list',
  template:`<ng-select
  (change)="onSelect($event)"
  [items]="salaryYear"
  bindLabel="periodName"
  bindValue="id"
  placeholder="Select Year">
  </ng-select>`,
  styleUrls: [ '../../../vendor/libs/ng-select/ng-select.scss']
})
export class YearSelectListComponent extends Pagination implements OnInit {

  salaryYear:SalaryYear[]=[];
  @Output() onChange = new EventEmitter<SalaryYear>();

  constructor(
    private salaryYearService:SalarySetupService
  ) {
    super();
   }
  ngOnInit() {
    this.getPeriod();
  }

  onSelect(year:any){
    if(year==null){
      this.onChange.emit(new SalaryYear());
      return;
    }
    this.onChange.emit(year);
  }
  getPeriod() {
    this.salaryYearService.getAllperiod().subscribe((response: ApiResponse) => {
      if (response.status) {
        this.salaryYear = response.result as SalaryYear[];
        this.sortBy = 'yearName';
        this.sortDesc = false;
        //this.sort(this.salaryYear);
      }
    })
  }
}
