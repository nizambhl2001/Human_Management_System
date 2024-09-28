import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { BasicEntry } from '../../models/system-setup/basic-entry.model';
import { BasicEntryService } from '../../services/system-setup/basic-entry.service';
import { ApiResponse } from '../../models/response.model';
import { Pagination } from '../../shared/paginate';
import { SalaryPeriodModel } from '../../models/SalarySetup/SalaryPeriod';
import { SalarySetupService } from '../../services/SalarySetup/salary-setup.service';

@Component({
  selector: 'app-period-select-list',
  template: `<ng-select
  [(ngModel)]="setPeriodId"
  #period="ngModel"
  name="setPeriodId"
  (change)="onSelect($event)"
  [items]="salaryPeriod"
  bindLabel="periodName"
  bindValue="id"
  [required]="isRequired"
  [ngClass]="{'is-invalid':period.invalid && (period.touched || period.dirty)}"
  placeholder="Select Period">
  </ng-select>
  <div *ngIf="period.invalid && (period.touched || period.dirty)"
  class="text-danger">
    <i *ngIf="period.errors.required">Period is Required</i>
  </div>`,
  styleUrls: ['../../../vendor/libs/ng-select/ng-select.scss']
})
export class PeriodSelectListComponent extends Pagination implements OnInit {

  salaryPeriod: SalaryPeriodModel[] = [];
  @Input() isItemLoad: boolean = true;
  @Input() setPeriodId: any;
  @Input() isRequired: boolean=false;
  @Output() onChange = new EventEmitter<SalaryPeriodModel>();

  constructor(
    private salaryPeriodService: SalarySetupService
  ) {
    super();
  }
  ngOnInit() {
    if (this.isItemLoad == true) {
      this.getPeriod();
    }
  }

  onSelect(period: any) {
    if (period == null) {
      this.onChange.emit(new SalaryPeriodModel());
      return;
    }
    this.onChange.emit(period);
  }
  getPeriod() {
    this.salaryPeriodService.getAllperiod().subscribe((response: ApiResponse) => {
      if (response.status) {
        this.salaryPeriod = response.result as SalaryPeriodModel[];
        this.sortBy = 'periodName';
        this.sortDesc = false;
        //this.sort(this.salaryPeriod);
      }
    })
  }
}
