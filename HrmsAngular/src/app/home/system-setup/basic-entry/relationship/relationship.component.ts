import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-relationship',
  template: `<app-basic-entry [title]="'Relationship'" [tableName]="'Relationship'" (allItem)="getItems.emit($event)"></app-basic-entry>`,
  styleUrls: ['./relationship.component.scss']
})
export class RelationshipComponent implements OnInit {
  @Output() getItems = new EventEmitter<any[]>();
  constructor() { }
  title="Relationship";

  ngOnInit() {
  }

}
