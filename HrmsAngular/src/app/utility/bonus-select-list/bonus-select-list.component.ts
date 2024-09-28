import { AdditionAllowanceService } from './../../services/Addition/addition-allowance.service';
import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { BasicEntry } from '../../models/system-setup/basic-entry.model';
import { BasicEntryService } from '../../services/system-setup/basic-entry.service';
import { ApiResponse } from '../../models/response.model';
import { Pagination } from '../../shared/paginate';
import { BonusType } from '../../models/Addition/bonus-types';

@Component({
  selector: 'app-bonus-select-list',
  template:`<ng-select
  [(ngModel)]="setBonusTypeId"
  name="setBonusTypeId"
  (change)="onSelect($event)"
  [items]="bonusType"
  bindLabel="paymentType"
  bindValue="id"
  placeholder="Select Type">
  </ng-select>`,
  styleUrls: [ '../../../vendor/libs/ng-select/ng-select.scss']
})
export class BonusSelectListComponent extends Pagination implements OnInit {

  bonusType:BonusType[]=[];
  @Input() setBonusTypeId:any;
  @Output() onChange = new EventEmitter<BonusType>();

  constructor(
   private driverallwBonusService: AdditionAllowanceService,
  ) {
    super();
   }
  ngOnInit() {
    this.getBranch();
  }

  onSelect(bonus:any){
    if(bonus==null){
      this.onChange.emit(new BonusType());
      return;
    }
    this.onChange.emit(bonus);
  }
  getBranch() {
    this.driverallwBonusService.getAllBonusType().subscribe((response: ApiResponse) => {
      if (response.status) {
        this.bonusType = response.result as BonusType[];
        this.sortBy = 'paymentType';
        this.sortDesc = false;
        //this.sort(this.bonusType);
      }
    })
  }
}
