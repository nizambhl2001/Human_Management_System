import { Component, OnInit, ViewChild, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-nationality',
  template:`<app-basic-entry [title]="'Nationality Setup'" [tableName]="'Nationality'" (allItem)="getItems.emit($event)"></app-basic-entry>`,
  styleUrls: ['./nationality.component.scss',]
})
export class NationalityComponent implements OnInit {
  @Output() getItems = new EventEmitter<any[]>();

  title="Nationality";
  constructor() { }
  
  ngOnInit() { }
 
}
