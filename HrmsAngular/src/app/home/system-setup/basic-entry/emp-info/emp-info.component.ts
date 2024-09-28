import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Pagination } from '../../../../shared/paginate';

@Component({
  selector: 'app-emp-info',
  template: `
  <app-basic-entry [title]="'Employee Basic Info Entry'" [tableName]="''" (allItem)="getItems.emit($event)"></app-basic-entry>
  `,
  styleUrls: ['./emp-info.component.scss']
})
export class EmpInfoComponent extends Pagination implements OnInit {

  @Output() getItems = new EventEmitter<any[]>();
  constructor() {
    super();
  }
  title="Employee Basic Info Entry";
 
  ngOnInit() {
  }

}
