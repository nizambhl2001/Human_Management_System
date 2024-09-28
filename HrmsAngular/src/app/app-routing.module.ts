import { HomeGuard } from './guards/home.guard';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { Layout1Component } from './layout/layout-1/layout-1.component';
import { LayoutBlankComponent } from './layout/layout-blank/layout-blank.component';

import { NoPageComponent } from './error/no-page/no-page.component';
import { AppErrorComponent } from './error/app-error/app-error.component';
import { Layout2Component } from './layout/layout-2/layout-2.component';
import { ForbiddenComponent } from './error/forbidden/forbidden.component';
import { ModuleGuard } from './guards/module.guard';
import { PageGuard } from './guards/page.guard';

const routes: Routes = [
  { path: '', component:  Layout1Component, canActivate: [HomeGuard], loadChildren: './home/home.module#HomeModule' },
  { path: 'user', component: LayoutBlankComponent, loadChildren: './user/user.module#UserModule' },
  { path: 'system-setup', component: Layout1Component,canActivate: [ModuleGuard], data:{moduleId:1}, loadChildren: './home/system-setup/setup.module#SetupModule' },
  { path: 'hr-menu', component: Layout1Component,canActivate: [ModuleGuard], data:{moduleId:2}, loadChildren: './home/hr-menu/hr-menu.module#HrMenuModule' },
  { path: 'property', component: Layout1Component,canActivate: [ModuleGuard], data:{moduleId:3}, loadChildren: './home/property/property.module#PropertyModule' },
  { path: 'attendance', component: Layout1Component, data:{moduleId:4}, loadChildren: './home/attendance/attendance.module#AttendanceModule' },
  { path: 'leave', component: Layout1Component, data:{moduleId:5}, loadChildren: './home/leave/leave.module#LeaveModule' },
  { path: 'overtime', component: Layout1Component,canActivate: [ModuleGuard], data:{moduleId:6}, loadChildren: './home/overtime/overtime.module#OvertimeModule' },
  { path: 'shift-allowance', component: Layout1Component,canActivate: [ModuleGuard], data:{moduleId:7}, loadChildren: './home/shift-allowance/shift-allowance.module#ShiftAllowanceModule' },
  { path: 'disciplinary', component: Layout1Component,canActivate: [ModuleGuard], data:{moduleId:8}, loadChildren: './home/disciplinary/disciplinary.module#DisciplinaryModule' },
  { path: 'loan', component: Layout1Component,canActivate: [ModuleGuard], data:{moduleId:9}, loadChildren: './home/loan/loan.module#LoanModule' },
  { path: 'salary-setup', component: Layout1Component,canActivate: [ModuleGuard], data:{moduleId:10}, loadChildren: './home/salary-setup/salary-setup.module#SalarySetupModule' },
  { path: 'salary-process', component: Layout1Component,canActivate: [ModuleGuard], data:{moduleId:11}, loadChildren: './home/salary-process/salary-process.module#SalaryProcessModule' },
  { path: 'addition', component: Layout1Component,canActivate: [ModuleGuard], data:{moduleId:12}, loadChildren: './home/addition/addition.module#AdditionModule' },
  { path: 'deduction', component: Layout1Component,canActivate: [ModuleGuard], data:{moduleId:13}, loadChildren: './home/deduction/deduction.module#DeductionModule' },
  { path: 'bonus', component: Layout1Component,canActivate: [ModuleGuard], data:{moduleId:14}, loadChildren: './home/bonus/bonus.module#BonusModule' },
  { path: 'incentive', component: Layout1Component,canActivate: [ModuleGuard], data:{moduleId:15}, loadChildren: './home/incentive/incentive.module#IncentiveModule' },
  { path: 'subsistance-allowance', component: Layout1Component,canActivate: [ModuleGuard], data:{moduleId:16}, loadChildren: './home/subsistance-allowance/subsistance-allowance.module#SubsistanceAllowanceModule' },
  { path: 'income-tax', component: Layout1Component,canActivate: [ModuleGuard], data:{moduleId:17}, loadChildren: './home/income-tax/income-tax.module#IncomeTaxModule' },
  { path: 'settlement', component: Layout1Component,canActivate: [ModuleGuard], data:{moduleId:18}, loadChildren: './home/settlement/settlement.module#SettlementModule' },
  { path: 'reports', component: Layout1Component,canActivate: [ModuleGuard], data:{moduleId:19}, loadChildren: './home/reports/reports.module#ReportsModule' },
  { path: 'security', component: Layout1Component, loadChildren: './home/security/security.module#SecurityModule' },
  { path: 'gl-integration', component: Layout1Component,canActivate: [ModuleGuard], data:{moduleId:21}, loadChildren: './home/gl-integration/gl-integration.module#GlIntegrationModule' },
  { path: 'apprisal', component: Layout1Component,canActivate: [ModuleGuard], loadChildren: './home/apprisal/apprisal.module#ApprisalModule' },
  { path: 'apps', component: Layout1Component,canActivate: [ModuleGuard], data:{moduleId:23}, loadChildren: './home/apps/apps.module#AppsModule' },
  { path: 'recruitment', component: Layout1Component,canActivate: [ModuleGuard], data:{moduleId:24}, loadChildren: './home/recruitment/recruitment.module#RecruitmentModule' },
  { path: 'tour', component: Layout1Component,canActivate: [ModuleGuard], data:{moduleId:25}, loadChildren: './home/tour/tour.module#TourModule' },
  { path: 'provident-fund', component: Layout1Component,canActivate: [ModuleGuard], data:{moduleId:26}, loadChildren: './home/provident-fund/provident-fund.module#ProvidentFundModule'},
  { path: 'home', component: LayoutBlankComponent, loadChildren: './home/home.module#HomeModule' },
  { path: 'system-setup/basic-entry', component: Layout1Component,canActivate: [ModuleGuard], data:{moduleId:1}, loadChildren: './home/system-setup/basic-entry/basic-entry.module#BasicEntryModule' },
  { path: 'error', component: AppErrorComponent },
  { path: 'forbidden', component: ForbiddenComponent },
  { path: '**', component: NoPageComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
