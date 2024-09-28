import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { Pagination } from '../../shared/paginate';
import { BasicEntry } from '../../models/system-setup/basic-entry.model';
import { BasicEntryService } from '../../services/system-setup/basic-entry.service';
import { ApiResponse } from '../../models/response.model';
import { TaxYearInfo } from '../../models/incomeTax/tax-year-info.model';
import { TaxYearInfoService } from '../../services/incomeTax/tax-year-info.service';

@Component({
  selector: 'app-tax-year-select-list',
  template: `<ng-select
  [ngModel]="setTaxYearId"
  #taxYearCtrl="ngModel"
  name="setTaxYearId"
  (change)="onSelect($event)"
  [items]="taxYear"
  bindLabel="taxYearName"
  bindValue="id"
  [ngClass]="{'is-invalid': (taxYearCtrl.touched || taxYearCtrl.dirty) && taxYearCtrl.invalid}"
  [required]="isRequired"
  placeholder="Select Tax Year">
  </ng-select>
  <div *ngIf="(taxYearCtrl.touched || taxYearCtrl.dirty) && taxYearCtrl.invalid" class="text-danger">
  <i *ngIf="taxYearCtrl.errors.required">Tax Year is required</i>
  </div>
  `,
  styleUrls: ['../../../vendor/libs/ng-select/ng-select.scss']
})
export class TaxYearSelectListComponent extends Pagination implements OnInit {

  taxYear:TaxYearInfo[]=[];

  @Input() setTaxYearId:any;
  @Input() isRequired:boolean = false;
  @Output() onChange = new EventEmitter<TaxYearInfo>();
  
  constructor(
    private taxService:TaxYearInfoService
  ) {
    super();
   }
  ngOnInit() {
    this.getTaxYear();
  }
  onSelect(taxYear:any){
    if(taxYear==null){
      this.onChange.emit(new TaxYearInfo());
      return;
    }
    this.onChange.emit(taxYear);
  }
  getTaxYear() {
    this.taxService.getAllYearList().subscribe((response: ApiResponse) => {
      if (response.status) {
        this.taxYear = response.result as TaxYearInfo[];
        this.sortBy = 'taxYearName';
        this.sortDesc = false;
        this.sort(this.taxYear);
      }
    })
  }
}
