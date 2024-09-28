import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-marital-status',
  template: `<app-basic-entry [title]="'MaritalStatus'" [tableName]="'MaritalStatus'" (allItem)="getItems.emit($event)"></app-basic-entry>`,
  styleUrls: ['./marital-status.component.scss']
})
export class MaritalStatusComponent implements OnInit {
  @Output() getItems = new EventEmitter<any[]>();
  constructor() { }
  title="MaritalStatus";
  ngOnInit() {
  }

}
