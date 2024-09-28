import { Component, OnInit, Output, EventEmitter } from '@angular/core';


@Component({
  selector: 'app-department-gl',
  template: `<app-basic-entry [title]="'DepartmentGL Setup'" [tableName]="'DepartmentGL'" (allItem)="getItems.emit($event)"></app-basic-entry>`,
  styleUrls: ['./department-gl.component.scss']
})
export class DepartmentGlComponent  implements OnInit {
  
  @Output() getItems = new EventEmitter<any[]>();

  title="DepartmentGL";
  constructor() {
    
  }


  ngOnInit() {
  }
  
}