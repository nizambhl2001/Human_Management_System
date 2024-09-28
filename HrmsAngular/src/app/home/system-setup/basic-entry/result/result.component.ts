import { Component, OnInit, Output, EventEmitter } from '@angular/core';


@Component({
  selector: 'app-result',
  template: `<app-basic-entry [title]="'Result Setup'" [tableName]="'Result'" (allItem)="getItems.emit($event)"></app-basic-entry>`,
  styleUrls: ['./result.component.scss','../../../../../vendor/libs/ng-select/ng-select.scss']
})
export class ResultComponent implements OnInit {

  @Output() getItems = new EventEmitter<any[]>();

  title="Result";
  constructor() { }
 
  ngOnInit() { }

}