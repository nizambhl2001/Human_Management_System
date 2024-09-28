import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Helper } from './../../../../shared/helper';
import { BasicEntryService } from './../../../../services/system-setup/basic-entry.service';
import { BasicEntry } from './../../../../models/system-setup/basic-entry.model';
import { ApiResponse } from './../../../../models/response.model';
import { Component, OnInit, Input } from '@angular/core';
import { EmpContactInfo } from '../../../../models/hr/emp-contact-info.model';
import { EmployeeService } from '../../../../services/hr/employee.service';
import { ToastrService } from 'ngx-toastr';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { Upazila } from '../../../../models/system-setup/upazila.model';
import { Thana } from '../../../../models/system-setup/thana.model';
import { District } from '../../../../models/system-setup/district.model';
import { Division } from '../../../../models/system-setup/division.model';
import { SystemSetupService } from '../../../../services/system-setup/system-setup.service';

@Component({
  selector: 'app-emp-contact-info',
  templateUrl: './emp-contact-info.component.html',
  styleUrls: [
    './emp-contact-info.component.scss',
    '../../../../../vendor/libs/angular-2-dropdown-multiselect/angular-2-dropdown-multiselect.scss',
    '../../../../../vendor/libs/ng-select/ng-select.scss'
  ]
})
export class EmpContactInfoComponent implements OnInit {

  btnStatus:string = "Save";
  tabIdNo:number = 1;
  @Input() compId:number;
  @Input() empCode:string;
  @Input() empName:string;
  allCountry:BasicEntry[] = [];
  allDivision:Division[] = [];
  allPreDistrict:District[] = [];
  allPreUpazila:Upazila[]=[];
  allPreThana:Thana[]=[];
  allPerDistrict:District[] = [];
  allPerUpazila:Upazila[]=[];
  allPerThana:Thana[]=[];
  empContactInfo:EmpContactInfo = new EmpContactInfo();

  contactForm: FormGroup;
  isSubmitted:boolean = false;
  constructor(
    private empService:EmployeeService,
    private basicES:BasicEntryService,
    private setupService:SystemSetupService,
    private toastr:ToastrService,
    private helper:Helper,
    private frmBuilder:FormBuilder,
    public modalService:NgbModal
  ) { }
  ngOnInit() {
    this.getCountries();
    this.getDivision();
    this.getAllThana();
    this.getEmpContactInfo();
    this.empContactInfo.companyID = this.compId;
    this.empContactInfo.empCode = this.empCode;
    this.createForm();
  }

  getEmpContactInfo(){
    if(this.empCode=="" || this.empCode==null){return;}
    this.empService.getContactInfo(this.compId, this.empCode).subscribe((response:ApiResponse)=>{
      if(response.status){
        this.empContactInfo = response.result as EmpContactInfo
        console.log("Contact",this.empContactInfo)
        this.getPreDistrict(this.empContactInfo.preDivisionID);
        this.getPerDistrict(this.empContactInfo.perDivisionID);
        this.getPreUpazila(this.empContactInfo.preDistrictID);
        this.getPerUpazila(this.empContactInfo.perDistrictID);
        this.getPreThana(this.empContactInfo.preUpazilaID);
        this.getPerThana(this.empContactInfo.perUpazilaID);
        this.btnStatus = 'Update';
        this.contactForm.setValue(response.result)
      }
    })
  }
  saveEmpContactInfo(){
    if(this.contactForm.invalid){
      this.isSubmitted = true;
      this.toastr.error("Please, fill all required field! \n * mark field is required","Input Error!");
      return;
    }
    this.empService.saveContactInfo(this.contactForm.value).subscribe((response:ApiResponse)=>{
      if(response.status){
        this.toastr.success(response.result, 'Success');
        this.getEmpContactInfo()
        this.reset();
      }else{
        this.toastr.error(response.result, 'Erorr!');
      }
    })
  }
  getCountries(){
    this.basicES.getCountry().subscribe((response:ApiResponse)=>{
      if(response.result){
        this.allCountry = response.result as BasicEntry[];
      }
    })
  }
  getAllThana(){
    this.basicES.getAllThana().subscribe((response:ApiResponse)=>{
      if(response.status){
        this.allPerThana=response.result as Thana[];
      }
    })
  }
  getDivision(){
    this.setupService.getAllDivision().subscribe((response:ApiResponse)=>{
      if(response.status){
        this.allDivision = response.result as Division[];
      }
    })
  }
  getPreDistrict(divisionId:number){
    if(divisionId==null){
      return;
    }
    this.basicES.getDistricts(divisionId).subscribe((response:ApiResponse)=>{
      if(response.status){
        this.allPreDistrict = response.result as District[];
      }
    })
  }
  getPreUpazila(districtId:number){
    if(districtId==null){
      return;
    }
    this.basicES.getUpazila(districtId).subscribe((response:ApiResponse)=>{
      if(response.status){
        this.allPreUpazila = response.result as Upazila[];
      }
    })
  }
  getPreThana(upazilaId:number){
    if(upazilaId==null){
      return;
    }
    this.basicES.getThana(upazilaId).subscribe((response:ApiResponse)=>{
      if(response.status){
        this.allPreThana = response.result as Thana[];
      }
    })
  }
  getPerDistrict(divisionId:number){
    if(divisionId==null){
    return;
    }
    this.basicES.getDistricts(divisionId).subscribe((response:ApiResponse)=>{
      if(response.status){
        this.allPerDistrict = response.result as District[];
      }
    })
  }
  getPerUpazila(districtId:number){
    if(districtId==null){
      return;
    }
    this.basicES.getUpazila(districtId).subscribe((response:ApiResponse)=>{
      if(response.status){
        this.allPerUpazila = response.result as Upazila[];
      }
    })
  }
  getPerThana(upazilaId:number){
    if(upazilaId==null){
      return;
    }
    this.basicES.getThana(upazilaId).subscribe((response:ApiResponse)=>{
      if(response.status){
        this.allPerThana = response.result as Thana[];
      }
    })
  }
  reset(){
    this.createForm();
    this.allPreDistrict = [];
    this.allPreUpazila = []
    this.allPreThana = [];
    this.allPerDistrict=[];
    this.allPerUpazila=[];
    this.allPerThana=[]
    this.btnStatus = 'Save';
    this.isSubmitted=false;
  }

  setPresentAddressAssPermanent(isPresentAddrAsPermanent:any){
    if(isPresentAddrAsPermanent){
        this.getPerDistrict(this.contactForm.controls.preDivisionID.value);
        this.getPerUpazila(this.contactForm.controls.preDistrictID.value);
        this.getPerThana(this.contactForm.controls.preUpazilaID.value);

      this.contactForm.controls.perCountry.setValue(this.contactForm.controls.preCountry.value);
      this.contactForm.controls.perDivisionID.setValue(this.contactForm.controls.preDivisionID.value);
      this.contactForm.controls.perDistrictID.setValue(this.contactForm.controls.preDistrictID.value);
      this.contactForm.controls.perUpazilaID.setValue(this.contactForm.controls.preUpazilaID.value);
      this.contactForm.controls.perThanaID.setValue(this.contactForm.controls.preThanaID.value);
      this.contactForm.controls.perPostOffice.setValue(this.contactForm.controls.prePostOffice.value);
      this.contactForm.controls.perVillage.setValue(this.contactForm.controls.preVillage.value);
      this.contactForm.controls.perPostCode.setValue(this.contactForm.controls.prePostCode.value);
    }
    else{
      this.allPerDistrict=[];
      this.allPerUpazila=[];
      this.allPerThana=[];
      this.contactForm.controls.perDivisionID.reset();
      this.contactForm.controls.perDistrictID.reset();
      this.contactForm.controls.perUpazilaID.reset();
      this.contactForm.controls.perThanaID.reset();
      this.contactForm.controls.perPostOffice.reset();
      this.contactForm.controls.perVillage.reset();
      this.contactForm.controls.perPostCode.reset();
    }
  }

  get f(){
    return this.contactForm.controls;
  }
  get formVal(){
    return this.contactForm.value;
  }
  createForm(){
    this.contactForm = this.frmBuilder.group({
      id:[0,],
      empCode: [this.empCode, ],
      mobileNo: ['', ],
      phoneNo: ['', ],
      email: ['', []],
      preCountry: [, ],
      preDivisionID: [, []],
      // preDivisionID: [, [Validators.required, Validators.min(1)]],
      preDistrictID: [, []],
      preUpazilaID: [, []],
      preThanaID: [, []],
      perDivisionID: [, []],
      perDistrictID: [, []],
      perUpazilaID: [, []],
      perThanaID: [, []],
      prePostOffice: [, []],
      perPostOffice: [, []],
      preVillage: [, []],
      perVillage: [,[] ],
      personName: ['', []],
      personContact: ['', []],
      personAddress: ['', []],
      companyID: [this.compId, ],
      relationship: [, ],
      perCountry: [, ],
      prePostCode: ['', ],
      perPostCode: ['', ],
      mailingAddress: ['Present Address', ],
      secondaryMobile: ['', ],
      secandaryMail: ['', ],
      socialURL1: ['', ],
      socialURL2: ['', ],
      emergrncyPostCode: ['', ],
      emergrncyPostCountry: [,[] ],
      preDivisionName: ['', ],
      preDistrictName: ['', ],
      preUpazilaName: ['', ],
      preThanaName: ['', ],
      perDivisionName: ['', ],
      perDistrictName: ['', ],
      perUpazilaName: ['', ],
      perThanaName: ['', ],
      isPresentAddrAsPermanent:[false, ]
    })
  }

  tabToggle(tab:any, toggleType:number){
    if(toggleType==1){
      this.tabIdNo = this.tabIdNo+1;
      tab.select('tab'+this.tabIdNo);
    }
    if(toggleType==0){
      this.tabIdNo = this.tabIdNo-1;
      tab.select('tab'+this.tabIdNo);
    }
  }

}
