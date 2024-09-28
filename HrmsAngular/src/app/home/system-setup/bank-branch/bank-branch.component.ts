import { AuthService } from './../../../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { Pagination } from '../../../shared/paginate';
import { FormGroup, FormBuilder,Form, Validators } from '@angular/forms';
import { SystemSetupService } from '../../../services/system-setup/system-setup.service';
import { ApiResponse } from '../../../models/response.model';
import { ToastrService } from 'ngx-toastr';
import { BankBranch } from '../../../models/system-setup/bank-branch.model';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-bank-branch',
  templateUrl: './bank-branch.component.html',
  styleUrls: ['./bank-branch.component.scss']
})
export class BankBranchComponent extends Pagination implements OnInit {

bankBranchForm:FormGroup;
comId:number;
btnStatus;
bankBranchItem:BankBranch[]=[];
isSubmitted = false;
selectedItemId: number;
filteredItem:BankBranch[]=[];
  constructor(
    private formBuilder:FormBuilder,
    private sSetupService:SystemSetupService,
    private toster:ToastrService,
    private modalService: NgbModal,
  ) {
    super();
  }
title="Bank Branch";
  ngOnInit() {
    this.comId=AuthService.getLoggedCompanyId();
    this.items = [];
    this.update();
    this.btnStatus="Save";
    this.createBankBranchForm();
  }
  getAllBankBranchList(bankid:number){
    if(bankid==null){
      return
    }else{
      this.sSetupService.getAllBankBranch(this.comId,bankid).subscribe((response:ApiResponse)=>{
        if(response.status){

          this.filteredItem=response.result as BankBranch[];
          this.bankBranchItem=response.result as BankBranch[];
          this.update();
        }
        else{
          this.items=[];
          this.update();
        }
      });
    }
  }
  deleteBankBranch(id: number, modal: any) {
    this.selectedItemId = id;
    this.modalService.open(modal);
  }
  onFilter(event){
    if(event.target.value){
      this.filteredItem = this.bankBranchItem.filter(item=>item.description.toLowerCase().match(event.target.value.toString().toLowerCase()))
      }else{
      this.filteredItem = this.bankBranchItem;
    }
  }

confirmDelete(id:number){
  this.sSetupService.deleteBankBranch(id).subscribe((response:ApiResponse)=>{
    if(response.status){
      this.toster.success(response.result,"Success");
      this.modalService.dismissAll();
      this.Reset();

    }else{
      this.toster.error(response.result,"Failed");
    }
  });
}

  getById(id:number){
    this.sSetupService.getByIdBankBranch(id).subscribe((response:ApiResponse)=>{
      if(response.status){
        this.bankBranchForm.patchValue(response.result);
        this.btnStatus="Update";
      }

    });
  }

  saveBankBranch(){
    this.isSubmitted=true;
      if(this.bankBranchForm.invalid){
        this.toster.warning("Fill Required Fields");
        return;
      }else{
        this.sSetupService.saveOrUpdateBankBranch(this.bankBranchForm.value).subscribe((response:ApiResponse)=>{
          if(response.status){
            this.toster.success(response.result,"Success");
            this.Reset();
            this.items=[];
            this.update();
          }
          else{
            this.toster.error(response.result,"Failed");
          }
         });
      }

  }

  updateBankBranch(){
    this.sSetupService.saveOrUpdateBankBranch(this.bankBranchForm.value).subscribe((response:ApiResponse)=>{
      if(response.status){
        this.toster.success(response.result,"Success");
        this.items=[];
        this.update();
        this.createBankBranchForm();
        this.btnStatus="Save";
      }
      else{
        this.toster.error(response.result,"Failed");
      }
    });
  }



  onSubmit(){

    if(this.btnStatus=="Save"){
      this.saveBankBranch();
    }else{
      this.updateBankBranch();
    }
  }

  createBankBranchForm(){
    this.bankBranchForm=this.formBuilder.group({
      id:[0,[Validators.required]],
      companyID:[this.comId,[Validators.required]],
      address:[,[Validators.required]],
      description:[,[Validators.required]],
      bankID:[,[Validators.required]]
    })
  }

  get f(){
    return this.bankBranchForm.controls;
  }

  Reset(){
    this.btnStatus="Save";
    this.isSubmitted=false;
    this.bankBranchForm.reset();
    this.createBankBranchForm();
    this.items=[];
    this.update();

  }
}
