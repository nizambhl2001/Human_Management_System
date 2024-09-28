import { Component, OnInit, ViewChild, Output, EventEmitter } from '@angular/core';


@Component({
  selector: 'app-education-level',
  template:`<app-basic-entry [title]="'Education Level'" [tableName]="'EducationLevel'" (allItem)="getItems.emit($event)"></app-basic-entry>`,
  styleUrls: ['./education-level.component.scss']
})
export class EducationLevelComponent implements OnInit {

  @Output() getItems = new EventEmitter<any[]>();

  title="Education Level";
  constructor(  ) {  }
 
  ngOnInit() {  }
}