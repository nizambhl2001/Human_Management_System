import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { BasicEntry } from '../../models/system-setup/basic-entry.model';
import { BasicEntryService } from '../../services/system-setup/basic-entry.service';
import { ApiResponse } from '../../models/response.model';
import { Pagination } from '../../shared/paginate';
import { BonusType } from '../../models/Addition/bonus-types';


@Component({
  selector: 'app-designation-select-list',
  template:`<ng-select
  (change)="onSelect($event)"
  [items]="designationModel"
  bindLabel="description"
  bindValue="id"
  placeholder="Select Designation">
  </ng-select>`,
  styleUrls: [ '../../../vendor/libs/ng-select/ng-select.scss']
})
export class DesignationSelectListComponent extends Pagination implements OnInit {

  designationModel:BasicEntry[]=[];
  @Output() onChange = new EventEmitter<BasicEntry>();

  constructor(
    private basicEntryService: BasicEntryService,
  ) {
    super();
   }
  ngOnInit() {
    this.getDesignation();
  }

  onSelect(designation:any){
    if(designation==null){
      this.onChange.emit(new BasicEntry());
      return;
    }
    this.onChange.emit(designation);
  }
  getDesignation() {
    this.basicEntryService.getDesignation().subscribe((response: ApiResponse) => {
      if (response.status) {
        this.designationModel = response.result as BasicEntry[];
        this.sortBy = 'paymentType';
        this.sortDesc = false;
        //this.sort(this.bonusType);
      }
    })
  }
}
