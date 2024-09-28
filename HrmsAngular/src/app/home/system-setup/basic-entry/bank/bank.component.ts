
import { Component, OnInit, Output, EventEmitter } from '@angular/core';


@Component({
  selector: 'app-bank',
  template: `<app-basic-entry [title]="'Bank Setup'" [tableName]="'Bank'" (allItem)="getItems.emit($event)"></app-basic-entry>`,
  styleUrls: ['./bank.component.scss']
})
export class BankComponent implements OnInit {

  @Output() getItems = new EventEmitter<any[]>();
  constructor() {
  }
  title="Bank";
  ngOnInit() {
  }

  
}
