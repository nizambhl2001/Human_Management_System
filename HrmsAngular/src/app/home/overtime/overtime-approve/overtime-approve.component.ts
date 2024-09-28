import { AuthService } from './../../../services/auth.service';
import { ToastrService } from 'ngx-toastr';
import { OvertimeService } from './../../../services/overtime/overtime.service';
import { FormBuilder, FormGroup, Validators, FormArray, FormControl } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { ApiResponse } from '../../../models/response.model';
import { EmploymentService } from '../../../services/hr/employment.service';
import { NgbDateCustomParserFormatter } from '../../../shared/dateformat';


@Component({
  selector: 'app-overtime-approve',
  templateUrl: './overtime-approve.component.html',
  styleUrls: ['./overtime-approve.component.scss', '../../../../vendor/libs/angular2-ladda/angular2-ladda.scss']
})
export class OvertimeApproveComponent implements OnInit {

  allOtRequisition: any[] = [];
  dateColumns: string[] = [];
  isLoadingData: boolean = false;
  isUpdating: boolean = false;
  isApproving: boolean = false;

  requisitionApproveForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private otService: OvertimeService,
    private toaster: ToastrService,
    private dateFormat: NgbDateCustomParserFormatter
  ) { }

  ngOnInit() {
    this.getOtRequisition();
    this.createForm();
  }

  getOtRequisition() {
    this.otService.getOtRequisition().subscribe((response: ApiResponse) => {
      if (response.status) {
        this.allOtRequisition = response.result as any[];
      } else {
        this.allOtRequisition = [];
      }
    })
  }

  getOtRequisitionDetails(otRequsitionMasterId) {
    this.isLoadingData = true;
    this.reset();
    this.otService.getOtRequisition(otRequsitionMasterId).subscribe((response: ApiResponse) => {
      if (response.status) {
        let otRequisitionDetails = response.result.otRequisitionDetails as any[]
        this.dateColumns = this.getDateColumns(new Date(response.result.fromDate), new Date(response.result.toDate));
        this.requisitionApproveForm.patchValue(response.result)
        let uniqueRows = otRequisitionDetails.filter((row, i, newArr) => newArr.findIndex(t => t.empCode == row.empCode) === i);
        uniqueRows.forEach(row => {
          let otDetailsForm = this.getNewRowFormGroup(row);
          let i = 0;
          this.dateColumns.forEach(dateCol => {
            let otDetailsInDateWise = otRequisitionDetails.find(c => c.empCode == row.empCode && (new Date(c.otDate)).toLocaleDateString() == dateCol)
            otDetailsForm.addControl('otHour' + i, new FormControl(otDetailsInDateWise.otHours));
            otDetailsForm.addControl('approved' + i, new FormControl(response.result.isEditByBoss ? otDetailsInDateWise.approvedHours : otDetailsInDateWise.otHours));
            otDetailsForm.addControl('replace' + i, new FormControl(otDetailsInDateWise.isReplace));
            i++;
          })
          this.requisitionDetialsForm.push(otDetailsForm);
        })
        this.isLoadingData = false;
      }
    }, err => {
      this.isLoadingData = false;
    })
  }
  onSubmit(isApprove = false) {
    if(isApprove){this.isApproving=true}
    else{this.isUpdating=true;}

    let otDetailRows: any[] = [];
    (this.requisitionDetialsForm.value as any[]).forEach(frmVal => {
      let i = 0;
      this.dateColumns.forEach(col => {
        let empRow = {
          id: 0,
          otRequisitionMasterID: 0,
          empCode: frmVal.empCode,
          otDate: col,
          otHours: frmVal['otHour' + i],
          isReplace: frmVal['replace' + i],
          approvedHours: frmVal['replace' + i]?0:frmVal['approved' + i]
        }
        otDetailRows.push(empRow);
        i++;
      })
    })
    let otMasterObj = {
      id: this.formVal.id,
      userID: this.formVal.userID,
      requisitionDate: this.formVal.requisitionDate,
      fromDate: (new Date(this.formVal.fromDate)).toLocaleDateString(),
      toDate: (new Date(this.formVal.toDate)).toLocaleDateString(),
      sectionID: this.formVal.sectionID,
      reasonOfOt: this.formVal.reasonOfOt,
      isApprove: isApprove,
      approvedBy: isApprove ? AuthService.getLoggedEmpCode() : null,
      approvedDate: isApprove ? (new Date).toLocaleDateString() : null,
      isEditByBoss: true,
      companyID: this.formVal.companyID,
      otRequisitionDetails: otDetailRows
    }
    this.otService.otRequisitionApply(otMasterObj)
      .subscribe((response: ApiResponse) => {
        if (response.status) {
          this.isApproving =  false;
          this.isUpdating =  false;
          this.getOtRequisition();
          this.toaster.success(isApprove ? 'Ot Requisition Approved' : 'Ot Requisition Updated Successfully!', isApprove ? 'Approved' : 'Updated!')
        } else {
          this.toaster.error('Failed to updated OT requisition', 'Failed!')
        }
      }, err => {
        this.toaster.error(err,'Woops!')
        this.isApproving =  false;
        this.isUpdating =  false;
      })
  }

  createForm() {
    this.requisitionApproveForm = this.fb.group({
      id: [, []],
      userID: [, []],
      requisitionDate: [, []],
      fromDate: [, []],
      toDate: [, []],
      sectionID: [, []],
      reasonOfOt: [, []],
      isApprove: [, []],
      approvedDate: [, []],
      approvedBy: [, []],
      isEditByBoss: [, []],
      companyID: [, []],
      otRequisitionDetails: this.fb.array([])
    })
  }

  get requisitionDetialsForm() {
    return this.requisitionApproveForm.controls['otRequisitionDetails'] as FormArray;
  }
  get formVal() {
    return this.requisitionApproveForm.value;
  }

  reset() {
    this.createForm();
  }

  getNewRowFormGroup(empOtDetails) {
    let empOtDetailsFormGroup = this.fb.group({
      otRequisitionMasterID: [empOtDetails.otRequisitionMasterID, []],
      empCode: [empOtDetails.empCode, []],
      empName: [empOtDetails.empName, []],
      designation: [empOtDetails.designation, []],
    })
    return empOtDetailsFormGroup;
  }

  getDateColumns(fromDate: Date, toDate: Date): string[] {
    let sDate = parseInt(this.dateFormat.getDateToYyyymmdd(fromDate));
    let eDate = parseInt(this.dateFormat.getDateToYyyymmdd(toDate));
    let columns: string[] = [];
    for (sDate; sDate <= eDate; sDate++) {
      columns.push(this.dateFormat.getYyyymmddToDate(sDate.toString()).toLocaleDateString());
    }
    return columns;
  }

}
