import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { Pagination } from '../../shared/paginate';
import { BasicEntry } from '../../models/system-setup/basic-entry.model';
import { BasicEntryService } from '../../services/system-setup/basic-entry.service';
import { ApiResponse } from '../../models/response.model';

@Component({
  selector: 'app-misconduct-select-list',
  template: `<ng-select
  [(ngModel)]="setMisconductId"
  name="setMisconductId"
  (change)="onSelect($event)"
  [items]="misconduct"
  bindLabel="description"
  bindValue="id"
  placeholder="Select Misconduct Type">
  </ng-select>`,
  styleUrls: ['../../../vendor/libs/ng-select/ng-select.scss']
})
export class MisconductSelectListComponent extends Pagination implements OnInit {

  misconduct:BasicEntry[]=[];
  @Input() setMisconductId:any;
  @Output() onChange = new EventEmitter<BasicEntry>();
  
  constructor(
    private basicService:BasicEntryService
  ) {
    super();
   }
  ngOnInit() {
    this.getMisconduct();
  }
  onSelect(misconduct:any){
    if(misconduct==null){
      this.onChange.emit(new BasicEntry());
      return;
    }
    this.onChange.emit(misconduct);
  }
  getMisconduct() {
    this.basicService.getShowcaseRules().subscribe((response: ApiResponse) => {
      if (response.status) {
        this.misconduct = response.result as BasicEntry[];
        this.sortBy = 'description';
        this.sortDesc = false;
        this.sort(this.misconduct);
      }
    })
  }
}
