import { Component, OnInit, Output, EventEmitter } from '@angular/core';


@Component({
  selector: 'app-project',
  template: `<app-basic-entry [title]="'Project Setup'" [tableName]="'Project'" (allItem)="getItems.emit($event)"></app-basic-entry>`,
  styleUrls: ['./project.component.scss']
})
export class ProjectComponent implements OnInit {

  @Output() getItems = new EventEmitter<any[]>();

  title="Project";
  constructor( ) { }
  
  ngOnInit() { }

}