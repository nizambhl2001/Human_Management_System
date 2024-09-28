import { Pagination } from '../../shared/paginate';
import { BasicEntry } from '../../models/system-setup/basic-entry.model';
import { Component, OnInit, EventEmitter, Output, Input } from '@angular/core';
import { BasicEntryService } from '../../services/system-setup/basic-entry.service';
import { ApiResponse } from '../../models/response.model';

@Component({
  selector: 'app-department-select-list',
  template: `<ng-select
  [(ngModel)]="setDeptId"
  name="setDeptId"
  (change)="onSelect($event)"
  [items]="_departments"
  bindLabel="description"
  bindValue="id"
  placeholder="Select Department"
  [disabled]="disabled">
  </ng-select>`,
  styleUrls: ['../../../vendor/libs/ng-select/ng-select.scss']
})
export class DepartmentSelectListComponent extends Pagination implements OnInit {

  _departments:BasicEntry[]=[];
  @Input() setDeptId:any;
  @Input() disabled:boolean = false;
  @Output() onChange = new EventEmitter<BasicEntry>();

  constructor(
    private basicService:BasicEntryService
  ) {
    super();
   }
  ngOnInit() {
    this.getDepartments();
  }

  onSelect(dept:any){
    if(dept==null){
      this.onChange.emit(new BasicEntry());
      return;
    }
    this.onChange.emit(dept);
  }
  getDepartments() {
    this.basicService.getDepartment().subscribe((response: ApiResponse) => {
      if (response.status) {
        this._departments = response.result as BasicEntry[];
        console.log("this._departments",this._departments)
        this.sortBy = 'description';
        this.sortDesc = false;
        this.sort(this._departments);
      }
    })
  }
}
