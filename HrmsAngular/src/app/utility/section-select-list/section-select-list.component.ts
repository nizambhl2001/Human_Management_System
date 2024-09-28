import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { BasicEntryService } from '../../services/system-setup/basic-entry.service';
import { AuthService } from '../../services/auth.service';
import { ApiResponse } from '../../models/response.model';

@Component({
  selector: 'app-section-select-list',
  template: `<ng-select
  [(ngModel)]="sectionId"
  (change)="onSelect($event)"
  [items]="businessNatures"
  bindLabel="description"
  bindValue="id"
  [disabled]="disabled"
  placeholder="Select Section">
  </ng-select>`,
  styleUrls: ['../../../vendor/libs/ng-select/ng-select.scss']
})
export class SectionSelectListComponent implements OnInit {

  @Input() sectionId: number;
  @Input() departmentId: number = 0;
  @Input() disabled: boolean = false;
  @Output() onChange = new EventEmitter<any>();

  businessNatures: any[] = [];

  constructor(private service: BasicEntryService) { }
  ngOnInit() {
    
    this.getAllBusinessNature();
  }

  getAllBusinessNature() {
    this.service.getAllBusinessnature(AuthService.getLoggedCompanyId(), this.departmentId).subscribe((response: ApiResponse) => {
      if (response.status) {
        this.businessNatures = response.result as any[];
      }
      else {
        this.businessNatures = [];
      }
    })
  }

  onSelect(section) {
    if (section) {
      this.onChange.emit(section)
    } else {
      this.onChange.emit({
        id: null, description: null, departmentID: null
      })
    }
  }

}
