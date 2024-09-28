import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { Pagination } from '../../shared/paginate';
import { BasicEntry } from '../../models/system-setup/basic-entry.model';
import { BasicEntryService } from '../../services/system-setup/basic-entry.service';
import { ApiResponse } from '../../models/response.model';

@Component({
  selector: 'app-location-select-list',
  template: `<ng-select
  [(ngModel)]="setLocationId"
  name="setLocationId"
  (change)="onSelect($event)"
  [items]="_location"
  bindLabel="description"
  bindValue="id"
  placeholder="Select Location"
  [disabled]="disabled">
  </ng-select>`,
  styleUrls: ['../../../vendor/libs/ng-select/ng-select.scss']
})
export class LocationSelectListComponent extends Pagination implements OnInit {

  _location:BasicEntry[]=[];
  @Input() setLocationId:any;
  @Input() disabled:boolean = false;
  @Output() onChange = new EventEmitter<BasicEntry>();
  
  constructor(
    private basicService:BasicEntryService
  ) {
    super();
   }
  ngOnInit() {
    this.getLocation();
  }
  onSelect(loc:any){
    if(loc==null){
      this.onChange.emit(new BasicEntry());
      return;
    }
    this.onChange.emit(loc);
  }
  getLocation() {
    this.basicService.getLocation().subscribe((response: ApiResponse) => {
      if (response.status) {
        this._location = response.result as BasicEntry[];
        this.sortBy = 'description';
        this.sortDesc = false;
        this.sort(this._location);
      }
    })
  }
}
