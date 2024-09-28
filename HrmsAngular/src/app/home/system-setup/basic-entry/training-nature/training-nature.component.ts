import { Component, OnInit,Output, EventEmitter } from '@angular/core';


@Component({
  selector: 'app-training-nature',
  template: `<app-basic-entry [title]="'TrainingNature Setup'" [tableName]="'TrainingNature'" (allItem)="getItems.emit($event)"></app-basic-entry>`,
  styleUrls: ['./training-nature.component.scss']
})
export class TrainingNatureComponent implements OnInit {

  @Output() getItems = new EventEmitter<any[]>();

  title="Training Nature";
  constructor( ) { }
  
  ngOnInit() { }


}