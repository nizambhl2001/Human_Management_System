import { PasswordShowComponent } from './password-show/password-show.component';
import { AssignBranchComponent } from './assign-branch/assign-branch.component';
import { AssignCompanyComponent } from './assign-company/assign-company.component';
import { LockUnlockSalaryComponent } from './lock-unlock-salary/lock-unlock-salary.component';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { CreateCompanyComponent } from './create-company/create-company.component';
import { CreateUserTypeComponent } from './create-user-type/create-user-type.component';
import { AssignPageAccessComponent } from './assign-page-access/assign-page-access.component';
import { CreateUserComponent } from './create-user/create-user.component';
import { RouterModule } from '@angular/router';
import { NgModule } from "@angular/core";
import { LogHistoryComponent } from './log-history/log-history.component';
import { ApplicationModuleComponent } from './application-module/application-module.component';
import { ApplicationPageComponent } from './application-page/application-page.component';
import { PageGuard } from '../../guards/page.guard';
import { HomeGuard } from '../../guards/home.guard';
import { BackupComponent } from './backup/backup.component';

@NgModule({
    declarations:[

    ],
    imports:[
        RouterModule.forChild([
            {path: 'create-company', canActivate: [PageGuard], data:{pageId:198}, component: CreateCompanyComponent},
            {path: 'create-user-type',canActivate: [PageGuard], data:{pageId:199}, component: CreateUserTypeComponent},
            {path: 'create-user', canActivate: [PageGuard], data:{pageId:200},component: CreateUserComponent},
            {path: 'log-history',canActivate: [PageGuard], data:{pageId:201}, component: LogHistoryComponent},
            {path: 'change-password', component: ChangePasswordComponent},
            {path: 'password-show', canActivate: [PageGuard], data:{pageId:203}, component: PasswordShowComponent},
            {path: 'application-module', canActivate: [PageGuard], data:{pageId:204}, component: ApplicationModuleComponent},
            {path: 'application-page', canActivate: [PageGuard], data:{pageId:205}, component: ApplicationPageComponent},
            {path: 'assign-page-access', canActivate: [PageGuard], data:{pageId:206}, component: AssignPageAccessComponent},
            {path: 'assign-company', canActivate: [PageGuard], data:{pageId:207}, component: AssignCompanyComponent},
            {path: 'assign-branch', canActivate: [PageGuard], data:{pageId:208}, component: AssignBranchComponent},
            {path: 'lock-unlock-salary', canActivate: [PageGuard], data:{pageId:209}, component: LockUnlockSalaryComponent},
            {path: 'backup', canActivate: [PageGuard], data:{pageId:232}, component: BackupComponent},
        ])
    ],
    exports:[RouterModule]
})
export class SecurityRoutingModule{}
