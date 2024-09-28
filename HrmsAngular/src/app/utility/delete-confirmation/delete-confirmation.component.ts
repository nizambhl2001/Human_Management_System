import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { BasicEntryService } from '../../services/system-setup/basic-entry.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ApiResponse } from '../../models/response.model';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-delete-confirmation',
  templateUrl: './delete-confirmation.component.html',
  styleUrls: []
})
export class DeleteConfirmationComponent implements OnInit {

  @Input() rowId:number;
  @Output() onConfirmedId = new EventEmitter<number>()
  constructor(
    private basicService:BasicEntryService,
    private modalService:NgbModal,
    private toaster:ToastrService
  ) { }

  ngOnInit() {
  }
  
  confirmDelete(){
    this.onConfirmedId.emit(this.rowId);
  }

  close(){
    this.rowId = null;
    this.modalService.dismissAll();
  }

}
