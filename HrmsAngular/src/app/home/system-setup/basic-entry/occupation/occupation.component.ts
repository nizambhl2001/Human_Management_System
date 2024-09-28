import { Component, OnInit, ViewChild, Output, EventEmitter } from '@angular/core';


@Component({
  selector: 'app-occupation',
  template: `<app-basic-entry [title]="'Occupation Setup'" [tableName]="'Occupation'" (allItem)="getItems.emit($event)"></app-basic-entry>`,
  styleUrls: ['./occupation.component.scss']
})
export class OccupationComponent implements OnInit {

  @Output() getItems = new EventEmitter<any[]>();


  title="Occupation";
  constructor( ) { }
 
  ngOnInit() { }

}