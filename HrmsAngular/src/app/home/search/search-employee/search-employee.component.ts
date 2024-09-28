import { state } from '@angular/animations';
import { AuthService } from './../../../services/auth.service';

import { EmpTypeService } from '../../../services/system-setup/EmpType.service';
import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { SearchEmployee } from '../../../models/hr/search-emp.model';
import { EmployeeService } from '../../../services/hr/employee.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ApiResponse } from '../../../models/response.model';
import { Pagination } from '../../../shared/paginate';

@Component({
  selector: 'app-search-employee',
  templateUrl: './search-employee.component.html',
  styleUrls: ['./search-employee.component.scss']
})
export class SearchEmployeeComponent extends Pagination implements OnInit {

  active: boolean;
  @Input() status: string= 'Active';
  @Input() isBlock: string = 'No';
  unBlock: boolean;
  isLoading: boolean;
  constructor(
    private empService: EmployeeService,
    private modalService: NgbModal
  ) { super() }

  empSearchKeys: SearchEmployee = new SearchEmployee();
  filteredEmployees: SearchEmployee[] = [];
  @Output() selectEvent = new EventEmitter<string>();
  @Input() setEmpCode:string;
  ngOnInit() {
    this.searchEmployees();
  }

  onSearchClick(empCode: string, searchModal: any) {
    this.empSearchKeys.empCode = '';
    this.empSearchKeys.empName = '';
    this.empSearchKeys.department = '';
    this.empSearchKeys.designation = '';
    this.modalService.open(searchModal, { windowClass: 'modal-width' });
  }

  searchEmployees() {
    this.isLoading = true;
    this.empSearchKeys.companyID = AuthService.getLoggedCompanyId();
    this.empSearchKeys.gradeValue = AuthService.getLoggedGradeValue();
    this.empSearchKeys.isBlock = this.isBlock;
    this.empSearchKeys.status = this.status;

    this.empService.searchEmployee(this.empSearchKeys).subscribe((response: ApiResponse) => {
      if (response.status) {
        this.perPage = 10;
        this.items = response.result as SearchEmployee[];
        this.update();
      }else{
        this.items = [];
        this.update();
      }
      this.isLoading = false;
    })
  }
  onSelect(empCode: string) {
    this.selectEvent.emit(empCode);
    this.cancel();
  }
  cancel() {
    this.modalService.dismissAll();
    this.tempItems = [];
  }

}
