import { Thana } from './../../../../models/system-setup/thana.model';
import { ApiResponse } from './../../../../models/response.model';
import { ToastrService } from 'ngx-toastr';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { BasicEntryService } from '../../../../services/system-setup/basic-entry.service';
import { BasicEntry } from '../../../../models/system-setup/basic-entry.model';
import { Division } from '../../../../models/system-setup/division.model';
import { District } from '../../../../models/system-setup/district.model';
import { Upazila } from '../../../../models/system-setup/upazila.model';
import { SystemSetupService } from '../../../../services/system-setup/system-setup.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-thana',
  templateUrl: './thana.component.html',
  styleUrls: ['./thana.component.scss','../../../../../vendor/libs/ng-select/ng-select.scss'],
})

export class ThanaComponent implements OnInit {
  @Input() modalName:any;
  @Output() onAddNew = new EventEmitter<any>();
  thana: FormGroup;
  compId: number;
  allCountry:BasicEntry[] = [];
  allDivision:Division[]=[];
  allPreDistrict:District[]=[];
  allPreUpazila:Upazila[]=[];
  allPreThana:Thana[]=[];
  isSubmitted:boolean = false;
  btnStatus:string;
  constructor(
    private formbuilder: FormBuilder,
    private basicES:BasicEntryService,
    private setupService:SystemSetupService,
    private toaster: ToastrService,
    private modalService:NgbModal
  ) { }

  ngOnInit() {
    this.createForm();
    this.getCountries();
    this.getDivision();
  }
  getCountries(){
    this.basicES.getCountry().subscribe((response:ApiResponse)=>{
      if(response.result){
        this.allCountry = response.result as BasicEntry[];
      }
    })
  }
  getDivision(){
    this.setupService.getAllDivision().subscribe((response:ApiResponse)=>{
      if(response.status){
        this.allDivision = response.result as Division[];
        console.log(this.allDivision )
      }
    })
  }
  getPreDistrict(division){
    console.log(division)
    if(division==null){
      return;
    }
    else{
      this.thana.patchValue({
        preDivisionID:division.divisionID
      })
      this.basicES.getDistricts(this.thana.value.preDivisionID).subscribe((response:ApiResponse)=>{
        if(response.status){
          this.allPreDistrict = response.result as District[];
          console.log(this.allPreDistrict,'this.allPreDistrict')
        }
      })
    }
   
  }
  getPreUpazila(district){
    if(district==null){
    return;
    }
    else{
      this.thana.patchValue({
        preDistrictID:district.districtID
      })
      this.basicES.getUpazila(this.thana.value.preDistrictID).subscribe((response:ApiResponse)=>{
        if(response.status){
          this.allPreUpazila = response.result as Upazila[];
        }
      })
    }
   
  }
  getPreThana(upazila){
    console.log(upazila,'upazila')
    if(upazila==null){
      return;
    }
    else{
      this.thana.patchValue({
        preUpazilaID:upazila.upazilaID
      })
      this.basicES.getThana(this.thana.value.preUpazilaID).subscribe((response:ApiResponse)=>{
        if(response.status){
          this.allPreThana = response.result as Thana[];
        }
      })
    }
    
  }
  saveThana(){
    if(this.thana.invalid){
    this.toaster.error("Fill Required Fields");
    }
    else{
    let obj=new Thana;
    obj.thanaName=this.formVal.thanaName;
    obj.upazilaID=this.formVal.preUpazilaID;
    this.basicES.saveThana(obj).subscribe((response:ApiResponse)=>{
     if(response.status){
       this.onAddNew.emit({
         thanaId: this.formVal.thanaId,
         thanaName: this.formVal.thanaName,
         upazilaID: this.formVal.preUpazilaID
       });
       this.modalService.dismissAll();
       this.toaster.success(response.result);
       this.reset();
     }
    })
  }
}
  createForm() {
    this.thana = this.formbuilder.group({
      thanaId: [, []],
      thanaName: [, [Validators.required]],
      upazilaID: [, []],
      preCountry:[,[]],
      preDivisionID:[,[]],
      preDistrictID:[,[]],
      preUpazilaID:[,[Validators.required]],
      preThanaID:[,[]]
    })
  }
  get f(){
    return this.thana.controls;
  }
  get formVal(){
    return this.thana.value;
  }
  reset(){
  this.createForm();
  }
  createNewItem(){
    this.modalService.open(this.modalName)
  }
  edit(thanaId){
    let terms=this.allPreThana.find(t=>t.thanaID==thanaId);
    this.thana.patchValue({
      thanaName:terms.thanaName
    });
    console.log(terms,thanaId)
    this.btnStatus="Update"
  }

  // onSelect(termId){
  //   let terms=this.termsList.find(t=>t.id==termId);
  //   this.termsForm.patchValue(terms);
  //   this.btnStatus="Update"
  //     }
}
