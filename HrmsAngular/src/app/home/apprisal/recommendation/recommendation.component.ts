import { AuthService } from './../../../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { ApprisalService } from '../../../services/Apprisal/apprisal.service';
import { ToastrService } from 'ngx-toastr';
import { SalaryYear } from '../../../models/SalarySetup/salary-year';
import { ApiResponse } from '../../../models/response.model';
import { EmployeeForApprisal } from '../../../models/Apprisal/employee-for-apprisal';
import { Recommendation } from '../../../models/Apprisal/recommendation';
import { NgbDateCustomParserFormatter } from '../../../shared/dateformat';
import { AppService } from '../../../app.service';
import { EmployeeService } from '../../../services/hr/employee.service';
import { CompanyTransferService } from '../../../services/hr/company-transfer.service';
import { EmpCompanyTransfer } from '../../../models/hr/emp-company-transfer.model';
import { SalaryGradeModel } from '../../../models/system-setup/salary-grader.model';
import { SalaryGradeService } from '../../../services/system-setup/slary-grade.service';

@Component({
  selector: 'app-recommendation',
  templateUrl: './recommendation.component.html',
  styleUrls: ['./recommendation.component.scss', '../../../../vendor/libs/ng-select/ng-select.scss']
})
export class RecommendationComponent implements OnInit {
  //formbuilder: any;
  allSalaryGrade: SalaryGradeModel[] = [];
  companyTransfer: EmpCompanyTransfer = new EmpCompanyTransfer();
  constructor(
    private formbuilder: FormBuilder,
    private empwisekpiservice: ApprisalService,
    private empService:EmployeeService,
    private toasterservice: ToastrService,
    private salaryGradeES: SalaryGradeService,
    private companyTransferES: CompanyTransferService,
    private dateFormate:NgbDateCustomParserFormatter,
  ) { }
  recommendationform: FormGroup;
  isSavebtn:boolean=false;
  saveupdate:string='Save';
  years: SalaryYear[] = [];
  empCode: string;
  isApprove:boolean;
  empCodes: EmployeeForApprisal[] = [];
  companyId:number;
  userId:number;
  isCollapsed: boolean;
  isSubmitted:boolean=false;
  scores:Recommendation[]=[];
  employees:EmployeeForApprisal[]=[];
  promotions:any[]=['Yes','No'];
  ngOnInit() {
    //this.isCollapsed=true;
    this.isApprove=false;
    this.createEmployeeForm();
    this.saveupdate='Save';
    this.getYear();
    this.empCode=AuthService.getLoggedEmpCode();
    this.getEmployeeCode();
    this.companyId=AuthService.getLoggedCompanyId();
    this.userId=AuthService.getLoggedUserId();
  }
  show(){
    this.getEmployeeInfo();
    this.getScore();
    this.getAllEmployee();
    this.getEmpGrade();
    this.AllSalaryGrade();
    this.getProDate();
    //this.getavarageScore();
  }
  getEmpGrade(){
    this.companyTransferES.getEmploymentSalaryDetails(this.frmval.empCode,this.companyId).subscribe((response:ApiResponse)=>{
      if(response.status){
       this.companyTransfer = response.result as EmpCompanyTransfer;
       this.recommendationform.controls.payscale.setValue(this.companyTransfer.prePayscaleGrade);
       //this.recommendationform.controls.transferDate.setValue(this.dateFormate.stringToNgbDate(this.companyTransfer.transferDate.toString()));
  }
  else{
  }
  })
  }
  getProDate(){
    this.companyTransferES.getCompanyTransfer(this.frmval.empCode,this.companyId,2).subscribe((response:ApiResponse)=>{
      if(response.status){
        this.companyTransfer=response.result as EmpCompanyTransfer;
        this.recommendationform.controls.transferDate.setValue(this.dateFormate.stringToNgbDate(this.companyTransfer.transferDate.toString()));

      }
      else{
        this.recommendationform.controls.transferDate.setValue(null);
      }
    })
  }
  AllSalaryGrade() {
    this.salaryGradeES.GetSalaryGrade().subscribe((response: ApiResponse) => {
      if (response.status) {
        this.allSalaryGrade = response.result as SalaryGradeModel[];
      }
    })
  }
    getEmployeeInfo(){
      this.isSubmitted=true;
      if(this.frmval.empCode==null||this.frmval.empCode==''||
      this.frmval.year==null||this.frmval.year=='')
      {
        this.toasterservice.error('Please fill all required field', 'Invalid Action!');
        return;
      }
      else {
      this.empwisekpiservice.getEmpInfo(this.companyId,this.frmval.empCode,this.frmval.year).subscribe((response:ApiResponse)=>{
        if(response.status){
          let emp=response.result as Recommendation;
          if(emp.isApprove==1){
            this.isApprove=true;
          }
          else{
            this.isApprove=false;
          }
          if(emp.id>0){this.saveupdate='Update';}else{this.saveupdate='Save';}
          this.recommendationform.patchValue({
            id:emp.id,
            empName:emp.empName,
            department:emp.department,
            designation:emp.designation,
            joinDate:this.dateFormate.stringToNgbDate(emp.joinDate.toString()),
            //transferDate: this.dateFormate.stringToNgbDate(emp.transferDate.toString()),//emp.transferDate,
            lastYearNoOfIncr:emp.noofIncreament,
            noofincreament:emp.noofIncreament,
            promotion:emp.promotionType,
            comments:emp.recoComments,
            avgscore:emp.avgScore,
            presentScore:emp.presentScore,
            lyrecommendation:emp.manComment,
            grossSalary:emp.grossSalary,
          })
        }
      })
    }
  }
  getavarageScore(){
    this.empwisekpiservice.getAvarageScore(16,this.frmval.empCode).subscribe((response:ApiResponse)=>{
      if(response.status){
        this.scores=response.result as Recommendation[];
      }
    })
  }
  getScore(){
    this.isSubmitted=true;
    if(this.frmval.empCode==null||this.frmval.empCode==''||
    this.frmval.year==null||this.frmval.year=='')
    {
      this.toasterservice.error('Please fill all required field', 'Invalid Action!');
      return;
    }
    else {
      this.empwisekpiservice.getEmpApprisalHistory(this.companyId,this.frmval.empCode,this.frmval.year).subscribe((response:ApiResponse)=>{
        this.scores=response.result as Recommendation[];
      })
    }
  }
  getAllEmployee(){
    this.isSubmitted=true;
    if(this.frmval.year==null||this.frmval.year=='')
    {
      this.toasterservice.error('Please fill all required field', 'Invalid Action!');
      return;
    }
    else {
      this.empwisekpiservice.getAgreeStatusForRecommendation(this.frmval.year,this.empCode).subscribe((response:ApiResponse)=>{
        this.employees=response.result as EmployeeForApprisal[];
      })
    }

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
  saveUpdateKpi(){
    this.isSubmitted=true;
    if(this.frmval.empCode==null||this.frmval.empCode==''||
    this.frmval.year==null||this.frmval.year=='')
    {
      this.toasterservice.error('Please fill all required field', 'Invalid Action!');
      return;
    }
    else {
      if(this.recommendationform.controls.isApprove.value==true){
        this.recommendationform.controls.isApprove.setValue(1);
      }
      let rec=this.frmval;
      let emp=new Recommendation();
      emp.id=rec.id;
      emp.empCode=rec.empCode;
      emp.yearId=rec.year;
      emp.noofIncreament=rec.noofincreament;
      emp.promotionType=rec.promotion;
      emp.recoComments=rec.comments;
      emp.companyId=this.companyId;
      emp.userId=this.userId;
      emp.isApprove=rec.isApprove;
      this.empwisekpiservice.SaveEmpRecommendation(emp).subscribe((response:ApiResponse)=>{
        if(response.status){
          this.toasterservice.success(this.saveupdate + " Successfully.", "Success");
          this.show();
        }
        else {
          this.toasterservice.error(response.result, "Something is not ok..");
        }
      })
    }
  }
  get frmval(){
    return this.recommendationform.value;
  }
  reset(){
   this.isSubmitted=false;
   this.recommendationform.reset();
   this.scores=[];
   this.employees=[];
   this.saveupdate="Save";
   this.isApprove=false;
  }
  get f(){
    return this.recommendationform.controls;
  }
  createEmployeeForm() {
    this.recommendationform = this.formbuilder.group({
      id: [0, []],
      empCode: [, Validators.required],
      empName: [, []],
      department: [, []],
      designation: [, []],
      year: [, Validators.required],
      quarter: [, Validators.required],
      payscale:[,[]],
      lyrecommendation:[,[]],
      noofincreament:[,[]],
      prePayscaleGrade:[,[]],
      comments:[,[]],
      promotion:[,[]],
      avgscore:[,[]],
      grossSalary:[,[]],
      presentScore:[,[]],
      transferDate:[,[]],
      joinDate:[,[]],
      isApprove:[,[]],
      lastYearNoOfIncr:[,[]]
    })
  }

}
