import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-overtime-reason',
  template: `<app-basic-entry [title]="'Overtime Reason'" [tableName]="'OvertimeReason'" (allItem)="getItems.emit($event)"></app-basic-entry>`,
  styleUrls: ['./overtime-reason.component.scss']
})
export class OvertimeReasonComponent implements OnInit {
  @Output() getItems = new EventEmitter<any[]>();
  title="Overtime Reason";
  constructor() { }

  ngOnInit() {
  }

}
