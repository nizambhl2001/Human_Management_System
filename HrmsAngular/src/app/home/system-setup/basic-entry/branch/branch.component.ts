
import { Component, OnInit, ViewChild, Output, EventEmitter } from '@angular/core';


@Component({
  selector: 'app-branch',
  template: `<app-basic-entry [title]="'Branch Setup'" [tableName]="'Branch'" (allItem)="getItems.emit($event)"></app-basic-entry>`,
  styleUrls: ['./branch.component.scss']
})
export class BranchComponent implements OnInit {
 
  @Output() getItems = new EventEmitter<any[]>();
  title="Branch";
  constructor() {}
  
  ngOnInit() {
  }
  }
