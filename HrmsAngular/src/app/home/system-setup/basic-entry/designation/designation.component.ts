import { Component, OnInit, ViewChild, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-designation',
  template:`<app-basic-entry [title]="'Designation Setup'" [tableName]="'Designation'" (allItem)="getItems.emit($event)"></app-basic-entry>`,
  styleUrls: ['./designation.component.scss']
})
export class DesignationComponent   implements OnInit {

  @Output() getItems = new EventEmitter<any[]>();

  title="Designation";
  constructor( ) {   }
  
  ngOnInit() {  }
  
}
