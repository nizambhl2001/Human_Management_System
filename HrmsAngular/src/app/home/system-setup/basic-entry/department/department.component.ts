
import { Component, OnInit, ViewChild, Output, EventEmitter } from '@angular/core';


@Component({
  selector: 'app-department',
  template: `<app-basic-entry [title]="'Department Setup'" [tableName]="'Department'" (allItem)="getItems.emit($event)"></app-basic-entry>`,
    styleUrls: [
    './department.component.scss']
})
export class DepartmentComponent implements OnInit {


  @Output() getItems = new EventEmitter<any[]>();
  constructor() {
  }
  title="Department";
  ngOnInit() {
  }

  }
