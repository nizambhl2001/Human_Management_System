import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { Pagination } from '../../shared/paginate';
import { ApiResponse } from '../../models/response.model';
import { SalaryHead } from '../../models/SalarySetup/salary-head';
import { DeductionService } from '../../services/Deduction/deduction.service';

@Component({
  selector: 'app-loan-type-select-list',
  template: `<ng-select
  [(ngModel)]="setLoanTypeId"
  name="setLoanTypeId"
  (change)="onSelect($event)"
  [items]="loanType"
  bindLabel="accountName"
  bindValue="id"
  placeholder="Select Loan Type">
  </ng-select>`,
  styleUrls: ['../../../vendor/libs/ng-select/ng-select.scss']
})
export class LoanTypeSelectListComponent extends Pagination implements OnInit {

  compId:number;
  loanType:SalaryHead[]=[];
  @Input() setLoanTypeId:any;
  @Output() onChange = new EventEmitter<SalaryHead>();

  constructor(
    private loanService:DeductionService
  ) {
    super();
   }
  ngOnInit() {
    this.compId = 1;
    this.getLoan();
  }
  onSelect(loan:any){
    if(loan==null){
      this.onChange.emit(new SalaryHead());
      return;
    }
    this.onChange.emit(loan);
  }
  getLoan() {
    this.loanService.getLoan(this.compId).subscribe((response: ApiResponse) => {
      if (response.status) {
        this.loanType = response.result as SalaryHead[];
        this.sortBy = 'accountName';
        this.sortDesc = false;
        this.sort(this.loanType);
      }
    })
  }
}
