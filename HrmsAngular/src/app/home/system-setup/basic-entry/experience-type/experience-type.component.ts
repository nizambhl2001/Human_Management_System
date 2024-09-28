import { Component, OnInit, ViewChild, Output, EventEmitter } from '@angular/core';


@Component({
  selector: 'app-experience-type',
  template:`<app-basic-entry [title]="'Experience Type'" [tableName]="'ExperienceType'" (allItem)="getItems.emit($event)"></app-basic-entry>`,
  styleUrls: ['./experience-type.component.scss']
})
export class ExperienceTypeComponent  implements OnInit {
  @Output() getItems = new EventEmitter<any[]>();

 
  title="Experience Type";
  constructor( ) { }

  ngOnInit() {  
  }
}