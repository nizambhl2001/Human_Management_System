import { JobTypeComponent } from './../../system-setup/basic-entry/job-type/job-type.component';
import { AuthService } from './../../../services/auth.service';
import { PersonalInfoModel } from "./../../../models/FlipBook/PersonalInfoModel";
import { ApiResponse } from './../../../models/response.model';
import { EmploymentService } from './../../../services/hr/employment.service';
import { Component, OnInit } from '@angular/core';
import { Helper } from '../../../shared/helper';
import { EmpGenInfo } from '../../../models/hr/emp-gen-info.model';
import { map } from 'rxjs/operators';
import { Employment } from '../../../models/hr/employment.model';
import { PersonalFileService } from '../../../services/hr/persolan-file.service';
import { EducationInfoModel } from "../../../models/FlipBook/edu-info-model";
import { ExpInfoModel } from "../../../models/FlipBook/exp-info-model";
import { JoiningInfoModel } from "../../../models/FlipBook/join-info-model";
import { AwardModel } from "../../../models/FlipBook/award-info-model";
import { TrainingInfoModel } from "../../../models/FlipBook/taining-info-model";
import { RefarenceInfoModel } from "../../../models/FlipBook/refarence-info-model";
import { CompanyTransferService } from "../../../services/hr/company-transfer.service";
import { EmpPromotionViewModel } from "../../../models/hr/emp-promotion-view.model";
import { NimineeInfo } from '../../../models/FlipBook/niminee-info';

@Component({
  selector: 'app-personal-file',
  templateUrl: './personal-file.component.html',
  styleUrls: ['./personal-file.component.scss',
    '../../../../vendor/libs/ng-select/ng-select.scss']
})
export class PersonalFileComponent implements OnInit {
  compId: number;
  selectedEmpCode: string;
  gradeValue: number;
  employees: EmpGenInfo[] = [];
  employment: Employment = new Employment();
  //jobDiscription: Employment = new Employment();
  selectedEmployee: EmpGenInfo = new EmpGenInfo();
  allData: any[] = [];
  nomineeInfo:any[]=[];
  empGenInfo: EmpGenInfo = new EmpGenInfo();
  empFamilyInfo: PersonalInfoModel = new PersonalInfoModel();
  empJoinInfo:JoiningInfoModel=new JoiningInfoModel();
  empNomineeInfo:NimineeInfo[]=[];
  empEduInfo: EducationInfoModel[] = [];
  empExpInfo:ExpInfoModel[]=[];
  empAward:AwardModel[]=[];
  empTraining:TrainingInfoModel[]=[];
  empRefarence:RefarenceInfoModel[]=[];
  alltransferdata:EmpPromotionViewModel[];
  allPromotiondata:EmpPromotionViewModel[];
  constructor(
    private employmentService: EmploymentService,
    private personalFileService: PersonalFileService,
    private companyTransferES: CompanyTransferService,
  ) { }
  ngOnInit() {
    this.compId = AuthService.getLoggedCompanyId();
    this.gradeValue =AuthService.getLoggedGradeValue();
    this.getEmployees();
    Helper.loadScript('https://cdnjs.cloudflare.com/ajax/libs/jquery/3.4.1/jquery.min.js');
    Helper.loadScript('../../../assets/vendor/js/turn.js');
    Helper.loadScript('../../../assets/vendor/js/custom.js');
  }

  getEmployees() {
    this.employmentService.getAllEmpBasicInfo(this.compId, this.gradeValue)
      .pipe(
        map((response: ApiResponse) => {
          let employees: EmpGenInfo[] = [];
          (response.result as EmpGenInfo[]).forEach(emp => {
            emp.empName = emp.empCode + '-' + emp.empName;
            employees.push(emp);
          });
          return employees;
        })
      ).subscribe(employees => {
        this.employees = employees;
      });
  }

  getPersonalFileInfo() {
    this.personalFileService.getPersonalFileInfo(this.selectedEmpCode).subscribe((response: ApiResponse) => {
      if (response.status) {
        this.allData = response.result as any[];
        this.empGenInfo = this.getGenInfo((this.allData[1])[0]);
        this.employment = this.getEmployment((this.allData[1])[0]);
        this.empFamilyInfo = (this.allData[2])[0];
        // this.empNomineeInfo = this.getNomineeInfo((this.allData[2])[0]);
        console.log( this.empGenInfo,' this.empGenInfo');
        console.log( this.allData,' this.allData');
        this.empJoinInfo=(this.allData[4])[0];
        this.empNomineeInfo=this.getNomineeInfo(this.allData[2]);
        console.log("nomineeInfo",this.empNomineeInfo);
        this.employment.jobDescription = this.getJobDescrioption((this.allData[9])[0]);
        this.empEduInfo = this.getEmpEduInfo(this.allData[3]);
        this.empExpInfo=this.getEmpExpInfo(this.allData[5]);
        this.empAward=this.getAwardInfo(this.allData[6]);
        this.empTraining=this.getTrainingInfo(this.allData[7]);
        this.empRefarence=this.getRefarenceInfo(this.allData[8]);
        this.getTransferInfoView();
        this.getPromotionInfoView();
      }
      else {
        this.allData=[];
      }
    })
  }
  getNomineeInfo(nomineeInfo:any[]):NimineeInfo[]{
    let empNominee:NimineeInfo[]=[];
    nomineeInfo.forEach(refarence=>{
      empNominee.push(refarence);
    })
    return empNominee;
  }
  getGenInfo(empInfo: any): EmpGenInfo {
    let empGenInfo = new EmpGenInfo();
    empGenInfo.picture = empInfo.Photo;
    empGenInfo.empCode = empInfo.EmpCode;
    empGenInfo.empName = empInfo.EmpName;
    empGenInfo.email = empInfo.Email;
    empGenInfo.signature=empInfo.Signature
    return empGenInfo;
  }


  getEmployment(employmentInfo: any): Employment {
    let employment = new Employment();
    employment.department = employmentInfo.Department
    employment.designation = employmentInfo.Designation
    employment.gradeValue = employmentInfo.Grade
    employment.location = employmentInfo.Location
    return employment;
  }

  getJobDescrioption(jobInfo: any): string {
    if(jobInfo){
      return jobInfo.Description;
    }
    return '';
  }

  getEmpEduInfo(empEduInfo: any[]): EducationInfoModel[] {
    let empAllEdu: EducationInfoModel[] = [];
    empEduInfo.forEach(item => {
      empAllEdu.push(item)
    })
    return empAllEdu;
  }

  getEmpExpInfo(empExpInfo: any[]):ExpInfoModel[]{
    let empAllExp:ExpInfoModel[]=[];
    empExpInfo.forEach(item=>{
      empAllExp.push(item);
    })
    return empAllExp;
  }

  getAwardInfo(empAwardInfo: any[]):AwardModel[]{
    let empAward:AwardModel[]=[];
    empAwardInfo.forEach(award=>{
      empAward.push(award);
    })
    return empAward;
  }

  getTrainingInfo(empTrainingInfo: any[]):TrainingInfoModel[]{
    let empTraining:TrainingInfoModel[]=[];
    empTrainingInfo.forEach(training=>{
      empTraining.push(training);
    })
    return empTraining;
  }

  getRefarenceInfo(empRefarenceInfo:any[]):RefarenceInfoModel[]{
    let empRefarence:RefarenceInfoModel[]=[];
    empRefarenceInfo.forEach(refarence=>{
      empRefarence.push(refarence);
    })
    return empRefarence;
  }
  getTransferInfoView(){
    this.companyTransferES.getEmpTransforView(this.selectedEmpCode,this.compId,1).subscribe((response:ApiResponse)=>{
      if(response.status){
      this.alltransferdata=response.result as EmpPromotionViewModel[];
      console.log(this.alltransferdata);
      }
      else{
        this.alltransferdata=[];
      }
    })
  }
  getPromotionInfoView(){
    this.companyTransferES.getEmpTransforView(this.selectedEmpCode,this.compId,2).subscribe((response:ApiResponse)=>{
      if(response.status){
    this.allPromotiondata=response.result as EmpPromotionViewModel[];
      }
      else{
        this.allPromotiondata=[];
      }
    })
  }

}
