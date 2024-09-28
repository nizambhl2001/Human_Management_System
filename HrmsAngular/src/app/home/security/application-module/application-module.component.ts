import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AppInfoService } from '../../../services/security/app-info.service';
import { ApiResponse } from '../../../models/response.model';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-application-module',
  templateUrl: './application-module.component.html',
  styleUrls: ['./application-module.component.scss']
})
export class ApplicationModuleComponent implements OnInit {

  moduleForm:FormGroup;
  modules:any[]=[];
  isSubmitted:boolean=false;
  btnStatus:string = 'Save';
  constructor(
    private fb:FormBuilder,
    private appInfoService:AppInfoService,
    private toaster:ToastrService
  ) { }

  ngOnInit() {
    this.createForm();
    this.getModules();
  }
  onSubmit(){
    if(this.moduleForm.invalid){
      this.toaster.error('Invalid Submission!');
      return;
    }
    this.appInfoService.saveAppModule(this.moduleForm.value)
    .subscribe((response:ApiResponse)=>{
      if(response.status){
        this.getModules();
        this.reset();
        this.toaster.success(response.result, 'Success!');
      }else{
        this.toaster.error(response.result, 'Failed!')
      }
    })
  }
  getModules(){
    this.appInfoService.getAppModule(0)
    .subscribe((response:ApiResponse)=>{
      if(response.status){
        this.modules = response.result;
      }
    })
  }
  edit(id:number){
    this.btnStatus = 'Update'
    let mod = this.modules.find(c => c.id === id);
    this.moduleForm.patchValue(mod);
  }
  createForm(){
    this.moduleForm = this.fb.group({
      id:[,[]],
      name:[,[Validators.required]],
      moduleRoutePath:[,[Validators.required]],
    });
  }
  get frmControl(){
    return this.moduleForm.controls;
  }
  reset(){
    this.moduleForm.reset();
    this.isSubmitted=false;
    this.btnStatus = 'Save'
  }

}
