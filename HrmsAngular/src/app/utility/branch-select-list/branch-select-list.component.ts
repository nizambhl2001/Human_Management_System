import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { BasicEntry } from '../../models/system-setup/basic-entry.model';
import { BasicEntryService } from '../../services/system-setup/basic-entry.service';
import { ApiResponse } from '../../models/response.model';
import { Pagination } from '../../shared/paginate';

@Component({
  selector: 'app-branch-select-list',
  template:`<ng-select
  [(ngModel)]="setBranchId"
  name="setBranchId"
  (change)="onSelect($event)"
  [items]="_branch"
  bindLabel="description"
  bindValue="id"
  placeholder="Select Branch">
  </ng-select>`,
  styleUrls: [ '../../../vendor/libs/ng-select/ng-select.scss']
})
export class BranchSelectListComponent extends Pagination implements OnInit {

  _branch:BasicEntry[]=[];
  @Input() setBranchId:any;
  @Output() onChange = new EventEmitter<BasicEntry>();
  
  constructor(
    private basicService:BasicEntryService
  ) {
    super();
   }
  ngOnInit() {
    this.getBranch();
  }

  onSelect(branch:any){
    if(branch==null){
      this.onChange.emit(new BasicEntry());
      return;
    }
    this.onChange.emit(branch);
  }
  getBranch() {
    this.basicService.getBranch().subscribe((response: ApiResponse) => {
      if (response.status) {
        this._branch = response.result as BasicEntry[];
        this.sortBy = 'description';
        this.sortDesc = false;
        this.sort(this._branch);
      }
    })
  }
}