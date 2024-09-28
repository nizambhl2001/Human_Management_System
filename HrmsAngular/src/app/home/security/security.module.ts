import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { SecurityRoutingModule } from './security-routing.module';
import { CreateUserComponent } from './create-user/create-user.component';
import { LogHistoryComponent } from './log-history/log-history.component';
import { AssignPageAccessComponent } from './assign-page-access/assign-page-access.component';
import { CreateUserTypeComponent } from './create-user-type/create-user-type.component';
import { CreateCompanyComponent } from './create-company/create-company.component';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { LockUnlockSalaryComponent } from './lock-unlock-salary/lock-unlock-salary.component';
import { AssignCompanyComponent } from './assign-company/assign-company.component';
import { AssignBranchComponent } from './assign-branch/assign-branch.component';
import { PasswordShowComponent } from './password-show/password-show.component';
import { UtilityModule } from '../../utility/utility.module';
import { NgSelectModule } from '@ng-select/ng-select';
import { LaddaModule } from 'angular2-ladda';
import { DeleteConfirmationComponent } from '../../utility/delete-confirmation/delete-confirmation.component';
import { ApplicationModuleComponent } from './application-module/application-module.component';
import { ApplicationPageComponent } from './application-page/application-page.component';
import { BackupComponent } from './backup/backup.component';


@NgModule({
  declarations: [
    CreateUserComponent,
    LogHistoryComponent,
    CreateUserTypeComponent,
    CreateCompanyComponent,
    ChangePasswordComponent,
    LockUnlockSalaryComponent,
    AssignCompanyComponent,
    AssignBranchComponent,
    PasswordShowComponent,
    AssignPageAccessComponent,
    ApplicationModuleComponent,
    ApplicationPageComponent,
    BackupComponent],
  imports: [
    CommonModule,
    FormsModule,
    NgbModule,
    SecurityRoutingModule,
    ReactiveFormsModule,
    UtilityModule,
    NgSelectModule,
    LaddaModule,
    UtilityModule
  ],
  providers: [DeleteConfirmationComponent]
})
export class SecurityModule { }
