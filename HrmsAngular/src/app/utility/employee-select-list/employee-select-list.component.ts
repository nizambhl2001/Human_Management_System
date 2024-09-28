import { AuthService } from './../../services/auth.service';
import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { SearchEmployee } from '../../models/hr/search-emp.model';
import { EmploymentService } from '../../services/hr/employment.service';
import { ApiResponse } from '../../models/response.model';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormControl, FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-employee-select-list',
  templateUrl: './employee-select-list.component.html',
  styleUrls: ['../../../vendor/libs/ng-select/ng-select.scss']

})
export class EmployeeSelectListComponent implements OnInit {

  compId:number;
  gradeValue:number;
  userType:number;
  userId:number;
  @Input() employees:SearchEmployee[]=[];
  @Input() isSearchBtnHide=false;
  @Input() isRequired:boolean=false;
  @Input() fixedWidth:string='250px';
  @Input() setEmpCode:string;
  @Output() onChange = new EventEmitter<SearchEmployee>();
  isLoading:boolean;
@Input() pageId:number;

  constructor(
    private empService:EmploymentService,
    public modalService:NgbModal,
    private fb:FormBuilder
  ) { }
  ngOnInit() {
    this.compId = AuthService.getLoggedCompanyId();
    this.gradeValue = AuthService.getLoggedGradeValue();
    this.userType=AuthService.getLoggedUserTypeId();
    this.userId=AuthService.getLoggedUserId(); 
    //this.getEmployees();
    if(this.employees.length==0){
      this.getEmployees();
    }

  }

  getEmployees(){
    this.isLoading = true;


    if(this.pageId==310 && this.userType!=9){
      this.empService.getAllEmpBasicInfoByuserType(this.compId,this.gradeValue,this.userId)
    .subscribe((response:ApiResponse)=>{
        if(response.status){
          this.employees = response.result as SearchEmployee[];
        }
        this.isLoading = false;
    })
    }
  else{

    this.empService.getAllEmpBasicInfo(this.compId,this.gradeValue)
    .subscribe((response:ApiResponse)=>{
        if(response.status){
          this.employees = response.result as SearchEmployee[];
        }
        this.isLoading = false;
    })
  }
  }

  
  onSelect(emp:any){
    if(emp==null || emp==''){
      this.onChange.emit(new SearchEmployee());
    }else{
      this.onChange.emit(emp);
    }
  }

  onSearchBtnClick(empCode:string){
    this.setEmpCode=empCode;
    let emp = this.employees.find(c=>c.empCode==empCode);
    this.onSelect(emp);
  }

}
