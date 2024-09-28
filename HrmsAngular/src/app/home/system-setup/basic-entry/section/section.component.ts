import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { BasicEntryService } from '../../../../services/system-setup/basic-entry.service';
import { ToastrService } from 'ngx-toastr';
import { AppService } from '../../../../app.service';
import { AuthService } from '../../../../services/auth.service';
import { ApiResponse } from '../../../../models/response.model';

@Component({
  selector: 'app-section',
  templateUrl: './section.component.html',
  styleUrls: ['./section.component.scss']
})
export class SectionComponent implements OnInit {

  @Input() showCloseBtn =false;
  title = 'Section Setup'
  isSubmitted = false;
  selectedItemId: number;
  businessNatures:any[]=[];
  btnStatus = "Save";
  comID;
  businessNatureForm: FormGroup;
  allSortOrder: any[] = [];
  constructor(
    private fb: FormBuilder,
    private modalService: NgbModal,
    private basicEntryService: BasicEntryService,
    private toaster: ToastrService,
    private appService: AppService
  ) {}
  ngOnInit() {
    this.comID = AuthService.getLoggedCompanyId();
    this.createForm();
    this.getAllItem();
  }

  save() {
    this.isSubmitted = true;
    if (this.businessNatureForm.invalid) {
      return;
    }
    else {
      this.basicEntryService.saveOrUpdateBusinessNature(this.businessNatureForm.value).subscribe((response: ApiResponse) => {
        if (response.status) {
          this.toaster.success(response.result, "Success");
          this.btnStatus = "Save";
          this.getAllItem();
        } else {
          this.toaster.error(response.result, "Failed!!");
        }
      });
    }
  }

  getAllItem() {
    this.basicEntryService.getAllBusinessnature(this.comID).subscribe((response: ApiResponse) => {
      if (response.status) {
        this.businessNatures = response.result as any[];
      }
      //this.getAllSortOrder();
    });
  }

  delete(id: number, modal: any) {
    this.selectedItemId = id;
    this.modalService.open(modal);
  }
  confirmDelete(rowId: number) {
    this.basicEntryService.deleteBusinessNature(rowId, this.comID)
      .subscribe(
        (response: ApiResponse) => {
          if (response.status) {
            this.toaster.warning(response.result);
            this.getAllItem();
          }
        },
        err => {
          this.toaster.error(err, 'Failed!');
          this.modalService.dismissAll();
        }
      )
    this.modalService.dismissAll()
  }

  getById(id: number) {
    // this.basicEntryService.getByIdBusinessNature(id).subscribe((response: ApiResponse) => {
    //   if (response.status) {
    //     this.businessNatureForm.patchValue(response.result);
    //     this.btnStatus = "Update";
    //   }
    // });
    let section = this.businessNatures.find(c=>c.id==id);
    this.businessNatureForm.patchValue(section);
    this.btnStatus = "Update";
  }

  createForm() {
    this.businessNatureForm = this.fb.group({
      id: [0, []],
      description: [, [Validators.required]],
      departmentID:[,[]],
      sortOrder: [0, []],
      companyID: [this.comID, []]
    })
  }



  get f() {
    return this.businessNatureForm.controls;
  }

  Reset() {
    this.isSubmitted = false;
    this.businessNatureForm.reset();
    this.createForm();
    this.btnStatus = 'Save'
  }
  close() {
    this.modalService.dismissAll();
  }

}

