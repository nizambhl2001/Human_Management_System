import { AppsRoutingModule } from './apps-routing.module';
import { FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { LocationSetupComponent } from './location-setup/location-setup.component';
import { LocationShowComponent } from './location-show/location-show.component';
import { ActiveLnactiveComponent } from './active-lnactive/active-lnactive.component';

@NgModule({
  declarations: [

  LocationSetupComponent,

  LocationShowComponent,

  ActiveLnactiveComponent],
  imports: [
    CommonModule,
    NgbModule,
    FormsModule,
    AppsRoutingModule
  ]
})
export class AppsModule { }
