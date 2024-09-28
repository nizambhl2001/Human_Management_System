import { LaddaModule } from 'angular2-ladda';

import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { ChartsModule as Ng2ChartsModule } from 'ng2-charts/ng2-charts';
import { HomeRoutingModule } from './home-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { StartupComponent } from './startup/startup.component';
import { Helper } from '../shared/helper';
import { NgSelectModule } from '@ng-select/ng-select';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
    Ng2ChartsModule,
    PerfectScrollbarModule,
    HomeRoutingModule,
    NgSelectModule,
    LaddaModule,
  ],
  declarations: [
    DashboardComponent,
    StartupComponent
  ],
  providers:[DatePipe,Helper]
})
export class HomeModule { }
