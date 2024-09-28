import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { NgbDateCustomParserFormatter } from '../../shared/dateformat';


@Component({
  selector: 'app-date-control',
  template: `<div class="input-group" [ngStyle]="{'width.%':widthPercent}">
  <input [(ngModel)]="setNgbDate" name="setNgbDate" (ngModelChange)="onSelectDate()"
  class="form-control" placeholder="dd-mm-yyyy" [minDate]="minDate" [maxDate]="maxDate"
  ngbDatepicker #d1="ngbDatepicker"  [disabled]="disabled">
  <div class="input-group-append">
      <button class="input-group-text" (click)="d1.toggle();" type="button">
        <span class="ion ion-md-calendar" style="cursor: pointer;"></span>
      </button>
  </div>
  </div>`,
  styleUrls: []
})
export class DateControlComponent implements OnInit {
  @Input() witdthPercent:number=100;
  @Input() setNgbDate:any;
  @Input() widthPercent:number=140;
  @Input() showCurrentDate:boolean= true;
  @Input() minDate:NgbDateStruct = {year:1900, month:1, day:1};
  @Input() maxDate:NgbDateStruct = {year:2100, month:12, day:31};
  @Input() setDefault:boolean=false;
  @Input() disabled:boolean = false;
  @Output() getLocalDate = new EventEmitter<any>();
  @Output() getYyyymmdd = new EventEmitter<any>();
  @Output() getNgbDate = new EventEmitter<any>();
  pageId:number = 0;

  constructor(
    private dateFormat:NgbDateCustomParserFormatter
  ) { }
  ngOnInit() {
    if(this.setDefault){
      this.setNgbDate = this.dateFormat.getCurrentNgbDate();
       this.getLocalDate.emit(this.dateFormat.ngbDateToDate(this.setNgbDate).toLocaleDateString());
       this.getYyyymmdd.emit(this.dateFormat.getNgbDateToYyyymmdd(this.setNgbDate));
    }

    // if(this.showCurrentDate){
    //   this.setNgbDate = this.dateFormat.getCurrentNgbDate();
    //   let yyyymmdd = this.dateFormat.getNgbDateToYyyymmdd(this.setNgbDate);
    //   let localDate = new Date();
    //   let localDateStr = `${localDate.getMonth()+1}/${localDate.getDate()}/${localDate.getFullYear()}`;
    //   this.getLocalDate.emit(localDateStr);
    // }

  }

  onSelectDate(){
    if(this.setNgbDate==null){return;}
    let yyyymmdd = this.dateFormat.getNgbDateToYyyymmdd(this.setNgbDate);
    let localDate = this.dateFormat.ngbDateToDate(this.setNgbDate).toLocaleDateString();
    this.getYyyymmdd.emit(yyyymmdd);
    this.getLocalDate.emit(localDate);
    this.getNgbDate.emit(this.setNgbDate)




  }

}
