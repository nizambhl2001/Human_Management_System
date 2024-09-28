import { LoginGuard } from './../guards/login.guard';
import { LockGuard } from './../guards/lock.guard';
import { LoginComponent } from './login/login.component';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { LockComponent } from './lock/lock.component';
import { RetrieveComponent } from './retrieve/retrieve.component';

@NgModule({
  imports: [RouterModule.forChild([
    { path: 'login', component: LoginComponent, canActivate: [LoginGuard] },
    { path: 'locked', component: LockComponent, canActivate: [LockGuard] },
    { path: 'retrieve', component: RetrieveComponent }
  ])],
  exports: [RouterModule]
})
export class UserRoutingModule { }
