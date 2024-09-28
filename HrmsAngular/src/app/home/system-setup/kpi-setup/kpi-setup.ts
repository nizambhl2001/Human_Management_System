import { Component, OnInit, ViewChild, Output, EventEmitter } from '@angular/core';


@Component({
  selector: 'app-kpi-setup',
  template:`<kpi-basic-entry [title]="'Job Type Setup'" [tableName]="'JobType'" (allItem)="getItems.emit($event)"></kpi-basic-entry>`,
  styleUrls: ['./kpi-setup.component.scss']
})
export class KpiEntrySetup implements OnInit {
  @Output() getItems = new EventEmitter<any[]>();

  title="KPI Setup";
  constructor( ) {  }
 
  ngOnInit() {  }

}
