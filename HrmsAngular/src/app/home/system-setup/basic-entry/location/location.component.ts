import { Component, OnInit,  Output, EventEmitter } from '@angular/core';


@Component({
  selector: 'app-location',
  template:`<app-basic-entry [title]="'Location Setup'" [tableName]="'Location'" (allItem)="getItems.emit($event)"></app-basic-entry>`,
  styleUrls: ['./location.component.scss']
})
export class LocationComponent implements OnInit {

  @Output() getItems = new EventEmitter<any[]>();

  title="Location";
  constructor() {}
  ngOnInit() {}
}

