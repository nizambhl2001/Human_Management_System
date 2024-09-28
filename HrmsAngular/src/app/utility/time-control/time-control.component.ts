import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { NgbDateStruct, NgbTimeStruct } from '@ng-bootstrap/ng-bootstrap';
import { NgbDateCustomParserFormatter } from '../../shared/dateformat';

@Component({
  selector: 'app-time-control',
  template: `<ngb-timepicker [(ngModel)]="ngbTime" name="ngbTime" (ngModelChange)="onSelectTime()"  [seconds]="true" [secondStep]="10" [meridian]="false"></ngb-timepicker>`,
  styleUrls: []
})
export class TimeControlComponent implements OnInit {

  
  @Output() getTimeString = new EventEmitter<string>();
  @Output() getTimeObj = new EventEmitter<NgbTimeStruct>();

  @Input() ngbTime:NgbTimeStruct ={hour:0,minute:0,second:0};
  constructor(
  ) { }
  ngOnInit() {
  }

  onSelectTime(){
    if(this.ngbTime==null){
      return;
    }
    let time = this.ngbTime;
    let hhmmss = time.hour+':'+time.minute+':'+time.second;
    this.getTimeString.emit(hhmmss);
    this.getTimeObj.emit(time);
  }



}