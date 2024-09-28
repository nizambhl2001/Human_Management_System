import { FormBuilder, FormGroup } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { EmployeeService } from '../../services/hr/employee.service';
import { AuthService } from '../../services/auth.service';
import { NgbDateCustomParserFormatter } from '../../shared/dateformat';
import { Chart } from 'chart.js';
import { BasicEntry } from '../../models/system-setup/basic-entry.model';
import { BasicEntryService } from '../../services/system-setup/basic-entry.service';
import { ApiResponse } from '../../models/response.model';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['../../../vendor/libs/ngx-perfect-scrollbar/ngx-perfect-scrollbar.scss', './dashboard.scss', '../../../vendor/libs/ng-select/ng-select.scss']
})
export class DashboardComponent implements OnInit {

  dasboardform: FormGroup;
  allProject: BasicEntry[] = [];
  compId: number;
  employeeCounts: any[] = [];
  leaveCounts: any[] = [];
  absentCounts: any[] = [];
  totalleavePending: any[] = [];
  totalWeekend: any[] = [];
  getAllLateComer: any[] = [];
  allItemDepartment: any[] = [];
  allItemBranch: any[] = [];
  allItem: any[] = [];
  empDatailsToday: any[] = [];
  reportingBoss: any[] = [];
  reporting: any[] = [];
  reportingSearch:any[]=[];
  reportingSearchTotal:any[]=[];
  supervisor: any[] = [];
 Year(){
    const date = new Date();
    let yyy = date.getDay() +' '+ date.getMonth() +' '+ date.getFullYear();
  };
  today = (new Date()).getDay();
  chart: any;
  horizontalbar: any;
  emp: any;
  empCode: string; 

  loading1: boolean = false;
  leave: boolean = false;
  late: boolean = false;
  ddmmyy: any;

  mMYY:any;

  // SingleDataSet = [this.absentCounts, 30, 20];
  // date:any=this.dateFormat.getYyyymmddToDate;
  constructor(private employeeService: EmployeeService, private formBuilder: FormBuilder, private basicEntryService: BasicEntryService) {
    const date = new Date ;

    const monthName = ['January', 'February','March','April',
    'May', 'June', 'July', 'Augast', 'September', 'October', 'November', 'December']

    let d = date.getDate();
    let dName = date.toLocaleDateString('en-US', {weekday: 'long'});

    let m = (date.getMonth() );
    let y = date.getFullYear();
    this.ddmmyy = dName+' '+d +' '+ monthName[m] +' '+ y;
    this.mMYY= monthName[m] +' '+ y;
   }

  ngOnInit() {
    this.compId = AuthService.getLoggedCompanyId();
    this.empCode = AuthService.getLoggedEmpCode();
    this.userTypeId= AuthService.getLoggedUserTypeId();
    // this.getEmployeeCount();
    // this.getLeaveCount();

    // this.getAbsentCount();
    this.getAllEmployeeHistory();
    this.getAllBasicItems();
    this.getAllDepartmentItems()
    this.getAllBranchItems()
    this.getReportingBoss();
    // this.empDetailsByReportingBoss();


    var employeeCountss
    this.employeeService
      .getEmployeeCount(this.compId)
      .subscribe((result: any) => {
        if (result) {
          employeeCountss = result.result.id
        }
      });

    this.createForm();
    // this.getEmployee(); 
     
  }
 
  getAllBasicItems() {
    this.basicEntryService.getAllBasicItems('Project', this.compId).subscribe((response: ApiResponse) => {
      if (response.status) {
        this.allItem = response.result as BasicEntry[];
        // this.sortBy = 'description';
        // this.sortDesc = false;
        // this.sort(this.allItem);
      }
    })
  }

  getDateToYyyymmdd(date: Date = new Date()): string {
    let yyyymmdd: string;
    yyyymmdd = date.getFullYear().toString() + (date.getMonth()+1 ).toString().padStart(2, '0') + date.getDate().toString().padStart(2, '0')
    return yyyymmdd;
}
  
  // getLeaveCount() {
  //   this.employeeService
  //     .getLeaveCount(this.getDateToYyyymmdd(new Date()))
  //     .subscribe((result: any) => {
  //       if (result) {
  //        this.leaveCounts=result.result.leaveNumber


  //       }
  //     });
  // }


  // getAbsentCount() {
  //   this.employeeService
  //     .getAbsentCount(this.compId,this.getDateToYyyymmdd(new Date()))
  //     .subscribe((result: any) => {
  //       if (result) {
  //        this.absentCounts=result.result.emp;
  //       //  this.getEmployee()
  //       }
  //     });
  // }

// Create variables to store the Chart instance and tooltip element

  getAllEmployeeHistory() { 
    let absents = 0
    let employees = 0
    this.employeeService
      .getAllEmpHis(this.compId,this.getDateToYyyymmdd(new Date()))
      .subscribe((result: any) => {
        if (result) {
          debugger
          this.getAllLateComer = result.result.lates;
          this.absentCounts = result.result.totalAbsent;
          this.totalleavePending = result.result.totalleavePending;
          this.totalWeekend = result.result.totalWeekend;
          absents = result.result.totalAbsent;
          this.employeeCounts = result.result.totalEmp;
          employees = result.result.totalEmp
          this.leaveCounts = result.result.leave;
          let absent = employees - absents;
          let toDayAbsent= employees - absent
 
         if(this.userTypeId==9){
          this.chart = new Chart('canvas', {
            type: 'pie',
            data: {
              labels: ['Total Present', 'Total Leave', 'Attendance Registered', 'Late Today'],
              datasets: [{
               data: [absent, this.leaveCounts, toDayAbsent, this.getAllLateComer],  
                backgroundColor: ['#6994b1', '#5449f1',  '#ff3333', '#660000']
              }]
            },
            options: {
             
              tooltips: {      
                 
                callbacks: {
                  label: function(tooltipItem, data) {
                    const dataset = data.datasets[tooltipItem.datasetIndex];
                    const total = dataset.data.reduce((previousValue, currentValue) => previousValue + currentValue);
                     return `${data.labels[tooltipItem.index]}: ${dataset.data[tooltipItem.index]}`; 
                  },
                  afterLabel: function(tooltipItem, data) {
                    const dataset = data.datasets[tooltipItem.datasetIndex];
                    const currentValue = dataset.data[tooltipItem.index];
                    const total = dataset.data.reduce((previousValue, currentValue) => previousValue + currentValue);
                    const percentage = Math.round((currentValue / employees) * 100);
                    //return `${data.labels[tooltipItem.index]}: ${percentage}%`;
                    return `~${percentage}%`;
                  } ,
 
              }
              },
              title: {
                display: true,
                text: '',
                fontWeight: 'bold',
                fontSize: 18,
              },
              legend: {
                display: false,
              }
            }
          });
         }

         
         else{
          this.chart = new Chart('canvas', {
            type: 'pie',
            data: {
              labels: ['Total Present', 'Total Leave', 'Attendance Registered', 'Late Today'],
              datasets: [{
               data: [this.EmpWisePresent, this.EmpWiseAppprovedLeave, this.EmpWiseAbsent, this.EmpWiseLate],  
                backgroundColor: ['#6994b1', '#5449f1',  '#ff3333', '#660000']
              }]
            },
            options: {
             
              tooltips: {      
                 
                callbacks: {
                  label: function(tooltipItem, data) {
                    const dataset = data.datasets[tooltipItem.datasetIndex];
                    const total = dataset.data.reduce((previousValue, currentValue) => previousValue + currentValue);
                     return `${data.labels[tooltipItem.index]}: ${dataset.data[tooltipItem.index]}`; 
                  },
                  afterLabel: function(tooltipItem, data) {
                    const dataset = data.datasets[tooltipItem.datasetIndex];
                    const currentValue = dataset.data[tooltipItem.index];
                    const total = dataset.data.reduce((previousValue, currentValue) => previousValue + currentValue);
                    const percentage = Math.round((currentValue / employees) * 100);
                    //return `${data.labels[tooltipItem.index]}: ${percentage}%`;
                    return `~${percentage}%`;
                  } ,
 
              }
              },
              title: {
                display: true,
                text: '',
                fontWeight: 'bold',
                fontSize: 18,
              },
              legend: {
                display: false,
              }
            }
          });
         }
        }
      });
  }


 
  getAllEmployeeHistoryProject(project) {
    debugger
    let params = {
      compId: this.compId,
      currentDate: this.getDateToYyyymmdd(new Date()),
      projectID: this.f.projectID.value,
      jobLocation: this.f.jobLocation.value,
      departmentID: this.f.departmentID.value,
      repCode: this.f.empCode.value


    }
    let absents = 0
    let employees = 0
    this.employeeService
      .getAllEmpHisForProject(params)
      .subscribe((result: any) => {
        if (result) {
          debugger
          this.getAllLateComer = result.result.lates;
          this.absentCounts = result.result.totalAbsent;
          this.totalleavePending = result.result.totalleavePending;
          this.totalWeekend = result.result.totalWeekend;
          absents = result.result.totalAbsent;
          this.employeeCounts = result.result.totalEmp;
          employees = result.result.totalEmp
          this.leaveCounts = result.result.leave;
          let absent = employees - absents

if(this.userTypeId==9){
  this.chart = new Chart('canvas', {
    type: 'pie',
    data: {
      labels: ['Total Present', 'total Leave', 'Absent Today', 'Late Today'],
      datasets: [{
        data: [absent, this.leaveCounts, this.absentCounts, this.getAllLateComer],
        backgroundColor: ["#6994b1", "#c9a1da", "#ff3333", "#660000"],

      }]
    },
    options: {
      title: {
        display: true,
        text: '',
        fontWeight: "bold",
        fontSize: 18,
      },
      legend: {
        display: true
      }
    }
  }
  );

}
else{
  this.EmpWiseChart = new Chart('canvas', {
    type: 'pie',
    data: {
      labels: ['Total Present', 'total Leave', 'Absent Today', 'Late Today'],
      datasets: [{
        data: [this.EmpWisePresent, this.EmpWiseAppprovedLeave, this.EmpWiseAbsent, this.EmpWiseLate],
        backgroundColor: ["#6994b1", "#c9a1da", "#ff3333", "#660000"],

      }]
    },
    options: {
      title: {
        display: true,
        text: '',
        fontWeight: "bold",
        fontSize: 18,
      },
      legend: {
        display: true
      }
    }
  }
  );
}
            

        }
      });
  }


  getAllEmpLeaveToday(type: number) {
    this.loading1 = true
    // if(this.f.projectID.value == null  || this.f.jobLocation.value == null || this.f.departmentID.value == null){
    //   this.dasboardform.patchValue({
    //     projectID:-1,
    //     jobLocation:-1,
    //     departmentID:-1
    //   })
    // }else{
    //   this.dasboardform.patchValue({
    //     projectID:this.f.projectID.value,
    //     jobLocation:this.f.jobLocation.value,
    //     departmentID:this.f.departmentID .value
    //   })  
    // }
    let params = {
      compId: this.compId,
      currentDate: this.getDateToYyyymmdd(new Date()),
      type: type,
      projectID: this.f.projectID.value,
      jobLocation: this.f.jobLocation.value,
      departmentID: this.f.departmentID.value


    }
    // this.compId,this.getDateToYyyymmdd(new Date()),type,this.f.projectID.value,this.f.jobLocation.value,this.f.departmentID.value
    this.employeeService.getAllEmpLeaveToday(params).subscribe((result: any) => {
      if (result) {
        this.empDatailsToday = result.result as any[];
        this.loading1 = false;
        if (this.empDatailsToday[0].lsDate != null) {
          this.leave = true;
          this.late = false;
        } else if (this.empDatailsToday[0].login != null) {
          this.leave = false;
          this.late = true;
        } else {
          this.leave = false;
          this.late = false;
        }
      } else {
        this.empDatailsToday = [];
        this.loading1 = false;
      }
    })
  }
userTypeId:number;
EmpWiseAbsent:number;
EmpWiseTotal:number;
EmpWisePresent:number;
EmpWiseLate:number;
EmpWiseAppprovedLeave:number;
EmpWiseChart:any; 
  getReportingBoss() {
    this.employeeService.getReportingBoss(this.compId, this.empCode).subscribe((response: ApiResponse) => {
      if (response.status) {
        this.reportingBoss = response.result as any; 
        this.empDetailsByReportingBoss();
      }
    })
  }
  empDetailsByReportingBoss() {
    if(this.reportingBoss.length == 0){
      this.employeeService.empDetailsBySupervisor(this.getDateToYyyymmdd(new Date()),this.empCode).subscribe((response: ApiResponse) => {
        if (response.status) {
          this.supervisor = response.result as any;
        }
      })
    }else{
      this.employeeService.empDetailsByReportingBoss(this.getDateToYyyymmdd(new Date()),this.empCode).subscribe((response: ApiResponse) => {
        if (response.status) {
          this.reporting = response.result as any; 
          this.reportingSearch = response.result as any; 
          this.reportingSearchTotal=response.result as any;
          this.EmpWiseAbsent = this.reporting.filter(record => record.status === "Absen").length;
          this.EmpWiseTotal= this.reporting.length;
          this.EmpWisePresent=(this.EmpWiseTotal-this.EmpWiseAbsent);
          this.EmpWiseLate=(this.reporting.filter(reco => reco.intime==="Late").length);
          this.EmpWiseAppprovedLeave=this.reporting.filter(re => re.leave==="Leave").length;
        }
      })
    }
    
  }

  getAllBranchItems() {
    this.basicEntryService.getAllBasicItems('branch', this.compId).subscribe((response: ApiResponse) => {
      if (response.status) {
        this.allItemBranch = response.result as BasicEntry[];
      }
    })
  }


  getAllDepartmentItems() {
    this.basicEntryService.getAllBasicItems('Department', this.compId).subscribe((response: ApiResponse) => {
      if (response.status) {
        this.allItemDepartment = response.result as BasicEntry[];
      }
    })
  }

  createForm() {
    this.dasboardform = this.formBuilder.group({
      projectID: [, []],
      jobLocation: [, []],
      departmentID: [, []],
      empCode: [, []],
      empCodeSeacrh:[,[]]
    })
  }

  get formVal() {
    return this.dasboardform.value
  }

  get f() {
    return this.dasboardform.controls
  }
  getEmploymentSearch(event){  
    this.reporting = this.reportingSearch.filter(report => 
      report.empCode.toLowerCase().includes(event) ||
      report.empName.toLowerCase().includes(event)
    );
 
  }

  openempList(item) { 
    if(item==1){ 
      this.reportingSearch=this.reportingSearchTotal;
      this.reporting=this.reportingSearch;  
      return
    } 
    else if(item==2){
      const value = 'Leave'; 
      this.reporting=  [] ;
      this.reportingSearch=this.reportingSearchTotal;
      this.reporting = this.reportingSearch.filter(report => 
        report.status.toLowerCase().includes(value.toLowerCase())  
      ); 
      this.reportingSearch=[]
      this.reportingSearch= this.reporting 
      return  
    }
    else if(item==3){
      const value = 'Absen';
      this.reporting=  [] ;
      this.reportingSearch=this.reportingSearchTotal;
      this.reporting = this.reportingSearch.filter(report => 
        report.status.toLowerCase().includes(value.toLowerCase())  
      );
      this.reportingSearch=[]
      this.reportingSearch= this.reporting 
      return 
    }
    else if(item==4){
      const value = 'Late';  
      this.reporting=  [] ;
      this.reportingSearch=this.reportingSearchTotal;
      this.reporting = this.reportingSearch.filter(report => 
        report.intime.toLowerCase().includes(value.toLowerCase())  
      ); 
      this.reportingSearch=[]
      this.reportingSearch= this.reporting 
      return
    }

    const value = 'present';   
    this.reporting = this.reportingSearch.filter(report => 
      report.status.toLowerCase().includes(value.toLowerCase())  
    ); 
    
  }
  
}
