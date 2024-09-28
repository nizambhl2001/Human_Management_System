import { Component, OnInit, Output, EventEmitter } from '@angular/core';


@Component({
  selector: 'app-publication-type',
  template: `<app-basic-entry [title]="'PublicationType Setup'" [tableName]="'PublicationType'" (allItem)="getItems.emit($event)"></app-basic-entry>`,
  styleUrls: ['./publication-type.component.scss']
})
export class PublicationTypeComponent implements OnInit {
  @Output() getItems = new EventEmitter<any[]>();

  title="PublicationType";
  constructor( ) { }
 
  ngOnInit() { }


 
}