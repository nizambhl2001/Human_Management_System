import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ApiResponse } from '../../models/response.model';
import { BasicEntry } from '../../models/system-setup/basic-entry.model';
import { AuthService } from '../../services/auth.service';
import { BasicEntryService } from '../../services/system-setup/basic-entry.service';

@Component({
  selector: 'app-document-type-select-list',
  template: `<ng-select
  [(ngModel)]="setDocumentTypeId" #field="ngModel"
  name="setDeptId"
  (change)="onSelect($event)"
  [items]="_departments"
  bindLabel="description"
  bindValue="id"
  [ngClass]="{'is-invalid':isInvalid && (field.dirty || field.touched)}"
  placeholder="Select Document Type"
  [disabled]="disabled">
  </ng-select>
  <div *ngIf="isInvalid && (field.dirty || field.touched)">
    <span class="text-danger">Document type is required</span>
  </div>`,
  styleUrls: ['../../../vendor/libs/ng-select/ng-select.scss']
})
export class DocumentTypeSelectListComponent implements OnInit {

  _departments:BasicEntry[]=[];
  @Input() setDocumentTypeId:any;
  @Input() disabled:boolean = false;
  @Input() isInvalid:boolean = false;
  @Output() onChange = new EventEmitter<BasicEntry>();

  constructor(
    private basicService:BasicEntryService
  ) {
   }
  ngOnInit() {
    this.getDocumentType();
  }

  onSelect(dept:any){
    if(dept==null){
      this.onChange.emit(new BasicEntry());
      return;
    }
    this.onChange.emit(dept);
  }
  getDocumentType() {
    this.basicService.getAllBasicItems('UploadDocumentsType',AuthService.getLoggedCompanyId()).subscribe((response: ApiResponse) => {
      if (response.status) {
        this._departments = response.result as BasicEntry[];
      }
    })
  }

}
