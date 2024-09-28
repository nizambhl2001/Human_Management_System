import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { Pagination } from '../../shared/paginate';
import { BasicEntry } from '../../models/system-setup/basic-entry.model';
import { BasicEntryService } from '../../services/system-setup/basic-entry.service';
import { ApiResponse } from '../../models/response.model';

@Component({
  selector: 'app-punishment-select-list',
  template: `<ng-select
  [(ngModel)]="setPunishmentId"
  name="setPunishmentId"
  (change)="onSelect($event)"
  [items]="punishment"
  bindLabel="description"
  bindValue="id"
  placeholder="Select Punishment">
  </ng-select>`,
  styleUrls: ['../../../vendor/libs/ng-select/ng-select.scss']
})
export class PunishmentSelectListComponent extends Pagination implements OnInit {

  punishment:BasicEntry[]=[];
  @Input() setPunishmentId:any;
  @Output() onChange = new EventEmitter<BasicEntry>();
  
  constructor(
    private basicService:BasicEntryService
  ) {
    super();
   }
  ngOnInit() {
    this.getPunishment();
  }
  onSelect(punishment:any){
    if(punishment==null){
      this.onChange.emit(new BasicEntry());
      return;
    }
    this.onChange.emit(punishment);
  }
  getPunishment() {
    this.basicService.getAllAction().subscribe((response: ApiResponse) => {
      if (response.status) {
        this.punishment = response.result as BasicEntry[];
        this.sortBy = 'description';
        this.sortDesc = false;
        this.sort(this.punishment);
      }
    })
  }
}
