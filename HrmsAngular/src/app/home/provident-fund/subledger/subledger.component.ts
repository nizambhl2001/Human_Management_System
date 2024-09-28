import { Component, OnInit } from '@angular/core';
import { FormBuilder,  FormGroup,  Validators } from '@angular/forms';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-subledger',
  templateUrl: './subledger.component.html',
  styleUrls: ['./subledger.component.scss']
})
export class SubledgerComponent implements OnInit {


  compId:number;
  subLedgerForm:FormGroup;
  constructor(private formBuilder:FormBuilder) { }

  ngOnInit() {
    this.compId = AuthService.getLoggedCompanyId();
    this.createForm();
  }

  createForm(){
    this.subLedgerForm=this.formBuilder.group({
      subledgerId :[0,[]],
      subledgerName :[,[Validators.required]],
      aliasName :[null,[]],
      openingBalance :[0,[]],
      accountId :[,[Validators.required]],
      compId :[this.compId,[]],
      isActive:[1,[]]
    });
  }

  get f(){
      return this.subLedgerForm.controls
  }

}
