import { AuthService } from './../../../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { Pagination } from '../../../shared/paginate';
import { AttendenceService } from '../../../services/Attendance/attendence.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiResponse } from '../../../models/response.model';
import { ShiftSetupModel } from '../../../models/Attendance/shiftsetupModel';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-shift-setup',
  templateUrl: './shift-setup.component.html',
  styleUrls: ['./shift-setup.component.scss', '../../../../vendor/libs/ng-select/ng-select.scss']
})
export class ShiftSetupComponent extends Pagination implements OnInit {

  constructor(
    private shiftSetupService: AttendenceService,
    private fb: FormBuilder,
    private toaster:ToastrService,
    private attService:AttendenceService
  ) {
    super();
  }
  title = "Shift Setup";
  compId: number;
  gradeValue: number;
  allShift: ShiftSetupModel[] = [];
  shiftSetupForm: FormGroup;
  isSubmitted=false;
  btnStatus:string="Save";

  ngOnInit() {
    this.compId = AuthService.getLoggedCompanyId();
    this.gradeValue = AuthService.getLoggedGradeValue();
    this.searchKeys = ['shfitName'];
    this.createForm();
    this.getAll();
  }
  getAll() {
    this.shiftSetupService.GetshiftAll().subscribe((response: ApiResponse) => {
      if (response.status) {
        this.allShift = response.result as ShiftSetupModel[];
        this.items = response.result as ShiftSetupModel[];
        this.perPage = 30;
        this.sortBy = 'shfitName';
        this.sortDesc = false;
        this.update();
      }
    })
  }
  onSubmit(){
    this.isSubmitted=true;
    if(this.shiftSetupForm.invalid){
      this.toaster.warning("Fill Validate Fields");
    }
    else{
    this.formControl['out'].patchValue(this.formVal.nextDate)
    this.attService.saveOrUpdateShift(this.formVal)
    .subscribe(
      (response:ApiResponse)=>{
        if(response.status){
          this.toaster.success(response.result, 'Success!');
          this.reset();
          this.getAll();
        }else{
          this.toaster.error(response.result, 'Failed!');
        }
      }
    )
  }
}
  edit(shiftId:number){
    let shift = this.allShift.find(c=>c.id==shiftId);
    this.shiftSetupForm.patchValue(shift);
    this.btnStatus="Update";
  }

  createForm() {
    this.shiftSetupForm = this.fb.group({
      id: [0, []],
      shfitName: [, [Validators.required]],
      shiftStartHour: [, [Validators.required]],
      shiftStartMin: [, [Validators.required]],
      shiftEndtHour: [, [Validators.required]],
      shiftEndMin: [, [Validators.required]],
      minLogout: [, [Validators.required]],
      maxLogout: [, [Validators.required]],
      minIntime: [, [Validators.required]],
      maxIntime: [, [Validators.required]],
      out: [, []],
      nextDate: [0, []],
      companyID: [this.compId, []],
      nextShiftID: [0, []],
      dutyHours: [, [Validators.required]],
      dutyMinute: [, [Validators.required]],
    })
  }
  get formControl(){
    return this.shiftSetupForm.controls;
  }
  get formVal(){
    return this.shiftSetupForm.value;
  }
  get f(){
    return this.shiftSetupForm.controls;
  }
  reset(){
    this.createForm();
    this.isSubmitted=false;
    this.btnStatus="Save";
  }

}
