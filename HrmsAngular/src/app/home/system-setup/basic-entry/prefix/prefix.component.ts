import { Component, OnInit, Output, EventEmitter } from '@angular/core';


@Component({
  selector: 'app-prefix',
  template: `<app-basic-entry [title]="'Prefix Setup'" [tableName]="'Prefix'" (allItem)="getItems.emit($event)"></app-basic-entry>`,
  styleUrls: ['./prefix.component.scss']
})
export class PrefixComponent implements OnInit {

  @Output() getItems = new EventEmitter<any[]>();
  title="Prefix";
  constructor( ) { }

  ngOnInit() { }

}
