import { Component, OnInit, Output, EventEmitter } from '@angular/core';


@Component({
  selector: 'app-suffix',
  template: `<app-basic-entry [title]="'Suffix Setup'" [tableName]="'Suffix'" (allItem)="getItems.emit($event)"></app-basic-entry>`,
  styleUrls: ['./suffix.component.scss']
})
export class SuffixComponent implements OnInit {

  @Output() getItems = new EventEmitter<any[]>();

  title="Suffix";
  constructor() { }
  
  ngOnInit() { }

}