import { Component, OnInit, ViewChild, Output, EventEmitter } from '@angular/core';


@Component({
  selector: 'app-job-type',
  template:`<app-basic-entry  [title]="'Job Type Setup'" [tableName]="'JobType'" (allItem)="getItems.emit($event)"></app-basic-entry>`,
  styleUrls: ['./job-type.component.scss']
})
export class JobTypeComponent implements OnInit {
  @Output() getItems = new EventEmitter<any[]>();

  title="Job Type";
  constructor( ) {  }
 
  ngOnInit() {  }

}
