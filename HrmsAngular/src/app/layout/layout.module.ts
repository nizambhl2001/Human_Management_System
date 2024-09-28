import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';


// *******************************************************************************
// Layouts

import { Layout1Component } from './layout-1/layout-1.component';
import { Layout2Component } from './layout-2/layout-2.component';
import { LayoutBlankComponent } from './layout-blank/layout-blank.component';


// *******************************************************************************
// Components

import { LayoutNavbarComponent } from './layout-navbar/layout-navbar.component';
import { LayoutSidenavComponent } from './layout-sidenav/layout-sidenav.component';
import { LayoutFooterComponent } from './layout-footer/layout-footer.component';


// *******************************************************************************
// Libs

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { SidenavModule } from '../../vendor/libs/sidenav/sidenav.module';


// *******************************************************************************
// Services

import { LayoutService } from './layout.service';
import { LaddaModule } from 'angular2-ladda';


// *******************************************************************************
//

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    NgbModule,
    SidenavModule,
    LaddaModule
  ],
  declarations: [
    Layout1Component,
    Layout2Component,
    LayoutBlankComponent,
    LayoutNavbarComponent,
    LayoutSidenavComponent,
    LayoutFooterComponent
  ],
  providers: [
    LayoutService
  ]
})
export class LayoutModule { }
