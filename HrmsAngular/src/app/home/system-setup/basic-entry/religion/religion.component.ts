import { Component, OnInit,Output, EventEmitter } from '@angular/core';


@Component({
  selector: 'app-religion',
  template: `<app-basic-entry [title]="'Religion Setup'" [tableName]="'Religion'" (allItem)="getItems.emit($event)"></app-basic-entry>`,
  styleUrls: ['./religion.component.scss']
})
export class ReligionComponent implements OnInit {

  @Output() getItems = new EventEmitter<any[]>();

  title="Religion";
  constructor() { }
 
  ngOnInit() {}

}