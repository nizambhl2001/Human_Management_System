import { Thana } from './../../models/system-setup/thana.model';
import { Component, OnInit, Output, EventEmitter, Input, OnChanges, SimpleChanges } from '@angular/core';
import { Pagination } from '../../shared/paginate';
import { BasicEntry } from '../../models/system-setup/basic-entry.model';
import { BasicEntryService } from '../../services/system-setup/basic-entry.service';
import { ApiResponse } from '../../models/response.model';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-thana-select-list',
  template: `
  <div class="input-group">
  <ng-select
  [(ngModel)]="setThanaId" [ngStyle]="{'width.%':85}"
  name="setThanaId"
  (change)="onSelect($event)"
  [items]="_thana"
  bindLabel="thanaName"
  bindValue="thanaID"
  placeholder="Select Thana">
  </ng-select>
  <div class="input-group-append">
    <button (click)="modalService.open(thanaModal,{size:'lg'})" class="btn btn-info input-group-text">
      <span class="fa fa-plus"></span>
    </button>
  </div>
    </div>
  `,
  styleUrls: ['../../../vendor/libs/ng-select/ng-select.scss']
})
export class ThanaSelectListComponent extends Pagination implements OnInit, OnChanges {

  _thana: Thana[] = [];
  @Input() upazilaId: number = -1;
  @Input() thanaModal: any;
  @Input() setThanaId: number;
  @Output() onChange = new EventEmitter<Thana>();

  constructor(
    private basicService: BasicEntryService,
    public modalService:NgbModal
  ) {
    super();
  }
  ngOnChanges(changes: SimpleChanges): void {
    this.getThana();
  }
  ngOnInit() {
    this.getThana();
  }

  onSelect(bank: any) {
    if (bank == null) {
      this.onChange.emit(new Thana());
      return;
    }
    this.onChange.emit(bank);
  }
  getThana() {
    if(this.upazilaId==null){
      return;
    }
    this.basicService.getThana(this.upazilaId).subscribe((response: ApiResponse) => {
      if (response.status) {
        this._thana = response.result as Thana[];
        this.sortBy = 'thanaName';
        this.sortDesc = false;
        this.sort(this._thana);
      }
    })
  }
}
