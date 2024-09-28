import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { ShiftSetupModel } from '../../models/Attendance/shiftsetupModel';
import { ApiResponse } from '../../models/response.model';
import { AttendenceService } from '../../services/Attendance/attendence.service';
import { Pagination } from '../../shared/paginate';

@Component({
  selector: 'app-weekend-select-list',
  template:`<ng-select
  [ngStyle]="{'width.%':widthPercent}"
  [(ngModel)]="setShiftId"
  (change)="onSelect($event)"
  [items]="lstdayName"
  bindLabel="dayName"
  bindValue="dayName"
  placeholder="Select Weekend">
  </ng-select>`,
  styleUrls: [ '../../../vendor/libs/ng-select/ng-select.scss']
})
export class WeekendSelectListComponent extends Pagination implements OnInit {

  lstdayName:any[]=[
    { dayName:'Saturday', id:8},
    { dayName:'Sunday', id:9},
    { dayName:'Monday', id:10},
    { dayName:'Tuesday', id:11},
    { dayName:'Wednesday', id:12},
    { dayName:'Thursday', id:13},
    { dayName:'Friday', id:14}
    ];

  allShift:ShiftSetupModel[]=[];
  @Input() isInvalid:boolean = false;
  @Input() setShiftId:number;
  @Input() widthPercent:number=100;
  @Output() onChange = new EventEmitter<ShiftSetupModel>();
  constructor(
    private attService:AttendenceService
  ) {
    super();
   }
  ngOnInit() {
    // this.getAllShift();

  }
  onSelect(weekend:any){
    console.log("weekend",weekend);
    if(weekend==null){
      this.onChange.emit(new ShiftSetupModel());
      return;
    }
    this.onChange.emit(weekend);
  }
  // getAllShift() {
  //   this.attService.GetshiftAll().subscribe((response: ApiResponse) => {
  //     if (response.status) {
  //       this.allShift = response.result as ShiftSetupModel[];
  //       this.sortBy = 'shfitName';
  //       this.sortDesc = false;
  //       this.sort(this.allShift);
  //     }
  //   })
  // }

}
