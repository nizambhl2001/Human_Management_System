import { Component, OnInit, Output, EventEmitter } from '@angular/core';


@Component({
  selector: 'app-institute',
  template:`<app-basic-entry [title]="'Institute Setup'" [tableName]="'Institute'" (allItem)="getItems.emit($event)"></app-basic-entry>`,
  styleUrls: ['./institute.component.scss']
})
export class InstituteComponent implements OnInit {

  @Output() getItems = new EventEmitter<any[]>();

  title="Institute";
  constructor( ) { }
 
  ngOnInit() { }

}
