import { Pagination } from './../../shared/paginate';
import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { EmpTypeService } from '../../services/system-setup/EmpType.service';
import { EmpTypeModel } from '../../models/system-setup/EmpType.model';
import { ApiResponse } from '../../models/response.model';

@Component({
  selector: 'app-employee-type-list',
  template: `<ng-select [(ngModel)]="empTypeModel" [ngClass]="{'is-invalid': isRequired}"
  name="empTypeModel"
  (change)="onSelect($event)"
  [items]="_Employees"
  bindLabel="gradeName"
  bindValue="gradeID"
  placeholder="Select Emplopyee Type">
  </ng-select>`,
  styleUrls: ['../../../vendor/libs/ng-select/ng-select.scss']
})

export class EmployeeTypeListComponent extends Pagination implements OnInit {

  _Employees:EmpTypeModel[]=[];
  @Input() empTypeModel:any;
  @Input() isRequired:boolean=false;
  @Output() onChange=new EventEmitter<EmpTypeModel>();


  constructor(
    private employeetypeService:EmpTypeService
  ) {
    super();
  }

  ngOnInit() {
    this.getEmployeeType();
  }
onSelect(empType:any){
  if(empType==null){
    this.onChange.emit(new EmpTypeModel());
    return;
  }
  this.onChange.emit(empType);
}
getEmployeeType(){
  this.employeetypeService.GetEmpType().subscribe((response:ApiResponse)=>{
    if(response.status){
      this._Employees=response.result as  EmpTypeModel[];
      this.sortBy='gradeName';
      this.sortDesc=false;
      this.sort(this._Employees);
    }
  })
}

}
