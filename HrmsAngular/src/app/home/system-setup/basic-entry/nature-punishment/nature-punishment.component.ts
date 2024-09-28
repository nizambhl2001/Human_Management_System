import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-nature-punishment',
  template:`<app-basic-entry [title]="'Nature os Punishment'" [tableName]="'Action'" (allItem)="getItems.emit($event)"></app-basic-entry>`,
  styleUrls: ['./nature-punishment.component.scss']
})
export class NaturePunishmentComponent implements OnInit {
  @Output() getItems = new EventEmitter<any[]>();
  title="Nature os Punishment";
  constructor() { }

  ngOnInit() {
  }

}
