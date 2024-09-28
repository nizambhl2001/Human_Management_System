import { Component, OnInit, Output, EventEmitter } from '@angular/core';


@Component({
  selector: 'app-basic-punishment',
  template: `<app-basic-entry [title]="'Nature Of Punishment Setup'" [tableName]="'NatureOfPunishment'" (allItem)="getItems.emit($event)"></app-basic-entry>`,
  styleUrls: ['./punishment.component.scss']
})
export class PunishmentComponent implements OnInit {
  @Output() getItems = new EventEmitter<any[]>();

  title="Punishment";
  constructor() {}
 
  ngOnInit() {}

}