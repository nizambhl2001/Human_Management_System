import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChange, SimpleChanges } from '@angular/core';
import { ApiResponse } from '../../models/response.model';
import { SalaryGradePayScale } from '../../models/salary-process/salary-grade-pay-scale.model';
import { SalaryProcessService } from '../../services/salary-process/salary-process-service.service';

@Component({
  selector: 'app-payscale-select-list',
  template: `
  <ng-select
  [(ngModel)]="payScaleId"
   [placeholder]="placeholder"
   (change)="onChange($event)"
   [items]="allPayScaleList"
   bindLabel="gradeName"
   [disabled]= "isDisabled"
   [ngClass]="{'is-invalid':isInValid}"
   bindValue="id">
               </ng-select>`
})
export class PayscaleSelectListComponent implements OnInit, OnChanges {

  allPayScaleList:SalaryGradePayScale[]=[];
  @Input() gradeName:string;
  @Input() payScaleId:number;
  @Input() isDisabled:boolean = false;
  @Input() placeholder:string = 'Select PayScale';
  @Input() isInValid:boolean = false;
  @Output() onSelect = new EventEmitter<SalaryGradePayScale>();
  constructor(
    private salaryProcessService:SalaryProcessService,) { }

  ngOnChanges(simpleChanges:SimpleChanges){
    this.getPayScaleList(this.gradeName);
  }
  ngOnInit() {
    if(this.gradeName){
      this.getPayScaleList(this.gradeName);
    }
  }

  getPayScaleList(gradeName:string){
    this.salaryProcessService.payScaleList(gradeName).subscribe((response:ApiResponse)=>{
      if(response.status){
        this.allPayScaleList= response.result as SalaryGradePayScale[];

      }
    });
  }
  onChange(payScale){
    if(payScale!=null){
      this.onSelect.emit(payScale)
    }else{
      this.onSelect.emit(new SalaryGradePayScale())
    }
  }
}
