import { Component, OnInit, Output, EventEmitter } from '@angular/core';


@Component({
  selector: 'app-training-country',
  template: `<app-basic-entry [title]="'TrainingCountry Setup'" [tableName]="'TrainingCountry'" (allItem)="getItems.emit($event)"></app-basic-entry>`,
  styleUrls: ['./training-country.component.scss']
})
export class TrainingCountryComponent implements OnInit {
  @Output() getItems = new EventEmitter<any[]>();

  title="Training Country";
  constructor() { }
 
  ngOnInit() { }

}
