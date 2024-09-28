import { AuthService } from './../../../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { Pagination } from '../../../shared/paginate';
import { BasicEntry } from '../../../models/system-setup/basic-entry.model';
import { SalaryYear } from '../../../models/SalarySetup/salary-year';
import { FormGroup, FormArray, FormBuilder, Validators, FormControl } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { NgbDateCustomParserFormatter } from '../../../shared/dateformat';
import { BasicEntryService } from '../../../services/system-setup/basic-entry.service';
import { SalarySetupService } from '../../../services/SalarySetup/salary-setup.service';
import { LeaveService } from '../../../services/leave.service';
import { EarnLeaveBalance } from '../../../models/leave/earn-leave-balance.model';
import { EarnLeaveBalanceDetails } from '../../../models/leave/earn-leave-balance-details.model';
import { ApiResponse } from '../../../models/response.model';

@Component({
  selector: 'app-substitute-leave',
  templateUrl: './substitute-leave.component.html',
  styleUrls: ['./substitute-leave.component.scss',
  '../../../../vendor/libs/ng-select/ng-select.scss',
  '../../../../vendor/libs/angular2-ladda/ladda.scss'
]
})
export class SubstituteLeaveComponent extends Pagination implements OnInit {

  isSearchBtnClick:boolean = false;
  isSaveBtnClick:boolean = false;
  isLoading:boolean = false;
  _compId:number;
  _gradeValue:number;
  _departments:BasicEntry[];
  _jobLocations:BasicEntry[];
  _salaryYears:SalaryYear[];

  _substituteLeaveForm:FormGroup;
  _substituteLeaveDetails:FormArray;

  constructor(
    private fb:FormBuilder,
    private modalService:NgbModal,
    private toaster:ToastrService,
    private dateFormat: NgbDateCustomParserFormatter,
    private basicService:BasicEntryService,
    private salaryService:SalarySetupService,
    private leaveService:LeaveService
  ) {
    super();
    this._substituteLeaveDetails = this.fb.array([]);
  }
  ngOnInit() {
    this._compId =AuthService.getLoggedCompanyId();
    this._gradeValue = AuthService.getLoggedGradeValue();

    this.sortDesc = false;

    this.createForm();
    this.getDepartments();
    this.getJobLocations();
    this.getSalaryYears();
  }

  getDepartments(){
    this.basicService.getDepartment().subscribe((response:ApiResponse)=>{
      if(response.status){
        this._departments = response.result as BasicEntry[];
        this.sortBy = 'description';
        this.sort(this._departments);
      }
    })
  }
  getJobLocations(){
    this.basicService.getBranch().subscribe((response:ApiResponse)=>{
      if(response.status){
        this._jobLocations = (response.result as BasicEntry[]);
        this.sortBy = 'description';
        this.sort(this._jobLocations);
      }
    })
  }
  getSalaryYears(){
    this.salaryService.getAllSalaryYear().subscribe((response:ApiResponse)=>{
      if(response.status){
        this._salaryYears =  response.result as SalaryYear[];
        this.sortBy = 'yearName';
        this.sort(this._salaryYears);
      }
    })
  }
  getSubstituteLeaveDetails(){
    this.isSearchBtnClick = true;
    if(this._substituteLeaveForm.get('fromYear').invalid){
      this.toaster.error('Fill all required field!', 'Invalid Submission!');
      return;
    }
    this.isLoading = true;
    let frmVal = this._substituteLeaveForm.value;
    let param:EarnLeaveBalance = new EarnLeaveBalance();
    param.department = frmVal.department;
    param.jobLocation = frmVal.jobLocation;
    param.yearID = frmVal.fromYear;
    param.companyID = this._compId;
    param.grade = this._gradeValue;
    this.leaveService.getSubstituteLeave(param).subscribe((response:ApiResponse)=>{
      if(response.status){
        this.isSearchBtnClick = false;
        this.isLoading = false;
        let model = response.result as EarnLeaveBalanceDetails[];
        this._substituteLeaveDetails = this.fb.array([]);
        model.forEach(item=>{
          this._substituteLeaveDetails.push(
            new FormGroup({
              empCode: new FormControl(item.empCode,[Validators.required]),
              empName: new FormControl(item.empName, []),
              department: new FormControl(item.department, []),
              designation: new FormControl(item.designation, []),
              qty: new FormControl(item.qty,[Validators.required]),
              note: new FormControl(item.note,[]),
              leaveTypeID:new FormControl(0,[])
          })
          )
        })
      }else{
        this.toaster.error(response.result)
        this.isLoading = false;
      }
    });
  }

  onSubmit(){
    this.isSaveBtnClick = true;
    if(this._substituteLeaveForm.get('toYear').invalid || this._substituteLeaveDetails.invalid){
      this.toaster.error('Fill all required field!', 'Invalid Submission!');
      return;
    }

    let model:EarnLeaveBalance = new EarnLeaveBalance();
    model.date = this.dateFormat.ngbDateToDate(this._substituteLeaveForm.value.dateNgb).toLocaleDateString();
    model.yearID = this._substituteLeaveForm.value.toYear;
    model.companyID = this._compId;
    model.details = this._substituteLeaveDetails.value;
    this.leaveService.saveSubstituteLeave(model).subscribe((response:ApiResponse)=>{
      if(response.status){
        this.isSaveBtnClick = false;
        this.toaster.success(response.result, 'Success!');
      }else{
        this.toaster.error(response.result, 'Failed!');
      }
    })

  }
  removeRow(rowIndex){
    this._substituteLeaveDetails.removeAt(rowIndex);
  }

  createForm(){
    this._substituteLeaveForm = this.fb.group({
      department: [,[]],
      jobLocation:[,[]],
      dateNgb:[this.dateFormat.getCurrentNgbDate(),[]],
      fromYear:[,[Validators.required]],
      toYear: [,[Validators.required]]
    })
  }

}
