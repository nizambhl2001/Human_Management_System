import { Component, OnInit, ViewChild, Output, EventEmitter } from '@angular/core';


@Component({
  selector: 'app-education-board',
  template:`<app-basic-entry [title]="'Education Board'" [tableName]="'EducationBoard'" (allItem)="getItems.emit($event)"></app-basic-entry>`,
  styleUrls: ['./education-board.component.scss',]
})
export class EducationBoardComponent  implements OnInit {

  @Output() getItems = new EventEmitter<any[]>();

  title="Education Board";
  constructor(  ) {  }
 
  ngOnInit() {   
  }

 
}