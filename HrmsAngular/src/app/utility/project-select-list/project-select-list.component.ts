import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { Pagination } from '../../shared/paginate';
import { BasicEntry } from '../../models/system-setup/basic-entry.model';
import { BasicEntryService } from '../../services/system-setup/basic-entry.service';
import { ApiResponse } from '../../models/response.model';

@Component({
  selector: 'app-project-select-list',
  template: `<ng-select
  [(ngModel)]="setProjectId"
  name="setProjectId"
  (change)="onSelect($event)"
  [items]="_projects"
  bindLabel="description"
  bindValue="id"
  placeholder="Select Location">
  </ng-select>`,
  styleUrls: ['../../../vendor/libs/ng-select/ng-select.scss']
})
export class ProjectSelectListComponent extends Pagination implements OnInit {

  _projects:BasicEntry[]=[];
  @Input() setProjectId:any;
  @Output() onChange = new EventEmitter<BasicEntry>();
  
  constructor(
    private basicService:BasicEntryService
  ) {
    super();
   }
  ngOnInit() {
    this.getProject();
  }
  onSelect(proj:any){
    if(proj==null){
      this.onChange.emit(new BasicEntry());
      return;
    }
    this.onChange.emit(proj);
  }
  getProject() {
    this.basicService.getProject().subscribe((response: ApiResponse) => {
      if (response.status) {
        this._projects = response.result as BasicEntry[];
        this.sortBy = 'description';
        this.sortDesc = false;
        this.sort(this._projects);
      }
    })
  }
}
