
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { UserRoutingModule } from './user-routing.module';
import { LoginComponent } from './login/login.component';
import { LockComponent } from './lock/lock.component';
import { RetrieveComponent } from './retrieve/retrieve.component';
import { LaddaModule } from 'angular2-ladda';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    NgbModule, 
    UserRoutingModule,
    LaddaModule
  ],
  declarations: [
    LoginComponent,
    LockComponent,
    RetrieveComponent
  ]
})
export class UserModule { }
