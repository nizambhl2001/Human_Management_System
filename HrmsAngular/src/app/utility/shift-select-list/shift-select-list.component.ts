import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { ShiftSetupModel } from '../../models/Attendance/shiftsetupModel';
import { ApiResponse } from '../../models/response.model';
import { AttendenceService } from '../../services/Attendance/attendence.service';
import { Pagination } from '../../shared/paginate';

@Component({
  selector: 'app-shift-select-list',
  template:`<ng-select
  [ngStyle]="{'width.%':widthPercent}"
  [(ngModel)]="setShiftId"
  (change)="onSelect($event)"
  [items]="allShift"
  bindLabel="shfitName"
  bindValue="id"
  [ngClass]="{'is-invalid':isInvalid}"
  placeholder="Select Shift">
  </ng-select>`,
  styleUrls: [ '../../../vendor/libs/ng-select/ng-select.scss']
})
export class ShiftSelectListComponent extends Pagination implements OnInit {


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
    this.getAllShift();
  }
  onSelect(shift:any){
    if(shift==null){
      this.onChange.emit(new ShiftSetupModel());
      return;
    }
    this.onChange.emit(shift);
  }
  getAllShift() {
    this.attService.GetshiftAll().subscribe((response: ApiResponse) => {
      if (response.status) {
        this.allShift = response.result as ShiftSetupModel[];
        this.sortBy = 'shfitName';
        this.sortDesc = false;
        this.sort(this.allShift);
      }
    })
  }

}
