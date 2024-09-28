import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { Pagination } from '../../shared/paginate';
import { BasicEntry } from '../../models/system-setup/basic-entry.model';
import { BasicEntryService } from '../../services/system-setup/basic-entry.service';
import { ApiResponse } from '../../models/response.model';

@Component({
  selector: 'app-show-cause-details-select-list',
  template: `<ng-select
  [(ngModel)]="setShowCauseId"
  name="setShowCauseId"
  (change)="onSelect($event)"
  [items]="showCause"
  bindLabel="description"
  bindValue="id"
  placeholder="Select Show Cause Type">
  </ng-select>`,
  styleUrls: ['../../../vendor/libs/ng-select/ng-select.scss']
})
export class ShowCauseDetailsSelectListComponent extends Pagination implements OnInit {

  showCause:BasicEntry[]=[];
  @Input() setShowCauseId:any;
  @Output() onChange = new EventEmitter<BasicEntry>();
  
  constructor(
    private basicService:BasicEntryService
  ) {
    super();
   }
  ngOnInit() {
    this.getShowCauseDetails();
  }
  onSelect(showCause:any){
    if(showCause==null){
      this.onChange.emit(new BasicEntry());
      return;
    }
    this.onChange.emit(showCause);
  }
  getShowCauseDetails() {
    this.basicService.getAllShowCauseResultDetails().subscribe((response: ApiResponse) => {
      if (response.status) {
        this.showCause = response.result as BasicEntry[];
        this.sortBy = 'description';
        //this.sortDesc = false;
        this.sort(this.showCause);
      }
    })
  }
}
