import { Component, OnInit, ViewChild, Output, EventEmitter } from '@angular/core';


@Component({
  selector: 'app-blood-group',
  template: `<app-basic-entry [title]="'Blood Group Setup'" [tableName]="'BloodGroup'" (allItem)="getItems.emit($event)"></app-basic-entry>`,
  styleUrls: ['./blood-group.component.scss']
})
export class BloodGroupComponent implements OnInit {
  @Output() getItems = new EventEmitter<any[]>();
  title="Blood Group";

  constructor(){}
  ngOnInit() {
    
  }
}
