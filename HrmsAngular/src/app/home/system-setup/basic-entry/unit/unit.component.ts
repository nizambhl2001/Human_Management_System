import { Component, OnInit,Output, EventEmitter } from '@angular/core';


@Component({
  selector: 'app-unit',
  template: `<app-basic-entry [title]="'Unit Setup'" [tableName]="'AreaorUnit'" (allItem)="getItems.emit($event)"></app-basic-entry>`,
  styleUrls: ['./unit.component.scss']
})
export class UnitComponent implements OnInit {
  @Output() getItems = new EventEmitter<any[]>();

  title="Unit";
  constructor() {}
 
  ngOnInit() {}

}