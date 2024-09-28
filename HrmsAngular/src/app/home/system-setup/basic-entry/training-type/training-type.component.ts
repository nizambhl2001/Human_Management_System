import { Component, OnInit, Output, EventEmitter } from '@angular/core';


@Component({
  selector: 'app-training-type',
  template: `<app-basic-entry [title]="'Training Type Setup'" [tableName]="'TrainingType'" (allItem)="getItems.emit($event)"></app-basic-entry>`,
  styleUrls: ['./training-type.component.scss']
})
export class TrainingTypeComponent implements OnInit {

  @Output() getItems = new EventEmitter<any[]>();

  title="Training Type";
  constructor( ) { }
  
  ngOnInit() { }

}