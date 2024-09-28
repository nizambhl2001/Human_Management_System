import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { BasicEntry } from '../../models/system-setup/basic-entry.model';
import { Pagination } from '../../shared/paginate';
import { BasicEntryService } from '../../services/system-setup/basic-entry.service';
import { ApiResponse } from '../../models/response.model';

@Component({
  selector: 'app-signatory-select-list',
  template: `<ng-select
  [(ngModel)]="setSignatoryId"
  name="setSignatoryId"
  (change)="onSelect($event)"
  [items]="_signatory"
  bindLabel="description"
  bindValue="id"
  placeholder="Select Signatory">
  </ng-select>`,
  styleUrls: ['../../../vendor/libs/ng-select/ng-select.scss']
})
export class SignatorySelectListComponent extends Pagination implements OnInit {

  compId:number;
  _signatory:BasicEntry[]=[];
  @Input() setSignatoryId:any;
  @Output() onChange = new EventEmitter<BasicEntry>();
  
  constructor(
    private basicService:BasicEntryService
  ) {
    super();
   }
  ngOnInit() {
    this.compId = 1;
    this.getSignatory();
  }

  onSelect(signatory:any){
    if(signatory==null){
      this.onChange.emit(new BasicEntry());
      return;
    }
    this.onChange.emit(signatory);
  }
  getSignatory() {
    this.basicService.getSignatory(this.compId).subscribe((response: ApiResponse) => {
      if (response.status) {
        this._signatory = response.result as BasicEntry[];
        this.sortBy = 'description';
        this.sortDesc = false;
        this.sort(this._signatory);
      }
    })
  }
}
