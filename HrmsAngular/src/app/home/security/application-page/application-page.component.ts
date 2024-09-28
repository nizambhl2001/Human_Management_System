import { Pagination } from './../../../shared/paginate';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AppInfoService } from '../../../services/security/app-info.service';
import { ToastrService } from 'ngx-toastr';
import { ApiResponse } from '../../../models/response.model';

@Component({
  selector: 'app-application-page',
  templateUrl: './application-page.component.html',
  styleUrls: ['./application-page.component.scss', '../../../../vendor/libs/ng-select/ng-select.scss']
})
export class ApplicationPageComponent extends Pagination implements OnInit {
  pageForm:FormGroup;
  pages:any[]=[];
  modules:any[]=[];
  isSubmitted:boolean=false;
  btnStatus:string='Save';
  constructor(
    private fb:FormBuilder,
    private appInfoService:AppInfoService,
    private toaster:ToastrService
  ) {
    super()
  }

  ngOnInit() {
    this.createForm();
    this.getModules();
    this.getPages();
  }
  onSubmit(){
    this.isSubmitted = true;
    if(this.pageForm.invalid){
      this.toaster.error('Invalid Submission!');
      return;
    }
    this.appInfoService.saveAppPage(this.pageForm.value)
    .subscribe((response:ApiResponse)=>{
      if(response.status){
        this.getPages();
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
  getPages(){
    this.appInfoService.getAppPage(0)
    .subscribe((response:ApiResponse)=>{
      if(response.status){
        this.pages = response.result;

        this.sortBy="moduleName";
        this.sortDesc=false;
        this.sort(this.pages);
      }else{
        this.toaster.error(response.result)
      }
    })
  }
  edit(id:number){
    this.btnStatus = 'Update';
    let mod = this.pages.find(c=>c.id==id);
    this.pageForm.patchValue(mod);
  }
  createForm(){
    this.pageForm = this.fb.group({
      id:[,[]],
      moduleID:[,[Validators.required]],
      name:[,[Validators.required]],
      pageRoutePath:[,[Validators.required]],
    });
  }
  get frmControl(){
    return this.pageForm.controls;
  }
  reset(){
    this.pageForm.controls['id'].reset();
    this.isSubmitted=false;
    this.btnStatus = 'Save'
  }


}
