import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ApiResponse } from '../../../models/response.model';
import { BasicEntry } from '../../../models/system-setup/basic-entry.model';
import { BasicEntryService } from '../../../services/system-setup/basic-entry.service';

@Component({
  selector: 'app-return-tax-report',
  templateUrl: './return-tax-report.component.html',
  styleUrls: ['./return-tax-report.component.scss','../../../../vendor/libs/ng-select/ng-select.scss']
})
export class ReturnTaxReportComponent implements OnInit {
  returnTaxReportForm:FormGroup;
  allDepartment: BasicEntry[] = [];
  allBranch:BasicEntry[]=[];
  exporting:boolean = false;
  constructor(
    private basicES: BasicEntryService,
    private fb:FormBuilder,
  ) { }

  ngOnInit() {
    this.createForm();
    this.AllDepartment();
    this.AllBranch();
  }
  AllDepartment() {
    this.basicES.getDepartment().subscribe((response: ApiResponse) => {
      if (response.status) {
        this.allDepartment = response.result as BasicEntry[];
      }
    })
  }
  AllBranch() {
    this.basicES.getBranch().subscribe((response: ApiResponse) => {
      if (response.status) {
        this.allBranch = response.result as BasicEntry[];
        console.log();
      }
    })
  }
  createForm(){
    this.returnTaxReportForm = this.fb.group({
      ExportType:['pdf',[]],
    })
  }
}
