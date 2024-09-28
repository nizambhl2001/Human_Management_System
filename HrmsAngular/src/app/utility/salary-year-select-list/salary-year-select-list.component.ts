import { SalaryYear } from '../../models/SalarySetup/salary-year';
import { Pagination } from '../../shared/paginate';
import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { SalarySetupService } from '../../services/SalarySetup/salary-setup.service';
import { ApiResponse } from '../../models/response.model';

@Component({
  selector: 'app-salary-year-select-list',
  template:`<ng-select
  [(ngModel)]="yearId"
  (change)="onSelect($event)"
  [items]="salaryYear"
  bindLabel="yearName"
  bindValue="id"
  placeholder="Select Year">
  </ng-select>`,
  styleUrls: [ '../../../vendor/libs/ng-select/ng-select.scss']
})
export class SalaryYearSelectListComponent extends Pagination implements OnInit {

  salaryYear:SalaryYear[]=[];
  @Input() yearId:number;
  @Output() onChange = new EventEmitter<SalaryYear>();

  constructor(
    private salaryYearService:SalarySetupService
  ) {
    super();
   }
  ngOnInit() {
    this.getAllSalaryYear();
  }

  onSelect(year:any){
    if(year==null){
      this.onChange.emit(new SalaryYear());
      return;
    }
    this.onChange.emit(year);
  }
  getAllSalaryYear() {
    this.salaryYearService.getAllSalaryYear().subscribe((response: ApiResponse) => {
      if (response.status) {
        this.salaryYear = response.result as SalaryYear[];
        this.sortBy = 'yearName';
        this.sortDesc = false;
        //this.sort(this.salaryYear);
      }
    })
  }
}
