import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { Pagination } from '../../shared/paginate';
import { BasicEntry } from '../../models/system-setup/basic-entry.model';
import { BasicEntryService } from '../../services/system-setup/basic-entry.service';
import { ApiResponse } from '../../models/response.model';

@Component({
  selector: 'app-bank-select-list',
  template:`<ng-select
  [(ngModel)]="setBankId"
  name="setBankId"
  (change)="onSelect($event)"
  [items]="_bank"
  bindLabel="description"
  bindValue="id"
  placeholder="Select Bank">
  </ng-select>`,
  styleUrls: [ '../../../vendor/libs/ng-select/ng-select.scss']
})
export class BankSelectListComponent extends Pagination implements OnInit {

  _bank:BasicEntry[]=[];
  @Input() setBankId:number;
  @Output() onChange = new EventEmitter<BasicEntry>();
  
  constructor(
    private basicService:BasicEntryService
  ) {
    super();
   }
  ngOnInit() {
    this.getBank();
  }

  onSelect(bank:any){
    if(bank==null){
      this.onChange.emit(new BasicEntry());
      return;
    }
    this.onChange.emit(bank);
  }
  getBank() {
    this.basicService.getBank().subscribe((response: ApiResponse) => {
      if (response.status) {
        this._bank = response.result as BasicEntry[];
        this.sortBy = 'description';
        this.sortDesc = false;
        this.sort(this._bank);
      }
    })
  }
}
