import { Component, OnInit } from '@angular/core';
import { Pagination } from '../../../shared/paginate';
import { CompanyModel } from '../../../models/security/company.model';
import { UserService } from '../../../services/security/user.service';
import { ApiResponse } from '../../../models/response.model';
import { ToastrService } from 'ngx-toastr';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AppService } from '../../../app.service';

@Component({
  selector: 'app-create-company',
  templateUrl: './create-company.component.html',
  styleUrls: ['./create-company.component.scss','../../../../vendor/libs/ng-select/ng-select.scss']
})
export class CreateCompanyComponent implements OnInit {

 title:string = "Company"
 companies:CompanyModel[]=[];
  companyForm:FormGroup;
  isSubmitted:boolean = false;

  constructor(
    private userService:UserService,
    private toaster:ToastrService,
    private fb:FormBuilder,
    private appService:AppService
  ) {
  }
  ngOnInit() {
    this.getCompanies();
    this.createForm();
  }
  getCompanies(){
    this.userService.getCompanies()
    .subscribe((resposne:ApiResponse)=>{
      if(resposne.status){
        this.companies = resposne.result;
      }else{
        this.companies = [];
      }
    }, err=>{
      console.log(err);
    })
  }
  onSubmit(){
    this.isSubmitted = true;

    if(this.frmVal.id>0){
      this.frmControl['pOptions'].patchValue(3)
    }else{
      this.frmControl['pOptions'].patchValue(1)
    }
    if(this.companyForm.invalid){
      this.toaster.error('Invalid Submission!');
      return;
    }
    this.userService.saveOrUpdateCompany(this.companyForm.value)
    .subscribe((response:ApiResponse)=>{
      if(response.status){
        this.toaster.success(response.result, 'Success!');
        this.getCompanies();
        this.reset();
      }
    })
  }
  edit(id:number){
    let company = this.companies.find(c=>c.id===id);
    this.companyForm.patchValue(company);
  }
  createForm(){
    this.companyForm = this.fb.group({
      id:[,[]],
      companyName:[,[Validators.required]],
      companyAddress:[,[]],
      phone:[,[Validators.required, Validators.pattern("^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s\./0-9]*$")]],
      code:[,[]],
      tin:[,[]],
      email:[,[Validators.email]],
      webAddress:[,[Validators.pattern("^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)?[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$")]],
      salaryType:[,[Validators.required]],
      companyLogo:[,[]],
      reportLogo:[,[]],
      pOptions:[,[]]
    })
  }
  get frmControl(){
    return this.companyForm.controls;
  }
  get frmVal(){
    return this.companyForm.value;
  }
  reset(){
    this.createForm();
    this.isSubmitted = false;
  }

}
