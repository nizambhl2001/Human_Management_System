import { AuthService } from './../../../services/auth.service';
import { Pagination } from './../../../shared/paginate';
import { NgbDateCustomParserFormatter } from './../../../shared/dateformat';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Employment } from '../../../models/hr/employment.model';
import { EmploymentService } from '../../../services/hr/employment.service';
import { ApiResponse } from '../../../models/response.model';
import { DateOperationService } from '../../../services/date-operation.service';
import { EmpSeparationService } from '../../../services/hr/emp-separation.service';
import { ToastrService } from 'ngx-toastr';
import { EmpSeparationInfoModel } from '../../../models/hr/emp-separation-info.model';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { SearchEmployee } from '../../../models/hr/search-emp.model';
import { Helper } from '../../../shared/helper';

@Component({
  selector: 'app-emp-separation-info',
  templateUrl: './emp-separation-info.component.html',
  styleUrls: ['./emp-separation-info.component.scss']
})
export class EmpSeparationInfoComponent extends Pagination implements OnInit {
  compID: number;
  isSubmitted=false;
  btnStatus:string="Save";
  separationModel: EmpSeparationInfoModel[] = [];
  empSeparationInfo: FormGroup
  deleteId: number;

  tempItem:any[]=[];
  tempItemfilter:any[]=[];
  constructor(
    private formBuilder: FormBuilder,
    private dateOperationS: DateOperationService,
    private employmentES: EmploymentService,
    private empSeparationS: EmpSeparationService,
    private toasterService: ToastrService,
    private modalService: NgbModal,
    private dateFormate: NgbDateCustomParserFormatter,
  ) { super()}

  ngOnInit() {
    this.compID = AuthService.getLoggedCompanyId();
    this.getAll();
    this.searchKeys = ['categoryName'];
    this.perPage = 10;
    this.createForm();
  }
  onSelectEmp(employee:SearchEmployee){
    this.empSeparationInfo.patchValue({
      empName: employee.empName,
      department:employee.department,
      designation:employee.designation,
      joinDateNgb:this.dateFormate.stringToNgbDate(employee.joinDate)
    })
  }
  getEmpInfo() {
    if (this.empSeparationInfo.value.empCode == "") {
      this.reset();
      return;
    }
    this.employmentES.getEmployment(this.empSeparationInfo.value.empCode, this.compID).subscribe((response: ApiResponse) => {
      let empInfo = response.result as Employment;
      this.empSeparationInfo.patchValue({
        empName: empInfo.empName,
        department: empInfo.department,
        designation: empInfo.designation,
        joinDateNgb: this.dateFormate.stringToNgbDate(empInfo.joinDate)
      })
    })
  }
  createForm() {
    this.empSeparationInfo = this.formBuilder.group({
      id: [, []],
      empCode: [, [Validators.required]],
      empName: [, []],
      department: [, []],
      designation: [, []],
      joinDate: [, []],
      joinDateNgb: [, []],
      resignType: [, [Validators.required]],
      date: [, []],
      dateNgb: [, [Validators.required]],
      currentDateNgb: [this.dateFormate.getCurrentNgbDate(), []],
      type: [, []],
      status: [1, []],
      isCanBack: [, []],
      reason: [, []],
      noticeDay: [, []],
      companyID: [this.compID, []]
    })
  }
  dateDiff() {
    let formVal = this.empSeparationInfo.value;
    if (formVal.joinDateNgb == null || formVal.dateNgb == null) {
      return;
    }
    let fromDate = this.dateFormate.ngbDateToDate(this.f.joinDateNgb.value);
    let toDate = this.dateFormate.ngbDateToDate(this.f.dateNgb.value);

    this.dateOperationS.dateOperation(fromDate, toDate).subscribe((response: ApiResponse) => {
      if(response.status){
        let datediff = response.result;
      this.f.isCanBack.setValue(datediff);
      }
    })
    let Ndays = (this.dateFormate.getDateDiff(this.dateFormate.getCurrentNgbDate(), this.f.dateNgb.value))
    this.f.noticeDay.setValue(Ndays + " Days");
  }
  // getAll() {
  //   this.empSeparationS.getAll().subscribe((response: ApiResponse) => {
  //     if (response.status) {
  //       this.items = response.result as EmpSeparationInfoModel[];
  //       this.update();
  //     }
  //     else {
  //       this.toasterService.error(response.result);
  //     }
  //   })
  // }

  getAll() {
    this.empSeparationS.getAll().subscribe((response: ApiResponse) => {
      if (response.status) {
        // this.items = response.result as EmpSeparationInfoModel[];
        this.tempItem = response.result as EmpSeparationInfoModel[];
        this.tempItemfilter = response.result as EmpSeparationInfoModel[];
        this.update();
      }
      else {
        this.toasterService.error(response.result);
      }
    })
  }
  save() {
    this.isSubmitted=true;
    if (this.empSeparationInfo.invalid) {
      this.toasterService.warning("Fill the Requires fields");
    }
    else {
      this.f.date.setValue(this.dateFormate.ngbDateToDate(this.f.dateNgb.value).toLocaleDateString())
      this.empSeparationS.insertSeparation(this.empSeparationInfo.value).subscribe((response: ApiResponse) => {
        if (response.status) {
          this.reset();
          this.getAll();
          this.isSubmitted=false;
          this.toasterService.success(response.result);
          this.btnStatus="Save";
        }
        else {
          this.toasterService.error(response.result);
        }
      })
    }
  }
  getById(id: number) {
    this.empSeparationS.getById(id).subscribe((response: ApiResponse) => {
      if (response.status) {
        let separation = response.result as EmpSeparationInfoModel;
        this.f.empCode.setValue(separation.empCode);
        this.getEmpInfo();
        this.f.empCode.setValue(separation.empCode);
        this.f.id.setValue(separation.id);
        this.f.resignType.setValue(separation.resignType);
        this.f.dateNgb.setValue(this.dateFormate.stringToNgbDate(separation.date));
        this.f.reason.setValue(separation.reason);
        this.btnStatus="Update";
      }
      else {
        this.toasterService.error(response.result);
      }
    })
  }
  get f() {
    return this.empSeparationInfo.controls;
  }
  reset() {
    this.createForm();
    this.btnStatus="Save";
    this.isSubmitted=false;
  }
  cancel() {
    this.modalService.dismissAll();
  }
  delete(id: number, modal: any) {
    this.modalService.open(modal);
    this.deleteId = id;
  }
  confirm() {
    this.empSeparationS.delete(this.deleteId).subscribe((response: ApiResponse) => {
      if (response.status) {
        this.toasterService.success(response.result, "Deleted");
        let index = this.separationModel.findIndex(c => c.id == this.deleteId);
        this.separationModel.splice(index, 1);
        this.getAll();
        this.deleteId = 0;
        this.modalService.dismissAll();
      }
    })
  }


  onSearch(searchKey: string) {
    if (searchKey) {
      this.tempItem = this.tempItemfilter.filter(cus => (
        (cus.empCode as string).toLocaleLowerCase().match(searchKey.toLocaleLowerCase()) ||
        (Helper.isNullOrEmpty(cus.empCode) ? '' : cus.empCode as string).toLocaleLowerCase().match(searchKey.toLocaleLowerCase())
      ))
    } else {
      this.tempItem = this.tempItemfilter;
    }
  }
}
