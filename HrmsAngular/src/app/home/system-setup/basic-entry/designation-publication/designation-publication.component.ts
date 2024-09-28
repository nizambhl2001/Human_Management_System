import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-designation-publication',
  template: `<app-basic-entry [title]="'Designation Publication'" [tableName]="'DesignationPublication'" (allItem)="getItems.emit($event)"></app-basic-entry>`,
  styleUrls: ['./designation-publication.component.scss']
})
export class DesignationPublicationComponent implements OnInit {
  @Output() getItems = new EventEmitter<any[]>();

  title="Designation Publication";
  constructor() { }

  ngOnInit() {
  }

}
