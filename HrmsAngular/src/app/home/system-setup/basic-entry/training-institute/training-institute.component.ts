import { Component, OnInit,Output, EventEmitter } from '@angular/core';


@Component({
  selector: 'app-training-institute',
  template: `<app-basic-entry [title]="'Training Institution Setup'" [tableName]="'TrainingInstitution'" (allItem)="getItems.emit($event)"></app-basic-entry>`,
  styleUrls: ['./training-institute.component.scss']
})
export class TrainingInstituteComponent implements OnInit {
  @Output() getItems = new EventEmitter<any[]>();
  
  title="Training Institution";
  constructor( ) {  }
  
  ngOnInit() { }

}