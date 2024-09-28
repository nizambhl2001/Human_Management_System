import { AuthService } from './../../../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray, FormControl } from '@angular/forms';
import { ApprisalService } from '../../../services/Apprisal/apprisal.service';
import { ToastrService } from 'ngx-toastr';
import { ApiResponse } from '../../../models/response.model';
import { EmployeeForApprisal } from '../../../models/Apprisal/employee-for-apprisal';
import { SalaryYear } from '../../../models/SalarySetup/salary-year';
import { QuarterModel } from '../../../models/Apprisal/quarter-model';
import { KpiSetupModel } from '../../../models/Apprisal/kpisetup';
import { max } from 'rxjs/operators';
import { KpiScoreAchievement } from '../../../models/Apprisal/kpi-score-achievement';
import { EmployeeService } from '../../../services/hr/employee.service';

@Component({
  selector: 'app-emp-apprisal',
  templateUrl: './emp-apprisal.component.html',
  styleUrls: ['./emp-apprisal.component.scss', '../../../../vendor/libs/ng-select/ng-select.scss']
})
export class EmpApprisalComponent implements OnInit {

  constructor(
    private formbuilder: FormBuilder,
    private empwisekpiservice: ApprisalService,
    private empService:EmployeeService,
    private toasterservice: ToastrService
  ) { }
  achievementscoreform: FormGroup;
  empCode: string;
  empCodes: EmployeeForApprisal[] = [];
  years: SalaryYear[] = [];
  quarters: QuarterModel[] = [];
  companyId: number;
  empWiseKpiBusinessFormList: FormArray;
  empWiseKpiPeopleFormList: FormArray;
  KpiBusinessResult: KpiSetupModel[] = [];
  KpiPeopleResult: KpiSetupModel[] = [];
  sumBusScore: number;
  sumPeoScore: number;
  totalBusinessWeight:number=0;
  totalPeopleWeight:number=0;
  saveupdate: string;
  userId: number;
  totalKpi: number;
  isSavebtn: boolean;
  kpid: number;
  isSubmitted: boolean = false;
  ngOnInit() {
    this.createEmployeeForm();
    this.empCode = AuthService.getLoggedEmpCode();
    this.getEmployeeCode();
    this.companyId = AuthService.getLoggedCompanyId();
    this.userId = AuthService.getLoggedUserId();
    this.getYear();
    this.empWiseKpiBusinessFormList = this.formbuilder.array([]);
    this.empWiseKpiPeopleFormList = this.formbuilder.array([]);
    this.saveupdate = "Save";
    this.totalKpi = 0;
    this.isSavebtn = true;

  }
  getEmployeeCode() {
    this.empService.getEmpByBoss(this.empCode).subscribe((response: ApiResponse) => {
      if (response.status) {
        this.empCodes = response.result as EmployeeForApprisal[];
      }
    })
  }
  getYear() {
    this.empwisekpiservice.getYear().subscribe((response: ApiResponse) => {
      if (response.status) {
        this.years = response.result as SalaryYear[];
      }
    })
  }
  getQuarter() {
    this.empwisekpiservice.getQuarter(this.formVal.empCode, this.companyId).subscribe((Response: ApiResponse) => {
      if (Response.status) {
        this.quarters = Response.result as QuarterModel[];
      }
    })
  }
  getEmployeeInfo() {
    if (this.formVal.empCode == null || this.formVal.empCode == "") {
      this.toasterservice.error('Please, Fill all required field!');
      return;
    }
    else {
      this.empwisekpiservice.getEmployeeInfo(this.companyId, this.achievementscoreform.value.empCode).subscribe((Response: ApiResponse) => {
        let info = Response.result as EmployeeForApprisal;
        this.achievementscoreform.patchValue({
          empName: info.empName,
          department: info.department,
          designation: info.designation
        })
        this.getYear();
        this.getQuarter();
      })
    }
  }
  getBusinessSumScore(): number {
    let tbScore = 0;
    this.empWiseKpiBusinessFormList.controls.forEach((businessfrm) => {
      tbScore += businessfrm.value.score;
    })
    return tbScore;
  }
  onChangeBusinessScore(rowIndex: number) {
    this.sumBusScore = this.getBusinessSumScore();
    this.totalKpi = this.getBusinessSumScore() + this.getPeolpeSumScore();
  }
  onChangePeopleScore(rowIndex: number) {
    this.sumPeoScore = this.getPeolpeSumScore();
    this.totalKpi = this.getBusinessSumScore() + this.getPeolpeSumScore();
  }
  getPeolpeSumScore(): number {
    let tpScore = 0;
    this.empWiseKpiPeopleFormList.controls.forEach((peoplefrm) => {
      tpScore += peoplefrm.value.score;
    })
    return tpScore;
  }
  onChangeBusinessAchieveScore(rowIndex: number) {
    let weight = this.empWiseKpiBusinessFormList.controls[rowIndex].value.weight;
    let achievmentPercnt = this.empWiseKpiBusinessFormList.controls[rowIndex].value.achievementPerchent;
    let score = (weight * achievmentPercnt) / 100;
    this.empWiseKpiBusinessFormList.controls[rowIndex].patchValue({ score: score });
    let kpiname = this.empWiseKpiBusinessFormList.controls[rowIndex].value.kpiName;
    if (score > weight && kpiname != 'Achieve AOP Sales Volume in Case') {
      this.empWiseKpiBusinessFormList.controls[rowIndex].patchValue({ score: weight })
    }
    this.onChangeBusinessScore(rowIndex);
  }
  onChangePeopleAchieveScore(row: number) {
    let weight = this.empWiseKpiPeopleFormList.controls[row].value.weight;
    let achievmentPercnt = this.empWiseKpiPeopleFormList.controls[row].value.achievementPerchent;
    let score = (weight * achievmentPercnt) / 100;
    if(score>weight){
      this.empWiseKpiPeopleFormList.controls[row].patchValue({score:weight})
    }else{
    this.empWiseKpiPeopleFormList.controls[row].patchValue({ score: score });
    }
    this.onChangePeopleScore(row);
  }
  show() {
    this.isSubmitted = true;
    if (this.formVal.empCode == null || this.formVal.year == null || this.formVal.quarter == null
      || this.formVal.empCode == "" || this.formVal.year == "" || this.formVal.quarter == "") {
      this.toasterservice.error('Please, Fill all required field!');
      return;
    } else {
      this.empwisekpiservice.getBusinessForAchievement(this.formVal.empCode, this.formVal.year, this.formVal.quarter, this.companyId).subscribe((response: ApiResponse) => {
        if (response.status) {
          this.KpiBusinessResult = response.result as KpiSetupModel[];
          this.sumBusScore = 0;
          this.totalBusinessWeight=0;
          this.empWiseKpiBusinessFormList = this.formbuilder.array([]);
          let i = 0;
          this.KpiBusinessResult.forEach(item => {
            if (item.achieveID > 0) { this.saveupdate = 'Update'; } else { this.saveupdate = 'Save'; }
            this.kpid = item.id;
            this.achievementscoreform.patchValue({ empComment: item.empComment });
            this.empWiseKpiBusinessFormList.push(new FormGroup({
              id: new FormControl(item.achieveID),
              empId: new FormControl(item.empId, []),
              kpiName: new FormControl(item.kpiName, []),
              targets: this.formbuilder.array([]),
              weight: new FormControl(item.weight),
              kpiType: new FormControl(item.kPIType),
              achievements: this.formbuilder.array([]),
              achievementPerchent: new FormControl(item.achievmentPercnt),
              score: new FormControl(item.score),
              comment: new FormControl(item.comment),
              isFinal: new FormControl(item.isFinal)
            }))
            this.sumBusScore += item.score;
            this.totalBusinessWeight+=item.weight;
            if (item.target.split('*').length == 0) {
              this.addTarget(i, 1, item.target);
              this.addAchievement(i, 1, null)
            } else {
              let acievement = item.achievement?item.achievement.split('*'):[];
              let x = 0;
              item.target.split('*').forEach(val => {
                this.addTarget(i, 1, val);
                this.addAchievement(i, 1, acievement[x])
                x++;
              })
            }
            i = i + 1;
          })
        }
        else {
          this.toasterservice.error(response.result, 'Failed!');
          this.empWiseKpiBusinessFormList = this.formbuilder.array([]);
        }
      });
      this.empwisekpiservice.getPeolpeForAchievement(this.formVal.empCode, this.formVal.year, this.formVal.quarter, this.companyId).subscribe((response: ApiResponse) => {
        if (response.status) {
          this.KpiPeopleResult = response.result as KpiSetupModel[];
          this.sumPeoScore = 0;
          this.totalPeopleWeight=0;
          this.empWiseKpiPeopleFormList = this.formbuilder.array([]);
          let j = 0;
          this.KpiPeopleResult.forEach(item => {
            if (item.quarterId == this.formVal.quarter) {
              if (item.isFinal == 1) { this.isSavebtn = true; } else { this.isSavebtn = false; }
            } else { this.isSavebtn = false; }

            this.empWiseKpiPeopleFormList.push(new FormGroup({
              id: new FormControl(item.achieveID),
              empId: new FormControl(item.empId, []),
              kpiName: new FormControl(item.kpiName, []),
              targets: this.formbuilder.array([]),
              weight: new FormControl(item.weight),
              kpiType: new FormControl(item.kPIType),
              achievements: this.formbuilder.array([]),
              achievementPerchent: new FormControl(item.achievmentPercnt),
              score: new FormControl(item.score),
              comment: new FormControl(item.comment),
              isFinal: new FormControl(item.isFinal)
            }))
            this.sumPeoScore += item.score;
            this.totalPeopleWeight+=item.weight;
            if (item.target.split('*').length == 0) {
              this.addTarget(j, 2, item.target);
              this.addAchievement(j, 2, null)
            } else {
              let acievement = item.achievement?item.achievement.split('*'):[];
              let y = 0;
              item.target.split('*').forEach(val => {
                this.addTarget(j, 2, val);
                this.addAchievement(j, 2, acievement[y])
                y++;
              })
            }
            j = j + 1;
          })
          return this.totalKpi = this.getBusinessSumScore() + this.getPeolpeSumScore();
        }
        else {
          this.toasterservice.error(response.result, 'Failed!');
          this.empWiseKpiPeopleFormList = this.formbuilder.array([]);
        }
      });
    }

  }
  saveUpdateKpi() {
    this.isSubmitted = true;
    if (this.achievementscoreform.invalid) {
      this.toasterservice.error('Invalid Submission!','Please, Fill all required field!');
      return;
    }
    if(this.totalBusinessWeight<70 || this.totalBusinessWeight>80){
      this.toasterservice.error('Total business weight must be 70-80');
      return;
    }
    if(this.totalPeopleWeight<20 || this.totalPeopleWeight>30){
      this.toasterservice.error('Total people weight must be 70-80');
      return;
    }
    else {

      let emp = this.achievementscoreform.value;
      let empWiseKpiList: KpiScoreAchievement[] = []
      this.empWiseKpiBusinessFormList.controls.forEach(
        (businessForm: FormGroup) => {
          let empWiseBusinessKpi = new KpiScoreAchievement();
          empWiseBusinessKpi.id = businessForm.value.id;
          empWiseBusinessKpi.empCode = emp.empCode;
          empWiseBusinessKpi.empKpiId = businessForm.value.empId;
          empWiseBusinessKpi.achievement = businessForm.value.achievements.filter(c=>c.achievement!=null).map(c=>c.achievement).join('*');
          empWiseBusinessKpi.achievementPerchent = businessForm.value.achievementPerchent;
          empWiseBusinessKpi.score = businessForm.value.score;
          empWiseBusinessKpi.comment = businessForm.value.comment;
          empWiseBusinessKpi.empComment = emp.empComment;
          empWiseBusinessKpi.yearId = emp.year;
          empWiseBusinessKpi.quarterId = emp.quarter;
          empWiseBusinessKpi.companyId = this.companyId;
          empWiseBusinessKpi.userId = this.userId;
          empWiseBusinessKpi.isFinal = businessForm.value.isFinal
          empWiseKpiList.push(empWiseBusinessKpi);
        }
      )
      this.empWiseKpiPeopleFormList.controls.forEach(
        (peopleForm: FormGroup) => {
          let empWisePeopleKpi = new KpiScoreAchievement();
          empWisePeopleKpi.id = peopleForm.value.id;
          empWisePeopleKpi.empCode = emp.empCode;
          empWisePeopleKpi.empKpiId = peopleForm.value.empId;
          empWisePeopleKpi.achievement = peopleForm.value.achievements.filter(c=>c.achievement!=null).map(c=>c.achievement).join('*');
          empWisePeopleKpi.achievementPerchent = peopleForm.value.achievementPerchent;
          empWisePeopleKpi.score = peopleForm.value.score;
          empWisePeopleKpi.comment = peopleForm.value.comment;
          empWisePeopleKpi.empComment = emp.empComment;
          empWisePeopleKpi.yearId = emp.year;
          empWisePeopleKpi.quarterId = emp.quarter;
          empWisePeopleKpi.companyId = this.companyId;
          empWisePeopleKpi.userId = this.userId;
          empWisePeopleKpi.isFinal = peopleForm.value.isFinal;
          empWiseKpiList.push(empWisePeopleKpi);
        }
      )
      this.empwisekpiservice.saveAchievementScore(empWiseKpiList).subscribe((res: ApiResponse) => {
        if (res.status) {
          this.toasterservice.success("Achievement Score setup Successfully.", "Success");
          this.saveupdate = "Save";
          this.show();
        } else {
          this.toasterservice.error(res.result, "Something is not ok..");
        }
      })
    }
  }

  createEmployeeForm() {
    this.achievementscoreform = this.formbuilder.group({
      id: [0, []],
      empCode: [, Validators.required],
      empName: [, []],
      department: [, []],
      designation: [, []],
      year: [, Validators.required],
      quarter: [, Validators.required],
      empComment: [, [Validators.required]]
    })
  }
  resetKpi() {
    this.empWiseKpiBusinessFormList = this.formbuilder.array([]);
    this.empWiseKpiPeopleFormList = this.formbuilder.array([]);
    this.achievementscoreform.reset();
    this.saveupdate = 'Save';
    this.sumBusScore = 0;
    this.sumPeoScore = 0;
    this.totalKpi = 0;
  }
  get formVal() {
    return this.achievementscoreform.value;
  }

  getTargets(rowIndex: number, kpiType: number): FormArray {
    if (kpiType == 1) {
      return this.empWiseKpiBusinessFormList.at(rowIndex).get("targets") as FormArray
    }
    if (kpiType == 2) {
      return this.empWiseKpiPeopleFormList.at(rowIndex).get("targets") as FormArray
    }
  }
  newTarget(value = null): FormGroup {
    return this.formbuilder.group({
      target: new FormControl(value),
    })
  }
  addTarget(index: number, kpiType, value = null) {
    this.getTargets(index, kpiType).push(this.newTarget(value));
  }
  removeTarget(rowIndex: number, targetIndex: number, kpiType) {
    this.getTargets(rowIndex, kpiType).removeAt(targetIndex);
  }

  getAchievements(rowIndex: number, kpiType: number): FormArray {
    if (kpiType == 1) {
      return this.empWiseKpiBusinessFormList.at(rowIndex).get("achievements") as FormArray
    }
    if (kpiType == 2) {
      return this.empWiseKpiPeopleFormList.at(rowIndex).get("achievements") as FormArray
    }
  }
  newAchievement(value = null): FormGroup {
    return this.formbuilder.group({
      achievement: new FormControl(value),
    })
  }
  addAchievement(index: number, kpiType, value = null) {
    this.getAchievements(index, kpiType).push(this.newAchievement(value));
  }
  removeAchievement(rowIndex: number, targetIndex: number, kpiType) {
    this.getAchievements(rowIndex, kpiType).removeAt(targetIndex);
  }
}
