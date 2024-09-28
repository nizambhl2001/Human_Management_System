import { AuthService } from './../../../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { ApprisalService } from '../../../services/Apprisal/apprisal.service';
import { FormBuilder, FormGroup, FormArray, Validators, FormControl } from '@angular/forms';
import { EmployeeForApprisal } from '../../../models/Apprisal/employee-for-apprisal';
import { SalaryYear } from '../../../models/SalarySetup/salary-year';
import { QuarterModel } from '../../../models/Apprisal/quarter-model';
import { KpiSetupModel } from '../../../models/Apprisal/kpisetup';
import { ApiResponse } from '../../../models/response.model';
import { KpiScoreAchievement } from '../../../models/Apprisal/kpi-score-achievement';

@Component({
  selector: 'app-apprisalbyboss',
  templateUrl: './apprisalbyboss.component.html',
  styleUrls: ['./apprisalbyboss.component.scss', '../../../../vendor/libs/ng-select/ng-select.scss']
})
export class ApprisalbybossComponent implements OnInit {

  constructor(
    private formbuilder: FormBuilder,
    private empwisekpiservice: ApprisalService,
    private toasterservice: ToastrService
  ) { }
  achievementbybossform: FormGroup;
  //empCommentForm:FormGroup;
  empCode: string;
  empWiseAchievementList: EmployeeForApprisal[] = [];
  years: SalaryYear[] = [];
  quarters: QuarterModel[] = [];
  companyId: number;
  empWiseKpiBusinessFormList: FormArray;
  empWiseKpiPeopleFormList: FormArray;
  KpiBusinessResult: KpiSetupModel[] = [];
  KpiPeopleResult: KpiSetupModel[] = [];
  sumBusScore: number;
  totalBusinessWeight: number = 0;
  sumPeoScore: number;
  totalPeopleWeight: number = 0;
  saveupdate: string;
  userId: number;
  totalKpi: number;
  isSavebtn: boolean;
  kpid: number;
  isCollapsed: boolean;
  isSubmitted: boolean = false;
  isFinal:boolean = false;
  ngOnInit() {
    this.createEmployeeForm();
    this.empCode = AuthService.getLoggedEmpCode();
    this.getAllquarter();
    this.companyId = AuthService.getLoggedCompanyId();
    this.userId = AuthService.getLoggedUserId();
    this.getYear();
    this.empWiseKpiBusinessFormList = this.formbuilder.array([]);
    this.empWiseKpiPeopleFormList = this.formbuilder.array([]);
    this.saveupdate = "Save";
    this.totalKpi = 0;
    this.isSavebtn = true;
    this.isCollapsed = true;
  }
  saveUpdateKpi() {
    this.isSubmitted = true;
    if (this.achievementbybossform.invalid) {
      this.toasterservice.error('Invalid Submission','Please, Fill all required field!');
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
      let emp = this.achievementbybossform.value;
      let empWiseKpiList: KpiScoreAchievement[] = []
      this.empWiseKpiBusinessFormList.controls.forEach(
        (businessForm: FormGroup) => {
          let empWiseBusinessKpi = new KpiScoreAchievement();
          empWiseBusinessKpi.id = businessForm.value.id;
          empWiseBusinessKpi.empCode = emp.empCode;
          empWiseBusinessKpi.empKpiId = businessForm.value.empId;
          empWiseBusinessKpi.quarterId = emp.quarter;
          empWiseBusinessKpi.yearId = emp.year;
          empWiseBusinessKpi.achievement = businessForm.value.achievements.filter(c => c.achievement != null).map(c => c.achievement).join('*');
          empWiseBusinessKpi.score = businessForm.value.score;
          empWiseBusinessKpi.comment = businessForm.value.comment;
          empWiseBusinessKpi.companyId = this.companyId;
          empWiseBusinessKpi.userId = this.userId;
          empWiseBusinessKpi.manComment = emp.manComment;
          empWiseBusinessKpi.tit=emp.tit;
          if (emp.isApproved == true) {
            empWiseBusinessKpi.isFinal = 1;
          } else {
            empWiseBusinessKpi.isFinal = 0;
          }

          empWiseBusinessKpi.noOfIncrement = emp.noOfIncreament;
          if (emp.isPromotion == true) {
            empWiseBusinessKpi.isPromotion = 1;
          }
          else {
            empWiseBusinessKpi.isPromotion = 0;
          }
          empWiseBusinessKpi.achievementPerchent = businessForm.value.achievementPerchent;
          empWiseKpiList.push(empWiseBusinessKpi);
        }
      )
      this.empWiseKpiPeopleFormList.controls.forEach(
        (peopleForm: FormGroup) => {
          let empWisePeopleKpi = new KpiScoreAchievement();
          empWisePeopleKpi.id = peopleForm.value.id;
          empWisePeopleKpi.empCode = emp.empCode;
          empWisePeopleKpi.empKpiId = peopleForm.value.empId;
          empWisePeopleKpi.quarterId = emp.quarter;
          empWisePeopleKpi.yearId = emp.year;
          empWisePeopleKpi.achievement = peopleForm.value.achievements.filter(c => c.achievement != null).map(c => c.achievement).join('*');
          empWisePeopleKpi.score = peopleForm.value.score;
          empWisePeopleKpi.comment = peopleForm.value.comment;
          empWisePeopleKpi.companyId = this.companyId;
          empWisePeopleKpi.userId = this.userId;
          empWisePeopleKpi.manComment = emp.manComment;
          empWisePeopleKpi.tit=emp.tit
          if (emp.isApproved == true) {
            empWisePeopleKpi.isFinal = 1;
          } else {
            empWisePeopleKpi.isFinal = 0;
          }

          empWisePeopleKpi.noOfIncrement = emp.noOfIncreament;
          if (emp.isPromotion == true) {
            empWisePeopleKpi.isPromotion = 1;
          }
          else {
            empWisePeopleKpi.isPromotion = 0;
          }
          empWisePeopleKpi.achievementPerchent = peopleForm.value.achievementPerchent;
          empWiseKpiList.push(empWisePeopleKpi);
        }
      )
      console.log(empWiseKpiList);
      this.empwisekpiservice.updateAchievementScore(empWiseKpiList).subscribe((res: ApiResponse) => {
        if (res.status) {
          this.toasterservice.success("Achievement Score setup Successfully.", "Success");
          this.showAllScoreAchievement();
        } else {
          this.toasterservice.error(res.result, "Error Occured");
        }
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
    if (score > weight) {
      this.empWiseKpiPeopleFormList.controls[row].patchValue({ score: weight })
    } else {
      this.empWiseKpiPeopleFormList.controls[row].patchValue({ score: score });
    }
    this.onChangePeopleScore(row);

  }

  empEditForBossAgree(empCode: string) {
    this.isFinal = this.empWiseAchievementList.some(c=>c.empCode==empCode && c.apprisal=='Final');
    this.empwisekpiservice.getSingleEmployeeInfo(this.companyId, empCode).subscribe((response: ApiResponse) => {
      this.achievementbybossform.patchValue(response.result);
      this.showAllScoreAchievement();
    })
  }
  showAllScoreAchievement() {

    this.empwisekpiservice.getBusinessForAchievement(this.frmval.empCode, this.frmval.year, this.frmval.quarter, this.companyId).subscribe((response: ApiResponse) => {
      if (response.status) {
        this.KpiBusinessResult = response.result as KpiSetupModel[];
        this.sumBusScore = 0;
        this.totalBusinessWeight = 0;
        this.empWiseKpiBusinessFormList = this.formbuilder.array([]);
        let i = 0;
        this.KpiBusinessResult.forEach(item => {
          if (item.achieveID > 0) { this.saveupdate = 'Update'; } else { this.saveupdate = 'Save'; }
          this.kpid = item.id;
          this.achievementbybossform.patchValue({ empComment: item.empComment });
          this.achievementbybossform.patchValue({ manComment: item.manComment });
          this.achievementbybossform.patchValue({ noOfIncreament: item.noOfIncrement });
          this.achievementbybossform.patchValue({ tit: item.tit });
          if (item.isFinal == 1) {
            this.achievementbybossform.patchValue({ isApproved: true });
            this.isSavebtn = true;
          }
          else {
            this.achievementbybossform.patchValue({ isApproved: false });
            this.isSavebtn = false;
          }
          if (item.isPromotion == 1) {
            this.achievementbybossform.patchValue({ isPromotion: true });
          }
          else {
            this.achievementbybossform.patchValue({ isPromotion: false });
          }
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
          this.totalBusinessWeight += item.weight;
          if (item.target.split('*').length == 0) {
            this.addTarget(i, 1, item.target);
            this.addAchievement(i, 1, null)
          } else {
            let acievement = item.achievement ? item.achievement.split('*') : [];
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
    this.empwisekpiservice.getPeolpeForAchievement(this.frmval.empCode, this.frmval.year, this.frmval.quarter, this.companyId).subscribe((response: ApiResponse) => {
      if (response.status) {

        this.KpiPeopleResult = response.result as KpiSetupModel[];
        this.sumPeoScore = 0;
        this.totalPeopleWeight = 0;
        this.empWiseKpiPeopleFormList = this.formbuilder.array([]);
        let j = 0;
        this.KpiPeopleResult.forEach(item => {
          if (item.quarterId == this.frmval.quarter) {
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
            isFinal: new FormControl(item.isFinal),
            tit:new FormControl(item.tit)
          }))
          this.sumPeoScore += item.score;
          this.totalPeopleWeight += item.weight;
          if (item.target.split('*').length == 0) {
            this.addTarget(j, 2, item.target);
            this.addAchievement(j, 2, null)
          } else {
            let acievement = item.achievement ? item.achievement.split('*') : [];
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
  show() {
    this.isSubmitted = true;
    if (this.frmval.quarter == null || this.frmval.year == null
      || this.frmval.quarter == "" || this.frmval.year == "") {
      this.toasterservice.error('Please, Fill all required field!');
      return;
    } else {
      this.isSubmitted = false;
      if (this.frmval.isChecked == true) {
        this.empwisekpiservice.getAllEmpForAgreeScore(this.frmval.quarter, this.frmval.year, this.empCode)
          .subscribe((response: ApiResponse) => {
            if (response.result.length > 0) {
              this.empWiseAchievementList = response.result as EmployeeForApprisal[];
            }
            else {
              this.toasterservice.error('No record found.');
              this.clear();
              return;
            }
          })
      }
      else {
        this.empwisekpiservice.getEmpForAgreeScore(this.frmval.quarter, this.frmval.year, this.empCode).subscribe((response: ApiResponse) => {
          if (response.result.length > 0) {
            this.empWiseAchievementList = response.result as EmployeeForApprisal[];
          }
          else {
            this.toasterservice.error('No record found');
            this.clear();
            return;
          }
        })
      }
    }
  }
  clear() {
    let selectedYear = this.achievementbybossform.value.year;
    let selectedQuarter = this.achievementbybossform.value.quarter;
    this.achievementbybossform = this.formbuilder.group({
      id: [0, []],
      empCode: ['', []],
      empName: ['', []],
      department: ['', []],
      designation: ['', []],
      year: [selectedYear, Validators.required],
      quarter: [selectedQuarter, Validators.required],
      empComment: ['', []],
      manComment: ['', []],
      isChecked: ['', []],
      noOfIncreament: ['', []],
      isPromotion: ['', []],
      isApproved: ['', []],
      tit:['',[]]
    })
    this.empWiseAchievementList = [];
    this.sumBusScore = 0;
    this.sumPeoScore = 0;
    this.totalKpi = 0;
    this.empWiseKpiBusinessFormList = this.formbuilder.array([]);
    this.empWiseKpiPeopleFormList = this.formbuilder.array([]);
    this.isSubmitted = false;
  }
  resetKpi() {
    this.achievementbybossform.reset();
    this.empWiseAchievementList = [];
    this.sumBusScore = 0;
    this.sumPeoScore = 0;
    this.totalKpi = 0;
    this.empWiseKpiBusinessFormList = this.formbuilder.array([]);
    this.empWiseKpiPeopleFormList = this.formbuilder.array([]);
    this.isSubmitted = false;
    this.saveupdate = "Save";
    this.isSavebtn = true;
  }
  getYear() {
    this.empwisekpiservice.getYear().subscribe((response: ApiResponse) => {
      if (response.status) {
        this.years = response.result as SalaryYear[];
      }
    })
  }
  getAllquarter() {
    this.empwisekpiservice.getAllQuarter().subscribe((response: ApiResponse) => {
      if (response.status) {
        this.quarters = response.result as QuarterModel[];
      }
    })
  }
  visiblePromotion() {

    if (this.frmval.quarter == 4 || this.frmval.quarter == 6) {
      this.isCollapsed = false;
    }
    else {
      this.isCollapsed = true;
    }
  }
  createEmployeeForm() {
    this.achievementbybossform = this.formbuilder.group({
      id: [0, []],
      empCode: [, Validators.required],
      empName: [, []],
      department: [, []],
      designation: [, []],
      year: [, Validators.required],
      quarter: [, Validators.required],
      empComment: [, []],
      manComment: [, [Validators.required]],
      isChecked: [true, []],
      noOfIncreament: [, []],
      isPromotion: [, []],
      isApproved: [, []],
      tit:[,[]],
    })
  }
  get frmval() {
    return this.achievementbybossform.value;
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

  onKeyEnter(event) {
    if (event != null) {
      event.preventDefault();
    }
  }
}
