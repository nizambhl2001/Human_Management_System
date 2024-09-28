import { Component, OnInit, Output, EventEmitter } from '@angular/core';


@Component({
  selector: 'app-passing-year',
  template: `<app-basic-entry [title]="'Passing Year Setup'"[descriptionFieldNumber]="true"  [tableName]="'PassingYear'" (allItem)="getItems.emit($event)"></app-basic-entry>`,
  styleUrls: ['./passing-year.component.scss']
})
export class PassingYearComponent implements OnInit {

  @Output() getItems = new EventEmitter<any[]>();
  //@Output() descriptionFieldNumber:boolean=true;

  title="Passing Year";
  constructor() { }

  ngOnInit() { }

}