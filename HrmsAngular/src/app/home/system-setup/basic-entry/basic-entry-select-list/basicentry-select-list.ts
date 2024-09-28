import { Component, OnInit, Output, EventEmitter, Input, OnChanges, SimpleChanges } from '@angular/core';

import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Pagination } from '../../../../shared/paginate';
import { BasicEntry } from '../../../../models/system-setup/basic-entry.model';
import { BasicEntryService } from '../../../../services/system-setup/basic-entry.service';
import { ApiResponse } from '../../../../models/response.model';

 @Component({
  selector: 'app-basic-entry-select-list',
  template:`<div class="input-group ">
  <ng-select [ngStyle]="{'width.%':85}"
  [ngClass]="{'is-invalid': isRequired}"
  [(ngModel)]="itemId"
  name = "itemId"
  (change)="onSelect($event)"
  [items]="allItem"
  bindLabel="description"
  bindValue="id"
  placeholder="Select {{tableName}}">
  </ng-select>
  <div *ngIf="isPlusIconHide==false" class="input-group-append">
  <button  (click)="createNewItem()" class="input-group-text btn btn-info"
   type="button">
    <span class="fa fa-plus" style="cursor: pointer;"></span>
    </button>
  </div>
  </div>`,
  styleUrls: ['../../../../../vendor/libs/ng-select/ng-select.scss']
})
export class BasicEntrySelectListComponent extends Pagination implements OnInit, OnChanges {

  compId:number;
  @Input() colSize:string;
  @Input() isRequired:boolean=false;
  @Input() tableName:string;
  @Input() modalName:any;
  @Input() isItemLoad:boolean=true;
  @Input() isPlusIconHide:boolean=false;
  @Input() allItem: BasicEntry[] = [];
  @Input() itemId:number;
  @Output() onChange = new EventEmitter<BasicEntry>();

  constructor(
    private basicEntryService: BasicEntryService,
    private modalService:NgbModal
  ) {
    super();
  }
   ngOnChanges(changes: SimpleChanges): void {
     if(changes && changes['itemId']){
       this.itemId = changes['itemId'].currentValue;
     }
   }
  ngOnInit() {
    this.compId = 1;
    if(this.isItemLoad==true){
      this.getAllBasicItems();
    }

  }

  onSelect(item: any) {
    if (item == null) {
      this.onChange.emit(new BasicEntry());
      return;
    }
    this.onChange.emit(item);
  }
  getAllBasicItems() {
    this.basicEntryService.getAllBasicItems(this.tableName, this.compId).subscribe((response: ApiResponse) => {
      if (response.status) {
        this.allItem = response.result as BasicEntry[];
        this.sortBy = 'description';
        this.sortDesc = false;
        this.sort(this.allItem);
      }
    })
  }
  createNewItem(){
    this.modalService.open(this.modalName,{size:'lg'})
  }
}
