import { AuthService } from './../../../services/auth.service';
import { SalarySetupService } from './../../../services/SalarySetup/salary-setup.service';
import { SalaryHead } from './../../../models/SalarySetup/salary-head';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ApiResponse } from './../../../models/response.model';
import { Component, OnInit } from '@angular/core';
import { expand } from 'rxjs/operators';
import { Pagination } from '../../../shared/paginate';
import { SalaryType } from '../../../models/SalarySetup/salary-type';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-salary-head',
  templateUrl: './salary-head.component.html',
  styleUrls: ['./salary-head.component.scss', '../../../../vendor/libs/ng-select/ng-select.scss']
})
export class SalaryHeadComponent extends Pagination implements OnInit {

  constructor(
    private salaryHeadservice: SalarySetupService,
    private formBuilder: FormBuilder,
    private toaster: ToastrService
  ) {
    super()
  }
  btnStatus = 'Save';
  salaryType: SalaryType[] = [];
  salaryHeadForm: FormGroup;
  salaryHeaddata: SalaryHead[] = [];
  filteredSalaryHead: SalaryHead[] = [];
  allSalaryHead: SalaryHead[] = [];
  companyID: number;
  isSaveBtnClick = false;

  ngOnInit() {
    this.items = [];
    this.companyID = AuthService.getLoggedCompanyId();
    this.getAll();
    this.createForm();
    this.update;
    this.getSalryType();


    this.searchKeys = ['salaryHeadType']
  }

  getSalryType() {
    this.salaryHeadservice.getAllSalaryType().subscribe((response: ApiResponse) => {
      if (response.status)
        this.salaryType = response.result as SalaryType[];
    })

  }
  onSelectedSalaryHead(salaryTypeName: string) {
    if(salaryTypeName){
      this.filteredSalaryHead =  this.salaryHeaddata.filter(c => c.salaryHeadType == salaryTypeName);
    }else{
      this.filteredSalaryHead = this.salaryHeaddata
    }
  }

  getAll() {
    this.salaryHeadservice.getAllSalaryHead().subscribe((response: ApiResponse) => {
      if (response.status) {
        this.salaryHeaddata = response.result as SalaryHead[];
        this.filteredSalaryHead = response.result as SalaryHead[];
        //this.allSalaryHead = response.result as SalaryHead[];
        this.update();
      }
    })
  }
  onFilter(value:string){
    if(value){
      this.filteredSalaryHead = this.salaryHeaddata.filter(c=>c.accountName.toLowerCase().match(value.toLowerCase())
      || c.accountCode.toLowerCase().match(value.toLowerCase()))
    }
    else{
      this.filteredSalaryHead = this.salaryHeaddata;
    }
  }
  getById(id: number) {
    this.btnStatus = 'Update';
    this.salaryHeadForm.patchValue(this.salaryHeaddata.find(c=>c.id==id));
  }
  save() {
    this.isSaveBtnClick = true;
    if (this.salaryHeadForm.invalid) {
      this.toaster.error("Please fill the all required fields", "Invalid Submission")
    } else {
      let salhead = new SalaryHead();
      salhead = this.salaryHeadForm.value;
      salhead.sortOrder = this.f.slNo.value;
      this.salaryHeadservice.saveSalaryHead(salhead).subscribe((response: ApiResponse) => {
        if (response.status) {
          this.toaster.success(response.result, "Success!")
          this.reset();
          this.getAll();
        } else {
          this.toaster.error(response.result, "Failed!");
        }
      })
    }


  }

  reset() {
    if (this.btnStatus == 'Save' || this.btnStatus == 'Update') {
      this.isSaveBtnClick = false;
      this.salaryHeadForm.controls['accountCode'].reset();
      this.salaryHeadForm.controls['accountName'].reset();
      this.btnStatus = 'Save';

    } else {
      this.isSaveBtnClick = false;
      this.salaryHeadForm.reset();
      this.createForm();
      this.btnStatus = 'Save';
    }
  }
  Update() {
    let salhead = new SalaryHead();
    salhead = this.salaryHeadForm.value;
    salhead.sortOrder = this.f.slNo.value;
    this.salaryHeadservice.updateSalaryHead(salhead).subscribe((response: ApiResponse) => {
      if (response.status) {
        this.toaster.success(response.result, "Updated!")
        this.reset();
        this.getAll();
      } else {
        this.toaster.error(response.result, "Failed!");
      }
    })
  }
  onSubmit() {
    if (this.btnStatus == "Save")
      this.save();
    else
      this.Update();
  }

  createForm() {
    this.salaryHeadForm = this.formBuilder.group({
      id: [0, []],
      accountName: [, [Validators.required]],
      accountCode: [, [Validators.required]],
      salaryHeadType: [, [Validators.required]],
      accountTypeID: [, []],
      createdDate: [null, []],
      updatedDate: [null, []],
      sortOrder: [, []],
      companyID: [this.companyID, []],
      slNo: [, [Validators.required]],
      isIncomeTax: [, [Validators.required]],
      isInvestments: [null, []],
      isaddordeduct: [0, []]


    })

  }

  get f() {
    return this.salaryHeadForm.controls;
  }
}
