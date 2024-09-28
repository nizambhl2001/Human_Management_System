import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ApprisalService } from '../../services/Apprisal/apprisal.service';
import { KpiEntrySetup } from '../../home/system-setup/kpi-setup/kpi-setup';
import { KpiSetupModel } from '../../models/Apprisal/kpisetup';
import { AuthService } from '../../services/auth.service';
import { ApiResponse } from '../../models/response.model';

@Component({
  selector: 'app-kpi-select-list',
  templateUrl: './kpi-select-list.component.html',
  styleUrls: ['./kpi-select-list.component.scss']
})
export class KpiSelectListComponent implements OnInit {


  @Input() isRequired: boolean = false;
  @Input() selectedTag: string[] = [];
  @Input() suggestedTags: string[] = [];
  @Input() disabled:boolean = false;
  @Input() placeholder:string = 'Enter new Kpi'
  @Output() onSelect = new EventEmitter<string>();
  constructor() {
  }
  ngOnInit() {
    if(this.selectedTag[0]==null){
      this.selectedTag=[];
    }
  }
  onAddTag(tag) {
    //this.selectedTag.push(tag.display)
    this.onSelect.emit(tag.display);
  }
  onRemove() {
    this.selectedTag = [];
    //this.onSelect.emit(null);
  }
}
