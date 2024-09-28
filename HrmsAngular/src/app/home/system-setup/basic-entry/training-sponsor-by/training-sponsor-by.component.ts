import { Component, OnInit,Output, EventEmitter } from '@angular/core';


@Component({
  selector: 'app-training-sponsor-by',
  template: `<app-basic-entry [title]="'Training Sponsor Type Setup'" [tableName]="'TrainingSponsorType'" (allItem)="getItems.emit($event)"></app-basic-entry>`,
  styleUrls: ['./training-sponsor-by.component.scss']
})
export class TrainingSponsorByComponent implements OnInit {
  @Output() getItems = new EventEmitter<any[]>();

  title="Training Sponsor BY";
  constructor() { }
 
  ngOnInit() { }

}