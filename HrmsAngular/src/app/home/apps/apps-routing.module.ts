import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { LocationSetupComponent } from './location-setup/location-setup.component';
import { ActiveLnactiveComponent } from './active-lnactive/active-lnactive.component';
import { LocationShowComponent } from './location-show/location-show.component';
import { PageGuard } from '../../guards/page.guard';




@NgModule({
  imports: [RouterModule.forChild([
  {path: 'location-setup',canActivate: [PageGuard], data:{pageId:220}, component:LocationSetupComponent},
  {path:'location-show',canActivate: [PageGuard], data:{pageId:221}, component:LocationShowComponent},
  {path:'active-lnactive', canActivate: [PageGuard], data:{pageId:222}, component:ActiveLnactiveComponent}

  ])],
  exports: [RouterModule]
})
export class AppsRoutingModule { }