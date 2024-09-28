import { Component, OnInit, Output, EventEmitter } from '@angular/core';


@Component({
  selector: 'app-misconduct',
  template:`<app-basic-entry [title]="'Misconduct Setup'" [tableName]="'ShowcauseRules'" (allItem)="getItems.emit($event)"></app-basic-entry>`,
  styleUrls: ['./misconduct.component.scss']
})
export class MisconductComponent implements OnInit {

  @Output() getItems = new EventEmitter<any[]>();

  title="Misconduct";
  constructor( ) { }
  
  ngOnInit() { }

}