import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { BasicEntry } from '../../../../models/system-setup/basic-entry.model';


@Component({
  selector: 'app-gender',
  template:`<app-basic-entry [title]="'Gender Setup'" [tableName]="'Gender'" (allItem)="getAllItem($event)" [showCloseBtn]="showCloseBtn"></app-basic-entry>`,
  styleUrls: ['./gender.component.scss']
})
export class GenderComponent implements OnInit {
  @Input() showCloseBtn:boolean = false;
  @Output() getItems = new EventEmitter<any[]>();
  title="Gender";
  
  constructor( ) {}
  ngOnInit() {}
  
  getAllItem(items:BasicEntry[]){
    this.getItems.emit(items);
  }
  
}


