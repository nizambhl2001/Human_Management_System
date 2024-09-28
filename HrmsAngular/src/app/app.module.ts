import { BrowserModule, Title } from '@angular/platform-browser';
import { NgModule, ErrorHandler } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

//================================== Angular Meterial=============================



// *******************************************************************************
// NgBootstrap

import { NgbModule, NgbDateParserFormatter } from '@ng-bootstrap/ng-bootstrap';


// *******************************************************************************
// Libs
import { ToastrModule } from 'ngx-toastr';
import { ContextMenuModule } from 'ngx-contextmenu';
import { TourNgBootstrapModule } from 'ngx-tour-ng-bootstrap';
import { BlockUIModule } from 'ng-block-ui';
import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { LaddaModule } from 'angular2-ladda';
// *******************************************************************************
// App

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AppService } from './app.service';
import { LayoutModule } from './layout/layout.module';
import { ThemeSettingsModule } from '../vendor/libs/theme-settings/theme-settings.module';


import { NoPageComponent } from './error/no-page/no-page.component';
import { AuthService } from './services/auth.service';
import { HomeGuard } from './guards/home.guard';
import { LoginGuard } from './guards/login.guard';
import { TokenInterceptor } from './services/token.interceptor';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppErrorHandler } from './app.error.handler';
import { NgbDateCustomParserFormatter } from './shared/dateformat';
import { SweetAlert2Module } from '@toverux/ngx-sweetalert2';
import { AppErrorComponent } from './error/app-error/app-error.component';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { LocationStrategy, HashLocationStrategy } from '@angular/common';
import { ForbiddenComponent } from './error/forbidden/forbidden.component';
import { LeaveDataViewComponent } from './leave-data-view/leave-data-view.component';

// *******************************************************************************
//

@NgModule({
  declarations: [
    AppComponent,
    NoPageComponent,
    AppErrorComponent,
    ForbiddenComponent,
    LeaveDataViewComponent,

  ],

  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    NgbModule,
    // App
    AppRoutingModule,
    LayoutModule,
    ThemeSettingsModule,

    // Libs
    SweetAlert2Module.forRoot({
      buttonsStyling: false,
      confirmButtonClass: 'btn btn-lg btn-primary',
      cancelButtonClass: 'btn btn-lg btn-default'
    }),
    ToastrModule.forRoot(),
    ContextMenuModule.forRoot(),
    TourNgBootstrapModule.forRoot(),
    BlockUIModule.forRoot(),
    CalendarModule.forRoot({
      provide: DateAdapter,
      useFactory: adapterFactory
    }),
  ],

  providers: [
    Title,
    AppService,
    AuthService,
    HomeGuard,
    LoginGuard,
    { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true },
    { provide: ErrorHandler, useClass: AppErrorHandler },
    { provide: NgbDateParserFormatter, useClass: NgbDateCustomParserFormatter },
    { provide: LocationStrategy, useClass: HashLocationStrategy },
  ],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule { }
