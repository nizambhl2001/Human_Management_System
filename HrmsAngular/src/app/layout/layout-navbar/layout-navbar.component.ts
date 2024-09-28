import { Helper } from './../../shared/helper';
import { Component, Input, HostBinding, OnInit } from '@angular/core';
import { AppService } from '../../app.service';
import { LayoutService } from '../../layout/layout.service';
import { AuthService } from '../../services/auth.service';
import { TempStorageData } from '../../models/security/client-side-storage.model';
import { AppInfoService } from '../../services/security/app-info.service';
import { map } from 'rxjs/operators';
import { EmpGenInfo } from '../../models/hr/emp-gen-info.model';
import { ApiResponse } from '../../models/response.model';
import { EmploymentService } from '../../services/hr/employment.service'; 
import { EducationInfoModel } from '../../models/FlipBook/edu-info-model';
import { ExpInfoModel } from '../../models/FlipBook/exp-info-model'; 
import { Employment } from '../../models/hr/employment.model'; 
import { PersonalFileService } from '../../services/hr/persolan-file.service';
import { JoiningInfoModel } from '../../models/FlipBook/join-info-model';
import { PersonalInfoModel } from '../../models/FlipBook/PersonalInfoModel';

@Component({
  selector: 'app-layout-navbar',
  templateUrl: './layout-navbar.component.html',
  styles: [':host { display: block; }'],
  styleUrls: ['../../../vendor/libs/angular2-ladda/ladda.scss']
})
export class LayoutNavbarComponent implements OnInit {
  isExpanded = false;
  isRTL: boolean;
  isBackupToday: boolean = false;
  isProcessingBackup: boolean = false;
  gradeName: string;

  @Input() sidenavToggle = true;

  @HostBinding('class.layout-navbar')
  private hostClassMain = true;
  picture: any;
  userName: string;
  loginID: string;
//------------------
compId: number; 
  gradeValue: number;
  employees: EmpGenInfo[] = [];
  employment: Employment = new Employment(); 
  selectedEmployee: EmpGenInfo = new EmpGenInfo();
  allData: any[] = []; 
  empGenInfo: EmpGenInfo = new EmpGenInfo();
  empFamilyInfo: PersonalInfoModel = new PersonalInfoModel();
  empJoinInfo:JoiningInfoModel=new JoiningInfoModel();  


  constructor(private appService: AppService,
    private layoutService: LayoutService,
    private authService: AuthService,
    private appInfoService: AppInfoService,
    private employmentService: EmploymentService, 
    private personalFileService: PersonalFileService, 
    
  ) {
    this.isRTL = appService.isRTL;

  }
  
  ngOnInit() {

    document.addEventListener('click', this.displayHidee.bind(this));
    let isRemember = localStorage.getItem('isRemembered');
    if (isRemember == 'true') {
      this.picture = localStorage.getItem('picture');
      this.userName = localStorage.getItem('userName');
      this.loginID = localStorage.getItem('loginID');
      this.gradeName = Helper.getEmpGradeName(Number(localStorage.getItem('gradeValue')));
    } else {
      this.picture = sessionStorage.getItem('picture');
      this.userName = sessionStorage.getItem('userName');
      this.loginID = sessionStorage.getItem('loginID');
      this.gradeName = Helper.getEmpGradeName(Number(sessionStorage.getItem('gradeValue')))
    }
    this.checkTodaysBackup();
// new

    this.compId = AuthService.getLoggedCompanyId();
    this.gradeValue =AuthService.getLoggedGradeValue();
    this. userInfo()
    this.getEmployees();
    Helper.loadScript('https://cdnjs.cloudflare.com/ajax/libs/jquery/3.4.1/jquery.min.js');
    Helper.loadScript('../../../assets/vendor/js/turn.js');
    Helper.loadScript('../../../assets/vendor/js/custom.js');
  } 

  currentBg() {
    return `bg-${this.appService.layoutNavbarBg}`;
  }

  toggleSidenav() {
    this.layoutService.toggleCollapsed();
  }

  locked() {
    if (sessionStorage.getItem('isRemembered') == 'true') {
      localStorage.setItem('locked', 'true');
    } else {
      sessionStorage.setItem('locked', 'true');
    }
    this.appService.redirect('user/locked');
  }

  logout() {
    this.authService.logout(this.loginID)
      .subscribe((response: any) => {
        if (localStorage.getItem('isRemembered') == 'true') {
          localStorage.removeItem('loginID');
          localStorage.removeItem('empCode');
          localStorage.removeItem('userID');
          localStorage.removeItem('userName');
          localStorage.removeItem('userTypeID');
          localStorage.removeItem('picture');
          localStorage.removeItem('companyID');
          localStorage.removeItem('gradeValue');
          localStorage.removeItem('locked');
          localStorage.removeItem('isRemembered');
        } else {
          sessionStorage.removeItem('loginID');
          sessionStorage.removeItem('empCode');
          sessionStorage.removeItem('userID');
          sessionStorage.removeItem('userName');
          sessionStorage.removeItem('userTypeID');
          sessionStorage.removeItem('picture');
          sessionStorage.removeItem('companyID');
          sessionStorage.removeItem('gradeValue');
          sessionStorage.removeItem('locked');
          sessionStorage.removeItem('isRemembered');
        }
        localStorage.removeItem('token');
        this.appService.redirect('user/login');
      })
  }

  checkTodaysBackup() {
    this.appInfoService.checkTodaysBackup()
      .subscribe((isBackup: boolean) => {
        this.isBackupToday = isBackup;
      })
  }
  onBackup() {
    this.isProcessingBackup = true;
    this.appInfoService.backupDatabase()
      .subscribe((response: any) => {
        this.isProcessingBackup = false;
        if (response.status) {
          this.isBackupToday = true;
        }
      }
      )
  }

  myprofile(){
    document.getElementById('personal_Info').style.display='block';
    this.userInfo(); 
      document.getElementById('personal_Info').addEventListener('click', function() {
       // this.style.display = 'none'; 
       
    });  
  }



  displayHide(){
   document.getElementById('personal_Info').style.display='none';
 
  }
  displayHidee(event: MouseEvent) {
    const myProfile = document.querySelector("#myprofile") as HTMLDivElement;
    const personalInfo = document.getElementById('personal_Info') as HTMLDivElement;
    if (myProfile && personalInfo) { 
      if (!myProfile.contains(event.target as Node)) { 
        personalInfo.style.display = 'none';
      } else { 
        personalInfo.style.display = 'block';
      }
    }
  }


  
empcodes:any[]=[];
  userInfo() {  
    this.employmentService.userInfo(this.compId, this.loginID).subscribe((employees:any) => { 
      this.empcodes = employees.result as any[];
      this.getPersonalFileInfo();  
      }); 
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
  debugger
  this.personalFileService.getPersonalFileInfo(this.empcodes[0].empCode).subscribe((response: ApiResponse) => {
    if (response.status) {
      this.allData = response.result as any[];
      this.empGenInfo = this.getGenInfo((this.allData[1])[0]);
      this.employment = this.getEmployment((this.allData[1])[0]);
      this.empFamilyInfo = (this.allData[2])[0];  
      this.empJoinInfo=(this.allData[4])[0];  
    }
    else {
      this.allData=[];
    }
  })
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

  




// Function to handle clicks outside the demo div
 handleDocumentClick(event: MouseEvent) {
  const demoDiv = document.querySelector("#personal_Info") as HTMLDivElement;

  // Check if the click is outside the demo div
  if (demoDiv && !demoDiv.contains(event.target as Node)) {
    this.displayHide();
  }
}
 
}
