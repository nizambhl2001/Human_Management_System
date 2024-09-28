import { Component, OnInit, Output, EventEmitter } from '@angular/core';


@Component({
  selector: 'app-signatory',
  template: `<app-basic-entry [title]="'Signatory Setup'" [tableName]="'Signatory'" (allItem)="getItems.emit($event)"></app-basic-entry>`,
  styleUrls: ['./signatory.component.scss']
})
export class SignatoryComponent implements OnInit {

  @Output() getItems = new EventEmitter<any[]>();

  title="Signatory";
  constructor( ) { }
 
  ngOnInit() { }

}