import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { Pagination } from '../../shared/paginate';
import { BasicEntry } from '../../models/system-setup/basic-entry.model';
import { BasicEntryService } from '../../services/system-setup/basic-entry.service';
import { ApiResponse } from '../../models/response.model';

@Component({
  selector: 'app-show-cause-result-type-select-list',
  template: `<ng-select
  [ngModel]="setShowCauseResultTypeId"
  name="setShowCauseResultTypeId"
  (change)="onSelect($event)"
  [items]="showCauseResultType"
  bindLabel="description"
  bindValue="id"
  placeholder="Select Show Cause Result Type">
  </ng-select>`,
  styleUrls: ['../../../vendor/libs/ng-select/ng-select.scss']
})
export class ShowCauseResultTypeSelectListComponent extends Pagination implements OnInit {

  showCauseResultType:BasicEntry[]=[];
  @Input() setShowCauseResultTypeId:any;
  @Output() onChange = new EventEmitter<BasicEntry>();
  
  constructor(
    private basicService:BasicEntryService
  ) {
    super();
   }
  ngOnInit() {
    this.getShowCauseResultTypeDetails();
  }
  onSelect(showCauseResultType:any){
    if(showCauseResultType==null){
      this.onChange.emit(new BasicEntry());
      return;
    }
    this.onChange.emit(showCauseResultType);
  }
  getShowCauseResultTypeDetails() {
    this.basicService.getAllShowCauseResultType().subscribe((response: ApiResponse) => {
      if (response.status) {
        this.showCauseResultType = response.result as BasicEntry[];
        this.sortBy = 'description';
        this.sortDesc = false;
        this.sort(this.showCauseResultType);
      }
    })
  }
}
