
import { Component, OnInit, Output, EventEmitter } from '@angular/core';


@Component({
  selector: 'app-country',
  template: `<app-basic-entry [title]="'Country Setup'" [tableName]="'Country'" (allItem)="getItems.emit($event)"></app-basic-entry>`,
  styleUrls: ['./country.component.scss']
})
export class CountryComponent implements OnInit {
  @Output() getItems = new EventEmitter<any[]>();
  constructor() {
   
  }
 
  ngOnInit() {
   
  }


}