import { AuthService } from './../../../../services/auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbDateStruct, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Component, OnInit, Input, SystemJsNgModuleLoader } from '@angular/core';
import { BasicEntry } from '../../../../models/system-setup/basic-entry.model';
import { EmpFamilyInfo } from '../../../../models/hr/emp-family-info.model';
import { EmployeeService } from '../../../../services/hr/employee.service';
import { NgbDateCustomParserFormatter } from '../../../../shared/dateformat';
import { ToastrService } from 'ngx-toastr';
import { BasicEntryService } from '../../../../services/system-setup/basic-entry.service';
import { ApiResponse } from '../../../../models/response.model';
import { AppService } from '../../../../app.service';
import { SSL_OP_LEGACY_SERVER_CONNECT } from 'constants';

@Component({
  selector: 'app-emp-family-info',
  templateUrl: './emp-family-info.component.html',
  styleUrls: ['./emp-family-info.component.scss','../../../../../vendor/libs/ng-select/ng-select.scss']

})
export class EmpFamilyInfoComponent implements OnInit {

  title="Employee Family Information";
  empFamilyBtn:string="Save";
  personIdForDelete:number;

  @Input() empCode:string;
  @Input() empName:string;
  @Input() compId:number;
  empFamilyMember:EmpFamilyInfo = new EmpFamilyInfo();
  empFamilyInfo:EmpFamilyInfo[] = [];
  empFamilyInfoForm:FormGroup;
  allRelationship:BasicEntry[]=[];
  allGender:BasicEntry[]=[];
  allBloodGroup:BasicEntry[]=[];
  allLocation:BasicEntry[]=[];
  allOccupation:BasicEntry[]=[];
  allNationality:BasicEntry[]=[];
  allMaritalStatus:BasicEntry[]=[];
  isSubmitted:boolean = false;
  remainingPercent:number = 100;
  availablePercentage:boolean=true;

  constructor(
    private formBuilder:FormBuilder,
    private empService:EmployeeService,
    private dateFormat:NgbDateCustomParserFormatter,
    private toastr:ToastrService,
    private modalService:NgbModal,
    private basicES:BasicEntryService,
    private appService:AppService
  ) { }
  ngOnInit() {
    this.compId=AuthService.getLoggedCompanyId();
    this.createForm();
    this.getAllRelationship();
    this.getallLocation();
    this.getallOccupation();
    this.getallNationality();
    this.getEmpFamilyInfo();
  }

getAllRelationship(){
  this.basicES.getRelationship().subscribe((response:ApiResponse)=>{
    if(response.status){
      this.allRelationship=response.result as BasicEntry[];
    }
  })
}
getallLocation(){
  this.basicES.getLocation().subscribe((response:ApiResponse)=>{
    if(response.status){
      this.allLocation=response.result as BasicEntry[];
    }
  })
}
getallOccupation(){
  this.basicES.getOccupation().subscribe((response:ApiResponse)=>{
    if(response.status){
      this.allOccupation=response.result as BasicEntry[];
    }
  })
}
getallNationality(){
  this.basicES.getNationality().subscribe((response:ApiResponse)=>{
    if(response.status){
      this.allNationality=response.result as BasicEntry[];
    }
  })
}

  getEmpFamilyInfo(){
    // if(empCode=="" || empCode==null){return;}
    this.empService.getFamilyInfo(this.compId, this.empFamilyInfoForm.value.empCode).subscribe((response:ApiResponse)=>{
      if(response.status){
        this.empFamilyInfo = response.result as EmpFamilyInfo[];
        //  this.empFamilyInfo.forEach(member=>{
        //   this.remainingPercent = this.remainingPercent-member.percentage;
        // })
      }
      else{
        this.empFamilyInfo=[];
      }
    })
  }
  isAvailablePercantage(){
    this.empFamilyInfo.forEach(member=>{
      console.log(member);
      let balence=this.remainingPercent-member.percentage;
      console.log(balence);
      this.availablePercentage=balence>=0
    })
  }

    getFamilyMember(id:number){
    let familyMember=this.empFamilyInfo.find(c=>c.id==id)
    this.empFamilyInfoForm.patchValue(familyMember)
    this.empFamilyInfoForm.patchValue({
      dobNgb:this.dateFormat.stringToNgbDate(familyMember.dob)
    })
    this.empFamilyBtn = "Update";
    }
saveOrUpdateEmpFamily(){
    this.isSubmitted = true;
    let info;
    this.empFamilyInfo.forEach(c=>{
      if(c.gender==1){
        info=c;
      }
    })
    if(this.empFamilyInfoForm.invalid){
      this.toastr.error("Fill all required field, * marked field are required!", 'Invalid Submission');
      return;
    } 
    // else if( this.empFamilyInfoForm.value.id==0 && this.remainingPercent<this.empFamilyInfoForm.controls.percentage.value || this.empFamilyInfoForm.controls.percentage.value<=0){
    //  this.toastr.warning("Percentage Full");
    // }
    
    else if( this.empFamilyInfoForm.controls.percentage.value>this.remainingPercent){
      this.toastr.warning("Percentage should be less than 100");
     }
    else{
      console.log(this.empFamilyInfoForm.value,'this.empFamilyInfoForm.value')
    this.empService.saveOrUpdateEmpFamily(this.empFamilyInfoForm.value).subscribe((response:ApiResponse)=>{
      if(response.status){
        this.toastr.success(response.result, 'Success');
        if(this.formVal.id>0){
          let index = this.empFamilyInfo.findIndex(c=>c.id==this.formVal.id);
          this.empFamilyInfo[index] = this.formVal;
        }else{
        }
       this.getEmpFamilyInfo();
        this.resetFamily();
      }else{
        this.toastr.error(response.result, 'Failed');
      }
    })
  }
}
  delete(personId:number, modal:any){
    this.personIdForDelete = personId;
    this.modalService.open(modal);
}

confirmRemoveFamilyMember(){
  this.empService.deleteEmpFamily(this.personIdForDelete).subscribe((response:ApiResponse)=>{
    if(response.status){
      this.toastr.success(response.result, "Deleted Successfully");
      this.getEmpFamilyInfo();
      this.resetFamily();
      this.modalService.dismissAll();
    }else{
      this.toastr.error(response.result, "Failed")
    }
  })
}
  cancel(){
    this.modalService.dismissAll();
}
resetFamily(){
  this.empFamilyInfoForm.reset();
  this.createForm();
  this.empFamilyBtn="Save";
  this.isSubmitted=false;
  document.getElementById('familyMemberImg').innerHTML = 'Choose file...';
  document.getElementById('familyMemberSignature').innerHTML = 'Choose file...';
}
   get f(){
    return this.empFamilyInfoForm.controls;
  }
  get formVal(){
    return this.empFamilyInfoForm.value;
  }
createForm(){
  this.empFamilyInfoForm=this.formBuilder.group({
    id: [0,[]],
    empCode: [this.empCode,[]],
    empName:[this.empName,[]],
    personName: [,[]],
    dob: [,[]],
    dobNgb: [,[]],
    pob: [,[]],
    districtName:[,[]],
    bloodGroup:[,[]],
    relationship:[,[]],
    gender: [,[]],
    maritalStatus:[,[]],
    contactNo: [,[]],
    email: [,[]],
    nationality:[,[]],
    isNominee: [,[]],
    percentage: [,[]],
    occupation: [,[]],
    passportNo: [,[]],
    nationalID: [,[]],
    companyId: [this.compId,[]],
    photo: [,[]],
    signature:[,[]],
    genderName: [,[]],
    usedPer: [,[]],
    unusedPer: [,[]],
    nomineeCount: [,[]],
    bloodGroupName: [,[]],
    maritalStatusName: [,[]]
  })
}

createNewRelationShip(modal:any){
  this.modalService.open(modal);
}

}
