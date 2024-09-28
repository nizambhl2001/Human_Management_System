import { AuthService } from './../../../services/auth.service';
import { BonusType } from './../../../models/Addition/bonus-types';
import { NgbDateCustomParserFormatter } from './../../../shared/dateformat';

import { FloreService } from './../../../services/system-setup/flore.service';
import { FloreModel } from './../../../models/system-setup/flore.model';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiResponse } from '../../../models/response.model';
import { BasicEntryService } from '../../../services/system-setup/basic-entry.service';
import { BasicEntry } from '../../../models/system-setup/basic-entry.model';
import { Employment } from '../../../models/hr/employment.model';
import { EmploymentService } from '../../../services/hr/employment.service';
import { ToastrService } from 'ngx-toastr';

import { LineModel } from '../../../models/system-setup/line.model';
import { MachineModel } from '../../../models/system-setup/machine.model';
import { EmpProductionPositionModel } from '../../../models/hr/emp-production-position.model';
import { EmpProductionService } from '../../../services/hr/emp-production-position.service';
import { SearchEmployee } from '../../../models/hr/search-emp.model';
import { SystemSetupService } from '../../../services/system-setup/system-setup.service';

@Component({
  selector: 'app-production-position-info',
  templateUrl: './production-position-info.component.html',
  styleUrls: ['./production-position-info.component.scss', '../../../../vendor/libs/ng-select/ng-select.scss']
})
export class ProductionPositionInfoComponent implements OnInit {
  compId: number;
  userID: number;
  isSubmitted = false;
  btnStatus:string="Save";
  productionunit: BasicEntry[] = [];
  allflore: FloreModel[] = []
  allLine: LineModel[] = []
  allProduction: EmpProductionPositionModel[] = [];
  AllMachine: MachineModel[] = []
  productionPositionForm: FormGroup
  constructor(
    private formBuilder: FormBuilder,
    private employmentES: EmploymentService,
    private floreService: FloreService,
    private dateFormate: NgbDateCustomParserFormatter,

    private productionService: EmpProductionService,

    private toasterService: ToastrService,
    private basicEntryService: BasicEntryService,
    private systemSetupService:SystemSetupService

  ) { }

  ngOnInit() {
    this.compId = AuthService.getLoggedCompanyId();
    this.userID = AuthService.getLoggedUserId();
    this.createForm();
    this.getProductionUnit();
  }
  getProductionUnit() {
    this.basicEntryService.getProductionUnit(this.compId).subscribe((response: ApiResponse) => {
      if (response.status) {
        this.productionunit = response.result as BasicEntry[];
      }
    })
  }
  getFloreByUniteId(unitID:any) {
    if(unitID==null){
      this.f.flore.setValue(null);
      return;
    }
    this.systemSetupService.getFloreByProductionUnitId(unitID).subscribe((response: ApiResponse) => {
      if (response.status) {
        this.allflore = response.result as FloreModel[];
      }
    })
  }
  getLineByFloreId(floreID:any) {
    if(floreID==null){
      this.f.line.setValue(null);
      return;
    }
    this.systemSetupService.getLineByFloreId(floreID).subscribe((response: ApiResponse) => {
      if (response.status) {
        this.allLine = response.result as LineModel[];
      }
    })
  }
  getMachineByLineId(lineID:any) {
    if(lineID==null){
      this.f.machineID.setValue(null);
      return;
    }
    this.systemSetupService.getMachineByLineId(lineID).subscribe((response: ApiResponse) => {
      if (response.status) {
        this.AllMachine = response.result as MachineModel[];
      }
    })
  }
  onSelectEmp(employee:SearchEmployee){
    this.productionPositionForm.patchValue({
      empName: employee.empName,
      department:employee.department,
      designation:employee.designation,
      joinDateNgb:this.dateFormate.stringToNgbDate(employee.joinDate)
    })
  }
  getEmpInfo() {
    if (this.f.empCode.value == null) {
    this.reset();
    }
    else{
    this.employmentES.getEmployment(this.f.empCode.value, this.compId).subscribe((response: ApiResponse) => {
      this.getAll();
      let empInfo = response.result as Employment;
      this.productionPositionForm.patchValue({
        empName: empInfo.empName,
        department: empInfo.department,
        designation: empInfo.designation,
      })
    })
  }
}
  save() {
    this.isSubmitted=true;
    if (this.productionPositionForm.invalid) {
      this.toasterService.warning("Fill Form");
      return;
    }
    else {
      this.f.positionDate.setValue(this.dateFormate.ngbDateToDate(this.f.positionDateNgb.value).toLocaleDateString())
      this.productionService.save(this.productionPositionForm.value).subscribe((response: ApiResponse) => {
        if (response.status) {
          this.toasterService.success(response.result, "Success");
          this.isSubmitted=false;
          this.reset();
          this.getAll();
        }
        else {
          this.toasterService.error(response.result);
        }
      })
    }
  }
  getAll() {
    this.productionService.getByEmpCode(this.f.empCode.value, this.compId).subscribe((response: ApiResponse) => {
      if (response.status) {
        this.allProduction = response.result as EmpProductionPositionModel[];
      }
    })
  }
  productionGetById(id: number) {
    if (this.productionPositionForm.value.empCode == "") {
      this.reset();
      return;
    }
    else{
    let production = this.allProduction.find(c=>c.id===id);
     this.productionPositionForm.patchValue(production);
     this.productionPositionForm.patchValue({
       line:production.lineID,
       unite:production.uniteID,
       flore:production.floorID,
       positionDateNgb:this.dateFormate.stringToNgbDate(production.positionDate)
      })
      this.btnStatus="Update";
      this.getEmpInfo();
  }
}
  createForm() {
    this.productionPositionForm = this.formBuilder.group({
      id: [, []],
      empCode: [, [Validators.required]],
      empName: [, []],
      department: [, []],
      designation: [, []],
      unite: [, [Validators.required]],
      line: [, [Validators.required]],
      flore: [, [Validators.required]],
      machineID: [, [Validators.required]],
      positionDate: [, []],
      positionDateNgb: [, [Validators.required]],
      userID: [this.userID, []],
      note: [, []],
      companyID: [this.compId, []],
    })
  }
  get f() {
    return this.productionPositionForm.controls;
  }
  reset() {
    this.createForm();
    this.btnStatus="Save";
    this.allProduction=[];
  }
}
